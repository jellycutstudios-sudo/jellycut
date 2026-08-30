import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'jc_vibe_shown';

const options = [
  { emoji: '🎬', label: 'Video ad',      route: '/contact?service=ai-video-ad' },
  { emoji: '🎨', label: 'Branding',      route: '/contact?service=brand-identity' },
  { emoji: '💻', label: 'Website / app', route: '/contact?service=website' },
  { emoji: '👀', label: 'Just browsing', reply:  "Take your time — we're not going anywhere 😊" },
];

// spring preset
const snap = { type: 'spring', stiffness: 480, damping: 28 };

export default function VibeCheck({ setRoute }) {
  // 'idle' → 'pill' → 'open' → 'replied' → 'idle'
  const [phase, setPhase]   = useState('idle');
  const [picked, setPicked] = useState(null);

  /* ── trigger: 10s after first load, once per session ── */
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setPhase('pill');
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  const handlePick = (opt) => {
    setPicked(opt);
    if (opt.route) {
      setTimeout(() => { setPhase('idle'); setRoute(opt.route); }, 380);
    } else {
      setPhase('replied');
      setTimeout(() => setPhase('idle'), 3200);
    }
  };

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          key="float"
          /* enter: drift up from below; exit: shrink & fade */
          initial={{ opacity: 0, y: 28, scale: 0.88 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{   opacity: 0, y: 16, scale: 0.94  }}
          transition={snap}
          /* centred at the bottom, above mobile nav bars */
          className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[9990] flex flex-col items-center pointer-events-none"
        >
          {/* ── FLOATING GLASS SURFACE ── */}
          <motion.div
            layout
            transition={{ ...snap, layout: { duration: 0.35 } }}
            className="pointer-events-auto relative"
            style={{
              background:   'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: phase === 'open' ? 24 : 999,
              boxShadow: [
                '0 8px 40px rgba(0,0,0,0.10)',
                '0 0  0  1px rgba(195,245,60,0.25)',
                '0 0 40px rgba(195,245,60,0.08)',
              ].join(','),
            }}
          >
            <AnimatePresence mode="wait">

              {/* ── PILL STATE: just the teaser question ── */}
              {phase === 'pill' && (
                <motion.button
                  key="pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{   opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setPhase('open')}
                  className="flex items-center gap-2 px-5 py-2.5 cursor-pointer select-none"
                >
                  {/* pulsing jelly dot */}
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jelly opacity-70" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-jelly-deep" />
                  </span>
                  <span className="text-sm font-semibold text-ink whitespace-nowrap">
                    Hey! What are you here for?
                  </span>
                  {/* tiny arrow hint */}
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                    className="text-muted text-xs"
                  >
                    →
                  </motion.span>
                </motion.button>
              )}

              {/* ── OPEN STATE: question + chips ── */}
              {phase === 'open' && (
                <motion.div
                  key="open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{   opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="px-5 pt-5 pb-5 w-[min(88vw,340px)]"
                >
                  {/* dismiss */}
                  <button
                    onClick={() => setPhase('idle')}
                    className="absolute top-3 right-3.5 text-[11px] text-muted/60 hover:text-muted transition-colors cursor-pointer"
                    aria-label="dismiss"
                  >
                    ✕
                  </button>

                  {/* waving hand + question */}
                  <div className="flex items-center gap-2 mb-3.5">
                    <motion.span
                      animate={{ rotate: [0, 16, -10, 16, 0] }}
                      transition={{ delay: 0.3, duration: 0.7 }}
                      className="text-xl leading-none select-none"
                    >
                      👋
                    </motion.span>
                    <p className="text-sm font-semibold text-ink leading-snug">
                      Quick question — what are you looking for?
                    </p>
                  </div>

                  {/* staggered chips — 2-column grid for consistent shape */}
                  <div className="grid grid-cols-2 gap-2">
                    {options.map((opt, i) => (
                      <motion.button
                        key={opt.label}
                        initial={{ opacity: 0, y: 8, scale: 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1    }}
                        transition={{ ...snap, delay: 0.08 + i * 0.07 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{   scale: 0.95 }}
                        onClick={() => handlePick(opt)}
                        className={`
                          flex items-center gap-2 text-[13px] font-medium rounded-2xl
                          px-4 py-3 border transition-colors cursor-pointer text-left
                          ${picked?.label === opt.label
                            ? 'bg-jelly border-transparent text-ink'
                            : 'bg-white/70 border-line/60 text-ink hover:bg-jelly/15 hover:border-jelly/40'
                          }
                        `}
                      >
                        <span className="text-base leading-none">{opt.emoji}</span>
                        <span>{opt.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── REPLIED STATE: friendly message ── */}
              {phase === 'replied' && (
                <motion.p
                  key="replied"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1    }}
                  exit={{   opacity: 0               }}
                  transition={snap}
                  className="px-6 py-3 text-sm font-semibold text-ink whitespace-nowrap"
                >
                  {picked?.reply}
                </motion.p>
              )}

            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
