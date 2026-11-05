/* Preloader Apex Safety — logo oficial (triângulo + escrita separados) animados com GSAP.
   - Aparece na 1ª página da sessão e a cada recarregamento (F5); navegar entre páginas abre direto.
   - Fecha quando a página termina de carregar (mínimo p/ a animação, teto p/ não travar). */
(function () {
  var KEY = "apex-preloaded";
  var seen = false;
  var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  var isReload = nav && nav.type === "reload";
  try { seen = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  if (seen && !isReload) return;
  try { sessionStorage.setItem(KEY, "1"); } catch (e) {}

  var root = document.documentElement;
  root.classList.add("is-loading");

  var css = ".is-loading{overflow:hidden}" +
    "#apex-loader{position:fixed;inset:0;z-index:99999;background:#0a0d1c;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:30px;will-change:transform;transform:translate3d(0,0,0);contain:strict}" +
    "#apex-loader::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 45%,rgba(244,124,58,.16),transparent 70%)}" +
    /* logo 1444x483: triângulo 0–36,15% | escrita 42,8–100% */
    "#apex-loader .al-logo{position:relative;width:min(240px,62vw);aspect-ratio:1444/483;will-change:transform;transform:translate3d(0,0,0)}" +
    "#apex-loader .al-logo img{position:absolute;top:0;height:100%;display:block;backface-visibility:hidden;will-change:transform,opacity}" +
    "#apex-loader .al-mark{left:0;width:36.15%;opacity:0;transform:translate3d(0,0,0) rotate(-360deg) scale(.4)}" +
    "#apex-loader .al-wrap{position:absolute;top:0;height:100%;left:calc(42.8% - 3px);width:57.2%;overflow:hidden}" +
    "#apex-loader .al-text{left:0;width:100%;opacity:0;transform:translate3d(-101%,0,0)}" +
    /* tudo só com transform/opacity -> roda no compositor (GPU), sem depender da main thread */
    "#apex-loader.go .al-mark{animation:alMark 1.1s cubic-bezier(.77,0,.175,1) both,alFade .35s ease-out both}" +
    "#apex-loader.go .al-text{animation:alText .8s cubic-bezier(.16,1,.3,1) 1s both}" +
    "#apex-loader.out .al-logo{transition:transform .4s cubic-bezier(.25,.46,.45,.94);transform:translate3d(0,0,0) scale(1.05)}" +
    "#apex-loader.out{transition:transform .85s cubic-bezier(.87,0,.13,1) .1s;transform:translate3d(0,-100%,0)}" +
    "@keyframes alMark{from{transform:translate3d(0,0,0) rotate(-360deg) scale(.4)}to{transform:translate3d(0,0,0) rotate(0) scale(1)}}" +
    "@keyframes alFade{from{opacity:0}to{opacity:1}}" +
    "@keyframes alText{from{opacity:0;transform:translate3d(-101%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}" +
    "";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var el = document.createElement("div");
  el.id = "apex-loader";
  el.setAttribute("role", "status");
  el.setAttribute("aria-label", "Carregando Apex Safety");
  el.innerHTML =
    '<div class="al-logo">' +
      '<img class="al-mark" src="logo-apex-mark.png" alt="" width="522" height="483">' +
      '<div class="al-wrap"><img class="al-text" src="logo-apex-text.png" alt="Apex Safety" width="826" height="483"></div>' +
    '</div>';
  root.appendChild(el);

  /* ---------- estado real do carregamento ---------- */
  var MIN = 2000, MAX = 5000;
  var loaded = document.readyState === "complete", fontsOk = false;
  window.addEventListener("load", function () { loaded = true; });
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { fontsOk = true; });
  setTimeout(function () { loaded = fontsOk = true; }, MAX);
  var done = function () { return loaded && fontsOk; };

  function unlock() {
    root.classList.remove("is-loading");
    if (el.parentNode) el.parentNode.removeChild(el);
    if (style.parentNode) style.parentNode.removeChild(style);
  }

  /* ---------- animação (CSS compositor) ---------- */
  function run() {
    var started = false, t0 = performance.now();
    function start() {
      if (started) return; started = true;
      t0 = performance.now();
      el.classList.add("go");
      var tick = function () {
        if (done() && performance.now() - t0 >= MIN) return exit();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
    /* só começa quando as imagens estão decodificadas -> sem engasgo no 1º frame */
    var imgs = el.querySelectorAll("img");
    var jobs = [].map.call(imgs, function (i) { return i.decode ? i.decode().catch(function () {}) : Promise.resolve(); });
    Promise.all(jobs).then(function () { requestAnimationFrame(start); });
    setTimeout(start, 600);

    function exit() {
      var finished = false;
      function end() { if (finished) return; finished = true; unlock(); }
      el.addEventListener("transitionend", function (e) { if (e.target === el) end(); });
      setTimeout(end, 1500);
      el.classList.add("out");
    }
  }
  run();
})();
