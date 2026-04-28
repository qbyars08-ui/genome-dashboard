# STRAND Genome Dashboard

## What STRAND is

STRAND is an AI-assisted genomic and family health intelligence product built from Quinn Byars's own investigation into Behçet's disease, HLA-B\*51 homozygosity, and his family's medical history. The methodology — AI-assisted genomic briefs + family health dashboards — turns scattered labs, specialist notes, 23andMe exports, and discharge summaries into a single, physician-ready source of truth. Target customers: chronically ill patients and families drowning in medical data who are being passed between specialists with no one connecting the picture. Chad Byars MD (Quinn's father, an emergency physician) called the dashboard *"the most useful medical organization tool since the illness began."* That is the founding quote.

---

## Live demo families

| Page | Person | Role | Status |
|------|--------|------|--------|
| `quinn.html` | Quinn Byars | Proband — Behçet's / HLA-B\*51 homozygous investigation | Active case |
| `chad-brainmap.html` | Chad Byars | Father — CAD, dementia workup, AFib, lung cancer risk | Active case |
| `brigitte.html` | Brigitte Byars | Mother — 23andMe v5, cardiovascular and cancer risk | Active |
| `brother.html` | Ryan Byars | Brother — predicted risk based on family pattern | Predicted |
| `peggy.html` | Peggy (maternal aunt) | Extended family — HLA and autoimmune pattern completion | Active |
| `behcets.html` | Behçet's Disease | Condition-specific research brief for Quinn's case | Reference |
| `landing.html` | Marketing entry | Product overview and call to action | Public |

---

## Architecture

```
genome-dashboard/
├── landing.html              Marketing entry point (homepage at /)
├── quinn.html                Quinn — proband, active case
├── chad-brainmap.html        Chad — brain / cardiac map
├── brigitte.html             Brigitte — maternal genomics
├── brother.html              Brother — predicted risk profile
├── peggy.html                Peggy — maternal aunt
├── behcets.html              Behçet's disease reference brief
├── quinn-v2.html             Quinn — alternate layout (development)
├── quinn-detail.html         Quinn — expanded detail view
├── brigitte-detail.html      Brigitte — expanded detail view
├── chad.html                 Chad — redirect / legacy entry
├── index.html                Default index (redirects to landing)
│
├── data/
│   ├── quinn.js              Quinn-specific health data module
│   ├── chad.js               Chad-specific health data module
│   ├── brigitte.js           Brigitte-specific health data module
│   ├── brother.js            Brother-specific health data module
│   └── peggy.js              Peggy-specific health data module
│
└── assets/
    ├── strand.css            Core design system — typography, colors, spacing
    ├── strand-components.css Component library — cards, tables, badges, grids
    ├── strand-shell.js       Chrome: topbar, rail nav, family switcher, footer
    └── strand-app.js         Per-person renderer — reads data/*.js and builds the page
```

### How a page works

Each HTML file is a 29-line shell. It loads the shared assets and one person-specific data file:

```
HTML shell (29 lines per person)
  ├── data/<person>.js        Person-specific health data (variants, labs, timeline, conditions)
  └── assets/
      ├── strand.css          Design system
      ├── strand-components.css
      ├── strand-shell.js     Chrome (topbar, rail, family switcher, footer)
      └── strand-app.js       Per-person renderer
```

`strand-shell.js` renders the chrome on every page. `strand-app.js` reads the `window.STRAND_DATA` object exported by each `data/<person>.js` and renders the content: condition cards, variant tables, lab timelines, risk badges, and physician notes.

No build step. No server. No framework. Pure vanilla HTML/CSS/JS with D3.js v7 from CDN for any data visualizations.

---

## File map

| File | Purpose |
|------|---------|
| `landing.html` | Marketing homepage — what STRAND is, what it delivers, CTA |
| `index.html` | Default index — redirects to landing or dashboard entry |
| `quinn.html` | Quinn's active case dashboard |
| `chad-brainmap.html` | Chad's brain and cardiac map — dementia, CAD, AFib |
| `brigitte.html` | Brigitte's dashboard — 23andMe v5 parsed |
| `brother.html` | Brother's predicted risk profile |
| `peggy.html` | Peggy's dashboard — maternal aunt |
| `behcets.html` | Behçet's disease research brief |
| `quinn-v2.html` | Quinn alternate layout (development iteration) |
| `quinn-detail.html` | Quinn expanded detail / deep dive view |
| `brigitte-detail.html` | Brigitte expanded detail view |
| `chad.html` | Chad legacy entry / redirect |
| `data/quinn.js` | Quinn's health data: variants, labs, timeline, conditions, care team |
| `data/chad.js` | Chad's health data |
| `data/brigitte.js` | Brigitte's health data |
| `data/brother.js` | Brother's predicted data |
| `data/peggy.js` | Peggy's health data |
| `assets/strand.css` | Core design system |
| `assets/strand-components.css` | Component library |
| `assets/strand-shell.js` | Page chrome — nav, rail, family switcher |
| `assets/strand-app.js` | Per-person content renderer |

---

## Local development

No install required. Run a local static server from the `genome-dashboard/` directory:

```bash
cd /path/to/STRAND/genome-dashboard
python3 -m http.server 8743
```

Or using the package.json script:

```bash
npm run dev
```

Then open: [http://localhost:8743/landing.html](http://localhost:8743/landing.html)

To navigate directly to a family member's dashboard:
- [http://localhost:8743/quinn.html](http://localhost:8743/quinn.html)
- [http://localhost:8743/chad-brainmap.html](http://localhost:8743/chad-brainmap.html)
- [http://localhost:8743/brigitte.html](http://localhost:8743/brigitte.html)

---

## Deployment

See [DEPLOY.md](./DEPLOY.md) for step-by-step instructions to deploy to Vercel.

Short version: `npx vercel` from this directory, or push to GitHub and import via vercel.com/new.

---

## Privacy and data notice

The clinical data shown in this dashboard is real data from the Byars family, used here as the founding case study for the STRAND methodology. Quinn uses this dashboard personally and has chosen to keep his family's data in the public demo.

**STRAND is a health intelligence synthesis tool, not a medical provider.** Nothing in these dashboards constitutes medical advice, diagnosis, or treatment. All findings are presented as synthesized summaries for use by the patient and their treating clinicians. Dosing, prescriptions, and diagnostic conclusions remain the domain of licensed providers.

If you are a prospective customer reviewing this demo: the data you see is real, the methodology is validated on this family, and your data would be handled with equivalent rigor and any PHI protections your engagement requires.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Markup | Vanilla HTML5 |
| Style | Vanilla CSS (strand.css + strand-components.css) |
| Logic | Vanilla JavaScript (ES6 modules) |
| Visualization | D3.js v7 (CDN, no local copy) |
| Build step | None |
| Server | None (static files only) |
| Deployment | Vercel (static hosting) |
| Dev server | `python3 -m http.server 8743` |

---

## STRAND product tiers

| Tier | Price | What it includes |
|------|-------|-----------------|
| Second Opinion Brief | $1,000 one-time | Single condition, single patient, existing records. 3–5 page physician-ready PDF in 7 days. |
| Founder Brief | $2,500 one-time | One family member, one condition focus. Initial vault + dashboard + physician handout. |
| Family Intelligence | $7,500 one-time | Up to 5 family members. Full dashboards for each, condition-specific research notes, family-wide synthesis. |
| Active Case | $1,500 / month | For families in active diagnostic workup. Weekly inbox triage, monthly brief refresh, specialist briefs. |

---

## Related

- `../Business/Product.md` — full product spec, GTM, pricing rationale
- `../CLAUDE.md` — STRAND project context
- `../Family-Data/` — raw genome data files (not deployed)
- `../Labs/` — raw lab PDFs (not deployed)
