# VentureForceMultiplier.ai – Implementation Plan (v2)

## Phase 0 · Pre-flight (today, < 1 hr)
- ✅ **Repo & CI**
  - Initialise GitHub repo with `/docs`, `/memory`, `/handoff`, `/src`.
  - Add basic `.gitignore`, `.claudeignore`, and `/memory/memory-bank.yaml` seed.
  - Configure Netlify deploy from `main` → preview → production.
- ✅ **Project boilerplate**
  - `npm create vite@latest ventureforce --template react`.
  - Install Tailwind (`npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init`).
  - Set dark mode class strategy; add global CSS reset.

---

## Phase 1 · Foundation & MVP (Day 1)
**Goal:** a live, responsive site with placeholder tooling so visitors can click around.

1. **Core pages & routing**
   - `/` – dark hero → “Deploying workflows. Multiplying outcomes.” + CTA buttons.
   - `/tools` – dynamic grid of `<ToolCard>` components (3 static entries).
   - `/tools/campaign-crafter` – `<CampaignCrafterShell>` with input + output placeholders.
   - React Router v6; global `<Layout>` with nav + dark-light toggle.
2. **Design system**
   - Tailwind config tokens: primary, accent, bg-grid pattern via CSS.
   - `ToolShell` wrapper component for consistent padding, headings, action buttons.
3. **Deployment**
   - Push to GitHub → Netlify preview; verify lighthouse score > 85 mobile/desktop.
4. **Memory hook**
   - Add “phase: 1” + `open_actions` into `memory-bank.yaml`.

---

## Phase 2 · Interactivity & Data (Days 2 – 7)
**Goal:** first working tool + logging; keep tokens lean.

1. **Backend plumbing**
   - Dot-env file for `VITE_GEMINI_API_KEY` (also works with Claude proxy).
   - Supabase project → enable anonymous table `usage_logs`.
2. **Campaign Crafter MVP**
   - Frontend: input form (product, persona, tone) → `handleSubmit`.
   - Backend request builder → POST to `/api/generate` (Gemini Flash).
   - Render results in accordion blocks (cold email x3, LinkedIn DM, voicemail).
   - Log `{tool, chars_in, chars_out, timestamp}` to Supabase.
3. **Analytics & error handling**
   - Add try/catch with toast alerts.
   - Simple page-view tracking via Netlify Analytics or Plausible.
4. **Tool template**
   - Extract `<ToolShell>` + `<ResultCard>` for reuse.
   - Scaffold empty routes for LeadGen Synth & Process Automator.
5. **Memory update**
   - Bump `phase: 2`; add next tasks to `open_actions`.

---

## Phase 3 · Auth, Monetisation & Private Portal (Weeks 2 – 4)
**Goal:** gated features, payment, and résumé sub-site.

1. **Auth**
   - Supabase Google OAuth; create `/ProtectedRoute`.
   - Toggle: public demo ≤3 calls → prompt sign-in.
2. **Stripe integration**
   - Price tiers: *Explorer (Free)*, *Operator ($19/mo)*, *Enterprise (Contact)*.
   - Webhook to add credits row in Supabase.
3. **Private portal**
   - `/lab` subdomain; link NOT exposed in nav.
   - Sections: résumé.pdf, project timeline, case-study write-ups.
4. **User dashboard**
   - Display remaining credits, past runs, saved outputs.
5. **Polish**
   - Motion / micro-animations, SEO basics (meta tags, sitemap), accessibility pass.
6. **Memory / docs**
   - Record monetisation schema and portal URL in `memory-bank.yaml`.
   - Update `/docs/implementation-plan.md` to v3.

---

## Development Workflow
1. **Branch naming:** `feat/xyz-tool`, `fix/ui-bug`, `chore/docs`.
2. **PR checklist:** unit lint, responsive check, update memory if decisions change.
3. **Claude usage:**  
   - Load `handoff.md` + `memory-bank.yaml` only.  
   - Paste *just* the relevant spec snippet when generating code.  
   - Summarise outcome ≤50 words and append to `memory-bank.yaml`.

---

## Success Metrics (MVP)
- TTI < 3 s on 4G; Lighthouse perf ≥ 85.
- Zero console errors on first user journey.
- Campaign Crafter returns valid copy for ≥90 % of test prompts.
- At least one inbound contact within first week live.

---

_Last updated: 2025-07-26_
