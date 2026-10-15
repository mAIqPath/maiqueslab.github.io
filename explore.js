(() => {
  const t = value => window.siteI18n ? window.siteI18n.t(value) : value;
  const map = document.getElementById('network-svg');
  if (map) {
    let category = 'all', city = '';
    const cards = Array.from(document.querySelectorAll('.network-card'));
    const buttons = Array.from(document.querySelectorAll('[data-network-filter]'));
    const update = () => {
      let count = 0;
      cards.forEach(card => {
        const visible = (category === 'all' || card.dataset.category === category) && (!city || card.dataset.city === city);
        card.hidden = !visible; if (visible) count++;
      });
      document.getElementById('network-results-count').textContent = count + ' ' + t('connections');
      document.getElementById('network-empty').hidden = count !== 0;
      document.querySelector('.map-status').textContent = city || t('All locations');
      document.querySelectorAll('.map-city, .map-city-choice').forEach(pin => {
        const matches = cards.some(card => card.dataset.city === pin.dataset.city && (category === 'all' || card.dataset.category === category));
        pin.classList.toggle('is-muted', !matches);
        pin.classList.toggle('is-selected', pin.dataset.city === city);
        pin.setAttribute('aria-pressed', String(pin.dataset.city === city));
      });
      buttons.forEach(button => { const active = button.dataset.networkFilter === category; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    };
    buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.networkFilter; update(); }));
    document.querySelectorAll('.map-city, .map-city-choice').forEach(pin => {
      const select = () => { city = city === pin.dataset.city ? '' : pin.dataset.city; update(); };
      pin.addEventListener('click', select);
      pin.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } });
    });
    document.querySelector('.map-reset').addEventListener('click', () => { city = ''; update(); });
    document.querySelector('.network-clear').addEventListener('click', () => { city = ''; category = 'all'; update(); });
    document.querySelectorAll('[data-map-view]').forEach(button => button.addEventListener('click', () => {
      map.setAttribute('viewBox', button.dataset.mapView === 'world' ? '0 0 1080 540' : '480 75 180 135');
      map.classList.toggle('world-view', button.dataset.mapView === 'world');
      document.querySelectorAll('[data-map-view]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    }));
    document.addEventListener('languagechanged', update); update();
  }
  const search = document.getElementById('paper-search');
  if (search) {
    let domain = 'all';
    const papers = Array.from(document.querySelectorAll('.reading-paper'));
    const buttons = Array.from(document.querySelectorAll('[data-paper-filter]'));
    const update = () => {
      const query = search.value.toLocaleLowerCase().trim();
      let count = 0;
      papers.forEach(paper => {
        const haystack = paper.dataset.search + ' ' + paper.textContent.toLocaleLowerCase();
        const visible = (domain === 'all' || paper.dataset.domain === domain) && (!query || haystack.includes(query));
        paper.hidden = !visible; if (visible) count++;
      });
      document.getElementById('reading-count').textContent = count + ' ' + t('papers');
      document.getElementById('reading-empty').hidden = count !== 0;
      buttons.forEach(button => { const active = button.dataset.paperFilter === domain; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    };
    buttons.forEach(button => button.addEventListener('click', () => { domain = button.dataset.paperFilter; update(); }));
    search.addEventListener('input', update); document.addEventListener('languagechanged', update); update();
  }
})();