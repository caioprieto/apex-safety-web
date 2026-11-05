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
    "#apex-loader{position:fixed;inset:0;z-index:99999;background:#0a0d1c;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:30px;will-change:transform}" +
    "#apex-loader::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 45%,rgba(244,124,58,.16),transparent 70%)}" +
    /* logo 1444x483: triângulo 0–36,15% | escrita 42,8–100% */
    "#apex-loader .al-logo{position:relative;width:min(240px,62vw);aspect-ratio:1444/483}" +
    "#apex-loader .al-logo img{position:absolute;top:0;height:100%;display:block}" +
    "#apex-loader .al-mark{left:0;width:36.15%}" +
    "#apex-loader .al-text{left:calc(42.8% - 3px);width:57.2%}" +
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
      '<img class="al-text" src="logo-apex-text.png" alt="Apex Safety" width="826" height="483">' +
    '</div>';
  root.appendChild(el);

  /* ---------- estado real do carregamento ---------- */
  var MIN = 2000, MAX = 5000, t0 = performance.now();
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

  /* ---------- animação (GSAP) ---------- */
  function run() {
    var q = function (s) { return el.querySelector(s); };
    /* 1) triângulo gira uma vez  2) escrita aparece depois */
    gsap.set(q(".al-text"), { opacity: 0, x: -24, clipPath: "inset(0 100% 0 0)" });
    gsap.set(q(".al-mark"), { opacity: 0, scale: .4, rotation: -360, transformOrigin: "50% 50%" });

    gsap.timeline()
      .to(q(".al-mark"), { opacity: 1, duration: .35, ease: "power1.out" }, 0)
      .to(q(".al-mark"), { rotation: 0, scale: 1, duration: 1.1, ease: "power3.inOut" }, 0)
      .to(q(".al-text"), { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)", duration: .8, ease: "expo.out" }, 1.0);

    var tick = function () {
      if (done() && performance.now() - t0 >= MIN) return exit();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    function exit() {
      gsap.timeline({ onComplete: unlock })
        .to(q(".al-logo"), { scale: 1.05, duration: .4, ease: "power2.out" })
        .to(el, { yPercent: -100, duration: .85, ease: "expo.inOut" }, .1);
    }
  }

  function boot() {
    if (window.gsap) return run();
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    s.onload = run;
    s.onerror = function () { setTimeout(unlock, 300); };
    document.head.appendChild(s);
  }
  boot();
})();
