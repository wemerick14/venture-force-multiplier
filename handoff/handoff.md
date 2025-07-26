# VentureForceMultiplier.ai – Handoff Guide  
_Last touched: [YYYY-MM-DD]_

---

## 1 · Project Snapshot
- **Status:** Phase 1 in progress – site skeleton scaffolding & Netlify deploy.
- **Primary Goal:** Launch live MVP (Home + Tools index + Campaign Crafter shell) **today**.
- **Tagline:** “Deploying workflows. Multiplying outcomes.”
- **Stack:** React + Vite • Tailwind CSS • Supabase (phase 2) • Gemini Flash API • Netlify.
- **Owner Persona:** Baylor student (Finance/Marketing/Data Analytics, 4.0 GPA) with SAS automation and venture-strategy focus.

---

## 2 · Key Directories & Files
venture-force-multiplier/
├─ src/ # Vite React code
├─ docs/
│ ├─ context.md # Full narrative + branding (rarely loaded)
│ └─ implementation-plan.md # Phase roadmap
├─ memory/
│ ├─ memory-bank.yaml # ≤1 KB quick-load summary ← ALWAYS LOAD
│ └─ session-log-YYYYMMDD.md # Optional extended notes
└─ handoff/
└─ handoff.md # This guide


---

## 3 · Start-of-Session Checklist
1. **Open** `/memory/memory-bank.yaml`  
   - Scan `phase`, `open_actions`, and any new keys.
2. **Review** the top items in `open_actions`.  
3. **Load** only the spec snippet you need (e.g., Phase-1 block from `implementation-plan.md`).  
4. **Confirm** environment: `VITE_GEMINI_API_KEY` set in `.env.local`.  
5. **Begin work**, staying under ~800 tokens of loaded context.

---

## 4 · End-of-Session Checklist
1. Summarise what you accomplished in **≤50 words**.  
2. Add / adjust items in `open_actions` inside `memory-bank.yaml`.  
3. If detail is useful, append bullets to today’s `/memory/session-log-YYYYMMDD.md`.  
4. Commit & push → GitHub (Netlify auto-deploys if `main` updated).

---

## 5 · Current `open_actions` (from memory-bank)
- Scaffold React project with Tailwind & dark-mode toggle.  
- Create `Home`, `Tools`, `CampaignCrafter` routes with placeholders.  
- Push to GitHub & verify Netlify preview loads.  

*(If this list is out of sync, update it in memory-bank.yaml now.)*

---

## 6 · Critical Context Reminders
- **Target users:** startup operators, SaaS teams, VC-backed founders (medium-low tech).  
- **Design vibe:** dark grid, dev-studio chic, no clutter.  
- **MVP success metric:** live site, loads < 3 s, no console errors.  
- **Phase cadence:** Phase-1 (today) → Phase-2 (days 2-7) → Phase-3 (weeks 2-4).  

---

## 7 · Questions to Resolve Quickly
1. Are brand assets (logo / favicon) ready or use text-logo for now?  
2. Confirm exact domain to connect on Netlify (`ventureforcemultiplier.ai`?).  
3. Any blocker on obtaining Gemini Flash API key?  

---

## 8 · Contact
_For clarifications ping:_ **[owner-email / Slack handle / phone]**

---

> **Update this handoff.md at the end of every significant work session.**  
> If anything feels unclear, add a note here before closing your PR.
