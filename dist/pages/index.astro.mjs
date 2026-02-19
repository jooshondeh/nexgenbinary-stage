import { c as createAstro, a as createComponent, r as renderTemplate, b as renderSlot, d as renderHead, e as addAttribute, m as maybeRenderHead, f as renderScript, g as renderComponent } from '../chunks/astro/server_BwOPqLpN.mjs';
import 'piccolore';
import 'html-escaper';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$8 = createAstro("https://jooshondeh.github.io");
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Base;
  const { title = "NexGen Binary", description = "Reliable IT for dental practices across Virginia." } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>', '</title><meta name="description"', '><meta name="theme-color" content="#0b1220"><link rel="icon" href="/favicon.svg" type="image/svg+xml">', "</head> <body> ", ` <script type="module">
      import 'bootstrap/dist/js/bootstrap.bundle.min.js';
    <\/script> </body> </html>`])), title, addAttribute(description, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/workspaces/nexgenbinary-stage/src/layouts/Base.astro", void 0);

const $$Astro$7 = createAstro("https://jooshondeh.github.io");
const $$NavBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$NavBar;
  const { site } = Astro2.props;
  const nav = site.nav ?? [];
  const topbar = site.topbar ?? {};
  return renderTemplate`${maybeRenderHead()}<nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background:#0b1220; border-bottom:1px solid rgba(255,255,255,.08)"> <div class="container"> <a class="navbar-brand fw-semibold" href="#home">${site.brand?.logoText ?? site.brand?.name ?? "NexGen Binary"}</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nbNav" aria-controls="nbNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="nbNav"> <ul class="navbar-nav ms-auto mb-2 mb-lg-0"> ${nav.map((item) => renderTemplate`<li class="nav-item"> <a class="nav-link"${addAttribute(item.href, "href")}>${item.label}</a> </li>`)} </ul> <div class="d-lg-flex align-items-center gap-3 ms-lg-3 mt-3 mt-lg-0"> <a class="text-decoration-none small text-light"${addAttribute(topbar.emailHref, "href")}>${topbar.emailText}</a> <a class="btn btn-sm btn-outline-light"${addAttribute(topbar.phoneHref, "href")}>${topbar.phoneText}</a> </div> </div> </div> </nav>`;
}, "/workspaces/nexgenbinary-stage/src/components/NavBar.astro", void 0);

const $$Astro$6 = createAstro("https://jooshondeh.github.io");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Hero;
  const { site } = Astro2.props;
  const hero = site.hero ?? {};
  const bookings = site.bookings ?? {};
  return renderTemplate`${maybeRenderHead()}<header id="home" class="nb-anchor-offset nb-hero"> <div class="container py-5"> <div class="row align-items-center g-4 py-4"> <div class="col-lg-7"> <div class="nb-pill mb-3">${hero.eyebrow}</div> <h1 class="display-5 fw-bold mb-3">${hero.headline}</h1> <p class="lead nb-muted mb-4">${hero.subheadline}</p> <div class="d-flex flex-wrap gap-2"> <a class="btn btn-primary btn-lg"${addAttribute(bookings.url, "href")} target="_blank" rel="noopener">${hero.primaryCta}</a> <a class="btn btn-outline-light btn-lg"${addAttribute(site.topbar?.phoneHref, "href")}>${hero.secondaryCta}</a> </div> <p class="small nb-muted mt-3 mb-0">
Serving Richmond, NOVA, and statewide Virginia • HIPAA-aware • Dental workflow support
</p> </div> <div class="col-lg-5"> <div class="p-4 bg-dark bg-opacity-25 border border-light border-opacity-10 rounded-4"> <h2 class="h5 fw-semibold">${site.whatWeDo?.title}</h2> <div class="mt-3 d-grid gap-2"> ${(site.whatWeDo?.items ?? []).slice(0, 4).map((x) => renderTemplate`<div class="p-3 rounded-4" style="background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08)"> <div class="fw-semibold">${x.title}</div> <div class="small nb-muted">${x.text}</div> </div>`)} </div> </div> </div> </div> </div> </header>`;
}, "/workspaces/nexgenbinary-stage/src/components/Hero.astro", void 0);

const $$Astro$5 = createAstro("https://jooshondeh.github.io");
const $$WhyUs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$WhyUs;
  const { site } = Astro2.props;
  const why = site.whyUs ?? {};
  return renderTemplate`${maybeRenderHead()}<section class="nb-section" style="background:#ffffff"> <div class="container"> <div class="row g-4 align-items-start"> <div class="col-lg-5"> <h2 class="section-title fw-bold">${why.title}</h2> <p class="text-secondary mt-3">
Practical, proactive IT designed to keep your front desk and operatories running smoothly—without surprises.
</p> </div> <div class="col-lg-7"> <div class="row g-3"> ${(why.bullets ?? []).map((b) => renderTemplate`<div class="col-md-6"> <div class="p-4 nb-card h-100"> <div class="fw-semibold">${b}</div> </div> </div>`)} </div> </div> </div> </div> </section>`;
}, "/workspaces/nexgenbinary-stage/src/components/WhyUs.astro", void 0);

const $$Astro$4 = createAstro("https://jooshondeh.github.io");
const $$Services = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Services;
  const { site } = Astro2.props;
  const services = site.services ?? {};
  return renderTemplate`${maybeRenderHead()}<section id="services" class="nb-anchor-offset nb-section" style="background:#f8fafc"> <div class="container"> <div class="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4"> <div> <h2 class="section-title fw-bold mb-1">${services.title}</h2> <p class="text-secondary mb-0">A complete set of IT capabilities tailored for dental practices.</p> </div> <a class="btn btn-primary"${addAttribute(site.bookings?.url, "href")} target="_blank" rel="noopener">Book a consult</a> </div> <div class="row g-3"> ${(services.groups ?? []).map((g) => renderTemplate`<div class="col-lg-6"> <div class="p-4 nb-card h-100 bg-white"> <h3 class="h5 fw-semibold mb-3">${g.title}</h3> <ul class="mb-0"> ${(g.items ?? []).map((it) => renderTemplate`<li class="mb-2">${it}</li>`)} </ul> </div> </div>`)} </div> </div> </section>`;
}, "/workspaces/nexgenbinary-stage/src/components/Services.astro", void 0);

const $$Astro$3 = createAstro("https://jooshondeh.github.io");
const $$WhoWeServe = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$WhoWeServe;
  const { site } = Astro2.props;
  const wv = site.whoWeServe ?? {};
  return renderTemplate`${maybeRenderHead()}<section id="who-we-serve" class="nb-anchor-offset nb-section" style="background:#ffffff"> <div class="container"> <div class="row g-4"> <div class="col-lg-6"> <h2 class="section-title fw-bold">${wv.title}</h2> <p class="text-secondary mt-3">${wv.lead}</p> <div class="p-4 nb-card mt-4"> <div class="fw-semibold mb-2">${wv.serviceArea}</div> <div class="text-secondary small">Remote-friendly support with on-site capability when needed.</div> </div> </div> <div class="col-lg-6"> <div class="row g-3"> <div class="col-12"> <div class="p-4 nb-card h-100"> <div class="fw-semibold mb-2">${wv.challengesTitle}</div> <ul class="mb-0"> ${(wv.challenges ?? []).map((x) => renderTemplate`<li class="mb-2">${x}</li>`)} </ul> </div> </div> <div class="col-12"> <div class="p-4 nb-card h-100"> <div class="fw-semibold mb-2">${wv.approachTitle}</div> <ul class="mb-0"> ${(wv.approach ?? []).map((x) => renderTemplate`<li class="mb-2">${x}</li>`)} </ul> </div> </div> </div> </div> </div> </div> </section>`;
}, "/workspaces/nexgenbinary-stage/src/components/WhoWeServe.astro", void 0);

const $$Astro$2 = createAstro("https://jooshondeh.github.io");
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$About;
  const { site } = Astro2.props;
  const a = site.about ?? {};
  return renderTemplate`${maybeRenderHead()}<section id="about" class="nb-anchor-offset nb-section" style="background:#f8fafc"> <div class="container"> <div class="row g-4"> <div class="col-lg-6"> <h2 class="section-title fw-bold">${a.title}</h2> <div class="mt-4 p-4 nb-card bg-white"> <div class="fw-semibold">${a.whoWeAreTitle}</div> <p class="text-secondary mb-0 mt-2">${a.whoWeAre}</p> </div> <div class="mt-3 p-4 nb-card bg-white"> <div class="fw-semibold">${a.leadershipTitle}</div> <p class="text-secondary mb-0 mt-2">${a.leadership}</p> </div> </div> <div class="col-lg-6"> <div class="p-4 nb-card bg-white h-100"> <div class="fw-semibold">${a.securityTitle}</div> <ul class="mt-3"> ${(a.securityBullets ?? []).map((x) => renderTemplate`<li class="mb-2">${x}</li>`)} </ul> <div class="alert alert-primary mt-3 mb-0"> <strong>${a.licensed}</strong> We build with documentation and accountability from day one.
</div> </div> </div> </div> </div> </section>`;
}, "/workspaces/nexgenbinary-stage/src/components/About.astro", void 0);

const $$Astro$1 = createAstro("https://jooshondeh.github.io");
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Contact;
  const { site } = Astro2.props;
  const c = site.contact ?? {};
  c.formEndpoint ?? "";
  c.successMessage ?? "Sent.";
  c.errorMessage ?? "Error.";
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="nb-anchor-offset nb-section" style="background:#ffffff"> <div class="container"> <div class="row g-4 align-items-start"> <div class="col-lg-5"> <h2 class="section-title fw-bold">${c.title}</h2> <p class="text-secondary mt-3">${c.lead}</p> <div class="mt-4"> <div class="small text-secondary">${c.phoneLabel}</div> <a class="text-decoration-none fw-semibold"${addAttribute(c.phoneHref, "href")}>${c.phoneText}</a> </div> <div class="mt-3"> <div class="small text-secondary">${c.emailLabel}</div> <a class="text-decoration-none fw-semibold"${addAttribute(c.emailHref, "href")}>${c.emailText}</a> </div> <div class="mt-4"> <a class="btn btn-primary"${addAttribute(site.bookings?.url, "href")} target="_blank" rel="noopener">Book a consult</a> <button class="btn btn-outline-primary ms-2" type="button" data-bs-toggle="modal" data-bs-target="#bookingModal">
View booking calendar
</button> </div> <div class="modal fade" id="bookingModal" tabindex="-1" aria-hidden="true"> <div class="modal-dialog modal-xl modal-dialog-centered"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Schedule a consultation</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body p-0"> <iframe title="Microsoft Bookings"${addAttribute(site.bookings?.embedUrl, "src")} style="width:100%; height:75vh; border:0;" loading="lazy"></iframe> </div> </div> </div> </div> </div> <div class="col-lg-7"> <div class="p-4 nb-card"> <h3 class="h5 fw-semibold mb-3">Send a message</h3> <form id="contactForm" class="row g-3"> <div class="col-md-6"> <label class="form-label">Name</label> <input class="form-control" name="name" required> </div> <div class="col-md-6"> <label class="form-label">Email</label> <input class="form-control" name="email" type="email" required> </div> <div class="col-12"> <label class="form-label">Practice / Organization</label> <input class="form-control" name="org"> </div> <div class="col-12"> <label class="form-label">Message</label> <textarea class="form-control" name="message" rows="6" required></textarea> </div> <div class="col-12 d-flex flex-wrap gap-2 align-items-center"> <button class="btn btn-primary" type="submit">Send message</button> <a class="btn btn-outline-secondary"${addAttribute(c.emailHref, "href")}>Email using my mail app</a> <div id="contactStatus" class="small text-secondary"></div> </div> </form> ${renderScript($$result, "/workspaces/nexgenbinary-stage/src/components/Contact.astro?astro&type=script&index=0&lang.ts")} <p class="small text-secondary mt-3 mb-0">
Tip: Connect this form to a Power Automate HTTP endpoint that emails your shared mailbox.
</p> </div> </div> </div> </div> </section>`;
}, "/workspaces/nexgenbinary-stage/src/components/Contact.astro", void 0);

const $$Astro = createAstro("https://jooshondeh.github.io");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const { site } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="nb-footer"> <div class="container d-flex flex-column flex-md-row justify-content-between gap-2"> <div>${site.footer?.copyright}</div> <div class="d-flex gap-3"> <a class="text-decoration-none" style="color:inherit" href="#home">Back to top</a> <a class="text-decoration-none" style="color:inherit"${addAttribute(site.topbar?.emailHref, "href")}>Email</a> </div> </div> </footer>`;
}, "/workspaces/nexgenbinary-stage/src/components/Footer.astro", void 0);

const brand = {"name":"NexGen Binary","tagline":"Future-ready systems. Human-ready support.","logoText":"NexGen Binary"};
const topbar = {"phoneText":"Call [Main Number]","phoneHref":"tel:+10000000000","emailText":"info@nexgenbinary.com","emailHref":"mailto:info@nexgenbinary.com"};
const nav = [{"label":"Home","href":"#home"},{"label":"Services","href":"#services"},{"label":"Who We Serve","href":"#who-we-serve"},{"label":"About","href":"#about"},{"label":"Contact","href":"#contact"}];
const hero = {"eyebrow":"Reliable IT for Dental Practices Across Virginia","headline":"Future‑ready IT that keeps your dental practice running.","subheadline":"Fully managed IT, security, cloud, and support services designed for dental offices—so your staff stays productive and patient care stays uninterrupted.","primaryCta":"Schedule a Consultation","secondaryCta":"Call Us"};
const bookings = {"url":"https://outlook.office.com/bookings/PASTE-YOUR-BOOKINGS-LINK","embedUrl":"https://outlook.office.com/bookings/PASTE-YOUR-EMBED-LINK"};
const whatWeDo = {"title":"What We Do","items":[{"title":"Fully Managed IT","text":"Proactive support for workstations, servers, and networks."},{"title":"Security & Compliance-Aware","text":"HIPAA-aware practices with modern cybersecurity."},{"title":"Dental-Focused Expertise","text":"EMR, imaging systems, front desk & operatory workflows."},{"title":"Local & Responsive","text":"Serving Richmond, NOVA, and statewide Virginia."}]};
const whyUs = {"title":"Why Dental Practices Choose Us","bullets":["Minimized downtime and faster issue resolution","Clear, predictable monthly pricing","Secure systems designed for healthcare environments","Support that understands clinical and administrative workflows"]};
const services = {"title":"Services","groups":[{"title":"Fully Managed IT Services","items":["Workstation and server management (local or cloud)","Patch management and monitoring","Backup and disaster recovery","Proactive maintenance and reporting"]},{"title":"Dental EMR & Clinical Systems Support","items":["EMR/EHR platform support and optimization","Imaging system coordination (X-ray, scanners, vendor integrations)","Secure access for providers and staff","Coordination with EMR vendors and dental software partners"]},{"title":"Microsoft 365 & Cloud Solutions","items":["Microsoft 365 setup, licensing, and management","Email security and data protection","SharePoint and Teams collaboration","Cloud migration and hybrid environments"]},{"title":"Security & Cyber Protection","items":["Endpoint protection and device encryption","Email security and phishing protection","Secure remote access","Backup integrity and ransomware preparedness"]},{"title":"Networking, Wi‑Fi, Infrastructure, VoIP & Cameras","items":["Secure wired and wireless network design","VLAN segmentation for clinical and guest networks","Firewall and network security management","Performance monitoring and optimization","Business phone systems (call routing and shared main lines)","Security cameras (on-site or compliant cloud-based systems)"]}]};
const whoWeServe = {"title":"Who We Serve — Dental Practices","lead":"We specialize in supporting dental practices of all sizes—from single-location offices to growing multi-site groups.","challengesTitle":"We Understand Dental IT Challenges","challenges":["Front desk uptime is critical","Operatories depend on reliable workstations and imaging","EMR systems must stay available and secure","Compliance and patient data protection are non-negotiable"],"approachTitle":"Our Approach","approach":["Support aligned with clinical workflows","Minimal disruption during office hours","After-hours maintenance when needed","Clear communication with staff and vendors"],"serviceArea":"Service Area: Richmond, NOVA, and statewide Virginia"};
const about = {"title":"About","whoWeAreTitle":"Who We Are","whoWeAre":"NexGen Binary is a Virginia-based IT services company focused on delivering secure, reliable, and people-first technology solutions for dental and healthcare environments.","leadershipTitle":"Leadership & Team Experience","leadership":"Our CEO Shayan Mirhashemi has over 20 years of experience in information technology across a wide range of industries, primarily within major healthcare organizations. Our team also brings experience supporting healthcare and dental offices, government agencies, and private-sector organizations—delivering enterprise-level discipline with small-business responsiveness.","securityTitle":"Security & Compliance-Aware by Design","securityBullets":["HIPAA-aware IT practices","Secure access controls and encryption","Vendor accountability and documentation","Industry-standard cybersecurity tools"],"licensed":"Licensed and insured."};
const contact = {"title":"Contact","lead":"If you’re looking for reliable IT support that understands dental practices, we’d be happy to connect.","phoneLabel":"Phone","phoneText":"[Main Number]","phoneHref":"tel:+10000000000","emailLabel":"Email","emailText":"info@nexgenbinary.com","emailHref":"mailto:info@nexgenbinary.com","formEndpoint":"https://example.com/replace-with-your-form-endpoint","successMessage":"Thanks—your message was sent. We’ll get back to you shortly.","errorMessage":"Sorry—something went wrong. Please email us instead."};
const footer = {"copyright":"© NexGen Binary LLC. All rights reserved."};
const site = {
  brand,
  topbar,
  nav,
  hero,
  bookings,
  whatWeDo,
  whyUs,
  services,
  whoWeServe,
  about,
  contact,
  footer,
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": `${site.brand?.name} | Dental Practice IT in Virginia`, "description": "Reliable IT, security, and support services for dental practices across Virginia." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "site": site })} ${renderComponent($$result2, "Hero", $$Hero, { "site": site })} ${renderComponent($$result2, "WhyUs", $$WhyUs, { "site": site })} ${renderComponent($$result2, "Services", $$Services, { "site": site })} ${renderComponent($$result2, "WhoWeServe", $$WhoWeServe, { "site": site })} ${renderComponent($$result2, "About", $$About, { "site": site })} ${renderComponent($$result2, "Contact", $$Contact, { "site": site })} ${renderComponent($$result2, "Footer", $$Footer, { "site": site })} ` })}`;
}, "/workspaces/nexgenbinary-stage/src/pages/index.astro", void 0);

const $$file = "/workspaces/nexgenbinary-stage/src/pages/index.astro";
const $$url = "/nexgenbinary-stage";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
