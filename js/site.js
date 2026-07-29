/* EnlifeStudio — site behaviour */
(function () {
  'use strict';

  /* ---------- header state ---------- */
  var head = document.querySelector('.head');
  var floatHead = head && head.classList.contains('is-float');
  var floatUntil = 0;

  function measure() {
    var h = document.querySelector('.hero, .page-hero');
    floatUntil = h ? h.offsetHeight - 90 : 0;
  }

  function onScroll() {
    if (!head) return;
    var y = window.scrollY;
    head.classList.toggle('is-stuck', y > 40);
    if (floatHead) head.classList.toggle('is-float', y < floatUntil);
  }

  measure();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); });

  /* ---------- mobile drawer ---------- */
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.drawer a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rv.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    rv.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- lightbox ---------- */
  var lb = document.querySelector('.lb');
  if (!lb) return;
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('.lb-cap');
  var pool = [];
  var idx = 0;

  function collect() {
    pool = [].slice.call(document.querySelectorAll('.tile:not([hidden])'));
  }

  function show(i) {
    if (!pool.length) return;
    idx = (i + pool.length) % pool.length;
    var t = pool[idx];
    var thumb = t.querySelector('img');
    lbImg.src = t.dataset.full || thumb.src;
    lbImg.alt = thumb.alt || '';
    lbCap.textContent = t.dataset.cap || thumb.alt || '';
  }

  function open(i) {
    collect();
    show(i);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.addEventListener('click', function (e) {
    var tile = e.target.closest('.tile');
    if (tile) {
      collect();
      open(pool.indexOf(tile));
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var tile = e.target.closest && e.target.closest('.tile');
    if (!tile) return;
    e.preventDefault();
    collect();
    open(pool.indexOf(tile));
  });

  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
