/* ============================================================
   ThatSearch – Search Results Logic  (search.js)
   Features: text highlighting, calculator, info cards, tabs
   ============================================================ */

(function () {
  "use strict";

  /* ══════════════════════════════════════════════════════════
     1. DARK MODE  (shared with main.js)
     ══════════════════════════════════════════════════════════ */
  const DARK_KEY = "thatsearch-dark";

  function applyDark(on) {
    document.documentElement.classList.toggle("dark", on);
    const btn = document.getElementById("darkModeToggle");
    if (btn) btn.textContent = on ? "☀️" : "🌙";
  }

  function initDark() {
    const saved = localStorage.getItem(DARK_KEY);
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    applyDark(saved !== null ? saved === "1" : prefersDark);
  }

  document.getElementById("darkModeToggle")?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem(DARK_KEY, isDark ? "1" : "0");
    const btn = document.getElementById("darkModeToggle");
    if (btn) btn.textContent = isDark ? "☀️" : "🌙";
  });

  initDark();

  /* ══════════════════════════════════════════════════════════
     2. URL PARAMETER HELPERS
     ══════════════════════════════════════════════════════════ */
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }

  /* ══════════════════════════════════════════════════════════
     3. SEARCH INPUT WIRING
     ══════════════════════════════════════════════════════════ */
  const searchInput = document.getElementById("searchInput");
  const clearBtn    = document.getElementById("clearBtn");
  const acDropdown  = document.getElementById("autocomplete");
  const searchForm  = document.getElementById("searchForm");

  const rawQuery = getParam("q");
  if (searchInput) searchInput.value = rawQuery;
  document.title = rawQuery ? `${rawQuery} – ThatSearch` : "ThatSearch";

  function updateClearBtn() {
    if (!clearBtn) return;
    clearBtn.classList.toggle("visible", !!searchInput?.value.trim());
  }
  updateClearBtn();

  clearBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    updateClearBtn();
    hideAC();
    searchInput?.focus();
  });
  searchInput?.addEventListener("input", () => {
    updateClearBtn();
    showAC(searchInput.value);
  });

  /* ── Autocomplete (same logic as homepage) ─────────────── */
  let acIndex = -1;

  function showAC(val) {
    if (!acDropdown) return;
    const q = val.trim().toLowerCase();
    if (!q) { hideAC(); return; }
    const matches = (AUTOCOMPLETE_SUGGESTIONS || []).filter(s => s.startsWith(q)).slice(0, 6);
    if (!matches.length) { hideAC(); return; }
    acDropdown.innerHTML = "";
    matches.forEach(suggestion => {
      const div = document.createElement("div");
      div.className = "autocomplete-item";
      div.innerHTML = `<span class="ac-icon">🔍</span><span>${escHtml(suggestion)}</span>`;
      div.addEventListener("click", () => {
        if (searchInput) searchInput.value = suggestion;
        hideAC();
        searchForm?.submit();
      });
      acDropdown.appendChild(div);
    });
    acDropdown.style.display = "block";
    acIndex = -1;
  }
  function hideAC() {
    if (!acDropdown) return;
    acDropdown.style.display = "none";
    acDropdown.innerHTML = "";
    acIndex = -1;
  }
  searchInput?.addEventListener("keydown", (e) => {
    if (!acDropdown || acDropdown.style.display === "none") return;
    const items = acDropdown.querySelectorAll(".autocomplete-item");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      acIndex = Math.min(acIndex + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle("focused", i === acIndex));
      if (items[acIndex] && searchInput) searchInput.value = items[acIndex].textContent.trim();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      acIndex = Math.max(acIndex - 1, -1);
      items.forEach((el, i) => el.classList.toggle("focused", i === acIndex));
      if (acIndex === -1 && searchInput) searchInput.value = rawQuery;
    } else if (e.key === "Escape") { hideAC(); }
  });
  document.addEventListener("click", (e) => {
    if (acDropdown && !acDropdown.contains(e.target) && e.target !== searchInput) hideAC();
  });

  /* ══════════════════════════════════════════════════════════
     4. TEXT HIGHLIGHTING
     ══════════════════════════════════════════════════════════ */
  /**
   * Wraps each occurrence of the query tokens inside `text` with <mark> tags.
   * Uses a regex so it is case-insensitive and handles special chars safely.
   */
  function highlight(text, query) {
    if (!query || !text) return escHtml(text);
    const tokens = query
      .trim()
      .split(/\s+/)
      .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .filter(Boolean);
    if (!tokens.length) return escHtml(text);
    const pattern = new RegExp(`(${tokens.join("|")})`, "gi");
    return escHtml(text).replace(pattern, "<mark>$1</mark>");
  }

  /* ══════════════════════════════════════════════════════════
     5. CALCULATOR
     ══════════════════════════════════════════════════════════ */
  const MATH_RE = /^[\d\s\+\-\*\/\^\(\)\.\%πe]+(sqrt|sin|cos|tan|log|abs|pow|PI|E|Math\.)*/;

  function isMathExpression(q) {
    const cleaned = q.trim().replace(/[×÷]/g, (c) => (c === "×" ? "*" : "/"));
    return MATH_RE.test(cleaned) && /[\d]/.test(cleaned) && /[\+\-\*\/\^]|sqrt/.test(cleaned);
  }

  /**
   * Safely evaluate a math expression without using raw eval on arbitrary input.
   * Only digits, operators, parentheses, π and common math functions are allowed.
   */
  function safeCalc(expr) {
    // Normalize input symbols to JS operators
    let e = expr
      .replace(/[×]/g, "*")
      .replace(/[÷]/g, "/")
      .replace(/π/g, "Math.PI")
      .replace(/\^/g, "**")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/abs\(/g, "Math.abs(");

    // Whitelist: only allow safe characters
    if (!/^[\d\s\+\-\*\/\.\(\)\%eE\.a-zA-Z_,]+$/.test(e)) return null;
    // Disallow anything that looks like property access exploit
    if (/\.\s*constructor|prototype|__proto__|process|window|document/i.test(e)) return null;

    try {
      /* new Function is safer than eval — no closure access */
      // eslint-disable-next-line no-new-func
      const result = new Function(`"use strict"; return (${e})`)();
      if (!isFinite(result)) return "Undefined";
      // Round to 10 significant figures to avoid floating-point noise
      return parseFloat(result.toPrecision(10)).toString();
    } catch {
      return null;
    }
  }

  /* ── Calculator widget DOM ──────────────────────────────── */
  const calcWidget     = document.getElementById("calculatorWidget");
  const calcExpression = document.getElementById("calcExpression");
  const calcResult     = document.getElementById("calcResult");
  let calcExpr = "";

  function renderCalc() {
    if (!calcExpression || !calcResult) return;
    calcExpression.textContent = calcExpr || "0";
    const res = safeCalc(calcExpr);
    calcResult.textContent = res !== null ? `= ${res}` : "";
  }

  function initCalculatorWidget(initialExpr) {
    calcExpr = initialExpr || "";
    renderCalc();

    document.getElementById("calcKeypad")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".calc-key");
      if (!btn) return;
      const action = btn.dataset.action;
      const val    = btn.dataset.val;

      if (action === "clear") {
        calcExpr = "";
      } else if (action === "backspace") {
        calcExpr = calcExpr.slice(0, -1);
      } else if (action === "equals") {
        const res = safeCalc(calcExpr);
        if (res !== null) calcExpr = res;
      } else if (val !== undefined) {
        calcExpr += val;
      }
      renderCalc();
    });

    /* Also allow keyboard input when calculator is visible */
    document.addEventListener("keydown", (e) => {
      if (!calcWidget || calcWidget.style.display === "none") return;
      if (document.activeElement === searchInput) return;
      if ("0123456789.+-*/^%()".includes(e.key)) {
        calcExpr += e.key;
        renderCalc();
      } else if (e.key === "Backspace") {
        calcExpr = calcExpr.slice(0, -1);
        renderCalc();
      } else if (e.key === "Enter" || e.key === "=") {
        const res = safeCalc(calcExpr);
        if (res !== null) calcExpr = res;
        renderCalc();
      } else if (e.key === "Escape") {
        calcExpr = "";
        renderCalc();
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     6. INFO CARD
     ══════════════════════════════════════════════════════════ */
  function renderInfoCard(entry) {
    const card = document.getElementById("infoCard");
    if (!card || !entry) return;

    document.getElementById("infoName").textContent        = entry.name        || "";
    document.getElementById("infoSubtitle").textContent    = entry.subtitle     || "";
    document.getElementById("infoDescription").textContent = entry.description  || "";

    // Table of facts
    const table = document.getElementById("infoTable");
    table.innerHTML = (entry.facts || [])
      .map(([k, v]) => `<tr><td>${escHtml(k)}</td><td>${escHtml(v)}</td></tr>`)
      .join("");

    // Tags
    const tagsEl = document.getElementById("infoTags");
    tagsEl.innerHTML = (entry.tags || [])
      .map(t => `<span class="info-tag">${escHtml(t)}</span>`)
      .join("");

    // Image
    const img = document.getElementById("infoImage");
    if (entry.image) {
      img.src = entry.image;
      img.alt = entry.name;
      img.style.display = "";
    } else {
      img.style.display = "none";
    }

    card.style.display = "block";
  }

  /* ══════════════════════════════════════════════════════════
     7. RESULT RENDERING
     ══════════════════════════════════════════════════════════ */
  const RESULTS_PER_PAGE = 5;

  function renderResults(results, query, page) {
    const list      = document.getElementById("resultsList");
    const metaEl    = document.getElementById("resultsMeta");
    const noResults = document.getElementById("noResults");
    const pagination= document.getElementById("pagination");

    if (!results || !results.length) {
      if (list)      list.innerHTML = "";
      if (noResults) noResults.style.display = "block";
      if (metaEl)    metaEl.textContent = "";
      return;
    }

    if (noResults) noResults.style.display = "none";

    const total  = results.length;
    const pages  = Math.ceil(total / RESULTS_PER_PAGE);
    const start  = (page - 1) * RESULTS_PER_PAGE;
    const slice  = results.slice(start, start + RESULTS_PER_PAGE);

    if (metaEl) {
      metaEl.textContent = `About ${total} results (demo mode)`;
    }

    if (list) {
      list.innerHTML = "";
      slice.forEach((r, idx) => {
        const item = document.createElement("article");
        item.className = "result-item";
        item.style.animationDelay = `${idx * 0.06}s`;

        const hostname = (() => {
          try { return new URL(r.url).hostname; } catch { return r.url; }
        })();

        item.innerHTML = `
          <div class="result-source">
            <div class="result-favicon">${hostname.charAt(0).toUpperCase()}</div>
            <span class="result-url">${escHtml(hostname)}</span>
          </div>
          <h3 class="result-title" data-href="${escHtml(r.url)}">${highlight(r.title, query)}</h3>
          <p class="result-snippet">${highlight(r.snippet, query)}</p>
          ${r.date ? `<p class="result-date">${escHtml(r.date)}</p>` : ""}
        `;

        item.querySelector(".result-title")?.addEventListener("click", (e) => {
          const href = e.target.dataset.href;
          if (href) window.open(href, "_blank", "noopener");
        });

        list.appendChild(item);
      });
    }

    /* Pagination */
    if (pagination) {
      pagination.innerHTML = "";
      if (pages > 1) {
        if (page > 1) {
          const prev = makePagBtn("‹", page - 1, query);
          pagination.appendChild(prev);
        }
        for (let p = 1; p <= pages; p++) {
          const btn = makePagBtn(p, p, query);
          if (p === page) btn.classList.add("active");
          pagination.appendChild(btn);
        }
        if (page < pages) {
          const next = makePagBtn("›", page + 1, query);
          pagination.appendChild(next);
        }
      }
    }
  }

  function makePagBtn(label, targetPage, query) {
    const btn = document.createElement("button");
    btn.className = "page-btn";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      const url = new URL(window.location.href);
      url.searchParams.set("q", query);
      url.searchParams.set("p", targetPage);
      window.location.href = url.toString();
    });
    return btn;
  }

  /* ══════════════════════════════════════════════════════════
     8. TABS
     ══════════════════════════════════════════════════════════ */
  function setTab(tabName) {
    document.querySelectorAll(".tab").forEach(t => {
      t.classList.toggle("active", t.dataset.tab === tabName);
    });

    const calcWidget  = document.getElementById("calculatorWidget");
    const infoCard    = document.getElementById("infoCard");
    const resultsSection = document.getElementById("resultsSection");

    if (tabName === "calculator") {
      if (calcWidget)      calcWidget.style.display = "block";
      if (infoCard)        infoCard.style.display   = "none";
      if (resultsSection)  resultsSection.style.display = "none";
    } else if (tabName === "info") {
      if (calcWidget)      calcWidget.style.display = "none";
      if (infoCard)        infoCard.style.display   = "block";
      if (resultsSection)  resultsSection.style.display = "none";
    } else {
      // "all" tab – show whatever is applicable
      if (resultsSection)  resultsSection.style.display = "block";
      // keep calc/info visible if they were shown by the search
    }
  }

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => setTab(tab.dataset.tab));
  });

  /* ══════════════════════════════════════════════════════════
     9. MAIN  –  run the search
     ══════════════════════════════════════════════════════════ */
  function runSearch() {
    const query = rawQuery.trim();
    if (!query) {
      window.location.href = "index.html";
      return;
    }

    const page = parseInt(getParam("p") || "1", 10);

    /* ── Calculator detection ─────────────────────────────── */
    const isCalc = isMathExpression(query);
    const calcWidgetEl = document.getElementById("calculatorWidget");
    if (isCalc && calcWidgetEl) {
      calcWidgetEl.style.display = "block";
      initCalculatorWidget(query);
    }

    /* ── Info card ────────────────────────────────────────── */
    const kbEntry = lookupKB(query);
    if (kbEntry) {
      renderInfoCard(kbEntry);
    }

    /* ── Results ─────────────────────────────────────────── */
    const results = lookupResults(query);
    renderResults(results, query, page);
  }

  runSearch();

  /* ══════════════════════════════════════════════════════════
     10. UTILITIES
     ══════════════════════════════════════════════════════════ */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
