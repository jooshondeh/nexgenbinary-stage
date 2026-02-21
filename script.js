
(function(){
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.menu-btn');
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  if (btn && nav){
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.toggle-btn').forEach(t => {
    t.addEventListener('click', () => {
      const panel = t.closest('.panel');
      const c = panel ? panel.querySelector('.toggle-content') : null;
      if (!c) return;
      const open = c.classList.toggle('open');
      t.setAttribute('aria-expanded', String(open));
      if (typeof gtag === 'function') gtag('event','plan_toggle',{open: open});
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
    const f = document.querySelector(sel);
    if (!f) return;
    const status = f.querySelector('.form-status');
    f.addEventListener('submit', (e) => {
      const req = Array.from(f.querySelectorAll('[required]'));
      const bad = req.find(x => !String(x.value || '').trim());
      if (bad){
        e.preventDefault();
        if (status){ status.textContent = 'Please complete required fields.'; status.className = 'form-status error';}
        bad.focus();
        if (typeof gtag === 'function') gtag('event','form_validation_error',{field: bad.name || bad.id});
        return;
      }
      const email = f.querySelector('input[type="email"]');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
        e.preventDefault();
        if (status){ status.textContent = 'Please enter a valid email.'; status.className = 'form-status error';}
        email.focus();
        return;
      }
      if (status){ status.textContent = 'Submitting…'; status.className = 'form-status';}
      if (typeof gtag === 'function') gtag('event','generate_lead',{form_name: f.dataset.formName || 'form'});
      // Optional local redirect if no form backend is connected:
      if ((f.action || '').includes('REPLACE_')){
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
