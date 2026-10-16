(() => {
 let prompt;
 const button=document.getElementById('install-app'),help=document.getElementById('install-help');
 const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
 if(standalone&&help)help.hidden=true;
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;if(button&&!standalone)button.hidden=false;});
 button?.addEventListener('click',async()=>{if(!prompt)return;await prompt.prompt();await prompt.userChoice;prompt=null;button.hidden=true;});
 window.addEventListener('appinstalled',()=>{if(button)button.hidden=true;if(help)help.hidden=true;});
 if('serviceWorker' in navigator)window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(reg=>reg.update()).catch(()=>{});});
 const connect=document.querySelector('.site-footer .footer-label')?.parentElement?.parentElement?.lastElementChild;
 if(connect&&!connect.querySelector('a[href="app.html"]')){const a=document.createElement('a');a.href='app.html';a.textContent='Mobile app';connect.appendChild(a);}
})();