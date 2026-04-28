# STRAND Genome Dashboard — Deploy Guide

Static deploy to Vercel. No build step, no server, no environment variables required.

---

## Pre-flight checklist

Run these before making the repo public or promoting to production. These are informational — you know what data is in here and have chosen to keep it. This tells you exactly what's currently exposed so you can confirm that's OK.

```bash
# Check for MRNs (Byars family chart numbers)
grep -r "7001875601\|11006662" .

# Check for phone numbers
grep -r "503-[0-9]\{3\}-[0-9]\{4\}" .

# Check for provider full names — review what comes back
grep -ri "crowley\|kingsbury\|tung\|tucker\|foster\|lauhan\|lampert" .

# Confirm all HTML pages load via local server
python3 -m http.server 8743
# Then visit each: landing, quinn, chad-brainmap, brigitte, brother, peggy, behcets
```

These greps are informational, not blocking. You've made a deliberate choice to keep real family data in the public demo. Confirm the results match your expectations and proceed.

---

## Option A — Deploy via GitHub (recommended for ongoing work)

### Step 1: Initialize git

From inside `genome-dashboard/`:

```bash
cd /Users/quinnbyars/Quinn/STRAND/genome-dashboard
git init
git add vercel.json .gitignore package.json README.md DEPLOY.md .vercelignore
git add landing.html index.html
git add quinn.html chad-brainmap.html brigitte.html brother.html peggy.html
git add behcets.html quinn-v2.html quinn-detail.html brigitte-detail.html chad.html
git add assets/ data/
git commit -m "feat(strand): initial deploy of genome dashboard static site"
```

### Step 2: Create GitHub repo

If you have the `gh` CLI installed:

```bash
gh repo create strand-genome-dashboard \
  --public \
  --description "STRAND genome dashboard — family health intelligence prototype" \
  --source . \
  --remote origin \
  --push
```

If you don't have `gh` CLI:
1. Go to https://github.com/new
2. Name: `strand-genome-dashboard`
3. Visibility: Public (or Private if you prefer)
4. Do NOT initialize with README (you already have one)
5. Copy the remote URL, then:

```bash
git remote add origin https://github.com/qbyars08/strand-genome-dashboard.git
git branch -M main
git push -u origin main
```

### Step 3: Import into Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `strand-genome-dashboard`
4. Framework preset: **Other** (not Next.js, not Vite — this is plain static)
5. Root directory: leave blank (the repo root IS the site root)
6. Build command: leave blank
7. Output directory: leave blank
8. Click **Deploy**

Vercel will detect `vercel.json` automatically. The `/` route rewrites to `landing.html`.

### Step 4: Verify preview deploy

Before promoting to production, confirm:
- [ ] `https://<your-preview-url>.vercel.app/` loads `landing.html`
- [ ] `https://<your-preview-url>.vercel.app/quinn` loads Quinn's dashboard
- [ ] `https://<your-preview-url>.vercel.app/chad` loads Chad's brain map
- [ ] `https://<your-preview-url>.vercel.app/assets/strand.css` returns CSS (not 404)
- [ ] Browser DevTools → Network tab → `strand.css` response header shows `Cache-Control: public, max-age=31536000`

---

## Option B — Direct deploy via Vercel CLI (no GitHub required)

Fastest path for a one-off deploy or testing:

```bash
cd /Users/quinnbyars/Quinn/STRAND/genome-dashboard
npx vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your personal account
- Link to existing project? **N** (first time)
- Project name: `strand-genome-dashboard`
- Which directory is your code? **./** (current directory)

Vercel will print a preview URL. Test it. When ready to go to production:

```bash
npx vercel --prod
```

To deploy future updates without prompts:

```bash
npx vercel --prod
```

---

## Custom domain (future)

When you're ready to add `strand.app` or a subdomain:

1. Go to https://vercel.com/dashboard → your project → Settings → Domains
2. Add your domain (e.g., `dashboard.strand.app` or `strand.app`)
3. Follow the DNS instructions Vercel provides (usually a CNAME or A record)
4. Vercel auto-provisions SSL

No code changes needed — `vercel.json` is already domain-agnostic.

---

## Environment variables

None required for v0. This is a fully static site with no server-side logic.

If you add a contact form or any serverless function later, add variables via:

```bash
npx vercel env add VARIABLE_NAME
```

or via https://vercel.com/dashboard → your project → Settings → Environment Variables.

---

## Ongoing deploys

After the initial GitHub connection, every push to `main` triggers an automatic Vercel deploy. No manual steps needed.

```bash
# Make changes, then:
git add -p                          # stage only what you mean to
git commit -m "fix(quinn): update variant table"
git push                            # Vercel deploys automatically
```

For previewing before merging to main, push to any branch — Vercel creates a unique preview URL per branch automatically.

---

## URL structure (what vercel.json configures)

| URL | Destination |
|-----|-------------|
| `/` | `landing.html` |
| `/quinn` | `quinn.html` |
| `/chad` | `chad-brainmap.html` |
| `/brigitte` | `brigitte.html` |
| `/brother` | `brother.html` |
| `/peggy` | `peggy.html` |
| `/behcets` | `behcets.html` |
| `/assets/*` | Served directly, 1-year cache |
| `/data/*` | Served directly, 1-year cache |
| `/*.html` | Served directly, 1-hour cache |

---

## Troubleshooting

**"404 Not Found" on `/`**
Vercel may have picked a framework preset that expects a build output directory. Go to Project Settings → General → Build & Output Settings and ensure Build Command and Output Directory are both blank.

**CSS/JS not loading after deploy**
Check that `assets/` was included in your git commit. Run `git ls-files assets/` to confirm.

**Clean URLs not working (e.g., `/quinn` 404s)**
Confirm `vercel.json` is in the root of the deployed directory and was committed to git. Run `cat vercel.json` to verify.

**Cache not busting after an update to assets**
Vercel deploys create a new immutable URL per file per deploy. Hard-refresh (`Cmd+Shift+R`) in the browser. If users are seeing stale assets, the 1-year cache only applies to previously cached files — new deploys generate new asset fingerprints automatically.
