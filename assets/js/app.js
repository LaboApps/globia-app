(function () {
  'use strict';

  const SITE_LAST_UPDATE = 'mai 2026';

  /* Formspree — remplacer par l'ID obtenu sur formspree.io (gratuit) */
  var FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

  /* ---- LAST UPDATE DATE ------------------------------------ */
  function initLastUpdate() {
    document.querySelectorAll('[data-last-update]').forEach(function (el) {
      el.textContent = SITE_LAST_UPDATE;
    });
  }

  /* ---- LANGUAGE SWITCH (footer data-lang-switch links) ---- */
  function initLangSwitch() {
    document.querySelectorAll('[data-lang-switch]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var newLang = link.getAttribute('data-lang-switch');
        var path = window.location.pathname;
        var segments = path.split('/').filter(Boolean);
        var subpath = segments.slice(1).join('/');
        window.location.href = '/' + newLang + '/' + (subpath ? subpath + '/' : '');
      });
    });
  }

  /* ---- LANG SWITCHER DROPDOWN (header) -------------------- */
  function initLangSwitcher() {
    var button = document.querySelector('.lang-button');
    var menu = document.querySelector('.lang-menu');
    if (!button || !menu) return;

    function close() {
      button.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
    function open() {
      button.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
    }

    button.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.hidden) { open(); } else { close(); }
    });

    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && e.target !== button && !button.contains(e.target)) { close(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); }
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var newLang = link.getAttribute('lang');
        var path = window.location.pathname;
        var segments = path.split('/').filter(Boolean);
        var subpath = segments.slice(1).join('/');
        window.location.href = '/' + newLang + '/' + (subpath ? subpath + '/' : '');
      });
    });
  }

  /* ---- SMOOTH SCROLL FOR ANCHORS --------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ---- COPY BUTTONS (press pitch) -------------------------- */
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.pitch-card');
        if (!card) return;
        var textEl = card.querySelector('.pitch-card__text');
        if (!textEl) return;
        var text = textEl.innerText || textEl.textContent;
        var original = btn.textContent;

        function onSuccess() {
          btn.textContent = 'Copié';
          setTimeout(function () { btn.textContent = original; }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
            fallbackCopy(text, onSuccess);
          });
        } else {
          fallbackCopy(text, onSuccess);
        }
      });
    });
  }

  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); cb(); } catch (err) {}
    document.body.removeChild(ta);
  }

  /* ---- TOAST (CTA "Bientôt sur Google Play") --------------- */
  var toastTimer = null;
  var currentToast = null;

  function showToast(message) {
    if (currentToast) {
      currentToast.remove();
      clearTimeout(toastTimer);
      currentToast = null;
    }

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-atomic', 'true');

    var textEl = document.createElement('p');
    textEl.className = 'toast__text';
    textEl.textContent = message;

    var closeBtn = document.createElement('button');
    closeBtn.className = 'toast__close';
    closeBtn.setAttribute('aria-label', 'Fermer la notification');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', function () { dismissToast(toast); });

    toast.appendChild(textEl);
    toast.appendChild(closeBtn);
    document.body.appendChild(toast);
    currentToast = toast;

    function startTimer() {
      toastTimer = setTimeout(function () {
        if (!toast.contains(document.activeElement)) {
          dismissToast(toast);
        }
      }, 6000);
    }

    startTimer();

    toast.addEventListener('focusin', function () {
      clearTimeout(toastTimer);
    });
    toast.addEventListener('focusout', function () {
      startTimer();
    });
  }

  function dismissToast(toast) {
    if (!toast.parentNode) return;
    toast.classList.add('is-hiding');
    setTimeout(function () {
      if (toast.parentNode) toast.remove();
      if (currentToast === toast) currentToast = null;
    }, 200);
  }

  function initPlayStoreCTA() {
    document.querySelectorAll('[data-cta-playstore]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        showToast('Sovara arrive sur le Play Store en mai-juin 2026.');
      });
    });
  }


  /* ---- CONTACT FORM ---------------------------------------- */
  function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn-form-submit');
      var okMsg = form.querySelector('.form-feedback--ok');
      var errMsg = form.querySelector('.form-feedback--err');
      var originalText = btn.textContent;
      var loadingText = btn.getAttribute('data-loading') || '…';

      btn.disabled = true;
      btn.textContent = loadingText;
      if (okMsg) okMsg.hidden = true;
      if (errMsg) errMsg.hidden = true;

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.ok) {
          form.reset();
          btn.hidden = true;
          if (okMsg) okMsg.hidden = false;
        } else {
          btn.disabled = false;
          btn.textContent = originalText;
          if (errMsg) errMsg.hidden = false;
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = originalText;
        if (errMsg) errMsg.hidden = false;
      });
    });
  }

  /* ---- REDUCED MOTION -------------------------------------- */
  function initReducedMotion() {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    function apply(matches) {
      document.documentElement.classList.toggle('reduced-motion', matches);
    }
    apply(mq.matches);
    mq.addEventListener('change', function (e) { apply(e.matches); });
  }

  /* ---- HAMBURGER MENU (mobile) ----------------------------- */
  function initHamburger() {
    var btn = document.querySelector('.topbar__hamburger');
    var nav = document.querySelector('.topbar__nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- INIT ------------------------------------------------ */
  function init() {
    initLastUpdate();
    initLangSwitch();
    initLangSwitcher();
    initSmoothScroll();
    initCopyButtons();
    initPlayStoreCTA();
    initContactForm();
    initReducedMotion();
    initHamburger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
