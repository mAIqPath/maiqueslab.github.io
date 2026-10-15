(() => {
  const supported = ['en', 'es', 'ca', 'fr', 'de'];
  const nativeNames = {en:'English',es:'Español',ca:'Català',fr:'Français',de:'Deutsch'};
  const select = document.getElementById('site-language');
  const originals = new WeakMap(), attributes = new WeakMap(), dictionaries = {en:{}};
  let language = 'en', generation = 0;
  const skip = el => !el || Boolean(el.closest('script,style,[data-no-translate],code,pre'));
  const translate = value => dictionaries[language]?.[value] || value;
  const storage = {get() {try{return localStorage.getItem('maiques-language');}catch{return null;}}, set(value) {try{localStorage.setItem('maiques-language',value);}catch{}}};
  const apply = () => {
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (skip(node.parentElement) || !node.nodeValue.trim()) continue;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const original = originals.get(node), source = original.trim();
      node.nodeValue = original.replace(source, translate(source));
    }
    document.querySelectorAll('[alt],[aria-label],[placeholder],[title],meta[name="description"]').forEach(el => {
      if (skip(el)) return;
      if (!attributes.has(el)) {
        const entries = {};
        ['alt','aria-label','placeholder','title'].forEach(name => {if(el.hasAttribute(name)) entries[name]=el.getAttribute(name);});
        if(el.matches('meta[name="description"]')) entries.content=el.content;
        attributes.set(el,entries);
      }
      Object.entries(attributes.get(el)).forEach(([name,value]) => el.setAttribute(name,translate(value)));
    });
    document.documentElement.lang = language;
    if (select) select.value = language;
    document.dispatchEvent(new CustomEvent('languagechanged',{detail:{language}}));
  };
  const setLanguage = async (requested, persist = true) => {
    if (!supported.includes(requested)) return;
    const token = ++generation;
    if (select) select.disabled = true;
    try {
      if (!dictionaries[requested]) {
        const response = await fetch('i18n/' + requested + '.json?v=20261015-network-v1');
        if (!response.ok) throw new Error('Language unavailable');
        dictionaries[requested] = await response.json();
      }
      if (token !== generation) return;
      language = requested; apply();
      if (persist) {
        storage.set(language);
        const url = new URL(location.href);
        if(language==='en') url.searchParams.delete('lang'); else url.searchParams.set('lang',language);
        history.replaceState(null,'',url);
      }
      document.querySelector('.language-hint')?.remove();
    } catch {
      const note = document.getElementById('language-message') || document.createElement('p');
      note.id = 'language-message'; note.className = 'language-message'; note.setAttribute('role','status');
      note.textContent = translate('Language could not be loaded. Please try again.');
      document.querySelector('.header-inner').appendChild(note);
      if(select)select.value=language;
    } finally {if(select && token===generation)select.disabled=false;}
  };
  window.siteI18n={t:translate,apply,setLanguage,get language(){return language;}};
  if(select)select.addEventListener('change',()=>setLanguage(select.value));
  const query = new URLSearchParams(location.search).get('lang');
  const saved = storage.get();
  const initial = supported.includes(query) ? query : supported.includes(saved) ? saved : 'en';
  setLanguage(initial, supported.includes(query));
  if (!query && !saved) {
    const browserLanguage = (navigator.languages || [navigator.language]).map(value=>value.split('-')[0]).find(value=>supported.includes(value) && value!=='en');
    if (browserLanguage) {
      const hint = document.createElement('aside'); hint.className='language-hint'; hint.setAttribute('aria-label','Choose your language');
      const text = document.createElement('span'); text.textContent='You can read this page in';
      const change = document.createElement('button'); change.type='button'; change.textContent=nativeNames[browserLanguage]; change.dataset.noTranslate=''; change.addEventListener('click',()=>setLanguage(browserLanguage));
      const dismiss = document.createElement('button'); dismiss.type='button'; dismiss.className='hint-dismiss'; dismiss.textContent='×'; dismiss.setAttribute('aria-label','Dismiss'); dismiss.addEventListener('click',()=>hint.remove());
      hint.append(text,change,dismiss); document.body.appendChild(hint);
    }
  }
})();