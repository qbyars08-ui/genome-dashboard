/* ═══════════════════════════════════════════════════════════════
   STRAND Tracking — localStorage-backed Labs, Meds, Protocol, Journal
   Exposed as window.STRAND_TRACKING. Vanilla JS only, no frameworks.
   Per-person scoping: all keys prefixed with personId.
   Immutable state: always read-modify-write, never mutate in place.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Imaging styles (injected once at runtime) ────────────────── */
(function injectImagingStyles() {
  if (document.getElementById('strand-imaging-styles')) return;
  const style = document.createElement('style');
  style.id = 'strand-imaging-styles';
  style.textContent = `
    /* Imaging card */
    .trk-img-card {
      margin-bottom: 12px;
      padding: 14px 16px;
    }
    .trk-img-header {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
    }
    .trk-img-date {
      font-size: 12px;
      color: var(--gold);
      white-space: nowrap;
    }
    .trk-img-modality {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .06em;
      padding: 1px 6px;
      border: 1px solid;
      border-radius: 3px;
      white-space: nowrap;
    }
    .trk-img-region {
      font-size: 12px;
      color: var(--text);
      flex: 1;
      min-width: 0;
    }
    .trk-img-header-actions {
      margin-left: auto;
      flex-shrink: 0;
    }
    .trk-img-view-btn {
      display: inline-block;
      text-decoration: none;
      font-size: 11px;
      padding: 4px 10px;
      white-space: nowrap;
    }
    .trk-img-archived {
      font-size: 10px;
      color: var(--text-dim);
      font-style: italic;
    }
    .trk-img-indication {
      font-size: 13px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 4px;
    }
    .trk-img-impression {
      font-size: 12px;
      color: var(--text);
      margin-bottom: 6px;
    }
    .trk-img-label {
      color: var(--text-dim);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .08em;
      margin-right: 4px;
    }
    .trk-img-findings {
      font-size: 11px;
      color: var(--text-dim);
      line-height: 1.6;
      margin-bottom: 8px;
      border-left: 2px solid var(--line-strong);
      padding-left: 10px;
    }
    .trk-img-footer {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .trk-img-provider {
      font-size: 11px;
      flex: 1;
    }
    .trk-img-status {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .07em;
      padding: 2px 7px;
      border: 1px solid;
      border-radius: 3px;
      white-space: nowrap;
    }
    /* Add-study form */
    .trk-img-form {
      margin-bottom: 16px;
      padding: 14px 16px;
    }
  `;
  document.head.appendChild(style);
})();

/* ── Data constants ───────────────────────────────────────────── */

const DEFAULT_LABS = [
  { key: 'cortisol_am', name: 'Cortisol (AM)',      unit: 'µg/dL',   lo: 10,  hi: 20,   gene: 'HPA axis' },
  { key: 'testo',       name: 'Testosterone',       unit: 'ng/dL',   lo: 300, hi: 1000, gene: 'HPG axis' },
  { key: 'ldl',         name: 'LDL Cholesterol',    unit: 'mg/dL',   lo: 0,   hi: 100,  gene: '9p21 bilateral' },
  { key: 'apob',        name: 'ApoB',               unit: 'mg/dL',   lo: 0,   hi: 90,   gene: '9p21' },
  { key: 'vitd',        name: 'Vitamin D',          unit: 'ng/mL',   lo: 50,  hi: 80,   gene: 'GC + VDR' },
  { key: 'ferritin',    name: 'Ferritin',           unit: 'ng/mL',   lo: 30,  hi: 200,  gene: 'Post-crisis' },
  { key: 'crp',         name: 'CRP',                unit: 'mg/L',    lo: 0,   hi: 1,    gene: 'BD marker' },
  { key: 'b12',         name: 'Vitamin B12',        unit: 'pg/mL',   lo: 500, hi: 1200, gene: 'FUT2' },
  { key: 'hcy',         name: 'Homocysteine',       unit: 'µmol/L',  lo: 0,   hi: 8,    gene: 'MTHFR' },
  { key: 'hgb',         name: 'Hemoglobin',         unit: 'g/dL',    lo: 13,  hi: 17,   gene: 'Post-hemolysis' },
  { key: 'tsh',         name: 'TSH',                unit: 'µIU/mL',  lo: 0.4, hi: 4.0,  gene: 'DIO1 + DIO2' },
  { key: 'mma',         name: 'Methylmalonic Acid', unit: 'nmol/L',  lo: 0,   hi: 270,  gene: 'FUT2 + MTHFR' }
];

const PGX = {
  'prednisone':   { status: 'amber', gene: 'FKBP5',    warning: 'FKBP5 CT enhanced GR sensitivity. Works well at low dose. Taper carefully — HPA axis.' },
  'fluoxetine':   { status: 'amber', gene: 'CYP2D6?',  warning: 'CYP2D6 unknown (needs Nebula). CYP2C9 bilateral may slow secondary clearance.' },
  'enalapril':    { status: 'amber', gene: 'NOS3+DBH',  warning: 'NOS3 CT + DBH TT: impaired mechanism + low NE. Reassess if BP <100 systolic.' },
  'topiramate':   { status: 'green', gene: 'Safe',      warning: 'No direct PGx concern. Monitor cognitive fog and weight.' },
  'famotidine':   { status: 'green', gene: 'Safe',      warning: 'No PGx interaction. Standard dosing.' },
  'methylfolate': { status: 'green', gene: 'MTHFR',     warning: 'Bypasses MTHFR compound block. 800mcg daily. Critical.' },
  'vitamin d3':   { status: 'green', gene: 'VDR+GC',    warning: 'GC + VDR predict low. 5000 IU daily. Target 50-60.' },
  'ibuprofen':    { status: 'amber', gene: 'CYP2C9',    warning: 'CYP2C9 bilateral intermediate. Reduce dose ~25%.' },
  'colchicine':   { status: 'red',   gene: 'ABCB1',     warning: 'ABCB1 reduced transporter. CNS accumulation. DO NOT USE.' },
  'dapsone':      { status: 'red',   gene: 'NAT2',      warning: 'NAT2 slow acetylator. Caused hemolytic anemia. NEVER RESUME.' }
};

const DEFAULT_PROTOCOL = [
  { id: 'mf', label: 'Methylfolate 800mcg (MTHFR compound)' },
  { id: 'mb', label: 'Methylcobalamin 1000mcg (FUT2 + MTHFR)' },
  { id: 'vd', label: 'Vitamin D3 5000 IU (GC + VDR)' },
  { id: 'om', label: 'Omega-3 DHA 2g (inflammation + LDL)' },
  { id: 'mg', label: 'Magnesium 400mg (sleep + muscle)' }
];

const SYMPTOM_TYPES = [
  'Oral ulcer', 'Genital ulcer', 'Migraine', 'Tension HA / temple pain',
  'Jaw clench / TMD', 'Diarrhea', 'Joint pain', 'Fatigue',
  'AM jittery / shaky', 'Eye inflammation', 'Skin lesion',
  'Fever', 'Abdominal pain', 'Nausea', 'Other'
];

/* ── localStorage helpers ─────────────────────────────────────── */

function lsKey(personId, suffix) {
  return 'strand-' + personId + '-' + suffix;
}

function lsRead(personId, suffix, fallback) {
  try {
    const raw = localStorage.getItem(lsKey(personId, suffix));
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function lsWrite(personId, suffix, value) {
  try {
    localStorage.setItem(lsKey(personId, suffix), JSON.stringify(value));
  } catch (_) { /* storage full or private mode */ }
}

/* ── Date helpers ─────────────────────────────────────────────── */

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function shortDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return (d.getMonth() + 1) + '/' + d.getDate() + '/' + String(d.getFullYear()).slice(2);
}

/* ── Lab status helper ────────────────────────────────────────── */

function labStatus(value, lo, hi) {
  if (value === null || value === undefined) return 'none';
  if (value < lo || value > hi) return 'red';
  const margin = (hi - lo) * 0.10;
  if (value < lo + margin || value > hi - margin) return 'amber';
  return 'green';
}

/* ── Sparkline builder ────────────────────────────────────────── */

function buildSparkline(entries, lo, hi) {
  const last = entries.slice(-14);
  if (!last.length) return '';
  const maxVal = Math.max(...last.map(e => e.value), hi);
  const minVal = Math.min(...last.map(e => e.value), lo, 0);
  const range = maxVal - minVal || 1;
  const W = 140, H = 28, barW = Math.max(3, Math.floor((W - last.length) / last.length));

  const bars = last.map((entry, i) => {
    const h = Math.max(2, Math.round(((entry.value - minVal) / range) * H));
    const x = i * (barW + 1);
    const y = H - h;
    const inRange = entry.value >= lo && entry.value <= hi;
    const color = inRange ? 'var(--green)' : 'var(--red)';
    return `<rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="${color}" opacity="0.8"/>`;
  }).join('');

  return `<svg width="${W}" height="${H}" style="display:block;margin-top:4px">${bars}</svg>`;
}

/* ── Labs renderer ────────────────────────────────────────────── */

function renderLabs(container, personId) {
  const stored = lsRead(personId, 'labs', {});

  const cards = DEFAULT_LABS.map(lab => {
    const entries = stored[lab.key] || [];
    const latest  = entries[entries.length - 1] || null;
    const status  = latest ? labStatus(latest.value, lab.lo, lab.hi) : 'none';
    const dotColor = status === 'red' ? 'var(--red)' : status === 'amber' ? 'var(--amber)' : status === 'green' ? 'var(--green)' : 'var(--text-dim)';
    const displayVal = latest ? `${latest.value} ${lab.unit}` : '—';
    const displayDate = latest ? shortDate(latest.date) : '';
    const sparkline = entries.length ? buildSparkline(entries, lab.lo, lab.hi) : '';

    return `
      <div class="trk-lab-card panel" data-key="${lab.key}">
        <div class="trk-lab-header">
          <span class="trk-status-dot" style="background:${dotColor}" title="${status}"></span>
          <span class="trk-lab-name">${lab.name}</span>
          <span class="trk-lab-gene mono" style="font-size:10px;color:var(--text-dim)">${lab.gene}</span>
        </div>
        <div class="trk-lab-latest mono">${displayVal}<span class="trk-lab-date">${displayDate}</span></div>
        <div class="trk-lab-range" style="font-size:10px;color:var(--text-dim)">
          optimal ${lab.lo}–${lab.hi} ${lab.unit}
        </div>
        ${sparkline}
        <div class="trk-lab-entry-row">
          <input type="number" class="trk-input" placeholder="value" step="any"
            id="lab-val-${personId}-${lab.key}">
          <input type="date" class="trk-input" value="${todayISO()}"
            id="lab-date-${personId}-${lab.key}">
          <button class="trk-btn-primary"
            onclick="STRAND_TRACKING.saveLabEntry('${personId}','${lab.key}','${lab.unit}')">
            Save
          </button>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="trk-section-label">Labs</div>
    <div class="trk-lab-grid">${cards}</div>`;
}

/* ── Save a single lab entry ──────────────────────────────────── */

function saveLabEntry(personId, labKey, unit) {
  const valEl  = document.getElementById('lab-val-' + personId + '-' + labKey);
  const dateEl = document.getElementById('lab-date-' + personId + '-' + labKey);
  const val  = parseFloat(valEl ? valEl.value : '');
  const date = dateEl ? dateEl.value : todayISO();

  if (isNaN(val)) { alert('Enter a numeric value.'); return; }

  const stored  = lsRead(personId, 'labs', {});
  const prev    = stored[labKey] || [];
  const updated = Object.assign({}, stored, {
    [labKey]: prev.concat({ value: val, date: date, unit: unit })
  });
  lsWrite(personId, 'labs', updated);

  const pane = document.getElementById('track-pane-labs');
  if (pane) renderLabs(pane, personId);
}

/* ── Meds renderer ────────────────────────────────────────────── */

function renderMeds(container, personId) {
  const meds = lsRead(personId, 'meds', []);

  const cards = meds.map((med, idx) => {
    const key = med.name.toLowerCase().trim();
    const pgx = PGX[key] || null;
    const status = pgx ? pgx.status : 'neutral';
    const dotColor = status === 'red' ? 'var(--red)' : status === 'amber' ? 'var(--amber)' : status === 'green' ? 'var(--green)' : 'var(--text-dim)';
    const warn = pgx ? `<div class="trk-pgx-warn">${pgx.warning}</div>` : `<div class="trk-pgx-warn" style="color:var(--text-dim)">No PGx data on chip.</div>`;
    const geneTag = pgx ? `<span class="trk-pgx-gene mono">${pgx.gene}</span>` : '';

    return `
      <div class="trk-med-card panel">
        <div class="trk-med-header">
          <span class="trk-status-dot" style="background:${dotColor}"></span>
          <span class="trk-med-name">${med.name}</span>
          ${geneTag}
          <button class="trk-btn-remove" title="Remove"
            onclick="STRAND_TRACKING.removeMed('${personId}',${idx})">&#10005;</button>
        </div>
        <div class="trk-med-date mono" style="font-size:10px;color:var(--text-dim)">added ${shortDate(med.addedAt)}</div>
        ${warn}
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="trk-section-label">Medications</div>
    ${cards || '<p style="color:var(--text-dim);padding:12px 0">No medications logged.</p>'}
    <div class="trk-add-row" style="margin-top:14px">
      <input type="text" class="trk-input" placeholder="Drug name (e.g. prednisone)"
        id="new-med-${personId}" style="flex:1">
      <button class="trk-btn-primary"
        onclick="STRAND_TRACKING.addMed('${personId}')">Add Medication</button>
    </div>`;
}

/* ── Add / remove med ─────────────────────────────────────────── */

function addMed(personId) {
  const inp = document.getElementById('new-med-' + personId);
  const name = (inp ? inp.value : '').trim();
  if (!name) { alert('Enter a drug name.'); return; }

  const meds    = lsRead(personId, 'meds', []);
  const updated = meds.concat({ name: name, addedAt: todayISO() });
  lsWrite(personId, 'meds', updated);

  const pane = document.getElementById('track-pane-meds');
  if (pane) renderMeds(pane, personId);
}

function removeMed(personId, idx) {
  const meds    = lsRead(personId, 'meds', []);
  const updated = meds.filter((_, i) => i !== idx);
  lsWrite(personId, 'meds', updated);

  const pane = document.getElementById('track-pane-meds');
  if (pane) renderMeds(pane, personId);
}

/* ── Protocol renderer ────────────────────────────────────────── */

function renderProtocol(container, personId) {
  const today   = todayISO();
  const stored  = lsRead(personId, 'protocol-' + today, {});
  const doneCount = DEFAULT_PROTOCOL.filter(item => stored[item.id]).length;

  const items = DEFAULT_PROTOCOL.map(item => {
    const checked = stored[item.id] ? 'checked' : '';
    const lineThrough = stored[item.id] ? 'text-decoration:line-through;color:var(--text-dim)' : '';
    return `
      <label class="trk-protocol-item">
        <input type="checkbox" ${checked}
          onchange="STRAND_TRACKING.toggleProtocol('${personId}','${item.id}',this.checked)"
          aria-label="${item.label}">
        <span style="${lineThrough}">${item.label}</span>
      </label>`;
  }).join('');

  container.innerHTML = `
    <div class="trk-section-label">Daily Protocol — ${today}</div>
    <div class="trk-protocol-progress">
      <span class="mono" style="font-size:18px;font-weight:700;color:var(--gold)">${doneCount}/${DEFAULT_PROTOCOL.length}</span>
      <span style="color:var(--text-dim);margin-left:8px">done today</span>
    </div>
    <div class="trk-protocol-list">${items}</div>`;
}

/* ── Toggle protocol item ─────────────────────────────────────── */

function toggleProtocol(personId, itemId, isChecked) {
  const today   = todayISO();
  const stored  = lsRead(personId, 'protocol-' + today, {});
  const updated = Object.assign({}, stored, { [itemId]: isChecked });
  lsWrite(personId, 'protocol-' + today, updated);

  /* Refresh just the progress counter without full re-render (preserves focus) */
  const doneCount = DEFAULT_PROTOCOL.filter(item => updated[item.id]).length;
  const pane = document.getElementById('track-pane-protocol');
  if (!pane) return;
  const counter = pane.querySelector('.trk-protocol-progress .mono');
  if (counter) counter.textContent = doneCount + '/' + DEFAULT_PROTOCOL.length;

  const label = pane.querySelector(`input[aria-label]`);
  /* Update strikethrough on all items */
  pane.querySelectorAll('.trk-protocol-item').forEach(el => {
    const cb = el.querySelector('input[type="checkbox"]');
    const span = el.querySelector('span');
    if (!cb || !span) return;
    span.style.textDecoration = cb.checked ? 'line-through' : '';
    span.style.color = cb.checked ? 'var(--text-dim)' : '';
  });
}

/* ── Journal renderer ─────────────────────────────────────────── */

function renderJournal(container, personId) {
  const entries = lsRead(personId, 'journal', []);
  const reversed = entries.slice().reverse();

  const cards = reversed.map((entry, revIdx) => {
    const origIdx = entries.length - 1 - revIdx;
    const sevColor = entry.severity >= 7 ? 'var(--red)' : entry.severity >= 4 ? 'var(--amber)' : 'var(--green)';
    const noteHtml = entry.note ? `<div class="trk-journal-note">${entry.note}</div>` : '';
    return `
      <div class="trk-journal-card panel">
        <div class="trk-journal-header">
          <span class="trk-journal-type">${entry.type}</span>
          <span class="trk-journal-sev mono" style="color:${sevColor};font-weight:700">${entry.severity}/10</span>
          <span class="mono" style="font-size:10px;color:var(--text-dim);margin-left:auto">${shortDate(entry.date)}</span>
          <button class="trk-btn-remove" title="Delete"
            onclick="STRAND_TRACKING.removeJournalEntry('${personId}',${origIdx})">&#10005;</button>
        </div>
        ${noteHtml}
      </div>`;
  }).join('');

  const typeOptions = SYMPTOM_TYPES.map(t => `<option value="${t}">${t}</option>`).join('');

  container.innerHTML = `
    <div class="trk-section-label">Symptom Journal</div>
    <div class="trk-journal-form panel">
      <div class="trk-form-row">
        <select class="trk-input" id="journal-type-${personId}">${typeOptions}</select>
      </div>
      <div class="trk-form-row" style="align-items:center;gap:12px">
        <label style="font-size:11px;color:var(--text-dim);white-space:nowrap">Severity:</label>
        <input type="range" min="1" max="10" value="5" id="journal-sev-${personId}"
          oninput="document.getElementById('journal-sev-val-${personId}').textContent=this.value"
          style="flex:1">
        <span class="mono" id="journal-sev-val-${personId}" style="font-size:14px;font-weight:700;color:var(--gold);width:24px">5</span>
      </div>
      <div class="trk-form-row">
        <input type="text" class="trk-input" placeholder="Optional note…" id="journal-note-${personId}" style="flex:1">
      </div>
      <button class="trk-btn-primary" onclick="STRAND_TRACKING.addJournalEntry('${personId}')">
        Log Symptom
      </button>
    </div>
    <div class="trk-section-label" style="margin-top:16px">Recent Entries</div>
    ${cards || '<p style="color:var(--text-dim);padding:12px 0">No entries yet.</p>'}`;
}

/* ── Add / remove journal entry ───────────────────────────────── */

function addJournalEntry(personId) {
  const typeEl = document.getElementById('journal-type-' + personId);
  const sevEl  = document.getElementById('journal-sev-' + personId);
  const noteEl = document.getElementById('journal-note-' + personId);
  const type     = typeEl ? typeEl.value : 'Other';
  const severity = sevEl  ? parseInt(sevEl.value, 10) : 5;
  const note     = noteEl ? noteEl.value.trim() : '';

  const entries = lsRead(personId, 'journal', []);
  const newEntry = { type, severity, note, date: todayISO() };
  lsWrite(personId, 'journal', entries.concat(newEntry));

  const pane = document.getElementById('track-pane-journal');
  if (pane) renderJournal(pane, personId);
}

function removeJournalEntry(personId, idx) {
  const entries = lsRead(personId, 'journal', []);
  const updated = entries.filter((_, i) => i !== idx);
  lsWrite(personId, 'journal', updated);

  const pane = document.getElementById('track-pane-journal');
  if (pane) renderJournal(pane, personId);
}

/* ── Tab switcher ─────────────────────────────────────────────── */

function switchTab(tabId, personId) {
  document.querySelectorAll('.track-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.track-pane').forEach(p => p.classList.remove('active'));

  const btn  = document.querySelector('.track-tab[data-pane="' + tabId + '"]');
  const pane = document.getElementById('track-pane-' + tabId);
  if (btn)  btn.classList.add('active');
  if (pane) {
    pane.classList.add('active');
    fillPane(tabId, pane, personId);
  }
}

/* ── Fill pane on demand ──────────────────────────────────────── */

function fillPane(tabId, pane, personId) {
  if (!pane || pane.dataset.loaded === tabId) return;
  if (tabId === 'labs')     renderLabs(pane, personId);
  if (tabId === 'meds')     renderMeds(pane, personId);
  if (tabId === 'protocol') renderProtocol(pane, personId);
  if (tabId === 'journal')  renderJournal(pane, personId);
  if (tabId === 'imaging')  renderImaging(pane, personId);
  if (tabId === 'incoming') renderIncoming(pane, personId);
  pane.dataset.loaded = tabId;
}

/* ── Imaging renderer ─────────────────────────────────────────── */

/* Modality color map — uses existing CSS custom properties */
const MODALITY_COLORS = {
  CT:     'var(--purple)',
  MRI:    'var(--blue)',
  US:     'var(--cyan)',
  'X-ray':'var(--amber)',
  PET:    'var(--red)',
  DEXA:   'var(--green)',
  other:  'var(--text-dim)'
};

/* Status chip styles */
function imagingStatusChip(status) {
  const s = (status || '').toLowerCase();
  if (s === 'completed') {
    return `<span class="trk-img-status" style="color:var(--green);border-color:var(--green)">Completed</span>`;
  }
  if (s === 'scheduled') {
    return `<span class="trk-img-status" style="color:var(--amber);border-color:var(--amber)">Scheduled</span>`;
  }
  if (s === 'awaiting results') {
    return `<span class="trk-img-status" style="color:var(--gold);border-color:var(--gold)">Awaiting results</span>`;
  }
  if (s === 'cancelled') {
    return `<span class="trk-img-status" style="color:var(--text-dim);border-color:var(--text-dim);text-decoration:line-through">Cancelled</span>`;
  }
  return `<span class="trk-img-status" style="color:var(--text-dim);border-color:var(--text-dim)">${status || ''}</span>`;
}

/* Render a single imaging study card */
function renderImagingCard(study) {
  const modalityColor = MODALITY_COLORS[study.modality] || MODALITY_COLORS.other;
  const statusChip    = imagingStatusChip(study.status);

  /* Private viewer URL — only visible when local _private file loaded */
  const privateUrls = (typeof window !== 'undefined' && window.STRAND_PRIVATE_IMAGING) || {};
  const viewerUrl   = privateUrls[study.id] ? privateUrls[study.id].viewer : null;
  const viewerHtml  = viewerUrl
    ? `<a class="trk-btn-primary trk-img-view-btn" href="${viewerUrl}" target="_blank" rel="noopener noreferrer">View Study</a>`
    : `<span class="trk-img-archived">Study archived — URL not loaded in this environment</span>`;

  const findingsHtml = study.findings
    ? `<div class="trk-img-findings">${study.findings}</div>`
    : '';
  const impressionHtml = study.impression
    ? `<div class="trk-img-impression"><span class="trk-img-label">Impression:</span> ${study.impression}</div>`
    : '';

  return `
    <div class="trk-img-card panel" data-study-id="${study.id}">
      <div class="trk-img-header">
        <span class="trk-img-date mono">${study.date || ''}</span>
        <span class="trk-img-modality mono" style="color:${modalityColor};border-color:${modalityColor}">${study.modality || ''}</span>
        <span class="trk-img-region">${study.region || ''}</span>
        <div class="trk-img-header-actions">${viewerHtml}</div>
      </div>
      <div class="trk-img-body">
        <div class="trk-img-indication">${study.indication || ''}</div>
        ${impressionHtml}
        ${findingsHtml}
        <div class="trk-img-footer">
          <span class="trk-img-provider" style="color:var(--text-dim)">${study.provider || ''}</span>
          ${statusChip}
        </div>
      </div>
    </div>`;
}

/* Merge static (data file) studies with localStorage studies */
function loadImagingStudies(personId) {
  const staticStudies = (
    typeof window !== 'undefined' &&
    window.STRAND_PERSON &&
    Array.isArray(window.STRAND_PERSON.imaging)
  ) ? window.STRAND_PERSON.imaging : [];

  const localStudies = lsRead(personId, 'imaging', []);

  /* Static first, then localStorage appends — local can't overwrite static IDs */
  const staticIds = new Set(staticStudies.map(s => s.id));
  const dedupedLocal = localStudies.filter(s => !staticIds.has(s.id));
  return staticStudies.concat(dedupedLocal);
}

function renderImaging(container, personId) {
  const studies = loadImagingStudies(personId);

  /* Sort: Scheduled first, then Completed desc by date */
  const sorted = studies.slice().sort((a, b) => {
    const aScheduled = (a.status || '') === 'Scheduled';
    const bScheduled = (b.status || '') === 'Scheduled';
    if (aScheduled !== bScheduled) return aScheduled ? -1 : 1;
    return (b.date || '').localeCompare(a.date || '');
  });

  const modalityOpts = ['CT', 'MRI', 'US', 'X-ray', 'PET', 'DEXA', 'other']
    .map(m => `<option value="${m}">${m}</option>`).join('');
  const statusOpts = ['Completed', 'Scheduled', 'Awaiting results', 'Cancelled']
    .map(s => `<option value="${s}">${s}</option>`).join('');

  const cardsHtml = sorted.length
    ? sorted.map(renderImagingCard).join('')
    : '<p style="color:var(--text-dim);padding:12px 0">No imaging studies logged.</p>';

  container.innerHTML = `
    <div class="trk-section-label">Imaging Studies</div>

    <div class="trk-img-form panel">
      <div class="trk-section-label" style="font-size:11px;margin-bottom:10px">Add Study</div>
      <div class="trk-form-row" style="flex-wrap:wrap;gap:8px">
        <input type="date" class="trk-input" id="img-date-${personId}" value="${todayISO()}"
          style="flex:1;min-width:120px" aria-label="Study date">
        <select class="trk-input" id="img-modality-${personId}" style="flex:1;min-width:100px"
          aria-label="Modality">${modalityOpts}</select>
        <input type="text" class="trk-input" placeholder="Region (e.g. Abdomen/Pelvis)"
          id="img-region-${personId}" style="flex:2;min-width:160px" aria-label="Anatomical region">
      </div>
      <div class="trk-form-row" style="flex-wrap:wrap;gap:8px">
        <input type="text" class="trk-input" placeholder="Indication (reason for study)"
          id="img-indication-${personId}" style="flex:2;min-width:200px" aria-label="Indication">
        <input type="text" class="trk-input" placeholder="Provider"
          id="img-provider-${personId}" style="flex:2;min-width:160px" aria-label="Provider">
        <select class="trk-input" id="img-status-${personId}" style="flex:1;min-width:140px"
          aria-label="Status">${statusOpts}</select>
      </div>
      <div class="trk-form-row">
        <textarea class="trk-input" placeholder="Findings (full report text)…"
          id="img-findings-${personId}" rows="3"
          style="flex:1;resize:vertical;font-family:inherit;font-size:12px"
          aria-label="Findings"></textarea>
      </div>
      <div class="trk-form-row">
        <input type="text" class="trk-input" placeholder="Impression (1-line summary)…"
          id="img-impression-${personId}" style="flex:1" aria-label="Impression">
      </div>
      <button class="trk-btn-primary"
        onclick="STRAND_TRACKING.saveImagingEntry('${personId}')">
        Save Study
      </button>
    </div>

    <div class="trk-section-label" style="margin-top:18px">Studies (${sorted.length})</div>
    ${cardsHtml}`;
}

/* ── Save imaging entry to localStorage ───────────────────────── */

function saveImagingEntry(personId) {
  const g = id => document.getElementById(id);
  const date       = (g('img-date-'       + personId) || {}).value || todayISO();
  const modality   = (g('img-modality-'   + personId) || {}).value || 'other';
  const region     = ((g('img-region-'    + personId) || {}).value || '').trim();
  const indication = ((g('img-indication-'+ personId) || {}).value || '').trim();
  const provider   = ((g('img-provider-'  + personId) || {}).value || '').trim();
  const status     = (g('img-status-'     + personId) || {}).value || 'Completed';
  const findings   = ((g('img-findings-'  + personId) || {}).value || '').trim();
  const impression = ((g('img-impression-'+ personId) || {}).value || '').trim();

  if (!indication) { alert('Enter an indication (reason for study).'); return; }

  /* Build a slug from date + modality + region */
  const slug = [date, modality.toLowerCase(), region.toLowerCase().replace(/[^a-z0-9]+/g, '-')]
    .join('-').replace(/-+$/, '');

  const newStudy = Object.freeze({
    id: slug,
    date,
    modality,
    region,
    indication,
    provider,
    findings,
    impression,
    status,
    accessible: false
  });

  const stored  = lsRead(personId, 'imaging', []);
  /* Prevent duplicate slugs from rapid double-clicks */
  if (stored.some(s => s.id === slug)) {
    alert('A study with this date/modality/region already exists.');
    return;
  }
  lsWrite(personId, 'imaging', stored.concat(newStudy));

  const pane = document.getElementById('track-pane-imaging');
  if (pane) {
    pane.dataset.loaded = '';
    renderImaging(pane, personId);
  }
}

/* ── Incoming (stub) ──────────────────────────────────────────── */

function renderIncoming(container, personId) {
  container.innerHTML = `
    <div class="trk-section-label">Incoming</div>
    <p style="color:var(--text-dim);padding:12px 0">
      Incoming lab orders and pending results will appear here.
    </p>`;
}

/* ── Init — called by strand-app.js renderTracking() ─────────── */

function init(container, personId) {
  if (!container || !personId) return;

  container.innerHTML = `
    <div class="trk-section-label" style="margin-bottom:12px">Health Tracking</div>
    <div class="track-tabs" role="tablist">
      <button class="track-tab active" role="tab" data-pane="labs"
        onclick="STRAND_TRACKING.switchTab('labs','${personId}')">Labs</button>
      <button class="track-tab" role="tab" data-pane="meds"
        onclick="STRAND_TRACKING.switchTab('meds','${personId}')">Meds</button>
      <button class="track-tab" role="tab" data-pane="protocol"
        onclick="STRAND_TRACKING.switchTab('protocol','${personId}')">Protocol</button>
      <button class="track-tab" role="tab" data-pane="journal"
        onclick="STRAND_TRACKING.switchTab('journal','${personId}')">Journal</button>
      <button class="track-tab" role="tab" data-pane="imaging"
        onclick="STRAND_TRACKING.switchTab('imaging','${personId}')">Imaging</button>
      <button class="track-tab" role="tab" data-pane="incoming"
        onclick="STRAND_TRACKING.switchTab('incoming','${personId}')">Incoming</button>
    </div>
    <div id="track-pane-labs"     class="track-pane active" role="tabpanel"></div>
    <div id="track-pane-meds"     class="track-pane"        role="tabpanel"></div>
    <div id="track-pane-protocol" class="track-pane"        role="tabpanel"></div>
    <div id="track-pane-journal"  class="track-pane"        role="tabpanel"></div>
    <div id="track-pane-imaging"  class="track-pane"        role="tabpanel"></div>
    <div id="track-pane-incoming" class="track-pane"        role="tabpanel"></div>`;

  /* Load labs pane immediately (it's the default active pane) */
  const labsPane = container.querySelector('#track-pane-labs');
  if (labsPane) {
    renderLabs(labsPane, personId);
    labsPane.dataset.loaded = 'labs';
  }
}

/* ── Public API ───────────────────────────────────────────────── */

window.STRAND_TRACKING = {
  init,
  renderLabs,
  renderMeds,
  renderProtocol,
  renderJournal,
  renderImaging,
  renderIncoming,
  switchTab,
  saveLabEntry,
  addMed,
  removeMed,
  toggleProtocol,
  addJournalEntry,
  removeJournalEntry,
  saveImagingEntry
};
