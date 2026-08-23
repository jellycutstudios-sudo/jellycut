import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ArrowRight, Check } from 'lucide-react';

const SERVICES = [
  { id: 'ai-video-ad',    label: 'Video Ad',      desc: 'Short-form ad for your product or brand' },
  { id: 'brand-identity', label: 'Logo & Brand',  desc: 'A professional identity that lasts' },
  { id: 'website',        label: 'Website / App', desc: 'A fast, stunning online presence' },
  { id: 'not-sure',       label: 'Not sure yet',  desc: "Let's figure it out together" },
];

const ease = [0.16, 1, 0.3, 1];

const slide = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -28 },
  transition: { ease, duration: 0.32 },
};

export default function ProjectModal({ isOpen, onClose, isMobile }) {
  const [step, setStep]       = useState(1);
  const [service, setService] = useState('');
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');

  const reset = () => { setStep(1); setService(''); setName(''); setEmail(''); };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 400);
  };

  const handleServicePick = (id) => {
    setService(id);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const svc = SERVICES.find(s => s.id === service);
    const text = `Hello Jellycut Studios! 👋\n\nI'd love to start a project.\n\n• Name: ${name}\n• Email: ${email}\n• Looking for: ${svc?.label || service}`;
    window.open(`https://wa.me/919400025062?text=${encodeURIComponent(text)}`, '_blank');
    setStep(3);
    setTimeout(handleClose, 3500);
  };

  const selectedSvc = SERVICES.find(s => s.id === service);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal card */}
          <motion.div
            className="relative z-10 bg-paper w-full md:max-w-lg rounded-t-[2rem] md:rounded-[2rem] overflow-hidden shadow-2xl border border-line/60"
            initial={isMobile ? { y: '100%' } : { scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={isMobile ? { y: '100%' } : { scale: 0.95, y: 20, opacity: 0 }}
            transition={{ ease, duration: 0.38 }}
          >
            {/* ── Header bar ── */}
            <div className="flex items-center justify-between px-7 pt-7 pb-0">
              {/* Left: step back or spacer */}
              <div className="w-8">
                {step === 2 && (
                  <motion.button
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-xs text-muted hover:text-ink transition-colors cursor-pointer font-medium"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </div>

              {/* Centre: step counter */}
              {step < 3 && (
                <span className="text-[11px] font-mono font-semibold text-muted tracking-widest uppercase">
                  {step === 1 ? '01 — Service' : '02 — Details'}
                </span>
              )}

              {/* Right: close */}
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-line transition-colors cursor-pointer text-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Step progress bar ── */}
            {step < 3 && (
              <div className="mx-7 mt-5 h-[2px] bg-line rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-jelly-deep rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  transition={{ ease, duration: 0.5 }}
                />
              </div>
            )}

            {/* ── Content ── */}
            <div className="px-7 pb-8 pt-6 min-h-[360px] flex flex-col">
              <AnimatePresence mode="wait">

                {/* STEP 1 — Pick a service */}
                {step === 1 && (
                  <motion.div key="s1" {...slide} className="flex flex-col flex-1">
                    <h2 className="font-serif text-[2rem] text-ink font-normal leading-[1.15] mb-1">
                      What do you need?
                    </h2>
                    <p className="text-muted text-sm mb-7 font-light">Pick one and we'll take it from there.</p>

                    <div className="flex flex-col gap-2.5 flex-1">
                      {SERVICES.map((svc, i) => (
                        <button
                          key={svc.id}
                          onClick={() => handleServicePick(svc.id)}
                          className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-line bg-white hover:border-jelly-deep hover:bg-cream transition-all cursor-pointer text-left active:scale-[0.99]"
                        >
                          {/* Number tag */}
                          <span className="text-[11px] font-mono font-bold text-muted/60 group-hover:text-jelly-deep transition-colors w-5 flex-shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {/* Label & desc */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-ink group-hover:text-jelly-deep transition-colors leading-tight">{svc.label}</p>
                            <p className="text-xs text-muted font-light mt-0.5">{svc.desc}</p>
                          </div>
                          {/* Arrow */}
                          <ArrowRight className="w-4 h-4 text-line group-hover:text-jelly-deep group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — Contact details */}
                {step === 2 && (
                  <motion.div key="s2" {...slide} className="flex flex-col flex-1">
                    {/* Selected pill */}
                    <div className="inline-flex items-center gap-2 bg-ink text-jelly px-3 py-1 rounded-full text-[11px] font-semibold font-mono mb-5 self-start tracking-wide">
                      {selectedSvc?.label}
                    </div>

                    <h2 className="font-serif text-[2rem] text-ink font-normal leading-[1.15] mb-1">
                      How do we reach you?
                    </h2>
                    <p className="text-muted text-sm mb-7 font-light">We reply within 24 hours. No sales calls.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-widest font-mono mb-2">Your name</label>
                        <input
                          type="text"
                          required
                          autoFocus
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="e.g. Sarah"
                          className="w-full bg-white border border-line rounded-xl px-4 py-3.5 text-base text-ink placeholder:text-muted/40 focus:outline-none focus:border-jelly-deep transition-colors shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted uppercase tracking-widest font-mono mb-2">Email address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-white border border-line rounded-xl px-4 py-3.5 text-base text-ink placeholder:text-muted/40 focus:outline-none focus:border-jelly-deep transition-colors shadow-sm"
                        />
                      </div>

                      <div className="mt-auto pt-2">
                        <button
                          type="submit"
                          className="w-full bg-ink text-white font-bold text-sm py-4 rounded-xl hover:bg-jelly-deep transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 tracking-wide"
                        >
                          <span>Send via WhatsApp</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-center text-[11px] text-muted mt-3 font-light">
                          Opens WhatsApp with your details pre-filled.
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3 — Done */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ease, duration: 0.4 }}
                    className="flex flex-col items-center justify-center flex-1 text-center py-10 gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-jelly/20 border border-jelly/30 flex items-center justify-center"
                    >
                      <Check className="w-7 h-7 text-jelly-deep" strokeWidth={2.5} />
                    </motion.div>
                    <div>
                      <h2 className="font-serif text-2xl text-ink font-normal mb-1">You're all set</h2>
                      <p className="text-muted text-sm font-light leading-relaxed max-w-[200px] mx-auto">
                        Thanks, <strong className="text-ink font-semibold">{name}</strong>. We'll be in touch soon.
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
