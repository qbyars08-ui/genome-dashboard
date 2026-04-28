/* ═══════════════════════════════════════════════════════════════
   STRAND Data — Quinn Byars
   Extracted from quinn.html (the original inline JS data object).
   ═══════════════════════════════════════════════════════════════ */

window.STRAND_PERSON = {
  id:       'quinn',
  name:     'Quinn Byars',
  fullName: 'Quinn Joseph Byars',
  role:     'Proband',
  age:      17,
  dob:      '2008-07-22',
  location: 'Portland, OR',

  badges: ['B*51/B*51', 'UNC13D VUS', 'NAT2 Slow', 'MTHFR C+A'],

  vitals: [
    { label: 'HLA',        value: 'B*51/B*51', sub: 'Homozygous',            accent: 'red'    },
    { label: 'AM Cortisol',value: 'LOW',        sub: 'HPA suppressed · 4/18', accent: 'red'    },
    { label: 'Prednisone', value: '20mg',       sub: 'Hold — HPA recovery',   accent: 'amber'  },
    { label: 'Otezla',     value: 'APPROVED',   sub: 'Starting titration',    accent: 'green'  },
    { label: 'ICBD Score', value: '4',          sub: 'Oral 2 + Genital 2',    accent: 'green'  }
  ],

  alert: {
    title: 'Cortisol Results Back — April 18, 2026',
    headline: 'HPA Axis Suppression Confirmed — Low AM Cortisol, Normal PM',
    chips: [
      'AM cortisol: LOW · PM cortisol: normal (4-point Eli spit test)',
      'Chronic shaky/jittery on waking (ongoing for weeks+, now explained by low AM cortisol)',
      'Otezla (apremilast) APPROVED — ready to titrate per RELIEF schedule',
      'Prozac stepped 30mg → 20mg (watch for SSRI discontinuation jitter)',
      'Hold further prednisone taper until HPA axis plan in place',
      'Eat protein+carb within 30min of waking to blunt AM hypoglycemia'
    ]
  },

  data: {
    cv: {
      title:       'Cardiovascular',
      accent:      'red',
      score:       65,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     'LVEF recovered 33→57% (no scar), but T2 persistently elevated 4+ months + bilateral 9p21 + LDL 142',
      methodology: 'Score combines: inherited risk alleles (50%), current lab values (30%), acute cardiac history (20%). Score = 50 + sum of factor deltas.',
      factors: [
        { name: '9p21 bilateral ×3',         delta: +12, note: 'All 3 CAD tag SNPs risk-allele from both parents' },
        { name: 'LDL 142 + ApoB 103 at 17',  delta: +10, note: 'Atherogenic threshold already crossed at 17' },
        { name: 'Post-myocarditis 33→57%', delta: +8,  note: 'Cardiac MRI 4/24/26: LVEF 33→52→57% recovery continuing. NO LGE (no scar). NO fibrosis (T1/ECV normal). BUT T2 persistently 60 msec mildly elevated, UNCHANGED 4+ months → low-grade ongoing inflammation. Sarcoidosis ruled out by absence of LGE.' },
        { name: 'PITX2 AFib — bilateral',     delta: +5,  note: '75% carrier from both parents; sister has PAF' },
        { name: 'Factor V Leiden — clear',    delta: -5,  note: 'CC from both parents; no clotting risk' },
        { name: 'DBH TT hypotension',         delta: -5,  note: 'Chronic low BP lowers thromboembolic risk' }
      ],
      trend:      { dir: 'improving', note: 'Cardiac MRI 4/24/26: LVEF 57% (up from 52% Dec 2025). No scarring. Mild T2 edema unchanged — subclinical inflammation persists.' },
      comparison: { label: 'vs age-matched (17M) peer', value: '+2.1 SD above population mean risk' },
      status: 'Recovery + Mild Residual Edema',
      findings: [
        {
          g: 'EF 57%', c: 'f-amber',
          n: 'Post-Myocarditis — Recovery + Residual T2',
          l: 'LVEF recovered 33→52→57% (Sept 2025 → Dec 2025 → 4/24/26). No scarring. Mild T2 edema persists unchanged for 4+ months.',
          d: 'MRI 4/24/26 (En-Haw Wu, OHSU): LVEF 57% (up from 52%). RVEF 50%. NO LGE — no myocardial scarring. Normal T1 (996 msec) + normal ECV (0.24) — no fibrosis. T2 mapping MILDLY ELEVATED at 60 msec, UNCHANGED from Dec 2025 → suggests persistent low-grade myocardial inflammation/edema that has not resolved. Differential for unchanged T2: smoldering BD vasculitic activity (most likely given active disease), persistent post-viral inflammation, chronic subclinical myocarditis. Sarcoidosis ruled out by absent LGE. Mechanism of original injury: TNF-alpha AG (high producer) + IL-6 + IFN-gamma cytokine storm directly cardiotoxic — not primary cardiac disease, collateral damage from immune dysregulation. KEY QUESTIONS FOR TUCKER: (1) Does unchanged T2 change management? (2) Is enalapril still indicated at LVEF 57%? (3) Activity clearance modification? (4) Otezla start timing given subclinical inflammation? (5) Repeat MRI interval.'
        },
        {
          g: '9p21 x3', c: 'f-red',
          n: '9p21 CAD Risk — Bilateral',
          l: 'Inherited all 3 CAD risk alleles from both parents. Father: stent 62, CABG 75.',
          d: 'Both Chad and Brigitte carry rs10757278 AG, rs1333049 CG, rs4977574 AG. Quinn guaranteed at least one risk allele at each locus. LDL already 142 + ApoB 103 at age 17. Mediterranean diet eliminates 9p21 MI risk at >80% adherence (INTERHEART P=0.008).'
        },
        {
          g: 'PITX2 CT', c: 'f-amber',
          n: 'PITX2 AFib Risk — Bilateral',
          l: 'Both parents carry. 75% chance Quinn has at least one copy. Sister has PAF.',
          d: 'PITX2 is strongest AFib locus. Both parents CT = 75% carrier probability. Alcohol >3/week multiplicative. Annual EKG recommended.'
        }
      ],
      deep: [
        {
          g: '2.5mg BID', c: 'f-amber',
          n: 'Enalapril — Reassess',
          l: 'On ACE inhibitor post-myocarditis but BP runs chronically low (DBH TT).',
          d: 'DBH TT from Brigitte = low norepinephrine. NOS3 CT from Brigitte = reduced eNOS. Enalapril further lowers BP. If EF recovered, may be causing more harm than benefit via orthostatic symptoms.'
        },
        { g: 'CC', c: 'f-green', n: 'Factor V Leiden', l: 'No clotting risk. Both parents CC.' }
      ],
      actions: [
        'Cardiac MRI — definitive clearance for activity',
        'Reassess enalapril with cardiology (BP 65-100 systolic chronic)',
        'Mediterranean diet NOW — LDL 142 + ApoB 103 atherogenic at 17'
      ]
    },

    nr: {
      title:       'Immune / BD',
      accent:      'purple',
      score:       78,
      band:        'high-risk',
      bandLabel:   'High Risk',
      summary:     'HLA-B*51 homozygous + UNC13D VUS + TNF-α AG — active Behcet\'s flare',
      methodology: 'Score combines: HLA genotype (40%), functional immune testing (35%), active disease burden (25%). Homozygous B*51 alone places baseline at 65+.',
      factors: [
        { name: 'HLA-B*51 homozygous',      delta: +18, note: 'OR ~10.96× — both copies from both parents; strongest BD driver' },
        { name: 'UNC13D VUS — NK defect',   delta: +10, note: 'Abnormal NK cell degranulation on functional testing' },
        { name: 'TNF-α AG — high producer', delta: +8,  note: 'Guaranteed one high-TNF allele from Dad; anti-TNF targets this' },
        { name: 'ICBD score 4 — active',    delta: +6,  note: 'Oral 2 + genital 2; Behcet\'s criteria met' },
        { name: 'TMD / bruxism + tension HA', delta: +3, note: 'Bilateral temporalis muscle pain + visible bulging in temporal fossa with jaw use. Dentist read: clenching/grinding. Tension headaches with throbbing temporal sensation. Likely amplified by SSRI (fluoxetine), prednisone agitation, COMT Met stress sensitivity. Cranial vasculitis remote differential to rule out at Kingsbury visit but NOT primary concern.' },
        { name: 'CTLA4 autoimmune check',   delta: +4,  note: 'Modified immune checkpoint from bilateral carriers' },
        { name: 'FUT2 non-secretor',        delta: -8,  note: 'Altered microbiome but norovirus resistant; minor protective pattern' }
      ],
      trend:      { dir: 'worsening', note: 'Active flare April 2026; prednisone bumped 18→20mg; new vascular finding (temporal artery pulsation) under eval' },
      comparison: { label: 'vs general population BD risk', value: 'Homozygous B*51 = top 0.01% risk tier' },
      status: 'B*51 Active',
      findings: [
        {
          g: 'B*51/B*51', c: 'f-red',
          n: 'HLA-B*51 Homozygous',
          l: 'Both copies B*51. Strongest BD risk factor. OR ~10.96x.',
          d: 'One copy from each parent. ICBD criteria MET: oral ulcers (2pts) + genital ulcers documented with scarring (2pts) = 4 points. Kingsbury says "incomplete" — genital ulcers need to be confirmed in chart. This is a documentation problem, not a diagnostic one.'
        },
        {
          g: 'VUS', c: 'f-red',
          n: 'UNC13D — NK Cell Degranulation Defect',
          l: 'Variant of uncertain significance. Abnormal on functional testing.',
          d: "UNC13D encodes Munc13-4, required for NK cell cytotoxic granule release. Quinn's NK cells can find EBV-infected targets but can't pull the trigger. This explains why EBV reactivation escalated to cytokine storm — the first-line defense couldn't clear the virus."
        },
        {
          g: 'AG', c: 'f-red',
          n: 'TNF-alpha — High Producer Guaranteed',
          l: 'Dad is AA (highest). Quinn AG minimum. Anti-TNF directly targets this.',
          d: 'TNF-alpha rs1800629: Chad AA (highest producer), Brigitte GG. Quinn is AG — guaranteed one high-TNF allele from Dad. Anti-TNF therapy (infliximab/adalimumab) blocks the exact molecule Quinn\'s genome overproduces. If Otezla fails, this is the most genetically-targeted escalation.'
        }
      ],
      deep: [
        { g: 'CC', c: 'f-amber', n: 'IL-6 Highest Producer (possible)', l: 'Dad is CC. If Quinn inherited, compounds TNF-alpha for strong inflammatory drive.' },
        { g: 'AG', c: 'f-amber', n: 'CTLA4 Autoimmune Checkpoint',       l: 'Modified immune checkpoint. Increased autoimmune risk.' },
        { g: 'AA', c: 'f-green', n: 'FUT2 Non-Secretor',                 l: '100% from both parents. Altered gut microbiome, norovirus resistant.' },
        {
          g: 'TMD', c: 'f-amber',
          n: 'TMD / Bruxism — Temporalis Myalgia + Tension Headache',
          l: 'Bilateral temporalis muscle pain + visible bulging in temporal fossa with jaw use. Dentist diagnosed clenching/grinding. Throbbing sensation in temple is muscle tension + overlying STA prominence, not primary vasculitis.',
          d: 'KEY ANATOMY: the temporalis muscle originates in the temporal fossa (the "divot" lateral to brow tail) and inserts on the mandible. When clenched, it bulges outward filling the hollow. Chronic clenching → temporalis myalgia → tension headache → throbbing sensation that LOOKS vascular but is mostly muscular. CONTRIBUTORS in Quinn\'s case: (1) chronic illness stress, (2) COMT Met heightened stress sensitivity + DBH TT low NE, (3) SSRI-associated bruxism — fluoxetine causes/worsens bruxism in 5-10% of users (the 30→20 step may help), (4) prednisone agitation + sleep fragmentation → more nocturnal grinding, (5) topiramate neutral. INTERVENTIONS in order of impact: (1) Custom bite splint/night guard from dentist — single highest-impact, wear nightly, $300-600. (2) Short-course cyclobenzaprine 5mg HS 2-4 weeks to break spasm cycle (discuss Crowley). (3) Trigger point massage of temporalis 2x daily. (4) Daytime jaw-relax check-in reminders. (5) Heat to masseter + temporalis before meals. (6) Reassess fluoxetine with Crowley if bruxism persists post-taper. (7) Stress management. CRANIAL VASCULITIS DOWNGRADED: this initially looked vascular before TMD context known. Still mention to Kingsbury at next visit as a rule-out (active BD context), but no longer primary concern. RED FLAGS still apply (vision changes, jaw claudication, thunderclap HA, scalp tenderness, new neuro deficit) → urgent eval if any appear.'
        }
      ],
      actions: [
        'Document genital ulcers in chart — ICBD criteria are MET',
        'Otezla trial (PDE4 inhibitor, steroid-sparing)',
        'If Otezla fails: anti-TNF escalation (targets TNF-alpha AG directly)',
        'Custom bite splint / night guard from dentist — primary intervention for TMD/bruxism temporal pain',
        'Mention temporal pain to Kingsbury as cranial vasculitis rule-out (low priority — TMD is primary read)'
      ]
    },

    ca: {
      title:       'GI / Gut',
      accent:      'orange',
      score:       70,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     'Terminal ileal scarring → bile acid malabsorption; HPA suppression CONFIRMED 4/18',
      methodology: 'Score combines: structural bowel findings (40%), functional GI symptoms (35%), medication side-effects (25%). TI scarring is permanent and raises baseline.',
      factors: [
        { name: 'TI scarring — permanent',    delta: +14, note: 'Colonoscopy-confirmed; bile acid reabsorption lost' },
        { name: 'BAM — morning diarrhea',     delta: +8,  note: 'Classic pattern; cholestyramine never trialed' },
        { name: 'HPA suppression CONFIRMED',  delta: +10, note: 'AM cortisol LOW, PM normal (Eli 4/18). Classic iatrogenic secondary adrenal insufficiency from prednisone.' },
        { name: 'Ferritin 217 — recovered',   delta: -5,  note: 'Iron replete; down from 7,105 in Sept 2025' },
        { name: 'FUT2 AA non-secretor',       delta: +2,  note: 'Altered microbiome baseline; B12 impaired' },
        { name: 'CRP 0.5 mg/L',               delta: -4,  note: 'Inflammation currently controlled on prednisone' }
      ],
      trend:      { dir: 'stable', note: 'Daily diarrhea persists; Lomotil ran out; MRE scheduled May 2026' },
      comparison: { label: 'vs IBD-affected peers', value: 'TI scarring at 17 is atypical; BD-related not Crohn\'s' },
      status: 'TI Scarring + BAM',
      findings: [
        {
          g: 'TI Scarring', c: 'f-red',
          n: 'Terminal Ileal Disease',
          l: 'Colonoscopy: diffuse ulceration, TI inflammation with scarring.',
          d: 'Documented on colonoscopy. Terminal ileal scarring is permanent. Causes bile acid malabsorption (BAM) — bile acids not reabsorbed in scarred TI, hit colon, cause osmotic watery diarrhea. Worst in morning (overnight bile pool dumps with first meal). Lomotil was masking this.'
        },
        {
          g: 'BAM', c: 'f-red',
          n: 'Bile Acid Malabsorption',
          l: 'Classic morning diarrhea pattern. Cholestyramine never trialed.',
          d: 'Cholestyramine 4g before breakfast would be both diagnostic AND therapeutic. If it works, confirms BAM as primary diarrhea driver. Has never been tried despite textbook presentation with TI scarring. Ask Dr. Tung.'
        },
        {
          g: 'HPA ✓', c: 'f-red',
          n: 'HPA Axis Suppression — CONFIRMED (4/18/26)',
          l: 'Eli AM spit test collected 4/18/26 — first-ever morning cortisol.',
          d: 'RESULT (4/18/26): AM cortisol LOW, evening normal. Classic pattern of iatrogenic secondary adrenal insufficiency from months of exogenous prednisone. CHRONIC symptomatic — the shaky/jittery feeling on waking has been going on for weeks, predating today\'s Prozac step. Physiology: no AM cortisol peak → liver\'s gluconeogenesis doesn\'t ramp → mild fasting hypoglycemia → sympathetic compensation → tremor/jitter. The body has been signaling this for weeks; today\'s lab is the confirmation. NEXT: (1) Hold further prednisone taper. (2) Discuss morning hydrocortisone replacement with Crowley/Kingsbury — likely indicated given the chronic symptom. (3) ACTH stim test to quantify severity. (4) Stress-dose coverage awareness for illness/surgery. (5) Medical alert consideration. Ask Crowley for the numeric AM cortisol value (µg/dL) — <3 typically means replacement, 3–10 gray zone, >10 usually recovering.'
        }
      ],
      deep: [
        { g: 'AA',         c: 'f-amber', n: 'FUT2 Non-Secretor',         l: 'Altered gut microbiome composition from birth. B12 absorption impaired.' },
        { g: 'Ferritin 217', c: 'f-green', n: 'Iron Status — Stop NovaFerrum', l: 'Ferritin recovered from 7,105 to 217. Iron replete. Supplement may worsen diarrhea.' }
      ],
      actions: [
        'Lomotil refill TODAY',
        'Cholestyramine trial — ask Dr. Tung',
        'Stop NovaFerrum (ferritin 217, may worsen diarrhea)'
      ]
    },

    dr: {
      title:       'Drug Response',
      accent:      'amber',
      score:       45,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'NAT2 slow + ABCB1 BBB leak + bilateral CYP2C9/C19 intermediate — 2 prior drug reactions',
      methodology: 'Score reflects complexity of current pharmacogenomic landscape. Lower score = more manageable. Absolute contraindications count +15 each; interactions count +5.',
      factors: [
        { name: 'NAT2 slow — dapsone banned',     delta: +15, note: 'Caused hemolytic anemia Hgb 12.6→8.2; NEVER resume' },
        { name: 'ABCB1 — colchicine banned',       delta: +10, note: 'CNS accumulation, severe headaches; NEVER resume' },
        { name: 'CYP2C9 bilateral intermediate',   delta: +5,  note: 'From both parents; reduce NSAID doses ~25%' },
        { name: 'CYP2C19 bilateral intermediate',  delta: +3,  note: 'Clopidogrel reduced efficacy; omeprazole higher levels' },
        { name: 'FKBP5 CT — enhanced GR response', delta: -8,  note: 'Prednisone works well at lower doses; therapeutic benefit' },
        { name: 'CYP2D6 — untested',               delta: +5,  note: 'Nebula WGS pending; fluoxetine dosing uncertain' },
        { name: 'FAAH AC endocannabinoid tone',    delta: +5,  note: 'Enhanced sensitivity; caution with cannabinoids' }
      ],
      trend:      { dir: 'stable', note: 'No new drug reactions since colchicine; Nebula WGS pending resolution of CYP2D6' },
      comparison: { label: 'vs general PGx population', value: '2 confirmed prior adverse drug reactions' },
      status: '6 Interactions',
      findings: [
        {
          g: 'NAT2 slow', c: 'f-red',
          n: 'Dapsone Toxicity — NAT2 From Brigitte',
          l: 'Slow acetylator. Caused hemolytic anemia (Hgb 12.6 to 8.2). NEVER resume.',
          d: 'Brigitte NAT2: TT at rs1801280, AA at rs1208 = clear slow acetylator. Quinn inherited slow alleles. Dapsone hydroxylamine metabolite accumulated, caused oxidative hemolysis in Belize. Also means isoniazid and sulfonamides problematic.'
        },
        {
          g: 'ABCB1', c: 'f-amber',
          n: 'Colchicine — CNS Accumulation',
          l: 'Reduced P-glycoprotein transporter. Colchicine crossed BBB, severe headaches.',
          d: 'ABCB1 rs1128503: Chad AG. If Quinn inherited A allele, reduced drug efflux at BBB. Colchicine accumulated in CNS causing neurotoxicity. The failure wasn\'t intolerance — it was a specific transporter variant.'
        },
        {
          g: 'FKBP5 CT', c: 'f-green',
          n: 'Prednisone — Enhanced GR Sensitivity',
          l: 'From Brigitte. Explains why low-dose prednisone works so well.',
          d: 'FKBP5 CT = enhanced glucocorticoid receptor sensitivity. Prednisone binds more effectively at lower concentrations. Quinn\'s 10mg threshold makes pharmacogenomic sense.'
        }
      ],
      deep: [
        { g: 'CYP2C9 x2',  c: 'f-amber', n: 'CYP2C9 Bilateral Intermediate', l: 'Both parents *1/*2. Quinn intermediate metabolizer. Reduce NSAID doses.' },
        { g: 'CYP2C19',    c: 'f-amber', n: 'CYP2C19 Bilateral',             l: 'Both parents *1/*2. Clopidogrel reduced efficacy. Omeprazole higher levels.' },
        { g: 'CYP2D6?',    c: 'f-amber', n: 'CYP2D6 Unknown',                l: "23andMe can't type CYP2D6. Nebula WGS will resolve. Affects fluoxetine." },
        { g: 'FAAH AC',    c: 'f-purple', n: 'FAAH Endocannabinoid',          l: 'From Brigitte. Reduced FAAH = elevated endocannabinoid tone.' }
      ],
      actions: [
        'NO dapsone, NO sulfonamides (NAT2 slow)',
        'CYP2D6 testing needed (Nebula WGS)',
        'Carry drug alert card — show before any new prescription'
      ]
    },

    mt: {
      title:       'Labs / Metabolism',
      accent:      'green',
      score:       52,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'Testosterone 211 ng/dL (low), LDL 142, Vitamin D 26.5 — 3 of 6 labs abnormal',
      methodology: 'Score reflects current lab burden vs genetic prediction accuracy. Lower score = closer to optimal. Each abnormal lab within predicted range +5; unexpected abnormal +10.',
      factors: [
        { name: 'Testosterone 211 ng/dL',   delta: +10, note: 'Low for 17M (normal 300–1000); prednisone HPG suppression' },
        { name: 'LDL 142 + ApoB 103 mg/dL', delta: +8,  note: 'Atherogenic at 17 with bilateral 9p21' },
        { name: 'Vitamin D 26.5 ng/mL',     delta: +5,  note: 'GC GT + VDR AG predicted low; confirmed; target 50–60' },
        { name: 'MTHFR compound het',        delta: +3,  note: '~50% reduced methylation; methylfolate required' },
        { name: 'Ferritin 217 ng/mL',        delta: -8,  note: 'Recovered from 7,105; iron replete; stop NovaFerrum' },
        { name: 'CRP 0.5 mg/L',              delta: -8,  note: 'Inflammation controlled on 20mg prednisone' }
      ],
      trend:      { dir: 'improving', note: 'Ferritin normalized; testosterone recheck due in 8 weeks' },
      comparison: { label: 'vs 17M age-sex-matched reference', value: '3 of 6 key labs outside reference range' },
      status: '4 Abnormal',
      findings: [
        {
          g: '211', c: 'f-red',
          n: 'Testosterone 211 ng/dL — LOW',
          l: 'Normal for 17M: 300-1000. Prednisone HPG axis suppression.',
          d: 'Critically low. Affects energy, mood, motivation, muscle mass, bone density, recovery. Will recover as prednisone tapers, but needs monitoring. Recheck in 8 weeks.'
        },
        {
          g: '142', c: 'f-red',
          n: 'LDL 142 + ApoB 103',
          l: 'Atherogenic at 17 with bilateral 9p21. Target LDL <100.',
          d: '9p21 x3 from both parents + father CABG at 75. LDL 142 and ApoB 103 are already in the intervention range. Mediterranean diet is first line. If persistent, early statin conversation.'
        },
        {
          g: '26.5', c: 'f-amber',
          n: 'Vitamin D 26.5 ng/mL',
          l: 'GC GT + VDR AG + CYP27B1 predicted LOW. Confirmed. Target 50-60.',
          d: 'Genetic prediction exactly confirmed by labs. Need 5000 IU/day minimum. Critical for immune regulation with active BD.'
        }
      ],
      deep: [
        { g: 'AG GT',  c: 'f-amber', n: 'MTHFR Compound',   l: 'C677T + A1298C from both parents. ~50% reduced methylation. Methylfolate only.' },
        { g: '217',    c: 'f-green', n: 'Ferritin 217',      l: 'Recovered from 7,105. Iron replete. Stop NovaFerrum.' },
        { g: '0.5',    c: 'f-green', n: 'CRP 0.5 mg/L',      l: 'Excellent. Inflammation currently controlled on 18mg prednisone.' }
      ],
      actions: [
        'Testosterone recheck in 8 weeks',
        'Vitamin D3 5000 IU daily (target 50-60)',
        'Homocysteine + MMA (MTHFR compound + FUT2)'
      ]
    },

    lg: {
      title:       'Mental Health',
      accent:      'blue',
      score:       55,
      band:        'monitor',
      bandLabel:   'Monitor',
      summary:     'Active MDD + COMT Met + DBH TT — contextual depression on fluoxetine taper',
      methodology: 'Score combines: active psychiatric diagnoses (40%), genetic neurotransmitter profile (35%), contextual stressors (25%). Chronic illness burden is a major contextual factor.',
      factors: [
        { name: 'MDD active — Feb 2026',     delta: +12, note: 'Diagnosed 2/5/26; fluoxetine stepped 30→20 on 4/18' },
        { name: 'COMT Met (at least one)',    delta: +8,  note: 'Brigitte AA; Quinn at least one Met = stress-sensitive dopamine' },
        { name: 'DBH TT — low norepinephrine',delta: +5, note: 'Chronic low BP + fatigue; enalapril compounds this' },
        { name: '6 circadian clock genes',   delta: +5,  note: 'CRY1, CLOCK, NPAS2 bilateral + PER2, PER3, ADA from Brigitte' },
        { name: 'FKBP5 CT — HPA sensitized', delta: +5,  note: 'Enhanced cortisol binding; stronger stress response' },
        { name: 'Contextual: ICU + isolation',delta: +5, note: 'EBV crisis, months steroids, school disruption' },
        { name: 'Fluoxetine taper — 30→20',  delta: -8,  note: 'Stepped down 4/18. (Note: pre-existing chronic morning jitter is cortisol-driven, not SSRI withdrawal — those symptoms predate today\'s step.)' }
      ],
      trend:      { dir: 'improving', note: 'Transitioning from Joel Lampert to Mangata Wellness; taper in progress' },
      comparison: { label: 'vs adolescent chronic illness cohort', value: 'MDD prevalence 3× higher in chronic illness teens' },
      status: 'MDD Tapering',
      findings: [
        {
          g: 'MDD', c: 'f-amber',
          n: 'Major Depressive Disorder',
          l: 'Active episode diagnosed 2/5/26. Fluoxetine 30mg (tapering from 40).',
          d: 'Joel Lampert, PsyD managing. Transitioning to Mangata Wellness locally. Depression is contextual — chronic illness, ICU survival, months of steroids, isolation from school.'
        },
        {
          g: 'COMT Met+', c: 'f-purple',
          n: 'COMT — At Least One Met Allele',
          l: 'Brigitte is AA (Met/Met). Quinn guaranteed at least one Met. Higher stress sensitivity.',
          d: 'COMT Val/Met or Met/Met. Met = slower dopamine clearance = higher baseline but more stress-sensitive. Affects SSRI response and stress resilience.'
        },
        {
          g: 'DBH TT', c: 'f-amber',
          n: 'DBH TT — Low Norepinephrine',
          l: 'From Brigitte. Chronic hypotension. Orthostatic symptoms. Fatigue.',
          d: 'DBH converts dopamine to norepinephrine. TT = reduced conversion. Low NE explains chronic low BP (65-100 systolic), orthostatic dizziness, fatigue. Enalapril compounds this.'
        }
      ],
      deep: [
        { g: '6 genes',   c: 'f-amber', n: 'Circadian Disruption — 6 Clock Genes', l: 'CRY1, CLOCK, NPAS2 bilateral + PER2, PER3, ADA from Brigitte.' },
        { g: 'FKBP5 CT', c: 'f-amber', n: 'Enhanced Cortisol Sensitivity',         l: 'From Brigitte. Stronger HPA axis stress response.' }
      ],
      actions: [
        'Meeting with Crowley — discuss Prozac taper plan',
        'Joel Lampert is primary psych — be honest about everything',
        'Sleep 7-8 hours non-negotiable (6 circadian genes disrupted)'
      ]
    }
  },

  meds: [
    { name: 'Prednisone',   dose: '20mg',      status: 'amber', gene: 'FKBP5',   note: 'HPA axis suppressed (AM cortisol low 4/18). HOLD taper. Discuss AM hydrocortisone replacement.' },
    { name: 'Otezla',       dose: 'Titrating', status: 'green', gene: 'PDE4',    note: 'Apremilast APPROVED 4/18. RELIEF schedule: 10→10BID→10+20→20BID→20+30→30BID. GI + headache AEs days 3–7.' },
    { name: 'Fluoxetine',   dose: '20mg',      status: 'amber', gene: 'CYP2D6',  note: 'Stepped 30→20 on 4/18. Watch for SSRI discontinuation jitter (brain zaps, tremor, GI) — may be additive to low AM cortisol.' },
    { name: 'Enalapril',    dose: '2.5mg BID', status: 'amber', gene: 'NOS3+DBH', note: 'Low BP 65-100. Reassess with cardiology.' },
    { name: 'Topiramate',   dose: '10mg BID',  status: 'green', gene: 'Safe',    note: 'No direct PGx concern. Monitor cognitive fog.' },
    { name: 'Famotidine',   dose: 'Standard',  status: 'green', gene: 'Safe',    note: 'No PGx interaction.' },
    { name: 'Methylfolate', dose: '800mcg',    status: 'green', gene: 'MTHFR',   note: 'Bypasses MTHFR compound block. Critical.' },
    { name: 'Vitamin D3',   dose: '5000 IU',   status: 'green', gene: 'VDR+GC',  note: 'GC + VDR predict low. Target 50-60 ng/mL.' }
  ],

  alerts: [
    { level: 'block', text: 'NO DAPSONE: NAT2 slow acetylator. Caused hemolytic anemia (Hgb 12.6 → 8.2).' },
    { level: 'block', text: 'NO COLCHICINE: ABCB1 reduced transporter. CNS accumulation, severe headaches.' },
    { level: 'warn',  text: 'HPA axis suppressed (AM cortisol LOW 4/18). Hold prednisone taper. Stress-dose coverage needed for illness/surgery.' },
    { level: 'warn',  text: 'Chronic morning shaky/jittery (ongoing, not new) — now explained by low AM cortisol. Body has been signaling HPA suppression for weeks.' },
    { level: 'warn',  text: 'CYP2C9 bilateral intermediate: reduce NSAID doses.' },
    { level: 'warn',  text: 'FUT2 non-secretor: serum B12 falsely normal. Check MMA.' }
  ],

  labs: [
    { name: 'AM Cortisol',    value: 'LOW',  unit: 'µg/dL', status: 'low',    trend: 'new',    date: '2026-04-18', note: 'Eli salivary — PM normal. HPA suppression confirmed. Ask for numeric value.' },
    { name: 'PM Cortisol',    value: 'NORM', unit: 'µg/dL', status: 'normal', trend: 'new',    date: '2026-04-18', note: 'Evening cortisol preserved; diurnal rhythm flattened, not absent.' },
    { name: 'Testosterone',   value: 211,    unit: 'ng/dL', status: 'low',    trend: 'down'    },
    { name: 'LDL Cholesterol',value: 142,    unit: 'mg/dL', status: 'high',   trend: 'stable'  },
    { name: 'ApoB',           value: 103,    unit: 'mg/dL', status: 'high',   trend: 'stable'  },
    { name: 'Vitamin D',      value: 26.5,   unit: 'ng/mL', status: 'low',    trend: 'down'    },
    { name: 'Ferritin',       value: 217,    unit: 'ng/mL', status: 'normal', trend: 'down'    },
    { name: 'CRP',            value: 0.5,    unit: 'mg/L',  status: 'normal', trend: 'stable'  }
  ],

  doctor: {
    subtitle: 'DOB 7/22/2008 · Active Behcet\'s Investigation',
    badge: 'BD + PGx',
    sections: [
      {
        title: 'Primary Diagnosis',
        rows: [
          { label: 'HLA-B*51',   value: 'Homozygous (both copies)',                   alert: true },
          { label: 'UNC13D',     value: 'VUS, abnormal NK degranulation',              alert: true },
          { label: 'ICBD Score', value: '4 (oral 2 + genital 2)',                      alert: true },
          { label: 'Sept 2025',  value: 'EBV crisis, ferritin 7105, EF 33%',           alert: true }
        ]
      },
      {
        title: 'Active Flare — April 12, 2026',
        rows: [
          { label: 'Oral Ulcers',  value: 'Bilateral (L + R lower). Cannot eat without opioid pain relief.', alert: true },
          { label: 'Jaw Pain',     value: 'Left side, pain on chewing and smiling',   alert: true },
          { label: 'Topical Tx',   value: 'Clobetasol + dexamethasone mouthwash — NOT controlling' },
          { label: 'Diarrhea',     value: 'Daily morning, persistent, Lomotil ran out', alert: true },
          { label: 'Cortisol',     value: 'Eli AM spit test COLLECTED 4/18/26. Results pending 5–10 business days.', alert: true }
        ]
      },
      {
        title: 'Current Medications',
        rows: [
          { label: 'Prednisone',     value: '20mg — bumped from 18mg for flare 4/12',  alert: true },
          { label: 'Fluoxetine',     value: '30mg (tapering from 40)' },
          { label: 'Enalapril',      value: '2.5mg BID' },
          { label: 'Topiramate',     value: '10mg BID' },
          { label: 'Famotidine',     value: 'Standard' },
          { label: 'Clobetasol',     value: 'Topical for ulcers — insufficient' },
          { label: 'Dexa Mouthwash', value: 'Dexamethasone rinse — insufficient' }
        ]
      },
      {
        title: 'Key Labs (Rhythm April 2026)',
        rows: [
          { label: 'Testosterone', value: '211 ng/dL (LOW)',   alert: true },
          { label: 'LDL',          value: '142 mg/dL',          alert: true },
          { label: 'ApoB',         value: '103 mg/dL' },
          { label: 'Vitamin D',    value: '26.5 ng/mL' },
          { label: 'Ferritin',     value: '217 ng/mL' }
        ]
      }
    ],
    alerts: [
      { text: 'NO DAPSONE: NAT2 slow acetylator. Caused hemolytic anemia (Hgb 12.6 to 8.2).' },
      { text: 'NO COLCHICINE: ABCB1 reduced transporter. CNS accumulation, severe headaches.' },
      { text: 'TMD / BRUXISM (dentist dx): Bilateral temporalis myalgia + tension headache. Temple "throbbing" is muscle bulging in temporal fossa during clenching, not primarily vascular. Action: bite splint/night guard. Likely amplified by fluoxetine SSRI bruxism + prednisone agitation. Cranial vasculitis is a low-priority rule-out at next Kingsbury visit, NOT primary concern.' },
      { text: 'CARDIAC MRI 4/24/26: LVEF 57% (up from 52%). No LGE. No fibrosis. T2 mildly elevated 60 msec UNCHANGED from 12/2025 — persistent mild myocardial edema. Discuss with Tucker: enalapril indication, activity clearance, Otezla timing, repeat interval.' },
      { text: 'AM cortisol LOW (Eli 4/18/26). HPA axis suppressed. Hold prednisone taper. Discuss AM hydrocortisone with Crowley/Kingsbury.' },
      { text: 'CYP2C9 bilateral intermediate: reduce NSAID doses.' },
      { text: 'FUT2 non-secretor: serum B12 falsely normal. Check MMA.' }
    ]
  },

  inheritance: {
    'From Dad':  ['TNF-a AG', '9p21 x3', 'PITX2', 'APOE e4', 'MC1R x4', 'PCSK9', 'COMT Val', 'BDNF Val', 'CYP1A2 fast', 'NAT2 fast', 'HLA-B*51'],
    'From Mom':  ['COMT Met', 'DBH TT', 'FAAH AC', 'NAT2 slow', 'CYP2C9*2', 'DIO1', 'DIO2', 'FKBP5 CT', 'CRY1', 'CLOCK', 'B*51'],
    'Bilateral': ['B*51/B*51', 'FUT2 AA', '9p21 all', 'PITX2 CT', 'CYP2C9', 'CYP2C19', 'MTHFR', 'CTLA4', 'IL-1b', 'SOD2'],
    'Quinn Own': ['UNC13D VUS', 'EBV trigger', 'TI scarring', 'Myocarditis', 'MDD', 'BAM'],
    'Unknown':   ['CYP2D6', 'ERAP1', 'deep UNC13D', 'SLCO1B1', 'full HLA']
  },

  actions: {
    supplements: [
      { name: 'Methylfolate', dose: '1mg daily', why: 'MTHFR C677T + A1298C compound heterozygous — impaired folate metabolism', gene: 'MTHFR', timing: 'Morning with food' },
      { name: 'Vitamin D3', dose: '2000-4000 IU', why: 'VDR variants + indoor lifestyle + immunosuppression', gene: 'VDR', timing: 'With largest meal (fat-soluble)' },
      { name: 'Omega-3 Fish Oil', dose: '2g EPA+DHA', why: 'Anti-inflammatory; TNF-α AG high producer; 9p21 CAD risk', gene: 'TNF-α / 9p21', timing: 'With food, split AM/PM' },
      { name: 'B12 (methylcobalamin)', dose: '1000mcg sublingual', why: 'FUT2 AA non-secretor — impaired intestinal B12 absorption', gene: 'FUT2', timing: 'Morning, sublingual' },
      { name: 'Magnesium Glycinate', dose: '400mg', why: 'Muscle relaxation (TMD/bruxism), sleep quality, cardiovascular support', gene: 'General', timing: 'Evening before bed' }
    ],
    diet: [
      { do: 'Mediterranean diet >80% adherence', avoid: 'Processed foods, excess red meat', why: 'Eliminates 9p21 MI risk (INTERHEART P=0.008); anti-inflammatory for BD', gene: '9p21 / TNF-α' },
      { do: 'Protein + carb within 30 min of waking', avoid: 'Fasting through morning', why: 'HPA axis suppression confirmed — AM cortisol low; prevents hypoglycemic tremor', gene: 'HPA axis' },
      { do: 'High-fiber foods, fermented foods', avoid: 'Excess dairy', why: 'FUT2 non-secretor altered microbiome; fiber supports diversity', gene: 'FUT2' },
      { do: 'Limit alcohol to <3 drinks/week', avoid: 'Binge drinking', why: 'PITX2 AFib risk multiplicative with alcohol; liver enzyme variants', gene: 'PITX2 / CYP' }
    ],
    screening: [
      { test: 'Cardiac MRI', frequency: 'Per cardiology (next: ~6 months post-April 2026)', why: 'Monitor T2 edema resolution, LVEF trajectory, activity clearance', priority: 'high' },
      { test: 'AM Cortisol + ACTH Stim', frequency: 'Monthly until HPA recovery', why: 'Iatrogenic adrenal insufficiency from prednisone; stress-dose coverage', priority: 'high' },
      { test: 'MRE (MR Enterography)', frequency: 'Scheduled May 2026', why: 'Terminal ileal scarring surveillance; BD GI involvement', priority: 'high' },
      { test: 'Lipid Panel + ApoB', frequency: 'Every 6 months', why: 'LDL 142 + ApoB 103 at 17; 9p21 bilateral CAD risk', priority: 'medium' },
      { test: 'MMA (methylmalonic acid)', frequency: 'Annual', why: 'FUT2 non-secretor — serum B12 unreliable; MMA is true functional marker', priority: 'medium' },
      { test: 'Eye Exam (slit lamp)', frequency: 'Every 6 months', why: 'BD uveitis surveillance — vision-threatening if missed', priority: 'high' },
      { test: 'Annual EKG', frequency: 'Annual', why: 'PITX2 bilateral AFib risk', priority: 'medium' }
    ],
    drugAlerts: [
      { drug: 'Dapsone', action: 'avoid', why: 'NAT2 slow acetylator — caused hemolytic anemia (Belize ICU March 2026)', gene: 'NAT2' },
      { drug: 'Isoniazid', action: 'avoid', why: 'NAT2 slow acetylator — hepatotoxicity risk', gene: 'NAT2' },
      { drug: 'Sulfonamides', action: 'avoid', why: 'NAT2 slow acetylator class', gene: 'NAT2' },
      { drug: 'Colchicine', action: 'avoid', why: 'ABCB1 variant — CNS accumulation, severe toxicity (Jan 2026)', gene: 'ABCB1' },
      { drug: 'Warfarin', action: 'avoid', why: 'CYP2C9 *2 intermediate + VKORC1 — hemorrhage risk; use DOACs', gene: 'CYP2C9 / VKORC1' },
      { drug: 'NSAIDs (ibuprofen, naproxen)', action: 'reduce', why: 'CYP2C9 *1/*2 intermediate metabolism — reduce dose 25-50%', gene: 'CYP2C9' },
      { drug: 'Codeine/Tramadol', action: 'monitor', why: 'CYP2D6 status not fully characterized; caution with opioid prodrugs', gene: 'CYP2D6' }
    ]
  },

  ancestry: {
    composition: [
      { region: 'Northwestern European', pct: 82, detail: 'British/Irish, French/German — dominant ancestry from both parents' },
      { region: 'Southern European', pct: 8, detail: 'Italian, Iberian — HLA-B*51 prevalence highest along ancient Silk Road/Mediterranean corridor' },
      { region: 'Eastern European', pct: 5, detail: 'Ashkenazi, Balkan — minor component' },
      { region: 'Other', pct: 5, detail: 'Trace Scandinavian, West Asian' }
    ],
    maternal: { haplogroup: 'H1', age: '13,000 years', origin: 'Franco-Cantabrian refugium (Ice Age southern France)', detail: 'Post-glacial recolonization of Northern Europe. Enhanced Complex I mitochondrial efficiency. Shared with Brigitte, passed to Quinn.' },
    paternal: { haplogroup: 'R1b', age: '~5,000 years', origin: 'Pontic Steppe via Western Europe', detail: 'Most common European Y-haplogroup. Associated with Yamnaya expansion and Indo-European language spread. From Chad.' },
    variantOrigins: [
      { variant: 'HLA-B*51', from: 'both', detail: 'One copy from each parent. Both are heterozygous carriers. Quinn is homozygous — the critical dosage that drives Behcet\'s risk.' },
      { variant: 'NAT2 slow', from: 'maternal', detail: 'Brigitte carries bilateral slow NAT2. Caused dapsone hemolysis. The single most dangerous drug-gene interaction in Quinn\'s profile.' },
      { variant: '9p21 CAD x3', from: 'both', detail: 'Both parents carry all three 9p21 risk alleles independently. Quinn guaranteed risk at every locus.' },
      { variant: 'COMT Met', from: 'maternal', detail: 'At least one Met allele from Brigitte (AA). Affects dopamine metabolism, stress sensitivity, SSRI response.' },
      { variant: 'APOE e4', from: 'paternal', detail: 'Chad carries e3/e4. Quinn may have inherited e4. Alzheimer\'s risk factor if present.' },
      { variant: 'DBH TT', from: 'maternal', detail: 'Brigitte is TT. Low norepinephrine production. Explains Quinn\'s chronic hypotension (65-100 systolic).' },
      { variant: 'UNC13D VUS', from: 'unknown', detail: 'Variant of uncertain significance. Abnormal NK cell degranulation. Parent of origin not yet determined.' }
    ]
  },

  clinical: {
    subtitle: 'Behcet\'s Disease · HLA-B*51 Homozygous · Age 17',
    badge: 'ACTIVE',
    oneLiner: 'HLA-B*51 homozygous male with EBV-triggered autoinflammatory syndrome (incomplete Behcet\'s), post-myocarditis (LVEF 33→57%), confirmed HPA axis suppression, terminal ileal scarring, and UNC13D VUS with abnormal NK cell function.',
    sections: [
      {
        title: 'Active Diagnoses',
        rows: [
          { label: 'Primary', value: 'Behcet\'s Disease (incomplete) — ICBD 4', alert: true },
          { label: 'Cardiac', value: 'Post-myocarditis, LVEF 57% (recovered from 33%), mild T2 edema persists' },
          { label: 'GI', value: 'Terminal ileal scarring with bile acid malabsorption' },
          { label: 'Endocrine', value: 'Iatrogenic HPA axis suppression (AM cortisol low, 4/18/26)' },
          { label: 'Dental', value: 'TMD/bruxism — temporalis myalgia, tension headache' }
        ]
      },
      {
        title: 'Current Medications',
        rows: [
          { label: 'Prednisone', value: '20mg daily — HOLD taper (HPA suppression)' },
          { label: 'Otezla', value: 'Approved — starting titration (PDE4 inhibitor, steroid-sparing)' },
          { label: 'Enalapril', value: '2.5mg BID — reassess at LVEF 57% (chronic low BP)' },
          { label: 'Fluoxetine', value: '20mg (stepped from 30mg) — watch SSRI discontinuation' },
          { label: 'Topiramate', value: 'Current dose — migraine prophylaxis' }
        ]
      },
      {
        title: 'Pharmacogenomics — Critical',
        rows: [
          { label: 'NAT2', value: 'SLOW ACETYLATOR — dapsone caused hemolytic anemia', alert: true },
          { label: 'ABCB1', value: 'Variant — colchicine caused CNS toxicity', alert: true },
          { label: 'CYP2C9', value: '*1/*2 intermediate — reduce NSAID doses 25-50%', alert: true },
          { label: 'VKORC1', value: 'Sensitive — avoid warfarin, use DOACs if anticoagulation needed', alert: true },
          { label: 'CYP2C19', value: '*1/*2 intermediate — standard PPI dosing adequate' }
        ]
      },
      {
        title: 'Key Genetic Findings',
        rows: [
          { label: 'HLA-B*51', value: 'HOMOZYGOUS (both parents heterozygous carriers)', alert: true },
          { label: 'UNC13D', value: 'VUS — abnormal NK cell degranulation on functional testing', alert: true },
          { label: 'TNF-α', value: 'AG high producer — anti-TNF targeted if Otezla fails' },
          { label: '9p21', value: 'x3 bilateral CAD risk — LDL 142 + ApoB 103 at 17' },
          { label: 'PITX2', value: 'CT bilateral — AFib surveillance' }
        ]
      }
    ],
    alerts: [
      { text: 'DO NOT prescribe: dapsone, isoniazid, sulfonamides (NAT2 slow — hemolysis risk)' },
      { text: 'DO NOT prescribe: colchicine (ABCB1 — CNS toxicity, confirmed Jan 2026)' },
      { text: 'DO NOT prescribe: warfarin (CYP2C9 + VKORC1 — use DOACs)' },
      { text: 'REDUCE dose: all NSAIDs by 25-50% (CYP2C9 *1/*2)' },
      { text: 'HPA AXIS: stress-dose hydrocortisone coverage for illness/surgery until recovery confirmed' },
      { text: 'CARDIAC: activity restrictions per cardiology until T2 edema resolved' }
    ]
  },

  imaging: [
    {
      id:         'belize-2026-03-25',
      date:       '2026-03-25',
      modality:   'CT',
      region:     'Abdomen/Pelvis',
      indication: 'Appendicitis',
      provider:   'Belize Healthcare Partners',
      findings:   'CT confirmed acute appendicitis with periappendiceal inflammation and small amount of free fluid adjacent to the appendiceal tip. No perforation identified. Status post laparoscopic appendectomy, post-op day 0.',
      impression: 'Acute appendicitis confirmed. Lap appy performed same day. No complications.',
      status:     'Completed',
      accessible: false
    },
    {
      id:         'cardiac-mri-2025-12',
      date:       '2025-12-01',
      modality:   'MRI',
      region:     'Cardiac',
      indication: 'Post-myocarditis EF recovery monitoring',
      provider:   'OHSU Cardiology',
      findings:   'Cardiac MRI performed approximately 3 months post-EBV-triggered myocarditis (Sept 2025 EF 33%). No late gadolinium enhancement to suggest myocardial scarring. Global systolic function improved. Wall motion normal. No pericardial effusion. T2 mapping: 60 msec mildly elevated.',
      impression: 'EF recovered to 52%, up from 33% at nadir. No structural scarring. Functional suppression resolved. Mild T2 elevation suggests residual inflammation — to be tracked on follow-up. Favorable structural prognosis.',
      status:     'Completed',
      accessible: false
    },
    {
      id:         'cardiac-mri-2026-04',
      date:       '2026-04-24',
      modality:   'MRI',
      region:     'Cardiac (Comprehensive w/ Contrast + Velocity Flow)',
      indication: 'Acute myocarditis follow-up; sarcoidosis on differential',
      provider:   'OHSU Main Hospital · Ref: Chang, Peter H · Read: En-Haw Wu',
      findings:   'LV: EDV 170ml (98.32 ml/m² normal), ESV 74ml normal, EF 57% (borderline-low normal — narrative says "normal", structured data flags as "reduced" right at threshold [57-77]), mass 50.94 g/m² normal, peak wall thickness 8.8mm normal. No regional wall motion abnormalities. RV: EDV 174ml normal, EF 50% (low end of normal [47-67]). Atria normal. Valves: all morphologically normal, no regurgitation. Aortic peak velocity 1.2 m/s, gradient 5.8 mmHg — normal. Pericardium normal, no effusion. LGE: NONE — no myocardial scarring. T1 mapping: septum 996 msec NORMAL, ECV 0.24 NORMAL — no fibrosis. T2 mapping: 60 msec MILDLY ELEVATED, UNCHANGED from December 2025 — suggestive of persistent mild myocardial edema. No non-cardiac findings.',
      impression: 'Continuing functional recovery: LVEF 33→52→57% across Sept 2025 → Dec 2025 → Apr 2026. NO myocardial scarring (LGE absent). Normal T1/ECV (no fibrosis). Sarcoidosis effectively ruled out by absence of LGE. KEY FINDING: T2 mapping persistently mildly elevated at 60 msec for 4+ months — suggests low-grade persistent myocardial inflammation/edema that has not resolved. Consistent with smoldering BD vasculitic activity, persistent post-viral inflammation, or chronic low-grade myocarditis. Mild, non-progressive, but worth Tucker discussion. Questions for cardiology: (1) management implication of unchanged T2; (2) is enalapril still indicated at LVEF 57%; (3) activity clearance modification; (4) Otezla start with subclinical T2 elevation; (5) repeat MRI interval.',
      status:     'Completed',
      accessible: false
    },
    {
      id:         'mr-enterography-scheduled',
      date:       '2026-05-01',
      modality:   'MRI',
      region:     'Small Bowel / Terminal Ileum',
      indication: 'Active inflammation vs. post-inflammatory scarring — terminal ileal disease characterization',
      provider:   'OHSU GI / Radiology',
      findings:   'Pending — study not yet performed.',
      impression: 'Scheduled to differentiate active BD inflammation from established TI scarring. Will guide decision on escalation vs. maintenance therapy.',
      status:     'Scheduled',
      accessible: false
    }
  ]
};
