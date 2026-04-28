/* ═══════════════════════════════════════════════════════════════
   STRAND Data — Chad Byars, M.D.
   Extracted from chad-brainmap.html inline JS data object.
   ═══════════════════════════════════════════════════════════════ */

window.STRAND_PERSON = {
  id:       'chad',
  name:     'Chad Byars',
  fullName: 'Chad Byars, M.D.',
  role:     'Father',
  age:      51,
  dob:      null,
  location: 'Portland, OR',

  badges: ['APOE ε3/ε4', 'MC1R x4', '9p21 x3', 'PITX2 CT', 'CYP1A2 Fast'],

  vitals: [
    { label: 'SNPs',      value: '614,452', sub: '23andMe v5',         accent: 'blue'   },
    { label: 'Variants',  value: '171',     sub: 'Analyzed',            accent: 'gold'   },
    { label: 'Haplogroup',value: 'H1',      sub: 'MT maternal line',    accent: 'green'  },
    { label: 'APOE',      value: 'ε3/ε4',  sub: 'Alzheimer\'s risk',   accent: 'red'    },
    { label: 'MC1R',      value: 'x4',      sub: '91st %ile melanoma',  accent: 'orange' }
  ],

  data: {
    cv: {
      title:       'Cardiovascular',
      accent:      'red',
      score:       72,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     '9p21 ×3 bilateral + PITX2 AFib + family history: stent 62, CABG 75',
      methodology: 'Score combines: inherited risk alleles (50%), family history severity (30%), modifiable factors (20%). Father CABG at 75 elevates baseline significantly.',
      factors: [
        { name: '9p21 ×3 — all three loci',  delta: +12, note: 'rs10757278 AG, rs1333049 CG, rs4977574 AG' },
        { name: 'Family: stent 62, CABG 75',  delta: +8,  note: 'Father\'s CAD is predictive of same trajectory' },
        { name: 'PITX2 AFib — CT',            delta: +5,  note: 'Sister has PAF; alcohol >3/week multiplicative' },
        { name: 'IL-6 CC — highest producer', delta: +5,  note: 'Chronic inflammatory drive; accelerates atherogenesis' },
        { name: 'PCSK9 pathway variant',      delta: +4,  note: 'Candidate for PCSK9 inhibitors if LDL elevated' },
        { name: 'Factor V Leiden — clear',    delta: -5,  note: 'CC both parents; no thrombotic risk added' },
        { name: 'Mediterranean diet feasible',delta: -7,  note: '>80% adherence eliminates 9p21 MI risk (INTERHEART P=0.008)' }
      ],
      trend:      { dir: 'stable', note: 'No known recent cardiac events; CAC score not yet done' },
      comparison: { label: 'vs 51M general population', value: '+1.8 SD; family history elevates significantly' },
      status: 'Elevated',
      findings: [
        {
          g: 'AG AG CG', c: 'f-red',
          n: '9p21 CAD Risk — All Three Loci',
          l: 'Father: stent 62, CABG 75. Mediterranean diet eliminates 9p21 MI risk at >80% adherence.',
          d: 'Three independent 9p21 signals (rs10757278 AG, rs1333049 CG, rs4977574 AG). INTERHEART study showed Mediterranean diet completely eliminates associated MI risk (P=0.008). Both parents carry all three — bilateral. CAC score is the definitive next step for risk stratification.'
        },
        {
          g: 'CT', c: 'f-red',
          n: 'PITX2 Atrial Fibrillation',
          l: 'Sister has paroxysmal AFib. Alcohol multiplicative with genetic risk.',
          d: 'PITX2 is the strongest AFib locus. CT = OR ~1.5-1.8×. Both parents carry CT — bilateral. Alcohol >3 drinks/week multiplicatively amplifies risk. Annual EKG + echocardiogram recommended.'
        },
        {
          g: 'CT', c: 'f-amber',
          n: 'PCSK9 Pathway Variant',
          l: 'Precision therapy candidate if LDL stays elevated.',
          d: 'Combined with 9p21 ×3, candidate for PCSK9 inhibitors (evolocumab/alirocumab). Quinn Rhythm labs: LDL 142 + ApoB 103.'
        }
      ],
      deep: [
        { g: 'CC', c: 'f-green',  n: 'Factor V Leiden',  l: 'No clotting risk. Both parents CC.' },
        { g: 'CC', c: 'f-amber',  n: 'IL-6 Highest Producer', l: 'Chronic inflammatory drive. Anti-inflammatory diet critical.' },
        { g: 'AG', c: 'f-amber',  n: 'ACE I/D',          l: 'Moderate ACE activity. Standard dosing.' },
        { g: 'AG', c: 'f-amber',  n: 'AGT M235T',        l: 'Intermediate salt sensitivity.' },
        { g: 'AG', c: 'f-amber',  n: 'NOS3 Nitric Oxide',l: 'Moderate NO production. Beet juice may help.' },
        { g: 'AG', c: 'f-amber',  n: 'CETP HDL',         l: 'Moderate HDL effect.' },
        { g: 'CC', c: 'f-green',  n: 'MTHFR Homocysteine',l: 'Managed with methylfolate supplementation.' }
      ],
      actions: [
        'CAC score — baseline coronary calcium assessment',
        'Mediterranean diet >80% adherence (eliminates 9p21 MI risk)',
        'Annual EKG + echocardiogram for PITX2 AFib surveillance'
      ]
    },

    nr: {
      title:       'Neurological',
      accent:      'purple',
      score:       68,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     'APOE ε3/ε4 + father dementia — 2–3× Alzheimer\'s risk; lifestyle-reversible',
      methodology: 'Score combines: APOE genotype (45%), family neuro history (30%), modifiable lifestyle factors (25%). APOE ε4 alone shifts baseline to 60+.',
      factors: [
        { name: 'APOE ε3/ε4 — 2–3× risk',  delta: +14, note: 'Father developed dementia; eligible for lecanemab/donanemab' },
        { name: 'BDNF Val66Met — CT',       delta: +5,  note: 'Reduced activity-dependent BDNF; exercise compensates' },
        { name: 'COMT Val/Met — balanced',  delta: -3,  note: 'Neither extreme; intermediate working memory + stress' },
        { name: 'Exercise 5–6 h/week',      delta: -8,  note: 'APOE4 risk reduction doubles non-carrier benefit' },
        { name: 'OXTR AG — high empathy',   delta: 0,   note: 'Neutral; strong social cognition' }
      ],
      trend:      { dir: 'stable', note: 'No cognitive symptoms; U.S. POINTER trial validated lifestyle reversal' },
      comparison: { label: 'vs 51M APOE ε4 carriers', value: 'Lifestyle-optimized ε4 carriers approach ε3/ε3 risk' },
      status: 'Monitor',
      findings: [
        {
          g: 'ε3/ε4', c: 'f-red',
          n: 'APOE Alzheimer\'s Risk',
          l: '2-3× increased risk. Father developed dementia.',
          d: 'APOE ε3/ε4 heterozygous. Exercise reduces risk by 45% (doubles non-carrier benefit). Eligible for lecanemab/donanemab. U.S. POINTER trial (JAMA 2025) validated lifestyle intervention.'
        },
        {
          g: 'AG', c: 'f-purple',
          n: 'COMT Val/Met',
          l: 'Balanced dopamine clearance. Intermediate stress response.',
          d: 'Neither warrior (Val/Val) nor worrier (Met/Met). Balanced working memory and stress resilience. Brigitte is Met/Met — Quinn guaranteed at least one Met allele.'
        },
        {
          g: 'CT', c: 'f-amber',
          n: 'BDNF Val66Met',
          l: 'Reduced activity-dependent BDNF. Exercise compensation effective.',
          d: 'Met carriers have lower baseline BDNF secretion but greater relative neuroplastic response to intervention. Exercise-induced BDNF release compensates.'
        }
      ],
      deep: [
        { g: 'AG', c: 'f-purple', n: 'OXTR Empathy',     l: 'High social cognition. Stronger emotional resonance.' },
        { g: 'AG', c: 'f-amber',  n: 'DRD2 Dopamine Receptor', l: 'Normal receptor density. Low addiction vulnerability.' },
        { g: 'AG', c: 'f-amber',  n: 'SLC6A4 Serotonin', l: 'Intermediate reuptake. Moderate SSRI response.' },
        { g: 'AG', c: 'f-amber',  n: 'CLOCK Circadian',  l: 'Mild evening chronotype tendency.' }
      ],
      actions: [
        '5-6 hrs/week exercise (APOE4 risk reduction doubles non-carriers)',
        '7-8 hours sleep minimum (glymphatic amyloid clearance)',
        'Omega-3 DHA 2g daily (APOE4 neuroinflammation)'
      ]
    },

    ca: {
      title:       'Cancer Risk',
      accent:      'orange',
      score:       91,
      band:        'high-risk',
      bandLabel:   'High Risk',
      summary:     'MC1R ×4 compound (91st %ile melanoma) + family: mother lung CA, aunt breast CA 33',
      methodology: 'Score combines: compound high-penetrance variants (55%), family cancer cluster (30%), screening status (15%). MC1R ×4 compound alone places baseline at 80+.',
      factors: [
        { name: 'MC1R ×4 compound',        delta: +18, note: '91st percentile melanoma; R151C Celtic + R160W + D84E + R142H' },
        { name: 'Family: 2 lung CAs same MT',delta: +12, note: 'Mother + Peggy both lung CA; annual low-dose CT from age 50' },
        { name: 'FGFR2 AG breast locus',   delta: +6,  note: 'Aunt breast CA age 33; consider BRCA full sequencing' },
        { name: 'TP53 CG codon 72',        delta: +5,  note: 'From Brigitte; modified apoptotic pathway' },
        { name: 'BRCA1/2 — chip normal',   delta: -5,  note: 'No pathogenic variants on array; full seq recommended' },
        { name: '8q24 AG multi-cancer',    delta: +5,  note: 'Prostate + other cancer locus; PSA from age 45' }
      ],
      trend:      { dir: 'stable', note: 'Annual derm exam mandatory; LDCT chest at 50 for lung surveillance' },
      comparison: { label: 'vs 51M general population', value: 'MC1R ×4 = 91st percentile skin cancer risk' },
      status: 'Elevated',
      findings: [
        {
          g: 'CT ×4', c: 'f-red',
          n: 'MC1R Compound — 4 Variants',
          l: '91st percentile melanoma. Annual full-body derm exam mandatory.',
          d: 'R151C Celtic variant + R160W + D84E + R142H. Compound MC1R dramatically increases melanoma risk independent of sun exposure. Annual dermoscopy with full body mapping.'
        },
        {
          g: 'AG', c: 'f-amber',
          n: 'FGFR2 Breast Cancer',
          l: 'Family: aunt breast cancer at 33. Enhanced screening.',
          d: 'Heterozygous risk allele. Mother lung cancer age 75. Aunt breast cancer age 33. Consider BRCA full sequencing given family history.'
        },
        {
          g: 'CG', c: 'f-amber',
          n: 'TP53 Codon 72',
          l: 'Modified p53 apoptotic function.',
          d: 'Heterozygous. Carrier from Brigitte. Modified apoptotic pathway efficiency.'
        }
      ],
      deep: [
        { g: 'CC', c: 'f-green',  n: 'BRCA1/2',        l: 'No pathogenic variants on chip. Full sequencing recommended.' },
        { g: 'AG', c: 'f-amber',  n: '8q24 Prostate',  l: 'PSA screening from age 45.' },
        { g: 'AG', c: 'f-amber',  n: 'TERT Telomerase',l: 'Modified telomere maintenance.' }
      ],
      actions: [
        'Annual full-body dermatology exam with dermoscopy',
        'Daily SPF 50+ — reapply every 2 hours outdoors',
        'Enhanced breast/prostate screening given family history'
      ]
    },

    dr: {
      title:       'Drug Response',
      accent:      'amber',
      score:       45,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'CYP2C9*2 + CYP2C19*2 intermediate — avoid clopidogrel; no warfarin without IWPC dosing',
      methodology: 'Score reflects pharmacogenomic complexity. Lower score = fewer actionable interactions. Absolute prescribing contraindications count +15 each.',
      factors: [
        { name: 'CYP2C9 *1/*2 intermediate', delta: +10, note: 'Reduce NSAID doses; IWPC algorithm if anticoagulation needed' },
        { name: 'CYP2C19 *1/*2 intermediate',delta: +8,  note: 'Clopidogrel prodrug inadequate; use prasugrel/ticagrelor' },
        { name: 'SLCO1B1 CT statin transport',delta: +5,  note: 'Monitor for statin myopathy; start at low dose' },
        { name: 'CYP1A2 *1F/*1F ultra-rapid', delta: -8,  note: '400mg/day caffeine tolerated; no CV risk at moderate intake' },
        { name: 'DPYD + TPMT — normal',       delta: -5,  note: '5-FU and thiopurines safe at standard doses' },
        { name: 'NAT2 fast — normal',         delta: -5,  note: 'Standard isoniazid/dapsone dosing; no accumulation risk' }
      ],
      trend:      { dir: 'stable', note: 'No new drug reactions; carry PGx card before any procedure' },
      comparison: { label: 'vs general PGx population', value: '2 moderate gene–drug interactions on common medications' },
      status: '4 Alerts',
      findings: [
        {
          g: '*1/*2', c: 'f-amber',
          n: 'CYP2C9 NSAID/Anticoagulant',
          l: 'Intermediate metabolizer. Reduce NSAID doses ~25%.',
          d: 'CYP2C9 *1/*2 = slower metabolism of NSAIDs, certain anticoagulants. If anticoagulation needed, use IWPC dosing algorithm. Do not use standard warfarin dosing.'
        },
        {
          g: '*1/*2', c: 'f-amber',
          n: 'CYP2C19 Clopidogrel',
          l: 'Reduced activation. Use prasugrel or ticagrelor instead.',
          d: 'Intermediate metabolizer. Clopidogrel is a prodrug requiring CYP2C19 activation. *1/*2 = inadequate conversion. Prasugrel or ticagrelor preferred.'
        },
        {
          g: '*1F/*1F', c: 'f-green',
          n: 'CYP1A2 Caffeine',
          l: 'Ultra-rapid metabolizer. 400mg/day tolerated.',
          d: 'Homozygous ultra-rapid. Caffeine cleared quickly. No cardiovascular risk from moderate intake.'
        }
      ],
      deep: [
        { g: 'CC',  c: 'f-green',  n: 'DPYD 5-Fluorouracil',   l: 'Normal. 5-FU safe at standard doses.' },
        { g: 'CC',  c: 'f-green',  n: 'TPMT Azathioprine',     l: 'Normal. Thiopurines safe.' },
        { g: 'CT',  c: 'f-amber',  n: 'SLCO1B1 Statin Transport', l: 'Monitor for statin myopathy. Start low.' },
        { g: 'AA',  c: 'f-green',  n: 'NAT2 Acetylator',       l: 'Rapid. Standard dosing for INH, dapsone.' }
      ],
      actions: [
        'Carry PGx card — show before any new prescription',
        'CYP2C9*2: lower NSAID doses, IWPC for anticoagulants',
        'CYP2C19*2: avoid clopidogrel — use prasugrel/ticagrelor'
      ]
    },

    mt: {
      title:       'Metabolism',
      accent:      'green',
      score:       52,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'MTHFR compound het + FUT2 non-secretor + VDR — supplementation protocol required',
      methodology: 'Score combines: methylation pathway status (40%), micronutrient absorption variants (35%), gut absorption genetics (25%). MTHFR compound reduces baseline methylation ~50%.',
      factors: [
        { name: 'MTHFR compound het',      delta: +10, note: 'C677T + A1298C; ~50% reduced methylation; methylfolate only' },
        { name: 'FUT2 AA non-secretor',    delta: +8,  note: 'Serum B12 falsely normal; check MMA + homocysteine' },
        { name: 'VDR BsmI CT',             delta: +5,  note: 'Reduced receptor expression; need 5000 IU/day D3' },
        { name: 'FADS1 AG omega-3',        delta: +3,  note: 'Moderate ALA-to-DHA conversion; supplement preformed DHA' },
        { name: 'LCT — lactase persistent',delta: -5,  note: 'Full dairy tolerance; no absorption compromise' },
        { name: 'FTO TT — no obesity risk',delta: -5,  note: 'Normal baseline metabolic rate' }
      ],
      trend:      { dir: 'stable', note: 'On methylfolate protocol; Vitamin D3 5000 IU; homocysteine pending' },
      comparison: { label: 'vs 51M general population', value: 'MTHFR compound het in ~10% of population' },
      status: 'Moderate',
      findings: [
        {
          g: 'AG GT', c: 'f-amber',
          n: 'MTHFR Compound',
          l: 'C677T + A1298C = ~50% reduced methylation.',
          d: 'Use methylfolate 800mcg, not folic acid. Compound heterozygosity reduces total MTHFR function to approximately 50%. Homocysteine monitoring recommended quarterly.'
        },
        {
          g: 'AA', c: 'f-amber',
          n: 'FUT2 Non-Secretor — B12',
          l: 'Serum B12 may be falsely normal. Check MMA.',
          d: 'FUT2 non-secretor: impaired cellular B12 transport. Serum levels can appear normal while cells are deficient. MMA + homocysteine are the true markers.'
        },
        {
          g: 'CT', c: 'f-amber',
          n: 'VDR BsmI — Vitamin D',
          l: 'Reduced receptor expression. Target 50-60 ng/mL.',
          d: 'Higher vitamin D requirement. Quinn level 26.5 confirms genetic prediction. Need 5000 IU/day.'
        }
      ],
      deep: [
        { g: 'CT', c: 'f-green',  n: 'LCT Lactase Persistence', l: 'Full lactose tolerance.' },
        { g: 'AG', c: 'f-amber',  n: 'FADS1 Omega-3',           l: 'Moderate conversion. Supplement preformed DHA.' },
        { g: 'AG', c: 'f-amber',  n: 'BCMO1 Vitamin A',         l: 'Reduced beta-carotene conversion.' }
      ],
      actions: [
        'Methylfolate 800mcg daily (not folic acid)',
        'Vitamin D3 5000 IU daily (target 50-60 ng/mL)',
        'MMA + homocysteine to verify B12 status'
      ]
    },

    lg: {
      title:       'Longevity',
      accent:      'blue',
      score:       60,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     'APOE ε4 + FOXO3 TT + IL-6 CC — lifestyle intervention critical; +2.3 bio-age gap estimated',
      methodology: 'Score combines: aging-pathway genetics (50%), modifiable health behaviors (30%), chronic disease burden (20%). FOXO3 TT means no longevity bonus; lifestyle carries full weight.',
      factors: [
        { name: 'APOE ε4 accelerated aging',  delta: +12, note: 'Associated with shorter healthspan; exercise reverses 45%' },
        { name: 'FOXO3 TT — no longevity allele',delta: +8, note: 'Baseline aging rate; AMPK activation via exercise compensates' },
        { name: 'IL-6 CC — inflammaging',      delta: +8,  note: 'Highest inflammatory drive; accelerates biological aging' },
        { name: 'Exercise 5–6 h/week',         delta: -10, note: 'APOE4 risk reduction doubles; FOXO3/AMPK activation' },
        { name: 'SIRT1 AG moderate',           delta: +2,  note: 'NAD+ precursors (NMN/NR) may amplify sirtuin activity' }
      ],
      trend:      { dir: 'improving', note: 'Bio age estimated +2.3 years; full protocol reduces to -0.8 projected' },
      comparison: { label: 'vs 51M lifestyle-optimized APOE4 cohort', value: 'Full protocol = near-median longevity outcome' },
      status: 'Monitor',
      findings: [
        {
          g: 'ε3/ε4', c: 'f-red',
          n: 'APOE ε4 Accelerated Aging',
          l: 'U.S. POINTER trial validated lifestyle reversal.',
          d: 'Associated with shorter health span. Exercise + diet can reverse this. FOXO3 TT = no longevity allele, making lifestyle interventions more critical.'
        },
        {
          g: 'TT', c: 'f-amber',
          n: 'FOXO3 No Longevity Allele',
          l: 'Compensate with AMPK activation via exercise.',
          d: 'TT = baseline aging rate. No protective FOXO3 variant. AMPK-activating interventions (exercise, fasting, metformin candidate) compensate.'
        },
        {
          g: 'AG', c: 'f-amber',
          n: 'TERT Telomerase',
          l: 'Moderate telomere maintenance. Omega-3 supports length.',
          d: 'Heterozygous. Moderate telomere maintenance capacity.'
        }
      ],
      deep: [
        { g: 'CC', c: 'f-amber', n: 'IL-6 Inflammaging', l: 'Highest producer. Accelerates biological aging.' },
        { g: 'AG', c: 'f-amber', n: 'SIRT1',             l: 'Moderate sirtuin activity. NAD+ precursors may help.' }
      ],
      actions: [
        'Bio age +2.3y → -0.8 with full protocol',
        'Exercise 5-6 hrs/week (FOXO3 activation via AMPK)',
        'Consider NMN/NR for NAD+ support'
      ]
    }
  },

  alert: null,

  meds: [],

  alerts: [
    { level: 'block', text: 'CYP2C9*2: Reduce NSAID doses. IWPC algorithm if anticoagulation needed.' },
    { level: 'block', text: 'CYP2C19*2: Clopidogrel reduced efficacy. Use prasugrel/ticagrelor.' },
    { level: 'warn',  text: 'MTHFR compound: Methylfolate only. Monitor homocysteine.' },
    { level: 'warn',  text: 'FUT2 non-secretor: Serum B12 may be falsely normal. Check MMA.' }
  ],

  labs: [],

  doctor: {
    subtitle: 'Pharmacogenomic Profile',
    badge: 'PGx ALERT',
    pgx: [
      { label: 'CYP2C9',   value: '*1/*2 Intermediate' },
      { label: 'CYP2C19',  value: '*1/*2 Intermediate' },
      { label: 'CYP1A2',   value: '*1F/*1F Ultra-Rapid' },
      { label: 'DPYD',     value: 'Normal' },
      { label: 'TPMT',     value: 'Normal' },
      { label: 'Factor V', value: 'CC No Leiden' }
    ],
    risks: [
      { label: 'CAD (9p21)',      value: '3/3 alleles. Father CABG',      alert: true },
      { label: 'AFib (PITX2)',    value: 'CT carrier. Sister PAF',         alert: true },
      { label: 'Alzheimer (APOE)',value: 'ε3/ε4',                          alert: true },
      { label: 'Melanoma (MC1R)', value: '4 variants compound',            alert: true },
      { label: 'HLA-B*51',        value: 'Homozygous' }
    ],
    sections: [
      {
        title: 'Carrier Status',
        rows: [
          { label: 'HFE H63D', value: 'Het carrier' },
          { label: 'MTHFR',    value: 'Compound het' }
        ]
      }
    ],
    alerts: [
      { text: 'CYP2C9*2: Reduce NSAID doses. IWPC algorithm if anticoagulation needed.' },
      { text: 'CYP2C19*2: Clopidogrel reduced efficacy. Use prasugrel/ticagrelor.' },
      { text: 'MTHFR compound: Methylfolate only. Monitor homocysteine.' },
      { text: 'FUT2 non-secretor: Serum B12 may be falsely normal. Check MMA.' }
    ]
  },

  inheritance: {
    'Cardiovascular': ['9p21 x3', 'PITX2 CT', 'PCSK9 CT', 'IL-6 CC', 'NOS3 AG', 'CETP AG'],
    'Neurological':   ['APOE ε3/ε4', 'COMT Val/Met', 'BDNF CT', 'OXTR AG', 'CLOCK AG'],
    'Cancer':         ['MC1R x4', 'FGFR2 AG', 'TP53 CG', '8q24 AG', 'TERT AG'],
    'Drug Response':  ['CYP2C9*2', 'CYP2C19*2', 'CYP1A2 fast', 'SLCO1B1 CT', 'NAT2 fast'],
    'Metabolism':     ['MTHFR compound', 'FUT2 AA', 'VDR CT', 'FADS1 AG', 'BCMO1 AG']
  },

  imaging: [],

  actions: {
    supplements: [
      { name: 'Omega-3 Fish Oil', dose: '2g EPA+DHA', why: '9p21 ×3 CAD risk + IL-6 CC inflammatory drive', gene: '9p21 / IL-6', timing: 'With food' },
      { name: 'Vitamin D3', dose: '2000-4000 IU', why: 'MC1R ×4 — high melanoma risk requires sun avoidance, D synthesis compromised', gene: 'MC1R / VDR', timing: 'With largest meal' },
      { name: 'Methylfolate', dose: '1mg', why: 'MTHFR support for homocysteine management', gene: 'MTHFR', timing: 'Morning' },
      { name: 'Curcumin (w/ piperine)', dose: '500mg', why: 'IL-6 CC + TNF-α AA — dual highest inflammatory cytokine producers; curcumin targets both pathways', gene: 'IL-6 / TNF-α', timing: 'With food' }
    ],
    diet: [
      { do: 'Mediterranean diet >80% adherence', avoid: 'Processed foods, excess saturated fat', why: 'Eliminates 9p21 MI risk completely (INTERHEART P=0.008)', gene: '9p21' },
      { do: 'Anti-inflammatory foods (fatty fish, leafy greens, berries)', avoid: 'High-glycemic/inflammatory foods', why: 'IL-6 CC + TNF-α AA = dual inflammatory cytokine burden', gene: 'IL-6 / TNF-α' },
      { do: 'Coffee OK — up to 4-5 cups/day', avoid: 'No caffeine restriction needed', why: 'CYP1A2 *1F/*1F fast metabolizer — caffeine may be cardioprotective', gene: 'CYP1A2' },
      { do: 'Limit alcohol <3 drinks/week', avoid: 'Binge drinking', why: 'PITX2 CT AFib — alcohol multiplicatively amplifies arrhythmia risk', gene: 'PITX2' }
    ],
    screening: [
      { test: 'CAC Score (Coronary Artery Calcium)', frequency: 'Baseline NOW, then per score', why: '9p21 ×3 + father stent 62/CABG 75 — definitive risk stratification', priority: 'high' },
      { test: 'Annual EKG + Echocardiogram', frequency: 'Annual', why: 'PITX2 CT AFib risk; sister has PAF', priority: 'high' },
      { test: 'Low-dose CT Chest', frequency: 'Annual from age 50', why: 'Two lung cancers on maternal MT-H1 line (Peggy + mother)', priority: 'high' },
      { test: 'Full-body Skin Exam', frequency: 'Every 6 months', why: 'MC1R ×4 compound — 91st percentile melanoma risk', priority: 'high' },
      { test: 'Cognitive Screening (MoCA)', frequency: 'Annual from 55', why: 'APOE ε3/ε4 + father dementia — 2-3× Alzheimer\'s risk', priority: 'medium' },
      { test: 'Lipid Panel + ApoB', frequency: 'Annual', why: '9p21 ×3 + PCSK9 pathway variant', priority: 'medium' },
      { test: 'Hereditary Cancer Panel', frequency: 'One-time', why: 'TP53 CG + FGFR2 AG + bilateral cancer history (lung, breast)', priority: 'medium' }
    ],
    drugAlerts: [
      { drug: 'Warfarin', action: 'avoid', why: 'CYP2C9 *1/*2 + VKORC1 — use DOACs instead', gene: 'CYP2C9 / VKORC1' },
      { drug: 'NSAIDs', action: 'reduce', why: 'CYP2C9 *1/*2 intermediate — reduce dose 25-50%', gene: 'CYP2C9' },
      { drug: 'Dapsone', action: 'avoid', why: 'NAT2 status unknown but Quinn\'s hemolysis from maternal NAT2; Chad\'s status may differ', gene: 'NAT2' },
      { drug: 'Statins', action: 'monitor', why: 'If initiated for 9p21 CAD: monitor for myopathy given exercise regimen', gene: 'HMGCR' }
    ]
  },

  ancestry: {
    composition: [
      { region: 'Northwestern European', pct: 85, detail: 'British/Irish, French/German — dominant paternal ancestry' },
      { region: 'Southern European', pct: 8, detail: 'Italian, Iberian — possible HLA-B*51 prevalence corridor' },
      { region: 'Eastern European', pct: 4, detail: 'Minor component' },
      { region: 'Other', pct: 3, detail: 'Trace Scandinavian' }
    ],
    maternal: { haplogroup: 'H1', age: '13,000 years', origin: 'Franco-Cantabrian refugium (Ice Age southern France)', detail: 'Post-glacial recolonization lineage. Shared with Peggy (maternal aunt) and passed to Quinn and Brother. Enhanced Complex I mitochondrial efficiency.' },
    paternal: { haplogroup: 'R1b', age: '~5,000 years', origin: 'Pontic Steppe via Bell Beaker culture into Western Europe', detail: 'Most common Western European Y-haplogroup (~60% of Western European males). Indo-European expansion marker. Passed to Quinn and Brother.' },
    variantOrigins: [
      { variant: 'HLA-B*51', from: 'paternal', detail: 'Chad is heterozygous carrier. Contributed one B*51 allele to Quinn. Combined with Brigitte\'s copy = Quinn homozygous.' },
      { variant: 'APOE ε4', from: 'paternal', detail: 'Chad carries ε3/ε4. Father had dementia. This allele did NOT come from Brigitte (she is ε3/ε3).' },
      { variant: 'TNF-α AA', from: 'both', detail: 'Chad is AA (highest producer). Both of his parents likely carried at least one A allele. Quinn guaranteed AG from Chad.' },
      { variant: '9p21 ×3', from: 'both', detail: 'All three CAD loci heterozygous. Father had stent 62 + CABG 75 — this is the confirmed familial CAD lineage.' },
      { variant: 'MC1R ×4', from: 'both', detail: 'Compound heterozygous — multiple Celtic skin variants. Fair complexion, freckling, melanoma susceptibility.' },
      { variant: 'MT-H1', from: 'maternal', detail: 'Mitochondrial DNA from mother (Peggy\'s sister). Identical in Peggy, Chad, Quinn, Brother. 13,000-year unbroken maternal line.' }
    ]
  },

  clinical: {
    subtitle: 'Cardiovascular Risk · APOE ε3/ε4 · MC1R Compound · Age 51',
    badge: 'MONITOR',
    oneLiner: 'Emergency medicine physician with 9p21 ×3 bilateral CAD risk (father: stent 62, CABG 75), APOE ε3/ε4 (father: dementia), MC1R ×4 compound (91st percentile melanoma), PITX2 CT AFib risk (sister: PAF), and dual highest-producer inflammatory cytokine genotype (TNF-α AA, IL-6 CC).',
    sections: [
      {
        title: 'Priority Screening',
        rows: [
          { label: 'CAC Score', value: 'NOT YET DONE — highest priority baseline test', alert: true },
          { label: 'LDCT Chest', value: 'Annual — 2 lung cancers on maternal MT-H1 line', alert: true },
          { label: 'Skin Exam', value: 'Q6 months — MC1R ×4 compound, 91st %ile melanoma', alert: true },
          { label: 'EKG', value: 'Annual — PITX2 CT, sister has PAF' },
          { label: 'Cognitive', value: 'Baseline MoCA by 55 — APOE ε3/ε4 + father dementia' }
        ]
      },
      {
        title: 'Pharmacogenomics',
        rows: [
          { label: 'CYP2C9', value: '*1/*2 intermediate — reduce NSAID doses', alert: true },
          { label: 'VKORC1', value: 'Warfarin-sensitive — use DOACs if anticoagulation needed', alert: true },
          { label: 'CYP1A2', value: '*1F/*1F fast — caffeine OK, up to 4-5 cups/day' },
          { label: 'CYP2C19', value: '*1/*2 intermediate' }
        ]
      },
      {
        title: 'Key Genetic Findings',
        rows: [
          { label: 'APOE', value: 'ε3/ε4 — 2-3× Alzheimer\'s risk; father affected', alert: true },
          { label: '9p21', value: '×3 bilateral — father: stent 62, CABG 75', alert: true },
          { label: 'MC1R', value: '×4 compound — 91st percentile melanoma risk', alert: true },
          { label: 'TNF-α / IL-6', value: 'AA / CC — dual highest inflammatory cytokine producers' },
          { label: 'HLA-B*51', value: 'Heterozygous carrier — passed one copy to Quinn' }
        ]
      }
    ],
    alerts: [
      { text: 'CAC score is the single highest-priority test not yet completed.' },
      { text: 'Annual low-dose CT chest — 2 lung cancers on maternal line (Peggy + mother).' },
      { text: 'AVOID warfarin (CYP2C9 + VKORC1) — use DOACs if anticoagulation needed.' },
      { text: 'MC1R ×4: strict sun protection, Q6-month full-body skin exams, dermatoscopy.' },
      { text: 'NO WARFARIN for Chad — this is a confirmed family-wide drug alert.' }
    ]
  }
};
