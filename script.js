'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;

/* ===== ภาษา TH / EN ===== */
let lang = 'th'; try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'th'; } catch (e) {}
const L = (th, en) => lang === 'en' ? en : th;
const P = (p, k) => (lang === 'en' && p.en && p.en[k]) || p[k];

/* ===== ข้อมูลผลงาน (แก้ไข/เพิ่มได้ที่นี่) — path ภาพต้องตรงกับโฟลเดอร์ assets ===== */
const PROJECTS = [
  { id: 'wms-cold-storage', title: 'WMS Cold Storage', badge: 'ล่าสุด',
    tags: ['HTML', 'CSS', 'JavaScript', 'SheetJS', 'IndexedDB', 'Excel'],
    summary: 'ระบบจัดการสต็อกคลังสินค้าห้องเย็น สำหรับตัดยอด จัดชุดพาเลทให้พอดี Master Cap และรวมเลท',
    points: ['นำเข้าข้อมูลสต็อกจากไฟล์ Excel / CSV ของระบบ WMS (รองรับข้อมูลหลายหมื่นแถว)', 'ตารางสต็อกรวมยอดตาม LPN พร้อมตัวกรองคลัง Location และประเภท LPN', 'จัดชุดและรวมเลทให้ไม่เกิน Master Cap โดยไม่แยก LPN และไม่รวมข้ามคลัง', 'ตัดยอด บันทึกประวัติ และ Export ผลเป็นไฟล์ Excel', 'โหมดสว่าง/มืด และเก็บข้อมูลในเบราว์เซอร์ด้วย IndexedDB'],
    images: ['assets/wms-cold-storage.jpg'],
    link: { url: 'https://achita-yuki.github.io/wms-app-beta-test/', label: 'เปิดใช้งานเว็บ WMS' },
    en: { badge: 'Latest', linkLabel: 'Open the WMS web app',
      summary: 'Cold-storage warehouse stock management system for stock deduction, arranging pallet sets to fit the Master Cap, and merging pallets.',
      points: ['Import stock data from Excel / CSV files of the WMS system (supports tens of thousands of rows)', 'Stock table totalled by LPN, with filters for warehouse, location and LPN type', 'Arrange and merge pallets without exceeding the Master Cap — never splitting an LPN or merging across warehouses', 'Deduct stock, keep a history, and export the results to an Excel file', 'Light / dark mode, with data stored in the browser using IndexedDB'] } },
  { id: 'catfish-care', title: 'Smart Catfish Care System',
    tags: ['ESP32', 'Arduino', 'DS18B20', 'Turbidity Sensor', 'IoT'],
    summary: 'ระบบตรวจสอบอุณหภูมิและความขุ่นของน้ำในการเลี้ยงปลาดุก',
    points: ['วัดอุณหภูมิน้ำด้วยเซนเซอร์ DS18B20', 'วัดความขุ่นของน้ำด้วย Turbidity Sensor', 'ประมวลผลและเชื่อมต่อระบบ IoT ด้วย ESP32 / Arduino', 'ช่วยให้ผู้เลี้ยงติดตามคุณภาพน้ำได้สะดวกขึ้น'],
    images: ['assets/catfish.jpg', 'assets/catfish-circuit.jpg', 'assets/catfish-work.jpg'],
    en: { summary: 'A system that monitors water temperature and turbidity for catfish farming.',
      points: ['Measures water temperature with a DS18B20 sensor', 'Measures water turbidity with a Turbidity Sensor', 'Processes data and connects to IoT using ESP32 / Arduino', 'Helps farmers keep track of water quality more conveniently'] } },
  { id: 'catfish-guide', title: 'Thai Catfish Guide',
    tags: ['HTML', 'CSS', 'JavaScript'],
    summary: 'เว็บไซต์รวบรวมข้อมูลเกี่ยวกับปลาดุกในประเทศไทย',
    points: ['พัฒนาด้วย HTML, CSS และ JavaScript', 'รวบรวมและนำเสนอข้อมูลปลาดุกในประเทศไทย', 'ออกแบบให้อ่านง่ายและใช้งานได้บนหลายอุปกรณ์'],
    images: ['assets/catfish-guide.jpg', 'assets/catfish-guide-page.jpg'],
    link: { url: 'https://www.figma.com/proto/udrFQarwqmFAtHCMkoSuUV/%E0%B9%84%E0%B8%81%E0%B8%84%E0%B9%8C%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%B8%E0%B9%8C%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%B8%E0%B8%81%E0%B9%84%E0%B8%97%E0%B8%A2?t=b7dYptMBFuHbHaeN-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=80-202&starting-point-node-id=80%3A202&show-proto-sidebar=1', label: 'ดู Prototype บน Figma' },
    en: { linkLabel: 'View the prototype on Figma', summary: 'A website that gathers information about catfish in Thailand.',
      points: ['Built with HTML, CSS and JavaScript', 'Collects and presents information about catfish in Thailand', 'Designed to be easy to read and usable on many devices'] } },
  { id: 'decision-tree', title: 'Decision Tree',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Machine Learning'],
    summary: 'โปรเจกต์ศึกษาการทำงานของ Decision Tree',
    points: ['เตรียมและวิเคราะห์ข้อมูลด้วย Pandas', 'แสดงผลด้วยกราฟจาก Matplotlib', 'ศึกษาหลักการทำงานของ Decision Tree ใน Machine Learning'],
    images: ['assets/decision-tree.jpg'],
    en: { summary: 'A project studying how a Decision Tree works.',
      points: ['Prepare and analyse data with Pandas', 'Visualise results with Matplotlib charts', 'Study how Decision Trees work in Machine Learning'] } }
];

/* ===== ภาพสำรอง: ถ้าไม่พบไฟล์ภาพ จะแสดงกรอบแทน ===== */
function placeholder(src) {
  const name = (src || '').split('/').pop(), pf = name === 'profile.jpg';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${pf ? 800 : 500}" viewBox="0 0 800 ${pf ? 800 : 500}"><rect width="100%" height="100%" fill="#17223d"/><text x="400" y="${pf ? 420 : 265}" fill="#5eead4" font-family="sans-serif" font-size="${pf ? 260 : 44}" text-anchor="middle">${pf ? 'AT' : name.replace(/[<>&]/g, '')}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
document.addEventListener('error', e => {
  const t = e.target;
  if (t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = '1'; t.src = placeholder(t.getAttribute('src')); }
}, true);
addEventListener('DOMContentLoaded', () => $$('img').forEach(i => {
  if (i.complete && !i.naturalWidth && !i.dataset.fb) { i.dataset.fb = '1'; i.src = placeholder(i.getAttribute('src')); }
}));

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
/* ===== เอฟเฟกต์เคลื่อนไหว เปิด/ปิด (จำค่าไว้) ===== */
let fxOff = reduceMotion; try { const f = localStorage.getItem('fx'); if (f) fxOff = f === 'off'; } catch (e) {}
function setFx(on, save) {
  fxOff = !on; root.classList.toggle('nofx', fxOff);
  $('#fxBtn').setAttribute('aria-pressed', on);
  if (save) { try { localStorage.setItem('fx', on ? 'on' : 'off'); } catch (e) {} }
  if (on) startRoles(); else stopRoles();
}
/* ===== ธีมสว่าง / มืด ===== */
function setTheme(t) {
  root.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch (e) {}
  const m = $('meta[name="theme-color"]'); if (m) m.content = t === 'light' ? '#eef1fa' : '#0a0f1f';
}
let savedTheme = 'dark'; try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
setTheme(savedTheme);
function toggleTheme(x, y) {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  if (!document.startViewTransition || reduceMotion || fxOff) { setTheme(next); return; }
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(() => setTheme(next)).ready.then(() => root.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 600, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' })).catch(() => {});
}
$('#themeBtn').addEventListener('click', e => { const b = e.currentTarget.getBoundingClientRect(); toggleTheme(e.clientX || b.left + b.width / 2, e.clientY || b.top + b.height / 2); });

/* ===== Sidebar (มือถือ/แท็บเล็ต: กดเพื่อแสดงข้อมูลติดต่อ) ===== */
const sidebar = $('#sidebar'), moreBtn = $('#moreBtn');
moreBtn.addEventListener('click', () => { const o = sidebar.classList.toggle('active'); moreBtn.setAttribute('aria-expanded', o); });

/* ===== สลับหน้า (About / Resume / Portfolio / Contact) + จำหน้าใน #hash ===== */
const pages = $$('[data-page]'), navs = $$('[data-nav]');
function stagger(page) {
  $$('.stat,.service-item,.timeline-item,.skill-groups>li,.project-item,.about-text p', page).forEach((el, i) => el.style.setProperty('--n', i));
}
function showPage(name, push) {
  if (!pages.some(p => p.dataset.page === name)) name = 'about';
  const prevP = pages.find(p => p.classList.contains('active')), order0 = navs.map(n => n.dataset.nav);
  const dir = prevP && prevP.dataset.page !== name ? (order0.indexOf(name) > order0.indexOf(prevP.dataset.page) ? 'r' : 'l') : '';
  pages.forEach(p => { const on = p.dataset.page === name; p.hidden = !on; p.classList.toggle('active', on); });
  navs.forEach(n => { const on = n.dataset.nav === name; n.classList.toggle('active', on); on ? n.setAttribute('aria-current', 'page') : n.removeAttribute('aria-current'); });
  if (push) { history.replaceState(null, '', '#' + name); scrollTo(0, 0); }
  const cur = pages.find(p => p.dataset.page === name); stagger(cur);
  if (dir) cur.dataset.dir = dir;
  if (name === 'about') { runStats(); window.runTerm && window.runTerm(); }
  dispatchEvent(new Event('pagechange'));
}
navs.forEach(n => n.addEventListener('click', () => showPage(n.dataset.nav, true)));
addEventListener('hashchange', () => showPage(location.hash.slice(1)));

/* ===== ตัวเลขสถิติ (คำนวณจากข้อมูลจริงใน PROJECTS) ===== */
function runStats() {
  const vals = { projects: PROJECTS.length, tech: new Set(PROJECTS.flatMap(p => p.tags)).size, areas: 3 };
  $$('[data-count]').forEach(el => {
    const to = vals[el.dataset.count] ?? 0, t0 = performance.now(), dur = reduceMotion ? 0 : 900;
    (function step(t) { const k = dur ? Math.min((t - t0) / dur, 1) : 1; el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
  });
}

/* ===== ผลงาน: การ์ด + ตัวกรอง ===== */
const catOf = p => p.tags.some(t => /ESP32|Arduino|IoT/i.test(t)) ? 'iot' : p.tags.some(t => /Python|Machine/i.test(t)) ? 'ml' : 'web';
const catName = c => c === 'iot' ? 'IoT' : c === 'ml' ? 'Python / ML' : 'Web Development';
let curFilter = 'all';
function renderProjects() {
  $('#projectGrid').innerHTML = PROJECTS.map(p => `
    <li class="project-item" data-cat="${catOf(p)}">
      <button class="project-btn" type="button" data-project="${p.id}" aria-label="${L('ดูรายละเอียด', 'View details of')} ${p.title}">
        <figure class="project-img"><span class="project-icon"><svg class="i" aria-hidden="true"><use href="#i-eye"/></svg></span><img src="${p.images[0]}" alt="" loading="lazy"></figure>
        <h3 class="project-title">${p.title}${P(p, 'badge') ? ` <span class="badge">${P(p, 'badge')}</span>` : ''}</h3>
        <p class="project-category">${catName(catOf(p))}</p>
      </button>
    </li>`).join('');
  applyFilter(false);
}
function applyFilter(animate) {
  $$('#projectGrid .project-item').forEach(c => {
    c.hidden = curFilter !== 'all' && c.dataset.cat !== curFilter;
    if (animate && !c.hidden && !reduceMotion) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
  });
}
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('[data-f]'); if (!b) return;
  curFilter = b.dataset.f;
  $$('#filters [data-f]').forEach(x => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', on); });
  applyFilter(true);
  const n = $$('#projectGrid .project-item').filter(c => !c.hidden).length;
  $('#liveStatus').textContent = L(`แสดง ${n} ผลงาน`, `Showing ${n} projects`);
});

/* ===== แถบทักษะ: นับจากจำนวนผลงานที่ใช้จริง ===== */
function renderBars() {
  const n = {}; PROJECTS.forEach(p => p.tags.forEach(t => n[t] = (n[t] || 0) + 1));
  const rows = Object.entries(n).sort((a, b) => b[1] - a[1]).slice(0, 8);
  $('#skillBars').innerHTML = rows.map(([t, c]) => `<li><div class="bl"><span>${t}</span><small>${L(`ใช้ใน ${c}/${PROJECTS.length} ผลงาน`, `Used in ${c}/${PROJECTS.length} projects`)}</small></div><div class="bar" role="img" aria-label="${t}: ${c}/${PROJECTS.length}"><i style="--w:${Math.round(c / PROJECTS.length * 100)}%"></i></div></li>`).join('');
}

/* ===== Modal รายละเอียดผลงาน + Gallery + Lightbox ===== */
const modal = $('#modal'), mMain = $('#mMain'), lightbox = $('#lightbox');
let current = null, lastFocus = null;
const setInert = on => $$('main,.skip,#toTop').forEach(el => el.toggleAttribute('inert', on));
function setMain(i) {
  delete mMain.dataset.fb;
  mMain.src = current.images[i];
  mMain.alt = L(`${current.title} ภาพที่ ${i + 1}`, `${current.title} image ${i + 1}`);
  $$('.thumb').forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-pressed', k === i); });
}
function openProject(id) {
  current = PROJECTS.find(p => p.id === id); if (!current) return;
  lastFocus = document.activeElement;
  $('#mTitle').textContent = current.title;
  $('#mSum').textContent = P(current, 'summary');
  $('#mTags').innerHTML = current.tags.map(t => `<li>${t}</li>`).join('');
  $('#mList').innerHTML = P(current, 'points').map(t => `<li>${t}</li>`).join('');
  $('#mThumbs').innerHTML = current.images.length > 1
    ? current.images.map((s, i) => `<button class="thumb" type="button" data-i="${i}" aria-label="${L('ดูภาพที่', 'View image')} ${i + 1}"><img src="${s}" alt=""></button>`).join('') : '';
  const lk = current.link, lbl = lk && ((lang === 'en' && current.en && current.en.linkLabel) || lk.label);
  $('#mLink').innerHTML = lk ? `<a class="link-btn" href="${lk.url}" target="_blank" rel="noopener noreferrer">${lbl}<svg class="i" aria-hidden="true"><use href="#i-arrow"/></svg><span class="sr">${L(' (เปิดแท็บใหม่)', ' (opens in a new tab)')}</span></a>` : '';
  setMain(0);
  modal.hidden = false; document.body.classList.add('lock'); setInert(true);
  $('.modal-close-btn', modal).focus();
}
function closeModal() {
  modal.hidden = true; document.body.classList.remove('lock'); setInert(false);
  if (lastFocus) lastFocus.focus();
}
function openLightbox() { $('#lbImg').src = mMain.src; $('#lbImg').alt = mMain.alt; lightbox.hidden = false; $('#lbClose').focus(); }
function closeLightbox() { lightbox.hidden = true; if (!modal.hidden) $('#mainBtn').focus(); }
document.addEventListener('click', e => {
  const b = e.target.closest('[data-project]'); if (b) openProject(b.dataset.project);
  if (e.target.closest('[data-close]')) closeModal();
  const th = e.target.closest('.thumb'); if (th) setMain(+th.dataset.i);
});
$('#mainBtn').addEventListener('click', openLightbox);
$('#lbClose').addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (!lightbox.hidden) closeLightbox(); else if (!modal.hidden) closeModal(); return; }
  if (e.key !== 'Tab' || modal.hidden) return;
  if (!lightbox.hidden) { e.preventDefault(); $('#lbClose').focus(); return; }
  const f = $$('button, a[href]', $('.project-modal')).filter(x => x.offsetParent !== null);
  if (!f.length) return;
  const a = f[0], z = f[f.length - 1];
  if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
  else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
});

/* ===== ฟอร์มติดต่อ: เปิดแอปอีเมลพร้อมข้อความ (ปุ่มส่งเปิดใช้เมื่อกรอกครบ) ===== */
(function contactForm() {
  const form = $('#contactForm'), btn = $('#sendBtn'), to = $('a[href^="mailto:"]').getAttribute('href').replace('mailto:', '');
  const check = () => { btn.disabled = !form.checkValidity(); };
  form.addEventListener('input', check); check();
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#fName').value.trim(), mail = $('#fEmail').value.trim(), msg = $('#fMsg').value.trim();
    const subject = L(`ติดต่อจากเว็บ Portfolio – ${name}`, `Message from your portfolio – ${name}`);
    location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${msg}\n\n— ${name} (${mail})`)}`;
  });
})();

/* ===== สลับภาษา: ข้อความไทยอยู่ใน HTML, อังกฤษอยู่ใน data-en (ช่องกรอกใช้ data-en-ph) ===== */
const metaDesc = $('meta[name="description"]'), TH_DESC = metaDesc.content;
const EN_DESC = 'Portfolio of Achita Thawontash — a Computer Technology student interested in programming, web development and IoT.';
const NAV_TH = { about: 'About', resume: 'Resume', portfolio: 'Portfolio', contact: 'Contact' };
function applyLang(l) {
  lang = l === 'en' ? 'en' : 'th';
  try { localStorage.setItem('lang', lang); } catch (e) {}
  root.lang = lang;
  $$('[data-en]').forEach(el => {
    if (el.dataset.th === undefined) el.dataset.th = el.innerHTML;
    el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.th;
  });
  $$('[data-en-ph]').forEach(el => {
    if (el.dataset.thPh === undefined) el.dataset.thPh = el.placeholder;
    el.placeholder = lang === 'en' ? el.dataset.enPh : el.dataset.thPh;
  });
  $$('[data-aria-en]').forEach(el => {
    if (el.dataset.ariaTh === undefined) el.dataset.ariaTh = el.getAttribute('aria-label');
    el.setAttribute('aria-label', lang === 'en' ? el.dataset.ariaEn : el.dataset.ariaTh);
  });
  const lb = $('#langBtn'); lb.textContent = lang === 'en' ? 'TH' : 'EN'; lb.title = lang === 'en' ? 'ภาษาไทย' : 'English';
  metaDesc.content = lang === 'en' ? EN_DESC : TH_DESC;
  renderProjects(); renderBars(); window.onLang && window.onLang();
  if (current && !modal.hidden) { const i = Math.max(0, $$('.thumb').findIndex(t => t.classList.contains('on'))); openProject(current.id); setMain(i); }
}
$('#langBtn').addEventListener('click', () => applyLang(lang === 'en' ? 'th' : 'en'));
/* ===== ข้อความบทบาทพิมพ์ทีละตัว ===== */
let roleTimer = 0, roleI = 0, roleJ = 0, roleDel = false;
const roles = () => lang === 'en' ? ['Web Developer', 'IoT Builder', 'Python & Machine Learning'] : ['Web Developer', 'IoT Builder', 'Python & Machine Learning'];
function tickRole() {
  const w = roles()[roleI % 3], el = $('#typed');
  roleJ += roleDel ? -1 : 1; el.textContent = w.slice(0, roleJ);
  let d = roleDel ? 40 : 85;
  if (!roleDel && roleJ === w.length) { roleDel = true; d = 1400; }
  else if (roleDel && roleJ === 0) { roleDel = false; roleI++; d = 350; }
  roleTimer = setTimeout(tickRole, d);
}
function startRoles() { clearTimeout(roleTimer); roleTimer = 0; if (fxOff) { $('#typed').textContent = roles()[0]; return; } tickRole(); }
function stopRoles() { clearTimeout(roleTimer); roleTimer = 0; $('#typed').textContent = roles()[0]; }
document.addEventListener('visibilitychange', () => { if (document.hidden) { clearTimeout(roleTimer); roleTimer = 0; } else if (!fxOff && !roleTimer) tickRole(); });

/* ===== แสงตามเคอร์เซอร์ + การ์ดผลงานเอียง 3D (เฉพาะอุปกรณ์ที่มีเมาส์) ===== */
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  const g = $('#glow'); let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  const loop = () => { x += (tx - x) * .14; y += (ty - y) * .14; g.style.transform = `translate(${x}px,${y}px)`; raf = Math.abs(tx - x) + Math.abs(ty - y) > .5 ? requestAnimationFrame(loop) : 0; };
  addEventListener('pointermove', e => { if (fxOff) return; g.classList.add('on'); tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); }, { passive: true });
  document.addEventListener('pointerleave', () => g.classList.remove('on'));
  const grid = $('#projectGrid');
  grid.addEventListener('pointermove', e => {
    const c = e.target.closest('.project-item'); if (!c || fxOff) return;
    const im = c.querySelector('.project-img').getBoundingClientRect(), r = c.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    c.classList.add('tilting');
    c.style.transform = `perspective(900px) rotateX(${-py * 7}deg) rotateY(${px * 9}deg) translateY(-4px)`;
    c.style.setProperty('--mx', (e.clientX - im.left) + 'px'); c.style.setProperty('--my', (e.clientY - im.top) + 'px');
  });
  grid.addEventListener('pointerout', e => { const c = e.target.closest('.project-item'); if (!c || c.contains(e.relatedTarget)) return; c.classList.remove('tilting'); c.style.transform = ''; });
}
$('#fxBtn').addEventListener('click', () => setFx(fxOff, true));

/* ===== toast + คัดลอกอีเมล + บันทึก PDF ===== */
let toastT = 0;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2600); }
async function copyText(txt) {
  try { await navigator.clipboard.writeText(txt); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;opacity:0'; document.body.append(ta); ta.select(); try { document.execCommand('copy'); } catch (_) {} ta.remove(); }
  toast(L('คัดลอกอีเมลแล้ว', 'Email copied'));
}
document.addEventListener('click', e => { const b = e.target.closest('[data-copy]'); if (b) copyText(b.dataset.copy); });
const savePdf = () => { showPage('resume', true); setTimeout(() => print(), 350); };
$('#printBtn').addEventListener('click', () => print());

/* ===== ช่องค้นหา / คำสั่งด่วน (Ctrl+K หรือ /) ===== */
(function palette() {
  const box = $('#cmd'), input = $('#cmdInput'), list = $('#cmdList');
  let items = [], shown = [], act = 0, prev = null;
  const links = $$('.social-link').map(a => [a.getAttribute('aria-label'), a.href]);
  function build() {
    items = [];
    const add = (g, t, k, run) => items.push({ g, t, k: `${t} ${k}`.toLowerCase(), run });
    const pg = L('ไปที่หน้า', 'Go to'), ac = L('คำสั่ง', 'Action');
    [['about', 'เกี่ยวกับฉัน', 'About me'], ['resume', 'เรซูเม่ การศึกษา ทักษะ', 'Resume'], ['portfolio', 'ผลงาน', 'Portfolio'], ['contact', 'ติดต่อ', 'Contact']]
      .forEach(([id, th, en]) => add(pg, L(th.split(' ')[0], en), `${th} ${en} ${id}`, () => showPage(id, true)));
    PROJECTS.forEach(p => add(L('ผลงาน', 'Project'), p.title, `${p.tags.join(' ')} ${p.summary}`, () => { showPage('portfolio', true); openProject(p.id); }));
    add(ac, L('สลับโหมดสว่าง / มืด', 'Toggle light / dark'), 'theme dark light ธีม สว่าง มืด', () => toggleTheme(innerWidth / 2, 0));
    add(ac, L('เปลี่ยนภาษา (English)', 'Switch to Thai (ภาษาไทย)'), 'language english thai ภาษา', () => applyLang(lang === 'en' ? 'th' : 'en'));
    add(ac, L('เปิด/ปิดเอฟเฟกต์', 'Toggle effects'), 'motion animation effects เอฟเฟกต์ แอนิเมชัน', () => setFx(fxOff, true));
    add(ac, L('คัดลอกอีเมล', 'Copy email'), 'email mail copy อีเมล คัดลอก', () => copyText('achitat6@gmail.com'));
    add(ac, L('ดาวน์โหลดเรซูเม่ (PDF)', 'Download resume (PDF)'), 'resume cv pdf download เรซูเม่ ดาวน์โหลด', () => $('#resumeBtn').click());
    add(ac, L('บันทึกเรซูเม่เป็น PDF', 'Save resume as PDF'), 'pdf print resume เรซูเม่ พิมพ์', savePdf);
    links.forEach(([n, u]) => add(L('โซเชียล', 'Social'), n, `${n} social`, () => window.open(u, '_blank', 'noopener')));
  }
  function render() {
    const q = input.value.trim().toLowerCase();
    shown = items.filter(i => !q || q.split(/\s+/).every(w => i.k.includes(w))).slice(0, 12); act = 0;
    list.innerHTML = shown.length ? shown.map((i, n) => `<li role="option" id="cmd${n}" data-n="${n}" aria-selected="${n === 0}"><span>${i.t}</span><small>${i.g}</small></li>`).join('') : `<li class="cmd-empty" role="presentation">${L('ไม่พบผลลัพธ์', 'No results')}</li>`;
    input.setAttribute('aria-activedescendant', shown.length ? 'cmd0' : '');
  }
  function mark(n) {
    $$('[role=option]', list).forEach((el, k) => el.setAttribute('aria-selected', k === n));
    act = n; const el = $('#cmd' + n); if (el) { el.scrollIntoView({ block: 'nearest' }); input.setAttribute('aria-activedescendant', 'cmd' + n); }
  }
  function open() { prev = document.activeElement; build(); input.value = ''; render(); box.hidden = false; document.body.classList.add('lock'); setInert(true); input.focus(); }
  function close() { box.hidden = true; document.body.classList.remove('lock'); setInert(false); if (prev && prev.focus) prev.focus(); }
  function run(n) { const it = shown[n]; if (!it) return; close(); setTimeout(it.run, 30); }
  input.addEventListener('input', render);
  list.addEventListener('click', e => { const li = e.target.closest('[data-n]'); if (li) run(+li.dataset.n); });
  list.addEventListener('pointermove', e => { const li = e.target.closest('[data-n]'); if (li && +li.dataset.n !== act) mark(+li.dataset.n); });
  box.addEventListener('click', e => { if (e.target.closest('[data-cmd-close]')) close(); });
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (shown.length) mark((act + 1) % shown.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (shown.length) mark((act - 1 + shown.length) % shown.length); }
    else if (e.key === 'Enter') { e.preventDefault(); run(act); }
    else if (e.key === 'Tab') e.preventDefault();
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); box.hidden ? (modal.hidden && open()) : close(); }
    else if (e.key === 'Escape' && !box.hidden) { e.stopPropagation(); close(); }
    else if (e.key === '/' && box.hidden && modal.hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
  }, true);
  $('#cmdBtn').addEventListener('click', open);
})();

/* ===== ปัดซ้าย/ขวาเพื่อสลับหน้า (มือถือ/แท็บเล็ต) ===== */
(function swipe() {
  let x0 = 0, y0 = 0, t0 = 0;
  const order = navs.map(n => n.dataset.nav), cur = () => pages.find(p => !p.hidden).dataset.page;
  document.addEventListener('touchstart', e => { const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; t0 = Date.now(); }, { passive: true });
  document.addEventListener('touchend', e => {
    if (!modal.hidden || !$('#cmd').hidden || (e.target.closest && e.target.closest('input,textarea,.marquee,.thumbs'))) return;
    const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
    if (Date.now() - t0 > 600 || Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 2) return;
    const i = order.indexOf(cur()) + (dx < 0 ? 1 : -1);
    if (i >= 0 && i < order.length) showPage(order[i], true);
  }, { passive: true });
})();

/* ===== ลูกเล่นชุดที่ 2 ===== */
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
// 1) ชื่อถอดรหัสทีละตัวอักษร (ตอนเปิดเว็บ + ตอนเอาเมาส์ชี้/แตะ)
(function scramble() {
  const el = $('#nameEl'), txt = el.dataset.text, chars = '01<>/{}#$%&*+=?';
  let busy = false;
  function run() {
    if (fxOff || busy) return; busy = true;
    const t0 = performance.now(), dur = 900;
    (function step(t) {
      const k = Math.min((t - t0) / dur, 1), n = Math.floor(k * txt.length);
      el.textContent = txt.split('').map((c, i) => c === ' ' || i < n ? c : chars[Math.random() * chars.length | 0]).join('');
      if (k < 1) requestAnimationFrame(step); else { el.textContent = txt; busy = false; }
    })(t0);
  }
  el.addEventListener('pointerenter', run); el.addEventListener('click', run);
  setTimeout(run, 500);
})();

// 2) ประกายกระจายเมื่อกดปุ่ม/ลิงก์
const COLORS = ['var(--ac)', 'var(--ac2)', '#fff'];
function sparkBurst(x, y, n = 10) {
  for (let i = 0; i < n; i++) {
    const d = document.createElement('i'), a = Math.PI * 2 * i / n + Math.random() * .5, r = 26 + Math.random() * 38;
    d.className = 'spark';
    d.style.cssText = `--x:${x - 4}px;--y:${y - 4}px;--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r}px;--c:${COLORS[i % 3]}`;
    document.body.append(d); d.addEventListener('animationend', () => d.remove());
  }
}
document.addEventListener('pointerdown', e => {
  if (fxOff || !e.target.closest) return;
  if (e.target.closest('button,a,.project-item,.cmd-list li')) sparkBurst(e.clientX, e.clientY);
}, { passive: true });

// 3) ปุ่มเล็ก ๆ ถูกดูดเข้าหาเมาส์ (เฉพาะเครื่องที่มีเมาส์)
if (fine) {
  document.addEventListener('pointermove', e => {
    if (fxOff || !e.target.closest) return;
    const b = e.target.closest('.tool-btn,.social-link,.filter-list button,.print-btn');
    $$('.magnet').forEach(m => { if (m !== b) { m.style.transform = ''; m.classList.remove('magnet'); } });
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.classList.add('magnet');
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .22}px)`;
  }, { passive: true });
}

// 4) ซ่อนรหัสลับ: กด ↑ ↑ ↓ ↓ ← → ← → B A
(function konami() {
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']; let i = 0;
  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    i = k === seq[i] ? i + 1 : (k === seq[0] ? 1 : 0);
    if (i < seq.length) return; i = 0;
    toast(L('ปลดล็อกโหมดลับแล้ว! 🎉', 'Secret mode unlocked! 🎉'));
    if (fxOff) return;
    const cols = ['#5eead4', '#a78bfa', '#f472b6', '#fbbf24', '#60a5fa'];
    for (let n = 0; n < 48; n++) {
      const d = document.createElement('i'); d.className = 'fall';
      d.style.cssText = `left:${Math.random() * 100}vw;--c:${cols[n % 5]};--t:${1.8 + Math.random() * 1.6}s;--dx:${(Math.random() - .5) * 160}px;--r:${Math.random() * 900 - 450}deg;animation-delay:${Math.random() * .8}s`;
      document.body.append(d); d.addEventListener('animationend', () => d.remove());
    }
    root.style.setProperty('--ac', '#f472b6'); root.style.setProperty('--ac2', '#fbbf24');
    setTimeout(() => { root.style.removeProperty('--ac'); root.style.removeProperty('--ac2'); }, 6000);
  });
})();

// 5) ชื่อแท็บเปลี่ยนเมื่อสลับไปหน้าอื่น
(function tabTitle() {
  const orig = document.title;
  document.addEventListener('visibilitychange', () => { document.title = document.hidden ? L('กลับมาดูผลงานกันก่อนนะ', 'Come back and see my work!') : orig; });
})();

/* ===== ลูกเล่นชุดที่ 3 ===== */
// 1) แถบความคืบหน้าการเลื่อน + ปุ่มกลับขึ้นบน (วงแหวนวิ่งตามตำแหน่ง)
(function progress() {
  const bar = $('#progBar'), top = $('#toTop'); let tick = false;
  function upd() {
    tick = false;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight), k = Math.min(1, scrollY / max);
    bar.style.transform = `scaleX(${k})`;
    top.style.setProperty('--off', (119.4 * (1 - k)).toFixed(1));
    top.classList.toggle('show', scrollY > 400);
  }
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  addEventListener('resize', upd);
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion || fxOff ? 'auto' : 'smooth' }));
  window.addEventListener('pagechange', upd); upd();
})();

// 2) นาฬิกา + คำทักทายตามช่วงเวลา
(function clock() {
  const el = $('#clock');
  function render() {
    const d = new Date(), h = d.getHours(), hm = String(h).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    const g = h >= 5 && h < 12 ? L('สวัสดีตอนเช้า', 'Good morning') : h < 17 && h >= 12 ? L('สวัสดีตอนบ่าย', 'Good afternoon') : h >= 17 && h < 20 ? L('สวัสดีตอนเย็น', 'Good evening') : L('ราตรีสวัสดิ์', 'Good night');
    el.innerHTML = `${g} · <b>${hm}</b>`;
  }
  render(); setInterval(render, 20000); window.renderClock = render;
})();

// 3) เทอร์มินัลสรุปข้อมูล (พิมพ์ทีละบรรทัด; ใช้ข้อมูลจริง)
(function terminal() {
  const body = $('#termBody'); let token = 0;
  const lines = () => [
    ['whoami', 'achita-thawontash'],
    ['cat school.txt', L('วิทยาลัยเทคนิคลพบุรี · ปวส. ปี 2 · เทคโนโลยีคอมพิวเตอร์', 'Lopburi Technical College · Pvs. Year 2 · Computer Technology')],
    ['ls interests/', 'programming/  web/  iot/  machine-learning/'],
    ['ls projects/ | wc -l', String(PROJECTS.length)],
    ['echo $LOOKING_FOR', L('ที่ฝึกงานด้านไอที พัฒนาโปรแกรม และ IoT', 'internship in IT, software development and IoT')]
  ];
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const row = (c, o, caret) => `<span class="p">$</span> <span class="c">${esc(c)}</span>${caret ? '<i class="caret"></i>' : ''}\n${o != null ? `<span class="o">${esc(o)}</span>\n` : ''}`;
  function renderStatic() { body.innerHTML = lines().map(([c, o]) => row(c, o)).join(''); }
  function run() {
    const my = ++token; renderStatic();
    if (fxOff) return;
    const data = lines(); let html = '', i = 0;
    body.innerHTML = '';
    (function nextLine() {
      if (my !== token) return;
      if (i >= data.length) { body.innerHTML = html + `<span class="p">$</span> <i class="caret"></i>`; return; }
      const [c, o] = data[i]; let j = 0;
      (function type() {
        if (my !== token) return;
        body.innerHTML = html + row(c.slice(0, ++j), null, true);
        if (j < c.length) setTimeout(type, 38);
        else setTimeout(() => { html += row(c, o); body.innerHTML = html; i++; setTimeout(nextLine, 260); }, 220);
      })();
    })();
  }
  window.runTerm = run;
  const prevOnLang = window.onLang;
  window.onLang = () => { prevOnLang && prevOnLang(); window.renderClock && window.renderClock(); renderStatic(); };
  renderStatic();
})();

// 4) เมนู: กดเลข 1–4 เพื่อสลับหน้า
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
  if (!modal.hidden || !$('#cmd').hidden) return;
  const i = '1234'.indexOf(e.key);
  if (i > -1 && navs[i]) showPage(navs[i].dataset.nav, true);
});

// 5) อวตาร์: กดแล้วหมุน + ประกาย
(function avatar() {
  const box = $('.avatar-box');
  box.addEventListener('click', () => {
    if (fxOff) return;
    box.classList.remove('spin'); void box.offsetWidth; box.classList.add('spin');
    const r = box.getBoundingClientRect(); sparkBurst(r.left + r.width / 2, r.top + r.height / 2, 14);
  });
  box.addEventListener('animationend', e => { if (e.animationName === 'flip') box.classList.remove('spin'); });
})();

// 6) การ์ด (สถิติ / บริการ / ทักษะ) เอียงตามเมาส์ + วงแหวนเคอร์เซอร์ + หางประกาย (เฉพาะเครื่องที่มีเมาส์)
if (fine) {
  const TILT = '.stat,.service-item,.skill-groups>li,.skills-list,.content-card';
  $$(TILT).forEach(el => el.classList.add('tilt-card'));
  document.addEventListener('pointermove', e => {
    if (fxOff || !e.target.closest) return;
    const c = e.target.closest('.tilt-card'); if (!c) return;
    const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    c.classList.add('tilting');
    c.style.transform = `perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-3px)`;
  }, { passive: true });
  document.addEventListener('pointerout', e => {
    const c = e.target.closest && e.target.closest('.tilt-card'); if (!c || c.contains(e.relatedTarget)) return;
    c.classList.remove('tilting'); c.style.transform = '';
  });
  const ring = $('#ring'); let rx = 0, ry = 0, rtx = 0, rty = 0, rraf = 0, lastT = 0;
  const loop = () => { rx += (rtx - rx) * .2; ry += (rty - ry) * .2; ring.style.transform = `translate(${rx}px,${ry}px)`; rraf = Math.abs(rtx - rx) + Math.abs(rty - ry) > .4 ? requestAnimationFrame(loop) : 0; };
  addEventListener('pointermove', e => {
    if (fxOff) return;
    rtx = e.clientX; rty = e.clientY; ring.classList.add('on'); if (!rraf) rraf = requestAnimationFrame(loop);
    ring.classList.toggle('hot', !!(e.target.closest && e.target.closest('button,a,.project-item,input,textarea,.cmd-list li')));
    const n = performance.now();
    if (n - lastT > 55) {
      lastT = n; const d = document.createElement('i'); d.className = 'trail';
      d.style.cssText = `--x:${e.clientX}px;--y:${e.clientY}px;--c:${COLORS[(n / 55 | 0) % 2]}`;
      document.body.append(d); d.addEventListener('animationend', () => d.remove());
    }
  }, { passive: true });
  document.addEventListener('pointerleave', () => ring.classList.remove('on'));
}

applyLang(lang);
showPage(location.hash.slice(1));
setFx(!fxOff, false);
