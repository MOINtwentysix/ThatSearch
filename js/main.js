/* ============================================================
   ThatSearch – Homepage Logic  (main.js)
   ============================================================ */

(function () {
  "use strict";

  /* ── Dark-mode ─────────────────────────────────────────── */
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

  /* ── Search input helpers ──────────────────────────────── */
  const searchInput = document.getElementById("searchInput");
  const clearBtn    = document.getElementById("clearBtn");
  const acDropdown  = document.getElementById("autocomplete");
  const searchForm  = document.getElementById("searchForm");

  function updateClearBtn() {
    if (!clearBtn) return;
    if (searchInput.value.trim()) {
      clearBtn.classList.add("visible");
    } else {
      clearBtn.classList.remove("visible");
    }
  }

  clearBtn?.addEventListener("click", () => {
    searchInput.value = "";
    updateClearBtn();
    hideAutocomplete();
    searchInput.focus();
  });

  searchInput?.addEventListener("input", () => {
    updateClearBtn();
    showAutocomplete(searchInput.value);
  });

  /* ── Autocomplete ──────────────────────────────────────── */
  let acIndex = -1;

  function showAutocomplete(val) {
    if (!acDropdown) return;
    const q = val.trim().toLowerCase();
    if (!q) { hideAutocomplete(); return; }

    const matches = AUTOCOMPLETE_SUGGESTIONS.filter(s => s.startsWith(q)).slice(0, 6);
    if (!matches.length) { hideAutocomplete(); return; }

    acDropdown.innerHTML = "";
    matches.forEach((suggestion, i) => {
      const div = document.createElement("div");
      div.className = "autocomplete-item";
      div.setAttribute("role", "option");
      div.innerHTML = `<span class="ac-icon">🔍</span><span>${escapeHtml(suggestion)}</span>`;
      div.addEventListener("click", () => {
        searchInput.value = suggestion;
        updateClearBtn();
        hideAutocomplete();
        searchForm.submit();
      });
      acDropdown.appendChild(div);
    });
    acDropdown.style.display = "block";
    acIndex = -1;
  }

  function hideAutocomplete() {
    if (!acDropdown) return;
    acDropdown.style.display = "none";
    acDropdown.innerHTML = "";
    acIndex = -1;
  }

  /* Keyboard navigation for autocomplete */
  searchInput?.addEventListener("keydown", (e) => {
    if (!acDropdown || acDropdown.style.display === "none") return;
    const items = acDropdown.querySelectorAll(".autocomplete-item");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      acIndex = Math.min(acIndex + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle("focused", i === acIndex));
      if (items[acIndex]) searchInput.value = items[acIndex].textContent.trim();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      acIndex = Math.max(acIndex - 1, -1);
      items.forEach((el, i) => el.classList.toggle("focused", i === acIndex));
      if (acIndex === -1) searchInput.value = "";
    } else if (e.key === "Escape") {
      hideAutocomplete();
    }
  });

  document.addEventListener("click", (e) => {
    if (!acDropdown) return;
    if (!acDropdown.contains(e.target) && e.target !== searchInput) {
      hideAutocomplete();
    }
  });

  /* ── "I'm Feeling Curious" button ─────────────────────── */
  const luckyBtn = document.getElementById("luckyBtn");
  luckyBtn?.addEventListener("click", () => {
    const topics = Object.keys(KB || {});
    if (!topics.length) return;
    const random = topics[Math.floor(Math.random() * topics.length)];
    window.location.href = `search.html?q=${encodeURIComponent(random)}`;
  });

  /* ── Keyboard shortcut: "/" to focus search ────────────── */
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  /* ── Helpers ────────────────────────────────────────────── */
  function escapeHtml(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }
})();
