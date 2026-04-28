/* ═══════════════════════════════════════════════════════════════
   STRAND Risk Cards — Whoop/Oura-style renderer
   Replaces the gauge-based renderCatGrid in strand-app.js.
   Called from strand-app.js renderCatGrid() when new data fields
   (band, factors, methodology) are present.
   Immutable patterns throughout — no mutation of data objects.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Band config ─────────────────────────────────────────────── */
const BAND_META = {
  optimal:   { label: 'Optimal',           cls: 'optimal'   },
  monitor:   { label: 'Monitor',           cls: 'monitor'   },
  active:    { label: 'Active Management', cls: 'active'    },
  'high-risk': { label: 'High Risk',       cls: 'high-risk' }
};

/* ── Score → band (if not explicitly set) ────────────────────── */
function scoreToBand(score) {
  if (score <= 33) return 'optimal';
  if (score <= 55) return 'monitor';
  if (score <= 75) return 'active';
  return 'high-risk';
}

/* ── Trend direction → arrow + CSS class ─────────────────────── */
function trendArrow(dir) {
  const map = {
    up:        { sym: '↑', cls: 'up' },
    down:      { sym: '↓', cls: 'down' },
    stable:    { sym: '→', cls: 'stable' },
    improving: { sym: '↓', cls: 'improving' },
    worsening: { sym: '↑', cls: 'worsening' }
  };
  return map[dir] || map.stable;
}

/* ── Format delta with sign ──────────────────────────────────── */
function fmtDelta(delta) {
  if (delta > 0) return '+' + delta;
  if (delta < 0) return String(delta);
  return '±0';
}

/* ── Delta CSS class ─────────────────────────────────────────── */
function deltaClass(delta) {
  if (delta > 0) return 'pos';
  if (delta < 0) return 'neg';
  return 'zero';
}

/* ── Escape HTML ─────────────────────────────────────────────── */
function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Horizontal progress bar (replaces circular gauge) ──────── */
function buildProgressBar(score, hexColor) {
  const pct = Math.min(Math.max(score || 0, 0), 100);
  return `
    <div class="sc-bar-wrap" aria-hidden="true">
      <div class="sc-bar-track">
        <div class="sc-bar-fill"
             style="width:0%;background:${esc(hexColor)}"
             data-target-width="${pct}%">
        </div>
      </div>
      <div class="sc-bar-labels">
        <span>0</span>
        <span>${pct}</span>
        <span>100</span>
      </div>
    </div>
  `;
}

/* ── Factor chips (compact, top 3) ──────────────────────────── */
function buildFactorChips(factors) {
  if (!factors || !factors.length) return '';
  const top3 = factors.slice(0, 3);
  const chips = top3.map(f => {
    const d = fmtDelta(f.delta);
    const dc = deltaClass(f.delta);
    return `
      <span class="sc-factor-chip" title="${esc(f.note || '')}">
        <span class="sc-factor-chip-delta ${dc}">${esc(d)}</span>
        <span>${esc(f.name)}</span>
      </span>
    `;
  }).join('');

  const moreCount = factors.length - 3;
  const moreLink = moreCount > 0
    ? `<span class="sc-factors-more" role="button">+${moreCount} more ▾</span>`
    : '';

  return `<div class="sc-factors-preview">${chips}${moreLink}</div>`;
}

/* ── Full factors list (in expandable section) ───────────────── */
function buildFullFactors(factors, methodology) {
  if (!factors || !factors.length) return '';

  const methodHTML = methodology
    ? `<div class="sc-method-panel">
         <div class="sc-method-label">How this score is calculated</div>
         <div class="sc-method-text">${esc(methodology)}</div>
       </div>`
    : '';

  const rows = factors.map(f => {
    const d = fmtDelta(f.delta);
    const dc = deltaClass(f.delta);
    return `
      <div class="sc-full-factor-row">
        <div class="sc-full-factor-delta ${dc}"
             aria-label="Impact ${d}">${esc(d)}</div>
        <div class="sc-full-factor-body">
          <span class="sc-full-factor-name">${esc(f.name)}</span>
          <span class="sc-full-factor-note">${esc(f.note || '')}</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    ${methodHTML}
    <div class="sc-factors-header">Contributing Factors</div>
    <div class="sc-full-factors">${rows}</div>
  `;
}

/* ── Trend + comparison meta row ─────────────────────────────── */
function buildMetaRow(trend, comparison) {
  if (!trend && !comparison) return '';
  const trendHTML = trend
    ? (() => {
        const arr = trendArrow(trend.dir);
        return `<div class="sc-trend">
          <span class="sc-trend-arrow ${arr.cls}" aria-label="Trend: ${esc(trend.dir)}">${arr.sym}</span>
          <span>${esc(trend.note || trend.dir)}</span>
        </div>`;
      })()
    : '';
  const compHTML = comparison
    ? `<div class="sc-comparison">${esc(comparison.label)}: <strong>${esc(comparison.value)}</strong></div>`
    : '';
  return `<div class="sc-meta-row">${trendHTML}${compHTML}</div>`;
}

/* ── Finding card HTML (reuses existing logic) ───────────────── */
function buildFindingCard(finding) {
  const colorClass = finding.c || 'f-blue';
  const hasDetail = Boolean(finding.d);
  return `
    <div class="finding-card ${colorClass}"
      role="button" tabindex="0"
      aria-expanded="false"
      aria-label="${esc(finding.n || 'Finding')} — click to expand"
      onclick="this.classList.toggle('open');this.setAttribute('aria-expanded',this.classList.contains('open'))">
      <div class="finding-top">
        <div class="finding-gene">${esc(finding.g || '')}</div>
      </div>
      <h4 class="finding-name">${esc(finding.n || '')}</h4>
      <div class="finding-line">${esc(finding.l || '')}</div>
      ${hasDetail ? `<div class="finding-detail">${esc(finding.d)}</div>` : ''}
    </div>
  `;
}

/* ── Actions section ─────────────────────────────────────────── */
function buildActions(actions) {
  if (!actions || !actions.length) return '';
  const items = actions.map((a, i) => `
    <div class="sc-action-item">
      <div class="sc-action-num">${i + 1}.</div>
      <div>${esc(a)}</div>
    </div>
  `).join('');
  return `
    <div class="sc-actions-wrap">
      <div class="sc-actions-label">Recommended Actions</div>
      ${items}
    </div>
  `;
}

/* ── Accent color lookup (matches strand.css :root dark tokens) ──── */
const CARD_ACCENT_COLORS = {
  red:    '#E07875',
  purple: '#B59FD6',
  orange: '#DDA065',
  amber:  '#E5B985',
  green:  '#9BCFAB',
  blue:   '#94A3D9',
  gold:   '#E4B273',
  cyan:   '#92BFC8'
};

/* ── Full category card ──────────────────────────────────────── */
function buildCatCard(key, cat) {
  const bandKey  = cat.band || scoreToBand(cat.score || 0);
  const bandMeta = BAND_META[bandKey] || BAND_META.monitor;
  const hex      = CARD_ACCENT_COLORS[cat.accent] || CARD_ACCENT_COLORS.blue;

  const scoreHTML = `
    <div class="sc-score-row">
      <span class="sc-score-num"
            style="color:${esc(hex)}"
            aria-label="Risk score ${cat.score || 0} out of 100">${cat.score || 0}</span>
      <span class="sc-score-denom">/ 100</span>
      <span class="sc-band-chip ${bandMeta.cls}"
            aria-label="Risk band: ${bandMeta.label}">${bandMeta.label}</span>
    </div>
  `;

  const progressHTML = buildProgressBar(cat.score || 0, hex);
  const summaryHTML  = cat.summary
    ? `<div class="sc-summary">${esc(cat.summary)}</div>`
    : '';
  const chipsHTML    = buildFactorChips(cat.factors);
  const metaHTML     = buildMetaRow(cat.trend, cat.comparison);

  /* Expandable section */
  const fullFactorsHTML = buildFullFactors(cat.factors, cat.methodology);
  const metaExpandHTML  = (cat.trend || cat.comparison)
    ? buildMetaRow(cat.trend, cat.comparison) : '';

  const findingsHTML = (cat.findings || []).map(buildFindingCard).join('');
  const deepHTML = (cat.deep && cat.deep.length)
    ? `<div class="sc-section-label">Clinical Detail</div>
       ${cat.deep.map(buildFindingCard).join('')}`
    : '';
  const actionsHTML = buildActions(cat.actions);

  return `
    <div class="sc-cat-card" data-cat="${esc(key)}"
      role="button" tabindex="0"
      aria-expanded="false"
      aria-label="${esc(cat.title || key)} risk category — click to expand"
      onclick="STRAND_APP.toggleCatNew(this)">
      <div class="sc-accent-bar" style="background:${esc(hex)}" aria-hidden="true"></div>
      <div class="sc-card-inner">
        <div class="sc-card-title-row">
          <h3 class="sc-card-title">${esc(cat.title || key)}</h3>
          <span class="sc-expand-icon" aria-hidden="true">▾</span>
        </div>

        ${scoreHTML}
        ${progressHTML}
        ${summaryHTML}
        ${chipsHTML}
        ${metaHTML}

        <div class="sc-expand" aria-hidden="true">
          ${fullFactorsHTML}
          ${findingsHTML || deepHTML ? `<div class="sc-section-label">Key Findings</div>
            <div class="findings-list" aria-label="Findings for ${esc(cat.title)}">
              ${findingsHTML}
            </div>
            ${deepHTML}` : ''}
          ${actionsHTML}
        </div>
      </div>
    </div>
  `;
}

/* ── Animate progress bars after render ─────────────────────── */
function animateBars() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.sc-bar-fill[data-target-width]').forEach(el => {
      const target = el.getAttribute('data-target-width');
      el.style.width = target;
    });
  });
}

/* ── Main render: upgraded category grid ────────────────────── */
function renderUpgradedCatGrid(container, data) {
  if (!data || !Object.keys(data).length) return;

  const hasNewFormat = Object.values(data).some(cat => cat.band || cat.factors);
  if (!hasNewFormat) return false; /* signal to use legacy renderer */

  const catHTML = Object.entries(data).map(([key, cat]) => buildCatCard(key, cat)).join('');

  container.innerHTML += `
    <div class="sec-header">
      <h2 class="sec-title">Risk Categories</h2>
      <div class="sec-sub">Click a card to expand contributing factors + findings</div>
    </div>
    <div class="sc-cat-grid" role="list" aria-label="Risk category cards">
      ${catHTML}
    </div>
  `;

  animateBars();
  return true;
}

/* ── Toggle expand (for new sc-cat-card) ────────────────────── */
function toggleCatNew(cardEl) {
  const wasExpanded = cardEl.classList.contains('expanded');

  document.querySelectorAll('.sc-cat-card.expanded').forEach(c => {
    c.classList.remove('expanded');
    c.setAttribute('aria-expanded', 'false');
    const exp = c.querySelector('.sc-expand');
    if (exp) exp.setAttribute('aria-hidden', 'true');
  });

  if (!wasExpanded) {
    cardEl.classList.add('expanded');
    cardEl.setAttribute('aria-expanded', 'true');
    const exp = cardEl.querySelector('.sc-expand');
    if (exp) exp.setAttribute('aria-hidden', 'false');
    /* re-trigger bar animation for newly visible bars */
    animateBars();
    if (window.STRAND_APP && window.STRAND_APP.setAppState) {
      window.STRAND_APP.setAppState({ expandedCat: cardEl.dataset.cat });
    }
  }
}

/* ── Public API ──────────────────────────────────────────────── */
window.STRAND_CARDS = {
  renderUpgradedCatGrid,
  toggleCatNew,
  animateBars
};

/* Patch toggleCatNew onto STRAND_APP once DOMContentLoaded fires.
   By that time strand-app.js has been parsed and STRAND_APP exists. */
document.addEventListener('DOMContentLoaded', () => {
  if (window.STRAND_APP) {
    window.STRAND_APP.toggleCatNew = toggleCatNew;
    window.STRAND_APP.accentHex = function(accent) {
      return CARD_ACCENT_COLORS[accent] || CARD_ACCENT_COLORS.blue;
    };
  }
});
