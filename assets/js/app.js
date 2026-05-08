(function () {
  'use strict';

  const SITE_LAST_UPDATE = 'mai 2026';

  /* ---- LAST UPDATE DATE ------------------------------------ */
  function initLastUpdate() {
    document.querySelectorAll('[data-last-update]').forEach(function (el) {
      el.textContent = SITE_LAST_UPDATE;
    });
  }

  /* ---- LANGUAGE SWITCH ------------------------------------- */
  function initLangSwitch() {
    document.querySelectorAll('[data-lang-switch]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var newLang = link.getAttribute('data-lang-switch');
        var path = window.location.pathname;
        var segments = path.split('/').filter(Boolean);
        var subpath = segments.slice(1).join('/');
        var newUrl = '/' + newLang + '/' + (subpath ? subpath + '/' : '');
        window.location.href = newUrl;
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

  /* ---- PROOF MODAL ---------------------------------------- */
  function initProofModal() {
    var dialog = document.getElementById('proof-dialog');
    if (!dialog) return;

    var dialogCounter = dialog.querySelector('.dialog__counter');
    var dialogLabel = dialog.querySelector('.dialog__label');
    var dialogSub = dialog.querySelector('.dialog__sub');
    var dialogLink = dialog.querySelector('.dialog__link');
    var dialogAbandoned = dialog.querySelector('.dialog__abandoned');
    var closeBtn = dialog.querySelector('.dialog__close');

    document.querySelectorAll('.proof-cell').forEach(function (cell) {
      cell.addEventListener('click', function () { openProofModal(cell); });
      cell.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProofModal(cell);
        }
      });
    });

    function openProofModal(cell) {
      var isSovara = cell.classList.contains('sovara');

      if (dialogCounter) {
        dialogCounter.textContent = isSovara ? '0' : '1';
        dialogCounter.style.color = isSovara ? 'var(--green)' : 'var(--red)';
      }
      if (dialogLabel) {
        dialogLabel.textContent = isSovara
          ? '✓ Sovara — trackers détectés'
          : '✗ Access Dots — trackers détectés';
      }
      if (dialogSub) {
        dialogSub.textContent = isSovara
          ? '0 tracker · 0 permission injustifiée · vérifié εxodus Privacy'
          : '1 tracker détecté · AppMetrica (Yandex)';
      }
      if (dialogAbandoned) {
        dialogAbandoned.style.display = isSovara ? 'none' : 'block';
      }
      dialog.showModal();
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () { dialog.close(); });
    }

    dialog.addEventListener('click', function (e) {
      var rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });

    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') dialog.close();
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
  document.addEventListener('DOMContentLoaded', function () {
    initLastUpdate();
    initLangSwitch();
    initSmoothScroll();
    initCopyButtons();
    initPlayStoreCTA();
    initProofModal();
    initReducedMotion();
    initHamburger();
  });
}());
