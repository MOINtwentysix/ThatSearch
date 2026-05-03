/* ============================================================
   ThatSearch – Express Backend with Zyte Integration
   backend/server.js

   Endpoints:
     GET  /api/search?q=<query>&page=<n>  – Search the index
     POST /api/crawl                       – Submit a URL to crawl
     GET  /api/index                       – View the current index
   ============================================================ */

"use strict";

require("dotenv").config();

const express  = require("express");
const cors     = require("cors");
const cheerio  = require("cheerio");
const { fetchPage, extractArticle } = require("./zyte");

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ── In-memory search index ─────────────────────────────── */
/**
 * Each entry in the index looks like:
 * {
 *   url:      "https://example.com/article",
 *   title:    "Article Title",
 *   snippet:  "First 200 characters of content...",
 *   content:  "Full text content of the page",
 *   date:     "2024-01-15",
 *   keywords: ["keyword1","keyword2"]
 * }
 */
const searchIndex = [];

/* ── Helpers ─────────────────────────────────────────────── */

/** Tokenize text into lowercase words */
function tokenize(text) {
  return (text || "").toLowerCase().match(/\b\w+\b/g) || [];
}

/** Escape a string for safe use inside a RegExp */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Score a result against a query (simple TF scoring) */
function score(entry, queryTokens) {
  const haystack = `${entry.title} ${entry.snippet} ${entry.content}`.toLowerCase();
  return queryTokens.reduce((acc, token) => {
    const re = new RegExp(`\\b${escapeRegExp(token)}\\b`, "g");
    const matches = (haystack.match(re) || []).length;
    return acc + matches;
  }, 0);
}

/** Extract a plain-text snippet from HTML using cheerio */
function extractSnippet(html, maxLength = 220) {
  const $ = cheerio.load(html);
  $("script, style, nav, footer, header").remove();
  const text = $("body").text().replace(/\s+/g, " ").trim();
  return text.slice(0, maxLength) + (text.length > maxLength ? "…" : "");
}

/** Parse the title from HTML */
function extractTitle(html) {
  const $ = cheerio.load(html);
  return $("title").first().text().trim() || $("h1").first().text().trim() || "Untitled";
}

/* ══════════════════════════════════════════════════════════
   ROUTES
   ══════════════════════════════════════════════════════════ */

/* ── GET /api/search ─────────────────────────────────────── */
app.get("/api/search", (req, res) => {
  const q    = (req.query.q || "").trim();
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const PER_PAGE = 10;

  if (!q) {
    return res.json({ query: q, total: 0, page, results: [] });
  }

  const queryTokens = tokenize(q);

  // Score and sort results
  const scored = searchIndex
    .map(entry => ({ entry, s: score(entry, queryTokens) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s);

  const total   = scored.length;
  const start   = (page - 1) * PER_PAGE;
  const results = scored.slice(start, start + PER_PAGE).map(({ entry }) => ({
    url:     entry.url,
    title:   entry.title,
    snippet: entry.snippet,
    date:    entry.date,
  }));

  res.json({ query: q, total, page, results });
});

/* ── POST /api/crawl ─────────────────────────────────────── */
/**
 * Body: { "url": "https://example.com/page" }
 *
 * Crawls the given URL using Zyte, extracts content, and adds it
 * to the in-memory search index.
 *
 * NOTE: For production, replace the in-memory array with a database
 * (e.g. SQLite, PostgreSQL, or Elasticsearch).
 */
app.post("/api/crawl", async (req, res) => {
  const { url } = req.body;

  if (!url || !/^https?:\/\//.test(url)) {
    return res.status(400).json({ error: "A valid URL is required." });
  }

  // Check if already indexed
  if (searchIndex.find(e => e.url === url)) {
    return res.json({ message: "URL already in index.", url });
  }

  try {
    /* --- Use Zyte to fetch the page ---------------------- */
    const { body, statusCode } = await fetchPage(url);

    if (statusCode !== 200) {
      return res.status(502).json({ error: `Zyte returned status ${statusCode}` });
    }

    const title   = extractTitle(body);
    const snippet = extractSnippet(body);

    /* Optionally also use article extraction for richer content */
    let articleContent = "";
    try {
      const article = await extractArticle(url);
      articleContent = article.articleBody || "";
    } catch {
      // Article extraction is optional — fall back to raw text
    }

    const entry = {
      url,
      title,
      snippet,
      content:  articleContent || snippet,
      date:     new Date().toISOString().slice(0, 10),
      keywords: tokenize(title + " " + snippet),
    };

    searchIndex.push(entry);

    res.json({ message: "Page indexed successfully.", url, title, snippet });
  } catch (err) {
    console.error("[crawl error]", err.message);
    res.status(500).json({ error: "Failed to crawl URL.", detail: err.message });
  }
});

/* ── GET /api/index ──────────────────────────────────────── */
app.get("/api/index", (_req, res) => {
  res.json({
    total: searchIndex.length,
    entries: searchIndex.map(e => ({ url: e.url, title: e.title, date: e.date })),
  });
});

/* ── Health check ────────────────────────────────────────── */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", indexSize: searchIndex.length });
});

/* ── Start ───────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`ThatSearch backend running on http://localhost:${PORT}`);
  console.log(`Zyte API key: ${process.env.ZYTE_API_KEY ? "✓ set" : "✗ NOT set"}`);
});

module.exports = app; // for testing
