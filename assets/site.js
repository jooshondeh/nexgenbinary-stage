(() => {
  'use strict';

  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-primary-nav]');
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const mobileBreakpoint = window.matchMedia('(max-width: 1180px)');

  const closeNav = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (event) => {
      if (!mobileBreakpoint.matches || !nav.classList.contains('is-open')) return;
      if (header && header.contains(event.target)) return;
      closeNav();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });

    mobileBreakpoint.addEventListener?.('change', () => closeNav());
    navLinks.forEach((link) => link.addEventListener('click', closeNav));
  }

  const sectionLinks = navLinks.filter((link) => {
    const href = link.getAttribute('href') || '';
    return href.startsWith('#') && href.length > 1;
  });

  const setActiveLink = () => {
    if (!sectionLinks.length) return;
    const offset = (header?.offsetHeight || 80) + 24;
    let current = sectionLinks[0].getAttribute('href').slice(1);

    for (const link of sectionLinks) {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section && window.scrollY + offset >= section.offsetTop) current = id;
    }

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sectionLinks[sectionLinks.length - 1].getAttribute('href').slice(1);
    }

    sectionLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
  };

  if (sectionLinks.length) {
    setActiveLink();
    window.addEventListener('scroll', () => {
      if (mobileBreakpoint.matches && nav?.classList.contains('is-open')) closeNav();
      setActiveLink();
    }, { passive: true });
    window.addEventListener('resize', setActiveLink);
    window.addEventListener('pageshow', setActiveLink);
  }

  const consultationLinks = document.querySelectorAll('[data-focus-contact]');
  const nameField = document.getElementById('contact-name');
  consultationLinks.forEach((link) => {
    link.addEventListener('click', () => {
      window.setTimeout(() => nameField?.focus({ preventScroll: true }), 450);
    });
  });

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = document.getElementById('contact-status');
  const recipient = form.getAttribute('data-recipient') || 'info@nexgenbinary.com';
  const requiredFields = Array.from(form.querySelectorAll('[required]'));

  const setStatus = (message, type = 'neutral') => {
    if (!status) return;
    status.textContent = message;
    status.classList.remove('is-error', 'is-success');
    if (type === 'error') status.classList.add('is-error');
    if (type === 'success') status.classList.add('is-success');
  };

  const errorElement = (field) => document.getElementById(`${field.id}-error`);

  const validateField = (field) => {
    const value = field.value.trim();
    let message = '';

    if (field.required && !value) {
      message = `${field.dataset.label || 'This field'} is required.`;
    } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Enter a valid email address.';
    }

    const error = errorElement(field);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
    return !message;
  };

  requiredFields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let firstInvalid = null;
    for (const field of requiredFields) {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    }

    if (firstInvalid) {
      setStatus('Please correct the highlighted fields before continuing.', 'error');
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim() || 'Not provided';
    const organization = String(data.get('organization') || '').trim() || 'Not provided';
    const message = String(data.get('message') || '').trim();

    const subject = `Website consultation request — ${name || 'Prospective client'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Practice / Organization: ${organization}`,
      '',
      'Message:',
      message,
      '',
      'Submitted from the NexGen Binary staging website.'
    ].join('\n');

    const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Opening your default email app with the message prepared. Review it there and press Send.', 'success');
    window.location.href = mailto;
  });
})();
