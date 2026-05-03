/* ============================================================
   ThatSearch – Zyte API helper  (backend/zyte.js)

   Wraps the Zyte Data Extraction API (https://www.zyte.com/zyte-api/)
   to fetch and parse web pages for indexing.
   ============================================================ */

"use strict";

const axios = require("axios");

const ZYTE_API_URL = "https://api.zyte.com/v1/extract";

/**
 * Fetch a URL through Zyte API and return the HTTP response body + metadata.
 *
 * @param {string} url          – The target URL to crawl
 * @param {object} [options]    – Additional Zyte API options
 * @returns {Promise<{body: string, url: string, statusCode: number}>}
 */
async function fetchPage(url, options = {}) {
  const apiKey = process.env.ZYTE_API_KEY;
  if (!apiKey) throw new Error("ZYTE_API_KEY is not set in environment variables.");

  const payload = {
    url,
    httpResponseBody: true,   // raw HTML body (base64-encoded)
    httpResponseHeaders: true,
    ...options,
  };

  const response = await axios.post(ZYTE_API_URL, payload, {
    // Zyte uses HTTP Basic Auth: API key as username, empty password
    auth: { username: apiKey, password: "" },
    headers: { "Content-Type": "application/json" },
    timeout: 30_000,
  });

  const data = response.data;

  // The HTML body is returned as a base64-encoded string
  const bodyBuffer = Buffer.from(data.httpResponseBody, "base64");
  const body = bodyBuffer.toString("utf-8");

  return {
    url: data.url,
    statusCode: data.statusCode,
    body,
  };
}

/**
 * Use Zyte's built-in Article extraction to get clean article content.
 * Ideal for indexing news articles and educational pages.
 *
 * @param {string} url
 * @returns {Promise<{headline: string, articleBody: string, url: string}>}
 */
async function extractArticle(url) {
  const apiKey = process.env.ZYTE_API_KEY;
  if (!apiKey) throw new Error("ZYTE_API_KEY is not set in environment variables.");

  const response = await axios.post(
    ZYTE_API_URL,
    { url, article: true },
    {
      auth: { username: apiKey, password: "" },
      headers: { "Content-Type": "application/json" },
      timeout: 30_000,
    }
  );

  const { article } = response.data;
  return {
    url,
    headline:    article?.headline    || "",
    articleBody: article?.articleBody || "",
    datePublished: article?.datePublished || null,
  };
}

module.exports = { fetchPage, extractArticle };
