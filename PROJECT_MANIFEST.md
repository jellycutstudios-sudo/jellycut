# Jellycut Studios — Master Project & Architecture Manifest

> **Purpose:** This document is a complete architectural, strategic, and functional blueprint of **Jellycut Studios**. It is specifically structured so that any AI model, strategist, or developer can immediately understand the business model, positioning, codebase, tech stack, UX/UI system, and growth vectors.

---

## 1. Executive Summary & Brand Identity

* **Studio Name:** Jellycut Studios
* **Website:** [https://jellycutstudio.com](https://jellycutstudio.com)
* **HQ Location:** Kerala, India (operating globally)
* **Core Geographic Markets:** United States, United Kingdom, UAE, Australia, Canada, India
* **Official Contact:** `team@jellycutstudio.com` (Zoho Mail)
* **Operational Inbound/Outbound Email:** `jellycutstudios@gmail.com`
* **Founding Team:**
  * **Salman Abu:** Technology Strategy, Product Architecture, AI Systems
  * **Anas:** Narrative & Story Direction, Visual Storytelling
  * **Thufail:** Brand Identity Systems, Visual Hierarchy, Design Craft
* **Brand Philosophy:**
  * **Async-First:** No endless Zoom meetings. Everything runs via structured 15-minute briefs, Loom video previews, and Figma links.
  * **Speed with Rigor:** Rapid creative turnarounds powered by generative AI, guided by human creative direction.
  * **No Retainer Traps:** Transparent flat-rate per project, transparent wholesale pricing for agencies.
  * **Revision & Approval Policy:** 1 comprehensive revision round included within all flat-rate packages. Iterations are approved via structured milestone sign-offs.
  * **Aesthetic Guarantee:** If after the initial milestone draft the creative direction does not align with the agreed brief, deposit is refunded before final delivery.

---

## 2. Dual Market Positioning

Jellycut Studios operates with a bifurcated business model targeting two distinct customer segments:

### A. Direct-to-Brand / Founder Track (B2C/D2C)
* **Target Audience:** D2C founders, e-commerce brands, high-growth startups.
* **Core Proposition:** High-converting, cinematic AI video ads, bold visual brand identities, and lightning-fast websites delivered without agency bloat or high agency retainers.
* **Turnaround:** Rapid 48–72 hours for creative assets (ad cuts, hook variations, brand sprints).

### B. Agency Partnerships & White-Label Track (B2B)
* **Target Audience:** Digital marketing agencies, performance ad agencies, design studios needing overflow production capacity.
* **Official B2B Message:**
  > *"More creative capacity. Zero hiring overhead. We help independent agencies deliver video campaigns, branding and digital products under their own name."*
* **Core B2B Value Pillars:**
  1. **100% White-Label & NDA Guaranteed:** Completely unbranded deliverables; raw assets; mutual NDAs signed on every engagement.
  2. **Elastic Bandwidth & Paid Pilots:** Test workflow on a single fixed-scope pilot project before committing to ongoing overflow production.
  3. **Predictable Wholesale Pricing:** Transparent flat rates per asset, giving agencies full pricing control and healthy resale margins.
  4. **Full Script-to-Screen Execution:** Angle research, hook drafting, storyboard generation, voiceover curation, and final master edits.

---

## 3. Technology Stack & Technical Infrastructure

### Frontend Architecture
* **Core Library:** React 19 (`react`, `react-dom`)
* **Build Tooling:** Vite 8 (`@vitejs/plugin-react`)
* **Styling Engine:** Tailwind CSS v4 (`@tailwindcss/vite`)
* **Animation Engine:** Framer Motion (`framer-motion`) — spring physics, custom easing `[0.16, 1, 0.3, 1]`, stagger cascades, and viewport-triggered reveals.
* **Icons:** Lucide React (`lucide-react`)
* **Typography:**
  * Display / Headlines: `@fontsource/instrument-serif` (Instrument Serif)
  * Body / Interface: `@fontsource-variable/inter-tight` (Inter Tight Variable)
  * Meta / Badges: Monospace system font stack

### Backend & Serverless API
* **Runtime:** Node.js Serverless runtime (Vercel-compatible)
* **Local Dev Server:** `server.js` (running on `http://localhost:3001`, proxied via Vite at `/api/*`)
* **Endpoints:**
  * `POST /api/chat`: Streams real-time AI responses for the on-site chat widget.
  * `POST /api/send-lead`: Ingests qualified leads from the chat or forms, sends instant admin alerts, and fires branded confirmation emails to the customer.
  * `POST /api/send-outreach`: Outbound email engine for cold prospect pitches with custom HTML templates and automatic logging.

### AI & Generative Stack
* **Conversational AI Engine:** Groq API (`@ai-sdk/groq` + `ai` SDK) running `llama-3.3-70b-versatile` with zero-latency streaming.
* **Resilience Layer:** Built-in hybrid client/server fallback agent (`api/fallbackAgent.js`) that takes over gracefully if API keys expire or rate limits hit.
* **Creative Production Suite:**
  * **Video Synthesis:** Runway Gen-3, Kling AI, Luma Dream Machine
  * **Visual Assets:** Midjourney v6, Flux.1
  * **Voice & Audio:** ElevenLabs AI voice synthesis with licensed commercial soundbeds
  * **Client-Side Video Processing:** In-browser canvas video upscaling and spatial watermark removal (`src/pages/Editor.jsx`).

### Email & Outreach Infrastructure
* **SMTP Provider:** Nodemailer connected to Google SMTP (`jellycutstudios@gmail.com`) with App Passwords.
* **Sender Mask:** `"Salman | Jellycut Studios" <jellycutstudios@gmail.com>`
* **Reply-To:** `team@jellycutstudio.com` (Zoho Mail custom domain inbox)
* **Outreach Tracking:** Local append-only log at [`outreach-log.json`](./outreach-log.json) preventing duplicate lead pitches.

---

## 4. Information Architecture & Route Sitemap

```
├── / (Home)
│   ├── Hero with dynamic video backdrop and brand squiggle
│   ├── Interactive Brand Quiz (diagnostic intake funnel)
│   ├── VibeCheck interactive widget
│   ├── Core Services Grid (Video, Brand, Websites, Web Apps)
│   ├── Comparison Table (Traditional Agency vs Jellycut)
│   ├── 3-Step Process (15-min brief -> 48-72h build -> Ship)
│   ├── Client Testimonials & Global Market trust badges
│   ├── Interactive Price Estimator
│   └── Studio FAQ Accordion
│
├── /works (Portfolio & Case Studies)
│   ├── Filterable Gallery (All, AI Video Ads, Brand Systems, Web Apps)
│   └── Deep Case Studies:
│       ├── /works/fawah-perfumes-ai-commercial
│       ├── /works/feesync-fintech-identity
│       ├── /works/asty-construction-branding
│       ├── /works/skylight-travel-website
│       ├── /works/crimson-silver-luxury-brand
│       └── /works/showaiter-plus-halwa-branding
│
├── /agencies (Agency Partnerships & White-Label Services)
│   ├── B2B Headline & Wholesale Margin positioning
│   ├── 4 Agency Pillars (White-Label, Elastic Capacity, 48-72h, Wholesale Rates)
│   ├── Separated Capabilities Matrix (Creative vs Sprints)
│   ├── Commercial Pipeline (Concept -> Script -> Storyboard -> Final Ad)
│   ├── Agency FAQ Accordion
│   └── Capabilities Deck Download Modal
│
├── /about (Studio Story & Principles)
│   ├── Origin Story ("Three friends from Kerala")
│   ├── Founders Profile (Salman, Anas, Thufail)
│   ├── Creative & AI Tech Stack breakdown
│   └── Three Guarantees (48h Turnaround, No Retainers, Aesthetic Refund)
│
├── /contact (Project Inquiry & Intake)
│   ├── Interactive 3-step service selection
│   ├── Direct WhatsApp redirect with pre-filled message generator
│   └── Direct office contacts & location pin
│
├── /blog (Creative Engineering & Insights)
│   └── Detailed case study teardowns and AI production playbooks
│
└── /editor (Online Client-Side Video Tool)
    ├── Canvas-based AI watermark removal
    └── Spatial interpolation video upscaling (480p/720p -> 1080p/4K)
```

---

## 5. UI/UX Design System & Aesthetics

* **Aesthetic Theme:** Editorial Neo-Brutalism meets Japanese/Nordic warmth.
* **Palette Tokens:**
  * `--color-paper`: `#f4f6f0` / `#fafafa` (soft organic off-white)
  * `--color-ink`: `#0f1a0d` / `#151313` (deep organic charcoal/black)
  * `--color-jelly`: `#6fd62a` (high-voltage neon lime accent)
  * `--color-jelly-deep`: `#3d8c00` / `#2d7a00` (rich forest green for readable contrast)
  * `--color-line`: `#e5e7eb` / `#d8edd0` (subtle structural divider)
* **Signature UI Components:**
  * **Glass Nav Pill:** Floating, backdrop-blurred desktop pill with route highlighting.
  * **Custom Cursor:** Interactive mouse trailer with magnetic hover feedback.
  * **Branded Squiggle Mark:** Custom SVG brand glyph representing liquid fluidity and precision cuts.
  * **Floating AI Chat Widget:** Bottom-right glass orb expanding into a dark-mode conversation panel with typewriter streaming.

---

## 6. Service Matrix & Turnaround Classifications

| Service Category | Typical Deliverables | Turnaround Time | Delivery Model |
| :--- | :--- | :--- | :--- |
| **AI Video Ads & UGC** | 9:16 vertical, 16:9, 1:1, hook test packs, voiceovers | **48–72 Hours** | Fast-Track Creative Sprint |
| **Brand Identity Systems** | Logos, color systems, typography scale, Figma kits | **3–5 Days** | Milestone Review |
| **Marketing Landing Pages** | Framer/React responsive single-pages, micro-animations | **4–7 Days** | Milestone Sprint |
| **Full-Stack Web Apps** | React/Node web applications, database, auth, APIs | **1–3 Weeks** | Agile Milestone Sprints |

---

## 7. Flagship Case Studies & Production Evidence

The studio showcases 4 verified flagship case studies answering 5 core client questions (*Problem, Role, Deliverables, Quality Checks, Outcome*):

1. **Filbey's Crunch (AI Advertising Production):**
   * **Scope:** 15s commercial (9:16, 16:9, 1:1) + 3 Hook variations + 10-frame production storyboard.
   * **AI vs Human Breakdown:** Generative AI for styleframes and fluid/crunch physics (Midjourney v6, Runway Gen-3); Human creative direction for speed ramps and framing; Human post-production for color grading, type, and phonk/foley sound mastering.
   * **Quality Verification:** Magnific & Topaz 8K neural upscaling eliminating generative artifacts.

2. **Showaiter Plus (Luxury Brand Identity):**
   * **Scope:** Bilingual brand identity, typography architecture, 6 structural packaging mockups, boutique retail vitrine design concepts, and executive brand book.
   * **Quality Verification:** Contrast validation across daylight and warm majlis ambient light, foil stamping tolerances, and bilingual Arabic/Latin legibility.

3. **Skylight Travel (Website Development):**
   * **Scope:** Responsive marketing website, dynamic holiday package catalogue, live UAE clock sync for international travellers, and zero-friction WhatsApp booking funnel.
   * **Quality Verification:** Sub-second Core Web Vitals, 100% mobile touch accessibility, cross-browser layout stability.

4. **FeeSync (Production Web Application):**
   * **Scope:** SaaS application UI/UX, multi-tenant community onboarding flow, recurring weekly/monthly billing engine, and live collection dashboard.
   * **Quality Verification:** Sub-second data table rendering, secure client checkout link UX, WCAG contrast accessibility.

---

## 8. Strategic Recommendations for Future Optimization

When auditing or refining this project, target these high-leverage areas:

1. **Interactive Video Pipeline Showcase:**
   * In case studies (e.g. Filbey commercial), visually embed the 4-step progression: **Concept Brief → Audio Script → Storyboard Grid ([`Storyboard_for_Filbey_commercial_2K_202607162313.jpeg`](./Storyboard_for_Filbey_commercial_2K_202607162313.jpeg)) → Final Master Video**.
2. **Downloadable PDF Capabilities Deck:**
   * Create an automated or static downloadable PDF one-sheeter summarizing wholesale agency rates and client samples.
3. **Outreach Lead Intelligence:**
   * Enhance `scripts/send-outreach.mjs` with automated web research on target brands before drafting personalized pitch angles.
4. **Social Proof & Metrics:**
   * Add quantifiable performance badges to case studies (e.g., *"+34% Hook Rate"*, *"3.2× ROAS"*, *"50K+ Organic Views"*).

---

*Manifest generated for Jellycut Studios — Kerala, India · Globally Shipped.*

