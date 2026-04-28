/* ═══════════════════════════════════════════════════════════════
   STRAND Family Tree — D3 v7 interactive pedigree + variant flow
   Renders into #section-family. Pure D3 + vanilla JS.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

window.STRAND_FAMILY_TREE = (function () {

  /* ── Design tokens — dark theme, matched to strand.css :root ─ */
  const T = {
    bgPanel:    '#2B313D',
    bgPanel2:   '#333A48',
    line:       'rgba(255,255,255,0.06)',
    lineStrong: 'rgba(255,255,255,0.13)',
    brand:      '#E4B273',
    text:       '#F1ECDF',
    textDim:    '#9AA3B8',
    red:        '#E07875',
    purple:     '#B59FD6',
    orange:     '#DDA065',
    amber:      '#E5B985',
    green:      '#9BCFAB',
    blue:       '#94A3D9',
    radiusM:    10,
    shadowSm:   '0 1px 3px rgba(0,0,0,0.25)',
    shadowMd:   '0 4px 14px rgba(0,0,0,0.32)',
    mono:       "'JetBrains Mono', ui-monospace, monospace",
    sans:       "'Geist', ui-sans-serif, system-ui, sans-serif"
  };

  /* ── Family structure ──────────────────────────────────────── */
  var TREE_MEMBERS = [
    { id: 'peggy',    name: 'Peggy Rome',      role: 'Maternal Aunt', age: 76, page: 'peggy.html',         gen: 0, badges: ['MT-H1', 'Lung CA', 'TP53 CG'] },
    { id: 'chad',     name: 'Chad Byars',       role: 'Father',        age: 51, page: 'chad-brainmap.html', gen: 1, badges: ['APOE e3/e4', 'MC1R x4', '9p21 x3'] },
    { id: 'brigitte', name: 'Brigitte Byars',   role: 'Mother',        age: 48, page: 'brigitte.html',      gen: 1, badges: ['NAT2 slow', 'DBH TT', 'B*51'] },
    { id: 'quinn',    name: 'Quinn Byars',      role: 'Proband',       age: 17, page: 'quinn.html',         gen: 2, badges: ['B*51/B*51', 'UNC13D VUS', '9p21 x3'] },
    { id: 'brother',  name: 'Brother Byars',    role: 'Sibling',       age: 21, page: 'brother.html',       gen: 2, badges: ['B*51 (75%)', 'FUT2 AA', 'TNF-a AG'] }
  ];

  var TREE_LINKS = [
    { source: 'chad',     target: 'quinn',   type: 'parent' },
    { source: 'chad',     target: 'brother', type: 'parent' },
    { source: 'brigitte', target: 'quinn',   type: 'parent' },
    { source: 'brigitte', target: 'brother', type: 'parent' },
    { source: 'peggy',    target: 'chad',    type: 'maternal-aunt' },
    { source: 'chad',     target: 'brigitte', type: 'partner' }
  ];

  /* ── Key shared variants ───────────────────────────────────── */
  var SHARED_VARIANTS = [
    { variant: 'HLA-B*51',   from: ['chad', 'brigitte'], to: ['quinn'],            risk: 'high',       note: 'Both carriers; Quinn homozygous' },
    { variant: '9p21 x3',    from: ['chad', 'brigitte'], to: ['quinn'],            risk: 'high',       note: 'Bilateral CAD risk alleles' },
    { variant: 'NAT2 slow',  from: ['brigitte'],         to: ['quinn'],            risk: 'moderate',   note: 'Maternal slow acetylator' },
    { variant: 'APOE e4',    from: ['chad'],             to: ['quinn'],            risk: 'uncertain',  note: 'Unknown if Quinn inherited' },
    { variant: 'MC1R x4',    from: ['chad'],             to: [],                   risk: 'moderate',   note: 'Compound heterozygous (Chad)' },
    { variant: 'MT-H1',      from: ['peggy'],            to: ['chad', 'quinn', 'brother'], risk: 'protective', note: 'Maternal mitochondrial line' }
  ];

  var RISK_COLORS = {
    'high':       T.red,
    'moderate':   T.amber,
    'protective': T.green,
    'uncertain':  T.textDim
  };

  /* ── Tooltip risk summaries (fallback if no live data) ────── */
  var MEMBER_TOOLTIPS = {
    quinn:    { cats: [{ name: 'Immune / BD', score: 78 }, { name: 'Cardiovascular', score: 65 }, { name: 'GI / Gut', score: 70 }] },
    chad:     { cats: [{ name: 'Cardiovascular', score: 72 }, { name: 'Neurological', score: 68 }, { name: 'Cancer', score: 60 }] },
    brigitte: { cats: [{ name: 'Cancer', score: 55 }, { name: 'Cardiovascular', score: 45 }, { name: 'Pharmacogenomics', score: 50 }] },
    brother:  { cats: [{ name: 'Confirmed Variants', score: 100 }, { name: 'Predicted (75%)', score: 75 }, { name: 'Control Value', score: 60 }] },
    peggy:    { cats: [{ name: 'Cancer', score: 70 }, { name: 'Cardiovascular', score: 55 }, { name: 'Maternal Line', score: 80 }] }
  };

  /* ── Layout constants ──────────────────────────────────────── */
  var CARD_W = 170;
  var CARD_H = 120;
  var SVG_W  = 900;
  var SVG_H  = 460;
  var GEN_X  = { 0: 60, 1: 280, 2: 560 };

  var _inited = false;

  /* ── Helpers ───────────────────────────────────────────────── */
  function memberById(id) {
    for (var i = 0; i < TREE_MEMBERS.length; i++) {
      if (TREE_MEMBERS[i].id === id) return TREE_MEMBERS[i];
    }
    return null;
  }

  function memberPos(id) {
    var m = memberById(id);
    if (!m) return { x: 0, y: 0 };
    var genMembers = TREE_MEMBERS.filter(function (t) { return t.gen === m.gen; });
    var idx = 0;
    for (var i = 0; i < genMembers.length; i++) {
      if (genMembers[i].id === id) { idx = i; break; }
    }
    var totalH = genMembers.length * (CARD_H + 40) - 40;
    var startY = (SVG_H - totalH) / 2;
    return {
      x: GEN_X[m.gen],
      y: startY + idx * (CARD_H + 40)
    };
  }

  /* ── Build the pedigree SVG ────────────────────────────────── */
  function buildTree(svgContainer, currentId) {
    var svg = d3.select(svgContainer)
      .append('svg')
      .attr('viewBox', '0 0 ' + SVG_W + ' ' + SVG_H)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('role', 'img')
      .attr('aria-label', 'Byars family pedigree tree')
      .style('width', '100%')
      .style('max-width', SVG_W + 'px')
      .style('height', 'auto')
      .style('display', 'block')
      .style('margin', '0 auto');

    /* Defs — arrow marker + drop shadow */
    var defs = svg.append('defs');
    defs.append('marker')
      .attr('id', 'arrow-parent')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 8).attr('refY', 5)
      .attr('markerWidth', 6).attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L10,5 L0,10 Z')
      .attr('fill', T.lineStrong);

    var filter = defs.append('filter')
      .attr('id', 'card-shadow')
      .attr('x', '-10%').attr('y', '-10%')
      .attr('width', '130%').attr('height', '140%');
    filter.append('feDropShadow')
      .attr('dx', 0).attr('dy', 2)
      .attr('stdDeviation', 6)
      .attr('flood-color', 'rgba(0,0,0,0.45)');

    /* ── Connection lines ────────────────────────────────────── */
    var linkGroup = svg.append('g').attr('class', 'tree-links');

    TREE_LINKS.forEach(function (link) {
      var sp = memberPos(link.source);
      var tp = memberPos(link.target);
      var sx = sp.x + CARD_W;
      var sy = sp.y + CARD_H / 2;
      var tx = tp.x;
      var ty = tp.y + CARD_H / 2;

      if (link.type === 'partner') {
        /* Horizontal double-line between partners */
        var midY = (sy + ty) / 2;
        linkGroup.append('line')
          .attr('x1', sx).attr('y1', sy)
          .attr('x2', tx).attr('y2', ty)
          .attr('stroke', T.brand)
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '6,4')
          .attr('opacity', 0)
          .transition().duration(800).delay(400)
          .attr('opacity', 0.7);

        /* Partnership symbol (=) */
        var cx = (sx + tx) / 2;
        var cy = (sy + ty) / 2;
        linkGroup.append('text')
          .attr('x', cx).attr('y', cy + 4)
          .attr('text-anchor', 'middle')
          .attr('font-family', T.mono)
          .attr('font-size', 14)
          .attr('fill', T.brand)
          .attr('opacity', 0)
          .text('=')
          .transition().duration(600).delay(500)
          .attr('opacity', 0.6);

      } else if (link.type === 'maternal-aunt') {
        /* Dashed line for extended family */
        var path = 'M' + sx + ',' + sy + ' C' + (sx + 60) + ',' + sy + ' ' + (tx - 60) + ',' + ty + ' ' + tx + ',' + ty;
        linkGroup.append('path')
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', T.purple)
          .attr('stroke-width', 1.5)
          .attr('stroke-dasharray', '4,4')
          .attr('opacity', 0)
          .transition().duration(800).delay(300)
          .attr('opacity', 0.5);

        /* Label */
        linkGroup.append('text')
          .attr('x', (sx + tx) / 2)
          .attr('y', (sy + ty) / 2 - 8)
          .attr('text-anchor', 'middle')
          .attr('font-family', T.sans)
          .attr('font-size', 9)
          .attr('fill', T.purple)
          .attr('opacity', 0)
          .text('maternal aunt')
          .transition().duration(600).delay(600)
          .attr('opacity', 0.6);

      } else {
        /* Parent-child: curved path */
        var mx = (sx + tx) / 2;
        var pathD = 'M' + sx + ',' + sy + ' C' + mx + ',' + sy + ' ' + mx + ',' + ty + ' ' + tx + ',' + ty;
        linkGroup.append('path')
          .attr('d', pathD)
          .attr('fill', 'none')
          .attr('stroke', T.lineStrong)
          .attr('stroke-width', 1.5)
          .attr('marker-end', 'url(#arrow-parent)')
          .attr('opacity', 0)
          .transition().duration(700).delay(200)
          .attr('opacity', 0.6);
      }
    });

    /* ── Generation labels ───────────────────────────────────── */
    var genLabels = [
      { gen: 0, label: 'Gen 0' },
      { gen: 1, label: 'Gen 1 — Parents' },
      { gen: 2, label: 'Gen 2 — Children' }
    ];
    genLabels.forEach(function (gl) {
      svg.append('text')
        .attr('x', GEN_X[gl.gen] + CARD_W / 2)
        .attr('y', 24)
        .attr('text-anchor', 'middle')
        .attr('font-family', T.mono)
        .attr('font-size', 10)
        .attr('fill', T.textDim)
        .attr('letter-spacing', '0.05em')
        .text(gl.label);
    });

    /* ── Person cards ────────────────────────────────────────── */
    var cardGroup = svg.append('g').attr('class', 'tree-cards');

    /* Tooltip div (lives in DOM, not SVG) */
    var tooltip = d3.select(svgContainer.parentNode)
      .append('div')
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('background', T.bgPanel)
      .style('border', '1px solid ' + T.lineStrong)
      .style('border-radius', T.radiusM + 'px')
      .style('padding', '10px 14px')
      .style('font-family', T.sans)
      .style('font-size', '12px')
      .style('color', T.text)
      .style('box-shadow', T.shadowMd)
      .style('opacity', 0)
      .style('z-index', 100)
      .style('transition', 'opacity 0.15s ease');

    TREE_MEMBERS.forEach(function (m, i) {
      var pos = memberPos(m.id);
      var isCurrent = m.id === currentId;

      var g = cardGroup.append('g')
        .attr('class', 'tree-card')
        .attr('transform', 'translate(' + pos.x + ',' + pos.y + ')')
        .style('cursor', 'pointer')
        .attr('opacity', 0);

      /* Entrance animation */
      g.transition()
        .duration(500)
        .delay(100 + i * 100)
        .attr('opacity', 1);

      /* Card background */
      g.append('rect')
        .attr('width', CARD_W)
        .attr('height', CARD_H)
        .attr('rx', T.radiusM)
        .attr('ry', T.radiusM)
        .attr('fill', T.bgPanel)
        .attr('stroke', isCurrent ? T.brand : T.line)
        .attr('stroke-width', isCurrent ? 2.5 : 1)
        .attr('filter', 'url(#card-shadow)');

      /* Current person indicator */
      if (isCurrent) {
        g.append('rect')
          .attr('x', 0).attr('y', 0)
          .attr('width', CARD_W)
          .attr('height', 4)
          .attr('rx', T.radiusM)
          .attr('fill', T.brand);
      }

      /* Name */
      g.append('text')
        .attr('x', 14).attr('y', 28)
        .attr('font-family', T.sans)
        .attr('font-weight', 600)
        .attr('font-size', 13)
        .attr('fill', T.text)
        .text(m.name);

      /* Role + age */
      g.append('text')
        .attr('x', 14).attr('y', 44)
        .attr('font-family', T.sans)
        .attr('font-size', 10)
        .attr('fill', T.textDim)
        .text(m.role + ' · ' + m.age);

      /* Badges */
      var badgeY = 62;
      (m.badges || []).forEach(function (badge, bi) {
        var badgeG = g.append('g')
          .attr('transform', 'translate(14,' + (badgeY + bi * 18) + ')');

        badgeG.append('rect')
          .attr('width', CARD_W - 28)
          .attr('height', 15)
          .attr('rx', 4)
          .attr('fill', T.bgPanel2);

        badgeG.append('text')
          .attr('x', 6).attr('y', 11)
          .attr('font-family', T.mono)
          .attr('font-size', 9)
          .attr('fill', T.textDim)
          .text(badge);
      });

      /* Click handler — navigate */
      g.on('click', function () {
        window.location.href = m.page;
      });

      /* Hover — tooltip */
      g.on('mouseenter', function (event) {
        var tips = MEMBER_TOOLTIPS[m.id];
        if (!tips) return;

        var html = '<div style="font-weight:600;margin-bottom:6px">' + m.name + '</div>';
        tips.cats.forEach(function (cat) {
          var color = cat.score >= 70 ? T.red : (cat.score >= 50 ? T.amber : T.green);
          html += '<div style="display:flex;align-items:center;gap:6px;margin:3px 0">';
          html += '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + color + '"></span>';
          html += '<span>' + cat.name + '</span>';
          html += '<span style="margin-left:auto;font-family:' + T.mono + ';font-size:11px;color:' + color + '">' + cat.score + '</span>';
          html += '</div>';
        });

        tooltip.html(html);

        /* Position near the card */
        var svgRect = svgContainer.getBoundingClientRect();
        var containerRect = svgContainer.parentNode.getBoundingClientRect();
        var scaleX = svgRect.width / SVG_W;
        var scaleY = svgRect.height / SVG_H;
        var cardScreenX = svgRect.left - containerRect.left + pos.x * scaleX + CARD_W * scaleX + 10;
        var cardScreenY = svgRect.top - containerRect.top + pos.y * scaleY;

        /* If tooltip would overflow right, flip left */
        if (cardScreenX + 180 > containerRect.width) {
          cardScreenX = svgRect.left - containerRect.left + pos.x * scaleX - 190;
        }

        tooltip
          .style('left', cardScreenX + 'px')
          .style('top', cardScreenY + 'px')
          .style('opacity', 1);
      });

      g.on('mouseleave', function () {
        tooltip.style('opacity', 0);
      });

      /* Hover card highlight */
      g.on('mouseenter.highlight', function () {
        g.select('rect').transition().duration(150)
          .attr('stroke', isCurrent ? T.brand : T.blue)
          .attr('stroke-width', isCurrent ? 3 : 2);
      });
      g.on('mouseleave.highlight', function () {
        g.select('rect').transition().duration(150)
          .attr('stroke', isCurrent ? T.brand : T.line)
          .attr('stroke-width', isCurrent ? 2.5 : 1);
      });
    });
  }

  /* ── Variant Flow Section ──────────────────────────────────── */
  function buildVariantFlow(container) {
    var flowDiv = document.createElement('div');
    flowDiv.style.marginTop = '28px';
    container.appendChild(flowDiv);

    /* Sub-header */
    var subHeader = document.createElement('div');
    subHeader.className = 'sec-header';
    subHeader.style.marginBottom = '14px';
    subHeader.innerHTML = '<h3 class="sec-title" style="font-size:12px">Variant Inheritance Flow</h3>';
    flowDiv.appendChild(subHeader);

    var flowSvgWrap = document.createElement('div');
    flowSvgWrap.style.position = 'relative';
    flowDiv.appendChild(flowSvgWrap);

    var FLOW_W = 860;
    var ROW_H = 36;
    var FLOW_H = SHARED_VARIANTS.length * ROW_H + 50;
    var NAME_COL = 140;

    /* Compute x positions for each member in the flow diagram */
    var flowMembers = ['peggy', 'chad', 'brigitte', 'quinn', 'brother'];
    var memberX = {};
    var colStart = NAME_COL + 30;
    var colSpacing = (FLOW_W - colStart - 40) / (flowMembers.length - 1);
    flowMembers.forEach(function (id, i) {
      memberX[id] = colStart + i * colSpacing;
    });

    var svg = d3.select(flowSvgWrap)
      .append('svg')
      .attr('viewBox', '0 0 ' + FLOW_W + ' ' + FLOW_H)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('role', 'img')
      .attr('aria-label', 'Variant inheritance flow between family members')
      .style('width', '100%')
      .style('max-width', FLOW_W + 'px')
      .style('height', 'auto')
      .style('display', 'block');

    /* Column headers */
    var headerNames = { peggy: 'Peggy', chad: 'Chad', brigitte: 'Brigitte', quinn: 'Quinn', brother: 'Brother' };
    flowMembers.forEach(function (id) {
      svg.append('text')
        .attr('x', memberX[id])
        .attr('y', 16)
        .attr('text-anchor', 'middle')
        .attr('font-family', T.sans)
        .attr('font-size', 11)
        .attr('font-weight', 600)
        .attr('fill', T.text)
        .text(headerNames[id]);

      /* Column dot */
      svg.append('circle')
        .attr('cx', memberX[id])
        .attr('cy', 28)
        .attr('r', 3)
        .attr('fill', T.lineStrong);
    });

    /* Variant label column header */
    svg.append('text')
      .attr('x', 14)
      .attr('y', 16)
      .attr('font-family', T.mono)
      .attr('font-size', 10)
      .attr('fill', T.textDim)
      .text('VARIANT');

    /* Rows */
    SHARED_VARIANTS.forEach(function (v, ri) {
      var y = 50 + ri * ROW_H;
      var color = RISK_COLORS[v.risk] || T.textDim;

      /* Alternating row bg */
      if (ri % 2 === 0) {
        svg.append('rect')
          .attr('x', 0).attr('y', y - 12)
          .attr('width', FLOW_W).attr('height', ROW_H)
          .attr('fill', T.bgPanel2)
          .attr('opacity', 0.5);
      }

      /* Variant name */
      svg.append('text')
        .attr('x', 14).attr('y', y + 4)
        .attr('font-family', T.mono)
        .attr('font-size', 11)
        .attr('font-weight', 500)
        .attr('fill', color)
        .text(v.variant);

      /* Risk badge */
      var badgeLabel = v.risk === 'high' ? 'HIGH' : v.risk === 'moderate' ? 'MOD' : v.risk === 'protective' ? 'PROT' : '?';
      var badgeW = badgeLabel.length * 7 + 10;
      svg.append('rect')
        .attr('x', 105).attr('y', y - 8)
        .attr('width', badgeW).attr('height', 16)
        .attr('rx', 4)
        .attr('fill', color)
        .attr('opacity', 0.15);
      svg.append('text')
        .attr('x', 105 + badgeW / 2).attr('y', y + 4)
        .attr('text-anchor', 'middle')
        .attr('font-family', T.mono)
        .attr('font-size', 8)
        .attr('font-weight', 600)
        .attr('fill', color)
        .text(badgeLabel);

      /* Dots for each member involved */
      var allInvolved = v.from.concat(v.to);
      flowMembers.forEach(function (id) {
        if (allInvolved.indexOf(id) >= 0) {
          svg.append('circle')
            .attr('cx', memberX[id])
            .attr('cy', y)
            .attr('r', 5)
            .attr('fill', color)
            .attr('opacity', 0)
            .transition().duration(400).delay(ri * 80)
            .attr('opacity', 0.85);
        } else {
          /* Faint placeholder dot */
          svg.append('circle')
            .attr('cx', memberX[id])
            .attr('cy', y)
            .attr('r', 2)
            .attr('fill', T.line);
        }
      });

      /* Flow arrows: from → to */
      v.from.forEach(function (fromId) {
        v.to.forEach(function (toId) {
          var x1 = memberX[fromId];
          var x2 = memberX[toId];
          /* Arrow line */
          svg.append('line')
            .attr('x1', x1 + 7).attr('y1', y)
            .attr('x2', x2 - 7).attr('y2', y)
            .attr('stroke', color)
            .attr('stroke-width', 1.5)
            .attr('stroke-dasharray', '4,3')
            .attr('opacity', 0)
            .transition().duration(500).delay(ri * 80 + 100)
            .attr('opacity', 0.5);

          /* Arrowhead */
          var dir = x2 > x1 ? 1 : -1;
          svg.append('polygon')
            .attr('points', function () {
              var ax = x2 - dir * 7;
              return (ax) + ',' + (y - 3) + ' ' + (ax + dir * 5) + ',' + y + ' ' + (ax) + ',' + (y + 3);
            })
            .attr('fill', color)
            .attr('opacity', 0)
            .transition().duration(400).delay(ri * 80 + 200)
            .attr('opacity', 0.5);
        });
      });

      /* Note on hover — via title element */
      svg.append('title').text(v.variant + ': ' + v.note);
    });

    /* Legend */
    var legendY = FLOW_H - 16;
    var legendItems = [
      { label: 'High Risk', color: T.red },
      { label: 'Moderate', color: T.amber },
      { label: 'Protective', color: T.green },
      { label: 'Uncertain', color: T.textDim }
    ];
    legendItems.forEach(function (item, i) {
      var lx = 14 + i * 120;
      svg.append('circle')
        .attr('cx', lx).attr('cy', legendY)
        .attr('r', 4).attr('fill', item.color);
      svg.append('text')
        .attr('x', lx + 10).attr('y', legendY + 4)
        .attr('font-family', T.sans)
        .attr('font-size', 10)
        .attr('fill', T.textDim)
        .text(item.label);
    });
  }

  /* ── Public init ───────────────────────────────────────────── */
  function init(container, person) {
    if (_inited) return;
    _inited = true;

    var currentId = (person && person.id) || (window.STRAND_PERSON && window.STRAND_PERSON.id) || '';

    /* Clear container */
    container.innerHTML = '';

    /* Section header */
    var header = document.createElement('div');
    header.className = 'sec-header';
    header.innerHTML = '<h2 class="sec-title">Family Tree · Variant Inheritance</h2>';
    container.appendChild(header);

    /* Tree wrapper (relative for tooltip positioning) */
    var treeWrap = document.createElement('div');
    treeWrap.className = 'panel';
    treeWrap.style.position = 'relative';
    treeWrap.style.padding = '20px 16px';
    treeWrap.style.background = 'var(--bg-panel, ' + T.bgPanel + ')';
    treeWrap.style.borderRadius = T.radiusM + 'px';
    treeWrap.style.border = '1px solid ' + T.line;
    container.appendChild(treeWrap);

    /* Build D3 pedigree */
    buildTree(treeWrap, currentId);

    /* Variant flow panel */
    var flowPanel = document.createElement('div');
    flowPanel.className = 'panel';
    flowPanel.style.marginTop = '16px';
    flowPanel.style.padding = '20px 16px';
    flowPanel.style.background = 'var(--bg-panel, ' + T.bgPanel + ')';
    flowPanel.style.borderRadius = T.radiusM + 'px';
    flowPanel.style.border = '1px solid ' + T.line;
    container.appendChild(flowPanel);

    buildVariantFlow(flowPanel);

    /* Try to enrich tooltips from live data files */
    enrichTooltipsFromData();
  }

  /* ── Enrich tooltip data from loaded person data ───────────── */
  function enrichTooltipsFromData() {
    var person = window.STRAND_PERSON;
    if (!person || !person.data || !person.id) return;

    var cats = [];
    var data = person.data;
    Object.keys(data).forEach(function (key) {
      var cat = data[key];
      if (cat && cat.title && typeof cat.score === 'number') {
        cats.push({ name: cat.title, score: cat.score });
      }
    });
    if (cats.length > 0) {
      MEMBER_TOOLTIPS[person.id] = { cats: cats.slice(0, 4) };
    }
  }

  return { init: init };
})();
