/* ═══════════════════════════════════════════════════════════════
   STRAND Shell — renders shared chrome from window.STRAND_PERSON
   Vanilla JS only. No external frameworks.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

const FAMILY = [
  { id: 'quinn',    name: 'Quinn',    role: 'Proband',       age: 17, page: 'quinn.html' },
  { id: 'chad',     name: 'Chad',     role: 'Father',        age: 51, page: 'chad-brainmap.html' },
  { id: 'brigitte', name: 'Brigitte', role: 'Mother',        age: 48, page: 'brigitte.html' },
  { id: 'brother',  name: 'Brother',  role: 'Sibling',       age: 21, page: 'brother.html' },
  { id: 'peggy',    name: 'Peggy',    role: 'Maternal Aunt', age: 76, page: 'peggy.html' }
];

/* ── User genome pill (additive — shown only when localStorage has data) ── */
function getUserGenomePillData() {
  const raw = localStorage.getItem('strand-user-person');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && parsed.id
      ? { id: parsed.id, name: parsed.name || 'You', role: 'You', page: 'you.html' }
      : null;
  } catch (_e) {
    return null;
  }
}

const SECTIONS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'actions',   label: 'Health Actions' },
  { id: 'ancestry',  label: 'Ancestry' },
  { id: 'family',    label: 'Family Tree' },
  { id: 'clinical',  label: 'Clinical Brief' }
];

/* ── State (immutable pattern) ────────────────────────────────── */
let _state = { activeSection: 'overview' };

function setState(patch) {
  _state = Object.assign({}, _state, patch);
}

/* ── Utilities ────────────────────────────────────────────────── */
function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') node.className = v;
      else if (k === 'onclick') node.onclick = v;
      else if (k === 'textContent') node.textContent = v;
      else node.setAttribute(k, v);
    });
  }
  if (children) {
    if (typeof children === 'string') {
      node.innerHTML = children;
    } else if (Array.isArray(children)) {
      children.filter(Boolean).forEach(c => node.appendChild(c));
    }
  }
  return node;
}

function currentPerson() {
  return window.STRAND_PERSON || {};
}

/* ── Mobile drawer ────────────────────────────────────────────── */
function buildDrawerPills(person) {
  const userData = getUserGenomePillData();
  const pillsWrap = el('div', { className: 'drawer-pills' });

  FAMILY.forEach(member => {
    const isActive = member.id === person.id;
    const pill = el('button', {
      className: 'family-pill' + (isActive ? ' active' : ''),
      'aria-label': member.name + ' — ' + member.role
    }, member.name);
    pill.onclick = () => {
      if (!isActive) { closeDrawer(); window.location.href = member.page; }
    };
    pillsWrap.appendChild(pill);
  });

  if (userData) {
    const isActive = person.id === userData.id;
    const userPill = el('button', {
      className: 'family-pill' + (isActive ? ' active' : ''),
      'aria-label': 'Your Genome'
    }, userData.name || 'You');
    userPill.onclick = () => {
      if (!isActive) { closeDrawer(); window.location.href = userData.page; }
    };
    pillsWrap.appendChild(userPill);
  } else if (person.id !== 'you') {
    const loadPill = el('a', {
      className: 'family-pill',
      href: 'onboard.html',
      'aria-label': 'Load your own genome'
    }, '+ Load Yours');
    pillsWrap.appendChild(loadPill);
  }

  return pillsWrap;
}

function ensureDrawer(person) {
  if (document.getElementById('strand-mobile-drawer')) return;

  const overlay = el('div', {
    id: 'strand-drawer-overlay',
    'aria-hidden': 'true'
  });
  overlay.onclick = closeDrawer;

  const drawer = el('div', {
    id: 'strand-mobile-drawer',
    role: 'dialog',
    'aria-label': 'Navigation',
    'aria-hidden': 'true'
  });

  const drawerHeader = el('div', { className: 'drawer-header' });
  const drawerTitle = el('div', { className: 'drawer-title' }, 'Navigation');
  const closeBtn = el('button', {
    className: 'drawer-close',
    'aria-label': 'Close navigation'
  }, '&times;');
  closeBtn.onclick = closeDrawer;
  drawerHeader.appendChild(drawerTitle);
  drawerHeader.appendChild(closeBtn);
  drawer.appendChild(drawerHeader);

  /* Family section */
  const familyLabel = el('div', { className: 'drawer-section-label' }, 'Family');
  drawer.appendChild(familyLabel);
  drawer.appendChild(buildDrawerPills(person));

  /* Section tabs */
  const navLabel = el('div', { className: 'drawer-section-label' }, 'Sections');
  drawer.appendChild(navLabel);

  const tabsWrap = el('div', { className: 'drawer-tabs' });
  SECTIONS.forEach(sec => {
    const isActive = _state.activeSection === sec.id;
    const tab = el('button', {
      className: 'drawer-tab' + (isActive ? ' active' : ''),
      'data-section': sec.id
    }, sec.label);
    tab.onclick = () => { closeDrawer(); activateSection(sec.id); };
    tabsWrap.appendChild(tab);
  });
  drawer.appendChild(tabsWrap);

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
}

function openDrawer() {
  const drawer = document.getElementById('strand-mobile-drawer');
  const overlay = document.getElementById('strand-drawer-overlay');
  const burger = document.getElementById('strand-burger');
  if (!drawer) return;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  if (overlay) { overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden', 'false'); }
  document.body.classList.add('scroll-lock');
  if (burger) burger.setAttribute('aria-expanded', 'true');

  /* Sync active states */
  drawer.querySelectorAll('.drawer-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.section === _state.activeSection);
  });
}

function closeDrawer() {
  const drawer = document.getElementById('strand-mobile-drawer');
  const overlay = document.getElementById('strand-drawer-overlay');
  const burger = document.getElementById('strand-burger');
  if (!drawer) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  if (overlay) { overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true'); }
  document.body.classList.remove('scroll-lock');
  if (burger) burger.setAttribute('aria-expanded', 'false');
}

function toggleDrawer() {
  const drawer = document.getElementById('strand-mobile-drawer');
  if (drawer && drawer.classList.contains('is-open')) {
    closeDrawer();
  } else {
    openDrawer();
  }
}

/* ── Topbar ───────────────────────────────────────────────────── */
function renderTopbar() {
  const person = currentPerson();
  const bar = document.getElementById('strand-topbar');
  if (!bar) return;

  bar.innerHTML = '';

  const brand = el('div', { className: 'topbar-brand' }, '<span>STRAND</span>');
  bar.appendChild(brand);

  const pillsWrap = el('div', { className: 'topbar-pills' });

  /* Existing family members */
  FAMILY.forEach(member => {
    const isActive = member.id === person.id;
    const pill = el('button', {
      className: 'family-pill' + (isActive ? ' active' : ''),
      'aria-label': member.name + ' — ' + member.role
    }, member.name);
    pill.onclick = () => {
      if (!isActive) window.location.href = member.page;
    };
    pillsWrap.appendChild(pill);
  });

  /* User genome pill — shown when localStorage has data, or as "+ Load Yours" CTA */
  const userData = getUserGenomePillData();
  if (userData) {
    const isActive = person.id === userData.id;
    const userPill = el('button', {
      className: 'family-pill' + (isActive ? ' active' : ''),
      'aria-label': 'Your Genome'
    }, userData.name || 'You');
    userPill.onclick = () => {
      if (!isActive) window.location.href = userData.page;
    };
    pillsWrap.appendChild(userPill);
  } else if (person.id !== 'you') {
    /* Only show the CTA when not on the you.html page itself */
    const loadPill = el('a', {
      className: 'family-pill',
      href: 'onboard.html',
      'aria-label': 'Load your own genome'
    }, '+ Load Yours');
    pillsWrap.appendChild(loadPill);
  }

  bar.appendChild(pillsWrap);

  const tabsWrap = el('div', { className: 'topbar-tabs' });
  SECTIONS.forEach(sec => {
    const isActive = _state.activeSection === sec.id;
    const tab = el('button', {
      className: 'section-tab' + (isActive ? ' active' : ''),
      'data-section': sec.id
    }, sec.label);
    tab.onclick = () => activateSection(sec.id);
    tabsWrap.appendChild(tab);
  });
  bar.appendChild(tabsWrap);

  /* Burger button — visible only at <=480px via CSS */
  const burger = el('button', {
    id: 'strand-burger',
    className: 'topbar-burger',
    'aria-label': 'Open navigation menu',
    'aria-expanded': 'false',
    'aria-controls': 'strand-mobile-drawer'
  });
  burger.innerHTML = `
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
  `;
  burger.onclick = () => { ensureDrawer(person); toggleDrawer(); };
  bar.appendChild(burger);

  /* Keyboard: close drawer on Escape (attach once at shell init, not per render) */
}

/* ── Side Rail ────────────────────────────────────────────────── */
function renderRail() {
  const person = currentPerson();
  const rail = document.getElementById('strand-rail');
  if (!rail) return;

  rail.innerHTML = '';

  /* Identity card */
  const identity = el('div', { className: 'rail-identity' });
  identity.innerHTML = `
    <div class="rail-name">${person.fullName || person.name || 'Unknown'}</div>
    <div class="rail-role">${person.role || ''}</div>
    <div class="rail-meta">${[person.age ? 'Age ' + person.age : null, person.location].filter(Boolean).join(' · ')}</div>
  `;
  if (person.badges && person.badges.length) {
    const badgesWrap = el('div', { className: 'rail-badges' });
    person.badges.forEach(b => {
      const badge = el('span', { className: 'badge' }, b);
      badgesWrap.appendChild(badge);
    });
    identity.appendChild(badgesWrap);
  }
  rail.appendChild(identity);

  /* Navigation */
  const nav = el('nav', { className: 'rail-nav', 'aria-label': 'Dashboard sections' });
  SECTIONS.forEach(sec => {
    const btn = el('button', {
      className: 'rail-nav-item' + (_state.activeSection === sec.id ? ' active' : ''),
      'data-section': sec.id
    }, sec.label);
    btn.onclick = () => activateSection(sec.id);
    nav.appendChild(btn);
  });
  rail.appendChild(nav);

  /* Family quick links */
  const familyWrap = el('div', { className: 'rail-family' });
  const familyTitle = el('div', { className: 'rail-family-title' }, 'Family');
  familyWrap.appendChild(familyTitle);

  FAMILY.forEach(member => {
    const isCurrent = member.id === person.id;
    const link = el('button', {
      className: 'rail-family-link' + (isCurrent ? ' current' : '')
    });
    const dot = el('span', { className: 'rail-family-dot' });
    const nameSpan = el('span', {}, member.name);
    const roleSpan = el('span', { className: 'rail-meta' }, ' — ' + member.role);
    link.appendChild(dot);
    link.appendChild(nameSpan);
    link.appendChild(roleSpan);
    if (!isCurrent) {
      link.onclick = () => { window.location.href = member.page; };
    }
    familyWrap.appendChild(link);
  });

  /* User genome link in rail */
  const userData = getUserGenomePillData();
  if (userData) {
    const isCurrent = person.id === userData.id;
    const userLink = el('button', {
      className: 'rail-family-link' + (isCurrent ? ' current' : '')
    });
    const dot = el('span', { className: 'rail-family-dot' });
    const nameSpan = el('span', {}, userData.name || 'You');
    const roleSpan = el('span', { className: 'rail-meta' }, ' — Your Genome');
    userLink.appendChild(dot);
    userLink.appendChild(nameSpan);
    userLink.appendChild(roleSpan);
    if (!isCurrent) {
      userLink.onclick = () => { window.location.href = userData.page; };
    }
    familyWrap.appendChild(userLink);
  } else {
    const addLink = el('a', {
      className: 'rail-family-link',
      href: 'onboard.html'
    });
    const dot = el('span', { className: 'rail-family-dot' });
    const nameSpan = el('span', {}, '+ Load Your Genome');
    addLink.appendChild(dot);
    addLink.appendChild(nameSpan);
    familyWrap.appendChild(addLink);
  }

  rail.appendChild(familyWrap);
}

/* ── Family Rail (bottom) ─────────────────────────────────────── */
function renderFamilyRail() {
  const person = currentPerson();
  const rail = document.getElementById('strand-family-rail');
  if (!rail) return;

  rail.innerHTML = '';
  const inner = el('div', { className: 'family-rail-inner' });

  FAMILY.forEach(member => {
    const isCurrent = member.id === person.id;
    const tile = el('a', {
      className: 'family-tile' + (isCurrent ? ' current' : ''),
      href: member.page
    });
    tile.innerHTML = `
      <div class="family-tile-name">${member.name}</div>
      <div class="family-tile-role">${member.role}</div>
    `;
    if (isCurrent) tile.onclick = e => e.preventDefault();
    inner.appendChild(tile);
  });

  /* User genome tile */
  const userData = getUserGenomePillData();
  if (userData) {
    const isCurrent = person.id === userData.id;
    const tile = el('a', {
      className: 'family-tile' + (isCurrent ? ' current' : ''),
      href: userData.page
    });
    tile.innerHTML = `
      <div class="family-tile-name">${userData.name || 'You'}</div>
      <div class="family-tile-role">Your Genome</div>
    `;
    if (isCurrent) tile.onclick = e => e.preventDefault();
    inner.appendChild(tile);
  } else {
    const tile = el('a', { className: 'family-tile', href: 'onboard.html' });
    tile.innerHTML = `
      <div class="family-tile-name">+ Add Yours</div>
      <div class="family-tile-role">Upload Genome</div>
    `;
    inner.appendChild(tile);
  }

  rail.appendChild(inner);
}

/* ── Footer ───────────────────────────────────────────────────── */
function renderFooter() {
  const footer = document.getElementById('strand-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-copy">
      <span>STRAND</span> · Byars Family Genomic Intelligence · ${new Date().getFullYear()}
    </div>
    <div class="footer-links">
      <a href="index.html">Family Hub</a>
    </div>
  `;
}

/* ── Section switching ────────────────────────────────────────── */
function activateSection(sectionId) {
  setState({ activeSection: sectionId });

  /* Hide/show content sections */
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.toggle('active', sec.id === 'section-' + sectionId);
  });

  /* Update topbar tabs */
  document.querySelectorAll('.section-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.section === sectionId);
  });

  /* Update rail nav */
  document.querySelectorAll('.rail-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });

  /* Trigger section-specific inits */
  if (sectionId === 'family' && window.STRAND_FAMILY_TREE && window.STRAND_FAMILY_TREE.init) {
    var familyContainer = document.getElementById('section-family');
    if (familyContainer) {
      window.STRAND_FAMILY_TREE.init(familyContainer, window.STRAND_PERSON);
    }
  }

  window.scrollTo(0, 0);
}

/* ── Loader ───────────────────────────────────────────────────── */
function runLoader() {
  const loader = document.getElementById('strand-loader');
  if (!loader) return;

  const countEl = loader.querySelector('.loader-count');
  const target = 631455;
  let current = 0;

  function step() {
    current = Math.min(target, current + Math.floor(Math.random() * 42000) + 18000);
    if (countEl) countEl.textContent = current.toLocaleString();
    if (current < target) {
      requestAnimationFrame(step);
    } else {
      if (countEl) countEl.textContent = '631,455';
      setTimeout(() => {
        loader.classList.add('done');
      }, 400);
    }
  }

  setTimeout(step, 200);
}

/* ── Initialize loader HTML if empty ─────────────────────────── */
function initLoader() {
  const loader = document.getElementById('strand-loader');
  if (!loader || loader.children.length > 0) return;
  loader.innerHTML = `
    <svg class="loader-dna" viewBox="0 0 60 120">
      <path class="dna-strand dna-s1" d="M15,10 Q45,30 15,50 Q45,70 15,90 Q45,110 15,120"/>
      <path class="dna-strand dna-s2" d="M45,10 Q15,30 45,50 Q15,70 45,90 Q15,110 45,120"/>
      <line class="dna-rung" x1="22" y1="20" x2="38" y2="20" style="animation-delay:.1s"/>
      <line class="dna-rung" x1="28" y1="35" x2="32" y2="35" style="animation-delay:.3s"/>
      <line class="dna-rung" x1="22" y1="50" x2="38" y2="50" style="animation-delay:.5s"/>
      <line class="dna-rung" x1="28" y1="65" x2="32" y2="65" style="animation-delay:.7s"/>
      <line class="dna-rung" x1="22" y1="80" x2="38" y2="80" style="animation-delay:.9s"/>
      <line class="dna-rung" x1="28" y1="95" x2="32" y2="95" style="animation-delay:1.1s"/>
    </svg>
    <div class="loader-label">Loading clinical data</div>
    <div class="loader-count">0</div>
  `;
}

/* ── Scaffold body structure ──────────────────────────────────── */
function buildShellStructure() {
  /* Ensure strand-body wrapper exists inside strand-shell */
  const shell = document.getElementById('strand-shell');
  if (!shell) return;

  /* Build topbar if not present */
  if (!document.getElementById('strand-topbar')) {
    const topbar = el('header', { id: 'strand-topbar', 'aria-label': 'STRAND navigation' });
    document.body.insertBefore(topbar, shell);
  }

  /* Build body container */
  let body = document.getElementById('strand-body');
  if (!body) {
    body = el('div', { id: 'strand-body' });
    shell.appendChild(body);
  }

  /* Build side rail */
  if (!document.getElementById('strand-rail')) {
    const rail = el('nav', { id: 'strand-rail', 'aria-label': 'Patient navigation' });
    body.appendChild(rail);
  }

  /* Move strand-main into body if it exists but is outside body */
  const main = document.getElementById('strand-main');
  if (main && main.parentElement !== body) {
    body.appendChild(main);
  }

  /* Build family rail */
  if (!document.getElementById('strand-family-rail')) {
    const familyRail = el('section', { id: 'strand-family-rail', 'aria-label': 'Family members' });
    document.body.appendChild(familyRail);
  }

  /* Build footer */
  if (!document.getElementById('strand-footer')) {
    const footer = el('footer', { id: 'strand-footer', 'aria-label': 'Site footer' });
    document.body.appendChild(footer);
  }
}

/* ── Main init ────────────────────────────────────────────────── */
function initShell() {
  /* Escape closes drawer — attached once here, not per topbar render */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
  initLoader();
  buildShellStructure();
  renderTopbar();
  renderRail();
  renderFamilyRail();
  renderFooter();

  /* Activate default section */
  activateSection('overview');

  /* Run loader */
  runLoader();
}

document.addEventListener('DOMContentLoaded', initShell);
