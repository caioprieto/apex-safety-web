(() => {
  const root = document.getElementById('product-content');
  const id = new URLSearchParams(location.search).get('id');
  const index = id === null ? -1 : /^\d+$/.test(id) ? Number(id) : -1;
  const p = window.CATALOGO[index];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if (!p) {
    root.innerHTML = '<section class="product-missing"><span class="catalog-eyebrow">CATÁLOGO APEX SAFETY</span><h1>Produto não encontrado.</h1><p>Explore o catálogo para encontrar o equipamento que você precisa.</p><a class="btn btn-primary" href="produtos.html">Ver produtos</a></section>';
    return;
  }
  const category = window.CATEGORIAS[p.cat][0];
  document.title = p.nome + ' | Apex Safety';
  document.querySelector('meta[name="description"]').content = `${p.nome}. Marca ${p.marca}. Código ${p.cod}. Solicite sua cotação na Apex Safety.`;
  root.innerHTML = `
    <nav class="product-crumbs" aria-label="Caminho de navegação"><ol><li><a href="index.html">Início</a></li><li><a href="produtos.html">Produtos</a></li><li><a href="produtos.html?linha=${p.cat}">${esc(category)}</a></li><li class="product-crumb-current"><span aria-current="page" title="${esc(p.nome)}">${esc(p.nome)}</span></li></ol></nav>
    <section class="detail product-detail">
      <div class="product-visual"><button type="button" class="product-photo" id="product-photo-open" aria-label="Ampliar imagem de ${esc(p.nome)}"><span class="prod-tag">${esc(category)}</span><img src="${p.foto}" alt="${esc(p.nome)}" width="600" height="480" fetchpriority="high"><span class="product-photo-expand" aria-hidden="true">⤢ <span>Ampliar imagem</span></span></button></div>
      <div class="product-info"><a class="product-back" href="produtos.html?linha=${p.cat}"><i class="fa-solid fa-arrow-left"></i> Voltar à categoria</a><span class="product-brand-logo product-brand-logo-lg"><img src="${window.MARCAS[p.marca]}" alt="${esc(p.marca)}" width="150" height="58"></span><h1>${esc(p.nome)}</h1>
        <div class="product-identifiers">${p.ca ? `<span class="ca-badge">${esc(p.ca)}</span>` : ''}<span>Cód. ${esc(p.cod)}</span></div>
        <p class="product-intro">Solicite uma proposta para sua empresa. Nossa equipe confirma disponibilidade, variações e condições para a quantidade que você precisa.</p>
        <div class="product-quote"><h2>Proteção na medida da sua equipe.</h2><p>Condições e valores sob consulta.</p><label for="product-qty">Quantidade desejada</label><div class="qty" role="group" aria-label="Selecionar quantidade"><button type="button" id="product-minus" aria-label="Diminuir quantidade">−</button><input type="number" id="product-qty" aria-describedby="product-qty-help" min="1" max="999999" step="1" value="1" inputmode="numeric"><button type="button" id="product-plus" aria-label="Aumentar quantidade">+</button></div><small id="product-qty-help">Informe tamanhos e outras variações na solicitação.</small><a id="product-quote-link" class="btn btn-primary btn-lg btn-block btn-nav-cta btn-cta-lg" href="orcamento.html">Solicitar cotação <i class="fa-solid fa-arrow-right"></i></a><a id="product-wa" class="btn btn-outline-light btn-lg btn-block btn-nav-cta btn-cta-lg btn-cta-gray" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=5519996952906">Conversar com o comercial <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></div>
      </div>
    </section>
    <section class="product-spec-section"><div><h2>Conheça o Produto</h2><p>Precisa de uma ficha técnica ou de ajuda para escolher? Fale com nossa equipe comercial.</p></div><dl class="product-specs"><div><dt>Marca</dt><dd>${esc(p.marca)}</dd></div><div><dt>Linha de proteção</dt><dd>${esc(category)}</dd></div><div><dt>Código do produto</dt><dd>${esc(p.cod)}</dd></div><div><dt>CA informado no catálogo</dt><dd>${p.ca ? esc(p.ca) : 'Não informado no catálogo'}</dd></div><div><dt>Referência</dt><dd>Catálogo 2026 · página ${p.pagina}</dd></div></dl></section>
    <section class="product-related"><div class="sec-head"><div><span class="catalog-eyebrow">CONTINUE EXPLORANDO</span><h2>Mais opções de ${esc(category.toLowerCase())}</h2></div><a href="produtos.html?linha=${p.cat}" class="more">Ver categoria →</a></div><div class="prod-grid">${window.CATALOGO.map((d,i)=>({d,i})).filter(x=>x.d.cat===p.cat&&x.i!==index).slice(0,4).map(({d,i})=>`<article class="prod"><a class="prod-img" href="produto.html?id=${i}"><img src="${d.foto}" alt="${esc(d.nome)}" width="600" height="480" loading="lazy"></a><div class="prod-body"><span class="product-brand-logo"><img src="${window.MARCAS[d.marca]}" alt="${esc(d.marca)}" width="110" height="43" loading="lazy"></span><h3><a href="produto.html?id=${i}">${esc(d.nome)}</a></h3><div class="prod-foot"><a class="more" href="produto.html?id=${i}">Ver detalhes →</a></div></div></article>`).join('')}</div></section>`;
  window.initProductViewer(document.getElementById("product-photo-open"), p);
  const qty = document.getElementById('product-qty');
  const update = () => {
    const n = Math.min(999999, Math.max(1, Math.trunc(Number(qty.value)) || 1));
    qty.value = n;
    document.getElementById('product-minus').disabled = n <= Number(qty.min);
    document.getElementById('product-plus').disabled = n >= Number(qty.max);
    const msg = `Olá! Gostaria de cotar ${n} unidade(s) de ${p.nome}. Marca: ${p.marca}. Código: ${p.cod}${p.ca ? '. CA: '+p.ca : ''}.`;
    document.getElementById('product-quote-link').href = `orcamento.html?linha=${p.cat}&msg=${encodeURIComponent(msg)}`;
    document.getElementById('product-wa').href = `https://api.whatsapp.com/send?phone=5519996952906&text=${encodeURIComponent(msg)}`;
  };
  qty.addEventListener('change', update);
  qty.addEventListener('input', () => { if (qty.value) update(); });
  document.getElementById('product-minus').addEventListener('click',()=>{qty.value=Number(qty.value)-1;update();});
  document.getElementById('product-plus').addEventListener('click',()=>{qty.value=Number(qty.value)+1;update();});
  update();
})();
