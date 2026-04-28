/* ═══════════════════════════════════════════════════════════════
   STRAND Data — Peggy B. Rome
   Chad's maternal aunt. Age 76. Healthy.
   MT-H1 haplogroup. Lung cancer survivor.
   NW European 85%. Family cancer cluster documented.
   ═══════════════════════════════════════════════════════════════ */

window.STRAND_PERSON = {
  id:       'peggy',
  name:     'Peggy Rome',
  fullName: 'Peggy B. Rome',
  role:     'Maternal Aunt',
  age:      76,
  dob:      null,
  location: 'Family',

  badges: ['MT-H1', '23andMe Ancestry', 'NW European 85%', 'Lung CA Survivor', 'Age 76 — No CVD'],

  vitals: [
    { label: 'Haplogroup', value: 'MT-H1',   sub: 'Enhanced Complex I',      accent: 'purple' },
    { label: 'Ancestry',   value: '85% NW EU',sub: 'Celtic/Irish dominant',   accent: 'blue'   },
    { label: 'Cancer Hx',  value: 'Lung CA',  sub: 'Survivor — maternal line', accent: 'red'    },
    { label: 'Age',        value: '76',        sub: 'No CVD, no dementia',     accent: 'gold'   },
    { label: 'Status',     value: 'Healthy',  sub: 'Functionally independent', accent: 'green'  }
  ],

  data: {
    cv: {
      title:       'Cardiovascular — Age-Stratified Risk',
      accent:      'red',
      score:       72,
      band:        'active',
      bandLabel:   'Active Management',
      summary:     'No clinical CVD at 76. Age elevates actuarial baseline; MT-H1 mitochondrial efficiency and sustained activity are protective.',
      methodology: 'Score driven primarily by chronological age (risk rises steeply post-70). Absence of diagnosed CVD, maintained activity level, and H1 haplogroup\'s association with mitochondrial Complex I efficiency are significant offsets. Family 9p21 risk alleles (documented in Chad) may be shared (~50% sibling concordance with Chad\'s mother).',
      factors: [
        { name: 'Age 76 — actuarial baseline',    delta: +18, note: 'Cardiovascular event risk rises exponentially after 70; absence of events at 76 is itself protective data' },
        { name: 'Family 9p21 risk (shared ~50%)',  delta: +6,  note: 'Chad carries 3 copies of 9p21 CAD risk alleles; ~50% probability Peggy shares via sibling concordance' },
        { name: 'MT-H1 — Complex I efficiency',   delta: -10, note: 'Haplogroup H1 associated with enhanced NADH dehydrogenase activity; reduced ROS generation in cardiac tissue' },
        { name: 'Sustained daily activity',        delta: -8,  note: '30 min/day walking reduces MI risk ~35% independent of age; activates AMPK cardioprotective pathway' },
        { name: 'Adequate hydration maintained',   delta: -4,  note: 'Prevents hemoconcentration and BP elevation; reduces orthostatic hypotension risk' }
      ],
      trend:      { dir: 'stable', note: 'No clinical CVD events through age 76. Annual BP, lipid panel, and EKG recommended.' },
      comparison: { label: 'vs 76F general population', value: 'No CVD at 76 places Peggy in the top 20th percentile for cardiovascular aging' },
      status: 'Monitoring',
      findings: [
        {
          g: '76F', c: 'f-green',
          n: 'No Cardiovascular Disease at 76',
          l: 'Absence of CVD events through the eighth decade is a strong protective signal.',
          d: "No diagnosed coronary artery disease, no atrial fibrillation, no stroke, no heart failure. At 76, this outcome is itself the most informative data point — it indicates either absence of high-penetrance risk alleles or effective compensation through lifestyle and mitochondrial efficiency. Chad's documented 9p21 homozygosity and PITX2 AFib variants may or may not be shared; direct genotyping would resolve this."
        },
        {
          g: 'H1', c: 'f-green',
          n: 'MT-H1 — Mitochondrial Cardiovascular Advantage',
          l: 'Enhanced Complex I activity reduces oxidative burden on cardiac tissue.',
          d: "Haplogroup H1 is associated with increased NADH dehydrogenase (Complex I) efficiency in the electron transport chain. In cardiac muscle, which is the most mitochondria-dense tissue in the body, this translates to lower reactive oxygen species (ROS) production per ATP generated. Multiple studies associate H1 with reduced cardiovascular mortality in European populations. This same haplogroup is carried by Chad and Quinn."
        },
        {
          g: '9p21', c: 'f-amber',
          n: 'Possible 9p21 Risk — Family Inference',
          l: 'Chad carries 3 copies of 9p21 CAD risk alleles. Sibling concordance suggests ~50% probability Peggy shares at least one.',
          d: "The 9p21.3 locus (CDKN2A/CDKN2B antisense region) is the strongest common genetic risk factor for coronary artery disease. Chad is homozygous risk at rs1333049 and carries an additional risk allele at rs10757278. Since these alleles came through the maternal line (Chad's mother was Peggy's sister), there is approximately 50% probability that Peggy carries one or more of these variants. Her clean cardiovascular history at 76, if she does carry them, would suggest effective compensation."
        }
      ],
      actions: [
        'Annual lipid panel with apoB and Lp(a) — especially given family 9p21 burden',
        'Blood pressure monitoring quarterly; target <130/80 at age 76',
        'EKG annually — screen for subclinical AFib given family PITX2 variants',
        'Maintain 30 min daily walking; consider adding resistance bands for vascular tone'
      ]
    },

    nr: {
      title:       'Neurological — Cognitive Preservation',
      accent:      'purple',
      score:       80,
      band:        'high-risk',
      bandLabel:   'Age-Driven Risk',
      summary:     'Cognitively intact at 76. Age is the dominant risk factor. Social engagement and MT-H1 mitochondrial efficiency are significant protective factors.',
      methodology: 'Score primarily reflects actuarial age-related neurodegeneration risk (doubles every 5 years after 65). Cognitively intact status at 76 is a strong counter-signal. Chad\'s APOE e4 traced through paternal line, so Peggy\'s APOE status is independent. Social engagement is the highest-evidence modifiable protective factor.',
      factors: [
        { name: 'Age 76 — primary risk driver',    delta: +22, note: 'Dementia prevalence doubles every 5 years after 65; ~15% of 76-year-olds have some cognitive impairment' },
        { name: 'Age-related sleep architecture',   delta: +8,  note: 'Reduced slow-wave sleep decreases glymphatic amyloid-beta clearance by ~30% vs age 50' },
        { name: 'APOE status unknown',              delta: +5,  note: 'Chad\'s APOE e4 came through paternal line; Peggy\'s status is independent and unknown' },
        { name: 'Cognitively intact at 76',         delta: -15, note: 'Absence of impairment through 76 is a strong negative predictor for near-term decline' },
        { name: 'Active social engagement',         delta: -10, note: 'Regular family contact; social integration reduces dementia risk up to 50% (Lancet Commission 2020)' },
        { name: 'Daily cognitive stimulation',      delta: -5,  note: 'Novel mental activity maintains hippocampal neurogenesis and synaptic density' },
        { name: 'MT-H1 mitochondrial efficiency',   delta: -5,  note: 'Better neuronal energy metabolism; neurons are second only to cardiac muscle in mitochondrial density' }
      ],
      trend:      { dir: 'stable', note: 'No cognitive decline documented. Annual cognitive screening recommended from age 75+.' },
      comparison: { label: 'vs 76F general population', value: 'Cognitively intact and socially active at 76 — favorable neurological aging trajectory' },
      status: 'Intact',
      findings: [
        {
          g: '76 intact', c: 'f-green',
          n: 'Preserved Cognition at 76',
          l: 'No documented cognitive impairment. This is itself a strong protective data point.',
          d: "Approximately 15% of adults over 75 have some form of cognitive impairment. Peggy's preserved cognition through age 76 — intact memory, executive function, and social engagement — is the single strongest predictor of continued cognitive health. This may reflect favorable APOE status, strong cognitive reserve from lifetime engagement, or both."
        },
        {
          g: 'Sleep', c: 'f-amber',
          n: 'Sleep Quality — Critical for Amyloid Clearance',
          l: 'The glymphatic system clears amyloid-beta during deep sleep. Sleep architecture changes with age.',
          d: "Deep (N3) sleep activates the glymphatic system, which clears amyloid-beta and tau proteins from the brain. After age 60, N3 sleep naturally decreases. Evidence-based interventions: consistent sleep/wake schedule (within 30 minutes daily), dark/cool room (65-68F), no screens 60 minutes before bed, limit caffeine after noon. Sleep quality at this age is arguably the most underappreciated modifiable neuroprotective factor."
        },
        {
          g: 'APOE', c: 'f-amber',
          n: 'APOE Status Independent from Chad',
          l: 'Chad\'s APOE e4 came through his paternal line, not the maternal line Peggy shares.',
          d: "APOE e4 is the strongest common genetic risk factor for late-onset Alzheimer's. Chad carries one copy, but it traced through his father's side — not through Chad's mother or Peggy. Peggy's APOE status is therefore unknown and independent. Direct genotyping via 23andMe health report (if available) or targeted testing would resolve this. Given her age and intact cognition, this is lower priority but still informative."
        }
      ],
      actions: [
        'Annual cognitive screening (MoCA or MMSE) — baseline documentation is valuable at 76',
        'Sleep hygiene protocol: consistent schedule, dark room, 65-68F, no screens 60 min before bed',
        'Omega-3 (DHA 1g/day) — strongest-evidence neuroprotective supplement',
        'Consider APOE genotyping to complete family risk map (low clinical urgency given intact cognition)'
      ]
    },

    ca: {
      title:       'Cancer Risk — Maternal Line Cluster',
      accent:      'red',
      score:       98,
      band:        'high-risk',
      bandLabel:   'High Risk',
      summary:     'Lung cancer survivor. Two lung CAs on the same MT-H1 maternal line (Peggy + Chad\'s mother). This is the most actionable finding in this profile.',
      methodology: 'Score reflects personal cancer history plus family cluster on the same genetic lineage. Two first-degree-related lung cancers on the same mitochondrial line is statistically significant and drives screening recommendations for Chad and Quinn. NW European ancestry with MC1R Celtic variants adds UV-related skin cancer risk.',
      factors: [
        { name: 'Personal lung CA history',       delta: +25, note: 'Peggy is a lung cancer survivor; personal history is the strongest single risk factor for recurrence' },
        { name: 'Sister (Chad\'s mother) lung CA', delta: +15, note: 'Two lung CAs on the same MT-H1 lineage — statistically notable clustering' },
        { name: 'MC1R Celtic variants — UV risk',  delta: +8,  note: 'NW European fair skin; increased melanoma and NMSC risk with cumulative UV exposure' },
        { name: 'Hereditary panel not completed',  delta: +5,  note: 'BRCA, TP53, ATM, CHEK2 status unknown; bilateral family cancer history warrants testing' },
        { name: 'No current active malignancy',   delta: -10, note: 'Survivor status with no recurrence is progressively protective over time' },
        { name: 'Active lifestyle at 76',          delta: -5,  note: 'Regular physical activity reduces cancer recurrence risk ~30%' }
      ],
      trend:      { dir: 'monitoring', note: 'Surveillance for recurrence + hereditary cancer panel recommended for full family' },
      comparison: { label: 'vs general population lung CA risk', value: 'Two lung CAs on the same MT line is a significant familial cluster requiring active surveillance' },
      status: 'Surveillance',
      findings: [
        {
          g: 'Lung', c: 'f-red',
          n: 'Lung Cancer — Personal History',
          l: 'Peggy is a lung cancer survivor. This drives recurrence surveillance and family screening protocols.',
          d: "Personal history of lung cancer is the single strongest predictor of second primary lung cancer (2-6% annual risk depending on histology and stage). Annual low-dose CT (LDCT) chest is standard of care for survivors. This history, combined with her sister's lung cancer, establishes a familial cluster on the maternal MT-H1 line that has direct implications for Chad's screening."
        },
        {
          g: 'Cluster', c: 'f-red',
          n: 'Maternal Line Cancer Cluster — Two Lung CAs',
          l: 'Peggy and Chad\'s mother (her sister) both developed lung cancer. Same MT-H1 lineage.',
          d: "Two first-degree relatives (sisters) with lung cancer on the same mitochondrial lineage is a statistically notable cluster. This pattern could reflect shared germline susceptibility (TP53, ATM, or other DNA repair pathway variants), shared environmental exposure, or both. For Chad: this establishes a clear indication for annual LDCT screening starting at age 50. For Quinn: paternal-line lung cancer risk is documented and should be monitored long-term."
        },
        {
          g: 'MC1R', c: 'f-amber',
          n: 'Celtic MC1R Variants — Skin Cancer Vigilance',
          l: 'NW European ancestry with fair skin phenotype increases melanoma and non-melanoma skin cancer risk.',
          d: "The family carries multiple MC1R compound heterozygous variants (documented in Chad at 91st percentile melanoma risk). Peggy's NW European Celtic ancestry means she likely carries similar variants. At 76, cumulative UV exposure is substantial. Annual full-body skin examination by dermatology is recommended, with particular attention to changing or new lesions."
        },
        {
          g: 'Panel', c: 'f-amber',
          n: 'Hereditary Cancer Panel — Not Yet Completed',
          l: 'Given bilateral family cancer history, BRCA/TP53/ATM/CHEK2 testing is recommended.',
          d: "The combination of two lung cancers on the maternal line plus breast cancer at age 33 on the paternal side (Brigitte's aunt) creates a bilateral cancer history pattern that meets NCCN criteria for hereditary cancer panel consideration. Testing Peggy would be particularly informative — as a cancer survivor and the oldest living member of the maternal line, her results would clarify germline risk for Chad, Quinn, and Brother."
        }
      ],
      actions: [
        'Annual low-dose CT chest — standard of care for lung cancer survivors',
        'Annual full-body skin exam — MC1R Celtic variants + cumulative UV exposure at 76',
        'Discuss hereditary cancer panel (BRCA, TP53, ATM, CHEK2) with oncologist — Peggy is the most informative family member to test',
        'Daily SPF 30+ on exposed skin — cumulative UV damage continues to drive risk'
      ]
    },

    dr: {
      title:       'Daily Protocol — Evidence-Based Interventions',
      accent:      'green',
      score:       90,
      band:        'high-risk',
      bandLabel:   'Age-Driven Baseline',
      summary:     'Actuarial all-cause mortality risk at 76 is elevated by age alone. Five evidence-based daily interventions each independently reduce risk.',
      methodology: 'Score reflects chronological age as the dominant driver of all-cause mortality. Each intervention has independent, replicated evidence for risk reduction at this age. Full protocol adherence projected to meaningfully extend healthspan.',
      factors: [
        { name: 'Age 76 — actuarial baseline',     delta: +30, note: 'Chronological age is the primary all-cause mortality driver at every age' },
        { name: 'Vitamin D synthesis decline',      delta: +8,  note: 'Cutaneous D3 synthesis drops ~75% between ages 20 and 70; supplementation closes the gap' },
        { name: 'Reduced thirst perception',        delta: +5,  note: 'Hypothalamic osmoregulation declines with age; dehydration is underdiagnosed in older adults' },
        { name: '30 min daily walking',             delta: -15, note: '-35% MI, -30% stroke, -40% dementia, -20% all-cause mortality (meta-analysis data)' },
        { name: 'Omega-3 supplementation',          delta: -8,  note: 'EPA/DHA: anti-inflammatory, cardioprotective, neuroprotective, joint-sparing' },
        { name: 'Social engagement maintained',     delta: -10, note: 'Social isolation increases mortality risk 26%; active family connection is protective' }
      ],
      trend:      { dir: 'stable', note: 'Functionally independent and active at 76. Full protocol adherence projected to extend healthspan.' },
      comparison: { label: 'vs 76F sedentary/isolated peers', value: 'Active + socially connected = top quartile aging trajectory' },
      status: 'Protocol',
      findings: [
        {
          g: '1', c: 'f-green',
          n: 'Vitamin D3 — 2,000 IU Daily',
          l: 'Cutaneous synthesis drops ~75% with age. Most adults over 70 are deficient without supplementation.',
          d: "Vitamin D supports bone mineral density (fracture prevention), immune function (infection and cancer risk reduction), and mood regulation (seasonal affective disorder prevention). At 76, skin produces roughly one-quarter the D3 it did at age 20. The family's VDR (vitamin D receptor) variants, documented in Chad's genome, suggest supplementation is especially important across this lineage. Take with a fat-containing meal for absorption. Annual 25-OH vitamin D level to confirm adequacy (target 40-60 ng/mL)."
        },
        {
          g: '2', c: 'f-green',
          n: 'Omega-3 Fish Oil — 1-2g EPA/DHA Daily',
          l: 'Highest-evidence supplement for multi-system protection in older adults.',
          d: "EPA and DHA have replicated evidence for reducing systemic inflammation (hsCRP reduction), supporting cardiac membrane stability (anti-arrhythmic), maintaining synaptic membrane fluidity (neuroprotective), and reducing joint inflammation (COX-2 pathway). At 76, this is the single highest-evidence supplement available. Take with food. Pharmaceutical-grade preferred to minimize oxidation."
        },
        {
          g: '3', c: 'f-green',
          n: 'Walking — 30 Minutes Daily',
          l: 'The most effective single longevity intervention at any age, with compounding returns.',
          d: "30 minutes of moderate walking activates AMPK (the cellular energy sensor), improves insulin sensitivity, maintains bone density via mechanical loading, and reduces cardiovascular and dementia risk across every studied population. MT-H1 haplogroup means Peggy's mitochondria are genetically efficient at oxidative phosphorylation — converting walking into ATP more effectively than many other haplogroups."
        },
        {
          g: '4', c: 'f-green',
          n: 'Hydration — 6-8 Glasses Daily, Proactive',
          l: 'Thirst sensation declines with age. Proactive hydration prevents dehydration-related confusion, falls, and BP instability.',
          d: "The hypothalamic thirst center becomes less sensitive with age. Mild dehydration (1-2% body weight loss) causes measurable cognitive impairment, orthostatic hypotension (fall risk), and hemoconcentration (thrombosis risk). Keep water visible and accessible. Herbal tea and water-rich foods count. Monitor urine color — pale yellow is the target."
        },
        {
          g: '5', c: 'f-green',
          n: 'Calcium + Magnesium — Bone and Muscle Support',
          l: 'Calcium 1,200mg + magnesium 400mg daily for bone density preservation and muscle function.',
          d: "Post-menopausal bone density loss accelerates fracture risk. Calcium (1,200mg total from diet + supplement) combined with vitamin D3 reduces hip fracture risk ~30%. Magnesium (400mg) supports >300 enzymatic reactions, prevents muscle cramps, and improves sleep quality. Space calcium doses (600mg max per dose for absorption). Magnesium glycinate or citrate preferred for bioavailability."
        }
      ],
      actions: [
        'Vitamin D3 2,000 IU with breakfast (fat-containing meal)',
        'Omega-3 fish oil 1-2g EPA/DHA with food, pharmaceutical-grade',
        'Walk 30 minutes daily — continuous or split into two 15-minute sessions',
        'Proactive hydration: 6-8 glasses daily, water bottle within reach',
        'Calcium 600mg 2x/day + magnesium glycinate 400mg at bedtime'
      ]
    },

    mt: {
      title:       'Shared Family Variants — Clinical Relevance',
      accent:      'amber',
      score:       100,
      band:        'high-risk',
      bandLabel:   'High Clinical Relevance',
      summary:     'Peggy\'s position on the maternal line makes her genome a direct window into variants carried by Chad\'s mother, Chad, and Quinn. Lung cancer cluster on this line is the primary clinical driver.',
      methodology: 'Score reflects transmitted genetic risk through the shared family line. Two lung CAs on the MT-H1 lineage, shared DNA fractions with Chad (~25%) and Quinn (~12.5%), and mitochondrial identity across all maternal-line members make Peggy\'s genetic data clinically informative for the entire family.',
      factors: [
        { name: 'Lung CA cluster on MT-H1 line',   delta: +20, note: 'Peggy and Chad\'s mother: two lung CAs on the same lineage; drives Chad\'s LDCT screening protocol' },
        { name: '~50% DNA shared with sister',      delta: +15, note: 'Sibling concordance means Peggy\'s genome approximates 50% of what Chad\'s mother carried' },
        { name: '~25% shared with Chad',            delta: +10, note: 'Variants found in Peggy have ~50% probability of being present in Chad via sibling concordance' },
        { name: '~12.5% shared with Quinn',         delta: +5,  note: 'Transmitted risk from this lineage contributes to Quinn\'s overall genetic risk profile' },
        { name: 'MT-H1 — 100% identical in all',   delta: -10, note: 'Mitochondrial DNA identical across Peggy, Chad, Quinn; H1 is protective (Complex I efficiency)' },
        { name: 'Healthy survivor at 76',           delta: -10, note: 'Peggy\'s health trajectory demonstrates the functional capacity of this genome' }
      ],
      trend:      { dir: 'stable', note: 'Peggy\'s genome data increases variant interpretation confidence for Chad and Quinn by 3-5x vs unrelated controls.' },
      comparison: { label: 'vs anonymous genomic analysis', value: 'Family member data increases variant pathogenicity classification accuracy significantly' },
      status: 'Informative',
      findings: [
        {
          g: '50%', c: 'f-purple',
          n: '~50% Shared Genome with Chad\'s Mother',
          l: 'As sisters, Peggy and Chad\'s mother shared approximately 50% of their DNA. Peggy\'s genome is a proxy for variants her sister carried.',
          d: "Chad's mother is deceased, but Peggy's genome provides a partial reconstruction. For any variant found in Peggy, there is approximately a 50% probability that Chad's mother carried the same variant and could have transmitted it to Chad. This is particularly relevant for cancer susceptibility variants — if a pathogenic variant is found in Peggy's hereditary cancer panel, it has direct implications for Chad's screening."
        },
        {
          g: 'Lung CA', c: 'f-red',
          n: 'Two Lung Cancers on Same Genetic Lineage',
          l: 'Peggy and her sister both developed lung cancer. This clustering on one lineage suggests possible germline susceptibility.',
          d: "Two sisters with lung cancer is a statistically significant familial cluster. Possible explanations include shared germline variants in DNA repair pathways (TP53, ATM, BRCA2, CHEK2), shared environmental exposures (secondhand smoke, radon, occupational), or coincidence. Testing Peggy for a hereditary cancer panel would distinguish germline from environmental causation. If a pathogenic variant is identified, cascade testing for Chad and Quinn is indicated."
        },
        {
          g: 'MT-H1', c: 'f-green',
          n: 'Mitochondrial DNA — Identical Across Maternal Line',
          l: 'Peggy, Chad, and Quinn carry identical mitochondrial DNA. H1 is associated with enhanced oxidative phosphorylation.',
          d: "Mitochondrial DNA is inherited exclusively through the maternal line and does not recombine. Peggy's mtDNA is 100% identical to her sister's, Chad's, Quinn's, and Brother's. Haplogroup H1 shows enhanced Complex I (NADH dehydrogenase) efficiency in multiple studies. This is relevant to cardiovascular function, neurological energy metabolism, and exercise capacity across the entire maternal line."
        },
        {
          g: '25%/12.5%', c: 'f-amber',
          n: 'Autosomal Sharing — Chad (~25%), Quinn (~12.5%)',
          l: 'Peggy shares approximately 25% of autosomal DNA with Chad and 12.5% with Quinn through the maternal lineage.',
          d: "These sharing percentages mean that any pathogenic variant identified in Peggy has a quantifiable probability of being present in Chad (approximately 50% per variant, given sibling concordance with his mother) and Quinn (approximately 25% per variant, given an additional generation of meiotic segregation). This makes Peggy's genome data directly actionable for family-wide risk stratification."
        }
      ],
      actions: [
        'Hereditary cancer panel for Peggy is the highest-yield single test for the entire family',
        'Any pathogenic variant found has ~50% probability of being carried by Chad, ~25% by Quinn',
        'MT-H1 Complex I efficiency is shared 100% across the maternal line — relevant to exercise and cardiac protocols',
        'Consider 23andMe health reports if not already reviewed for pharmacogenomic and carrier data'
      ]
    },

    lg: {
      title:       'Family Cancer Screening — Actionable Protocols',
      accent:      'blue',
      score:       0,
      band:        'optimal',
      bandLabel:   'Informational',
      summary:     'Family cancer cluster data drives specific screening recommendations for each generation. Peggy\'s position as eldest living maternal-line member makes her data uniquely informative.',
      methodology: 'This card translates family cancer history into actionable screening protocols for each family member. Score 0 reflects that this is a protocol card, not a risk score. The value is clinical decision support derived from multi-generational cancer data.',
      factors: [
        { name: 'Lung CA cluster — 2 on MT line',  delta: 0,   note: 'Drives LDCT screening protocol for Chad at age 50' },
        { name: 'Breast CA age 33 — Brigitte line', delta: 0,   note: 'Young-onset breast cancer on paternal maternal side elevates Quinn\'s bilateral cancer risk' },
        { name: 'MC1R compound — 91st %ile',        delta: 0,   note: 'Documented in Chad; melanoma screening for all family members with fair phenotype' },
        { name: 'TP53 CG — Brigitte origin',        delta: 0,   note: 'Tumor suppressor variant; relevant for multi-cancer risk assessment' }
      ],
      trend:      { dir: 'stable', note: 'Screening protocols should be reviewed annually and updated with any new family cancer diagnoses.' },
      comparison: { label: 'vs population-based screening', value: 'Family-informed screening detects cancers earlier and reduces mortality vs age-based guidelines alone' },
      status: 'Protocols',
      findings: [
        {
          g: 'Peggy', c: 'f-red',
          n: 'Peggy — Lung CA Survivor, Age 76',
          l: 'Annual LDCT for recurrence surveillance. Hereditary cancer panel recommended as highest-yield family test.',
          d: "Peggy's lung cancer history and her position as the eldest living maternal-line member make her the most informative person to undergo hereditary cancer panel testing. Results would clarify whether the maternal-line lung cancer cluster reflects a germline DNA repair pathway variant or was primarily environmental. Annual LDCT and dermatologic surveillance are standard of care."
        },
        {
          g: 'Chad', c: 'f-amber',
          n: 'Chad Byars, M.D. — Screening Implications',
          l: 'Two maternal-line lung CAs = annual LDCT from age 50. MC1R 91st %ile = annual derm exam.',
          d: "Chad's maternal-line cancer history (mother and aunt both with lung cancer) meets criteria for enhanced screening. Annual low-dose CT chest from age 50 (or sooner with any smoking history). His MC1R compound heterozygosity (91st percentile melanoma risk) requires annual full-body dermatologic examination. His TP53 CG variant (from Brigitte's line) adds multi-cancer surveillance consideration."
        },
        {
          g: 'Quinn', c: 'f-amber',
          n: 'Quinn Byars — Long-Term Cancer Surveillance',
          l: 'Bilateral family cancer history (paternal maternal lung CA + maternal aunt breast CA age 33). Long-term surveillance warranted.',
          d: "Quinn inherits cancer risk from both parental lines: lung cancer cluster on Chad's maternal side (Peggy + Chad's mother) and young-onset breast cancer on Brigitte's maternal side (aunt at 33). At 17, no immediate screening changes are indicated, but documentation of this bilateral cancer history should inform his adult screening protocols. Hereditary panel results from Peggy and/or Brigitte would clarify whether germline variants are driving either cluster."
        },
        {
          g: 'Brother', c: 'f-amber',
          n: 'Brother — Pending Genotyping',
          l: '23andMe kit ordered. Results will clarify which family risk variants he carries.',
          d: "Brother shares the same family cancer risk profile as Quinn (same parents). His 23andMe results, when available, will be compared against Chad's and Peggy's data to determine which cancer-associated variants he inherited. This will inform his personalized screening protocol."
        },
        {
          g: 'Panel', c: 'f-red',
          n: 'Hereditary Cancer Panel — Family Recommendation',
          l: 'BRCA1/2, TP53, ATM, CHEK2, PALB2, RAD51C/D testing recommended for the family.',
          d: "The bilateral family cancer history (two lung CAs maternal side, breast CA at 33 paternal side) meets NCCN criteria for hereditary cancer risk evaluation. Testing Peggy first is optimal — as a cancer survivor, insurance typically covers the panel, and her results directly inform all downstream family members. If a pathogenic variant is identified, cascade testing (targeted single-variant test) for Chad, Quinn, and Brother is straightforward and inexpensive."
        }
      ],
      actions: [
        'Peggy: annual LDCT chest + annual full-body skin exam + discuss hereditary cancer panel with oncologist',
        'Chad: annual LDCT from age 50 + annual dermatology + consider cascade testing if Peggy tests positive',
        'Quinn: document bilateral cancer history for adult screening protocols; no changes at age 17',
        'Full family: hereditary panel (BRCA1/2, TP53, ATM, CHEK2, PALB2) — test Peggy first for maximum informativeness'
      ]
    }
  },

  alert: null,

  meds: [],

  alerts: [
    { level: 'critical', text: 'Lung cancer survivor with familial cluster: Peggy + sister (Chad\'s mother) both with lung CA on the same MT-H1 lineage. Annual LDCT surveillance required.' },
    { level: 'warn', text: 'Hereditary cancer panel (BRCA1/2, TP53, ATM, CHEK2, PALB2) recommended — Peggy is the most informative family member to test first.' },
    { level: 'warn', text: 'MC1R Celtic variants (documented in Chad at 91st %ile melanoma risk) — annual dermatologic surveillance for all family members with fair phenotype.' },
    { level: 'info', text: 'APOE status unknown and independent from Chad\'s e4 (which came through paternal line). Consider genotyping for completeness.' }
  ],

  labs: [],

  doctor: {
    subtitle: 'Lung CA Survivor · Maternal Line Cancer Cluster · Age 76',
    badge: 'ONCOLOGY SURVEILLANCE',
    sections: [
      {
        title: 'Personal Cancer History',
        rows: [
          { label: 'Diagnosis',      value: 'Lung Cancer — Survivor',     alert: true },
          { label: 'Status',         value: 'No active malignancy' },
          { label: 'Surveillance',   value: 'Annual LDCT required',       alert: true },
          { label: 'MT Haplogroup',  value: 'H1 — shared maternal line' }
        ]
      },
      {
        title: 'Familial Cancer Cluster',
        rows: [
          { label: 'Peggy Rome',        value: 'Lung cancer (survivor)',        alert: true },
          { label: "Chad's mother",      value: 'Lung cancer (deceased, age 75)', alert: true },
          { label: 'Lineage',           value: 'Same MT-H1 maternal line',       alert: true },
          { label: "Brigitte's aunt",    value: 'Breast cancer (age 33)',         alert: true },
          { label: 'Pattern',           value: 'Bilateral family cancer history — meets NCCN panel criteria', alert: true }
        ]
      },
      {
        title: "Relevant Variants (Chad's Genome — Proxy)",
        rows: [
          { label: 'MC1R',  value: 'x4 compound het — 91st %ile melanoma risk' },
          { label: 'TP53',  value: 'CG heterozygous (Brigitte origin)' },
          { label: 'FGFR2', value: 'AG heterozygous' },
          { label: '8q24',  value: 'AG — multi-cancer susceptibility locus' },
          { label: '9p21',  value: 'Homozygous risk — CAD + possible cancer link' }
        ]
      },
      {
        title: 'Pharmacogenomic Considerations (Age 76)',
        rows: [
          { label: 'CYP2D6',   value: 'Status unknown — relevant for codeine, tamoxifen, metoprolol metabolism' },
          { label: 'CYP2C19',  value: 'Status unknown — relevant for clopidogrel, PPIs, SSRIs' },
          { label: 'NAT2',     value: 'Status unknown — relevant for isoniazid, hydralazine, sulfonamides' },
          { label: 'VKORC1',   value: 'Status unknown — relevant for warfarin dosing (NW European ancestry → likely sensitive)' },
          { label: 'Action',   value: '23andMe health report or targeted PGx panel recommended', alert: true }
        ]
      }
    ],
    alerts: [
      { text: 'Lung cancer survivor — annual LDCT chest is standard of care for recurrence surveillance.' },
      { text: 'Two lung CAs on same MT-H1 lineage (Peggy + sister). Chad: annual LDCT from age 50.' },
      { text: 'Bilateral family cancer history meets NCCN criteria for hereditary cancer panel.' },
      { text: 'Test Peggy first — cancer survivor status typically ensures insurance coverage for hereditary panel.' },
      { text: 'At 76, pharmacogenomic testing is clinically relevant for polypharmacy risk reduction.' }
    ]
  },

  inheritance: {
    'Maternal MT Line': ['Grandmother', 'Peggy (Lung CA)', "Chad's Mom (Lung CA)", 'MT-H1', 'Chad', 'Quinn', 'Brother'],
    'Cancer Cluster':   ['Peggy Lung CA', 'Mom Lung CA', 'Aunt Breast CA 33', 'TP53 CG', 'TERT AG', '8q24 AG', 'FGFR2'],
    "Chad's Variants":  ['9p21 x3 (CAD)', 'PITX2 (AFib)', 'MC1R x4 (melanoma)', 'APOE e4 (paternal)', 'CYP2C19 *2'],
    'Ancestry':         ['NW European 85%', 'S European 8%', 'E European 4%', 'British/Irish', 'French/German', 'Celtic MC1R'],
    'Haplogroups':      ['MT-H1 (maternal)', 'R1b (Chad — paternal)', 'Franco-Cantabrian origin', 'Post-Glacial expansion']
  },

  imaging: [],

  /* ═══════════════════════════════════════════════════════════════
     NEW: Health Actions Tab
     ═══════════════════════════════════════════════════════════════ */
  actions: {
    supplements: [
      { name: 'Vitamin D3',           dose: '2,000 IU daily',         why: 'Cutaneous synthesis drops ~75% with age; supports bone density, immune function, mood',                gene: 'VDR family variants (inferred from Chad)', timing: 'Morning, with fat-containing meal' },
      { name: 'Omega-3 Fish Oil',     dose: '1-2g EPA/DHA daily',     why: 'Anti-inflammatory, cardioprotective, neuroprotective; highest-evidence aging supplement',                gene: 'MT-H1 (supports mitochondrial membrane integrity)', timing: 'With meals, pharmaceutical-grade preferred' },
      { name: 'Calcium',              dose: '600mg 2x daily',         why: 'Post-menopausal bone density preservation; reduces hip fracture risk ~30% with vitamin D',              gene: 'N/A — age-driven recommendation', timing: 'Split doses (600mg max per dose for absorption); space from thyroid meds if applicable' },
      { name: 'Magnesium Glycinate',  dose: '400mg daily',            why: 'Supports 300+ enzymatic reactions; prevents muscle cramps; improves sleep quality',                     gene: 'N/A — age-driven recommendation', timing: 'Bedtime (glycinate form promotes sleep)' },
      { name: 'CoQ10',                dose: '100-200mg daily',        why: 'Supports mitochondrial Complex III; complements H1 Complex I efficiency; natural production declines with age', gene: 'MT-H1 (synergistic with enhanced Complex I)', timing: 'Morning, with fat-containing meal' }
    ],
    diet: [
      { do: 'Emphasize omega-3-rich fish (salmon, sardines, mackerel) 2-3x/week',              avoid: 'Processed meats (nitrosamines are lung carcinogens)',                          why: 'Anti-inflammatory omega-3s; processed meat associated with lung cancer recurrence risk',    gene: 'Lung CA history' },
      { do: 'High-fiber fruits and vegetables (cruciferous especially: broccoli, cauliflower)',  avoid: 'Excessive refined sugar and white flour',                                      why: 'Cruciferous vegetables upregulate NRF2 detoxification pathway; fiber supports microbiome', gene: 'Cancer surveillance' },
      { do: 'Adequate protein (1.0-1.2g/kg/day) — essential for muscle maintenance at 76',      avoid: 'Very low protein diets (accelerate sarcopenia)',                               why: 'Sarcopenia prevention; muscle mass is the strongest predictor of functional independence',  gene: 'Age-driven' },
      { do: 'Dairy or calcium-fortified alternatives for bone health',                          avoid: 'Excessive caffeine (>300mg/day increases calcium excretion)',                    why: 'Calcium balance for bone density; caffeine increases urinary calcium loss',                 gene: 'Post-menopausal bone metabolism' },
      { do: 'Colorful produce daily — lycopene, lutein, beta-carotene from whole foods',        avoid: 'High-dose beta-carotene supplements (increased lung CA risk in CARET trial)',    why: 'Whole-food antioxidants are protective; isolated beta-carotene supplements increase lung cancer risk in susceptible individuals', gene: 'Lung CA survivor — CARET trial data' }
    ],
    screening: [
      { test: 'Low-dose CT Chest (LDCT)',                frequency: 'Annually',              why: 'Lung cancer survivor — recurrence surveillance standard of care',                                    priority: 'high' },
      { test: 'Full-body Skin Exam (Dermatology)',       frequency: 'Annually',              why: 'MC1R Celtic variants + NW European fair skin + cumulative UV exposure at 76',                         priority: 'high' },
      { test: 'Hereditary Cancer Panel',                 frequency: 'Once (if not done)',    why: 'Bilateral family cancer history meets NCCN criteria; Peggy is the most informative person to test',   priority: 'high' },
      { test: 'Lipid Panel with apoB and Lp(a)',         frequency: 'Annually',              why: 'Family 9p21 CAD burden (documented in Chad); age-appropriate cardiovascular monitoring',              priority: 'medium' },
      { test: 'Blood Pressure',                          frequency: 'Quarterly',             why: 'Age-related arterial stiffening; target <130/80',                                                     priority: 'medium' },
      { test: 'EKG',                                     frequency: 'Annually',              why: 'Screen for subclinical AFib given family PITX2 variants',                                            priority: 'medium' },
      { test: 'Cognitive Screen (MoCA or MMSE)',         frequency: 'Annually',              why: 'Baseline documentation at 76; early detection of any cognitive changes',                              priority: 'medium' },
      { test: 'DEXA Bone Density Scan',                  frequency: 'Every 2 years',         why: 'Post-menopausal osteoporosis screening; guides calcium/D3 supplementation',                          priority: 'medium' },
      { test: '25-OH Vitamin D Level',                   frequency: 'Annually',              why: 'Confirm supplementation adequacy; target 40-60 ng/mL',                                               priority: 'low' },
      { test: 'Comprehensive Metabolic Panel',           frequency: 'Annually',              why: 'Kidney function, electrolytes, glucose — baseline monitoring at 76',                                  priority: 'low' }
    ],
    drugAlerts: [
      { drug: 'Beta-carotene supplements',   action: 'avoid',   why: 'CARET trial: high-dose beta-carotene increased lung cancer risk 28% in susceptible populations; contraindicated in lung CA survivors', gene: 'Lung CA survivor' },
      { drug: 'Warfarin',                    action: 'monitor', why: 'NW European ancestry associated with VKORC1 sensitivity (lower dose requirement); PGx testing recommended before initiation',          gene: 'VKORC1 (inferred — NW European)' },
      { drug: 'Codeine / Tramadol',          action: 'monitor', why: 'CYP2D6 status unknown; poor metabolizers get no analgesic effect, ultrarapid metabolizers risk toxicity',                              gene: 'CYP2D6 (unknown — PGx testing recommended)' },
      { drug: 'Clopidogrel (Plavix)',        action: 'monitor', why: 'CYP2C19 status unknown; poor metabolizers have reduced antiplatelet effect (relevant if prescribed post-cardiac event)',               gene: 'CYP2C19 (unknown — PGx testing recommended)' },
      { drug: 'PPIs (omeprazole, etc.)',     action: 'monitor', why: 'CYP2C19 metabolizer status affects efficacy; long-term PPI use reduces calcium absorption (bone density concern at 76)',              gene: 'CYP2C19 (unknown) + bone density' },
      { drug: 'Fluoroquinolones',            action: 'monitor', why: 'Increased tendon rupture risk in adults over 60; avoid if alternatives exist',                                                       gene: 'Age-driven — not genetically specific' },
      { drug: 'Benzodiazepines',             action: 'reduce',  why: 'CYP3A4 metabolism slows with age; increased fall risk, cognitive impairment, paradoxical agitation in older adults',                   gene: 'Age-driven hepatic clearance decline' },
      { drug: 'NSAIDs (chronic use)',         action: 'reduce',  why: 'GI bleeding risk increases with age; renal function decline reduces clearance; use lowest dose for shortest duration',                gene: 'Age-driven — renal and GI' }
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
     NEW: Ancestry Tab
     ═══════════════════════════════════════════════════════════════ */
  ancestry: {
    composition: [
      { region: 'Northwestern European', pct: 85, detail: 'British, Irish, French, German — dominant ancestry. Associated with MC1R Celtic variants (fair skin, red/auburn hair tendency), lactase persistence (dairy tolerance from Steppe ancestry ~5,000 years ago), and HLA-B*51 prevalence along Atlantic coast populations.' },
      { region: 'Southern European',     pct: 8,  detail: 'Italian, Iberian, Balkan — likely traces to Early European Farmer migration from Anatolia ~7,500 years ago via the Mediterranean route. HLA-B*51 (connected to Quinn\'s Behcet\'s disease) has its highest global frequency along this ancient migration corridor.' },
      { region: 'Eastern European',      pct: 4,  detail: 'Polish, Baltic, Slavic component — likely from medieval-era population movements within Europe. Adds genetic diversity to the predominantly NW European background.' },
      { region: 'Other/Trace',           pct: 3,  detail: 'Trace regions including possible Scandinavian, Finnish, and broadly European components at confidence thresholds below 5%.' }
    ],
    maternal: {
      haplogroup: 'H1',
      age: '13,000 years',
      origin: 'Franco-Cantabrian Refugium (southern France / northern Spain)',
      detail: 'Haplogroup H1 originated among populations that survived the Last Glacial Maximum (LGM) in the Franco-Cantabrian refugium ~20,000 years ago. As glaciers retreated ~13,000 years ago, H1 carriers were among the first to recolonize Northern Europe along the Atlantic coast. H1 is now the most common European haplogroup (~25% of Europeans). Clinically, H1 is associated with enhanced mitochondrial Complex I (NADH dehydrogenase) efficiency, lower reactive oxygen species production, and favorable cardiovascular and neurological aging outcomes in multiple population studies. This exact mtDNA sequence is shared identically by Peggy, Chad, Quinn, and Brother.'
    },
    paternal: null,
    variantOrigins: [
      { variant: 'MT-H1 (mitochondrial)',      from: 'maternal', detail: 'Inherited exclusively through the maternal line. Identical in Peggy, her sister, Chad, Quinn, and Brother. Associated with enhanced Complex I efficiency.' },
      { variant: 'MC1R Celtic compound',        from: 'both',     detail: 'MC1R variants are autosomal (chromosome 16). Chad\'s compound heterozygosity (4 variants) reflects contributions from both parents. Peggy likely carries some of the same variants given shared NW European Celtic ancestry.' },
      { variant: '9p21 CAD risk alleles',        from: 'maternal', detail: 'Chad\'s 9p21 risk alleles traced through the maternal line. Peggy has ~50% probability of carrying via sibling concordance with Chad\'s mother.' },
      { variant: 'HLA-B*51',                    from: 'both',     detail: 'Quinn is B*51 homozygous (Behcet\'s disease). One copy came from Chad. The Southern European ancestry component (~8%) aligns with the geographic distribution of B*51, which peaks along the ancient Silk Road and Mediterranean migration route.' }
    ]
  },

  /* ═══════════════════════════════════════════════════════════════
     NEW: Clinical Brief Tab (Physician-Facing)
     ═══════════════════════════════════════════════════════════════ */
  clinical: {
    subtitle: 'Peggy B. Rome — 76F — Lung CA Survivor — MT-H1 Maternal Line',
    badge: 'ONCOLOGY / GERIATRICS',
    oneLiner: 'Lung cancer survivor, 76F, cognitively intact and functionally independent. Eldest living member of MT-H1 maternal lineage — most informative candidate for hereditary cancer panel testing.',
    sections: [
      {
        title: 'Clinical Summary',
        rows: [
          { label: 'Age / Sex',        value: '76F' },
          { label: 'Cancer History',    value: 'Lung cancer — survivor, no active malignancy', alert: true },
          { label: 'Functional Status', value: 'Independent, cognitively intact' },
          { label: 'Relation',          value: 'Maternal aunt of Chad Byars, M.D.' },
          { label: 'MT Haplogroup',     value: 'H1 — shared with Chad, Quinn, Brother' },
          { label: 'Family Cluster',    value: 'Peggy + sister (Chad\'s mother) — two lung CAs on same MT-H1 lineage', alert: true }
        ]
      },
      {
        title: 'Key Genomic Findings',
        rows: [
          { label: 'Haplogroup',        value: 'MT-H1 — enhanced Complex I efficiency' },
          { label: 'Ancestry',          value: '85% NW European, 8% Southern European, 4% Eastern European' },
          { label: 'SNP Genotyping',    value: 'Not available — ancestry-only 23andMe' },
          { label: 'CYP / APOE',       value: 'Unknown — no direct PGx data' },
          { label: 'Family Proxy',      value: 'Chad\'s 614,452-SNP analysis available for inference' }
        ]
      },
      {
        title: 'Family Cancer History — Clinical Significance',
        rows: [
          { label: 'Peggy',             value: 'Lung cancer survivor', alert: true },
          { label: 'Sister (Chad\'s mother)', value: 'Lung cancer, deceased age 75', alert: true },
          { label: 'Brigitte\'s aunt',   value: 'Breast cancer, age 33', alert: true },
          { label: 'Pattern',           value: 'Bilateral family cancer history — meets NCCN panel criteria', alert: true },
          { label: 'Recommended Panel', value: 'BRCA1/2, TP53, ATM, CHEK2, PALB2, RAD51C/D' },
          { label: 'Testing Priority',  value: 'Test Peggy first — cancer survivor + eldest maternal-line member', alert: true }
        ]
      },
      {
        title: 'Pharmacogenomic Status',
        rows: [
          { label: 'CYP2D6',   value: 'Unknown — codeine, metoprolol, tamoxifen metabolism' },
          { label: 'CYP2C19',  value: 'Unknown — clopidogrel, PPIs, SSRIs' },
          { label: 'VKORC1',   value: 'Unknown — NW European ancestry → likely warfarin-sensitive' },
          { label: 'NAT2',     value: 'Unknown — isoniazid, hydralazine, sulfonamides' },
          { label: 'Action',   value: 'PGx panel or 23andMe health report recommended', alert: true }
        ]
      },
      {
        title: 'Recommended Surveillance Protocol',
        rows: [
          { label: 'LDCT Chest',        value: 'Annually — lung CA recurrence surveillance', alert: true },
          { label: 'Skin Exam',         value: 'Annually — MC1R Celtic variants + UV exposure' },
          { label: 'Lipid Panel',       value: 'Annually with apoB — family 9p21 burden' },
          { label: 'Blood Pressure',    value: 'Quarterly — target <130/80' },
          { label: 'EKG',               value: 'Annually — family PITX2 variants' },
          { label: 'Cognitive Screen',  value: 'Annually — MoCA baseline at 76' },
          { label: 'DEXA',              value: 'Every 2 years — osteoporosis screening' },
          { label: 'Vitamin D',         value: 'Annually — 25-OH level, target 40-60 ng/mL' },
          { label: 'Cancer Panel',      value: 'One-time, HIGH PRIORITY', alert: true }
        ]
      }
    ],
    alerts: [
      { level: 'critical', text: 'Lung cancer survivor with familial cluster on MT-H1 lineage. Annual LDCT surveillance required. Hereditary cancer panel strongly recommended.' },
      { level: 'warn',     text: 'Pharmacogenomic status unknown at age 76. CYP2D6, CYP2C19, VKORC1 testing recommended before new medication initiation.' },
      { level: 'warn',     text: 'APOE status unknown and independent from Chad\'s e4 (paternal origin). Genotyping would complete the family Alzheimer\'s risk map.' },
      { level: 'warn',     text: 'Avoid high-dose beta-carotene supplementation (CARET trial: 28% increased lung CA risk in susceptible populations).' },
      { level: 'info',     text: 'MT-H1 haplogroup is a favorable finding — associated with enhanced mitochondrial efficiency and better cardiovascular/neurological aging outcomes.' }
    ]
  }
};
