/* eslint-disable react-refresh/only-export-components */
/**
 * homeData.js — All static content data for the Home page.
 * Separated from Home.jsx for maintainability.
 */

// ─── Animated Icons ──────────────────────────────────────────────────────────
// These are imported lazily by Home.jsx via homeData to keep the icons
// co-located with the service/step data that uses them.
import { motion } from 'framer-motion';

function AnimatedVideoIcon() {
  return (
    <motion.svg width="20" height="20" viewBox="-1.5 -1.5 27 27" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <motion.rect width="14" height="12" x="2" y="6" rx="2" ry="2"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.5, ease: 'easeInOut' } } }} />
      <motion.path d="m22 8-6 4 6 4V8Z"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.4, delay: 0.2, ease: 'easeInOut' } } }} />
    </motion.svg>
  );
}

function AnimatedPaletteIcon() {
  return (
    <motion.svg width="20" height="20" viewBox="-1.5 -1.5 27 27" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.43-.16-.83-.41-1.16a.81.81 0 0 1-.16-.5c0-.44.36-.8 1.8-.8h2.14c4.42 0 8-3.58 8-8 0-5.5-4.5-10-10-10Z"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.6, ease: 'easeInOut' } } }} />
      <motion.circle cx="13.5" cy="6.5" r=".5" fill="currentColor"
        variants={{ normal: { scale: 1, opacity: 1 }, hover: { scale: [0, 1.2, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.2 } } }} />
      <motion.circle cx="17.5" cy="10.5" r=".5" fill="currentColor"
        variants={{ normal: { scale: 1, opacity: 1 }, hover: { scale: [0, 1.2, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.3 } } }} />
      <motion.circle cx="17.5" cy="14.5" r=".5" fill="currentColor"
        variants={{ normal: { scale: 1, opacity: 1 }, hover: { scale: [0, 1.2, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.4 } } }} />
      <motion.circle cx="13.5" cy="18.5" r=".5" fill="currentColor"
        variants={{ normal: { scale: 1, opacity: 1 }, hover: { scale: [0, 1.2, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.5 } } }} />
    </motion.svg>
  );
}

function AnimatedCodeIcon() {
  return (
    <motion.svg width="20" height="20" viewBox="-1.5 -1.5 27 27" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="m16 18 6-6-6-6"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.5, ease: 'easeInOut' } } }} />
      <motion.path d="m8 6-6 6 6 6"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.5, delay: 0.1, ease: 'easeInOut' } } }} />
    </motion.svg>
  );
}

function AnimatedGlobeIcon() {
  return (
    <motion.svg width="20" height="20" viewBox="-1.5 -1.5 27 27" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <motion.circle cx="12" cy="12" r="10"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.7, ease: 'easeInOut' } } }} />
      <motion.path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.5, delay: 0.15, ease: 'easeInOut' } } }} />
      <motion.path d="M2 12h20"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.4, ease: 'easeInOut' } } }} />
    </motion.svg>
  );
}

function AnimatedFileTextIcon() {
  return (
    <motion.svg width="24" height="24" viewBox="-1.5 -1.5 27 27" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.6, ease: 'easeInOut' } } }} />
      <motion.path d="M14 2v4a2 2 0 0 0 2 2h4"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.4, delay: 0.2, ease: 'easeInOut' } } }} />
      <motion.path d="M10 9H8" variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.4 } } }} />
      <motion.path d="M16 13H8" variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.5 } } }} />
      <motion.path d="M16 17H8" variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.6 } } }} />
    </motion.svg>
  );
}

function AnimatedZapIcon() {
  return (
    <motion.svg width="24" height="24" viewBox="-1.5 -1.5 27 27" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M13 2 L3 14h9l-1 8 10-12h-9l1-8Z"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.6, ease: 'easeInOut' } } }} />
    </motion.svg>
  );
}

function AnimatedStarIcon() {
  return (
    <motion.svg width="24" height="24" viewBox="-1.5 -1.5 27 27" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <motion.polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        variants={{ normal: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.7, ease: 'easeInOut' } } }} />
    </motion.svg>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
export const services = [
  { id: '01', icon: AnimatedVideoIcon,   title: 'AI Video Ads',     description: 'Scroll-stopping ad creative for Meta, TikTok, YouTube, and LinkedIn — produced with AI and refined by real creative direction.', cta: 'See Ad Samples', path: '/works' },
  { id: '02', icon: AnimatedPaletteIcon, title: 'Brand Identity',   description: 'Logo, colour system, typography, and brand guidelines built for a digital-first world. Built to last and scale.',                   cta: 'View Brand Work', path: '/works' },
  { id: '03', icon: AnimatedCodeIcon,    title: 'Vibe-Coded Apps',  description: 'Fast, beautiful web apps and interactive experiences — built with AI-assisted coding that ships in weeks, not months.',                 cta: 'View App Builds', path: '/works' },
  { id: '04', icon: AnimatedGlobeIcon,   title: 'Website Design',   description: 'Cinematic, conversion-optimised websites that make your first impression your best impression. Always.',                                 cta: 'See Site Examples', path: '/works' },
];

// ─── Process Steps ───────────────────────────────────────────────────────────
export const steps = [
  { num: '01', icon: AnimatedFileTextIcon, title: 'Brief in 15 minutes',   description: 'Fill a short intake form. Tell us your brand, goal, and any references. No calls required to get started.' },
  { num: '02', icon: AnimatedZapIcon,      title: 'We build in 48–72h',    description: 'Our AI-assisted studio produces your first draft. You review it async on a shared preview link — no scheduling needed.' },
  { num: '03', icon: AnimatedStarIcon,     title: 'Revise, approve, ship', description: 'One revision round included. Final files delivered in every format you need, ready to publish immediately.' },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const faqs = [
  { q: 'How fast do you deliver projects?',           a: 'Most projects ship within 48–72 hours of receiving your creative brief. AI video ads and brand identity projects have a 48-hour first-draft turnaround, with one revision round included. Web apps are scoped individually but ship in weeks, not months.' },
  { q: 'Do I need to get on a call to start?',        a: 'Never. You fill a 15-minute intake form, we produce your first draft, and you review it on a shared preview link. All async. No scheduling. No calls — unless you specifically want one.' },
  { q: 'Do you work with clients outside India?',     a: 'Yes — we actively work with brands in the US, UK, UAE, Australia, and Canada alongside our Indian clients. We have shipped campaigns for fragrance brands, D2C e-commerce, SaaS startups, and medical platforms across these markets. Our studio is fully async-first — no calls required, and we cover all major time zones through structured async updates. Geography is never a blocker.' },
  { q: 'What platforms are your video ads optimised for?', a: 'We produce for Meta (Facebook & Instagram Reels), TikTok, YouTube, and LinkedIn. Every project is delivered in all required aspect ratios — 9:16 vertical, 16:9 landscape, and 1:1 square — ready to publish immediately.' },
  { q: 'What is vibe-coding?',                        a: 'Vibe-coding is AI-assisted software development where large language models handle repetitive code, letting human designers focus on creative decisions and user experience. We use it to ship beautiful web apps in weeks instead of months.' },
  { q: 'How is Jellycut different from a traditional agency?', a: 'Traditional agencies take 2–6 weeks, charge $5k+ retainers, and require multiple calls. Jellycut delivers in 48–72 hours, charges per project with no retainer traps, and works fully async. Same cinematic quality — none of the bloat.' },
  { q: 'How much does a project cost?',               a: 'We offer per-project pricing — no monthly retainers. AI video ads and brand identity packages start at a fraction of traditional agency rates because AI production removes overhead without sacrificing quality. Contact us for a custom quote.' },
  { q: 'Can I see work samples before committing?',   a: 'Absolutely. Our full portfolio — video ads, brand identity case studies, and app builds — is available on the Works page, no sign-up required.' },
];

// ─── Comparison Table ─────────────────────────────────────────────────────────
export const comparisonRows = [
  { label: 'Delivery time',        agency: '2–6 weeks',         jellycut: '48–72 hours' },
  { label: 'Pricing model',        agency: '$5k+/mo retainer',  jellycut: 'Per-project, no lock-in' },
  { label: 'Calls required',       agency: 'Yes — many',        jellycut: 'Never' },
  { label: 'AI-enhanced quality',  agency: 'Rarely',            jellycut: 'Always' },
  { label: 'Revision cost',        agency: 'Extra charge',      jellycut: '1 round included' },
  { label: 'Timezone flexibility', agency: 'Fixed hours',       jellycut: 'Async across all zones' },
  { label: 'Onboarding time',      agency: '1–2 weeks',         jellycut: '15-min brief form' },
];
