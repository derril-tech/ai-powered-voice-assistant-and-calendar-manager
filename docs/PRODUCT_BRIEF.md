⚠️ IMPORTANT  
This document defines the **product’s purpose, users, and goals**.  
The infrastructure plan (`INFRASTRUCTURE_PLAN.md`) must always be aligned with this brief.

## 1. Product Name
# TempoPilot™ — Voice‑First Calendar Autopilot

> **Revolutionary voice‑first productivity platform** that turns natural conversation into flawless scheduling, reminders, and meeting intelligence across Google, Outlook, and Apple Calendar.

---

## ⚡ Why TempoPilot

* **Hands‑free planning:** Speak your day, get it scheduled.
* **Proactive intelligence:** Learns your preferences and optimizes time automatically.
* **Universal sync:** Works with Google, Outlook (Graph), and CalDAV.
* **Enterprise‑grade privacy:** End‑to‑end encryption, granular data controls, SOC 2–ready.

**North‑star metric:** Time saved per user/week.
**Target:** *>3 hours/week* by month 2 of adoption.

---

## 🎤 Signature Demo (Voice Flow)

**You:** “Find 30 minutes with Sarah for a Q4 review next week.”
**TempoPilot:** “You’re both free **Tue 2:00 PM**, **Wed 10:00 AM**, or **Thu 3:00 PM**. Which works?”
**You:** “Thursday at 3.”
**TempoPilot:** “Booked. Added a 10‑minute buffer, Zoom link, and prep checklist. Want me to notify Sarah?”

---

## 🧠 Core Capabilities

* **Natural Language Scheduling** — free‑form commands, contextual follow‑ups, and entity extraction (people, time, location).
* **Conflict Resolution** — detects clashes, offers alternatives, respects meeting priorities & working hours.
* **Proactive Suggestions** — commute buffers, focus blocks, recovery after cancellations, meeting load balancing.
* **Meeting Intelligence** — real‑time notes, action items, summaries, and automatic follow‑up tasks.
* **Smart Reminders** — urgency & priority‑aware nudges via push, email, SMS.
* **Personalization** — learns preferred slots, durations, travel patterns, collaborators.

---

## 🏗️ Reference Architecture

**Frontend**: Next.js 14 (App Router) • React 18 • TypeScript • Tailwind • Radix UI • Framer Motion • Zustand + TanStack Query • Web Speech API • Socket.IO client • date‑fns.
**Backend**: FastAPI (async) • Python 3.11 • SQLAlchemy 2.0 • PostgreSQL 15 + **pgvector** • Redis (cache/sessions) • Celery (background) • Alembic (migrations) • Socket.IO server.
**AI & Voice**: OpenAI Whisper (fallback STT) • Web Speech API (browser STT) • **GPT‑4** (reasoning & summarization) • **Claude** (tone, long‑context, preference alignment) • LangChain (orchestration).
**Calendar**: Google Calendar v3 • Microsoft Graph • CalDAV (Apple).
**TTS**: ElevenLabs for natural voice replies.
**Deploy**: Vercel (edge UI) • Render (autoscaling API) • Neon/Render Postgres • Vercel Edge Network.

---

## 🔀 Model Routing Logic (GPT‑4 ↔ Claude)

* **GPT‑4:** scheduling logic, constraints, subject lines for invites, action extraction, short summaries.
* **Claude:** long‑context preference modeling, tone/voice consistency, multi‑turn reasoning across week‑long plans.
* **Controls:** temperature 0.2–0.6 for deterministic ops; up to 0.9 for creative summaries.
* **Token budget:** soft cap 2k tokens/op; streaming responses for UX.

---

## 🔒 Security & Compliance

* **Auth:** JWT (15‑min access, 7‑day refresh) + device binding.
* **Encryption:** AES‑256 at rest, TLS 1.3 in transit.
* **Least‑privilege scopes:** per‑calendar & per‑contact.
* **Privacy:** data residency options (US/EU), admin‑level retention policies, auto‑redaction of PII in logs.
* **Compliance posture:** GDPR/CCPA; SOC 2 controls; audit trails on admin actions.

---

## 📊 Reliability & SLOs

* **API P95 < 200 ms**, **voice round‑trip < 2 s**.
* **Uptime 99.9%** with regional failover (stateless API + Redis replica).
* **Back‑pressure** with job queues; STT/LLM fallbacks and circuit breakers.

---

## 🖥️ Product Surface (Key Screens)

1. **Voice Console** — live waveform, confidence meter, transcript, quick actions.
2. **Calendar** — month/week/day/agenda, voice navigation, drag‑drop blocks.
3. **Event Composer** — voice‑first creation, attendees, location, conferencing, buffers.
4. **Assistant Chat** — context‑aware conversation, summaries, and commands.
5. **Insights** — meeting load, focus/fragmentation, suggested optimizations.
6. **Settings** — accounts, privacy, model preferences, quiet hours, voice persona.

---

## 📈 Value Metrics (Live)

* **Voice command success rate** (goal >90%).
* **Scheduling cycle time** (goal <30 s from command to invite).
* **Time saved/week** (derived from automated actions).
* **Meeting quality index** (attendee acceptance + duration fit + action completion).

---

## 🚀 Launch Plan

* **Beta (Weeks 0–6):** Google Calendar only; Whisper fallback; summaries + invites.
* **GA (Weeks 7–12):** Outlook + CalDAV; focus blocks; proactive suggestions.
* **Enterprise (Weeks 13–18):** SSO/SAML, DLP, admin console, data residency.

---

## 🧩 Integration Highlights

* **Conferencing:** Google Meet / Zoom / Teams auto‑links.
* **Notifications:** Web push, email, SMS.
* **Storage:** Secure voice snippet storage with opt‑out; ephemeral by default.

---

## 🧪 QA & Testing

* **Unit/Integration/E2E >90%** coverage.
* **Voice Accuracy Harness:** synthetic & real utterance suites per locale.
* **Canary cohorts** + feature flags; replay of anonymized command traces.

---

## 🧭 Differentiators

* **Voice‑first UX** (not voice‑optional).
* **Proactive calendar optimization** (buffers, load balancing, recovery).
* **Transparent privacy controls** (on‑device first, ephemeral by default).
* **Dual‑LLM orchestration** with deterministic guardrails.

---

## 📝 Claude‑Ready Prompts (for build automation)

**Prompt 1 — Project Setup & Architecture**
Create a voice‑first architecture using Next.js 14 (TS), Tailwind, Radix UI, Framer Motion; FastAPI (async) + SQLAlchemy 2.0; Postgres + pgvector; Redis; Socket.IO; Web Speech API; Whisper fallback; Vercel + Render deploy with environment variables and IaC snippets.

**Prompt 2 — Voice Processing Backend**
Implement STT endpoints (Whisper), intent/entity extraction, GPT‑4/Claude orchestration with LangChain, context store, token/temperature policy, calendar provider abstractions (Google/Graph/CalDAV), encryption at rest, audit logging, and WebSocket streaming.

**Prompt 3 — Voice‑First Frontend**
Build Voice Console, Calendar views, Event Composer, Assistant Chat, Settings, and Insights. Include real‑time transcripts, confidence UI, skeleton loaders, keyboard/ARIA support, and micro‑interactions.

**Prompt 4 — AI Voice Integration**
Wire real‑time STT, intent routing, context memory, meeting summaries, TTS via ElevenLabs, preference learning, proactive suggestions, and retry/fallback strategies.

**Prompt 5 — Deployment & Ops**
Edge‑optimized Vercel config, Render autoscaling, health checks, SLO monitors, error budgets, redaction middleware, canary releases, OpenAPI 3.0 docs, and runbooks for STT/LLM failures.

---

## 📣 Taglines & Alt Names

* **Alt names:** VoxTempo, Chrona, EchoDay, AuraCal, NovaAgenda.
* **Taglines:** “Plan your day at the speed of voice.” • “Your calendar, on autopilot.” • “Speak. Schedule. Succeed.”

---

### Legal & Privacy Note

By default, TempoPilot processes voice on‑device when possible and minimizes retention. Admins can set retention windows, regional storage, and strict scope controls.
