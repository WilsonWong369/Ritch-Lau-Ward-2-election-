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

// Timeline card's own EN/中文 toggle (mirrors the header toggle)
const ceLangToggle = document.getElementById('ceLangToggle');
if (ceLangToggle) {
  ceLangToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-lang');
    setLang(current === 'en' ? 'zh' : 'en');
  });
}

// Community Engagement timeline (era filters + scrollable track + detail panel)
const CE_ENTRIES = [
  {
    era: 'campaign',
    date: '<span class="lang-en">May 5, 2022</span><span class="lang-zh">2022年5月5日</span>',
    label: '<span class="lang-en">Announces candidacy</span><span class="lang-zh">宣布參選</span>',
    title: '<span class="lang-en">First to register as a candidate</span><span class="lang-zh">首位登記參選人</span>',
    body: '<span class="lang-en">Ritch is the first to register as a candidate for Ward 2, launching his campaign with a focus on traffic safety, budget management, and more recreational and green space for the community.</span><span class="lang-zh">劉肇麟成為第二選區首位登記參選人，競選重點包括交通安全、財政管理，以及增加社區康樂及綠化空間。</span>',
    img: 'pictuers/candidacy-may2022.jpg',
    alt: 'Ritch Lau with supporters holding Ward 2 campaign signs'
  },
  {
    era: 'campaign',
    date: '<span class="lang-en">October 2022</span><span class="lang-zh">2022年10月</span>',
    label: '<span class="lang-en">Elected Councillor</span><span class="lang-zh">當選市議員</span>',
    title: '<span class="lang-en">Elected Ward 2 Councillor</span><span class="lang-zh">當選第二選區市議員</span>',
    body: '<span class="lang-en">Wins the 2022 Municipal Election with 3,012 votes, becoming Councillor for Ward 2 and beginning direct constituent work across Civic Centre, Buttonville, Cachet, Cathedraltown, Victoria Square, and Springwater.</span><span class="lang-zh">在2022年市政選舉中以3,012票當選，成為第二選區市議員，開始為Civic Centre、Buttonville、Cachet、Cathedraltown、Victoria Square及Springwater的居民直接服務。</span>',
    img: 'https://ritchlau.ca/wp-content/uploads/2026/05/HZ8_0651_edited-768x1152.webp',
    alt: 'Ritch Lau portrait'
  },
  {
    era: 'campaign',
    date: '<span class="lang-en">2022</span><span class="lang-zh">2022年</span>',
    label: '<span class="lang-en">Platinum Jubilee Medal</span><span class="lang-zh">白金禧獎章</span>',
    title: '<span class="lang-en">Queen Elizabeth II\'s Platinum Jubilee Medal recipient</span><span class="lang-zh">獲頒女皇伊麗莎白二世白金禧獎章</span>',
    body: '<span class="lang-en">Ritch was recognized as a recipient of the Queen Elizabeth II\'s Platinum Jubilee Medal in 2022, honouring his contributions to the community.</span><span class="lang-zh">劉肇麟於2022年獲頒女皇伊麗莎白二世白金禧獎章，以表揚他對社區的貢獻。</span>',
    img: 'https://ritchlau.ca/wp-content/uploads/2022/07/CertPin1-768x1024.jpg',
    alt: "Queen Elizabeth II's Platinum Jubilee Medal certificate and pin"
  },
  {
    era: 'term',
    date: '<span class="lang-en">2022 – Ongoing</span><span class="lang-zh">2022年至今</span>',
    label: '<span class="lang-en">Taste of Asia &amp; FCCM</span><span class="lang-zh">亞洲風情節與FCCM</span>',
    title: '<span class="lang-en">Taste of Asia organizing committee &amp; FCCM volunteer</span><span class="lang-zh">「亞洲風情節」籌委會委員及FCCM義工</span>',
    body: '<span class="lang-en">Ritch serves as an Organizing Committee member for the City of Markham\'s Taste of Asia festival, and volunteers with the Federation of Chinese Canadians in Markham (FCCM), helping connect residents across the community.</span><span class="lang-zh">劉肇麟擔任萬錦市「亞洲風情節」籌委會委員，同時是加拿大華人聯合會（萬錦）（FCCM）義工，致力連繫社區居民。</span>',
    img: 'https://ritchlau.ca/wp-content/uploads/2022/07/withIsa-1-1024x683.jpg',
    alt: 'Ritch Lau volunteering with the Taste of Asia festival and FCCM'
  },
  {
    era: 'term',
    date: '<span class="lang-en">2022 – 2026</span><span class="lang-zh">2022至2026年</span>',
    label: '<span class="lang-en">Founding member, A.C.E.</span><span class="lang-zh">A.C.E.創會成員</span>',
    title: '<span class="lang-en">Founding member, Active Community Engagement (A.C.E.)</span><span class="lang-zh">Active Community Engagement（A.C.E.）創會成員</span>',
    body: '<span class="lang-en">As former President and a founding member of Active Community Engagement (A.C.E.), Ritch helped organize community initiatives such as rapid test kit giveaways for residents.</span><span class="lang-zh">劉肇麟為Active Community Engagement（A.C.E.）前任會長及創會成員，曾協助組織社區活動，包括為居民派發快速測試套裝。</span>',
    img: 'https://ritchlau.ca/wp-content/uploads/2022/05/Rapid-Test-Kit-Giveaway-768x768.jpg',
    alt: 'Active Community Engagement rapid test kit giveaway event'
  },
  {
    era: 'term',
    date: '<span class="lang-en">2022 – 2026</span><span class="lang-zh">2022至2026年</span>',
    label: '<span class="lang-en">Cherish Advisor</span><span class="lang-zh">Cherish榮譽顧問</span>',
    title: '<span class="lang-en">Honorary Advisor, Cherish Integrated Services</span><span class="lang-zh">Cherish Integrated Services榮譽顧問</span>',
    body: '<span class="lang-en">Ritch serves as an Honorary Advisor to Cherish Integrated Services, supporting their work in the community.</span><span class="lang-zh">劉肇麟擔任Cherish Integrated Services榮譽顧問，支持其社區服務工作。</span>',
    img: 'https://ritchlau.ca/wp-content/uploads/2026/06/Cherish-768x768.jpg',
    alt: 'Ritch Lau with Cherish Integrated Services'
  },
  {
    era: 'term',
    date: '<span class="lang-en">First term</span><span class="lang-zh">首個任期</span>',
    label: '<span class="lang-en">Traffic safety push</span><span class="lang-zh">爭取交通安全</span>',
    title: '<span class="lang-en">Working on traffic safety</span><span class="lang-zh">推動交通安全</span>',
    body: '<span class="lang-en">As a young father himself, Ritch made speeding and neighbourhood traffic safety a priority, working with community groups and York Regional Police to make Ward 2 streets safer for families.</span><span class="lang-zh">身為年輕父親，劉肇麟將超速及社區交通安全列為首要工作，與社區組織及約克區警察合作，致力令第二選區的街道對家庭更安全。</span>',
    placeholder: '<span class="lang-en">Traffic calming / radar board photo</span><span class="lang-zh">交通減速措施照片</span>'
  },
  {
    era: 'term',
    date: '<span class="lang-en">First term</span><span class="lang-zh">首個任期</span>',
    label: '<span class="lang-en">Community Centre advocacy</span><span class="lang-zh">爭取興建社區中心</span>',
    title: '<span class="lang-en">Pushing for a Ward 2 Community Centre</span><span class="lang-zh">爭取興建第二選區社區中心</span>',
    body: '<span class="lang-en">Ritch has raised the question of why Ward 2 has never had its own community centre, and has advocated for a new multi-purpose facility to serve residents directly and ease pressure on Ward 6\'s Angus Glen Community Centre.</span><span class="lang-zh">劉肇麟一直質疑為何第二選區從未擁有自己的社區中心，並爭取興建新的多用途設施，直接服務區內居民，同時紓緩Angus Glen社區中心（第六選區）的使用壓力。</span>',
    img: 'https://ritchlau.ca/wp-content/uploads/2026/07/Ward2Map-768x960.webp',
    alt: 'Ward 2 map'
  },
  {
    era: 'term',
    date: '<span class="lang-en">First term</span><span class="lang-zh">首個任期</span>',
    label: '<span class="lang-en">Resident casework</span><span class="lang-zh">為居民跟進個案</span>',
    title: '<span class="lang-en">Direct resident casework</span><span class="lang-zh">直接為居民跟進個案</span>',
    body: '<span class="lang-en">Ritch personally responds to residents through emails, phone calls, WhatsApp, and neighbourhood group chats — helping with traffic safety, tree maintenance, parks, roads, by-law concerns, and construction impacts, and connecting cases with the right City staff.</span><span class="lang-zh">劉肇麟親自透過電郵、電話、WhatsApp及社區群組回應居民，協助處理交通安全、樹木維護、公園、道路、法規事宜及工程影響等問題，並將個案轉介予相關市府部門跟進。</span>',
    img: 'pictuers/resident-casework.jpg',
    alt: 'Ritch Lau door-knocking, speaking with a resident at their front door'
  },
  {
    era: 'next',
    date: '<span class="lang-en">Aug 1, 2026</span><span class="lang-zh">2026年8月1日</span>',
    label: '<span class="lang-en">Re-election campaign launch</span><span class="lang-zh">連任競選啟動</span>',
    title: '<span class="lang-en">Re-election campaign launch</span><span class="lang-zh">連任競選啟動</span>',
    body: '<span class="lang-en">Officially launches his re-election campaign, sharing his vision for Ward 2 and unveiling the 2026 Campaign Platform.</span><span class="lang-zh">正式啟動連任競選活動，分享他對第二選區的願景，並公布2026年競選政綱。</span>',
    img: 'pictuers/campaign-launch-aug2026.jpg',
    alt: 'Ritch Lau with volunteers and supporters at the 2026 campaign launch'
  },
  {
    era: 'next',
    date: '<span class="lang-en">2026 – 2030</span><span class="lang-zh">2026至2030年</span>',
    label: '<span class="lang-en">Looking ahead</span><span class="lang-zh">展望未來</span>',
    title: '<span class="lang-en">Looking ahead to a second term</span><span class="lang-zh">展望第二個任期</span>',
    body: '<span class="lang-en">If re-elected, Ritch aims to build on his first-term work — continuing to push for a Ward 2 Community Centre, further traffic-safety improvements, and staying accessible and responsive to residents.</span><span class="lang-zh">若成功連任，劉肇麟期望延續首個任期的工作 — 繼續爭取興建第二選區社區中心、推動交通安全改善，並持續與居民保持緊密聯繫。</span>',
    img: 'pictuers/media-interview-lake.jpg',
    alt: 'Ritch Lau speaking with media by a Ward 2 pond'
  }
];

const CE_ERAS = [
  { key: 'campaign', dot: '#4A2C82', label: '<span class="lang-en">2022 · Campaign &amp; election</span><span class="lang-zh">2022年 · 競選與當選</span>' },
  { key: 'term', dot: '#E8452C', label: '<span class="lang-en">2022–2026 · First term</span><span class="lang-zh">2022至2026年 · 首個任期</span>' },
  { key: 'next', dot: '#F4B942', label: '<span class="lang-en">2026 → · What\'s next</span><span class="lang-zh">2026年起 · 未來展望</span>' }
];

let ceSel = 0;

function ceRenderEras() {
  const wrap = document.getElementById('ceEras');
  if (!wrap) return;
  wrap.innerHTML = CE_ERAS.map(era => {
    const on = CE_ENTRIES[ceSel].era === era.key;
    return `<button type="button" class="ce-era${on ? ' is-active' : ''}" data-era="${era.key}">
      <span class="ce-era__dot" style="background:${era.dot}"></span>${era.label}
    </button>`;
  }).join('');
  wrap.querySelectorAll('.ce-era').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = CE_ENTRIES.findIndex(e => e.era === btn.dataset.era);
      if (idx !== -1) ceSelect(idx);
    });
  });
}

function ceRenderNodes() {
  const wrap = document.getElementById('ceNodes');
  if (!wrap) return;
  wrap.innerHTML = CE_ENTRIES.map((e, i) => `
    <button type="button" class="ce-node${i === ceSel ? ' is-active' : ''}" data-index="${i}">
      <span class="ce-node__dot"></span>
      <span class="ce-node__date">${e.date}</span>
      <span class="ce-node__label">${e.label}</span>
    </button>
  `).join('');
  wrap.querySelectorAll('.ce-node').forEach(btn => {
    btn.addEventListener('click', () => ceSelect(Number(btn.dataset.index)));
  });
  const progress = document.getElementById('ceProgress');
  if (progress) {
    progress.style.width = (((ceSel + 0.5) / CE_ENTRIES.length) * 100).toFixed(1) + '%';
  }
}

function ceRenderDetail() {
  const e = CE_ENTRIES[ceSel];
  const media = document.getElementById('ceDetailMedia');
  const date = document.getElementById('ceDetailDate');
  const title = document.getElementById('ceDetailTitle');
  const body = document.getElementById('ceDetailBody');
  const counter = document.getElementById('ceCounter');
  if (!media || !date || !title || !body) return;

  media.innerHTML = e.img
    ? `<img src="${e.img}" alt="${e.alt || ''}" loading="lazy">`
    : `<div class="ce-detail__placeholder">${e.placeholder || ''}</div>`;
  date.innerHTML = e.date;
  title.innerHTML = e.title;
  body.innerHTML = e.body;
  if (counter) counter.textContent = (ceSel + 1) + ' / ' + CE_ENTRIES.length;
}

function ceSelect(i) {
  ceSel = ((i % CE_ENTRIES.length) + CE_ENTRIES.length) % CE_ENTRIES.length;
  ceRenderEras();
  ceRenderNodes();
  ceRenderDetail();
}

const cePrevBtn = document.getElementById('cePrev');
const ceNextBtn = document.getElementById('ceNext');
if (cePrevBtn) cePrevBtn.addEventListener('click', () => ceSelect(ceSel - 1));
if (ceNextBtn) ceNextBtn.addEventListener('click', () => ceSelect(ceSel + 1));

if (document.getElementById('ceNodes')) {
  ceSelect(0);
}

// Ward 2 interactive neighbourhood map
const mapZones = document.querySelectorAll('.ward-map__zone');
const mapPanel = document.getElementById('mapPanel');
const mapPanelName = document.getElementById('mapPanelName');
const mapPanelBody = document.getElementById('mapPanelBody');

function selectHood(hood) {
  const card = document.querySelector(`.hood-card[data-hood="${hood}"]`);
  if (!card) return;

  mapZones.forEach(z => {
    const active = z.dataset.hood === hood;
    z.classList.toggle('is-active', active);
    z.setAttribute('aria-pressed', String(active));
  });

  mapPanelName.innerHTML = card.querySelector('.hood-card__name').innerHTML;
  mapPanelBody.innerHTML = card.querySelector('.hood-card__body').innerHTML;

  document.querySelectorAll('.hood-card').forEach(c => {
    const open = c === card;
    c.classList.toggle('is-open', open);
    c.querySelector('.hood-card__head').setAttribute('aria-expanded', String(open));
  });
}

mapZones.forEach(zone => {
  zone.addEventListener('click', () => selectHood(zone.dataset.hood));
});

if (mapZones.length) {
  selectHood(mapZones[0].dataset.hood);
}

// Ward 2 Neighbourhoods accordion
document.querySelectorAll('.hood-card__head').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.hood-card');
    const isOpen = card.classList.contains('is-open');
    card.classList.toggle('is-open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

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