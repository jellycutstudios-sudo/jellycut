import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Zap, ArrowRight, CheckCircle2, Layers, Video, 
  Globe, Code, Sparkles, Clock, FileText, ChevronDown, Download, Users
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const agencyCapabilities = [
  {
    category: 'AI Video Ads & Motion',
    turnaround: '48–72h First Cut',
    icon: Video,
    tag: 'Highest Agency Margin',
    description: 'Cinematic 9:16 & 16:9 ad creative designed to stop scrolls on Meta, TikTok, and YouTube.',
    items: [
      'Concepting, angle discovery & full scriptwriting',
      'AI synthesis + professional creative direction',
      'Hook testing packs (3–5 hooks per winning concept)',
      'High-res MP4 delivery with licensed audio & VO'
    ]
  },
  {
    category: 'Brand Identity Systems',
    turnaround: '3–5 Days Sprint',
    icon: Layers,
    tag: 'Turnkey Delivery',
    description: 'Distinctive visual language that positions your clients as market leaders.',
    items: [
      'Primary, secondary & responsive sub-marks',
      'Color architecture & typography hierarchy',
      'Figma design tokens & brand guideline manuals',
      'Social media kits & ready-to-run ad templates'
    ]
  },
  {
    category: 'Marketing & Landing Pages',
    turnaround: '4–7 Days Sprint',
    icon: Globe,
    tag: 'High Conversion',
    description: 'Sleek, responsive web experiences engineered for paid traffic and brand launches.',
    items: [
      'Custom Framer / React / Tailwind implementations',
      'Fluid micro-interactions & smooth scroll animations',
      'Lightning-fast Core Web Vitals & mobile polish',
      'Analytics, lead capture & CMS integrations'
    ]
  },
  {
    category: 'Full-Stack Web Applications',
    turnaround: '1–3 Week Sprints',
    icon: Code,
    tag: 'Custom Engineering',
    description: 'Production-ready web apps, client portals, and bespoke internal tools.',
    items: [
      'React, Node.js, and modern serverless backends',
      'Secure user authentication & database schemas',
      'Third-party API & AI model integrations',
      'Sprint-based milestones with staging previews'
    ]
  }
];

const agencyPillars = [
  {
    icon: ShieldCheck,
    title: '100% White-Label & NDA Guaranteed',
    description: 'We stay completely behind the scenes. We sign your NDA, deliver unbranded files, and never showcase your clients’ work publicly without your explicit written approval.'
  },
  {
    icon: Zap,
    title: 'Elastic On-Demand Capacity',
    description: 'Take on big client briefs without hiring permanent staff or managing unreliable freelance rosters. Scale your production bandwidth up or down as project volume dictates.'
  },
  {
    icon: Clock,
    title: 'Rapid 48–72h Creative Turnaround',
    description: 'Keep client momentum high. First drafts for video ads and creative assets arrive in 48–72 hours, with one revision round included so your agency stays ahead of deadlines.'
  },
  {
    icon: FileText,
    title: 'Predictable Wholesale Pricing',
    description: 'Transparent flat rates per project with no retainer traps. You know your production costs upfront, giving your agency full pricing control and healthy resale margins.'
  }
];

const agencyFaqs = [
  {
    q: 'How does white-label partnership work with Jellycut?',
    a: 'We act as your behind-the-scenes production arm. You handle client relations, billing, and strategy. We handle creative execution — video production, design, and code. All deliverables are unbranded and ready to present directly to your clients.'
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    a: 'Always. We execute mutual NDAs before any client brief is shared. Your clients remain exclusively your clients, and your agency retains 100% intellectual property ownership of all final deliverables.'
  },
  {
    q: 'How do we collaborate and communicate day-to-day?',
    a: 'We are async-first. We can join a private Slack Connect channel, share a Notion/Trello board, or work directly through email. You drop the brief, we acknowledge within a few hours, and deliver directly to your shared drive or preview link.'
  },
  {
    q: 'How do you handle revisions?',
    a: 'Every deliverable includes one comprehensive revision round within the flat fee. You compile internal and client feedback, share it async, and we turn around adjustments typically within 24–48 hours.'
  },
  {
    q: 'Can you handle urgent rush requests?',
    a: 'Yes. For fast-approaching client launch dates, we offer priority 24–48 hour rush sprints for video ads and creative assets.'
  }
];

export default function Agencies({ setIsModalOpen, setRoute }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showDeckModal, setShowDeckModal] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-paper text-ink pt-28 md:pt-36 pb-0 overflow-hidden font-sans">
      
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[70vw] h-[35vw] max-w-[900px] bg-jelly/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto text-center md:text-left mb-20 md:mb-28">
        <div className="max-w-4xl">
          
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-[#f0fbe8] border border-[#c8f0a0] rounded-full px-3.5 py-1 text-xs font-semibold text-[#2d7a00] mb-6 font-mono tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-jelly animate-pulse" />
            <span>AGENCY PARTNERSHIPS & WHITE-LABEL SERVICES</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ink leading-[1.08] tracking-tight mb-8"
          >
            More creative capacity. <span className="italic text-jelly-deep font-normal">Zero hiring overhead.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted font-light leading-relaxed max-w-2xl mb-10"
          >
            We help independent agencies deliver video campaigns, branding, and digital products under their own name. Websites, web apps, and AI-powered advertising — from concept and scripting to final delivery.
          </motion.p>

          {/* CTA Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 justify-start flex-wrap"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-ink text-white hover:bg-ink/90 text-sm md:text-base font-semibold px-7 py-3.5 rounded-full transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              <span>Request Wholesale Rate Card</span>
              <ArrowRight className="w-4 h-4 text-jelly" />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f0fbe8] hover:bg-[#e4f8d6] text-[#2d7a00] border border-[#c8f0a0] text-sm md:text-base font-semibold px-6 py-3.5 rounded-full transition-all shadow-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 text-jelly-deep" />
              <span>Discuss a Paid Pilot</span>
            </button>

            <button
              onClick={() => setShowDeckModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f8f9f5] text-ink border border-line text-sm md:text-base font-medium px-5 py-3.5 rounded-full transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-muted" />
              <span>Capabilities Deck</span>
            </button>
          </motion.div>

          {/* Trust points */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 pt-8 border-t border-line/70 flex flex-wrap gap-y-3 gap-x-6 text-xs text-muted font-mono"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-jelly-deep" /> 100% White-Label
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-jelly-deep" /> Mutual NDA Guaranteed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-jelly-deep" /> 48–72h Creative Drafts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-jelly-deep" /> Flat Wholesale Rates
            </span>
          </motion.div>

        </div>
      </section>

      {/* ── 2. THE 4 PILLARS (WHY AGENCIES PARTNER WITH US) ────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#fafbf7] border-y border-line">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-2xl mb-16">
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase font-mono block mb-3">
              Agency-Grade Delivery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal leading-tight">
              Designed specifically for agency margins & timelines.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agencyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-line p-8 rounded-2xl flex flex-col justify-between hover:border-jelly-deep/40 transition-colors shadow-sm"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#f0fbe8] border border-[#c8f0a0] flex items-center justify-center text-jelly-deep mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-3 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 3. SEPARATED CAPABILITIES MATRIX ─────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase font-mono block mb-3">
            Full-Spectrum Production
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal leading-tight mb-4">
            Production capabilities, cleanly separated.
          </h2>
          <p className="text-muted text-base font-light">
            Fast 48–72h turnaround on creative assets; structured sprint milestones for web & app engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agencyCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-line rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0f1a0d] text-jelly flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-jelly-deep bg-[#f0fbe8] border border-[#c8f0a0] px-3 py-1 rounded-full">
                        {cap.turnaround}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal mb-2">
                    {cap.category}
                  </h3>
                  <p className="text-xs font-mono text-muted mb-4 uppercase tracking-wider">
                    {cap.tag}
                  </p>
                  <p className="text-sm text-muted leading-relaxed font-light mb-6">
                    {cap.description}
                  </p>

                  <ul className="space-y-3 pt-4 border-t border-line/60">
                    {cap.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80">
                        <CheckCircle2 className="w-4 h-4 text-jelly-deep shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-line/60 flex items-center justify-between">
                  <span className="text-xs text-muted font-mono">Wholesale & Per-Project</span>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-xs font-semibold text-ink group-hover:text-jelly-deep inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Add to scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ── 4. PRODUCTION PIPELINE (CONCEPT TO SCREEN) ───────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#0f1a0d] text-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-2xl mb-16">
            <span className="text-jelly text-xs font-semibold tracking-widest uppercase font-mono block mb-3">
              Rigor & Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight mb-4">
              From creative concept to final master cut.
            </h2>
            <p className="text-white/70 text-base font-light">
              We don’t just run raw prompts. Every video deliverable follows an end-to-end commercial production pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Angle & Hook Strategy',
                desc: 'We analyze your client’s target ICP and competitor ads to uncover high-converting scroll-stopping hooks.'
              },
              {
                step: '02',
                title: 'Scripting & Audio Design',
                desc: 'Full scene-by-scene script with visual framing cues, pacing notes, and voiceover tone direction.'
              },
              {
                step: '03',
                title: 'Visual Synthesis & Boarding',
                desc: 'High-fidelity AI asset generation (Runway Gen-3, Midjourney v6) and precise scene composition.'
              },
              {
                step: '04',
                title: 'Color, Sound & Master Export',
                desc: 'Professional sound mastering, typography animations, and exports in 9:16, 16:9, and 1:1.'
              }
            ].map((p, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-serif text-jelly block mb-4 font-normal">
                    {p.step}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. AGENCY FAQ ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase font-mono block mb-3">
            Agency FAQs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal">
            Everything agencies ask us.
          </h2>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {agencyFaqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-medium text-ink group-hover:text-jelly-deep transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-jelly-deep' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed font-light pr-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── MODAL: AGENCY CAPABILITIES DECK REQUEST ──────────────────────── */}
      <AnimatePresence>
        {showDeckModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 md:p-10 border border-line shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-full bg-[#f0fbe8] border border-[#c8f0a0] flex items-center justify-center text-jelly-deep">
                  <FileText className="w-5 h-5" />
                </div>
                <button
                  onClick={() => setShowDeckModal(false)}
                  className="text-muted hover:text-ink text-sm font-semibold p-1 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <h3 className="font-serif text-2xl text-ink font-normal mb-2">
                Agency Capabilities & Wholesale Deck
              </h3>
              <p className="text-sm text-muted font-light mb-6">
                Get our full wholesale pricing sheet, case studies, and SLA specs delivered directly to your inbox.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Our wholesale deck has been dispatched to your email.");
                  setShowDeckModal(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">Agency Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Apex Digital Media" 
                    className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:outline-none focus:border-jelly-deep"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">Work Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="alex@apexdigital.com" 
                    className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:outline-none focus:border-jelly-deep"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-ink text-white font-semibold py-3.5 rounded-full text-sm hover:bg-ink/90 transition-all cursor-pointer shadow-md"
                >
                  Download Capabilities Deck (PDF)
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

