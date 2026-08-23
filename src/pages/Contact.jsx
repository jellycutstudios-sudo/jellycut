import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, MapPin, MessageSquare, Phone, ChevronDown, ArrowLeft } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const SERVICES = [
  { id: 'ai-video-ad',    emoji: '🎬', title: 'Video Ad',      desc: 'A short ad for your product or brand' },
  { id: 'brand-identity', emoji: '🎨', title: 'Logo & Brand',  desc: 'A professional look and identity' },
  { id: 'website',        emoji: '💻', title: 'Website / App', desc: 'Build your online presence' },
  { id: 'not-sure',       emoji: '💬', title: 'Not sure yet',  desc: "Let's figure it out together" },
];

const faqs = [
  {
    question: 'How do you work across time zones?',
    answer: 'We work fully async — no meetings required. You submit your brief, we share progress through Loom videos and Figma links, and you leave feedback at your own pace.'
  },
  {
    question: 'What is your refund policy?',
    answer: 'We split your invoice 50/50. If after seeing the first draft you\'re not happy with the direction, we refund your deposit in full — no questions asked.'
  },
  {
    question: 'Do you offer monthly retainers?',
    answer: 'No. We use flat-rate pricing per project so you stay in control of your budget. No surprise invoices.'
  },
  {
    question: 'What do I get with a video campaign?',
    answer: 'You receive high-res MP4s in all formats — vertical (9:16), square (1:1), and wide (16:9) — plus licensed audio and a voiceover of your choice.'
  }
];

const snap = { type: 'spring', stiffness: 480, damping: 28 };

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [step, setStep]           = useState(1); // 1 | 2 | 3
  const [service, setService]     = useState('');
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');

  const reset = () => { setStep(1); setService(''); setName(''); setEmail(''); };

  const handleServicePick = (id) => {
    setService(id);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const svc  = SERVICES.find(s => s.id === service);
    const text = `Hello Jellycut Studios! 👋\n\nI'd love to start a project.\n\n• Name: ${name}\n• Email: ${email}\n• Looking for: ${svc?.title || service}`;
    window.open(`https://wa.me/919400025062?text=${encodeURIComponent(text)}`, '_blank');
    setStep(3);
  };

  return (
    <section className="relative min-h-screen bg-paper text-ink pt-32 md:pt-20 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <div className="max-w-2xl mb-16 mt-4">
          <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
            Get In Touch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-[1.05] font-normal tracking-tight">
            Let's build something impossible to scroll past.
          </h1>
          <p className="mt-5 text-muted text-base font-light leading-relaxed max-w-lg">
            Tell us what you need and we'll get back to you within 24 hours. No calls required to start.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-line pt-12">

          {/* ── LEFT: Contact info + FAQs ── */}
          <div className="lg:col-span-5 space-y-10">

            {/* Contact info */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-ink font-normal">Reach us directly</h2>
              <div className="space-y-2">
                {[
                  { Icon: Mail,         label: 'Email',          value: 'team@jellycutstudio.com', href: 'mailto:team@jellycutstudio.com' },
                  { Icon: MessageSquare,label: 'WhatsApp',        value: '+91 9400 025062',          href: 'https://wa.me/919400025062'     },
                  { Icon: Phone,        label: 'Phone',           value: '+91 9400 018008',          href: 'tel:+919400018008'              },
                  { Icon: Clock,        label: 'Hours',           value: '9 AM – 6 PM IST (Async friendly)', href: null                   },
                  { Icon: MapPin,       label: 'Location',        value: 'Kooriyad, Kerala, India',  href: 'https://maps.app.goo.gl/FW4w87cYtvGjYMHN6' },
                ].map(({ Icon, label, value, href }) => {
                  const Wrap = href ? 'a' : 'div';
                  return (
                    <Wrap
                      key={label}
                      href={href}
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-center gap-4 p-4 bg-white border border-line rounded-2xl transition-colors ${href ? 'hover:border-jelly cursor-pointer group' : ''}`}
                    >
                      <div className={`p-2.5 rounded-xl bg-cream ${href ? 'group-hover:bg-jelly/10' : ''}`}>
                        <Icon className="w-4 h-4 text-jelly-deep" />
                      </div>
                      <div>
                        <div className="text-xs text-muted font-medium">{label}</div>
                        <div className={`text-sm font-semibold text-ink ${href ? 'group-hover:text-jelly-deep transition-colors' : ''}`}>{value}</div>
                      </div>
                    </Wrap>
                  );
                })}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-ink font-normal">Common questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-line rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 cursor-pointer hover:bg-cream/40 transition-colors"
                    >
                      <span className="text-sm font-semibold text-ink leading-snug">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-jelly-deep' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease }}
                        >
                          <div className="px-5 pb-5 text-sm text-muted font-light leading-relaxed border-t border-line/40 pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT: 3-step wizard ── */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-line rounded-3xl shadow-xl overflow-hidden">

              {/* Top bar */}
              <div className="flex items-center justify-between px-7 pt-7 pb-3">
                <div className="flex items-center gap-3 h-8">
                  {step === 2 && (
                    <motion.button
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </motion.button>
                  )}
                </div>

                {/* Step dots */}
                {step < 3 && (
                  <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:left-auto lg:ml-auto">
                    {[1, 2].map(s => (
                      <div
                        key={s}
                        className={`rounded-full transition-all duration-300 ${
                          s === step   ? 'w-5 h-2 bg-jelly-deep'
                          : s < step  ? 'w-2 h-2 bg-jelly'
                                      : 'w-2 h-2 bg-line'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="px-7 pb-10 pt-4 min-h-[420px] flex flex-col">
                <AnimatePresence mode="wait">

                  {/* ── STEP 1: Pick a service ── */}
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ ease, duration: 0.28 }}
                      className="flex flex-col flex-1"
                    >
                      <h2 className="text-2xl md:text-3xl font-serif font-normal text-ink mb-1 leading-tight">
                        What can we help you with?
                      </h2>
                      <p className="text-muted text-sm mb-6">Pick one to get started.</p>

                      <div className="grid grid-cols-2 gap-3 flex-1">
                        {SERVICES.map((svc) => (
                          <button
                            key={svc.id}
                            onClick={() => handleServicePick(svc.id)}
                            className="flex flex-col items-start gap-2.5 p-5 rounded-2xl border-2 border-line bg-cream hover:border-jelly hover:bg-jelly/10 transition-all cursor-pointer text-left active:scale-[0.97] group"
                          >
                            <span className="text-3xl">{svc.emoji}</span>
                            <div>
                              <p className="font-semibold text-ink text-sm leading-tight">{svc.title}</p>
                              <p className="text-muted text-xs mt-0.5 leading-snug">{svc.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 2: Contact details ── */}
                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ ease, duration: 0.28 }}
                      className="flex flex-col flex-1"
                    >
                      {/* Service badge */}
                      <div className="inline-flex items-center gap-1.5 bg-jelly/15 text-jelly-deep rounded-full px-3 py-1 text-xs font-semibold mb-5 self-start">
                        <span>{SERVICES.find(s => s.id === service)?.emoji}</span>
                        {SERVICES.find(s => s.id === service)?.title}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-serif font-normal text-ink mb-1 leading-tight">
                        How can we reach you?
                      </h2>
                      <p className="text-muted text-sm mb-6">We'll reply within 24 hours. No calls needed.</p>

                      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">Your name</label>
                          <input
                            type="text"
                            required
                            autoFocus
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. Sarah"
                            className="w-full bg-cream border-2 border-line rounded-xl px-4 py-4 text-base text-ink placeholder:text-muted/50 focus:outline-none focus:border-jelly transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">Email address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full bg-cream border-2 border-line rounded-xl px-4 py-4 text-base text-ink placeholder:text-muted/50 focus:outline-none focus:border-jelly transition-colors"
                          />
                        </div>

                        <div className="mt-auto pt-4">
                          <button
                            type="submit"
                            className="w-full bg-ink text-white font-semibold text-base py-4 rounded-2xl hover:bg-ink/90 transition-all active:scale-[0.98] cursor-pointer shadow-md flex items-center justify-center gap-2"
                          >
                            Send via WhatsApp →
                          </button>
                          <p className="text-center text-xs text-muted mt-3">
                            This will open WhatsApp with your details pre-filled.
                          </p>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* ── STEP 3: Done ── */}
                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ ease, duration: 0.4 }}
                      className="flex flex-col items-center justify-center flex-1 text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ ...snap, delay: 0.1 }}
                        className="w-24 h-24 rounded-full bg-jelly/20 flex items-center justify-center mb-6"
                      >
                        <span className="text-5xl">✅</span>
                      </motion.div>
                      <h2 className="text-3xl font-serif font-normal text-ink mb-3">You're all set!</h2>
                      <p className="text-muted text-base max-w-xs leading-relaxed">
                        Thanks, <strong className="text-ink">{name}</strong>. We'll get back to you at <strong className="text-ink">{email}</strong> within 24 hours.
                      </p>
                      <button
                        onClick={reset}
                        className="mt-8 text-sm text-muted underline underline-offset-4 hover:text-ink transition-colors cursor-pointer"
                      >
                        Start a new enquiry
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
