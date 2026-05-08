/* Globia / Sovara — app.js
   Vanilla JS: theme toggle, language switch, smooth scroll
   No frameworks, no trackers, < 100 lines */

(function () {
  'use strict';

  const SUPPORTED_LANGS = ['en', 'fr', 'de', 'es', 'ar'];
  const STORAGE_LANG = 'globia-lang';
  const STORAGE_THEME = 'globia-theme';

  /* --- Theme --- */
  function getStoredTheme() {
    return localStorage.getItem(STORAGE_THEME) || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_THEME, theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function initTheme() {
    const stored = getStoredTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored || (prefersDark ? 'dark' : 'light'));
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* --- Language --- */
  function detectBrowserLang() {
    const nav = (navigator.language || navigator.userLanguage || 'en').substring(0, 2).toLowerCase();
    return SUPPORTED_LANGS.includes(nav) ? nav : 'en';
  }

  function currentLang() {
    const path = window.location.pathname;
    for (const l of SUPPORTED_LANGS) {
      if (path.startsWith('/' + l + '/') || path === '/' + l) return l;
    }
    return null;
  }

  function switchLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    localStorage.setItem(STORAGE_LANG, lang);
    const base = window.location.origin;
    window.location.href = base + '/' + lang + '/';
  }

  function initLangSelector() {
    const selects = document.querySelectorAll('.lang-select');
    const lang = currentLang() || 'en';
    selects.forEach(sel => {
      sel.value = lang;
      sel.addEventListener('change', () => switchLang(sel.value));
    });
  }

  /* --- Root redirect (called from index.html only) --- */
  window.redirectToLang = function () {
    const stored = localStorage.getItem(STORAGE_LANG);
    const target = (stored && SUPPORTED_LANGS.includes(stored)) ? stored : detectBrowserLang();
    window.location.replace('/' + target + '/');
  };

  /* --- Smooth scroll --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  }

  /* --- Copy pitch to clipboard --- */
  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); } catch (e) { /* silent */ }
    document.body.removeChild(ta);
  }

  function initCopyButtons() {
    document.querySelectorAll('[data-copy-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const el = document.getElementById(btn.dataset.copyTarget);
        if (!el) return;
        const text = el.innerText;
        const done = () => {
          const orig = btn.textContent;
          btn.textContent = btn.dataset.copied || 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
        };
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
        } else {
          fallbackCopy(text, done);
        }
      });
    });
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLangSelector();
    initSmoothScroll();
    initCopyButtons();

    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.addEventListener('click', toggleTheme);
  });
})();
