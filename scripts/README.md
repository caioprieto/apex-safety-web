# Imagens do catálogo

As 282 imagens WebP em `imagens/produtos` foram recortadas do PDF Catálogo Apex Safety 2026 v2, na ordem dos itens de `catalogo.js`. `fotos-produtos.js` associa cada item à foto e à página do PDF. Os selos sobrepostos às fotos no documento original foram preservados.

Para refazer a extração local, instale as ferramentas em uma pasta ignorada:

    npm install --no-save --package-lock=false --prefix .tools pdfjs-dist @napi-rs/canvas playwright
    node scripts/render-pdf.mjs
    node scripts/extract-photos.mjs

O caminho do PDF de origem está em `render-pdf.mjs`. Os recortes estão descritos em `extract-photos.mjs` e exportados em `recortes-produtos.json`. O site não depende dessas ferramentas para funcionar.

Verificação em Chrome local:

    node scripts/check-browser.cjs

As logos em `imagens/marcas` são usadas pelo filtro, pelos cards e pelos detalhes. `marcas.js` relaciona os nomes do catálogo aos arquivos. Bracol usa a imagem enviada pelo cliente (`logo300px.webp`); as demais identidades foram extraídas do próprio catálogo. Para refazer esses arquivos após renderizar o PDF:

    node scripts/extract-logos.mjs
