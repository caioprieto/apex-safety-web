/* Visualizador criado sob demanda; rolagem e snap nativos para as fotos. */
window.initProductViewer = (trigger, product) => {
  const photos = (Array.isArray(product.fotos) && product.fotos.length ? product.fotos : [product.foto])
    .map(photo => typeof photo === 'string' ? {src: photo, alt: product.nome} : {src: photo.src || photo.foto, alt: photo.alt || product.nome})
    .filter(photo => photo.src);
  if (!trigger || !photos.length) return;
  let dialog, track, counter, previous, next, active = 0, closing = false;
  let frame = 0, drag = null, dragged = false, oldOverflow;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hydrate = index => {
    for (let i = Math.max(0, index - 1); i <= Math.min(photos.length - 1, index + 1); i++) {
      const img = track.children[i].firstElementChild;
      if (!img.getAttribute('src')) img.src = photos[i].src;
    }
  };
  const sync = () => {
    active = Math.max(0, Math.min(photos.length - 1, Math.round(track.scrollLeft / Math.max(1, track.clientWidth))));
    counter.textContent = `${active + 1} / ${photos.length}`;
    previous.disabled = active === 0;
    next.disabled = active === photos.length - 1;
    hydrate(active);
  };
  const go = index => track.scrollTo({left: Math.max(0, Math.min(photos.length - 1, index)) * track.clientWidth, behavior: reduced() ? 'instant' : 'smooth'});
  const close = async () => {
    if (closing || !dialog.open) return;
    closing = true;
    if (!reduced()) {
      await Promise.allSettled([
        dialog.animate([{opacity: 1}, {opacity: 0}], {duration: 150, easing: 'ease-out', fill: 'forwards'}).finished,
        track.animate([{transform: 'scale(1)'}, {transform: 'scale(.97)'}], {duration: 150, fill: 'forwards'}).finished
      ]);
    }
    dialog.close();
    dialog.getAnimations().forEach(animation => animation.cancel());
    track.getAnimations().forEach(animation => animation.cancel());
    document.documentElement.style.overflow = oldOverflow;
    closing = false;
    trigger.focus({preventScroll: true});
  };
  const build = () => {
    dialog = document.createElement('dialog');
    dialog.className = 'product-viewer';
    dialog.setAttribute('aria-label', 'Imagens de ' + product.nome);
    dialog.innerHTML = '<header class="viewer-toolbar"><div class="viewer-heading"><p></p></div><button type="button" class="viewer-close" aria-label="Fechar visualizador">×</button></header><div class="viewer-track"></div><button type="button" class="viewer-arrow viewer-previous" aria-label="Imagem anterior">‹</button><button type="button" class="viewer-arrow viewer-next" aria-label="Próxima imagem">›</button><footer class="viewer-footer"><span class="viewer-hint"></span><span class="viewer-counter" role="status" aria-live="polite"></span></footer>';
    dialog.querySelector('.viewer-heading p').textContent = product.nome;
    track = dialog.querySelector('.viewer-track');
    counter = dialog.querySelector('.viewer-counter');
    previous = dialog.querySelector('.viewer-previous');
    next = dialog.querySelector('.viewer-next');
    previous.hidden = next.hidden = photos.length < 2;
    dialog.querySelector('.viewer-hint').textContent = photos.length > 1 ? 'Deslize para ver mais imagens' : '';
    photos.forEach((photo, index) => {
      const slide = document.createElement('div');
      slide.className = 'viewer-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `Imagem ${index + 1} de ${photos.length}`);
      const img = document.createElement('img');
      img.alt = photo.alt;
      img.decoding = 'async';
      img.draggable = false;
      slide.appendChild(img);
      track.appendChild(slide);
    });
    document.body.appendChild(dialog);
    dialog.querySelector('.viewer-close').addEventListener('click', close);
    dialog.addEventListener('cancel', event => {event.preventDefault(); close();});
    previous.addEventListener('click', () => go(active - 1));
    next.addEventListener('click', () => go(active + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        go(active + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    track.addEventListener('scroll', () => {
      if (!frame) frame = requestAnimationFrame(() => {frame = 0; sync();});
    }, {passive: true});
    // Touch uses native scrolling; mouse dragging uses the same scroll container.
    track.addEventListener('pointerdown', event => {
      dragged = false;
      if (event.pointerType !== 'mouse' || event.button !== 0 || photos.length < 2) return;
      drag = {x: event.clientX, left: track.scrollLeft};
      track.setPointerCapture(event.pointerId);
      track.classList.add('is-dragging');
    });
    track.addEventListener('pointermove', event => {
      if (!drag) return;
      const delta = event.clientX - drag.x;
      if (Math.abs(delta) > 5) dragged = true;
      track.scrollLeft = drag.left - delta;
    });
    const release = event => {
      if (!drag) return;
      const delta = event.clientX - drag.x;
      const origin = Math.round(drag.left / Math.max(1, track.clientWidth));
      drag = null;
      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
      go(Math.abs(delta) > Math.min(70, track.clientWidth * .15) ? origin + (delta < 0 ? 1 : -1) : origin);
    };
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', () => {drag = null; track.classList.remove('is-dragging'); go(active);});
    track.addEventListener('click', event => {
      if (dragged) {dragged = false; return;}
      if (event.target === track || event.target.classList.contains('viewer-slide')) close();
    });
    new ResizeObserver(() => {
      if (dialog.open && track.clientWidth) track.scrollTo({left: active * track.clientWidth, behavior: 'instant'});
    }).observe(track);
  };
  trigger.addEventListener('click', () => {
    if (!dialog) build();
    if (dialog.open || closing) return;
    oldOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    hydrate(active);
    dialog.showModal();
    track.scrollTo({left: active * track.clientWidth, behavior: 'instant'});
    sync();
    if (!reduced()) {
      dialog.animate([{opacity: 0}, {opacity: 1}], {duration: 200, easing: 'ease-out'});
      track.animate([{transform: 'translateY(10px) scale(.96)'}, {transform: 'translateY(0) scale(1)'}], {duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)'});
    }
  });
};
