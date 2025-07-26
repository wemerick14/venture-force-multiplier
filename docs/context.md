# VentureForceMultiplier.ai — Project Context (No Tables)

## Project Overview

VentureForceMultiplier.ai is a **pseudonymous AI‑automation studio** that showcases modular, production‑ready tools (LeadGen Synth, Campaign Crafter, etc.) while doubling as a lightweight consulting front‑end. It is built with **React (Vite) + Tailwind CSS**, will integrate **Gemini Flash / Claude APIs** for logic, and store persistent data in **Supabase**. The immediate focus is a clean MVP website that can scale into a full tool marketplace and private client portal.

---

## Core Purpose & Goals

* **Primary goal:** Launch an MVP site that visitors can use today (Homepage, Tools index, Campaign Crafter skeleton).
* **Value proposition:** *“Deploying workflows. Multiplying outcomes.”* Deliver AI tools that make teams 10× more effective without hiring developers.
* **Target outcomes:**

  * Interactive demos prove immediate value.
  * Visitors convert to leads via contact form or audit request.
  * Architecture remains modular so new tools and monetization can be added rapidly.

---

## Target Audience

* **Primary:** Startup founders, SaaS operators, RevOps / Growth teams.
* **Secondary:** VCs, recruiters, tech‑savvy students.
* **Technical level:** Medium‑to‑low—users care more about business value than code; the UI must be intuitive.

---

## Tools & Capabilities to Demo (Road‑mapped)

1. Campaign Crafter *(MVP #1)*
2. LeadGen Synth
3. Meeting Brief Copilot
4. Pain Point Scanner
5. Process Automator
6. AI Feasibility Checker

---

## Website Feature Requirements

* Interactive demos (input → real‑time output) — **phase 1**
* Contact CTA (email + optional phone) — **phase 1**
* Usage analytics & basic logging via Supabase — **phase 2**
* Optional Google OAuth / email gating — **phase 2**
* Case‑study or blog section — **phase 3**
* Stripe‑powered pricing page — **phase 3**

---

## Content & Branding

* **Professional background:** Baylor University student (Finance, Marketing, Data Analytics, 4.0 GPA); BD/automation work at SAS; co‑founder of SummerSafe.
* **Expertise areas:** AI‑workflow design, strategic automation, venture‑grade business strategy, Power Platform & n8n.
* **Existing branding style:** Dark theme, subtle grid background, bold sans‑serif typography, minimalistic “dev‑studio” aesthetic.
* **Key examples to highlight:** SAS onboarding automations; political bio generator; storage‑logistics startup tooling; Power Automate flows.

---

## Technical Requirements

* **Frontend:** React (Vite) with Tailwind CSS.
* **Backend / logic:** Gemini Flash API (initial) plus Claude.
* **Data store:** Supabase (PostgreSQL).
* **Auth (later):** Google OAuth via Supabase Auth.
* **Hosting:** Netlify (CI/CD from GitHub).
* **Deployment pipeline:** GitHub → Netlify preview → production.
* **Timeline:**

  * MVP front‑end by **July 27 2025**.
  * Campaign Crafter logic and Supabase logging within **7 days** after MVP.
  * Monetization portal within **3 weeks** after MVP.

---

## Additional Context

* **Memory & handoff workflow:** Each coding sprint loads only `handoff.md` and `memory‑bank.yaml` to minimize Claude Pro tokens. Deeper docs (`context.md`, `implementation‑plan.md`) are referenced only when scope shifts.
* **Modularity mandate:** Every new tool lives in its own React route/component and shares a common `ToolShell` wrapper for consistent UX.
* **Design inspiration:** Linear.app UI crispness; Vercel dark gradient headers; small animated input/output cards inspired by Perplexity Labs.
* **Long‑term vision:** Transition from free demos to tiered SaaS (credits per tool) while offering custom integration consulting.

---

Created: 2025‑07‑26
Last Updated: 2025‑07‑26
