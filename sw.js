const CACHE='maiques-mobile-v2';
const SHELL=['app.html','app.css?v=20261016-inbox-v1','app.js?v=20261016-inbox-v1','pwa.js?v=20261016-inbox-v1','styles.css?v=20261015-network-v1','site.js?v=20261015-network-v1','i18n.js?v=20261016-inbox-v1','logo.png','images/app-192.png','images/app-512.png','offline.html','i18n/es.json?v=20261016-inbox-v1','i18n/ca.json?v=20261016-inbox-v1','i18n/fr.json?v=20261016-inbox-v1','i18n/de.json?v=20261016-inbox-v1'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('maiques-mobile-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 // Network first: a website visit must always try to retrieve the latest publication.
 if(request.mode==='navigate'){
   event.respondWith(fetch(request).then(response=>{if(response.ok&&url.pathname==='/app.html'){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put('app.html',copy)));}return response;}).catch(async()=>url.pathname==='/app.html'?(await caches.match('app.html')):(await caches.match('offline.html'))));return;
 }
 if(SHELL.some(path=>new URL(path,self.location.href).href===url.href)){
   event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}return response;}).catch(()=>caches.match(request)));
 }
});