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
    era: 'news',
    date: '<span class="lang-en">2005 – 2022</span><span class="lang-zh">2005至2026年</span>',
    label: '<span class="lang-en">Media & Journalism</span><span class="lang-zh">媒體與新聞工作</span>',
    title: '<span class="lang-en">Former Journalist, Reporter, News Anchor</span><span class="lang-zh">前媒體人，記者，新聞主播</span>',
    body: '<span class="lang-en">Before entering public service, Ritch spent 15 years in the media industry as a respected television news anchor with Fairchild TV, becoming a trusted voice and familiar face to Chinese Canadian families across the country. Known for his integrity, professionalism, and commitment to the truth, he believed those same values would enable him to serve the community in a greater capacity. In 2022, he left his full-time broadcasting career to run for Markham City Council, determined to be a strong and effective voice for residents.</span><span class="lang-zh">投身公共服務前，劉肇麟（Ritch Lau）在傳媒界工作15年，曾擔任新時代電視（Fairchild TV）晚間新聞主播，以專業、誠信及堅持真相的新聞精神，成為加拿大華人家庭熟悉且信賴的新聞主播。他深信，這些核心價值同樣是服務社區的重要基石，因此於2022年毅然離開全職傳媒工作，參選萬錦市議會，致力成為居民可靠的代言人，為社區發聲、為市民服務。</span>',
    img: 'images/TVnews.png',
    alt: 'Ritch Lau hosting the evening news program during the COVID Pandemic'
  },
  {
    era: 'news',
    date: '<span class="lang-en">2021 – 2022</span><span class="lang-zh">2021至2022年</span>',
    label: '<span class="lang-en">Founding member, Former President of A.C.E.</span><span class="lang-zh">A.C.E.政經民社創會成員及前會長</span>',
    title: '<span class="lang-en">Founding member, Former President of Active Community Engagement (A.C.E.)</span><span class="lang-zh">政經民社（A.C.E.）創會成員及前會長</span>',
    body: '<span class="lang-en">As a former President and founding member of Active Community Engagement (A.C.E.), Ritch helped organize community initiatives, including a mayoral by-election debate and rapid test kit giveaways for residents during the COVID-19 pandemic.</span><span class="lang-zh">劉肇麟為政經民社（安省政治經濟民生社區促進會 A.C.E.）前任會長及創會成員，曾積極協助推動多項社區活動，包括籌辦市長補選論壇，並於新冠疫情期間為居民派發快速測試包，支援社區需要。。</span>',
    img: 'images/ACE2021.jpg',
    alt: 'Active Community Engagement rapid test kit giveaway event'
  },
  {
    era: 'campaign',
    date: '<span class="lang-en">May 5, 2022</span><span class="lang-zh">2022年5月5日</span>',
    label: '<span class="lang-en">Announces candidacy</span><span class="lang-zh">率先宣布參選</span>',
    title: '<span class="lang-en">First to register as a candidate</span><span class="lang-zh">首位登記參選人</span>',
    body: '<span class="lang-en">Ritch was the first candidate to officially register for the 2022 Ward 2 election, demonstrating his commitment and readiness to serve. From day one, his campaign focused on the issues that matter most to residents: improving community and traffic safety, ensuring responsible budget management, protecting taxpayers\' dollars, and expanding recreational facilities and green spaces for families to enjoy.</span><span class="lang-zh">劉肇麟是2022年萬錦市第二選區首位正式登記參選的候選人，展現了服務社區的決心與承擔。自競選第一天起，他便聚焦居民最關心的議題，包括提升社區及交通安全、審慎管理公共財政、善用納稅人的每一分錢，以及增加康樂設施和綠化空間，建設更宜居的社區。</span>',
    img: 'images/candidacy-may2022.jpg',
    alt: 'Ritch Lau with supporters holding Ward 2 campaign signs'
  },
  {
    era: 'campaign',
    date: '<span class="lang-en">2022</span><span class="lang-zh">2022年</span>',
    label: '<span class="lang-en">Platinum Jubilee Medal</span><span class="lang-zh">白金禧獎章</span>',
    title: '<span class="lang-en">Queen Elizabeth II\'s Platinum Jubilee Medal recipient</span><span class="lang-zh">獲頒女皇伊麗莎白二世白金禧獎章</span>',
    body: '<span class="lang-en">Ritch was recognized as a recipient of the Queen Elizabeth II\'s Platinum Jubilee Medal in 2022, honouring his contributions to the community.</span><span class="lang-zh">劉肇麟於2022年獲頒女皇伊麗莎白二世白金禧獎章，以表揚他對社區的貢獻。</span>',
    img: 'images/jubilee2022.png',
    alt: "Queen Elizabeth II's Platinum Jubilee Medal certificate and pin"
  },
  {
    era: 'campaign',
    date: '<span class="lang-en">October 2022</span><span class="lang-zh">2022年10月</span>',
    label: '<span class="lang-en">Elected Councillor</span><span class="lang-zh">當選市議員</span>',
    title: '<span class="lang-en">Elected Ward 2 Councillor</span><span class="lang-zh">當選第二選區市議員</span>',
    body: '<span class="lang-en">Elected as Ward 2 Councillor in 2022, Ritch received 3,012 votes—the highest vote share among all newly elected councillors in Markham—reflecting a strong level of trust and support from residents. He also became the youngest member of Markham City Council. In his inaugural address, Ritch pledged to be a responsible, responsive, and hardworking councillor, committed to serving residents with integrity and dedication for years to come.</span><span class="lang-zh">當選萬錦市第二選區市議員後，劉肇麟在2022年市選中獲得3,012票支持，成為萬錦市新當選議員中得票率最高的候選人，充分反映選民對他的信任與支持；同時，他亦是當屆市議會最年輕的市議員。在就職演說中，他承諾以盡責、高效、積極回應居民需要的態度服務社區，致力成為一位值得居民長期信賴的市議員。</span>',
    img: 'images/Inaug2022.jpg',
    alt: 'Ritch Lau portrait',
    fit: 'contain'
  },
  {
    era: 'term',
    date: '<span class="lang-en">2022 – Ongoing</span><span class="lang-zh">2022年至今</span>',
    label: '<span class="lang-en">Taste of Asia &amp; FCCM</span><span class="lang-zh">亞洲文化美食節與FCCM</span>',
    title: '<span class="lang-en">Taste of Asia organizing committee &amp; FCCM volunteer</span><span class="lang-zh">「亞洲文化美食節」籌委會委員及FCCM義工</span>',
    body: '<span class="lang-en">Ritch serves on the Organizing Committee for the City of Markham’s Taste of Asia festival and volunteers with the Federation of Chinese Canadians in Markham (FCCM), helping bring the community together. Through Taste of Asia, he has helped grow one of Markham’s largest cultural festivals, attracting over 200,000 visitors annually and supporting local businesses and restaurants.</span><span class="lang-zh">劉肇麟現為萬錦市「亞洲文化美食節」（Taste of Asia）籌委會成員，並積極參與萬錦加華聯會（FCCM）的社區服務工作，凝聚社區力量。透過參與亞洲文化美食節，他協助推動萬錦市其中一項大型文化盛事，每年吸引超過20萬名訪客，不僅促進社區交流，也支持本地商戶及餐飲業發展。</span>',
    img: 'images/TOA2024.jpg',
    alt: 'Ritch Lau volunteering with the Taste of Asia festival and FCCM'
  },
  {
    era: 'term',
    date: '<span class="lang-en">2022 – 2026</span><span class="lang-zh">2022至2026年</span>',
    label: '<span class="lang-en">Cherish Advisor</span><span class="lang-zh">Cherish智愛中心榮譽顧問</span>',
    title: '<span class="lang-en">Honorary Advisor, Cherish Integrated Services</span><span class="lang-zh">Cherish智愛中心榮譽顧問</span>',
    body: '<span class="lang-en">Ritch serves as an Honorary Advisor to Cherish Integrated Services, supporting their work to empower individuals with intellectual disabilities and their families. Through his involvement, he has helped promote their mission, support fundraising efforts, and strengthen community awareness for more inclusive services.</span><span class="lang-zh">劉肇麟現任 Cherish Integrated Services 榮譽顧問，積極支持該機構服務智障人士及其家庭的使命。他透過參與社區倡議及籌款活動，協助提升公眾關注，推動更具包容性的社區，讓更多有需要人士獲得支持。</span>',
    img: 'images/cherish2026badminton.jpg',
    alt: 'Ritch Lau with Cherish Integrated Services'
  },
  {
    era: 'term',
    date: '<span class="lang-en">First term</span><span class="lang-zh">首個任期</span>',
    label: '<span class="lang-en">Safer Neighbourhoods, Safer Streets</span><span class="lang-zh">守護社區安全</span>',
    title: '<span class="lang-en">Safer Neighbourhoods, Safer Streets</span><span class="lang-zh">守護社區安全</span>',
    body: '<span class="lang-en">As a father of two, Ritch understands that every family deserves to feel safe in their own neighbourhood. He has made community and traffic safety a top priority, working alongside Neighbourhood Watch Groups and York Regional Police to strengthen partnerships, address local concerns, help reduce crime, and help make Ward 2 a safer place to live.</span><span class="lang-zh">身為兩個孩子的父親，劉肇麟深信每個家庭都應該享有安全安心的生活環境。他將社區安全及道路安全列為首要議題，積極與社區守望相助組織及約克區警隊合作，回應居民關注，努力協助減少罪案，讓第二選區更安全。</span>',
    img: 'images/YRP.jpg',
    alt: 'Ritch worked closely with York Regional Police to tackle crime rates and road safety'
  },
  {
    era: 'term',
    date: '<span class="lang-en">First term</span><span class="lang-zh">首個任期</span>',
    label: '<span class="lang-en">Championing a Future Community Centre</span><span class="lang-zh">推動未來社區中心建設</span>',
    title: '<span class="lang-en">Championing a Future Community Centre</span><span class="lang-zh">推動未來社區中心建設</span>',
    body: '<span class="lang-en">Ritch delivered on his 2022 campaign commitment by bringing forward and successfully passing a motion to address Ward 2’s long-standing need for a dedicated multi-purpose community centre. The motion recognized the growing demand for sports, recreation, and community programs, with existing facilities unable to meet residents’ needs. It received unanimous support from the Mayor, Deputy Mayor, and all Members of Markham City Council, marking a significant step toward securing a future multi-purpose community centre for Ward 2 residents.</span><span class="lang-zh">劉議員兌現2022年參選承諾，提出並成功推動市議會通過動議，回應Ward 2多年來缺乏專屬社區中心的需要。該動議指出，隨著社區人口持續增長，居民對體育、康樂及社區活動空間的需求日益增加，而現有設施已未能完全滿足需要。動議獲市長、副市長及萬錦市議會全體議員一致支持，為爭取未來多用途社區中心邁出重要一步。</span>',
    img: 'images/VSCC.jpg',
    alt: 'The existing Victoria Square Community Centre'
  },
  {
    era: 'term',
    date: '<span class="lang-en">First term</span><span class="lang-zh">首個任期</span>',
    label: '<span class="lang-en">Listening & Responding</span><span class="lang-zh">聆聽民意・積極跟進</span>',
    title: '<span class="lang-en">Listening & Responding</span><span class="lang-zh">聆聽民意・積極跟進</span>',
    body: '<span class="lang-en">Ritch personally responds to residents through emails, phone calls, WhatsApp, and neighbourhood group chats — helping with traffic safety, tree maintenance, parks, roads, by-law concerns, and construction impacts, and connecting cases with the right City staff.</span><span class="lang-zh">劉肇麟親自透過電郵、電話、WhatsApp及社區群組回應居民，協助處理交通安全、樹木維護、公園、道路、法規事宜及工程影響等問題，並將個案轉介予相關市府部門跟進。</span>',
    img: 'images/VSresidents.jpg',
    alt: 'Ritch Lau door-knocking, speaking with a resident at their front door'
  },
  {
    era: 'next',
    date: '<span class="lang-en">Aug 1, 2026</span><span class="lang-zh">2026年8月1日</span>',
    label: '<span class="lang-en">Re-election campaign launch</span><span class="lang-zh">連任競選啟動</span>',
    title: '<span class="lang-en">Re-election campaign launch</span><span class="lang-zh">連任競選啟動</span>',
    body: '<span class="lang-en">Officially launches his re-election campaign, sharing his vision for Ward 2 and unveiling the 2026 Campaign Platform.</span><span class="lang-zh">正式啟動連任競選活動，分享他對第二選區的願景，並公布2026年競選政綱。</span>',
    img: 'images/campaign-launch-aug2026.jpg',
    alt: 'Ritch Lau with volunteers and supporters at the 2026 campaign launch'
  },
  {
    era: 'next',
    date: '<span class="lang-en">2026 – 2030</span><span class="lang-zh">2026至2030年</span>',
    label: '<span class="lang-en">Building on Progress</span><span class="lang-zh">延續成果・邁向未來</span>',
    title: '<span class="lang-en">Building on Progress: A Second Term Vision</span><span class="lang-zh">延續第一任期成果，開創Ward 2新篇章</span>',
    body: '<span class="lang-en">If re-elected, Ritch will continue building on the progress made during his first term — advancing the approved motion for a future multi-purpose Community Centre, delivering further improvements to community and traffic safety, and remaining an accessible, responsive, and dedicated voice for Ward 2 residents.</span><span class="lang-zh">若成功連任，劉肇麟將延續第一任期所取得的成果，繼續推進市議會已通過的未來多用途社區中心計劃，進一步提升社區及交通安全，並保持開放、積極回應居民需要的服務態度，繼續成為第二選區居民值得信賴、盡責的聲音。</span>',
    img: 'images/0801speech.jpg',
    alt: 'Ritch Lau speaking with media by a Ward 2 pond'
  }
];

const CE_ERAS = [
  { key: 'news', dot: '#4A2C82', label: '<span class="lang-en">2005-2022 · Media &amp; Journalism</span><span class="lang-zh">2005-2022年 · 媒體與新聞工作</span>' },
  { key: 'campaign', dot: '#7950c4', label: '<span class="lang-en">2022 · Campaign &amp; election</span><span class="lang-zh">2022年 · 參選與當選</span>' },
  { key: 'term', dot: '#17A398', label: '<span class="lang-en">2022–2026 · First term</span><span class="lang-zh">2022至2026年 · 首個任期</span>' },
  { key: 'next', dot: '#5FD6C7', label: '<span class="lang-en">2026 → · Re-Election & Second Term</span><span class="lang-zh">2026年 · 競選連任</span>' }
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
    ? `<img src="${e.img}" alt="${e.alt || ''}" loading="lazy" style="object-fit:${e.fit || 'cover'};">`
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
const HOOD_DATA = {
  buttonville: {
    name: '<span class="lang-en">Buttonville</span><span class="lang-zh">Buttonville 前機場區</span>',
    about: '<span class="lang-en">A community shaped by Markham’s aviation heritage, Buttonville is entering a new chapter as the former airport lands transform into a major employment and industrial hub, alongside established residential neighbourhoods near Woodbine Avenue and 16th Avenue.</span><span class="lang-zh">Buttonville 是一個承載萬錦航空歷史的社區，隨著前機場土地展開轉型，正邁向成為重要的就業及產業發展區。與此同時，區內 Woodbine Avenue 及 16th Avenue 一帶的成熟住宅社區，繼續保有其獨特的鄰里特色。</span>',
    concerns: [
      '<span class="lang-en">Managing the pace and scale of Buttonville’s redevelopment</span><span class="lang-zh">確保Buttonville機場土地改建項目發展有序、配合社區需要</span>',
      '<span class="lang-en">Improving traffic flow and safety on Apple Creek, Rodick and other busy secondary roads</span><span class="lang-zh">改善 Apple Creek、Rodick 等繁忙道路的交通與安全</span>',
      '<span class="lang-en">Addressing height, density and traffic concerns related to the new Mon Sheong Court development on Apple Creek</span><span class="lang-zh">關注萬錦百頓孟嘗閣新項目的樓高、人口密度及交通影響</span>'
    ]
  },
  cachet: {
    name: '<span class="lang-en">Cachet</span><span class="lang-zh">Cachet 凱旋區</span>',
    about: '<span class="lang-en">An established and family-oriented community in northeast Markham, Cachet is known for its spacious detached homes, mature tree-lined streets, beautiful parks and strong sense of neighbourhood pride. With convenient access to highly regarded schools and nearby amenities, Cachet remains one of Ward 2’s most desirable communities.</span><span class="lang-zh">Cachet 凱旋區是萬錦市東北部一個成熟且以家庭為核心的社區，以寬敞的獨立屋、綠樹成蔭的街道、優美的公園及濃厚的鄰里凝聚力而聞名。社區鄰近優質學校及各項生活設施，一直是第二選區內深受居民喜愛的宜居社區。</span>',
    concerns: [
      '<span class="lang-en">Fighting property crimes, strengthening neighbourhood watch, and building safer communities together.</span><span class="lang-zh">致力打擊入屋盜竊、偷車等社區罪案，推動及加強鄰舍守望，攜手打造更安全的社區</span>',
      '<span class="lang-en">Addressing issues related to mature trees, tree sap, and honeydew</span><span class="lang-zh">積極跟進成熟樹木、樹液及蜜露對居民造成的困擾</span>',
      '<span class="lang-en">Protecting Cachet’s mature neighbourhood character, green spaces, and quality of life</span><span class="lang-zh">保護 Cachet 獨特的社區特色，守護居民珍惜的生活環境</span>'
    ]
  },
  cathedraltown: {
    name: '<span class="lang-en">Cathedraltown</span><span class="lang-zh">Cathedraltown 大教堂區</span>',
    about: '<span class="lang-en">Built around the iconic Cathedral of the Transfiguration. Cathedraltown is a unique Ward 2 community known for its heritage-inspired architecture, beautiful streetscapes, and strong sense of community. With parks, trails, and green spaces throughout, it offers a peaceful and family-friendly neighbourhood.</span><span class="lang-zh">以大教堂為中心的社區，以仿古建築風格、優美街景及濃厚的社區精神著稱。區內綠意盎然，設有公園及步道，打造出寧靜舒適、適合家庭生活的環境。</span>',
    concerns: [
      '<span class="lang-en">Successfully secured additional overnight street parking spaces to better serve residents</span><span class="lang-zh">成功爭取增加過夜路邊停車位，回應居民實際需要</span>',
      '<span class="lang-en">Worked with York Region to address residents’ traffic safety concerns by advocating for additional speed reduction signage and safety measures along Woodbine Bypass to better protect students and families during school drop-off and pick-up times.</span><span class="lang-zh">積極反映居民關注的日常交通問題，向約克區政府爭取在 Woodbine Bypass 增設減速提示牌及相關安全設施，提升道路安全，保障學生及家長上學及放學期間的通行安全。</span>',
      '<span class="lang-en">Proactively addressing noise concerns and preserving a peaceful community</span><span class="lang-zh">以積極、盡責的態度跟進居民噪音滋擾訴求，協助尋求解決方案，保障居民生活質素</span>'
    ]
  },
  'victoria-square': {
    name: '<span class="lang-en">Victoria Square</span><span class="lang-zh">Victoria Square 維多利亞廣場</span>',
    about: '<span class="lang-en">One of Markham\’s historic hamlets, Victoria Square retains its small-town, semi-rural character while evolving alongside newer neighbourhoods. Located near Victoria Square Blvd (formerly Woodbine Ave) and Elgin Mills Rd, it offers a unique blend of heritage, community and modern growth.</span><span class="lang-zh">Victoria Square 是萬錦市歷史悠久的社區之一，坐落於 Victoria Square Blvd（前身為 Woodbine Ave）與 Elgin Mills Rd 一帶，保留著獨特的小鎮及半鄉村風貌，在發展中延續其歷史與社區特色。</span>',
    concerns: [
      '<span class="lang-en">Preserving heritage character amid new development</span><span class="lang-zh">在新發展中保留歷史特色</span>',
      '<span class="lang-en">Helped secure the largest City capital investment of 2025 for the Victoria Square Boulevard Reconstruction Project</span><span class="lang-zh">2025年積極爭取並協助促成市府於最大規模的投資撥款，用於維多利亞廣場大道（Victoria Square Boulevard）重建工程</span>',
      '<span class="lang-en">Passed a motion directing City staff to work toward a new community centre</span><span class="lang-zh">成功推動個人議案並獲市議會通過，指示市府展開第二選區未來多用途社區中心的研究及規劃工作</span>',
      '<span class="lang-en">Successfully advocated for a Pop-up Off-Leash Dog Area at Victoria Square Park for two consecutive years. Widely supported by residents, Ritch continues to work towards making it a permanent facility to provide a better recreational space for residents and their furry companions.</span><span class="lang-zh">成功爭取於 Victoria Square Park 連續兩年設立臨時免圈繩狗公園（Pop-up Off-Leash Dog Area），廣受居民歡迎，並正積極推動將其升級為永久設施，為居民及毛孩提供更完善的休閒空間。</span>'
    ]
  },
  springwater: {
    name: '<span class="lang-en">Springwater</span><span class="lang-zh">Springwater 泉水</span>',
    about: '<span class="lang-en">As the newest community in Ward 2, Springwater is a growing residential neighbourhood developed across three phases by the same builder. With newer homes, family-friendly streets and green spaces, it continues to evolve into a vibrant and welcoming community.</span><span class="lang-zh">Springwater 是萬錦市第二選區最新發展的社區，由同一發展商分三期興建。社區以新建住宅、適合家庭居住的街道及綠化空間為特色，隨著區內持續發展，逐漸形成充滿活力、友善宜居的社區。</span>',
    concerns: [
      '<span class="lang-en">Acted as a key liaison between City staff and developers during the transition of municipal services, helping ensure a smooth process for residents</span><span class="lang-zh">在市政服務過渡期間，擔任市府及發展商之間的重要協調橋樑，確保居民服務順利銜接</span>',
      '<span class="lang-en">Worked with City staff and stakeholders to keep the Stoney Hill and Vine Cliff Bridge construction projects on track and moving forward</span><span class="lang-zh">與市府工作人員及相關持份者緊密合作，確保 Stoney Hill 及 Vine Cliff 橋樑工程如期推進</span>',
      '<span class="lang-en">Supported new homeowners by addressing concerns and helping resolve issues with their new homes</span><span class="lang-zh">積極協助新業主跟進新居相關問題，協調各方處理居民訴求</span>'
    ]
  },
  'civic-centre': {
    name: '<span class="lang-en">Town / Civic Centre</span><span class="lang-zh">Town / Civic Centre 市政廳</span>',
    about: '<span class="lang-en">Town/Civic Centre is the urban heart of Ward 2, home to the iconic Circa Towers and Markham Civic Centre. At the intersection of Town Centre Blvd and Cox Blvd, Millennium Park serves as a popular gathering place for families, surrounded by vibrant condo living, townhomes, and semi-detached homes. The neighbourhood offers convenient access to parks, city services, and a growing, connected community.</span><span class="lang-zh">Town / Civic Centre 市政廳社區 是第二選區的核心地帶，擁有地標性的 Circa 雙子住宅大樓及萬錦市政廳。位於 Town Centre Blvd 與 Cox Blvd 交界的 Millennium Park，是深受家庭歡迎的休閒聚集地，周邊環繞高層公寓、鎮屋及半獨立屋，形成充滿活力且多元化的住宅社區。區內公園、市政設施及各項服務完善，交通便利，居民享有舒適便捷的生活環境。</span>',
    concerns: [
      '<span class="lang-en">Supporting Circa Residents - Serving as a strong bridge between Circa Condominium management, residents, and City staff to resolve issues and improve communication.</span><span class="lang-zh">支援 Circa 社區居民 - 擔任 Circa 住戶、管理處與市府之間的橋樑，積極協調溝通，協助居民解決各項問題。</span>',
      '<span class="lang-en">A Safer Millennium Park - Advocating for enhanced safety for families and pets, including a dedicated off-leash dog area separate from playgrounds and high-use park spaces.</span><span class="lang-zh">打造更安全的 Millennium Park - 爭取提升公園安全，兼顧家庭與寵物使用需求，推動設立獨立、安全的狗隻免繩活動區。</span>',
      '<span class="lang-en">Balanced Circa Phase 3 Development - Working proactively with residents and the developer to balance building height and density, secure community amenities, and protect neighbourhood livability.</span><span class="lang-zh">平衡 Circa 第三期發展 - 積極協調居民與發展商，平衡樓宇高度及密度、爭取社區公共空間，並盡力減低新發展對現有居民生活質素的影響。</span>'
    ]
  }
};

const mapZones = document.querySelectorAll('.ward-map__zone');
const mapPanelName = document.getElementById('mapPanelName');
const mapPanelBody = document.getElementById('mapPanelBody');

function selectHood(hood) {
  const data = HOOD_DATA[hood];
  if (!data || !mapPanelName || !mapPanelBody) return;

  mapZones.forEach(z => {
    const active = z.dataset.hood === hood;
    z.classList.toggle('is-active', active);
    z.setAttribute('aria-pressed', String(active));
  });

  mapPanelName.innerHTML = data.name;
  mapPanelBody.innerHTML = `
    <p class="hood-card__label"><span class="lang-en">About</span><span class="lang-zh">社區特色</span></p>
    <p>${data.about}</p>
    <p class="hood-card__label"><span class="lang-en">Key Priorities & Results</span><span class="lang-zh">重點議題及工作成果</span></p>
    <ul>${data.concerns.map(c => `<li>${c}</li>`).join('')}</ul>
  `;
}

mapZones.forEach(zone => {
  zone.addEventListener('click', () => selectHood(zone.dataset.hood));
});

if (mapZones.length) {
  selectHood(mapZones[0].dataset.hood);
}

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