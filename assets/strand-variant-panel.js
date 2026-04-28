/* ═══════════════════════════════════════════════════════════════
   STRAND Variant Panel — 24 clinically relevant SNPs.
   Loaded before strand-onboard.js. Defines window.VARIANT_PANEL.
   Each entry: rsid, gene, category, interpret(genotype) → { name, finding, severity }
   severity: 'high' | 'moderate' | 'low' | 'info'
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Category label map (also used by strand-onboard.js) ────── */
const CAT_LABELS = {
  lg: 'Mental Health',
  mt: 'Metabolism',
  cv: 'Cardiovascular',
  dr: 'Drug Response',
  nr: 'Immune',
  ca: 'GI / Gut'
};

const VARIANT_PANEL = [
  /* ── APOE ε4/ε2 (two SNPs together determine haplotype) ───── */
  {
    rsid: 'rs429358', gene: 'APOE', category: 'lg',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'APOE ε status (partial)', finding: 'rs429358 not called', severity: 'info' };
      const isCpos = gt.includes('C');
      return {
        name: 'APOE — Alzheimer\'s / Lipid Risk',
        finding: isCpos
          ? `rs429358 ${gt} — carries ε4 allele(s). Elevated late-onset AD + cardiovascular risk.`
          : `rs429358 ${gt} — no ε4 at this locus. Lower APOE-related AD risk.`,
        severity: isCpos ? 'high' : 'low'
      };
    }
  },
  {
    rsid: 'rs7412', gene: 'APOE', category: 'lg',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'APOE ε2 status (partial)', finding: 'rs7412 not called', severity: 'info' };
      const isTpos = gt.includes('T');
      return {
        name: 'APOE ε2 — Protective Allele',
        finding: isTpos
          ? `rs7412 ${gt} — carries ε2. Lower LDL, possible protective effect vs AD.`
          : `rs7412 ${gt} — no ε2 allele at this locus.`,
        severity: isTpos ? 'low' : 'info'
      };
    }
  },
  /* ── MC1R — Melanoma / Red hair ─────────────────────────── */
  {
    rsid: 'rs1805007', gene: 'MC1R', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'MC1R R151C', finding: 'Not called', severity: 'info' };
      const v = gt.includes('T');
      return {
        name: 'MC1R R151C — Melanoma Risk',
        finding: v
          ? `${gt} — R151C variant present. 2-4× increased melanoma risk. Sun protection critical.`
          : `${gt} — no R151C at this position.`,
        severity: v ? 'moderate' : 'low'
      };
    }
  },
  {
    rsid: 'rs1805008', gene: 'MC1R', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'MC1R R160W', finding: 'Not called', severity: 'info' };
      const v = gt.includes('T');
      return {
        name: 'MC1R R160W — Melanoma / Hair',
        finding: v
          ? `${gt} — R160W present. Red hair / fair skin phenotype. Elevated melanoma risk.`
          : `${gt} — no R160W at this position.`,
        severity: v ? 'moderate' : 'low'
      };
    }
  },
  /* ── 9p21 CAD risk locus (3 markers) ────────────────────── */
  {
    rsid: 'rs10757278', gene: '9p21', category: 'cv',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: '9p21 CAD Risk (rs10757278)', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/G/g) || []).length;
      return {
        name: '9p21 — Coronary Artery Disease Risk',
        finding: n === 2 ? `${gt} — Homozygous GG. ~2× elevated MI/CAD risk.`
          : n === 1   ? `${gt} — Heterozygous. ~1.3× elevated CAD risk.`
          :             `${gt} — No risk alleles at rs10757278.`,
        severity: n === 2 ? 'high' : n === 1 ? 'moderate' : 'low'
      };
    }
  },
  {
    rsid: 'rs1333049', gene: '9p21', category: 'cv',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: '9p21 CAD Risk (rs1333049)', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/C/g) || []).length;
      return {
        name: '9p21 — CAD Risk Locus 2',
        finding: n === 2 ? `${gt} — Homozygous CC. Highest risk at this 9p21 marker.`
          : n === 1   ? `${gt} — Heterozygous. Intermediate risk.`
          :             `${gt} — No risk alleles.`,
        severity: n === 2 ? 'high' : n === 1 ? 'moderate' : 'low'
      };
    }
  },
  {
    rsid: 'rs4977574', gene: '9p21', category: 'cv',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: '9p21 CAD Risk (rs4977574)', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/G/g) || []).length;
      return {
        name: '9p21 — CAD Risk Locus 3',
        finding: n === 2 ? `${gt} — Homozygous GG. Third 9p21 risk marker elevated.`
          : n === 1   ? `${gt} — One risk allele at rs4977574.`
          :             `${gt} — No risk alleles.`,
        severity: n === 2 ? 'high' : n === 1 ? 'moderate' : 'low'
      };
    }
  },
  /* ── PITX2 — AFib ──────────────────────────────────────── */
  {
    rsid: 'rs2200733', gene: 'PITX2', category: 'cv',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'PITX2 — AFib Risk', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/T/g) || []).length;
      return {
        name: 'PITX2 — Atrial Fibrillation Risk',
        finding: n === 2 ? `${gt} — Homozygous risk. Strongest AFib locus. Annual EKG recommended.`
          : n === 1   ? `${gt} — Heterozygous. Elevated AFib risk. Limit alcohol.`
          :             `${gt} — No PITX2 AFib risk allele.`,
        severity: n === 2 ? 'high' : n === 1 ? 'moderate' : 'low'
      };
    }
  },
  /* ── FGFR2 — Breast Cancer ─────────────────────────────── */
  {
    rsid: 'rs2981582', gene: 'FGFR2', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'FGFR2 — Breast Cancer Risk', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/T/g) || []).length;
      return {
        name: 'FGFR2 — Breast Cancer Susceptibility',
        finding: n === 2 ? `${gt} — Homozygous TT. ~1.6× elevated breast cancer risk.`
          : n === 1   ? `${gt} — Heterozygous. ~1.3× elevated risk.`
          :             `${gt} — No FGFR2 risk alleles.`,
        severity: n === 2 ? 'high' : n === 1 ? 'moderate' : 'low'
      };
    }
  },
  /* ── Factor V Leiden — Clotting ───────────────────────── */
  {
    rsid: 'rs6025', gene: 'F5', category: 'cv',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'Factor V Leiden', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'Factor V Leiden — DVT / Clotting Risk',
        finding: hasA
          ? `${gt} — Factor V Leiden present. Elevated DVT, PE risk. Inform surgeons.`
          : `${gt} — No Factor V Leiden. Normal clotting risk.`,
        severity: hasA ? 'high' : 'low'
      };
    }
  },
  /* ── HFE — Hemochromatosis ─────────────────────────────── */
  {
    rsid: 'rs1800562', gene: 'HFE', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'HFE C282Y', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'HFE C282Y — Hereditary Hemochromatosis',
        finding: hasA
          ? `${gt} — C282Y carrier. Monitor ferritin annually. Iron overload risk.`
          : `${gt} — No HFE C282Y variant.`,
        severity: hasA ? 'moderate' : 'low'
      };
    }
  },
  {
    rsid: 'rs1799945', gene: 'HFE', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'HFE H63D', finding: 'Not called', severity: 'info' };
      const hasG = gt.includes('G');
      return {
        name: 'HFE H63D — Iron Overload Risk',
        finding: hasG
          ? `${gt} — H63D present. Mild hemochromatosis risk, especially with C282Y.`
          : `${gt} — No H63D variant.`,
        severity: hasG ? 'moderate' : 'low'
      };
    }
  },
  /* ── MTHFR — Methylation ───────────────────────────────── */
  {
    rsid: 'rs1801133', gene: 'MTHFR', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'MTHFR C677T', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/T/g) || []).length;
      return {
        name: 'MTHFR C677T — Methylation',
        finding: n === 2 ? `${gt} — Homozygous TT. ~70% reduced MTHFR activity. Use methylfolate.`
          : n === 1   ? `${gt} — Heterozygous CT. ~35% reduced methylation. Consider methylfolate.`
          :             `${gt} — No C677T variant. Normal MTHFR at this site.`,
        severity: n === 2 ? 'high' : n === 1 ? 'moderate' : 'low'
      };
    }
  },
  {
    rsid: 'rs1801131', gene: 'MTHFR', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'MTHFR A1298C', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/C/g) || []).length;
      return {
        name: 'MTHFR A1298C — Methylation (compound)',
        finding: n === 2 ? `${gt} — Homozygous CC. Compound MTHFR risk.`
          : n === 1   ? `${gt} — Heterozygous. Compound MTHFR risk if C677T also present.`
          :             `${gt} — No A1298C variant.`,
        severity: n >= 1 ? 'moderate' : 'low'
      };
    }
  },
  /* ── CYP2C19 *2 — Drug metabolism ─────────────────────── */
  {
    rsid: 'rs4244285', gene: 'CYP2C19', category: 'dr',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'CYP2C19 *2 (LOF)', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'CYP2C19 *2 — Drug Metabolism',
        finding: hasA
          ? `${gt} — *2 loss-of-function present. Clopidogrel reduced efficacy. PPIs elevated.`
          : `${gt} — No *2 LOF. Normal CYP2C19 at this locus.`,
        severity: hasA ? 'high' : 'low'
      };
    }
  },
  /* ── TPMT — Thiopurine toxicity (3 markers) ────────────── */
  {
    rsid: 'rs1142345', gene: 'TPMT', category: 'dr',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'TPMT *3C', finding: 'Not called', severity: 'info' };
      const hasC = gt.includes('C');
      return {
        name: 'TPMT *3C — Azathioprine Toxicity',
        finding: hasC
          ? `${gt} — *3C present. Azathioprine/6-MP dose reduction required. Myelosuppression risk.`
          : `${gt} — No TPMT *3C. Normal thiopurine metabolism here.`,
        severity: hasC ? 'high' : 'low'
      };
    }
  },
  {
    rsid: 'rs1800462', gene: 'TPMT', category: 'dr',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'TPMT *2', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'TPMT *2 — Thiopurine Risk',
        finding: hasA ? `${gt} — *2 present. Reduced thiopurine metabolism.` : `${gt} — No TPMT *2.`,
        severity: hasA ? 'high' : 'low'
      };
    }
  },
  {
    rsid: 'rs1800460', gene: 'TPMT', category: 'dr',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'TPMT *3A', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'TPMT *3A — Thiopurine Risk',
        finding: hasA ? `${gt} — *3A present. Compound risk with other TPMT variants.` : `${gt} — No TPMT *3A.`,
        severity: hasA ? 'moderate' : 'low'
      };
    }
  },
  /* ── LCT — Lactose tolerance ───────────────────────────── */
  {
    rsid: 'rs4988235', gene: 'LCT', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'LCT — Lactase Persistence', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'LCT — Lactose Tolerance',
        finding: hasA
          ? `${gt} — Lactase persistent. Likely tolerate dairy into adulthood.`
          : `${gt} — Ancestral genotype. Likely lactose intolerant without dairy adaptation.`,
        severity: hasA ? 'low' : 'info'
      };
    }
  },
  /* ── ALDH2 — Alcohol flush / esophageal cancer ──────────── */
  {
    rsid: 'rs671', gene: 'ALDH2', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'ALDH2 — Alcohol Flush', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'ALDH2 — Alcohol Metabolism',
        finding: hasA
          ? `${gt} — ALDH2*2 variant. Flush reaction, acetaldehyde buildup. Elevated esophageal cancer risk with alcohol.`
          : `${gt} — Normal ALDH2. Typical alcohol metabolism.`,
        severity: hasA ? 'high' : 'low'
      };
    }
  },
  /* ── FTO — Obesity/weight ──────────────────────────────── */
  {
    rsid: 'rs9939609', gene: 'FTO', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'FTO — Obesity Risk', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/A/g) || []).length;
      return {
        name: 'FTO — Body Weight Regulation',
        finding: n === 2 ? `${gt} — Homozygous AA. ~1.7kg average weight increase vs TT.`
          : n === 1   ? `${gt} — One FTO risk allele. Moderate appetite regulation impact.`
          :             `${gt} — No FTO risk alleles.`,
        severity: n === 2 ? 'moderate' : n === 1 ? 'info' : 'low'
      };
    }
  },
  /* ── OCA2 — Eye color ──────────────────────────────────── */
  {
    rsid: 'rs12913832', gene: 'OCA2', category: 'mt',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'OCA2 — Eye Color', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'OCA2 — Eye Color Prediction',
        finding: hasA
          ? `${gt} — Likely blue or light eyes (A allele).`
          : `${gt} — Likely brown eyes (homozygous GG).`,
        severity: 'info'
      };
    }
  },
  /* ── IL23R — IBD / Autoimmune ──────────────────────────── */
  {
    rsid: 'rs11209026', gene: 'IL23R', category: 'nr',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'IL23R — IBD / Autoimmune', finding: 'Not called', severity: 'info' };
      const hasA = gt.includes('A');
      return {
        name: 'IL23R — Inflammatory Bowel / Autoimmune',
        finding: hasA
          ? `${gt} — R381Q protective variant. Reduced Crohn\'s / psoriasis risk.`
          : `${gt} — No IL23R protective allele. Population-average IBD risk.`,
        severity: hasA ? 'low' : 'info'
      };
    }
  },
  /* ── STAT4 — Autoimmune ────────────────────────────────── */
  {
    rsid: 'rs7574070', gene: 'STAT4', category: 'nr',
    interpret: (gt) => {
      if (!gt || gt === '--') return { name: 'STAT4 — Autoimmune Risk', finding: 'Not called', severity: 'info' };
      const n = (gt.match(/T/g) || []).length;
      return {
        name: 'STAT4 — Rheumatoid Arthritis / Lupus Risk',
        finding: n === 2 ? `${gt} — Homozygous TT. Elevated RA, lupus, Sjögren\'s risk.`
          : n === 1   ? `${gt} — One STAT4 risk allele. Modestly elevated autoimmune risk.`
          :             `${gt} — No STAT4 risk alleles.`,
        severity: n === 2 ? 'moderate' : n === 1 ? 'info' : 'low'
      };
    }
  }
];
