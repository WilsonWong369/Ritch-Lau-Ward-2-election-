// Language toggle (English / Traditional Chinese)
const langToggle = document.getElementById('langToggle');
const htmlRoot = document.getElementById('htmlRoot');

function setLang(lang) {
  document.body.setAttribute('data-lang', lang);
  htmlRoot.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : 'en');
  langToggle.querySelectorAll('.lang-toggle__opt').forEach(opt => {
    opt.classList.toggle('lang-toggle__opt--active', opt.dataset.val === lang);
  });
  localStorage.setItem('ritchlau-lang', lang);
}

langToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-lang');
  setLang(current === 'en' ? 'zh' : 'en');
});

// Restore saved preference
const savedLang = localStorage.getItem('ritchlau-lang');
if (savedLang) setLang(savedLang);

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form (front-end only demo — wire up to a real backend/Formspree/mailto as needed)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  if (!name) return;
  const lang = document.body.getAttribute('data-lang');
  status.textContent = lang === 'zh'
    ? `多謝 ${name} — 我們已收到您的留言，將盡快與您聯絡。`
    : `Thanks, ${name.split(' ')[0]} — your message has been noted. We'll be in touch soon.`;
  status.style.color = '#0B2545';
  form.reset();
});