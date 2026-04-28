/* ═══════════════════════════════════════════════════════════════
   STRAND Data — Brigitte Byars
   Extracted from brigitte.html inline JS data object.
   ═══════════════════════════════════════════════════════════════ */

window.STRAND_PERSON = {
  id:       'brigitte',
  name:     'Brigitte Byars',
  fullName: 'Brigitte Byars',
  role:     'Mother',
  age:      48,
  dob:      null,
  location: 'Portland, OR',

  badges: ['COMT Met/Met', 'NAT2 Slow', 'B*51 Carrier', 'DBH TT', 'FAAH AC'],

  vitals: [
    { label: 'SNPs',    value: '614K',    sub: '23andMe v5',          accent: 'blue'   },
    { label: 'HLA',     value: 'B*51',    sub: 'Carrier (het)',        accent: 'purple' },
    { label: 'COMT',    value: 'AA',      sub: 'Met/Met worrier',      accent: 'purple' },
    { label: 'NAT2',    value: 'Slow',    sub: 'Key Quinn driver',     accent: 'red'    },
    { label: 'CYP1A2',  value: 'CC',      sub: 'Slow caffeine',        accent: 'amber'  }
  ],

  data: {
    cv: {
      title:       'Cardiovascular',
      accent:      'red',
      score:       68,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     '9p21 ×3 bilateral + PITX2 bilateral + DBH TT chronic low BP',
      methodology: 'Score combines: inherited CAD risk alleles (50%), vascular tone genetics (30%), family history (20%). DBH TT adds a unique low-BP phenotype.',
      factors: [
        { name: '9p21 ×3 bilateral',          delta: +10, note: 'Same three loci as Chad; both pass to Quinn' },
        { name: 'PITX2 CT AFib',              delta: +6,  note: 'Bilateral with Chad; 75% chance Quinn carries' },
        { name: 'DBH TT low norepinephrine',  delta: +8,  note: 'Chronic low BP; explains Quinn\'s orthostatic hypotension' },
        { name: 'NOS3 CT reduced eNOS',       delta: +4,  note: 'Moderate nitric oxide; vascular function impact' },
        { name: 'Factor V Leiden — clear',    delta: -5,  note: 'CC; no clotting risk' },
        { name: 'APOE ε3/ε3 — protective',   delta: -5,  note: 'No Alzheimer\'s or lipid risk from APOE; protective' }
      ],
      trend:      { dir: 'stable', note: 'No known cardiac events; blood pressure monitoring ongoing' },
      comparison: { label: 'vs 48F general population', value: '+1.5 SD; 9p21 bilateral is the dominant driver' },
      status: 'Elevated',
      findings: [
        {
          g: 'AG AG CG', c: 'f-red',
          n: '9p21 CAD Risk — All Three',
          l: 'Same as Chad. Bilateral. Father-in-law: stent 62, CABG 75.',
          d: 'All three 9p21 loci heterozygous. Combined with Chad carrying the same = Quinn guaranteed risk at every locus. Mediterranean diet eliminates MI risk at >80% adherence.'
        },
        {
          g: 'CT', c: 'f-red',
          n: 'PITX2 AFib',
          l: 'Same as Chad. Both parents carry. Chad\'s sister has PAF.',
          d: 'PITX2 bilateral. Alcohol >3/week multiplicative. Annual EKG recommended.'
        },
        {
          g: 'TT', c: 'f-amber',
          n: 'DBH — Low Norepinephrine',
          l: 'Low dopamine-to-norepinephrine conversion. Chronic low BP.',
          d: "DBH TT = reduced DBH enzyme activity. Lower norepinephrine production. Explains Brigitte's lower blood pressure and contributed to Quinn's chronic hypotension (65-100 systolic)."
        }
      ],
      deep: [
        { g: 'CC', c: 'f-green', n: 'Factor V Leiden', l: 'No clotting risk.' },
        { g: 'CT', c: 'f-amber', n: 'NOS3 eNOS',       l: 'Reduced nitric oxide synthase. Moderate vascular function.' }
      ],
      actions: [
        'Blood pressure monitoring (DBH TT baseline)',
        'Mediterranean diet (9p21 bilateral with Chad)',
        'Annual EKG (PITX2 AFib risk)'
      ]
    },

    nr: {
      title:       'Neurological',
      accent:      'purple',
      score:       35,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'APOE ε3/ε3 protective + COMT Met/Met worrier — stress-sensitive but strong cognitive baseline',
      methodology: 'Score combines: neurodegenerative risk alleles (45%), neurotransmitter genetics (35%), stress-response variants (20%). APOE ε3/ε3 is a major protective anchor.',
      factors: [
        { name: 'APOE ε3/ε3 — no AD risk',  delta: -15, note: 'The single biggest longevity advantage in her profile' },
        { name: 'COMT AA Met/Met worrier',   delta: +10, note: 'Highest prefrontal dopamine but stress-sensitive; Quinn guaranteed one Met' },
        { name: 'FKBP5 CT — HPA sensitized',delta: +5,  note: 'Enhanced cortisol binding; morning light + sleep critical' },
        { name: 'Circadian cluster 6 genes', delta: +5,  note: 'PER2, PER3, ADA + bilateral CRY1, CLOCK, NPAS2' },
        { name: 'CRHR1 stress response',     delta: +5,  note: 'CRH receptor variant; elevated stress-axis reactivity' },
        { name: 'Stress management protocol',delta: -5,  note: 'Yoga/meditation genetically indicated and effective' }
      ],
      trend:      { dir: 'stable', note: 'No cognitive symptoms; COMT AA profile benefits from consistent stress management' },
      comparison: { label: 'vs 48F same-age cohort', value: 'APOE ε3/ε3 places neuro aging in bottom 20% risk' },
      status: 'Favorable',
      findings: [
        {
          g: 'ε3/ε3', c: 'f-green',
          n: 'APOE — No Alzheimer\'s Risk',
          l: 'Both copies ε3. No ε4. Major protective advantage over Chad.',
          d: "Quinn's APOE ε4 came from Chad, not Brigitte. Brigitte has no increased Alzheimer's risk from APOE. This is the single biggest longevity advantage in her profile."
        },
        {
          g: 'AA', c: 'f-purple',
          n: 'COMT Met/Met — Worrier Genotype',
          l: 'Slow dopamine clearance. Higher baseline cognition but stress-sensitive.',
          d: 'COMT AA = lowest enzyme activity. Highest prefrontal dopamine. Better working memory and attention, but more stress-sensitive. Quinn guaranteed at least one Met from Brigitte. Stress management (yoga, meditation) genetically indicated.'
        },
        {
          g: 'CT', c: 'f-amber',
          n: 'FKBP5 — Enhanced Cortisol Sensitivity',
          l: 'Stronger HPA axis stress response. Morning light + sleep critical.',
          d: 'FKBP5 CT = enhanced glucocorticoid receptor sensitivity. Faster cortisol binding. This also explains why prednisone works well at lower doses in Quinn (if inherited).'
        }
      ],
      deep: [
        { g: 'CT', c: 'f-amber', n: 'CRHR1 Stress Response', l: 'Corticotropin-releasing hormone receptor variant.' },
        { g: '6 genes', c: 'f-amber', n: 'Circadian Clock Cluster', l: 'PER2, PER3, ADA + bilateral CRY1, CLOCK, NPAS2.' }
      ],
      actions: [
        'Stress management priority (COMT AA + FKBP5 CT)',
        'Morning sunlight exposure (circadian gene compensation)',
        'Meditation/yoga genetically indicated for COMT worrier'
      ]
    },

    ca: {
      title:       'Cancer Risk',
      accent:      'orange',
      score:       55,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'TP53 CG + FGFR2 AG + family: aunt breast CA 33 — cancer panel recommended',
      methodology: 'Score combines: cancer predisposition variants (50%), family history (35%), protective alleles (15%). TP53 heterozygous warrants formal genetic counseling.',
      factors: [
        { name: 'TP53 codon 72 CG',       delta: +12, note: 'Modified p53 apoptosis; family aunt breast CA age 33' },
        { name: 'FGFR2 AG breast',        delta: +8,  note: 'Heterozygous risk allele; same as Chad carries' },
        { name: 'MC1R single variant',    delta: +5,  note: 'AG heterozygous; lower than Chad\'s ×4 but warrants SPF' },
        { name: 'RAD51L1 DNA repair',     delta: +5,  note: 'Breast cancer modifier; with TP53 compound risk' },
        { name: 'LSP1 AG breast locus',   delta: +5,  note: 'Additional susceptibility locus' },
        { name: 'APOE ε3/ε3 protective',  delta: -5,  note: 'No APOE-linked cancer pathway activation' },
        { name: 'BRCA1/2 chip normal',    delta: -5,  note: 'No pathogenic on array; full sequencing still recommended' }
      ],
      trend:      { dir: 'stable', note: 'Annual mammogram and skin check; formal cancer panel pending' },
      comparison: { label: 'vs 48F general population', value: 'TP53 CG + family history = above-average breast cancer risk' },
      status: 'Monitor',
      findings: [
        {
          g: 'CG', c: 'f-amber',
          n: 'TP53 Codon 72',
          l: 'Modified p53 apoptotic function. Family: aunt breast cancer at 33.',
          d: "TP53 heterozygous. Combined with aunt's early breast cancer (age 33), genetic counseling and enhanced cancer screening recommended. Consider BRCA full sequencing."
        },
        {
          g: 'AG', c: 'f-amber',
          n: 'FGFR2 Breast Cancer',
          l: 'Heterozygous risk allele. Same as Chad carries.',
          d: 'Both parents carry FGFR2 AG. Moderate breast cancer risk elevation.'
        },
        {
          g: 'AG', c: 'f-amber',
          n: 'MC1R Single Variant',
          l: 'One Celtic variant (less than Chad\'s 4). Moderate skin risk.',
          d: 'AG heterozygous. Lower melanoma risk than Chad\'s compound but still warrants sun protection and periodic derm checks.'
        }
      ],
      deep: [
        { g: 'AG', c: 'f-amber', n: 'LSP1 Breast',  l: 'Heterozygous breast cancer susceptibility locus.' },
        { g: 'AG', c: 'f-amber', n: 'RAD51L1',      l: 'DNA repair variant. Breast cancer modifier.' }
      ],
      actions: [
        'Genetic counseling for cancer panel (TP53 + family history)',
        'Annual mammogram starting at 40 (or earlier per counselor)',
        'Annual skin check (MC1R AG)'
      ]
    },

    dr: {
      title:       'Drug Response',
      accent:      'amber',
      score:       40,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'NAT2 slow acetylator + CYP1A2 CC slow caffeine — dapsone contraindicated',
      methodology: 'Score reflects pharmacogenomic risk profile. Lower score = fewer interactions. NAT2 slow is the primary driver; caffeine sensitivity is a manageable lifestyle factor.',
      factors: [
        { name: 'NAT2 slow — dapsone banned', delta: +15, note: 'TT/AA slow; caused Quinn\'s hemolysis; avoid INH + sulfonamides' },
        { name: 'CYP1A2 CC slow caffeine',    delta: +8,  note: 'Opposite of Chad; >2 cups/day raises MI risk' },
        { name: 'FAAH AC endocannabinoid',    delta: +5,  note: 'Reduced FAAH; higher endocannabinoid tone; passed to Quinn' },
        { name: 'CYP2C9 *2 intermediate',     delta: +5,  note: 'Same as Chad; bilateral to Quinn; reduce NSAID doses' },
        { name: 'CYP2C19 *2 intermediate',    delta: +3,  note: 'Carrier; combined with Chad = Quinn bilateral' },
        { name: 'FKBP5 CT — GR advantage',   delta: -6,  note: 'Enhanced prednisone sensitivity; therapeutic at lower doses' }
      ],
      trend:      { dir: 'stable', note: 'No active drug reactions; carry NAT2 alert card; avoid dapsone + isoniazid' },
      comparison: { label: 'vs general PGx population', value: 'NAT2 slow in ~50% of European ancestry; still clinically significant' },
      status: '3 Alerts',
      findings: [
        {
          g: 'TT / AA', c: 'f-red',
          n: 'NAT2 Slow Acetylator',
          l: "Explains Quinn's dapsone hemolysis. Avoid dapsone, isoniazid, sulfonamides.",
          d: 'NAT2 rs1801280 TT + rs1208 AA = clear slow acetylator phenotype. Quinn inherited these alleles. Dapsone hydroxylamine accumulated causing oxidative hemolytic anemia in Belize. Also means Brigitte herself should avoid these drugs.'
        },
        {
          g: 'CC', c: 'f-amber',
          n: 'CYP1A2 — Slow Caffeine',
          l: 'Opposite of Chad (ultra-rapid). One cup max. Cardiovascular risk above that.',
          d: 'CYP1A2 CC = slow metabolizer. Caffeine stays in system longer. >2 cups/day associated with increased MI risk in slow metabolizers. Quinn is intermediate (AC from dad fast + mom slow).'
        },
        {
          g: 'AC', c: 'f-purple',
          n: 'FAAH — Endocannabinoid',
          l: 'Reduced FAAH activity. Elevated anandamide. Quinn inherited this.',
          d: 'FAAH rs324420 AC. A allele reduces FAAH enzyme = slower breakdown of endogenous cannabinoids. Higher natural endocannabinoid tone. Quinn may carry this, explaining enhanced cannabinoid sensitivity.'
        }
      ],
      deep: [
        { g: 'CT', c: 'f-amber', n: 'CYP2C9 *2',  l: 'Intermediate metabolizer. Same as Chad. Bilateral to Quinn.' },
        { g: 'AG', c: 'f-amber', n: 'CYP2C19 *2', l: 'Carrier. Combined with Chad = Quinn bilateral.' }
      ],
      actions: [
        'Avoid dapsone, isoniazid, sulfonamides (NAT2 slow)',
        'Limit caffeine to 1 cup/day (CYP1A2 CC)',
        'Carry drug alert card'
      ]
    },

    mt: {
      title:       'Metabolism',
      accent:      'green',
      score:       48,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'FUT2 non-secretor + DIO1/DIO2 thyroid conversion + VDR — thyroid panel + B12 monitoring needed',
      methodology: 'Score combines: micronutrient absorption genetics (40%), thyroid hormone pathway (35%), gut function (25%). DIO1+DIO2 combination is the distinguishing feature vs Chad.',
      factors: [
        { name: 'FUT2 AA non-secretor',   delta: +10, note: 'Both parents AA; B12 cellular transport impaired; check MMA' },
        { name: 'DIO1 AC + DIO2 CT thyroid',delta: +8, note: 'T4→T3 conversion reduced; TSH/free T3/T4 panel needed' },
        { name: 'VDR BsmI CT',            delta: +5,  note: 'Less severe than Chad\'s VDR+GC; supplement 2000 IU D3' },
        { name: 'FADS1 AG omega-3',       delta: +3,  note: 'Moderate conversion; supplement preformed DHA' },
        { name: 'FTO TT — no obesity risk',delta: -8,  note: 'Normal metabolic rate; both parents TT' },
        { name: 'MTHFR — normal',         delta: -5,  note: 'No MTHFR burden unlike Chad; cleaner methylation baseline' },
        { name: 'LCT lactase persistent',  delta: -5,  note: 'Full dairy tolerance; no absorption compromise' }
      ],
      trend:      { dir: 'stable', note: 'Thyroid panel pending; Vitamin D3 2000 IU + K2 protocol ongoing' },
      comparison: { label: 'vs 48F general population', value: 'FUT2 non-secretor B12 issue affects ~20% of Europeans' },
      status: 'Moderate',
      findings: [
        {
          g: 'AA', c: 'f-amber',
          n: 'FUT2 Non-Secretor',
          l: 'Same as Chad. Quinn 100%. Altered gut microbiome, B12 impaired.',
          d: 'Both parents AA non-secretor. Quinn is guaranteed AA. Impaired B12 cellular transport. Serum B12 falsely normal. Must check MMA + homocysteine.'
        },
        {
          g: 'AC + CT', c: 'f-amber',
          n: 'DIO1 + DIO2 Thyroid',
          l: 'Thyroid hormone conversion variants. Check TSH, free T3/T4.',
          d: 'DIO1 AC + DIO2 CT = modified T4-to-T3 conversion. May have slightly lower active thyroid hormone (T3) despite normal TSH. Thyroid panel recommended.'
        },
        {
          g: 'CT', c: 'f-amber',
          n: 'VDR BsmI',
          l: 'Moderate vitamin D receptor expression. Supplement 2000 IU daily.',
          d: 'Less severe than Chad\'s VDR + GC combination, but still warrants supplementation. Target 40-50 ng/mL.'
        }
      ],
      deep: [
        { g: 'TT', c: 'f-green',  n: 'FTO — No Obesity Risk', l: 'Normal metabolism. Both parents TT.' },
        { g: 'AG', c: 'f-amber',  n: 'FADS1 Omega-3',         l: 'Moderate conversion efficiency. Supplement preformed DHA.' }
      ],
      actions: [
        'Thyroid panel: TSH, free T3, free T4 (DIO1 + DIO2)',
        'B12 monitoring with MMA (FUT2 non-secretor)',
        'Vitamin D3 2000 IU + K2 daily'
      ]
    },

    lg: {
      title:       'What She Gave Quinn',
      accent:      'blue',
      score:       60,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     'B*51 + NAT2 slow + COMT Met + DBH TT — 4 of Quinn\'s 5 largest clinical drivers came from Brigitte',
      methodology: 'Score measures clinical impact of transmitted variants. Higher score = more Quinn risk alleles originated here. Each high-impact transmitted allele counts +10–15.',
      factors: [
        { name: 'B*51 — one of Quinn\'s two',  delta: +15, note: 'Without this, Quinn couldn\'t be homozygous' },
        { name: 'NAT2 slow — dapsone hemolysis',delta: +15, note: 'Direct cause of Belize hemolytic anemia episode' },
        { name: 'COMT Met allele (AA)',         delta: +10, note: 'Quinn guaranteed at least one Met; stress sensitivity' },
        { name: 'DBH TT hypotension',           delta: +10, note: 'Quinn\'s chronic BP 65–100 systolic is partly genetic from Brigitte' },
        { name: 'FKBP5 CT — prednisone benefit',delta: -5,  note: 'Explains why prednisone works well at lower doses' },
        { name: 'FAAH AC endocannabinoid',      delta: +5,  note: 'Quinn may have inherited; enhanced cannabinoid sensitivity' }
      ],
      trend:      { dir: 'stable', note: 'Nebula WGS will confirm which alleles Quinn actually inherited from Brigitte' },
      comparison: { label: 'Brigitte vs Chad contribution to Quinn\'s risk', value: 'Brigitte is the dominant genetic driver in Quinn\'s case' },
      status: 'Key Variants',
      findings: [
        {
          g: 'B*51', c: 'f-red',
          n: 'HLA-B*51 — Obligate Carrier',
          l: "One of Quinn's two B*51 copies came from Brigitte.",
          d: 'Brigitte is heterozygous B*51 carrier (AG at rs1051792). Combined with Chad\'s B*51, Quinn became homozygous — the strongest genetic driver of Behcet\'s disease.'
        },
        {
          g: 'AA', c: 'f-purple',
          n: 'COMT Met/Met',
          l: 'Quinn guaranteed at least one Met allele. Stress sensitivity.',
          d: 'Brigitte AA (Met/Met). Chad AG (Val/Met). Quinn is either Val/Met or Met/Met — either way has at least one Met copy. This affects dopamine clearance, stress response, and pain sensitivity.'
        },
        {
          g: 'TT', c: 'f-amber',
          n: 'DBH — Low Norepinephrine',
          l: "Explains Quinn's chronic hypotension. Enalapril compounds this.",
          d: 'DBH converts dopamine to norepinephrine. TT = reduced conversion. Quinn\'s BP 65-100 systolic is partly genetic from Brigitte, not just illness. Enalapril (antihypertensive) on top of this is questionable.'
        }
      ],
      deep: [
        { g: 'TT/AA', c: 'f-red',    n: 'NAT2 Slow Acetylator',       l: "Caused Quinn's dapsone hemolysis in Belize. Predictable from genetics." },
        { g: 'AC',    c: 'f-purple',  n: 'FAAH Endocannabinoid',       l: 'Elevated endocannabinoid tone. Quinn may have inherited this.' },
        { g: 'CT',    c: 'f-amber',   n: 'FKBP5 Enhanced GR Sensitivity', l: 'Why prednisone works well at low doses in Quinn.' }
      ],
      actions: [
        'Brigitte is the genetic key to Quinn\'s case',
        'NAT2 + B*51 + COMT + DBH = 4 of Quinn\'s biggest clinical drivers',
        'Nebula WGS will resolve which alleles Quinn actually inherited'
      ]
    }
  },

  alert: null,

  meds: [],

  alerts: [
    { level: 'block', text: 'NAT2 slow acetylator: avoid dapsone, isoniazid. Caused Quinn\'s hemolysis.' },
    { level: 'warn',  text: 'CYP1A2 CC: SLOW caffeine metabolizer. Limit to 1 cup/day.' },
    { level: 'warn',  text: 'COMT AA: stress-sensitive. Prioritize stress management.' },
    { level: 'warn',  text: 'DBH TT: low norepinephrine. Monitor blood pressure.' }
  ],

  labs: [],

  doctor: {
    subtitle: 'Pharmacogenomic Profile · 614,452 SNPs',
    badge: 'PGx',
    pgx: [
      { label: 'CYP2C9',  value: '*1/*2 Intermediate' },
      { label: 'CYP2C19', value: '*1/*2 Intermediate' },
      { label: 'CYP1A2',  value: 'CC Slow Metabolizer' },
      { label: 'NAT2',    value: 'Slow Acetylator',     alert: true },
      { label: 'COMT',    value: 'AA Met/Met (Worrier)' }
    ],
    risks: [
      { label: 'CAD (9p21)',      value: '3/3 alleles bilateral',   alert: true },
      { label: 'AFib (PITX2)',    value: 'CT carrier',               alert: true },
      { label: 'Alzheimer (APOE)',value: 'ε3/ε3 No risk' },
      { label: 'Cancer (TP53)',   value: 'CG heterozygous' },
      { label: 'HLA-B*51',        value: 'Heterozygous carrier' }
    ],
    sections: [],
    alerts: [
      { text: 'NAT2 slow acetylator: avoid dapsone, isoniazid. Caused Quinn\'s hemolysis.' },
      { text: 'CYP1A2 CC: SLOW caffeine metabolizer. Limit to 1 cup/day.' },
      { text: 'COMT AA: stress-sensitive. Prioritize stress management.' },
      { text: 'DBH TT: low norepinephrine. Monitor blood pressure.' }
    ]
  },

  inheritance: {
    'Protective':   ['APOE e3/e3', 'Factor V CC', 'FTO TT', 'MTHFR WT'],
    'Cardiovascular': ['9p21 x3', 'PITX2 CT', 'DBH TT', 'NOS3 CT'],
    'Cancer':       ['TP53 CG', 'FGFR2 AG', 'MC1R AG', 'LSP1', 'RAD51L1'],
    'Neuro':        ['COMT AA', 'FKBP5 CT', 'CRHR1', 'CRY1', 'CLOCK', 'PER2', 'PER3'],
    'Drug':         ['NAT2 slow', 'CYP1A2 CC', 'CYP2C9*2', 'CYP2C19*2', 'FAAH AC'],
    'Quinn Impact': ['B*51', 'COMT Met', 'DBH TT', 'NAT2 slow', 'FAAH', 'FKBP5']
  },

  actions: {
    supplements: [
      { name: 'Magnesium L-Threonate', dose: '2000mg (144mg elemental)', why: 'COMT Met/Met stress sensitivity — magnesium supports COMT enzyme function and calms nervous system', gene: 'COMT', timing: 'Evening before bed' },
      { name: 'Vitamin D3 + K2', dose: '2000 IU D3 + 100mcg K2', why: 'VDR BsmI CT — moderate receptor expression; supports bone + immune function', gene: 'VDR', timing: 'With largest meal (fat-soluble)' },
      { name: 'Omega-3 Fish Oil', dose: '1-2g EPA+DHA', why: 'FADS1 AG moderate conversion; 9p21 bilateral CAD risk; anti-inflammatory', gene: 'FADS1 / 9p21', timing: 'With food' },
      { name: 'B12 (methylcobalamin)', dose: '1000mcg sublingual', why: 'FUT2 AA non-secretor — impaired intestinal B12 absorption', gene: 'FUT2', timing: 'Morning, sublingual' },
      { name: 'Preformed DHA', dose: '500mg', why: 'FADS1 AG — reduced conversion of plant omega-3 to DHA', gene: 'FADS1', timing: 'With food' }
    ],
    diet: [
      { do: 'Mediterranean diet >80% adherence', avoid: 'Processed foods, excess red meat', why: 'Eliminates 9p21 MI risk (INTERHEART P=0.008); supports COMT function', gene: '9p21 / COMT' },
      { do: 'Limit caffeine to 1-2 cups before noon', avoid: 'Afternoon/evening caffeine, energy drinks', why: 'CYP1A2 CC slow metabolizer — caffeine stays in system 2-3x longer; >2 cups/day raises MI risk', gene: 'CYP1A2' },
      { do: 'High-fiber foods, fermented foods', avoid: 'Excess dairy', why: 'FUT2 non-secretor altered microbiome; fiber supports diversity', gene: 'FUT2' },
      { do: 'Cruciferous vegetables, green tea', avoid: 'Charred/smoked meats', why: 'Support detoxification pathways; NAT2 slow means reduced phase II clearance', gene: 'NAT2' }
    ],
    screening: [
      { test: 'Mammogram + Breast MRI', frequency: 'Annual (consider starting at 40 or earlier per genetic counselor)', why: 'TP53 CG + FGFR2 AG + aunt breast cancer at age 33 — enhanced screening warranted', priority: 'high' },
      { test: 'Genetic Counseling — Cancer Panel', frequency: 'Once (refer now)', why: 'TP53 heterozygous + family history of early breast cancer; BRCA full sequencing recommended', priority: 'high' },
      { test: 'Blood Pressure Monitoring', frequency: 'Monthly at home', why: 'DBH TT low norepinephrine — chronic low BP baseline; track for trends', priority: 'medium' },
      { test: 'Thyroid Panel (TSH, free T3/T4)', frequency: 'Annual', why: 'DIO1 AC + DIO2 CT — T4-to-T3 conversion variants; may have subclinical hypothyroid picture', priority: 'medium' },
      { test: 'MMA (methylmalonic acid)', frequency: 'Annual', why: 'FUT2 non-secretor — serum B12 unreliable; MMA is true functional marker', priority: 'medium' },
      { test: 'Annual Skin Check', frequency: 'Annual', why: 'MC1R AG — moderate melanoma/skin cancer risk', priority: 'medium' },
      { test: 'Annual EKG', frequency: 'Annual', why: 'PITX2 CT bilateral AFib risk', priority: 'medium' }
    ],
    drugAlerts: [
      { drug: 'Dapsone', action: 'avoid', why: 'NAT2 slow acetylator — caused hemolytic anemia in Quinn; same risk for Brigitte', gene: 'NAT2' },
      { drug: 'Isoniazid', action: 'avoid', why: 'NAT2 slow acetylator — hepatotoxicity risk', gene: 'NAT2' },
      { drug: 'Sulfonamides', action: 'avoid', why: 'NAT2 slow acetylator class', gene: 'NAT2' },
      { drug: 'High-dose caffeine medications', action: 'avoid', why: 'CYP1A2 CC slow metabolizer — prolonged caffeine half-life, cardiovascular risk', gene: 'CYP1A2' },
      { drug: 'NSAIDs (ibuprofen, naproxen)', action: 'reduce', why: 'CYP2C9 *1/*2 intermediate metabolism — reduce dose 25-50%', gene: 'CYP2C9' },
      { drug: 'Cannabis/THC products', action: 'caution', why: 'FAAH AC — reduced FAAH enzyme, elevated endocannabinoid tone; enhanced sensitivity', gene: 'FAAH' }
    ]
  },

  ancestry: {
    composition: [
      { region: 'Northwestern European', pct: 70, detail: 'Austrian, German — dominant ancestry; reflects Central European heritage' },
      { region: 'Southern European', pct: 12, detail: 'Italian, Iberian — HLA-B*51 carrier status consistent with Mediterranean corridor ancestry' },
      { region: 'Eastern European', pct: 10, detail: 'Balkan, Slavic — Austrian border region admixture' },
      { region: 'Other', pct: 8, detail: 'Trace Scandinavian, West Asian' }
    ],
    maternal: { haplogroup: 'H1', age: '13,000 years', origin: 'Franco-Cantabrian refugium (Ice Age southern France)', detail: 'Post-glacial recolonization of Northern Europe. Enhanced Complex I mitochondrial efficiency. Brigitte passes this mitochondrial lineage to Quinn.' },
    paternal: { haplogroup: 'Unknown', age: 'N/A', origin: 'Central European (Austrian lineage)', detail: 'Y-chromosome haplogroup not applicable to Brigitte directly. Her father\'s Y-haplogroup would be determinable from a male-line relative.' },
    variantOrigins: [
      { variant: 'HLA-B*51', from: 'unknown', detail: 'Brigitte is heterozygous carrier. Whether from maternal or paternal side unknown. Combined with Chad\'s B*51 to make Quinn homozygous.' },
      { variant: 'NAT2 slow', from: 'both parents likely', detail: 'Bilateral slow NAT2 (TT at rs1801280, AA at rs1208). Both of Brigitte\'s parents likely carried slow alleles. ~50% of Europeans are slow acetylators.' },
      { variant: 'COMT Met/Met', from: 'both parents', detail: 'Homozygous AA requires one Met from each parent. Both of Brigitte\'s parents carried at least one Met allele.' },
      { variant: 'DBH TT', from: 'both parents likely', detail: 'Homozygous TT. Both parents carried T allele. Explains Brigitte\'s own lower blood pressure tendency.' },
      { variant: 'APOE e3/e3', from: 'both parents', detail: 'Protective genotype. Neither parent carried e4. Quinn\'s e4 risk came entirely from Chad.' },
      { variant: 'TP53 CG', from: 'unknown', detail: 'Heterozygous. Combined with aunt\'s breast cancer at 33, suggests maternal family cancer predisposition worth investigating.' },
      { variant: 'MC1R AG', from: 'unknown', detail: 'Single Celtic variant. Less than Chad\'s compound MC1R (x4). Austrian ancestry consistent with moderate fair-skin genetics.' }
    ]
  },

  clinical: {
    subtitle: 'Pharmacogenomic Profile · HLA-B*51 Carrier · Age 48',
    badge: 'PGx',
    oneLiner: 'HLA-B*51 heterozygous carrier, NAT2 slow acetylator, COMT Met/Met, CYP1A2 CC slow caffeine metabolizer. Primary genetic contributor to Quinn\'s Behcet\'s risk profile. APOE e3/e3 protective for Alzheimer\'s.',
    sections: [
      {
        title: 'Key Alerts',
        rows: [
          { label: 'NAT2', value: 'SLOW ACETYLATOR — avoid dapsone, isoniazid, sulfonamides', alert: true },
          { label: 'CYP1A2', value: 'CC slow caffeine — limit to 1-2 cups/day; MI risk above that', alert: true },
          { label: 'HLA-B*51', value: 'Heterozygous carrier — contributed one copy to Quinn\'s homozygous status' },
          { label: 'CYP2C9', value: '*1/*2 intermediate — reduce NSAID doses 25-50%', alert: true }
        ]
      },
      {
        title: 'Cancer Screening — Priority',
        rows: [
          { label: 'TP53', value: 'CG heterozygous — modified p53 apoptosis', alert: true },
          { label: 'FGFR2', value: 'AG — breast cancer susceptibility locus' },
          { label: 'Family Hx', value: 'Aunt breast cancer at age 33 — early onset, genetic counseling indicated', alert: true },
          { label: 'MC1R', value: 'AG — moderate skin cancer risk; annual derm check' },
          { label: 'BRCA1/2', value: 'Chip normal but full sequencing recommended given family history' }
        ]
      },
      {
        title: 'Neurological Profile',
        rows: [
          { label: 'COMT', value: 'AA Met/Met — worrier genotype; highest prefrontal dopamine but stress-sensitive' },
          { label: 'FKBP5', value: 'CT — enhanced glucocorticoid receptor sensitivity; stronger stress response' },
          { label: 'APOE', value: 'e3/e3 — NO Alzheimer\'s risk; major protective advantage' },
          { label: 'DBH', value: 'TT — low norepinephrine production; chronic low BP tendency' }
        ]
      },
      {
        title: 'Cardiovascular',
        rows: [
          { label: '9p21', value: 'x3 bilateral CAD risk — same as Chad; Mediterranean diet critical', alert: true },
          { label: 'PITX2', value: 'CT — AFib risk; annual EKG recommended' },
          { label: 'DBH', value: 'TT — low norepinephrine; monitor blood pressure (tends low)' },
          { label: 'Factor V', value: 'CC — no clotting risk' }
        ]
      }
    ],
    alerts: [
      { text: 'DO NOT prescribe: dapsone, isoniazid, sulfonamides (NAT2 slow acetylator)' },
      { text: 'LIMIT caffeine to 1-2 cups/day (CYP1A2 CC slow — MI risk elevated above that)' },
      { text: 'REDUCE dose: all NSAIDs by 25-50% (CYP2C9 *1/*2)' },
      { text: 'CANCER SCREENING: genetic counseling referral for TP53 + aunt breast CA at 33' },
      { text: 'STRESS MANAGEMENT: genetically indicated (COMT AA + FKBP5 CT); yoga/meditation priority' },
      { text: 'SUN PROTECTION: SPF 30+ daily, annual skin check (MC1R AG)' }
    ]
  },

  imaging: []
};
