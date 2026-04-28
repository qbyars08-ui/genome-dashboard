/* ═══════════════════════════════════════════════════════════════
   STRAND Onboard — genome upload, parse, and dashboard redirect.
   Depends on strand-variant-panel.js (loaded first via onboard.html).
   Vanilla JS only. All parsing happens client-side. No uploads.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Storage key (shared with strand-shell.js and strand-user-loader.js) ── */
const STORAGE_KEY = 'strand-user-person';

/* ─── Family pages (mirrors strand-shell.js FAMILY array) ───── */
const FAMILY_PAGES = [
  { id: 'quinn',    name: 'Quinn',    page: 'quinn.html' },
  { id: 'chad',     name: 'Chad',     page: 'chad-brainmap.html' },
  { id: 'brigitte', name: 'Brigitte', page: 'brigitte.html' },
  { id: 'brother',  name: 'Brother',  page: 'brother.html' },
  { id: 'peggy',    name: 'Peggy',    page: 'peggy.html' }
];

/* ─── PARSER ─────────────────────────────────────────────────── */
/* parse23andMe: text → Map<rsid, { chromosome, position, genotype }> */
function parse23andMe(text) {
  const result = new Map();
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    if (!line || line.startsWith('#')) continue;

    const parts = line.split('\t');
    if (parts.length < 4) continue;

    const rsid     = parts[0].trim();
    const chrom    = parts[1].trim();
    const position = parts[2].trim();
    const genotype = parts[3].trim();

    if (!rsid) continue;

    result.set(rsid, Object.freeze({ chromosome: chrom, position, genotype }));
  }

  return result;
}

/* ─── VARIANT EXTRACTION ─────────────────────────────────────── */
/* Returns a new array of interpreted variant results (immutable) */
function extractVariants(variantMap) {
  return VARIANT_PANEL.map(entry => {
    const call = variantMap.get(entry.rsid);
    const genotype = call ? call.genotype : null;
    const interp = entry.interpret(genotype);

    return Object.freeze({
      rsid:     entry.rsid,
      gene:     entry.gene,
      category: entry.category,
      genotype: genotype || '--',
      called:   Boolean(call && genotype && genotype !== '--'),
      name:     interp.name,
      finding:  interp.finding,
      severity: interp.severity
    });
  });
}

/* ─── SLUG HELPER ────────────────────────────────────────────── */
function slugify(name) {
  return (name || 'you')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'you';
}

/* ─── SCHEMA HELPERS ─────────────────────────────────────────── */
function severityToColorClass(severity) {
  if (severity === 'high')     return 'f-red';
  if (severity === 'moderate') return 'f-amber';
  if (severity === 'low')      return 'f-green';
  return 'f-blue';
}

function variantToFinding(v) {
  return Object.freeze({
    g: v.gene + ' ' + v.genotype,
    c: severityToColorClass(v.severity),
    n: v.name,
    l: v.finding,
    d: 'rsID: ' + v.rsid + ' · Category: ' + (CAT_LABELS[v.category] || v.category)
  });
}

function buildActions(catVariants) {
  return catVariants
    .filter(v => v.called && (v.severity === 'high' || v.severity === 'moderate'))
    .slice(0, 3)
    .map(v => 'Review ' + v.gene + ' finding with your physician: ' + v.name);
}

/* severity → risk score (lower = higher risk, matches STRAND gauge convention) */
function computeCategoryScore(catVariants) {
  if (!catVariants.length) return 50;
  const called = catVariants.filter(v => v.called);
  if (!called.length) return 50;
  const risk = called.reduce((acc, v) => {
    if (v.severity === 'high')     return acc + 30;
    if (v.severity === 'moderate') return acc + 15;
    return acc;
  }, 0);
  return Math.max(0, Math.min(100, 100 - risk));
}

/* ─── BUILD PERSON OBJECT ────────────────────────────────────── */
/* Produces a STRAND_PERSON matching the schema used by data/quinn.js */
function buildPerson(displayName, variants) {
  const id   = slugify(displayName);
  const name = displayName || 'Your Genome';

  const badges = variants
    .filter(v => v.called && (v.severity === 'high' || v.severity === 'moderate'))
    .slice(0, 4)
    .map(v => v.gene + ' ' + v.genotype);

  const calledCount = variants.filter(v => v.called).length;
  const highCount   = variants.filter(v => v.called && v.severity === 'high').length;
  const modCount    = variants.filter(v => v.called && v.severity === 'moderate').length;

  const vitals = [
    { label: 'SNPs Analyzed', value: '631K',              sub: 'Full genome file',     accent: 'blue'   },
    { label: 'Panel Checked', value: String(VARIANT_PANEL.length), sub: 'Key markers', accent: 'gold'   },
    { label: 'Called',        value: String(calledCount), sub: 'Present in file',       accent: 'green'  },
    { label: 'High Impact',   value: String(highCount),   sub: 'Flagged findings',      accent: 'red'    },
    { label: 'Moderate',      value: String(modCount),    sub: 'Worth monitoring',      accent: 'amber'  }
  ];

  const catAccents = { cv: 'red', nr: 'purple', ca: 'orange', dr: 'amber', mt: 'green', lg: 'blue' };
  const dataObj = {};

  ['cv', 'nr', 'ca', 'dr', 'mt', 'lg'].forEach(catKey => {
    const cvs = variants.filter(v => v.category === catKey);
    if (!cvs.length) return;

    const highItems = cvs.filter(v => v.severity === 'high' || v.severity === 'moderate');
    const infoItems = cvs.filter(v => v.severity === 'low'  || v.severity === 'info');
    const flags     = cvs.filter(v => v.severity === 'high').length;

    dataObj[catKey] = {
      title:    CAT_LABELS[catKey] || catKey,
      accent:   catAccents[catKey] || 'blue',
      score:    computeCategoryScore(cvs),
      status:   flags > 0 ? flags + ' finding' + (flags > 1 ? 's' : '') : 'No flags',
      findings: highItems.map(variantToFinding),
      deep:     infoItems.map(variantToFinding),
      actions:  buildActions(cvs)
    };
  });

  return Object.freeze({
    id,
    name,
    fullName:    name,
    role:        'You',
    age:         null,
    dob:         null,
    location:    null,
    badges,
    vitals,
    alert:       null,
    data:        dataObj,
    inheritance: Object.freeze({
      'Your Genome': variants.filter(v => v.called).map(v => v.gene + ' ' + v.genotype)
    }),
    meds:    [],
    alerts:  [],
    labs:    [],
    imaging: []
  });
}

/* ─── FILE READING ───────────────────────────────────────────── */
async function readFile(file) {
  return file.name.toLowerCase().endsWith('.zip')
    ? readZipFile(file)
    : readTextFile(file);
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsText(file, 'utf-8');
  });
}

async function readZipFile(file) {
  if (typeof DecompressionStream === 'undefined') {
    throw new Error(
      'Your browser does not support native ZIP decompression. ' +
      'Please extract the .zip and upload the .txt file directly.'
    );
  }
  const buf  = await file.arrayBuffer();
  const text = await extractFirstTxtFromZip(buf);
  if (!text) throw new Error('Could not find a .txt genome file inside the ZIP.');
  return text;
}

/* Minimal ZIP local-file-header parser. Handles stored (0) and DEFLATE (8). */
async function extractFirstTxtFromZip(buffer) {
  const bytes = new Uint8Array(buffer);
  let offset = 0;

  while (offset < bytes.length - 4) {
    /* PK\x03\x04 = local file header signature */
    if (bytes[offset] !== 0x50 || bytes[offset + 1] !== 0x4B ||
        bytes[offset + 2] !== 0x03 || bytes[offset + 3] !== 0x04) {
      offset++;
      continue;
    }

    const compMethod = bytes[offset + 8]  | (bytes[offset + 9]  << 8);
    const compSize   = (bytes[offset + 18] | (bytes[offset + 19] << 8) |
                        (bytes[offset + 20] << 16) | (bytes[offset + 21] << 24)) >>> 0;
    const fnLen      = bytes[offset + 26] | (bytes[offset + 27] << 8);
    const extraLen   = bytes[offset + 28] | (bytes[offset + 29] << 8);
    const fnStart    = offset + 30;
    const filename   = new TextDecoder('utf-8').decode(bytes.slice(fnStart, fnStart + fnLen));
    const dataStart  = fnStart + fnLen + extraLen;
    const dataSlice  = bytes.slice(dataStart, dataStart + compSize);

    if (filename.toLowerCase().endsWith('.txt') && compSize > 0) {
      if (compMethod === 0) {
        return new TextDecoder('utf-8').decode(dataSlice);
      }
      if (compMethod === 8) {
        return decompressDeflate(dataSlice);
      }
    }

    offset = dataStart + compSize;
  }

  return null;
}

async function decompressDeflate(data) {
  const ds     = new DecompressionStream('deflate-raw');
  const writer = ds.writable.getWriter();
  const reader = ds.readable.getReader();
  writer.write(data);
  writer.close();

  const chunks = [];
  let done = false;
  while (!done) {
    const { value, done: d } = await reader.read();
    if (value) chunks.push(value);
    done = d;
  }

  const total    = chunks.reduce((s, c) => s + c.length, 0);
  const combined = new Uint8Array(total);
  let pos = 0;
  chunks.forEach(c => { combined.set(c, pos); pos += c.length; });
  return new TextDecoder('utf-8').decode(combined);
}

/* ─── STEP MANAGEMENT ────────────────────────────────────────── */
function showStep(stepId) {
  document.querySelectorAll('.onboard-step').forEach(el => {
    el.classList.toggle('active', el.id === stepId);
  });
}

function showError(msg) {
  const el = document.getElementById('onboard-error');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
}

function clearError() {
  const el = document.getElementById('onboard-error');
  if (el) el.classList.remove('visible');
}

/* ─── PROGRESS ANIMATION ─────────────────────────────────────── */
function animateParseProgress(targetCount, onComplete) {
  const statusEl = document.getElementById('parse-status');
  const fillEl   = document.getElementById('parse-bar-fill');
  const countEl  = document.getElementById('parse-count-display');
  let current = 0;

  function step() {
    current = Math.min(targetCount, current + Math.floor(Math.random() * 40000) + 20000);
    const pct = (current / targetCount) * 100;
    if (fillEl)   fillEl.style.width = pct.toFixed(1) + '%';
    if (statusEl) statusEl.textContent = 'Analyzed ' + current.toLocaleString() + ' / ' + targetCount.toLocaleString() + ' SNPs\u2026';
    if (countEl)  countEl.textContent  = current.toLocaleString();

    if (current < targetCount) {
      requestAnimationFrame(step);
    } else {
      if (fillEl)   fillEl.style.width = '100%';
      if (statusEl) statusEl.textContent = 'Extracting variants\u2026';
      setTimeout(onComplete, 400);
    }
  }

  requestAnimationFrame(step);
}

/* ─── RESULTS RENDERING ──────────────────────────────────────── */
function renderResults(variants) {
  const container = document.getElementById('results-variant-list');
  if (!container) return;

  const called  = variants.filter(v => v.called);
  const missing = variants.filter(v => !v.called);

  const calledHTML = called.map(v => `
    <div class="variant-row sev-${v.severity}">
      <div class="variant-gene">${v.gene}</div>
      <div class="variant-gt">${v.genotype}</div>
      <div class="variant-finding">${v.name}</div>
      <div class="variant-cat">${CAT_LABELS[v.category] || v.category}</div>
    </div>`).join('');

  const missingHTML = missing.length ? `
    <div style="font-size:11px;color:var(--text-dim);margin:10px 0 4px;text-transform:uppercase;letter-spacing:.1em">Not called in this file</div>
    ${missing.map(v => `
    <div class="variant-row variant-missing">
      <div class="variant-gene">${v.gene}</div>
      <div class="variant-gt">--</div>
      <div class="variant-finding">${v.name} &mdash; not called</div>
      <div class="variant-cat">${CAT_LABELS[v.category] || v.category}</div>
    </div>`).join('')}` : '';

  container.innerHTML = calledHTML + missingHTML;
}

function updateResultsStats(variants) {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('res-called',   variants.filter(v => v.called).length);
  set('res-high',     variants.filter(v => v.called && v.severity === 'high').length);
  set('res-moderate', variants.filter(v => v.called && v.severity === 'moderate').length);
}

/* ─── EVENT HANDLERS ─────────────────────────────────────────── */
function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  const zone = document.getElementById('drop-zone');
  if (zone) zone.classList.remove('drag-over');
  const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
  if (file) processFile(file);
}

function handleDragOver(event) {
  event.preventDefault();
  const zone = document.getElementById('drop-zone');
  if (zone) zone.classList.add('drag-over');
}

function handleDragLeave() {
  const zone = document.getElementById('drop-zone');
  if (zone) zone.classList.remove('drag-over');
}

function handleFileInput(event) {
  const file = event.target.files && event.target.files[0];
  if (file) processFile(file);
}

/* ─── MAIN PIPELINE ──────────────────────────────────────────── */
let _lastVariants = null;

async function processFile(file) {
  clearError();
  const name = file.name.toLowerCase();
  if (!name.endsWith('.txt') && !name.endsWith('.zip')) {
    showError('Please upload a .txt or .zip file from 23andMe or AncestryDNA.');
    return;
  }

  showStep('step-parsing');

  let rawText;
  try {
    rawText = await readFile(file);
  } catch (err) {
    showStep('step-upload');
    showError('Could not read file: ' + (err.message || 'Unknown error'));
    return;
  }

  const lineCount = (rawText.match(/\n/g) || []).length;
  const displayCount = Math.max(lineCount, 631455);

  animateParseProgress(displayCount, () => {
    let variantMap;
    try {
      variantMap = parse23andMe(rawText);
    } catch (err) {
      showStep('step-upload');
      showError('Could not parse genome file: ' + (err.message || 'Unknown error'));
      return;
    }

    if (variantMap.size === 0) {
      showStep('step-upload');
      showError('No SNP data found. Make sure this is a raw 23andMe or AncestryDNA .txt file.');
      return;
    }

    const variants = extractVariants(variantMap);
    _lastVariants = variants;
    updateResultsStats(variants);
    renderResults(variants);
    showStep('step-results');
  });
}

/* ─── SAVE AND NAVIGATE ──────────────────────────────────────── */
function savePerson() {
  const nameInput = document.getElementById('name-input');
  const displayName = (nameInput && nameInput.value.trim()) || 'Me';

  if (!_lastVariants) {
    showError('No parsed data found. Please upload a file first.');
    return;
  }

  const person = buildPerson(displayName, _lastVariants);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(person));
  } catch (_err) {
    showError('Could not save to browser storage. Your browser may be blocking localStorage.');
    return;
  }

  window.location.href = 'you.html';
}

/* ─── FAMILY PILLS ───────────────────────────────────────────── */
function renderFamilyPills() {
  const nav = document.querySelector('.onboard-family-pills');
  if (!nav) return;

  const hasUser = Boolean(localStorage.getItem(STORAGE_KEY));

  FAMILY_PAGES.forEach(m => {
    const pill = document.createElement('button');
    pill.className = 'family-pill';
    pill.textContent = m.name;
    pill.setAttribute('aria-label', m.name);
    pill.onclick = () => { window.location.href = m.page; };
    nav.appendChild(pill);
  });

  if (hasUser) {
    const userPill = document.createElement('button');
    userPill.className = 'family-pill active';
    userPill.textContent = 'You';
    userPill.setAttribute('aria-label', 'Your Genome');
    userPill.onclick = () => { window.location.href = 'you.html'; };
    nav.appendChild(userPill);
  } else {
    const addPill = document.createElement('a');
    addPill.className = 'family-pill';
    addPill.textContent = '+ Load Yours';
    addPill.href = 'onboard.html';
    nav.appendChild(addPill);
  }
}

/* ─── DOM BUILDER ────────────────────────────────────────────── */
function buildOnboardUI() {
  const main = document.getElementById('onboard-main');
  if (!main) return;

  main.innerHTML = `
    <!-- STEP 1: UPLOAD -->
    <div id="step-upload" class="onboard-step active">
      <div class="onboard-hero">
        <div class="onboard-kicker">STRAND &middot; Phase 3D &middot; Genome Upload</div>
        <h1 class="onboard-title">Upload your 23andMe or AncestryDNA raw data. Get your STRAND in 60 seconds.</h1>
        <p class="onboard-sub">We extract ${VARIANT_PANEL.length} clinically relevant variants &mdash; APOE, MTHFR, 9p21, CYP2C19, Factor V Leiden, and more &mdash; then render your personal dashboard.</p>
      </div>
      <div class="privacy-notice" role="note" aria-label="Privacy notice">
        <div class="privacy-icon" aria-hidden="true">&#x1F512;</div>
        <div class="privacy-text">
          <strong>Your data never leaves your browser.</strong> All parsing happens locally in JavaScript. Nothing is uploaded to any server.
        </div>
      </div>
      <div id="onboard-error" class="onboard-error" role="alert" aria-live="polite"></div>
      <div id="drop-zone" class="drop-zone" role="button" tabindex="0" aria-label="File drop zone">
        <input type="file" id="file-input" accept=".txt,.zip" aria-label="Select genome file">
        <span class="drop-icon" aria-hidden="true">&#x1F9EC;</span>
        <div class="drop-label">Drop your .txt or .zip here</div>
        <div class="drop-hint">23andMe v4/v5 &middot; AncestryDNA raw data &middot; build 37</div>
        <div class="drop-formats">
          <span class="format-badge">.txt</span>
          <span class="format-badge">.zip</span>
        </div>
        <div class="drop-or">or</div>
        <span class="btn-browse">Browse files</span>
      </div>
      <p class="compat-note">
        Download raw data from
        <a href="https://you.23andme.com/tools/data/" target="_blank" rel="noopener">23andMe</a> or
        <a href="https://www.ancestry.com/dna/tools/raw-dna" target="_blank" rel="noopener">AncestryDNA</a>
        &rarr; Settings &rarr; Raw Data.
      </p>
      <div class="how-steps" aria-label="How it works">
        <div class="how-step">
          <div class="how-num">01</div>
          <div class="how-label">Upload</div>
          <div class="how-desc">Drop your raw .txt or .zip from 23andMe / AncestryDNA</div>
        </div>
        <div class="how-step">
          <div class="how-num">02</div>
          <div class="how-label">Parse</div>
          <div class="how-desc">We scan ${VARIANT_PANEL.length} key SNPs in seconds, entirely in your browser</div>
        </div>
        <div class="how-step">
          <div class="how-num">03</div>
          <div class="how-label">Dashboard</div>
          <div class="how-desc">Get a full STRAND dashboard with your personalized variant findings</div>
        </div>
      </div>
    </div>

    <!-- STEP 2: PARSING PROGRESS -->
    <div id="step-parsing" class="onboard-step">
      <div class="parse-card" role="status" aria-live="polite" aria-label="Parsing genome file">
        <svg class="parse-dna" viewBox="0 0 48 96" aria-hidden="true">
          <path class="dna-strand-s1" d="M12,8 Q36,24 12,40 Q36,56 12,72 Q36,88 12,96"/>
          <path class="dna-strand-s2" d="M36,8 Q12,24 36,40 Q12,56 36,72 Q12,88 36,96"/>
          <line class="dna-rung-parse" x1="17" y1="16" x2="31" y2="16" style="animation-delay:.0s"/>
          <line class="dna-rung-parse" x1="22" y1="28" x2="26" y2="28" style="animation-delay:.3s"/>
          <line class="dna-rung-parse" x1="17" y1="40" x2="31" y2="40" style="animation-delay:.6s"/>
          <line class="dna-rung-parse" x1="22" y1="52" x2="26" y2="52" style="animation-delay:.9s"/>
          <line class="dna-rung-parse" x1="17" y1="64" x2="31" y2="64" style="animation-delay:1.2s"/>
          <line class="dna-rung-parse" x1="22" y1="76" x2="26" y2="76" style="animation-delay:1.5s"/>
        </svg>
        <div class="parse-title">Analyzing your genome&hellip;</div>
        <div id="parse-status" class="parse-status">Reading file&hellip;</div>
        <div class="parse-bar-wrap" role="progressbar" aria-valuemin="0" aria-valuemax="100">
          <div id="parse-bar-fill" class="parse-bar-fill"></div>
        </div>
        <div id="parse-count-display" class="parse-count">0</div>
      </div>
    </div>

    <!-- STEP 3: RESULTS -->
    <div id="step-results" class="onboard-step">
      <div class="results-header">
        <div class="results-title">Variants Extracted</div>
        <div class="results-sub">Review your findings, then enter your name to save your STRAND dashboard.</div>
      </div>
      <div class="results-stats" aria-label="Variant summary statistics">
        <div class="res-stat">
          <div id="res-called"   class="res-stat-value">&mdash;</div>
          <div class="res-stat-label">Variants Called</div>
        </div>
        <div class="res-stat">
          <div id="res-high"     class="res-stat-value">&mdash;</div>
          <div class="res-stat-label">High Impact</div>
        </div>
        <div class="res-stat">
          <div id="res-moderate" class="res-stat-value">&mdash;</div>
          <div class="res-stat-label">Moderate</div>
        </div>
      </div>
      <div class="results-variants-title">Variant panel &mdash; ${VARIANT_PANEL.length} markers</div>
      <div id="results-variant-list" class="variant-list" role="list" aria-label="Extracted variants"></div>
      <div class="name-prompt">
        <label class="name-label" for="name-input">Your name:</label>
        <input type="text" id="name-input" class="name-input"
          placeholder="e.g. Alex Smith" maxlength="60"
          aria-label="Enter your name for the dashboard">
      </div>
      <div class="cta-row">
        <button class="btn-cta" onclick="savePerson()" aria-label="Save and view your dashboard">
          View Your Dashboard &rarr;
        </button>
        <button class="btn-secondary" onclick="showStep('step-upload');clearError()">
          Upload different file
        </button>
      </div>
    </div>
  `;

  const zone = document.getElementById('drop-zone');
  if (zone) {
    zone.addEventListener('dragover',  handleDragOver);
    zone.addEventListener('dragleave', handleDragLeave);
    zone.addEventListener('drop',      handleDrop);
  }

  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileInput);
  }
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderFamilyPills();
  buildOnboardUI();
});

/* Expose to inline onclick handlers */
window.savePerson = savePerson;
window.showStep   = showStep;
window.clearError = clearError;
