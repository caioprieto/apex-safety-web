/* Carrega o GSAP uma única vez e devolve uma Promise (null se falhar). */
window.gsapReady = () => window.__gsapP || (window.__gsapP = new Promise(resolve => {
  if (window.gsap) return resolve(window.gsap);
  const g = document.createElement("script");
  g.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
  g.onload = () => resolve(window.gsap);
  g.onerror = () => resolve(null);
  document.head.appendChild(g);
}));

/* Ajusta os codigos para caberem inteiros em uma linha. */
window.fitProductCodes = (root) => {
  const codes = Array.from(root.querySelectorAll('.ids .ca'));
  const context = document.createElement('canvas').getContext('2d');
  const fit = (code) => {
    if (!code.clientWidth) return;
    const style = getComputedStyle(code);
    context.font = style.fontWeight + ' 10px ' + style.fontFamily;
    const width = context.measureText(code.textContent).width;
    code.style.fontSize = Math.min(10, Math.floor((code.clientWidth - 1) / width * 100) / 10) + 'px';
  };
  const observer = new ResizeObserver(entries => entries.forEach(({target}) => fit(target)));
  codes.forEach(code => observer.observe(code));
  if (document.fonts) document.fonts.ready.then(() => codes.forEach(fit));
};

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const WA = "5519996952906";

  /* Menu mobile */
  const toggle = $("#nav-toggle");
  const links = $("#nav-links");
  const header = $(".site-header");
  const setMenu = (open) => {
    links.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    document.body.classList.toggle("no-scroll", open);
    if (!open) $$(".has-drop", links).forEach(l => l.classList.remove("open"));
  };
  if (toggle && links && header) {
    links.insertAdjacentHTML("beforeend", '<li class="menu-cta"><a class="btn btn-primary btn-lg btn-block" href="orcamento.html">Solicitar orçamento <i class="fa-solid fa-arrow-right"></i></a></li>');
    toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
    // fecha ao tocar em qualquer link, exceto o "Produtos" (que só expande a lista)
    links.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a && !a.parentElement.classList.contains("has-drop")) setMenu(false);
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 820) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  }

  /* Navbar sempre visível: fica fixa e ganha fundo ao rolar */
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Imagens dos cards de soluções: .webp -> .png -> ícone */
  $$(".cat-art img").forEach(img => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) img.parentElement.classList.add("no-img");
    img.addEventListener("error", function fail() {
      if (img.src.endsWith(".webp")) { img.src = img.src.replace(/\.webp$/, ".png"); return; }
      img.removeEventListener("error", fail);
      img.parentElement.classList.add("no-img");
    });
  });

  /* Dropdown de Produtos */
  const DD = [
    ["cabeca", "Cabeça", "Capacetes, bonés e toucas", "fa-helmet-safety"],
    ["maos", "Mãos", "Luvas de todos os tipos", "fa-hand"],
    ["visual", "Visual e facial", "Óculos e protetores faciais", "fa-glasses"],
    ["auditiva", "Auditiva", "Abafadores e protetores", "fa-headphones"],
    ["respiratoria", "Respiratória", "Máscaras, filtros e cartuchos", "fa-head-side-mask"],
    ["pes", "Pés", "Botas, botinas e sapatos", "fa-shoe-prints"],
    ["vestimentas", "Vestimentas", "Coletes, capas e aventais", "fa-vest"],
    ["altura", "Altura e queda", "Cintos, talabartes e travas", "fa-person-falling"],
    ["pele", "Pele", "Cremes, protetor solar e sabonetes", "fa-pump-soap"],
    ["sinalizacao", "Sinalização", "Telas e tapumes", "fa-triangle-exclamation"]
  ];
  const prodLink = $$("#nav-links a").find(a => a.getAttribute("href") === "produtos.html");
  if (prodLink) {
    const li = prodLink.parentElement;
    li.classList.add("has-drop");
    if (!prodLink.querySelector(".fa-chevron-down")) prodLink.insertAdjacentHTML("beforeend", ' <i class="fa-solid fa-chevron-down chev"></i>');
    else prodLink.querySelector(".fa-chevron-down").classList.add("chev");
    li.insertAdjacentHTML("beforeend",
      '<div class="dropdown" role="menu"><div class="dd-grid">' +
      DD.map(d => '<a role="menuitem" href="produtos.html?linha=' + d[0] + '"><span class="dd-ico"><img src="imagens/solucoes/' + d[0] + '.webp?v=5" alt="" width="96" height="72" loading="lazy" decoding="async" draggable="false"><i class="fa-solid ' + d[3] + '"></i></span><span><b>' + d[1] + '</b><small>' + d[2] + '</small></span></a>').join("") +
      '</div><a class="dd-all" href="produtos.html">Ver catálogo completo <i class="fa-solid fa-arrow-right"></i></a></div>');
    /* Fotos do dropdown: aparecem com fade; se falharem, o ícone assume suavemente */
    const ddImg = (img) => {
      const box = img.parentElement;
      const ok = () => box.classList.add("has-img");
      const fail = () => box.classList.add("no-img");
      if (img.complete) { img.naturalWidth ? ok() : fail(); }
      else { img.addEventListener("load", ok, { once: true }); img.addEventListener("error", fail, { once: true }); }
    };
    $$(".dd-ico img", li).forEach(ddImg);

    /* Dropdown animado com GSAP (desktop). Sem GSAP, o CSS de hover continua funcionando. */
    const dd = $(".dropdown", li), chev = $(".chev", prodLink), desktop = window.matchMedia("(min-width: 821px)");
    const initDD = () => {
      const G = window.gsap; if (!G) return;
      document.documentElement.classList.add("gsap-dd");
      let tl = null, timer = null;
      const items = () => $$(".dd-grid a", dd);
      const build = () => {
        dd.style.setProperty("--caret", (prodLink.offsetLeft + prodLink.offsetWidth / 2 + 18) + "px");
        tl = G.timeline({ paused: true, defaults: { ease: "power3.out" },
          onReverseComplete: () => { dd.style.visibility = "hidden"; } });
        tl.fromTo(dd, { autoAlpha: 0, y: 14, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .38, ease: "expo.out" }, 0)
          .fromTo(chev, { rotation: 0 }, { rotation: 180, duration: .3 }, 0)
          .from(items(), { opacity: 0, y: 10, duration: .32, stagger: .035 }, .08)
          .from($(".dd-all", dd), { opacity: 0, y: 8, duration: .3 }, .3);
      };
      const open = () => { if (!desktop.matches) return; clearTimeout(timer); if (!tl) build(); tl.timeScale(1).play(); };
      const close = () => { clearTimeout(timer); timer = setTimeout(() => { if (tl) tl.timeScale(1.7).reverse(); }, 140); };
      li.addEventListener("mouseenter", open);
      li.addEventListener("mouseleave", close);
      li.addEventListener("focusin", open);
      li.addEventListener("focusout", (e) => { if (!li.contains(e.relatedTarget)) close(); });
      li.addEventListener("keydown", (e) => { if (e.key === "Escape") { clearTimeout(timer); if (tl) tl.timeScale(1.7).reverse(); prodLink.blur(); } });
      window.addEventListener("resize", () => {
        if (!tl) return;
        tl.kill(); tl = null;
        G.set([dd, chev, items(), $(".dd-all", dd)], { clearProps: "all" });
      });
    };
    window.gsapReady().then(initDD);
    prodLink.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 820px)").matches) { e.preventDefault(); li.classList.toggle("open"); }
    });
  }

  /* Catálogo completo */
  const grid = $("#grid");
  if (grid && window.CATALOGO) {
    const dados = window.CATALOGO, cats = window.CATEGORIAS;
    const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const filtros = $("#filters"), selMarca = $("#marca"), busca = $("#busca"), count = $("#count"), empty = $("#empty");
    const params = new URLSearchParams(location.search);
    let catAtual = cats[params.get("linha")] ? params.get("linha") : "todos";
    const linhasForm = ["cabeca", "maos", "visual", "auditiva", "vestimentas", "altura", "pes"];

    const contagem = {};
    dados.forEach(d => { contagem[d.cat] = (contagem[d.cat] || 0) + 1; });
    const mkChip = (k, label) => `<button class="chip${k === catAtual ? " on" : ""}" data-f="${k}">${label}</button>`;
    filtros.innerHTML = mkChip("todos", `Todos (${dados.length})`) +
      Object.keys(cats).filter(k => contagem[k]).map(k => mkChip(k, `${cats[k][0]} (${contagem[k]})`)).join("");
    [...new Set(dados.map(d => d.marca))].forEach(m => selMarca.insertAdjacentHTML("beforeend", `<option>${esc(m)}</option>`));

    grid.innerHTML = dados.map((d, index) => {
      const c = cats[d.cat];
      const msg = `Olá! Gostaria de cotar: ${d.nome} (${d.marca}${d.ca ? ", " + d.ca : ""}, cód. ${d.cod}).`;
      const linha = linhasForm.includes(d.cat) ? d.cat : "";
      return `<article class="prod">
        <a class="prod-img" href="produto.html?id=${index}" aria-label="Ver ${esc(d.nome)}"><span class="prod-tag">${esc(c[0])}</span><img src="${d.foto}" alt="${esc(d.nome)}" width="480" height="400" loading="lazy" decoding="async"></a>
        <div class="prod-body"><span class="product-brand-logo"><img src="${window.MARCAS[d.marca]}" alt="${esc(d.marca)}" width="110" height="43" loading="lazy" decoding="async"></span><h3><a href="produto.html?id=${index}">${esc(d.nome)}</a></h3>
          <div class="ids">${d.ca ? `<span class="ca-badge">${esc(d.ca)}</span>` : ""}<span class="ca">${esc(d.cod)}</span></div>
          <div class="prod-foot"><a class="more" href="produto.html?id=${index}">Ver detalhes <i class="fa-solid fa-arrow-right"></i></a><a class="btn btn-primary btn-sm btn-nav-cta btn-card-quote" href="orcamento.html?linha=${linha}&msg=${encodeURIComponent(msg)}">Cotar <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div></div>
      </article>`;
    }).join("");
    const cards = $$(".prod", grid);
    window.fitProductCodes(grid);
    const textos = dados.map(d => norm(`${d.nome} ${d.ca} ${d.cod} ${d.marca}`));

    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const results = grid.parentElement;
    results.classList.add("catalog-results");

    /* Estado vazio */
    empty.className = "empty-state";
    empty.innerHTML = '<div class="empty-ico"><i class="fa-solid fa-magnifying-glass"></i></div>' +
      '<h3>Nenhum produto encontrado</h3>' +
      '<p class="empty-msg"></p>' +
      '<div class="empty-actions"><button type="button" class="btn btn-primary btn-nav-cta empty-clear">Limpar filtros <i class="fa-solid fa-rotate-left" aria-hidden="true"></i></button>' +
      '<a href="orcamento.html" class="empty-link">Falar com o comercial <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div>';
    const emptyMsg = $(".empty-msg", empty);

    /* Loader com a marca da Apex girando (GSAP) */
    const loader = document.createElement("div");
    loader.className = "cat-loader";
    loader.hidden = true;
    loader.setAttribute("role", "status");
    loader.innerHTML = '<div class="cat-loader-box"><span class="cat-loader-ring"></span><img src="logo-apex-mark.png" alt="" width="52" height="47"><span class="sr-only">Carregando produtos</span></div>';
    results.appendChild(loader);
    const mark = $("img", loader), ring = $(".cat-loader-ring", loader);
    let spin = null, shownAt = 0, hideTimer = 0;
    const showLoader = () => {
      clearTimeout(hideTimer);
      if (!loader.hidden) return;
      shownAt = performance.now();
      loader.hidden = false;
      results.setAttribute("aria-busy", "true");
      window.gsapReady().then(G => {
        if (!G || loader.hidden) return;
        if (spin) spin.kill();
        spin = G.timeline({ repeat: -1 });
        spin.fromTo(ring, { rotation: 0 }, { rotation: 360, duration: 1.1, ease: "none" }, 0)
          .fromTo(mark, { rotation: 0, scale: .92 }, { rotation: 360, scale: 1, duration: 1.1, ease: "power2.inOut" }, 0);
        G.fromTo(loader, { opacity: 0 }, { opacity: 1, duration: .18, overwrite: true });
      });
    };
    const hideLoader = (min = 420) => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        const done = () => { loader.hidden = true; results.removeAttribute("aria-busy"); if (spin) { spin.kill(); spin = null; } };
        if (window.gsap && !reduced()) window.gsap.to(loader, { opacity: 0, duration: .22, onComplete: done });
        else done();
      }, Math.max(0, min - (performance.now() - shownAt)));
    };

    const filtrar = (scroll = false) => {
      const q = norm(busca.value.trim()), m = selMarca.value;
      let n = 0;
      const porCat = { todos: 0 };
      cards.forEach((el, i) => {
        const d = dados[i];
        const base = (!m || d.marca === m) && (!q || textos[i].includes(q));
        if (base) { porCat.todos++; porCat[d.cat] = (porCat[d.cat] || 0) + 1; }
        const ok = base && (catAtual === "todos" || d.cat === catAtual);
        el.hidden = !ok;
        if (ok) n++;
      });
      /* Contadores das categorias acompanham busca e marca */
      $$(".chip", filtros).forEach(c => {
        const k = c.dataset.f, total = porCat[k] || 0;
        const nome = k === "todos" ? "Todos" : cats[k][0];
        const txt = `${nome} (${total})`;
        if (c.textContent !== txt) c.textContent = txt;
        c.classList.toggle("is-zero", total === 0);
      });
      $$(".chip", filtros).forEach(c => (c.classList.toggle("on", c.dataset.f === catAtual), c.setAttribute("aria-pressed", String(c.dataset.f === catAtual))));
      count.textContent = n + (n === 1 ? " produto encontrado" : " produtos encontrados");
      const wasHidden = empty.hidden;
      empty.hidden = n > 0;
      if (n === 0) {
        const partes = [];
        if (q) partes.push(`a busca “${busca.value.trim()}”`);
        if (catAtual !== "todos") partes.push(`a categoria ${cats[catAtual][0]}`);
        if (m) partes.push(`a marca ${m}`);
        emptyMsg.textContent = partes.length
          ? `Não há itens que combinem com ${partes.join(", ").replace(/, ([^,]*)$/, " e $1")}. Tente remover algum filtro ou fale com nossa equipe.`
          : "Não encontramos itens no catálogo. Fale com nossa equipe.";
        if (wasHidden && window.gsap && !reduced()) {
          window.gsap.fromTo(empty, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: "power3.out", clearProps: "transform" });
          window.gsap.fromTo($$(".empty-ico, h3, .empty-msg, .empty-actions", empty), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4, stagger: .06, delay: .05, ease: "power2.out" });
        }
        /* Sem resultado: leva a tela até o aviso com o contato do comercial */
        if (scroll) requestAnimationFrame(() => {
          const r = empty.getBoundingClientRect(), vh = window.innerHeight;
          if (r.top < 80 || r.bottom > vh - 16) empty.scrollIntoView({ block: r.height > vh - 160 ? "start" : "center", behavior: reduced() ? "auto" : "smooth" });
        });
      }
    };
    let pending = 0;
    const aplicar = (delay = 0) => {
      clearTimeout(pending);
      showLoader();
      pending = setTimeout(() => { filtrar(true); hideLoader(); }, delay);
    };
    $(".empty-clear", empty).addEventListener("click", () => {
      busca.value = ""; catAtual = "todos"; selMarca.selectedIndex = 0;
      selMarca.dispatchEvent(new Event("change")); // atualiza o dropdown e reaplica os filtros
      revealCategory(filtros.querySelector('[data-f="todos"]'));
    });
    const revealCategory = (button, smooth = true) => {
      if (!button) return;
      const left = button.offsetLeft - filtros.offsetLeft - (filtros.clientWidth - button.offsetWidth) / 2;
      filtros.scrollTo({ left, behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' });
    };
    filtros.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (b && b.dataset.f !== catAtual) { catAtual = b.dataset.f; aplicar(); }
      if (b) revealCategory(b);
    });
    filtros.addEventListener('focusin', e => {
      if (e.target.matches('.chip')) revealCategory(e.target);
    });
    requestAnimationFrame(() => revealCategory(filtros.querySelector('.chip.on'), false));
    selMarca.addEventListener("change", () => aplicar());

    /* Dropdown customizado de marcas (o select original continua como fonte do valor) */
    (() => {
      const opts = Array.from(selMarca.options);
      const wrap = document.createElement("div");
      wrap.className = "dd-select brand-select";
      const brandOption = (o) => o.value
        ? '<span class="brand-option-logo"><img src="' + window.MARCAS[o.value] + '" alt="" width="88" height="34"></span><span class="brand-option-copy"><b>' + esc(o.textContent) + '</b><small>' + dados.filter(d => d.marca === o.value).length + ' produtos</small></span>'
        : '<span class="brand-option-all" aria-hidden="true"><i class="fa-solid fa-layer-group"></i></span><span class="brand-option-copy"><b>Todas as marcas</b><small>Explore todas as fabricantes</small></span>';
      wrap.innerHTML = `<button type="button" class="dds-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="Filtrar produtos por marca" aria-controls="brand-options"><span class="dds-label"></span><i class="fa-solid fa-chevron-down dds-chev"></i></button>
        <ul class="dds-list" id="brand-options" role="listbox" aria-label="Marcas de EPI" hidden>${opts.map((o, i) => `<li role="option" data-i="${i}" tabindex="-1">${brandOption(o)}<i class="fa-solid fa-check" aria-hidden="true"></i></li>`).join("")}</ul>`;
      selMarca.classList.add("sr-only-select");
      selMarca.insertAdjacentElement("afterend", wrap);
      const btn = $(".dds-btn", wrap), list = $(".dds-list", wrap), label = $(".dds-label", wrap), items = $$("li", list);
      const sync = () => {
        label.innerHTML = brandOption(selMarca.options[selMarca.selectedIndex]);
        wrap.classList.toggle("has-value", !!selMarca.value);
        items.forEach((li, i) => { const on = i === selMarca.selectedIndex; li.classList.toggle("on", on); li.setAttribute("aria-selected", on); });
      };
      const open = (v) => {
        list.hidden = !v; wrap.classList.toggle("open", v); btn.setAttribute("aria-expanded", v);
        if (v) { const on = $("li.on", list); if (on) list.scrollTop = on.offsetTop - list.clientHeight / 2 + on.clientHeight / 2; }
      };
      btn.addEventListener("click", () => open(list.hidden));
      list.addEventListener("click", (e) => {
        const li = e.target.closest("li"); if (!li) return;
        selMarca.selectedIndex = +li.dataset.i;
        selMarca.dispatchEvent(new Event("change"));
        open(false); btn.focus();
      });
      document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) open(false); });
      wrap.addEventListener("keydown", (e) => {
        if (e.key === "Escape") { open(false); btn.focus(); }
        else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault(); if (list.hidden) open(true);
          const cur = items.indexOf(document.activeElement);
          const next = e.key === "ArrowDown" ? Math.min(cur + 1, items.length - 1) : Math.max(cur - 1, 0);
          items[cur < 0 ? Math.max(selMarca.selectedIndex, 0) : next].focus();
        } else if ((e.key === "Enter" || e.key === " ") && document.activeElement.matches("li")) { e.preventDefault(); document.activeElement.click(); }
      });
      selMarca.addEventListener("change", sync);
      sync();
    })();
    busca.addEventListener("input", () => aplicar(260));
    filtrar();
  }

  /* Formulário de orçamento */
  const form = $("#quote-form");
  if (form) {
    const params = new URLSearchParams(location.search);
    const chips = $$("#lines .chip");
    chips.forEach(c => c.addEventListener("click", () => {
      c.classList.toggle("on-o");
      c.textContent = c.textContent.replace(/^✓ /, "");
      if (c.classList.contains("on-o")) c.textContent = "✓ " + c.textContent;
    }));
    const pre = params.get("linha");
    if (pre) { const c = chips.find(x => x.dataset.l === pre); if (c) c.click(); }
    if (params.get("msg")) $("#msg").value = params.get("msg");

    const maskTel = v => {
      const d = v.replace(/\D/g, "").slice(0, 11);
      if (d.length <= 2) return d.length ? "(" + d : "";
      if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
      return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    };
    const maskCnpj = v => {
      const d = v.replace(/\D/g, "").slice(0, 14);
      return d.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
    };
    const telEl = $("#tel"), cnpjEl = $("#cnpj");
    if (telEl) { telEl.maxLength = 15; telEl.addEventListener("input", () => { telEl.value = maskTel(telEl.value); }); }
    if (cnpjEl) { cnpjEl.maxLength = 18; cnpjEl.addEventListener("input", () => { cnpjEl.value = maskCnpj(cnpjEl.value); }); }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = $("#form-ok");
      const required = $$("[required]", form);
      let valid = true;
      required.forEach(f => {
        let bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        if (f === telEl && !bad) bad = !/^\d{10,11}$/.test(f.value.replace(/\D/g, ""));
        f.style.borderColor = bad ? "#d64545" : "";
        if (bad) valid = false;
      });
      if (cnpjEl) {
        const badCnpj = cnpjEl.value.trim() && cnpjEl.value.replace(/\D/g, "").length !== 14;
        cnpjEl.style.borderColor = badCnpj ? "#d64545" : "";
        if (badCnpj) valid = false;
      }
      if (!valid) {
        ok.style.background = "#fdeaea"; ok.style.color = "#a12626";
        ok.textContent = "Preencha os campos obrigatórios (*) corretamente.";
        ok.classList.add("show");
        return;
      }
      const linhas = chips.filter(c => c.classList.contains("on-o")).map(c => c.textContent.replace("✓ ", "")).join(", ") || "não informado";
      const text = [
        "Olá! Gostaria de solicitar um orçamento de EPIs.",
        `Nome: ${$("#nome").value}`,
        `Empresa: ${$("#empresa").value}`,
        `Telefone: ${$("#tel").value}`,
        `CNPJ: ${$("#cnpj").value || "não informado"}`,
        `Colaboradores: ${$("#colab").value}`,
        `Linhas: ${linhas}`,
        `Mensagem: ${$("#msg").value || "-"}`
      ].join("\n");
      ok.style.background = ""; ok.style.color = "";
      ok.textContent = "Solicitação pronta! Abrindo o WhatsApp do comercial para finalizar o envio...";
      ok.classList.add("show");
      window.open(`https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
  }
});

/* Hero da home: carrossel controlável (arrastar, deslizar de lado, setas, barras) com texto trocado via GSAP.
   O texto de cada slide vem dos atributos data-* de .hero-slide no index.html. */
(() => {
  const section = document.querySelector(".hero-home.has-slides");
  if (!section) return;
  const slides = Array.from(section.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;
  const h1 = section.querySelector(".hero-copy h1"), lead = section.querySelector(".hero-copy .lead");
  const bars = Array.from(section.querySelectorAll(".hero-bar"));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const HOLD = 7, FADE = 0.9;
  const mobile = window.matchMedia("(max-width: 820px)");
  const SHIFT = () => mobile.matches ? 7 : 3.5;        /* % deslocado na troca (menor que o excesso do slide) */
  const OVERSCAN = () => window.innerWidth * (mobile.matches ? .1 : .03); /* px que o slide excede a tela */
  let cur = 0, busy = false, call = null, G = null, dragging = null, wheelLock = 0, manual = false;

  const lazy = () => slides.forEach(s => { const i = s.querySelector("img[data-src]"); if (i) { i.src = i.dataset.src; i.removeAttribute("data-src"); } });
  const textHTML = i => { const d = slides[i].dataset; return { h1: `<span class="hl">${esc(d.h1)}</span><br><span class="hl grad">${esc(d.grad)}</span>`, lead: d.lead }; };
  const progress = () => {
    bars.forEach((b, i) => { const f = b.firstElementChild; b.classList.toggle("on", i === cur); b.setAttribute("aria-current", i === cur ? "true" : "false"); if (G && i !== cur) G.set(f, { scaleX: 0 }); else if (G && manual) G.set(f, { scaleX: 1 }); });
  };
  /* Assim que o usuário interage, o autoplay para de vez (só volta ao recarregar a página) */
  const takeControl = () => {
    if (manual) return;
    manual = true;
    if (call) { call.kill(); call = null; }
    if (G && bars[cur]) G.set(bars[cur].firstElementChild, { scaleX: 1, overwrite: true });
  };
  const autoplay = () => {
    if (call) call.kill();
    if (manual || !G || reduced) return;
    const fill = bars[cur] && bars[cur].firstElementChild;
    if (fill) G.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: HOLD, ease: "none", overwrite: true });
    call = G.delayedCall(HOLD, () => go(1, null, true));
  };
  const drift = el => G.fromTo(el.querySelector("img"), { scale: 1.08 }, { scale: 1, duration: HOLD + FADE + 2, ease: "none", overwrite: "auto" });

  const swapText = (to, dir) => {
    const t = textHTML(to), out = [...h1.querySelectorAll(".hl"), lead];
    G.to(out, { opacity: 0, x: -28 * dir, duration: .28, ease: "power2.in", stagger: .04, overwrite: true, onComplete: () => {
      h1.innerHTML = t.h1; lead.textContent = t.lead;
      G.fromTo([...h1.querySelectorAll(".hl"), lead], { opacity: 0, x: 34 * dir }, { opacity: 1, x: 0, duration: .6, ease: "power3.out", stagger: .09, clearProps: "transform" });
    } });
  };

  /* Conclui na hora qualquer transição em andamento, para o usuário poder interagir a qualquer momento */
  const finish = () => {
    if (!busy) return;
    G.killTweensOf(slides); G.killTweensOf([...h1.querySelectorAll(".hl"), lead]);
    slides.forEach((s, i) => G.set(s, i === cur ? { x: 0, xPercent: 0, autoAlpha: 1, zIndex: 2 } : { x: 0, xPercent: 0, autoAlpha: 0, zIndex: 1 }));
    const t = textHTML(cur); h1.innerHTML = t.h1; lead.textContent = t.lead;
    G.set([...h1.querySelectorAll(".hl"), lead], { opacity: 1, x: 0 });
    busy = false;
  };
  function go(dir, target, auto) {
    if (!G) return;
    finish();
    if (!auto) takeControl();
    const to = target != null ? target : (cur + dir + slides.length) % slides.length;
    if (to === cur) { settle(); return; }
    if (target != null) dir = to > cur ? 1 : -1;
    const out = slides[cur], inn = slides[to], img = inn.querySelector("img");
    const run = () => {
      busy = true; cur = to; progress();
      G.set(inn, { zIndex: 2, x: 0, xPercent: SHIFT() * dir, autoAlpha: 0 }); G.set(out, { zIndex: 1 });
      drift(inn);
      G.to(inn, { xPercent: 0, autoAlpha: 1, duration: FADE + .3, ease: "power3.out" });
      G.to(out, { xPercent: -SHIFT() * dir, x: 0, autoAlpha: 0, duration: FADE, ease: "power2.inOut", onComplete: () => { busy = false; G.set(out, { xPercent: 0, x: 0 }); } });
      swapText(to, dir);
      autoplay();
    };
    if (img.complete && img.naturalWidth) run(); else { img.addEventListener("load", run, { once: true }); img.addEventListener("error", autoplay, { once: true }); }
  }
  const settle = () => { G.to(slides[cur], { x: 0, autoAlpha: 1, duration: .45, ease: "power3.out" }); autoplay(); };

  /* Arrastar com mouse/toque; rolagem lateral do trackpad; setas do teclado */
  const onDown = e => {
    if ((e.pointerType === "mouse" && e.button !== 0) || e.target.closest("a, button, input")) return;
    finish(); takeControl();
    dragging = { x: e.clientX, y: e.clientY, dx: 0, active: false, id: e.pointerId };
  };
  const onMove = e => {
    if (!dragging || e.pointerId !== dragging.id) return;
    const dx = e.clientX - dragging.x, dy = e.clientY - dragging.y;
    if (!dragging.active) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      dragging.active = true; section.classList.add("is-dragging");
      try { section.setPointerCapture(e.pointerId); } catch (_) {}
    }
    dragging.dx = dx;
    const o = OVERSCAN();
    G.set(slides[cur], { x: o * Math.tanh(dx * .55 / o), autoAlpha: 1 - Math.min(.5, Math.abs(dx) / section.clientWidth) });
  };
  const onUp = e => {
    if (!dragging || e.pointerId !== dragging.id) return;
    const { dx, active } = dragging; dragging = null;
    section.classList.remove("is-dragging");
    if (!active) return;
    if (Math.abs(dx) > Math.min(90, section.clientWidth * .15)) go(dx < 0 ? 1 : -1); else settle();
  };
  const onWheel = e => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
    e.preventDefault();
    const now = performance.now();
    if (now < wheelLock) return;
    wheelLock = now + 900;
    go(e.deltaX > 0 ? 1 : -1);
  };

  const start = () => {
    lazy();
    window.gsapReady().then(g => {
      if (!g) return;
      G = g;
      G.set(slides, { autoAlpha: 0 }); G.set(slides[0], { autoAlpha: 1, zIndex: 2 });
      if (!reduced) drift(slides[0]);
      section.classList.add("is-interactive");
      progress(); autoplay();
      section.addEventListener("pointerdown", onDown);
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerup", onUp);
      section.addEventListener("pointercancel", onUp);
      section.addEventListener("selectstart", e => { if (dragging) e.preventDefault(); });
      section.addEventListener("dragstart", e => e.preventDefault());
      section.addEventListener("wheel", onWheel, { passive: false });
      section.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(1); else if (e.key === "ArrowLeft") go(-1); });
      bars.forEach((b, i) => b.addEventListener("click", () => go(0, i)));
      const prev = section.querySelector(".hero-prev"), nxt = section.querySelector(".hero-next");
      if (prev) prev.addEventListener("click", () => go(-1));
      if (nxt) nxt.addEventListener("click", () => go(1));
      document.addEventListener("visibilitychange", () => { if (call) call.paused(document.hidden); });
    });
  };
  if (document.readyState === "complete") start(); else window.addEventListener("load", start, { once: true });
})();

/* Select customizado genérico (mesmo visual do filtro de marcas): use <select data-dd> */
(() => {
  document.querySelectorAll("select[data-dd]").forEach((sel, n) => {
    const opts = Array.from(sel.options);
    const wrap = document.createElement("div");
    wrap.className = "dd-select";
    const id = "dd-list-" + n, labelEl = sel.id ? document.querySelector(`label[for="${sel.id}"]`) : null;
    wrap.innerHTML = `<button type="button" class="dds-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}"><span class="dds-label"></span><i class="fa-solid fa-chevron-down dds-chev" aria-hidden="true"></i></button>
      <ul class="dds-list" id="${id}" role="listbox" hidden>${opts.map((o, i) => `<li role="option" data-i="${i}" tabindex="-1"><span></span><i class="fa-solid fa-check" aria-hidden="true"></i></li>`).join("")}</ul>`;
    const btn = wrap.querySelector(".dds-btn"), list = wrap.querySelector(".dds-list"), label = wrap.querySelector(".dds-label"), items = Array.from(list.querySelectorAll("li"));
    items.forEach((li, i) => { li.firstElementChild.textContent = opts[i].textContent; });
    if (labelEl) { btn.setAttribute("aria-labelledby", labelEl.id || (labelEl.id = id + "-lbl")); list.setAttribute("aria-labelledby", labelEl.id); labelEl.addEventListener("click", e => { e.preventDefault(); btn.focus(); }); }
    sel.classList.add("sr-only-select"); sel.tabIndex = -1; sel.setAttribute("aria-hidden", "true");
    sel.insertAdjacentElement("afterend", wrap);
    const sync = () => {
      label.textContent = sel.options[sel.selectedIndex].textContent;
      wrap.classList.toggle("has-value", !!sel.value);
      items.forEach((li, i) => { const on = i === sel.selectedIndex; li.classList.toggle("on", on); li.setAttribute("aria-selected", on); });
    };
    const open = v => {
      list.hidden = !v; wrap.classList.toggle("open", v); btn.setAttribute("aria-expanded", v);
      if (v) { const on = list.querySelector("li.on"); if (on) list.scrollTop = on.offsetTop - list.clientHeight / 2 + on.clientHeight / 2; }
    };
    btn.addEventListener("click", () => open(list.hidden));
    list.addEventListener("click", e => {
      const li = e.target.closest("li"); if (!li) return;
      sel.selectedIndex = +li.dataset.i; sel.dispatchEvent(new Event("change")); sync(); open(false); btn.focus();
    });
    document.addEventListener("click", e => { if (!wrap.contains(e.target)) open(false); });
    wrap.addEventListener("keydown", e => {
      if (e.key === "Escape") { open(false); btn.focus(); }
      else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); if (list.hidden) open(true);
        const cur = items.indexOf(document.activeElement);
        const nxt = e.key === "ArrowDown" ? Math.min(cur + 1, items.length - 1) : Math.max(cur - 1, 0);
        items[cur < 0 ? Math.max(sel.selectedIndex, 0) : nxt].focus();
      } else if ((e.key === "Enter" || e.key === " ") && document.activeElement.matches("li")) { e.preventDefault(); document.activeElement.click(); }
    });
    sel.addEventListener("change", sync);
    sync();
  });
})();
