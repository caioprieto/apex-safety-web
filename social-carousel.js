/* Carrossel de publicações (GSAP; sem GSAP usa transição CSS) */
(function () {
  var root = document.getElementById("sc");
  if (!root) return;
  var viewport = root.querySelector(".sc-viewport"), track = root.querySelector(".sc-track"),
      cards = Array.prototype.slice.call(track.children), dotsWrap = root.querySelector(".sc-dots");
  var GAP = 14, page = 0, pv = 4, pages = 1, cardW = 0, x = 0, timer = null, dragging = false;
  var G = function () { return window.gsap; };

  var perView = function () { var w = window.innerWidth; return w > 960 ? 4 : w > 560 ? 2 : 1; };
  var xFor = function (p) { return -Math.min(p * pv, cards.length - pv) * (cardW + GAP); };

  function move(to, animate) {
    x = to;
    track.style.transition = animate ? "transform .6s cubic-bezier(.22,1,.36,1)" : "none";
    track.style.transform = "translate3d(" + to + "px,0,0)";
  }

  function renderDots() {
    dotsWrap.innerHTML = "";
    for (var i = 0; i < pages; i++) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-label", "Ir para a página " + (i + 1));
      (function (n) { b.addEventListener("click", function () { go(n); restart(); }); })(i);
      dotsWrap.appendChild(b);
    }
  }
  function markDots() {
    Array.prototype.forEach.call(dotsWrap.children, function (b, i) {
      b.classList.toggle("on", i === page); b.setAttribute("aria-selected", i === page);
    });
  }

  function layout() {
    pv = perView();
    pages = Math.ceil(cards.length / pv);
    page = Math.min(page, pages - 1);
    cardW = (viewport.clientWidth - 4 - (pv - 1) * GAP) / pv;
    cards.forEach(function (c) { c.style.width = cardW + "px"; });
    renderDots(); markDots();
    move(xFor(page), false);
  }

  function go(p) {
    page = (p + pages) % pages;
    markDots();
    move(xFor(page), true);
  }

  function restart() { stop(); if (!document.hidden) timer = setInterval(function () { if (!dragging) go(page + 1); }, 5500); }
  function stop() { clearInterval(timer); timer = null; }

  /* arrastar / deslizar */
  var startX = 0, startPos = 0, moved = 0, raf = 0, lastX = 0, lastT = 0, vel = 0;
  function paint() { raf = 0; track.style.transform = "translate3d(" + x + "px,0,0)"; }
  viewport.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true; moved = 0; vel = 0; startX = lastX = e.clientX; lastT = e.timeStamp; stop();
    /* pega a posição atual caso esteja no meio da transição */
    x = startPos = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
    track.style.transition = "none"; track.style.transform = "translate3d(" + x + "px,0,0)";
    try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
    viewport.classList.add("dragging");
  });
  viewport.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    moved = e.clientX - startX;
    var dt = e.timeStamp - lastT;
    if (dt > 0) vel = .8 * vel + .2 * ((e.clientX - lastX) / dt);
    lastX = e.clientX; lastT = e.timeStamp;
    var min = xFor(pages - 1), raw = startPos + moved, pos = raw;
    if (raw > 0) pos = raw * .35; else if (raw < min) pos = min + (raw - min) * .35; /* elástico nas pontas */
    x = pos;
    if (!raf) raf = requestAnimationFrame(paint); /* 1 escrita por frame */
  }, { passive: true });
  var end = function () {
    if (!dragging) return;
    dragging = false; viewport.classList.remove("dragging");
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    var flick = Math.abs(vel) > .4;
    if (Math.abs(moved) > 50 || flick) go(page + ((flick ? vel : moved) < 0 ? 1 : -1)); else go(page);
    restart();
  };
  /* Toque/clique sem arrastar abre o link do card (o pointer capture impede o clique nativo) */
  viewport.addEventListener("pointerup", function (e) {
    var tap = dragging && Math.abs(moved) < 6;
    end();
    if (!tap) return;
    var el = document.elementFromPoint(e.clientX, e.clientY), a = el && el.closest("a.sc-card");
    if (a) window.open(a.href, a.target || "_self", "noopener");
  });
  viewport.addEventListener("pointercancel", end);

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", restart);
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : restart(); });

  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(layout, 120); });

  /* entrada ao rolar até a seção */
  function reveal() {
    if (!G()) return;
    G().from(cards, { opacity: 0, y: 28, duration: .7, ease: "power3.out", stagger: .07, clearProps: "opacity,transform" });
  }

  function init() {
    layout();
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { io.disconnect(); reveal(); restart(); }
      }, { threshold: .25 });
      io.observe(root);
    } else { restart(); }
  }

  if (G()) init();
  else {
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    s.onload = init; s.onerror = init;
    document.head.appendChild(s);
  }
})();
