(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var label = document.getElementById('theme-label');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.dataset.theme || (mq.matches ? 'dark' : 'light');
  }

  function syncToggle() {
    if (!toggle) return;
    var dark = currentTheme() === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (label) label.textContent = dark ? 'DARK' : 'LIGHT';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncToggle();
    });
  }

  if (mq.addEventListener) mq.addEventListener('change', syncToggle);
  syncToggle();

  // Scrollspy: mark the section currently in view.
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));

  if ('IntersectionObserver' in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  // Deep links: /#project opens its entry; the hash also sets the title.
  var BASE_TITLE = document.title;

  function titleFor(id) {
    var a = byId[id];
    if (a) {
      var t = a.querySelector('.t');
      if (t && id !== 'home') return t.textContent.trim() + ' — Saeed Ahmad';
      return BASE_TITLE;
    }
    var d = document.getElementById(id);
    if (d && d.tagName === 'DETAILS') {
      var n = d.querySelector('.e-name');
      if (n) return n.textContent.trim() + ' — Saeed Ahmad';
    }
    return BASE_TITLE;
  }

  function syncHash() {
    var id = location.hash.slice(1);
    var el = id ? document.getElementById(id) : null;
    if (el && el.tagName === 'DETAILS' && !el.open) {
      el.open = true;
      el.scrollIntoView({ block: 'start' });
    }
    document.title = id ? titleFor(id) : BASE_TITLE;
  }

  window.addEventListener('hashchange', syncHash);
  syncHash();

  // Arrow keys move between menu rows; Enter follows the link natively.
  var menu = document.querySelector('.menu');
  if (menu) {
    menu.addEventListener('keydown', function (ev) {
      var i = links.indexOf(document.activeElement);
      if (i === -1) return;
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault();
        var n = ev.key === 'ArrowDown' ? (i + 1) % links.length : (i - 1 + links.length) % links.length;
        links[n].focus();
      }
    });
  }
})();
