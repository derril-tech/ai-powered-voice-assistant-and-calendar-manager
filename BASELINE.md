# BASELINE REPO CHECKLIST (Claude-Ready, Production Hygiene)

> This file lives in the **repo root** (not inside `docs/`).  
> Purpose: enforce a minimum professional baseline for any app so that developers and Claude Code can collaborate safely.  
> Complete all sections before feature work.  

---

## 1) Structure & Workspaces
- [x] Monorepo layout: `apps/frontend/`, `apps/backend/`, `packages/*`
- [x] `package.json` (root) with workspaces or `pnpm-workspace.yaml`
- [x] `docs/` created (`REPO_MAP.md`, `API_SPEC.md`, `CLAUDE.md`, `PROMPT_DECLARATION.md`)
- [x] Folder-level `_INSTRUCTIONS.md` + TODO markers for Claude edit surfaces

**Reference tree**
.
├─ apps/{frontend,backend}/
├─ packages/{types,ui}?/
├─ docs/
├─ scripts/
└─ .github/workflows/ci.yml


---

## 2) Dev Environment (Reproducible)
- [x] `.editorconfig`, `.gitattributes`, `.gitignore`
- [x] Node version pinned (`.nvmrc` or `.tool-versions`)
- [x] `.devcontainer/devcontainer.json` boots & runs dev script
- [x] Containers: `Dockerfile`(s) + `docker-compose.yml` (web, api, db)

---

## 3) Docs & Onboarding
- [x] `README.md` (project intro, quick start, common commands)
- [x] `apps/frontend/README_FRONTEND.md` with run/test/build instructions
- [x] `apps/backend/README_BACKEND.md` with run/test/build instructions
- [x] `docs/REPO_MAP.md` explains folder roles + ownership (CODEOWNERS-like)

---

## 4) Contracts & Types
- [x] `packages/types/` hosts shared DTOs & schemas (e.g., Zod/JSON Schema)
- [x] `apps/backend/openapi.yaml` (or auto-generated) checked into VCS
- [x] Mock API or fixtures available (`pnpm mock:api`)

---

## 5) Security, Secrets, Compliance
- [x] `.env.example` (root + per app) — no secrets in VCS
- [x] `scripts/check-env.ts` fails fast when vars are missing
- [ ] Basic threat model & PII handling table in `CLAUDE.md` (logging redaction)
- [x] AuthN/AuthZ model documented in `API_SPEC.md`

---

## 6) Testing & Quality Gates
- [x] Unit tests (Vitest/Jest) for FE & BE: `pnpm test` green
- [x] Optional E2E (Playwright) happy path(s)
- [x] TypeScript strict mode enabled; `pnpm typecheck` green
- [x] Linting & formatting configured (ESLint + Prettier or Biome)
- [x] Pre-commit hooks: Husky + lint-staged

---

## 7) CI/CD (Fail-Fast)
- [x] `.github/workflows/ci.yml` runs: install → typecheck → lint → test → build
- [x] Performance budgets enforced (bundlesize or Lighthouse CI) with thresholds
- [x] Artifact/build caching enabled (e.g., `actions/setup-node` + pnpm cache)
- [x] CI fails on missing env, schema drift, or contract violations

---

## 8) Design System & UX Baseline
- [x] Design tokens centralised (colors, spacing, radii, typography)
- [x] Tokens imported (no hard-coded hex/px in components)
- [x] Accessibility: focus states, aria labels, color contrast noted in docs

---

## 9) Scripts (DX)
- [x] `scripts/dev.sh` runs FE + BE together (single command)
- [x] `pnpm` scripts: `dev`, `build`, `test`, `lint`, `typecheck`, `mock:api`
- [x] Optional: `verify-budgets.ts` for bundle/API p95 checks

---

## 10) Claude Ergonomics (Critical)
- [x] `docs/CLAUDE.md` includes:
  - [x] **Edit boundaries**: editable vs do-not-touch paths
  - [x] **Patch protocol**: reply with `diff --git` blocks + brief commit msg
  - [x] **START/END guardrails** inside editable files
  - [x] **Failure-mode playbook** (schema mismatch, failing tests, missing envs)
- [x] `docs/PROMPT_DECLARATION.md`:
  - [x] FE/BE boundaries & data contracts
  - [x] UX guidance (states, accessibility, interactions)
  - [x] Security & performance budgets (measurable)
  - [x] Response schema example (diff-only, no prose) + ideal sample

---

## 11) Alignment Sanity Check
- [x] Screen ↔ Endpoint ↔ DTO matrix complete
- [x] No unused/conflicting libs; lockfile committed
- [x] Navigation/pages reflect product flows; MVP endpoints cover needs

---

### ✅ Ready Gate
All boxes above are checked, CI is green, `docker compose up` + `pnpm dev` run the stack end-to-end, and Claude has clear, surgical edit surfaces.

---

## 🚨 CRITICAL INFRASTRUCTURE ALIGNMENT ISSUES

**The infrastructure is technically complete but MISALIGNED with the product vision.**

### Product: TempoPilot™ — Voice-First Calendar Autopilot
### Current Infrastructure: Basic voice assistant scaffold

**Gap Analysis:**
- **Infrastructure Completeness**: 20% (basic scaffold only)
- **Product Feature Coverage**: 15% (missing core features)
- **Calendar Integration**: 0% (not implemented)
- **AI Orchestration**: 10% (basic setup only)
- **Enterprise Features**: 0% (not implemented)

### Missing Core Features:
1. **Voice Console** — live waveform, confidence meter, transcript, quick actions
2. **Event Composer** — voice-first creation, attendees, location, conferencing, buffers
3. **Assistant Chat** — context-aware conversation, summaries, and commands
4. **Insights** — meeting load, focus/fragmentation, suggested optimizations
5. **Settings** — accounts, privacy, model preferences, quiet hours, voice persona

### Missing Backend Services:
1. **Calendar Provider Abstractions** — Google Calendar v3, Microsoft Graph, CalDAV
2. **Dual-LLM Orchestration** — GPT-4 + Claude routing logic
3. **Voice Processing Pipeline** — Whisper fallback, TTS via ElevenLabs
4. **Meeting Intelligence** — real-time notes, action items, summaries
5. **Proactive Suggestions** — commute buffers, focus blocks, recovery

### Next Steps:
1. **Add missing dependencies** (pgvector, elevenlabs, calendar integrations)
2. **Create missing database models** (meeting intelligence, user preferences)
3. **Build core frontend components** (Voice Console, Event Composer, etc.)
4. **Implement calendar sync services** (Google, Outlook, CalDAV)
5. **Add dual-LLM orchestration** (GPT-4 + Claude routing)

**Recommendation**: The infrastructure needs significant expansion to support the TempoPilot™ product vision. We should prioritize the core voice processing and calendar integration features first.
