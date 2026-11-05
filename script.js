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
    if (window.gsap) initDD();
    else { const g = document.createElement("script"); g.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"; g.onload = initDD; document.head.appendChild(g); }
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

    grid.innerHTML = dados.map((d) => {
      const c = cats[d.cat];
      const msg = `Olá! Gostaria de cotar: ${d.nome} (${d.marca}${d.ca ? ", " + d.ca : ""}, cód. ${d.cod}).`;
      const linha = linhasForm.includes(d.cat) ? d.cat : "";
      return `<article class="prod">
        <div class="prod-img"><span class="prod-tag">${esc(c[0])}</span><div class="ph"><i class="fa-solid ${c[1]}"></i>${esc(d.marca)}</div></div>
        <div class="prod-body"><span class="brand-tag">${esc(d.marca)}</span><h3>${esc(d.nome)}</h3>
          <div class="ids">${d.ca ? `<span class="ca-badge">${esc(d.ca)}</span>` : ""}<span class="ca">${esc(d.cod)}</span></div>
          <div class="prod-foot"><a class="btn btn-primary btn-sm" href="orcamento.html?linha=${linha}&msg=${encodeURIComponent(msg)}">Cotar</a></div></div>
      </article>`;
    }).join("");
    const cards = $$(".prod", grid);
    const textos = dados.map(d => norm(`${d.nome} ${d.ca} ${d.cod} ${d.marca}`));

    const aplicar = () => {
      const q = norm(busca.value.trim()), m = selMarca.value;
      let n = 0;
      cards.forEach((el, i) => {
        const d = dados[i];
        const ok = (catAtual === "todos" || d.cat === catAtual) && (!m || d.marca === m) && (!q || textos[i].includes(q));
        el.hidden = !ok;
        if (ok) n++;
      });
      $$(".chip", filtros).forEach(c => c.classList.toggle("on", c.dataset.f === catAtual));
      count.textContent = n + (n === 1 ? " produto encontrado" : " produtos encontrados");
      empty.hidden = n > 0;
    };
    filtros.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) { catAtual = b.dataset.f; aplicar(); } });
    selMarca.addEventListener("change", aplicar);

    /* Dropdown customizado de marcas (o select original continua como fonte do valor) */
    (() => {
      const opts = Array.from(selMarca.options);
      const wrap = document.createElement("div");
      wrap.className = "dd-select";
      wrap.innerHTML = `<button type="button" class="dds-btn" aria-haspopup="listbox" aria-expanded="false"><i class="fa-solid fa-tag dds-ico"></i><span class="dds-label"></span><i class="fa-solid fa-chevron-down dds-chev"></i></button>
        <ul class="dds-list" role="listbox" hidden>${opts.map((o, i) => `<li role="option" data-i="${i}" tabindex="-1">${esc(o.textContent)}<i class="fa-solid fa-check"></i></li>`).join("")}</ul>`;
      selMarca.classList.add("sr-only-select");
      selMarca.insertAdjacentElement("afterend", wrap);
      const btn = $(".dds-btn", wrap), list = $(".dds-list", wrap), label = $(".dds-label", wrap), items = $$("li", list);
      const sync = () => {
        label.textContent = selMarca.options[selMarca.selectedIndex].textContent;
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
    busca.addEventListener("input", aplicar);
    aplicar();
  }

  /* Página do produto */
  const qty = $("#qty");
  if (qty) {
    const label = $("#qty-label");
    const sizeLabel = $("#size-label");
    const update = () => {
      let v = Math.max(1, parseInt(qty.value, 10) || 1);
      qty.value = v;
      label.textContent = v;
      const size = $(".size.on").textContent;
      const msg = `Olá! Gostaria de um orçamento de ${v} pares da Luva de proteção Apex, tamanho ${size}.`;
      $("#wa-btn").href = `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(msg)}`;
      $("#quote-btn").href = `orcamento.html?linha=maos&msg=${encodeURIComponent(msg)}`;
    };
    $("#qty-minus").addEventListener("click", () => { qty.value = (parseInt(qty.value, 10) || 1) - 1; update(); });
    $("#qty-plus").addEventListener("click", () => { qty.value = (parseInt(qty.value, 10) || 0) + 1; update(); });
    qty.addEventListener("input", update);
    $$(".size").forEach(b => b.addEventListener("click", () => {
      $$(".size").forEach(x => x.classList.remove("on"));
      b.classList.add("on");
      sizeLabel.textContent = b.textContent;
      update();
    }));
    $$(".thumb").forEach(t => t.addEventListener("click", () => {
      $$(".thumb").forEach(x => x.classList.remove("on"));
      t.classList.add("on");
      $("#main-img").src = t.dataset.src;
    }));
    update();
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

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = $("#form-ok");
      const required = $$("[required]", form);
      let valid = true;
      required.forEach(f => {
        const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.style.borderColor = bad ? "#d64545" : "";
        if (bad) valid = false;
      });
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
