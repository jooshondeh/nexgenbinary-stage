
(function(){
  const nav = document.querySelector('.site-nav');
  const menu = document.querySelector('.menu-btn');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (menu && nav){
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.plan-card');
      const panel = card ? card.querySelector('.toggle-content') : null;
      if (!panel) return;
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      if (typeof gtag === 'function') gtag('event','plan_toggle',{open});
    });
  });

  document.querySelectorAll('.track').forEach(el => {
    el.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', el.dataset.event || 'cta_click', {
          event_label: el.dataset.label || (el.textContent || '').trim(),
          page_path: location.pathname
        });
      }
    });
  });

  function bindForm(sel){
    const form = document.querySelector(sel);
    if (!form) return;
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', (e) => {
      const reqs = Array.from(form.querySelectorAll('[required]'));
      const bad = reqs.find(x => !String(x.value || '').trim());
      if (bad){
        e.preventDefault();
        if (status){ status.textContent = 'Please complete required fields.'; status.className='form-status error'; }
        bad.focus();
        if (typeof gtag === 'function') gtag('event','form_validation_error',{field: bad.name || bad.id});
        return;
      }
      const email = form.querySelector('input[type="email"]');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email.value||'').trim())){
        e.preventDefault();
        if (status){ status.textContent = 'Please enter a valid email address.'; status.className='form-status error'; }
        email.focus();
        return;
      }
      if (status){ status.textContent = 'Submitting…'; status.className='form-status'; }
      if (typeof gtag === 'function') gtag('event','generate_lead',{form_name: form.dataset.formName || 'form'});
      // demo fallback when Formspree endpoint placeholder hasn't been replaced yet
      if ((form.action || '').includes('REPLACE_')){
        e.preventDefault();
        location.href = 'thank-you.html';
      }
    });
  }

  bindForm('.consult-form');
  bindForm('.message-form');

  if (location.pathname.endsWith('thank-you.html') && typeof gtag === 'function'){
    gtag('event','thank_you_view',{page_path: location.pathname});
  }
})();
