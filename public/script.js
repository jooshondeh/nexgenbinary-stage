(function(){
  const nav=document.querySelector('.site-nav'),menu=document.querySelector('.menu-btn'),year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
  if(menu&&nav){menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(o));});}
  document.querySelectorAll('.toggle-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const panel=btn.closest('.plan-card')?.querySelector('.toggle-content'); if(!panel) return;
    const open=panel.classList.toggle('open'); btn.setAttribute('aria-expanded',String(open));
  }));
  document.querySelectorAll('.track').forEach(el=>el.addEventListener('click',()=>{
    if(typeof window.gtag==='function'){ window.gtag('event', el.dataset.event||'cta_click', { event_label: el.dataset.label||'', page_path: location.pathname }); }
  }));
  function bindForm(sel){
    const form=document.querySelector(sel); if(!form) return; const status=form.querySelector('.form-status');
    form.addEventListener('submit', (e)=>{
      const bad=[...form.querySelectorAll('[required]')].find(x=>!String(x.value||'').trim());
      if(bad){ e.preventDefault(); if(status){status.textContent='Please complete required fields.'; status.className='form-status error';} bad.focus(); return; }
      const email=form.querySelector('input[type="email"]');
      if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email.value||'').trim())){
        e.preventDefault(); if(status){status.textContent='Please enter a valid email address.'; status.className='form-status error';} email.focus(); return;
      }
      if(status){status.textContent='Submitting…'; status.className='form-status';}
      if((form.action||'').includes('REPLACE_')){ e.preventDefault(); location.href='/thank-you'; }
    });
  }
  bindForm('.consult-form'); bindForm('.message-form');
})();
