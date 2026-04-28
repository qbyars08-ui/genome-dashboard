/* ═══════════════════════════════════════════════════════════════
   STRAND App — renders per-person dashboard content
   Reads from window.STRAND_PERSON. Vanilla JS + D3 v7 only.
   All renders are idempotent. Immutable state patterns throughout.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Color accent map (dark theme — desaturated for legibility) ── */
const ACCENT_COLORS = {
  red:    '#E07875',
  purple: '#B59FD6',
  orange: '#DDA065',
  amber:  '#E5B985',
  green:  '#9BCFAB',
  blue:   '#94A3D9',
  gold:   '#E4B273',  // brand accent — warm amber
  cyan:   '#92BFC8'
};

/* ── State ────────────────────────────────────────────────────── */
let _appState = {
  expandedCat: null
};

function setAppState(patch) {
  _appState = Object.assign({}, _appState, patch);
}

/* ── Utilities ────────────────────────────────────────────────── */
function getPerson() {
  return window.STRAND_PERSON || {};
}

function getData() {
  return getPerson().data || {};
}

function safeGet(obj, path, fallback) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj) ?? fallback;
}

function uid() {
  return 'id-' + Math.random().toString(36).slice(2, 9);
}

/* ── SVG Gauge ────────────────────────────────────────────────── */
function buildGaugeSVG(score, hexColor, size) {
  const sz = size || 80;
  const r = sz / 2 - 10;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(score || 0, 0), 100) / 100;
  const avg = 0.5;
  const gaugeId = uid();

  return `<svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}"
    role="meter" aria-valuenow="${score}" aria-valuemin="0" aria-valuemax="100"
    aria-label="Risk score ${score}">
    <circle class="gauge-track" cx="${sz/2}" cy="${sz/2}" r="${r}"/>
    <circle class="gauge-avg" cx="${sz/2}" cy="${sz/2}" r="${r}"
      stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - avg)}"
      transform="rotate(-90 ${sz/2} ${sz/2})"/>
    <circle class="gauge-arc" id="${gaugeId}"
      cx="${sz/2}" cy="${sz/2}" r="${r}"
      stroke="${hexColor}" stroke-width="5" fill="none" stroke-linecap="round"
      stroke-dasharray="${circ}" stroke-dashoffset="${circ}"
      transform="rotate(-90 ${sz/2} ${sz/2})"/>
    <text x="${sz/2}" y="${sz/2 + 1}" text-anchor="middle"
      class="gauge-val" style="font-family:var(--mono)">${score}</text>
    <text x="${sz/2}" y="${sz/2 + 12}" text-anchor="middle"
      class="gauge-lbl">score</text>
    <animate xlink:href="#${gaugeId}" attributeName="stroke-dashoffset"
      from="${circ}" to="${circ * (1 - pct)}"
      dur="0.9s" fill="freeze" calcMode="spline"
      keySplines="0.4 0 0.2 1" begin="0.1s"/>
  </svg>`;
}

/* ── Alert Banner ─────────────────────────────────────────────── */
function renderAlertBanner(container, alert) {
  if (!alert) return;
  const chips = (alert.chips || [])
    .map(c => `<span class="alert-chip">${c}</span>`)
    .join('');

  container.innerHTML += `
    <div class="alert-banner" role="alert" aria-live="polite">
      <div class="alert-banner-header">
        <div class="alert-banner-dot" aria-hidden="true"></div>
        <div class="alert-banner-title">${alert.title || 'Active Alert'}</div>
      </div>
      <div class="alert-banner-headline">${alert.headline || ''}</div>
      <div class="alert-chips">${chips}</div>
    </div>
  `;
}

/* ── Vital Stat Cards ─────────────────────────────────────────── */
function renderVitalStats(container, vitals) {
  if (!vitals || !vitals.length) return;
  const cards = vitals.map(v => `
    <div class="stat-card accent-${v.accent || 'gold'}">
      <div class="stat-label">${v.label}</div>
      <div class="stat-value mono">${v.value}</div>
      <div class="stat-sub">${v.sub || ''}</div>
    </div>
  `).join('');

  container.innerHTML += `
    <div class="stat-grid" role="list" aria-label="Key vital statistics">
      ${cards}
    </div>
  `;
}

/* ── Finding card HTML ────────────────────────────────────────── */
function findingCardHTML(finding) {
  const colorClass = finding.c || 'f-blue';
  const fid = uid();
  const hasDetail = Boolean(finding.d);

  return `
    <div class="finding-card ${colorClass}"
      role="button" tabindex="0"
      aria-expanded="false"
      aria-label="${(finding.n || 'Finding').replace(/"/g, '&quot;')} — click to expand"
      onclick="this.classList.toggle('open');this.setAttribute('aria-expanded',this.classList.contains('open'))">
      <div class="finding-top">
        <div class="finding-gene">${finding.g || ''}</div>
      </div>
      <h4 class="finding-name">${finding.n || ''}</h4>
      <div class="finding-line">${finding.l || ''}</div>
      ${hasDetail ? `<div class="finding-detail" id="${fid}">${finding.d}</div>` : ''}
    </div>
  `;
}

/* ── Risk Category Cards ──────────────────────────────────────── */
function renderCatGrid(container, data) {
  if (!data || !Object.keys(data).length) return;

  /* Delegate to upgraded renderer if new data fields are present */
  if (window.STRAND_CARDS) {
    const handled = window.STRAND_CARDS.renderUpgradedCatGrid(container, data);
    if (handled) return;
  }

  /* Legacy fallback: gauge-based render for profiles without new fields */
  const catHTML = Object.entries(data).map(([key, cat]) => {
    const hex = ACCENT_COLORS[cat.accent] || ACCENT_COLORS.blue;
    const gaugeHTML = buildGaugeSVG(cat.score || 0, hex, 80);

    const findingsHTML = (cat.findings || []).map(findingCardHTML).join('');
    const deepHTML = (cat.deep && cat.deep.length)
      ? `<div class="sec-header" style="margin-top:10px">
           <h2 class="sec-title" style="font-size:10px">Clinical Detail</h2>
         </div>
         ${cat.deep.map(findingCardHTML).join('')}`
      : '';

    const actionsHTML = (cat.actions && cat.actions.length)
      ? `<div class="cat-actions">
           <div class="cat-actions-title">Recommended Actions</div>
           ${cat.actions.map((a, i) => `
             <div class="cat-action-item">
               <div class="cat-action-num">${i + 1}.</div>
               <div>${a}</div>
             </div>
           `).join('')}
         </div>`
      : '';

    return `
      <div class="cat-card" data-cat="${key}"
        role="button" tabindex="0"
        aria-expanded="false"
        aria-label="${cat.title || key} risk category — click to expand"
        onclick="STRAND_APP.toggleCat(this)">
        <div class="cat-card-header">
          <div>
            <h3 class="cat-title">${cat.title || key}</h3>
            <div class="cat-status">${cat.status || ''}</div>
          </div>
        </div>
        <div class="cat-gauge-wrap" aria-hidden="true">
          ${gaugeHTML}
        </div>
        <div class="cat-expand" aria-hidden="true">
          <div class="findings-list" aria-label="Findings for ${cat.title}">
            ${findingsHTML}
            ${deepHTML}
          </div>
          ${actionsHTML}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML += `
    <div class="sec-header">
      <h2 class="sec-title">Risk Categories</h2>
      <div class="sec-sub">Click a card to expand findings</div>
    </div>
    <div class="cat-grid" role="list" aria-label="Risk category cards">
      ${catHTML}
    </div>
  `;
}

/* ── Toggle category expand ───────────────────────────────────── */
function toggleCat(cardEl) {
  const wasExpanded = cardEl.classList.contains('expanded');

  /* Collapse all */
  document.querySelectorAll('.cat-card.expanded').forEach(c => {
    c.classList.remove('expanded');
    c.setAttribute('aria-expanded', 'false');
    const exp = c.querySelector('.cat-expand');
    if (exp) exp.setAttribute('aria-hidden', 'true');
  });

  /* Expand this one if it was collapsed */
  if (!wasExpanded) {
    cardEl.classList.add('expanded');
    cardEl.setAttribute('aria-expanded', 'true');
    const exp = cardEl.querySelector('.cat-expand');
    if (exp) exp.setAttribute('aria-hidden', 'false');
    setAppState({ expandedCat: cardEl.dataset.cat });
  } else {
    setAppState({ expandedCat: null });
  }
}

/* ── Medications Strip ────────────────────────────────────────── */
function renderMeds(container, meds) {
  if (!meds || !meds.length) return;

  const cards = meds.map(m => `
    <div class="med-card">
      <div class="med-card-status ${m.status || 'amber'}" aria-hidden="true"></div>
      <div class="med-name">${m.name}</div>
      <div class="med-dose">${m.dose || ''}</div>
      <div class="med-gene">${m.gene || ''}</div>
      <div class="med-note">${m.note || ''}</div>
    </div>
  `).join('');

  container.innerHTML += `
    <div class="sec-header">
      <h2 class="sec-title">Medications</h2>
    </div>
    <div class="meds-strip" role="list" aria-label="Current medications">
      ${cards}
    </div>
  `;
}

/* ── Critical Alerts Panel ────────────────────────────────────── */
function renderAlerts(container, alerts) {
  if (!alerts || !alerts.length) return;

  const items = alerts.map(a => `
    <div class="alert-item">
      <div class="alert-level ${a.level || 'warn'}">${(a.level || 'WARN').toUpperCase()}</div>
      <div class="alert-text">${a.text}</div>
    </div>
  `).join('');

  container.innerHTML += `
    <div class="sec-header">
      <h2 class="sec-title">Critical Alerts</h2>
    </div>
    <div class="alerts-panel" role="alert" aria-label="Critical drug and safety alerts">
      <div class="alerts-panel-title">Drug Safety / Do Not Use</div>
      ${items}
    </div>
  `;
}

/* ── Lab Grid ─────────────────────────────────────────────────── */
function renderLabs(container, labs) {
  if (!labs || !labs.length) return;

  const cards = labs.map(lab => {
    const trendClass = lab.trend === 'up' ? 'up' : lab.trend === 'down' ? 'down' : 'stable';
    const trendIcon = lab.trend === 'up' ? '↑' : lab.trend === 'down' ? '↓' : '→';
    return `
      <div class="lab-card">
        <div class="lab-card-name">${lab.name}</div>
        <div class="lab-value-row">
          <div class="lab-value mono">${lab.value}</div>
          <div class="lab-unit">${lab.unit || ''}</div>
        </div>
        <div class="lab-trend ${trendClass}">${trendIcon}</div>
        <div class="lab-status ${lab.status || ''}">${lab.status || ''}</div>
      </div>
    `;
  }).join('');

  container.innerHTML += `
    <div class="sec-header">
      <h2 class="sec-title">Recent Labs</h2>
    </div>
    <div class="lab-grid" role="list" aria-label="Recent lab results">
      ${cards}
    </div>
  `;
}

/* ── Overview Section ─────────────────────────────────────────── */
function renderOverview() {
  const container = document.getElementById('section-overview');
  if (!container) return;

  container.innerHTML = '';
  const person = getPerson();
  const data = getData();

  renderAlertBanner(container, person.alert);
  renderVitalStats(container, person.vitals);
  renderCatGrid(container, data);
  renderMeds(container, person.meds);
  renderAlerts(container, person.alerts);
  renderLabs(container, person.labs);
}

/* ── Actions Section ─────────────────────────────────────────── */
function renderActions() {
  const container = document.getElementById('section-actions');
  if (!container) return;

  const person = getPerson();
  const actions = person.actions;

  if (!actions) {
    container.innerHTML = `
      <div class="sec-header"><h2 class="sec-title">Action Plan</h2></div>
      <div class="panel"><p style="color:var(--text-dim)">No action plan configured for this profile.</p></div>
    `;
    return;
  }

  container.innerHTML = '';

  /* ── Supplements ── */
  const supplements = actions.supplements || [];
  if (supplements.length) {
    const suppCards = supplements.map(s => `
      <div class="act-card" role="listitem">
        <div class="act-card-header">
          <h4 class="act-card-name">${s.name || ''}</h4>
          ${s.gene ? `<span class="act-gene-badge mono" aria-label="Related gene: ${s.gene}">${s.gene}</span>` : ''}
        </div>
        <div class="act-card-dose mono">${s.dose || ''}</div>
        ${s.timing ? `<div class="act-card-timing">${s.timing}</div>` : ''}
        ${s.why ? `<div class="act-card-why">${s.why}</div>` : ''}
      </div>
    `).join('');

    container.innerHTML += `
      <div class="sec-header"><h2 class="sec-title">Supplements</h2></div>
      <div class="act-grid" role="list" aria-label="Recommended supplements">
        ${suppCards}
      </div>
    `;
  }

  /* ── Diet ── */
  const diet = actions.diet || [];
  if (diet.length) {
    const doItems = diet.filter(d => d.do).map(d => `
      <div class="act-diet-item act-diet-do" role="listitem">
        <div class="act-diet-text">${d.do}</div>
        ${d.gene ? `<span class="act-gene-badge mono">${d.gene}</span>` : ''}
        ${d.why ? `<div class="act-diet-why">${d.why}</div>` : ''}
      </div>
    `).join('');

    const avoidItems = diet.filter(d => d.avoid).map(d => `
      <div class="act-diet-item act-diet-avoid" role="listitem">
        <div class="act-diet-text">${d.avoid}</div>
        ${d.gene ? `<span class="act-gene-badge mono">${d.gene}</span>` : ''}
        ${d.why ? `<div class="act-diet-why">${d.why}</div>` : ''}
      </div>
    `).join('');

    container.innerHTML += `
      <div class="sec-header"><h2 class="sec-title">Diet</h2></div>
      <div class="act-diet-grid" role="list" aria-label="Dietary recommendations">
        <div class="act-diet-col">
          <h4 class="act-diet-col-title" style="color:var(--green, ${ACCENT_COLORS.green})">Include</h4>
          ${doItems || '<p style="color:var(--text-dim)">No specific recommendations.</p>'}
        </div>
        <div class="act-diet-col">
          <h4 class="act-diet-col-title" style="color:var(--red, ${ACCENT_COLORS.red})">Avoid</h4>
          ${avoidItems || '<p style="color:var(--text-dim)">No specific restrictions.</p>'}
        </div>
      </div>
    `;
  }

  /* ── Screening Schedule ── */
  const screening = actions.screening || [];
  if (screening.length) {
    const priorityDot = (p) => {
      const colors = { high: ACCENT_COLORS.red, medium: ACCENT_COLORS.amber, low: ACCENT_COLORS.green };
      const color = colors[(p || '').toLowerCase()] || ACCENT_COLORS.amber;
      const label = (p || 'medium').charAt(0).toUpperCase() + (p || 'medium').slice(1);
      return `<span class="act-priority-dot" style="background:${color}" aria-label="Priority: ${label}" title="${label}"></span>`;
    };

    const screenRows = screening.map(s => `
      <div class="act-screen-row" role="listitem">
        <div class="act-screen-priority">${priorityDot(s.priority)}</div>
        <div class="act-screen-test">${s.test || ''}</div>
        <div class="act-screen-freq">${s.frequency || ''}</div>
        <div class="act-screen-why">${s.why || ''}</div>
      </div>
    `).join('');

    container.innerHTML += `
      <div class="sec-header"><h2 class="sec-title">Screening Schedule</h2></div>
      <div class="act-screen-table" role="list" aria-label="Screening schedule">
        <div class="act-screen-row act-screen-header" role="presentation">
          <div class="act-screen-priority"></div>
          <div class="act-screen-test">Test</div>
          <div class="act-screen-freq">Frequency</div>
          <div class="act-screen-why">Rationale</div>
        </div>
        ${screenRows}
      </div>
    `;
  }

  /* ── Drug Alerts ── */
  const drugAlerts = actions.drugAlerts || [];
  if (drugAlerts.length) {
    const actionColors = { avoid: ACCENT_COLORS.red, reduce: ACCENT_COLORS.amber, monitor: ACCENT_COLORS.green };

    const drugCards = drugAlerts.map(d => {
      const act = (d.action || 'monitor').toLowerCase();
      const accentColor = actionColors[act] || ACCENT_COLORS.amber;
      return `
        <div class="act-drug-card act-drug-${act}" role="listitem"
             style="--act-accent:${accentColor}">
          <div class="act-drug-header">
            <span class="act-drug-name">${d.drug || ''}</span>
            <span class="act-drug-action" style="color:${accentColor}">${(d.action || 'Monitor').toUpperCase()}</span>
          </div>
          ${d.gene ? `<div class="act-drug-gene mono">${d.gene}</div>` : ''}
          ${d.why ? `<div class="act-drug-why">${d.why}</div>` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML += `
      <div class="sec-header"><h2 class="sec-title">Drug Alerts</h2></div>
      <div class="act-drug-grid" role="list" aria-label="Drug interaction alerts">
        ${drugCards}
      </div>
    `;
  }
}

/* ── Ancestry Section ────────────────────────────────────────── */
function renderAncestry() {
  const container = document.getElementById('section-ancestry');
  if (!container) return;

  const person = getPerson();
  const ancestry = person.ancestry;

  if (!ancestry) {
    container.innerHTML = `
      <div class="sec-header"><h2 class="sec-title">Ancestry</h2></div>
      <div class="panel"><p style="color:var(--text-dim)">No ancestry data available for this profile.</p></div>
    `;
    return;
  }

  container.innerHTML = '';

  /* ── Ancestry Composition — CSS stacked bar ── */
  const composition = ancestry.composition || [];
  if (composition.length) {
    const barColors = [
      '#94A3D9', '#B59FD6', '#9BCFAB', '#DDA065',
      '#92BFC8', '#E5B985', '#E07875', '#E4B273'
    ];

    const segments = composition.map((c, i) => {
      const color = barColors[i % barColors.length];
      return `<div class="anc-bar-seg" style="width:${c.pct}%;background:${color}"
        role="presentation" title="${c.region}: ${c.pct}%"></div>`;
    }).join('');

    const legend = composition.map((c, i) => {
      const color = barColors[i % barColors.length];
      return `
        <div class="anc-comp-item" role="listitem">
          <span class="anc-comp-dot" style="background:${color}" aria-hidden="true"></span>
          <span class="anc-comp-region">${c.region}</span>
          <span class="anc-comp-pct mono">${c.pct}%</span>
          ${c.detail ? `<span class="anc-comp-detail">${c.detail}</span>` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML += `
      <div class="sec-header"><h2 class="sec-title">Ancestry Composition</h2></div>
      <div class="panel">
        <div class="anc-bar" role="img" aria-label="Ancestry composition bar chart">
          ${segments}
        </div>
        <div class="anc-comp-legend" role="list" aria-label="Ancestry regions">
          ${legend}
        </div>
      </div>
    `;
  }

  /* ── Haplogroups ── */
  const maternal = ancestry.maternal;
  const paternal = ancestry.paternal;
  if (maternal || paternal) {
    const haploCard = (label, data) => {
      if (!data) return '';
      return `
        <div class="anc-haplo-card" role="article" aria-label="${label} haplogroup">
          <div class="anc-haplo-label">${label}</div>
          <div class="anc-haplo-name mono">${data.haplogroup || 'Unknown'}</div>
          ${data.age ? `<div class="anc-haplo-age">${data.age}</div>` : ''}
          ${data.origin ? `<div class="anc-haplo-origin">${data.origin}</div>` : ''}
          ${data.detail ? `<div class="anc-haplo-detail">${data.detail}</div>` : ''}
        </div>
      `;
    };

    container.innerHTML += `
      <div class="sec-header"><h2 class="sec-title">Haplogroups</h2></div>
      <div class="anc-haplo-grid">
        ${haploCard('Maternal', maternal)}
        ${haploCard('Paternal', paternal)}
      </div>
    `;
  }

  /* ── Variant Origins ── */
  const variantOrigins = ancestry.variantOrigins || [];
  if (variantOrigins.length) {
    const fromColors = {
      maternal: ACCENT_COLORS.purple,
      paternal: ACCENT_COLORS.blue,
      both:     ACCENT_COLORS.amber,
      unknown:  'var(--text-dim, #7d828a)'
    };

    const rows = variantOrigins.map(v => {
      const fromKey = (v.from || 'unknown').toLowerCase();
      const fromColor = fromColors[fromKey] || fromColors.unknown;
      return `
        <div class="anc-var-row" role="listitem">
          <div class="anc-var-name mono">${v.variant || ''}</div>
          <div class="anc-var-from" style="color:${fromColor}">${v.from || 'Unknown'}</div>
          <div class="anc-var-detail">${v.detail || ''}</div>
        </div>
      `;
    }).join('');

    container.innerHTML += `
      <div class="sec-header"><h2 class="sec-title">Variant Origins</h2></div>
      <div class="anc-var-table" role="list" aria-label="Variant origin mapping">
        <div class="anc-var-row anc-var-header" role="presentation">
          <div class="anc-var-name">Variant</div>
          <div class="anc-var-from">From</div>
          <div class="anc-var-detail">Detail</div>
        </div>
        ${rows}
      </div>
    `;
  }
}

/* ── Family Tree Section (placeholder) ───────────────────────── */
function renderFamilyTree() {
  const container = document.getElementById('section-family');
  if (!container) return;
  container.innerHTML = '';
  if (window.STRAND_FAMILY_TREE) {
    STRAND_FAMILY_TREE.init(container, getPerson());
  } else {
    container.innerHTML = `
      <div class="sec-header"><h2 class="sec-title">Family Tree</h2></div>
      <div class="panel"><p style="color:var(--text-dim)">Family tree visualization loading...</p></div>
    `;
  }
}

/* ── Clinical Section ────────────────────────────────────────── */
function renderClinical() {
  const container = document.getElementById('section-clinical');
  if (!container) return;

  const person = getPerson();
  const clinical = person.clinical;

  if (!clinical) {
    container.innerHTML = `
      <div class="panel">
        <h2 class="sec-title">Clinical Summary</h2>
        <p style="color:var(--text-dim);margin-top:8px">Clinical card not configured for this profile.</p>
      </div>
    `;
    return;
  }

  const extraSections = (clinical.sections || []).map(sec => `
    <div class="doc-section">
      <div class="doc-section-title">${sec.title}</div>
      ${(sec.rows || []).map(r => `
        <div class="doc-row">
          <div class="doc-row-label">${r.label}</div>
          <div class="doc-row-value${r.alert ? ' alert' : ''}">${r.value}</div>
        </div>
      `).join('')}
    </div>
  `).join('');

  /* Use clinical.alerts first; fall back to person.alerts */
  const alertSource = (clinical.alerts && clinical.alerts.length) ? clinical.alerts : (person.alerts || []);
  const alertItems = alertSource.map(a => `
    <div class="doc-alert-item">${a.text || a}</div>
  `).join('');

  container.innerHTML = `
    <div class="sec-header">
      <h2 class="sec-title">Clinical Summary</h2>
      <div class="sec-sub">Show any physician</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-header">
        <div>
          <div class="doc-patient-name">${person.fullName || person.name || ''}</div>
          <div class="doc-patient-sub">${clinical.subtitle || ('DOB ' + (person.dob || 'Unknown'))}</div>
        </div>
        <div class="doc-badge">${clinical.badge || 'ACTIVE'}</div>
      </div>
      ${clinical.oneLiner ? `<div class="clin-one-liner">${clinical.oneLiner}</div>` : ''}
      ${extraSections}
      ${alertItems ? `<div class="doc-alert-section"><div class="doc-alert-title">Drug Safety Alerts</div>${alertItems}</div>` : ''}
      <div class="doc-print-btn">
        <button class="btn-print" onclick="window.print()" aria-label="Print clinical card">Print Clinical Card</button>
      </div>
    </div>
  `;
}

/* ── Main render ──────────────────────────────────────────────── */
function renderAll() {
  renderOverview();
  renderActions();
  renderAncestry();
  renderFamilyTree();
  renderClinical();
}

/* ── Public API ───────────────────────────────────────────────── */
window.STRAND_APP = {
  toggleCat,
  toggleCatNew: null, /* populated by strand-cards.js after DOMContentLoaded */
  renderAll,
  renderActions,
  renderAncestry,
  renderFamilyTree,
  renderClinical,
  setAppState,
  accentHex: function(accent) {
    return ACCENT_COLORS[accent] || ACCENT_COLORS.blue;
  }
};

/* ── Boot ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});
