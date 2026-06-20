import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Video, Palette, Code, Globe, ArrowRight, CheckCircle, FileText, Zap, Star, ExternalLink, ChevronDown, X } from 'lucide-react';
import { projects } from './Works';

const ease = [0.16, 1, 0.3, 1];

// ─── Services data ─────────────────────────────────────────────────────────
const services = [
  {
    id: '01',
    icon: Video,
    title: 'AI Video Ads',
    description:
      'Scroll-stopping ad creative for Meta, TikTok, YouTube, and LinkedIn — produced with AI and refined by real creative direction.',
    cta: 'See Ad Samples',
    path: '/works'
  },
  {
    id: '02',
    icon: Palette,
    title: 'Brand Identity',
    description:
      'Logo, colour system, typography, and brand guidelines built for a digital-first world. Built to last and scale.',
    cta: 'View Brand Work',
    path: '/works'
  },
  {
    id: '03',
    icon: Code,
    title: 'Vibe-Coded Apps',
    description:
      'Fast, beautiful web apps and interactive experiences — built with AI-assisted coding that ships in weeks, not months.',
    cta: 'View App Builds',
    path: '/works'
  },
  {
    id: '04',
    icon: Globe,
    title: 'Website Design',
    description:
      'Cinematic, conversion-optimised websites that make your first impression your best impression. Always.',
    cta: 'See Site Examples',
    path: '/works'
  },
];

// ─── FAQ data ──────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'How fast do you deliver projects?',
    a: 'Most projects ship within 48–72 hours of receiving your creative brief. AI video ads and brand identity projects have a 48-hour first-draft turnaround, with one revision round included. Web apps are scoped individually but ship in weeks, not months.',
  },
  {
    q: 'Do I need to get on a call to start?',
    a: 'Never. You fill a 15-minute intake form, we produce your first draft, and you review it on a shared preview link. All async. No scheduling. No calls — unless you specifically want one.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes — most of our clients are in the US, UK, Australia, and Canada. We are a fully async-first studio built for remote collaboration across time zones. We cover US and UK working hours through async updates.',
  },
  {
    q: 'What platforms are your video ads optimised for?',
    a: 'We produce for Meta (Facebook & Instagram Reels), TikTok, YouTube, and LinkedIn. Every project is delivered in all required aspect ratios — 9:16 vertical, 16:9 landscape, and 1:1 square — ready to publish immediately.',
  },
  {
    q: 'What is vibe-coding?',
    a: 'Vibe-coding is AI-assisted software development where large language models handle repetitive code, letting human designers focus on creative decisions and user experience. We use it to ship beautiful web apps in weeks instead of months.',
  },
  {
    q: 'How is Jellycut different from a traditional agency?',
    a: 'Traditional agencies take 2–6 weeks, charge $5k+ retainers, and require multiple calls. Jellycut delivers in 48–72 hours, charges per project with no retainer traps, and works fully async. Same cinematic quality — none of the bloat.',
  },
  {
    q: 'How much does a project cost?',
    a: 'We offer per-project pricing — no monthly retainers. AI video ads and brand identity packages start at a fraction of traditional agency rates because AI production removes overhead without sacrificing quality. Contact us for a custom quote.',
  },
  {
    q: 'Can I see work samples before committing?',
    a: 'Absolutely. Our full portfolio — video ads, brand identity case studies, and app builds — is available on the Works page, no sign-up required.',
  },
];

// ─── Comparison table data ─────────────────────────────────────────────────
const comparisonRows = [
  { label: 'Delivery time',         agency: '2–6 weeks',          jellycut: '48–72 hours' },
  { label: 'Pricing model',         agency: '$5k+/mo retainer',   jellycut: 'Per-project, no lock-in' },
  { label: 'Calls required',        agency: 'Yes — many',         jellycut: 'Never' },
  { label: 'AI-enhanced quality',   agency: 'Rarely',             jellycut: 'Always' },
  { label: 'Revision cost',         agency: 'Extra charge',       jellycut: '1 round included' },
  { label: 'Timezone flexibility',  agency: 'Fixed hours',        jellycut: 'Async across all zones' },
  { label: 'Onboarding time',       agency: '1–2 weeks',          jellycut: '15-min brief form' },
];

// ─── Process steps data ────────────────────────────────────────────────────
const steps = [
  {
    num: '01',
    icon: FileText,
    title: 'Brief in 15 minutes',
    description:
      'Fill a short intake form. Tell us your brand, goal, and any references. No calls required to get started.',
  },
  {
    num: '02',
    icon: Zap,
    title: 'We build in 48–72h',
    description:
      'Our AI-assisted studio produces your first draft. You review it async on a shared preview link — no scheduling needed.',
  },
  {
    num: '03',
    icon: Star,
    title: 'Revise, approve, ship',
    description:
      'One revision round included. Final files delivered in every format you need, ready to publish immediately.',
  },
];

export default function Home({ setIsModalOpen, setRoute, isMobile }) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = prefersReducedMotion || isMobile;

  // Dynamic animation variants based on device capabilities and preferences
  const getFadeInScale = () => ({
    hidden: { opacity: 0, scale: shouldReduce ? 1 : 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: shouldReduce ? 0.4 : 1.5, ease } },
  });

  const getSlideUpHeroCard = () => ({
    hidden: { y: shouldReduce ? 20 : 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: shouldReduce ? 0.4 : 1.2, delay: shouldReduce ? 0.1 : 0.4, ease } },
  });

  const getRevealSection = () => ({
    hidden: { opacity: 0, y: shouldReduce ? 10 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.3 : 0.8, ease } },
  });

  const getContainerStagger = () => ({
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0.04 : 0.12 } },
  });

  const getCardItem = () => ({
    hidden: { opacity: 0, y: shouldReduce ? 8 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.25 : 0.7, ease } },
  });

  const getStepItem = () => ({
    hidden: { opacity: 0, y: shouldReduce ? 8 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.2 : 0.6, ease } },
  });

  return (
    <div className="w-full">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[640px] sm:min-h-[720px] flex flex-col justify-end overflow-hidden bg-[#100f0f]">
        
        {/* Background Video */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          variants={getFadeInScale()}
          initial="hidden"
          animate="visible"
        >
          <video
            src="/hero.mp4"
            poster="/hero_poster.avif"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </motion.div>

        {/* Lower-Left Glass Hero Card */}
        <div className="relative z-20 w-full px-6 md:px-12 hero-bottom-padding flex justify-start">
          <motion.div
            className="glass-effect rounded-[24px] p-5 sm:p-8 md:p-10 border border-white/20 max-w-xl text-white shadow-custom"
            variants={getSlideUpHeroCard()}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-[1.08] mb-4 tracking-tight">
              We make brands impossible to scroll&nbsp;past.
            </h1>
            <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 font-sans font-light max-w-md">
              Jellycut is a creative AI studio from Kerala — building cinematic video ads, bold brand identities, and vibe-coded apps for founders and brands ready to&nbsp;grow.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-2 text-white font-semibold text-xs sm:text-sm tracking-wide font-sans hover:text-jelly transition-colors cursor-pointer"
            >
              <span>Start Your First Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. WORK / SKY-GARDEN VIDEO PANEL ─────────────────────────────── */}
      <section id="work" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto">
          {/* Intro headline */}
          <motion.div
            className="max-w-3xl mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={getRevealSection()}
          >
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              The Creative Stack
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1] font-normal tracking-tight">
              From brief to brand-ready in days, not months.
            </h2>
          </motion.div>

          {/* Large Rounded Video Frame */}
          <motion.div
            className="skyArt w-full h-[60vh] sm:h-[68vh] min-h-[480px] sm:min-h-[560px] rounded-[24px] md:rounded-[40px] shadow-custom flex flex-col justify-between p-5 md:p-12 text-white relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={getRevealSection()}
          >
            {/* YouTube background — Starbucks AI Ad */}
            <div className="skyVideo" style={{ pointerEvents: 'none' }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/TLmlYZSDTMw?autoplay=1&mute=1&loop=1&playlist=TLmlYZSDTMw&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
                allow="autoplay; encrypted-media"
                allowFullScreen={false}
                title="Jellycut Studios — Starbucks AI Ad Background"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100vw',
                  height: '56.25vw',
                  minHeight: '100%',
                  minWidth: '177.77vh',
                  transform: 'translate(-50%, -50%) scale(1.15)',
                  border: 'none',
                  pointerEvents: 'none',
                }}
              />
            </div>

            <div className="absolute inset-0 bg-[#0f3d08]/25 mix-blend-multiply z-5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2806]/55 via-transparent to-black/15 z-5 pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              {/* Floating status card + Explore button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                <motion.div
                  className="glass-effect rounded-2xl p-4 sm:p-5 border border-white/20 max-w-[270px] sm:max-w-sm flex items-start gap-3 sm:gap-4 shadow-lg"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease }}
                >
                  <div className="bg-jelly/20 p-2.5 rounded-xl text-jelly">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider text-white/50 uppercase font-mono">
                      Project Pipeline // Active
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">AI Ad Delivered — 48h</div>
                    <p className="text-xs text-white/80 mt-1 font-light leading-snug">
                      Creative brief compiled. Final video rendered and exported across all formats.
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-mono text-jelly">
                      <span className="h-1.5 w-1.5 bg-jelly rounded-full animate-pulse" />
                      Delivered in 2 days
                    </div>
                  </div>
                </motion.div>

                {/* Explore Portfolio button */}
                <motion.button
                  onClick={() => setRoute('/works')}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8, ease }}
                  className="glass-effect rounded-full px-5 py-2.5 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-semibold text-[10px] sm:text-xs tracking-wider uppercase font-mono transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-[0.98] cursor-pointer self-start sm:self-center"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Panel copy */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end mt-6 md:mt-12">
                <div className="md:col-span-7">
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-normal leading-tight tracking-tight max-w-xl">
                    We combine AI production with real creative direction — so your ads look like they cost 10× what you paid.
                  </p>
                </div>
                <div className="md:col-span-5 md:text-right">
                  <p className="text-xs md:text-sm text-white/80 max-w-xs md:ml-auto font-light leading-relaxed font-sans">
                    We work async across time zones, deliver in 48–72 hours, and communicate in plain English. No agency bloat. No retainer traps.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. MANIFESTO ─────────────────────────────────────────────────── */}
      <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Left — image */}
            <motion.div
              className="md:col-span-5 flex justify-center items-center order-last md:order-first"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={getRevealSection()}
            >
              <div className="relative group max-w-[320px] md:max-w-full">
              <img
                  src="/jelly.avif"
                  alt="Jellycut Studios mascot — bold, creative, AI-powered"
                  className="max-h-[380px] md:max-h-[460px] object-contain opacity-95 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Right — copy */}
            <motion.div
              className="md:col-span-7 flex flex-col justify-center text-left order-first md:order-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={getRevealSection()}
            >
              <span className="text-muted text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
                Why We Exist
              </span>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-normal leading-tight mb-8 tracking-tight max-w-2xl">
                Cinema-grade creative, shipped at the speed of culture.
              </h3>
              <div className="space-y-6 text-muted text-sm md:text-base font-light leading-relaxed max-w-xl">
                <p>
                  We believe every ambitious brand deserves cinematic-quality creative — not just the ones who can afford a 20-person agency on retainer.
                </p>
                <p>
                  Jellycut was built in Kerala with one idea: use AI to compress the gap between a great brief and a stunning result. Fast, affordable, and genuinely excellent.
                </p>
              </div>

              {/* Studio signature */}
              <div className="mt-10 border-t border-line pt-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-jelly animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                  Jellycut Studios — Kerala, India
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LATEST PROJECTS ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
            <div className="max-w-xl">
              <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
                Recent Work
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-ink font-normal tracking-tight leading-tight">
                Latest Projects // Proof in the pixels.
              </h2>
            </div>
            <button
              onClick={() => setRoute('/works')}
              className="group inline-flex items-center gap-1.5 bg-ink hover:bg-ink/90 text-white text-xs font-bold px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={getContainerStagger()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {projects.slice(0, 3).map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  variants={getCardItem()}
                  onClick={() => setRoute(`/works?project=${project.id}`)}
                  className="group bg-white rounded-3xl overflow-hidden border border-line flex flex-col justify-between cursor-pointer hover:shadow-xl hover:border-jelly-mid/40 transition-all duration-500 h-[420px]"
                >
                  {/* Top image/pattern container */}
                  <div className={`h-60 w-full bg-gradient-to-br ${project.color} relative p-6 flex flex-col justify-between overflow-hidden`}>
                    {/* Project Thumbnail Image */}
                    {project.image && (
                      <>
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors duration-500 z-0" />
                      </>
                    )}

                    {/* Background Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    
                    {/* Category tag & Video Badge */}
                    <div className="flex justify-between items-start relative z-10 w-full">
                      <span className="bg-white/95 text-ink backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider font-mono shadow-sm">
                        {project.category}
                      </span>
                      {project.youtubeId ? (
                        <span className="bg-jelly text-ink backdrop-blur-md rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider font-mono shadow-sm flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
                          Watch Ad
                        </span>
                      ) : (
                        <div className="bg-white/90 backdrop-blur-md text-ink p-2 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Logo/Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center text-jelly-deep shadow-sm self-start mt-4 relative z-10">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Copy info */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-sans text-ink group-hover:text-jelly-deep transition-colors duration-300 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-jelly-deep mt-4">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* ── 4. SERVICES ──────────────────────────────────────────────────── */}
      <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              What We Make
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink font-normal tracking-tight leading-tight">
              Creative output that actually converts.
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={getContainerStagger()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.id}
                  variants={getCardItem()}
                  whileHover={{ y: -6, transition: { duration: 0.3, ease } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRoute(svc.path)}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-line flex flex-col justify-between min-h-[220px] md:min-h-[260px] shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-cream p-3 rounded-xl text-ink/70 group-hover:text-jelly-deep group-hover:bg-jelly/10 transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-muted/60">{svc.id}</span>
                    </div>
                    <h3 className="text-lg font-bold font-sans text-ink mb-2">{svc.title}</h3>
                    <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-jelly-deep opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <span>{svc.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 5. HOW WE WORK ───────────────────────────────────────────────── */}
      <section id="process" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white border-t border-b border-line">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={getRevealSection()}
          >
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              How We Work
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink font-normal tracking-tight leading-tight">
              Built for async. Delivered&nbsp;fast.
            </h2>
            <p className="mt-5 text-muted text-sm md:text-base font-light leading-relaxed max-w-xl">
              We work with US & UK clients fully remote — no awkward time-zone calls, no chasing updates. Just clean creative, on time.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
            variants={getContainerStagger()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  variants={getStepItem()}
                  className="flex flex-col gap-5 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-cream border border-line rounded-2xl p-3.5 text-ink/70 group-hover:text-jelly-deep group-hover:bg-jelly/10 group-hover:border-jelly/30 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-serif text-line font-normal tracking-tight select-none">
                      {step.num}
                    </span>
                  </div>
                  <div className="h-px bg-line w-full" />
                  <div>
                    <h3 className="text-base font-bold font-sans text-ink mb-2">{step.title}</h3>
                    <p className="text-muted text-sm font-light leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Async trust badges */}
          <motion.div
            className="mt-12 md:mt-16 flex flex-wrap gap-2.5 md:gap-3 items-center justify-center md:justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={getRevealSection()}
          >
            {[
              '48–72h first delivery',
              'No calls required',
              'Async-friendly',
              'US & UK time zones covered',
              '1 revision included',
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 bg-cream border border-line rounded-full px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-medium text-ink/80 font-sans"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-jelly" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── 6. COMPARISON TABLE ───────────────────────────────────────────── */}
      <section aria-label="Jellycut vs Traditional Agency comparison" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-cream border-t border-line">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="max-w-2xl mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          >
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              Why Jellycut
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink font-normal tracking-tight leading-tight">
              Agency quality. Startup&nbsp;speed.
            </h2>
          </motion.div>

          {/* Table */}
          <motion.div
            className="overflow-hidden rounded-2xl border border-line shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            {/* Header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-ink text-white text-xs font-bold font-mono uppercase tracking-widest">
              <div className="px-5 py-4 text-white/50">What matters</div>
              <div className="px-5 py-4 border-l border-white/10 flex items-center gap-2">
                <X className="w-3.5 h-3.5 text-red-400" />
                Traditional Agency
              </div>
              <div className="px-5 py-4 border-l border-white/10 flex items-center gap-2 text-jelly">
                <CheckCircle className="w-3.5 h-3.5" />
                Jellycut Studios
              </div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] text-sm ${
                  i % 2 === 0 ? 'bg-white' : 'bg-paper'
                } border-t border-line`}
              >
                <div className="px-5 py-4 text-ink font-medium font-sans text-xs md:text-sm">{row.label}</div>
                <div className="px-5 py-4 border-l border-line text-muted font-light text-xs md:text-sm">{row.agency}</div>
                <div className="px-5 py-4 border-l border-line text-ink font-semibold text-xs md:text-sm flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-jelly shrink-0" />
                  {row.jellycut}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      <section aria-label="Frequently asked questions" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#100f0f] border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-jelly text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              FAQ
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight">
              Everything you're probably wondering.
            </h2>
          </motion.div>

          <FaqAccordion faqs={faqs} ease={ease} />
        </div>
      </section>
    </div>
  );
}

// ─── FAQ Accordion sub-component ──────────────────────────────────────────
function FaqAccordion({ faqs, ease }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="divide-y divide-white/10">
      {faqs.map((item, i) => (
        <div key={i} className="py-1">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-6 py-5 text-left group cursor-pointer"
            aria-expanded={open === i}
          >
            <span className="text-white font-sans font-medium text-base md:text-lg leading-snug group-hover:text-jelly transition-colors duration-200">
              {item.q}
            </span>
            <ChevronDown
              className={`w-5 h-5 shrink-0 text-white/40 group-hover:text-jelly transition-all duration-300 ${
                open === i ? 'rotate-180 text-jelly' : ''
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-6 text-white/60 text-sm md:text-base font-light leading-relaxed font-sans">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
