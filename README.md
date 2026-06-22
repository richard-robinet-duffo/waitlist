# Gini — Waitlist landing page

The waitlist / early-access landing page for **Gini Health** — at-home blood testing for women, timed to the menstrual cycle.

🔗 **Live:** [gini.health](https://gini.health) · Backup alias: [gini-code.vercel.app](https://gini-code.vercel.app)

---

## What it is

A single static page — **no framework, no build step** (plain HTML/CSS/JS). It collects
emails for the *Founding 500* and writes them to a Google Sheet via a Google Apps Script
web app. Hosted on Vercel with automatic redeploys on every push to `main`.

### Features
- Responsive, accessible (visible focus, `prefers-reduced-motion`), single-file.
- Premium editorial design — warm bone background, Fraunces serif, Space Mono micro-labels, oxblood accent.
- Two-step capture: **email** → then an optional **qualifier** (“what brought you here?”).
- **Founding 500** scarcity: live progress bar + **position in line** (`You're #N`).
- **Referral** link (`?ref=`) so members can move up the line.
- All copy and the form endpoint live in a single `CONFIG` block at the top of the inline `<script>`.

---

## Project structure

| File | Purpose |
|------|---------|
| [`index.html`](index.html) | The entire landing page (markup + styles + logic). |
| [`apps-script.gs`](apps-script.gs) | Reference copy of the Google Apps Script web app (deployed on Google, **not** served by the site). |
| `.gitignore` | Ignores `.DS_Store`, `node_modules`, `.vercel`. |

---

## Configuration

Everything editable lives in the `CONFIG` block near the bottom of [`index.html`](index.html):

```js
const CONFIG = {
  productName: "Gini",
  title:    "Bloodwork, built around <em>your cycle</em>", // <em> = italic accent
  subline:  "At-home · For women · Timed to your cycle",
  formEndpoint: "https://script.google.com/macros/s/.../exec", // Apps Script web app URL
  ctaLabel: "Claim my spot",
  successTitle: "You're in",
  foundingGoal: 500,    // cap shown in the scarcity bar
  minCountToShow: 25,   // hide the live number until N signups (avoids "3/500"); 0 = always show
};
```

To reskin, change `--accent` (and the warm palette vars) in the `:root` CSS block.

---

## Data collection (Google Sheets)

The form talks to a Google Apps Script web app that appends/updates rows in a `Signups`
sheet (columns: `Date · Email · First Name · Reason · Referred By · User Agent`).

- **Step 1** (`email` + `ref`) creates the row.
- **Step 2** (`email` + `reason`) updates the *same* row, matched by email.
- The browser POSTs in `mode: "no-cors"` (fire-and-forget); the live counter / position
  are read back via **JSONP** (`?callback=`) to bypass CORS.

### Updating the Apps Script
1. Paste [`apps-script.gs`](apps-script.gs) into the Sheet’s **Extensions → Apps Script**, Save.
2. **Deploy → Manage deployments → ✏️ edit the existing deployment → Version: New version → Deploy.**
   Editing the existing deployment keeps the same `/exec` URL. Creating a *new* deployment
   generates a new URL — paste it back into `CONFIG.formEndpoint`.
3. Access must be **“Anyone”** so anonymous visitors can submit.

---

## Deployment

Hosted on **Vercel**, linked to this GitHub repo. **Every push to `main` auto-deploys to production.**

```bash
# edit index.html, then:
git add .
git commit -m "..."
git push        # → Vercel redeploys gini.health automatically
```

### Custom domain (Namecheap → Vercel)
`gini.health` (apex) points to Vercel via an `A` record. Vercel issues HTTPS automatically.

---

## Local preview

It’s a static file — just open it:

```bash
open index.html          # macOS
# or serve it:
python3 -m http.server 8000   # → http://localhost:8000
```

With `formEndpoint` set, submissions write to the live Sheet. Leave it `""` for a demo mode
that shows the confirmation without sending anything.
