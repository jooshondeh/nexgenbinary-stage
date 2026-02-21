
(function() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.site-nav');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  // Plan "More Info" toggles
  document.querySelectorAll('.plan-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.plan-card');
      const details = card && card.querySelector('.plan-details');
      if (!details) return;
      const open = details.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      if (typeof window.gtag === 'function') {
        gtag('event', 'plan_toggle', { plan_open: open, plan_name: card.querySelector('h3')?.textContent || 'unknown' });
      }
    });
  });

  // Generic click tracking
  document.querySelectorAll('.js-track').forEach(el => {
    el.addEventListener('click', () => {
      const eventName = el.dataset.event || 'cta_click';
      const label = el.dataset.label || (el.textContent || '').trim();
      if (typeof window.gtag === 'function') {
        gtag('event', eventName, {
          event_category: 'engagement',
          event_label: label,
          page_path: location.pathname
        });
      }
    });
  });

  // Front-end validation + form submission tracking
  function bindForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    const status = form.querySelector('.form-status');

    form.addEventListener('submit', function(e) {
      const required = Array.from(form.querySelectorAll('[required]'));
      const firstInvalid = required.find(el => !String(el.value || '').trim());
      if (firstInvalid) {
        e.preventDefault();
        status.textContent = 'Please complete the required fields before submitting.';
        status.className = 'form-status error';
        firstInvalid.focus();
        if (typeof window.gtag === 'function') {
          gtag('event', 'form_validation_error', { form_name: form.dataset.formName || form.className, field: firstInvalid.name || firstInvalid.id });
        }
        return;
      }

      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        e.preventDefault();
        status.textContent = 'Please enter a valid email address.';
        status.className = 'form-status error';
        emailField.focus();
        if (typeof window.gtag === 'function') {
          gtag('event', 'form_validation_error', { form_name: form.dataset.formName || form.className, field: emailField.name || emailField.id });
        }
        return;
      }

      // Track submit attempt; let Formspree handle submission
      status.textContent = 'Submitting…';
      status.className = 'form-status';
      if (typeof window.gtag === 'function') {
        gtag('event', 'generate_lead', {
          form_name: form.dataset.formName || form.className,
          page_path: location.pathname
        });
      }
    });
  }

  bindForm('.consult-form');
  bindForm('.message-form');

  // Track page load for thank-you page
  if (location.pathname.endsWith('thank-you.html') && typeof window.gtag === 'function') {
    const params = new URLSearchParams(location.search);
    gtag('event', 'thank_you_view', {
      form_type: params.get('form') || 'unknown',
      page_path: location.pathname
    });
  }
})();
