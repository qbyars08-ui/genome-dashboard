/* ═══════════════════════════════════════════════════════════════
   STRAND Data — Brother Byars
   Predicted profile — 23andMe kit ordered, results pending.
   Variants marked 100% are Mendelian certainties from parental
   genotypes. 75% variants are bilateral (both parents heterozygous).
   50% variants require one parent heterozygous, one homozygous
   opposite.
   ═══════════════════════════════════════════════════════════════ */

window.STRAND_PERSON = {
  id:       'brother',
  name:     'Brother Byars',
  fullName: 'Brother Byars',
  role:     'Sibling',
  age:      21,
  dob:      null,
  location: 'Portland, OR',

  badges: ['Predicted: B*51 75%', 'FUT2 AA (100%)', 'TNF-α AG (100%)', 'Awaiting 23andMe'],

  vitals: [
    { label: 'B*51 Prob',    value: '75%',      sub: 'Carrier probability',   accent: 'red'    },
    { label: 'SNPs',         value: '0',         sub: 'Kit ordered',           accent: 'blue'   },
    { label: 'Confirmed',    value: '6',         sub: '100% certain variants', accent: 'green'  },
    { label: '75% Likely',   value: '15+',       sub: 'Bilateral variants',    accent: 'amber'  },
    { label: 'Status',       value: 'Pending',   sub: '23andMe processing',    accent: 'gold'   }
  ],

  /* ─── Tab 1: Risk Cards (existing data keys) ─── */
  data: {
    cv: {
      title:       'B*51 Risk Stratification',
      accent:      'red',
      score:       75,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     '75% probability B*51 carrier. 25% chance homozygous (identical to Quinn). Highest-priority pending result.',
      methodology: 'Probability-weighted composite: 25% homozygous x90 + 50% heterozygous x60 + 25% B*51-free x20 = 57.5, elevated for family BD context.',
      factors: [
        { name: 'B*51 carrier probability 75%',  delta: +15, note: 'Both parents carry B*51; 25% chance homozygous (= Quinn risk)' },
        { name: '9p21 CAD x3 — 75% likely',      delta: +8,  note: 'Both parents carry; grandfather: stent 62, CABG 75' },
        { name: 'PITX2 AFib — 75% likely',        delta: +5,  note: 'Both parents CT; 75% carrier probability' },
        { name: 'TNF-α AG — 100% certain',   delta: +5,  note: 'Dad AA, Mom GG; Brother is AG (guaranteed)' },
        { name: 'Factor V CC — 100% clear',        delta: -5,  note: 'Both parents CC; no clotting risk' },
        { name: 'FTO TT — 100% normal',            delta: -3,  note: 'Both parents TT; no metabolic obesity risk' }
      ],
      trend:      { dir: 'stable', note: '23andMe kit ordered; B*51 result is the highest clinical priority' },
      comparison: { label: 'vs Quinn (proband)', value: 'If homozygous (25% chance): identical genetic risk to Quinn' },
      status: 'Carrier Probability',
      findings: [
        {
          g: '25%', c: 'f-red',
          n: 'Scenario 1: Homozygous B*51/B*51',
          l: 'Same as Quinn. OR ~10.96x for Behcet\'s. Highest risk.',
          d: 'If Brother inherited B*51 from both parents, he shares Quinn\'s primary genetic driver. Would require the same clinical surveillance: oral ulcers, genital ulcers, uveitis, joint pain. EBV exposure history becomes critical for risk stratification.'
        },
        {
          g: '50%', c: 'f-amber',
          n: 'Scenario 2: Heterozygous B*51/other',
          l: 'Same as both parents. OR ~5.78x. Carrier, moderate risk.',
          d: 'Most likely outcome. Heterozygous carrier with lower BD risk than Quinn (homozygous) but still elevated above general population. Both parents are heterozygous without clinical BD, suggesting heterozygosity alone may be insufficient to trigger disease.'
        },
        {
          g: '25%', c: 'f-green',
          n: 'Scenario 3: No B*51',
          l: 'Cleared at the primary BD susceptibility locus.',
          d: 'Lowest risk. Would not carry the primary BD allele. Residual autoimmune variants (CTLA4, TNF-alpha AG) still present but the principal driver is absent.'
        }
      ],
      actions: [
        '23andMe kit ordered — B*51 is the #1 priority result',
        'If B*51 positive: baseline ophthalmologic exam, symptom surveillance',
        'If B*51 negative: cleared at primary locus, standard screening'
      ]
    },

    nr: {
      title:       'Confirmed Variants (100%)',
      accent:      'purple',
      score:       100,
      band:        'confirmed',
      bandLabel:   'Confirmed',
      summary:     '6 variants confirmed via Mendelian inheritance — FUT2 AA, FTO TT, FOXO3 TT, TNF-α AG, Factor V CC, CYP1A2 AC',
      methodology: 'These 6 variants are 100% certain because both parents are homozygous or in a forced-heterozygote configuration (e.g., Dad AA + Mom GG = Brother AG). No testing required.',
      factors: [
        { name: 'FUT2 AA non-secretor',           delta: +20, note: 'Both parents AA; altered microbiome; B12 absorption impaired' },
        { name: 'TNF-α AG high producer',    delta: +15, note: 'Dad AA + Mom GG = Brother AG (guaranteed); anti-inflammatory diet critical' },
        { name: 'FOXO3 TT no longevity allele',   delta: +10, note: 'Both parents TT; compensate via exercise + time-restricted eating' },
        { name: 'CYP1A2 AC intermediate metabolizer', delta: +5, note: 'Dad *1F/*1F fast + Mom CC slow = intermediate; limit caffeine to 2-3 cups/day' },
        { name: 'Factor V CC clear',               delta: -20, note: 'Both parents CC; no clotting risk' },
        { name: 'FTO TT normal',                   delta: -10, note: 'Both parents TT; no genetic obesity burden' }
      ],
      trend:      { dir: 'stable', note: 'Confirmed without testing. Actionable now.' },
      comparison: { label: 'vs Quinn (proband)', value: 'FUT2 AA + FTO TT + FOXO3 TT = identical baseline on these loci' },
      status: 'Guaranteed',
      findings: [
        {
          g: 'AA', c: 'f-green',
          n: 'FUT2 Non-Secretor (100%)',
          l: 'Both parents AA. Altered gut microbiome. Norovirus resistant. B12 absorption impaired.',
          d: '100% confirmed. Same as Quinn. Requires MMA monitoring for functional B12 status, not serum B12 alone.'
        },
        {
          g: 'TT', c: 'f-green',
          n: 'FTO Normal Metabolism (100%)',
          l: 'Both parents TT. No obesity risk alleles.',
          d: '100% confirmed. Normal metabolic rate. No intervention required.'
        },
        {
          g: 'TT', c: 'f-green',
          n: 'FOXO3 No Longevity Allele (100%)',
          l: 'Both parents TT. Compensate via exercise and time-restricted eating (AMPK activation).',
          d: '100% confirmed. No protective FOXO3 variant. Same as Quinn and both parents.'
        },
        {
          g: 'AG', c: 'f-amber',
          n: 'TNF-α High Producer (100%)',
          l: 'Dad AA, Mom GG. One high-TNF allele guaranteed.',
          d: '100% confirmed. Elevated TNF-alpha baseline. Anti-inflammatory dietary pattern indicated. Omega-3, curcumin, and Mediterranean diet reduce TNF-alpha expression.'
        },
        {
          g: 'CC', c: 'f-green',
          n: 'Factor V No Leiden (100%)',
          l: 'Both parents CC. No clotting risk.',
          d: '100% confirmed. Normal clotting function. No intervention required.'
        },
        {
          g: 'AC', c: 'f-green',
          n: 'CYP1A2 Intermediate Metabolizer (100%)',
          l: 'Dad AA fast, Mom CC slow. Brother is AC intermediate.',
          d: '100% confirmed. Intermediate caffeine metabolism. Limit to 2-3 cups coffee/day. Avoid caffeine after 2 PM.'
        }
      ],
      actions: [
        'Supplement methylcobalamin 1000 mcg/day (FUT2 non-secretor)',
        'Anti-inflammatory diet pattern (TNF-alpha AG)',
        'Limit caffeine to 2-3 cups/day (CYP1A2 AC)'
      ]
    },

    ca: {
      title:       'Probable Variants (75%)',
      accent:      'orange',
      score:       75,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     'Both parents heterozygous at 15+ loci. 75% carrier probability each. Pending 23andMe confirmation.',
      methodology: 'Probability-weighted: each 75% variant contributes 0.75x its full risk weight. Act conservatively until 23andMe confirms or clears.',
      factors: [
        { name: 'PITX2 AFib — 75%',              delta: +12, note: 'Both parents CT; family history of PAF' },
        { name: '9p21 CAD x3 — 75% each',        delta: +12, note: 'Mediterranean diet eliminates risk at >80% adherence' },
        { name: 'CTLA4 autoimmune — 75%',          delta: +8,  note: 'Modified immune checkpoint; increased autoimmune risk' },
        { name: 'Circadian cluster x3 — 75%',     delta: +6,  note: 'CRY1 + CLOCK + NPAS2 bilateral from both parents' },
        { name: 'CYP2C9 *2 — 75%',               delta: +5,  note: 'Intermediate NSAID metabolism if confirmed' },
        { name: 'Factor V CC — 100% clear',        delta: -8,  note: 'Confirmed clear; reduces clotting risk component' }
      ],
      trend:      { dir: 'stable', note: '23andMe will confirm or clear each variant' },
      comparison: { label: 'vs Quinn (proband)', value: 'If all confirmed: similar variant burden to Quinn on these loci' },
      status: 'Bilateral Variants',
      findings: [
        {
          g: '75%', c: 'f-amber',
          n: 'CYP2C9 *2 Carrier',
          l: 'Both parents heterozygous. 75% carrier probability.',
          d: 'If confirmed: intermediate NSAID metabolism. Reduce NSAID doses. Same variant as Quinn and both parents.'
        },
        {
          g: '75%', c: 'f-red',
          n: 'PITX2 AFib Risk',
          l: 'Both parents CT. 75% carrier. Family history of PAF.',
          d: 'If confirmed: annual EKG recommended. Alcohol >3 drinks/week has multiplicative effect with genetic risk.'
        },
        {
          g: '75%', c: 'f-red',
          n: '9p21 CAD x3',
          l: 'Both parents carry all three loci. 75% probability each.',
          d: 'Family history: grandfather stent at 62, CABG at 75. Mediterranean diet eliminates 9p21 MI risk at >80% adherence (INTERHEART P=0.008).'
        },
        {
          g: '75%', c: 'f-amber',
          n: 'CTLA4 Autoimmune',
          l: 'Both parents heterozygous. Modified immune checkpoint.',
          d: 'If confirmed: increased autoimmune risk, particularly relevant in combination with B*51 and TNF-alpha AG.'
        },
        {
          g: '75%', c: 'f-amber',
          n: 'Circadian Clock Cluster',
          l: 'CRY1 + CLOCK + NPAS2 bilateral from both parents.',
          d: 'If confirmed: heightened sensitivity to circadian disruption. Consistent sleep/wake schedule protective.'
        }
      ],
      deep: [
        { g: '75%', c: 'f-amber', n: 'IL-1β',  l: 'Both parents heterozygous. Pro-inflammatory cytokine.' },
        { g: '75%', c: 'f-amber', n: 'IL-10',         l: 'Both parents heterozygous. Anti-inflammatory capacity.' },
        { g: '75%', c: 'f-amber', n: 'SCN5A',         l: 'Cardiac sodium channel. Both parents carry.' },
        { g: '75%', c: 'f-amber', n: 'MC1R',          l: 'Skin/melanoma risk. Bilateral. Sun protection critical.' },
        { g: '75%', c: 'f-amber', n: 'SOD2',          l: 'Oxidative stress response. Both parents AG.' }
      ],
      actions: [
        '23andMe will confirm or clear each of these',
        'If 9p21 confirmed: CAC score at 40, Mediterranean diet now',
        'If PITX2 confirmed: annual EKG, limit alcohol to <3/week'
      ]
    },

    dr: {
      title:       'Symptom Surveillance',
      accent:      'amber',
      score:       50,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     '10 symptoms under surveillance. Oral ulcers, genital ulcers, and eye inflammation are BD red flags requiring immediate evaluation.',
      methodology: 'Probability-weighted symptom risk based on family BD context. Currently healthy at 21 — this is preventive surveillance, not diagnosis.',
      factors: [
        { name: 'B*51 75% carrier — BD watch',     delta: +15, note: 'If positive: baseline eye exam; watch for oral/genital ulcers' },
        { name: 'PITX2 + SCN5A — palpitations',    delta: +8,  note: 'Bilateral variants; any palpitations warrant EKG' },
        { name: 'DBH TT possible — 50%',            delta: +5,  note: 'If inherited: chronic low BP, orthostatic dizziness' },
        { name: 'FUT2 AA gut monitoring',            delta: +5,  note: '100% confirmed; altered microbiome from birth' },
        { name: 'Annual physical with genetic context', delta: -5, note: 'Awareness enables early detection' },
        { name: 'No active symptoms at 21',          delta: -8,  note: 'Past the highest-risk BD onset window' }
      ],
      trend:      { dir: 'stable', note: 'No active BD symptoms. 23andMe will confirm which risks are active.' },
      comparison: { label: 'vs Quinn (proband)', value: 'Quinn\'s disease onset at ~16. Brother at 21 is past the peak-risk window.' },
      status: 'Active Surveillance',
      findings: [
        {
          g: 'Watch', c: 'f-red',
          n: 'Oral Ulcers',
          l: 'Recurrent, painful, slow to heal. Primary BD signal.',
          d: 'If these start: document frequency, size, duration. Photograph them. This is the earliest and most common Behcet\'s presentation. Not equivalent to typical canker sores.'
        },
        {
          g: 'Watch', c: 'f-red',
          n: 'Genital Ulcers',
          l: 'Highly specific for Behcet\'s. See dermatology immediately.',
          d: 'Much more specific to BD than oral ulcers. If present, BD workup is mandatory regardless of B*51 status.'
        },
        {
          g: 'Watch', c: 'f-red',
          n: 'Eye Redness / Pain',
          l: 'Uveitis. Urgent ophthalmology referral.',
          d: 'Anterior uveitis can progress to vision loss. Any unexplained eye inflammation requires urgent evaluation.'
        },
        {
          g: 'Watch', c: 'f-amber',
          n: 'Palpitations / Skipping Beats',
          l: 'PITX2 + SCN5A bilateral. Cardiac rhythm variants.',
          d: '75% probability of carrying both PITX2 and SCN5A variants. Any palpitations warrant EKG.'
        },
        {
          g: 'Watch', c: 'f-amber',
          n: 'Low BP / Dizziness',
          l: 'DBH TT from Mom (50% chance). Low norepinephrine.',
          d: 'If Brother inherited DBH TT: chronic low blood pressure, orthostatic symptoms, fatigue.'
        }
      ],
      deep: [
        { g: 'Watch', c: 'f-amber', n: 'GI Issues',          l: 'FUT2 non-secretor (100%). Altered microbiome from birth.' },
        { g: 'Watch', c: 'f-amber', n: 'Skin Sensitivity',   l: 'MC1R from both sides (75%). Sun protection.' },
        { g: 'Watch', c: 'f-amber', n: 'Mental Health',       l: '50% chance COMT AA worrier from Brigitte.' }
      ],
      actions: [
        'Report any red-flag symptoms to family and clinician immediately',
        'Annual physical with genetic risk context',
        '23andMe will clarify which watch items are confirmed risks'
      ]
    },

    mt: {
      title:       'Sibling Concordance Analysis',
      accent:      'green',
      score:       0,
      band:        'optimal',
      bandLabel:   'Research',
      summary:     'Brother serves as the natural control subject. His genotype-phenotype comparison to Quinn will distinguish gene dosage from environmental triggers.',
      methodology: 'Score of 0: this is a research hypothesis card, not a risk card. Value lies in what comparison to Quinn will reveal about BD pathogenesis.',
      factors: [
        { name: 'Shared parental genome pool',       delta: 0, note: 'Same parents — environmental exposure controlled for' },
        { name: 'B*51 dose-response test',           delta: 0, note: 'Heterozygous vs homozygous: which dose triggers clinical BD?' },
        { name: 'EBV exposure history pending',      delta: 0, note: 'If Brother had mono without BD: UNC13D is the differentiator' },
        { name: '23andMe data pending',              delta: 0, note: 'Will reveal actual allele inheritance across all loci' }
      ],
      trend:      { dir: 'stable', note: '23andMe kit ordered — this is the family\'s highest-priority pending test' },
      comparison: { label: 'vs Quinn (proband)', value: 'Natural sibling control; will reshape understanding of BD trigger hierarchy' },
      status: 'Gene vs Environment',
      findings: [
        {
          g: 'Q1', c: 'f-purple',
          n: 'Is B*51 homozygosity required for clinical BD?',
          l: 'If Brother is heterozygous + asymptomatic: gene dosage matters.',
          d: 'Quinn is homozygous B*51/B*51 with active BD. Both parents are heterozygous without BD. If Brother is heterozygous and asymptomatic, it supports gene-dosage hypothesis: one copy insufficient, two copies required for disease penetrance.'
        },
        {
          g: 'Q2', c: 'f-purple',
          n: 'Did EBV trigger Quinn specifically via UNC13D?',
          l: 'Same parents, same household. Did Brother have EBV without disease?',
          d: 'Quinn\'s BD was EBV-triggered. If Brother had EBV without incident (even with B*51), it suggests the UNC13D VUS is the critical co-factor, not B*51 alone.'
        },
        {
          g: 'Q3', c: 'f-purple',
          n: 'Gene dosage vs environmental timing',
          l: 'Brother\'s data will distinguish genetic from environmental determinism.',
          d: 'Same genome pool, different individual. If Brother shares most risk alleles but no disease: environment (EBV timing, immune development window) is the differentiator. If different alleles and no disease: genetics is the differentiator.'
        }
      ],
      actions: [
        'Brother\'s 23andMe is the family\'s most important pending test',
        'Results will directly inform Quinn\'s disease model',
        'Side-by-side variant comparison upon data arrival'
      ]
    },

    lg: {
      title:       'Priority SNPs to Resolve',
      accent:      'blue',
      score:       3,
      band:        'optimal',
      bandLabel:   'Pending',
      summary:     '3 priority SNPs: rs1051792 (B*51), rs4680 (COMT), rs1799853 (CYP2C9). Results expected 3-6 weeks.',
      methodology: 'Score = number of unresolved priority SNPs. Once 23andMe data arrives, this card converts to confirmed-variants view.',
      factors: [
        { name: 'rs1051792 — B*51 priority #1',    delta: +1, note: 'BD stratification: 25% homo, 50% het, 25% clear' },
        { name: 'rs4680 — COMT priority #2',        delta: +1, note: '50% AA worrier from Brigitte; affects stress + medication response' },
        { name: 'rs1799853 — CYP2C9 priority #3',  delta: +1, note: '75% carrier; affects NSAID dosing if confirmed' },
        { name: '23andMe kit ordered',               delta: 0,  note: '3-6 weeks processing; upload raw data on arrival' }
      ],
      trend:      { dir: 'improving', note: '23andMe kit ordered; results will convert predicted profile to confirmed' },
      comparison: { label: 'vs Quinn (confirmed profile)', value: 'Direct side-by-side comparison on every variant once confirmed' },
      status: '3 SNPs Pending',
      findings: [
        {
          g: 'rs1051792', c: 'f-red',
          n: 'HLA-B*51 — Priority #1',
          l: 'Behcet\'s risk stratification. The single most important result.',
          d: 'Determines 25% homozygous (highest risk) vs 50% heterozygous (moderate) vs 25% cleared. Everything else follows from this result.'
        },
        {
          g: 'rs4680', c: 'f-purple',
          n: 'COMT — Priority #2',
          l: '50% chance AA worrier from Brigitte. Affects stress response and medication metabolism.',
          d: 'If AA Met/Met: higher stress sensitivity, better working memory, different SSRI response profile. If AG Val/Met: balanced like Dad.'
        },
        {
          g: 'rs1799853', c: 'f-amber',
          n: 'CYP2C9 — Priority #3',
          l: 'Drug metabolism. 75% carrier probability. Affects NSAID dosing.',
          d: 'If *1/*2: reduce NSAID doses. If *1/*1: standard dosing. Clinically actionable regardless.'
        }
      ],
      actions: [
        '23andMe kit ordered — processing takes 3-6 weeks',
        'Upload raw data to dashboard on arrival',
        'Run side-by-side comparison: Brother vs Quinn on every variant'
      ]
    }
  },

  /* ─── Tab 2: Health Actions ─── */
  actions: {
    supplements: [
      /* Act Now — 100% certain */
      { name: 'Methylcobalamin (B12)',  dose: '1000 mcg/day',    why: 'FUT2 AA non-secretor impairs B12 absorption. Monitor via MMA, not serum B12.',           gene: 'FUT2 AA',      timing: 'Morning with food',            certainty: '100%' },
      { name: 'Omega-3 (EPA/DHA)',      dose: '2g combined/day', why: 'TNF-α AG high producer. Omega-3 reduces TNF-alpha expression.',                     gene: 'TNF-α AG', timing: 'With meals, split dose',       certainty: '100%' },
      { name: 'Vitamin D3',             dose: '2000 IU/day',     why: 'FOXO3 TT lacks longevity allele. D3 supports AMPK pathway compensation.',                gene: 'FOXO3 TT',     timing: 'Morning with fat-containing meal', certainty: '100%' },
      { name: 'Curcumin (w/ piperine)', dose: '500 mg/day',      why: 'TNF-α AG high producer. Curcumin is a validated TNF-alpha inhibitor.',              gene: 'TNF-α AG', timing: 'With food',                    certainty: '100%' },
      /* Pending Confirmation — 75% */
      { name: 'CoQ10',                  dose: '100 mg/day',      why: 'If 9p21 CAD confirmed: supports mitochondrial function in cardiovascular tissue.',        gene: '9p21 CAD',      timing: 'Morning with fat',             certainty: '75%' },
      { name: 'Magnesium Glycinate',    dose: '400 mg/day',      why: 'If circadian cluster confirmed: supports circadian rhythm regulation and sleep onset.',   gene: 'CRY1/CLOCK',    timing: 'Evening, 1 hr before bed',     certainty: '75%' }
    ],

    diet: [
      /* Act Now — 100% certain */
      { do: 'Mediterranean dietary pattern >80% adherence',      avoid: 'Processed foods, refined sugars, seed oils',       why: 'TNF-α AG: elevated inflammatory baseline. Mediterranean diet reduces TNF-alpha, IL-6.',                     gene: 'TNF-α AG',   certainty: '100%' },
      { do: 'Probiotic-rich fermented foods daily',              avoid: 'Unnecessary antibiotic courses',                   why: 'FUT2 AA non-secretor: altered gut microbiome composition from birth. Fermented foods partially compensate.',       gene: 'FUT2 AA',         certainty: '100%' },
      { do: 'Limit caffeine to 2-3 cups before 2 PM',           avoid: 'Caffeine after 2 PM, energy drinks',               why: 'CYP1A2 AC intermediate metabolizer. Slower clearance than fast metabolizers.',                                     gene: 'CYP1A2 AC',      certainty: '100%' },
      /* Pending Confirmation — 75% */
      { do: 'Increase dietary antioxidants (berries, leafy greens)', avoid: 'Excessive alcohol (>3 drinks/week)',           why: 'If SOD2 AG confirmed: impaired oxidative stress response. If PITX2 confirmed: alcohol is multiplicative with AFib risk.', gene: 'SOD2/PITX2', certainty: '75%' },
      { do: 'Consistent meal timing (circadian alignment)',      avoid: 'Late-night eating, irregular schedules',           why: 'If circadian cluster confirmed: CRY1/CLOCK/NPAS2 variants heighten sensitivity to circadian disruption.',          gene: 'CRY1/CLOCK/NPAS2', certainty: '75%' }
    ],

    screening: [
      /* Act Now — 100% certain */
      { test: 'MMA (methylmalonic acid)',        frequency: 'Annual',         why: 'FUT2 AA non-secretor. Serum B12 is unreliable; MMA detects functional deficiency.',    priority: 'high',   certainty: '100%' },
      { test: 'hsCRP + inflammatory panel',      frequency: 'Annual',         why: 'TNF-α AG high producer. Baseline inflammatory marker tracking.',                  priority: 'medium', certainty: '100%' },
      /* Pending Confirmation */
      { test: 'Ophthalmologic exam (baseline)',   frequency: 'Once, then PRN', why: 'If B*51 confirmed: baseline for uveitis surveillance. BD eye involvement can be sight-threatening.', priority: 'high', certainty: '75%' },
      { test: 'EKG',                              frequency: 'Annual',         why: 'If PITX2 confirmed: AFib screening. Family history of PAF.',                          priority: 'high',   certainty: '75%' },
      { test: 'CAC score',                        frequency: 'At age 40',      why: 'If 9p21 CAD confirmed: coronary calcium scoring for early atherosclerosis detection.', priority: 'medium', certainty: '75%' },
      { test: 'Full-body skin check',             frequency: 'Annual',         why: 'If MC1R confirmed: melanoma risk from both parental lines. Sun protection critical.',  priority: 'medium', certainty: '75%' },
      { test: 'COMT genotype confirmation',       frequency: 'Once (23andMe)', why: '50% chance AA worrier from Brigitte. Affects SSRI selection if ever needed.',         priority: 'medium', certainty: '50%' }
    ],

    drugAlerts: [
      /* Act Now — 100% certain */
      { drug: 'Caffeine',           action: 'reduce',  why: 'CYP1A2 AC intermediate metabolizer. Slower clearance. Limit to 2-3 cups/day, none after 2 PM.',                          gene: 'CYP1A2 AC',  certainty: '100%' },
      /* Pending Confirmation */
      { drug: 'NSAIDs (ibuprofen, naproxen)', action: 'reduce', why: 'If CYP2C9 *2 confirmed (75% likely): intermediate metabolism. Use lower doses, shorter courses.',               gene: 'CYP2C9 *2',  certainty: '75%' },
      { drug: 'Warfarin',           action: 'avoid',   why: 'If CYP2C9 *2 confirmed: reduced clearance. Use alternative anticoagulants. Family protocol: no warfarin for any Byars.',  gene: 'CYP2C9 *2',  certainty: '75%' },
      { drug: 'SSRIs (if needed)',   action: 'monitor', why: 'If COMT AA confirmed (50% likely): altered dopamine metabolism affects SSRI response profile. Start low, titrate slowly.', gene: 'COMT rs4680', certainty: '50%' }
    ]
  },

  /* ─── Tab 3: Ancestry ─── */
  ancestry: {
    composition: [
      { region: 'Northwestern European', pct: 85, detail: 'Predominantly British Isles and Northern French heritage from both parental lines' },
      { region: 'Southern European',     pct: 10, detail: 'Mediterranean component, consistent with HLA-B*51 prevalence along Silk Road migration' },
      { region: 'Other European',        pct: 5,  detail: 'Minor Central/Eastern European admixture' }
    ],
    maternal: {
      haplogroup: 'H',
      age:        '20,000-25,000 years',
      origin:     'Franco-Cantabrian refugium (Ice Age Western Europe)',
      detail:     'Haplogroup H is the most common mtDNA lineage in Europe (~40%). Expanded from Iberian refugium after Last Glacial Maximum. Brigitte\'s line.'
    },
    paternal: {
      haplogroup: 'R1b',
      age:        '~18,500 years',
      origin:     'Western Europe / Atlantic fringe',
      detail:     'R1b is the dominant Y-DNA haplogroup in Western Europe (~60% of men). Associated with post-Ice Age repopulation from Iberian refugium and later Bell Beaker expansion. Chad\'s line.'
    },
    variantOrigins: [
      { variant: 'HLA-B*51',    from: 'both',     detail: 'Both parents heterozygous. B*51 follows Silk Road distribution — highest in Turkey/Iran, present in Mediterranean Europeans.',  certainty: '100% from both; 75% carrier' },
      { variant: 'FUT2 AA',     from: 'both',     detail: 'Both parents homozygous AA. Non-secretor status common in European populations (~20%).',                                       certainty: '100%' },
      { variant: 'TNF-α A allele', from: 'paternal', detail: 'Chad is AA homozygous. The high-producer A allele comes from the paternal line.',                                     certainty: '100%' },
      { variant: 'TNF-α G allele', from: 'maternal', detail: 'Brigitte is GG homozygous. The G allele comes from the maternal line.',                                               certainty: '100%' },
      { variant: 'CYP1A2 *1F', from: 'paternal', detail: 'Chad is *1F/*1F fast metabolizer. The fast allele comes from paternal line.',                                                   certainty: '100%' },
      { variant: 'CYP1A2 C',   from: 'maternal', detail: 'Brigitte is CC slow metabolizer. The slow allele comes from maternal line.',                                                    certainty: '100%' },
      { variant: '9p21 CAD',   from: 'both',     detail: 'Both parents carry all three CAD tag SNPs. Risk alleles from both lines.',                                                      certainty: '75% each locus' },
      { variant: 'MC1R',       from: 'both',     detail: 'Both parents carry. Red pigment / fair skin variant. Chad: blue eyes, significant sun exposure history.',                        certainty: '75%' }
    ]
  },

  /* ─── Tab 4: Clinical (Doctor View) ─── */
  clinical: {
    subtitle: 'Predicted Genomic Profile — Awaiting 23andMe Confirmation',
    badge:    'PREDICTED',
    oneLiner: 'Predicted profile based on parental genotypes. 6 variants confirmed (100% Mendelian certainty), 15+ at 75% probability. HLA-B*51 status is the highest-priority pending result — 25% chance of homozygous (identical to Quinn).',
    sections: [
      {
        title: 'Confirmed Variants (100% Certain)',
        rows: [
          { label: 'FUT2',          value: 'AA Non-Secretor — altered microbiome, B12 impaired' },
          { label: 'TNF-α',    value: 'AG High Producer — elevated inflammatory baseline' },
          { label: 'Factor V',      value: 'CC No Leiden — normal clotting' },
          { label: 'FTO',           value: 'TT Normal — no obesity risk alleles' },
          { label: 'FOXO3',         value: 'TT — no longevity allele' },
          { label: 'CYP1A2',       value: 'AC Intermediate — moderate caffeine metabolism' }
        ]
      },
      {
        title: 'Key Probabilities (Pending 23andMe)',
        rows: [
          { label: 'HLA-B*51',     value: '75% carrier (25% homozygous)',   alert: true },
          { label: '9p21 CAD x3',  value: '75% carrier each locus',         alert: true },
          { label: 'PITX2 AFib',   value: '75% carrier',                    alert: true },
          { label: 'CYP2C9 *2',   value: '75% intermediate metabolizer' },
          { label: 'CTLA4',        value: '75% — modified immune checkpoint' },
          { label: 'COMT',         value: '50% AA worrier (from Brigitte)' }
        ]
      },
      {
        title: 'Drug Metabolism Summary',
        rows: [
          { label: 'Caffeine',     value: 'CYP1A2 AC — intermediate. Limit 2-3 cups/day. (100%)',   alert: false },
          { label: 'NSAIDs',       value: 'CYP2C9 *2 — reduce dose if confirmed. (75%)',            alert: true },
          { label: 'Warfarin',     value: 'Avoid. Family protocol. (75% CYP2C9 risk)',               alert: true },
          { label: 'SSRIs',        value: 'Monitor if COMT AA confirmed. Start low. (50%)',          alert: false }
        ]
      }
    ],
    alerts: [
      { text: 'rs1051792 (HLA-B*51) — Behcet\'s risk stratification. Highest clinical priority.' },
      { text: 'rs4680 (COMT) — 50% chance AA worrier from Brigitte. Affects stress response + medication selection.' },
      { text: 'rs1799853 (CYP2C9) — Drug metabolism. 75% carrier probability. Affects NSAID dosing.' },
      { text: 'CYP1A2 AC confirmed — moderate caffeine intake. No further testing needed for this locus.' },
      { text: 'No warfarin for any family member (Chad protocol + CYP2C9 risk).' }
    ]
  },

  /* ─── Existing fields the renderer expects ─── */
  alert: null,

  meds: [],

  alerts: [
    { level: 'warn', text: 'PREDICTED PROFILE: 75% probability of B*51 carrier status. Awaiting 23andMe confirmation.' },
    { level: 'warn', text: 'BD SURVEILLANCE: Watch for oral ulcers, genital ulcers, eye inflammation. Report immediately.' },
    { level: 'info', text: 'CONFIRMED: FUT2 AA non-secretor (100%). Supplement B12. Monitor via MMA, not serum.' },
    { level: 'info', text: 'CONFIRMED: CYP1A2 AC intermediate (100%). Limit caffeine to 2-3 cups/day.' },
    { level: 'info', text: 'CONFIRMED: TNF-α AG high producer (100%). Anti-inflammatory dietary pattern indicated.' }
  ],

  labs: [],

  doctor: {
    subtitle: 'Predicted Profile — Awaiting 23andMe',
    badge:    'PREDICTED',
    sections: [
      {
        title: 'Confirmed Variants (100%)',
        rows: [
          { label: 'FUT2',          value: 'AA Non-Secretor (100%)' },
          { label: 'TNF-α',    value: 'AG High Producer (100%)' },
          { label: 'Factor V',      value: 'CC No Leiden (100%)' },
          { label: 'FTO',           value: 'TT Normal (100%)' },
          { label: 'FOXO3',         value: 'TT No Longevity (100%)' },
          { label: 'CYP1A2',       value: 'AC Intermediate (100%)' }
        ]
      },
      {
        title: 'Key Probabilities',
        rows: [
          { label: 'HLA-B*51',     value: '75% carrier (25% homozygous)', alert: true },
          { label: '9p21 CAD',     value: '75% each locus',                alert: true },
          { label: 'PITX2 AFib',   value: '75% carrier' },
          { label: 'CYP2C9',      value: '75% intermediate' },
          { label: 'COMT',         value: '50% AA worrier (Brigitte)' }
        ]
      }
    ],
    alerts: [
      { text: 'rs1051792 (HLA-B*51) — Behcet\'s risk stratification' },
      { text: 'rs4680 (COMT) — 50% chance AA worrier from Brigitte' },
      { text: 'rs1799853 (CYP2C9) — drug metabolism' }
    ]
  },

  inheritance: {
    'Certain (100%)': ['FUT2 AA', 'FTO TT', 'FOXO3 TT', 'TNF-α AG', 'Factor V CC', 'CYP1A2 AC'],
    '75% Likely':     ['B*51', '9p21 x3', 'PITX2', 'CYP2C9', 'CTLA4', 'IL-1β', 'SCN5A', 'Circadian x3', 'MC1R', 'SOD2'],
    '50/50':          ['COMT AA?', 'APOE ε4?', 'BDNF Met?', 'FKBP5 CT?', 'DBH TT?', 'NAT2 slow?', 'FAAH?'],
    'Quinn Compare':  ['B*51 homo?', 'UNC13D?', 'TI scarring?', 'BD active?']
  },

  imaging: []
};
