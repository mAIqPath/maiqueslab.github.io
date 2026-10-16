(() => {
  const form=document.getElementById('update-form'); if(!form)return;
  const key='maiques-update-draft-v1';
  const notes=document.getElementById('update-notes'),link=document.getElementById('update-link'),section=document.getElementById('update-section'),preference=document.getElementById('update-preference'),photos=document.getElementById('update-photos'),draftStatus=document.getElementById('draft-status'),sendStatus=document.getElementById('send-status');
  const t=s=>window.siteI18n?window.siteI18n.t(s):s;
  let requestId='',draftMessage='',sendMessage='',previewUrls=[];
  const id=()=>window.crypto?.randomUUID?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
  const status=(target,message)=>{if(target===draftStatus)draftMessage=message;else sendMessage=message;target.textContent=t(message);};
  const save=()=>{if(!requestId)requestId=id();try{localStorage.setItem(key,JSON.stringify({version:1,id:requestId,notes:notes.value,link:link.value,section:section.value,preference:preference.value}));status(draftStatus,'Draft saved on this device. Nothing has been sent.');}catch{status(draftStatus,'Your draft could not be saved. Copy or share it before closing this page.');}};
  try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved?.version===1){notes.value=String(saved.notes||'').slice(0,12000);link.value=String(saved.link||'').slice(0,2000);if([...section.options].some(o=>o.value===saved.section))section.value=saved.section;if([...preference.options].some(o=>o.value===saved.preference))preference.value=saved.preference;requestId=typeof saved.id==='string'?saved.id:id();status(draftStatus,'Draft restored. Nothing has been sent.');}}catch{}
  [notes,link,section,preference].forEach(field=>field.addEventListener('input',save));
  const compose=()=>{if(!requestId)requestId=id();return 'mAIques website update\nRequest: '+requestId+'\nWebsite: https://maiqueslab.org/\nSection: '+section.value+'\nPreference: '+preference.value+'\n\n'+notes.value.trim()+(link.value.trim()?'\n\nLink: '+link.value.trim():'')+(photos.files.length?'\n\nPhotos: '+[...photos.files].map(f=>f.name).join(', '):'');};
  const valid=()=>{if(!notes.value.trim()){notes.setCustomValidity(t('Please add a short note.'));notes.reportValidity();return false;}notes.setCustomValidity('');return form.reportValidity();};
  notes.addEventListener('input',()=>notes.setCustomValidity(''));
  photos.addEventListener('change',()=>{previewUrls.forEach(URL.revokeObjectURL);previewUrls=[];const previews=document.getElementById('photo-previews');previews.replaceChildren();[...photos.files].forEach(file=>{if(!file.type.startsWith('image/'))return;const figure=document.createElement('figure'),image=document.createElement('img'),caption=document.createElement('figcaption');const url=URL.createObjectURL(file);previewUrls.push(url);image.src=url;image.alt=file.name;caption.textContent=file.name;figure.append(image,caption);previews.append(figure);});});

  document.getElementById('send-inbox').addEventListener('click',event=>{
    if(!valid()){event.preventDefault();return;}
    save();
    if(navigator.onLine===false){event.preventDefault();status(sendStatus,'You are offline. Your draft is saved; send it when you reconnect.');return;}
    const title='[Website update] '+section.value+': '+notes.value.trim().replace(/\s+/g,' ').slice(0,65);
    const body=compose()+'\n\n## Photos\nAttach any photos here before submitting, or name files uploaded to assets/ in this private repository.';
    const url='https://github.com/mAIqPath/maiqueslab-updates/issues/new?template=website-update.md&title='+encodeURIComponent(title)+'&body='+encodeURIComponent(body);
    if(url.length>7000){event.preventDefault();document.getElementById('manual-copy').hidden=false;const box=document.getElementById('copy-text');box.value=body;box.focus();box.select();status(sendStatus,'This note is long. Copy the text below, then paste it into the inbox form.');return;}
    event.currentTarget.href=url;
    status(sendStatus,'GitHub opened. Attach photos there and submit the update. Nothing is sent until you submit.');
  });

  document.getElementById('copy-update').addEventListener('click',async()=>{if(!valid())return;save();const text=compose();try{await navigator.clipboard.writeText(text);status(sendStatus,'Copied. Paste this into ChatGPT and attach your photos there.');}catch{document.getElementById('manual-copy').hidden=false;const box=document.getElementById('copy-text');box.value=text;box.focus();box.select();status(sendStatus,'Select and copy the text below, then paste it into ChatGPT.');}});
  document.getElementById('download-update').addEventListener('click',()=>{if(!valid())return;save();const blob=new Blob([compose()],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='maiques-update-'+requestId+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status(sendStatus,'Text copy saved. Photos are not included in this file.');});
  document.getElementById('share-update').hidden=typeof navigator.share!=='function';
  form.addEventListener('submit',async event=>{event.preventDefault();if(!valid())return;save();const payload={title:'mAIques website update',text:compose()},files=[...photos.files];if(files.length){if(!navigator.canShare?.({files})){status(sendStatus,'This browser cannot share these photos. Copy the update and attach them in ChatGPT.');return;}payload.files=files;}
    try{await navigator.share(payload);status(sendStatus,'Share menu completed. Check the receiving app to confirm you sent the update.');}catch(error){if(error.name!=='AbortError')status(sendStatus,'Sharing did not finish. Copy the update and send it in ChatGPT.');}
  });
  document.getElementById('clear-update').addEventListener('click',()=>{form.reset();requestId='';previewUrls.forEach(URL.revokeObjectURL);previewUrls=[];document.getElementById('photo-previews').replaceChildren();document.getElementById('manual-copy').hidden=true;try{localStorage.removeItem(key);}catch{}status(draftStatus,'Draft cleared.');status(sendStatus,'');});
  document.addEventListener('languagechanged',()=>{draftStatus.textContent=t(draftMessage);sendStatus.textContent=t(sendMessage);});
})();