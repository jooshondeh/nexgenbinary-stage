NexGen Binary Website Package v3 (deep-dive edition)

Included upgrades:
- Multi-page website + service area pages (Richmond, Henrico, Chesterfield)
- Confirmation page: thank-you.html
- Formspree-ready forms (consultation + contact)
- Google tag (gtag.js) tracking placeholders + custom event tracking
- Google Business Profile CTA placements
- Trust badges strip
- Form privacy warning text (no patient/sensitive data)
- Stronger form instructions and helper text
- Mobile sticky CTA with call/book/message
- Review/testimonial placeholders
- robots.txt + sitemap.xml starter files
- LocalBusiness + FAQ schema JSON-LD starters

IMPORTANT PLACEHOLDERS TO REPLACE BEFORE GO-LIVE:
1) Google tag ID in all pages: G-XXXXXXXXXX
2) Formspree form endpoints:
   - consultation form action: https://formspree.io/f/REPLACE_CONSULT_FORM_ID
   - contact form action: https://formspree.io/f/REPLACE_CONTACT_FORM_ID
3) _next hidden field URLs (set to your real domain thank-you URL)
4) Phone number and tel link: (804) 000-0000 / +18040000000
5) Google Business Profile URL: https://www.google.com/maps?cid=REPLACE_WITH_YOUR_GBP_ID
6) example.com URLs in JSON-LD, sitemap.xml, robots.txt

Tracking events wired in script.js:
- cta_click
- call_click
- gbp_click
- generate_lead (form submit)
- form_validation_error
- plan_toggle
- thank_you_view

Performance notes:
- Logo dimensions are fixed to reduce layout shift.
- Scripts are deferred.
- Logo is preloaded and lazy-loaded where appropriate.
- Keep uploaded images optimized/compressed before adding more assets.
