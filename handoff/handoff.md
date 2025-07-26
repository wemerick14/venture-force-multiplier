# VentureForceMultiplier.ai – Handoff Guide  
_Last touched: 2025-07-26_

---

## 1 · Project Snapshot
- **Status:** Phase 2 COMPLETE ✅ – Full AI integration + mobile optimization deployed.
- **Live Site:** https://venture-force-multiplier.netlify.app/
- **Current Goal:** Phase 2.5 – Build tool ecosystem (LeadGen Synth, Supabase, Meeting Copilot).
- **Tagline:** "Deploying workflows. Multiplying outcomes."
- **Stack:** React + Vite • Tailwind CSS • Gemini Flash API (active) • Netlify (deployed).
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
- Build LeadGen Synth: AI prospect research + contact discovery tool
- Integrate Supabase for usage tracking and analytics  
- Create Meeting Brief Copilot for VC/founder meeting prep
- Add export/share functionality to Campaign Crafter results
- Implement tool interconnectivity (research → generate → track workflow)

*(These are synced with memory-bank.yaml)*

---

## 6 · Critical Context Reminders
- **Target users:** startup operators, SaaS teams, VC-backed founders (medium-low tech).  
- **Design vibe:** dark grid, dev-studio chic, mobile-first responsive.  
- **Current Status:** ✅ Campaign Crafter live with AI + website analysis + mobile optimization.  
- **Phase cadence:** Phase-1 ✅ → Phase-2 ✅ → Phase-2.5 (next) → Phase-3 (weeks 2-4).  

---

## 7 · Ready for Next Session
- **Environment:** ✅ API key working, all systems operational  
- **Codebase:** ✅ Clean builds, mobile-optimized, production-ready
- **Next Priority:** LeadGen Synth tool development (AI prospect research)
- **Architecture:** ✅ Modular services ready for new tool integration  

---

## 8 · Contact
_For clarifications ping:_ **[owner-email / Slack handle / phone]**

---

> **Update this handoff.md at the end of every significant work session.**  
> If anything feels unclear, add a note here before closing your PR.
