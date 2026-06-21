import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Clock, Award, ShieldCheck, MapPin, 
  Image, Zap, Layout, Globe, Layers, Terminal, Sparkles 
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const guarantees = [
  {
    icon: Clock,
    title: '48h–72h Turnaround',
    description: 'We move at the speed of internet trends. Your first project draft is delivered in a matter of days, not months.'
  },
  {
    icon: ShieldCheck,
    title: 'No Retainer Traps',
    description: 'Pay per project. Keep complete flexibility over your creative budget. No locking contracts, no hidden fees.'
  },
  {
    icon: Award,
    title: 'Aesthetic Guarantee',
    description: 'If you do not love the direction after the first round of revisions, we will refund your deposit. No questions asked.'
  }
];

const stack = [
  { name: 'Midjourney v6', type: 'Creative Asset Synth', icon: Image },
  { name: 'Runway Gen-3', type: 'AI Video Synthesis', icon: Zap },
  { name: 'Figma', type: 'Design System & UX', icon: Layout },
  { name: 'React / Vite', type: 'Frontend Framework', icon: Globe },
  { name: 'Framer Motion', type: 'Micro-Animations', icon: Layers },
  { name: 'AI Pair-Coding', type: 'Vibe-Coded Shipping', icon: Terminal }
];

export default function About() {
  const [localTime, setLocalTime] = useState('');
  const [status, setStatus] = useState('');
  const [velocityMode, setVelocityMode] = useState('jellycut'); // 'traditional' or 'jellycut'

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format time in Asia/Kolkata
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setLocalTime(timeString);

      // Get current hour in Kolkata
      const kolkataHour = parseInt(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          hour12: false
        })
      );

      if (kolkataHour >= 9 && kolkataHour < 18) {
        setStatus('🟢 Active & Syncing // Shipments online');
      } else {
        setStatus('🌙 Async-online // Reviewing briefs');
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-paper text-ink pt-32 md:pt-8 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="max-w-3xl mb-16 mt-8">
          <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
            Who We Are
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] font-normal tracking-tight">
            We compress the distance between concept and masterpiece.
          </h1>
          <p className="mt-5 text-muted text-sm md:text-base font-light leading-relaxed max-w-xl">
            Jellycut is a creative AI studio from Kerala — building cinematic video ads, bold brand identities, and vibe-coded apps for founders and brands ready to&nbsp;grow.
          </p>
        </div>

        {/* Section 1: Philosophy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-line pt-12 items-start mb-24">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
              AI speed, directed by human taste.
            </h2>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-jelly-deep font-semibold uppercase">
              <Compass className="w-4 h-4" />
              <span>A new model of studio</span>
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-6 text-muted text-sm md:text-base font-light leading-relaxed">
            <p>
              Traditional agencies are slow. They throw committees at problems, compile endless slide decks, and charge heavy monthly retainers just to keep the lights on.
            </p>
            <p>
              We believe that ambitious brands need speed and agility. Generative AI allows us to compress production cycles by 10x, turning concepts into rich, broadcast-ready creative in hours.
            </p>
            <p>
              But AI is just a calculator without human curation. We combine cutting-edge models with rigorous creative direction, expert color-grading, custom sound engineering, and clean hand-written code.
            </p>
          </div>
        </div>

        {/* Section 2: Interactive Velocity Widget */}
        <div className="mb-24">
          <div className="max-w-3xl mb-10">
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              Velocity Index
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
              How we beat traditional workflows
            </h2>
            <p className="mt-4 text-muted text-xs md:text-sm font-light leading-relaxed">
              Toggle between models to see how we bypass bureaucratic agency bottlenecks to ship faster.
            </p>
          </div>

          <div className="bg-white border border-line rounded-[32px] p-6 md:p-10 shadow-lg relative overflow-hidden">
            {/* Toggle Pills */}
            <div className="flex justify-center mb-10">
              <div className="bg-cream border border-line/75 rounded-full p-1.5 flex gap-2 w-full max-w-[420px] shadow-inner relative">
                <button
                  type="button"
                  onClick={() => setVelocityMode('traditional')}
                  className={`flex-1 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
                    velocityMode === 'traditional' ? 'text-white' : 'text-muted hover:text-ink'
                  }`}
                >
                  Traditional Agency
                </button>
                <button
                  type="button"
                  onClick={() => setVelocityMode('jellycut')}
                  className={`flex-1 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
                    velocityMode === 'jellycut' ? 'text-white' : 'text-muted hover:text-ink'
                  }`}
                >
                  Jellycut Velocity
                </button>

                {/* Animated Slider Backdrop */}
                <motion.div
                  className="absolute top-1.5 bottom-1.5 bg-ink rounded-full"
                  layoutId="velocitySlider"
                  style={{
                    width: 'calc(50% - 12px)',
                    left: velocityMode === 'traditional' ? '6px' : 'calc(50% + 6px)'
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                />
              </div>
            </div>

            {/* Matrix comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={velocityMode}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease }}
                  className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {velocityMode === 'traditional' ? (
                    <>
                      <div className="bg-cream border border-line/45 rounded-2xl p-5 flex flex-col justify-between">
                        <div className="text-[10px] font-mono text-muted uppercase tracking-wider">Timeline</div>
                        <div className="text-xl font-bold font-sans text-ink mt-3 leading-tight">4 – 6 Weeks</div>
                        <div className="text-xs text-muted/80 mt-1">Slow approvals & meetings</div>
                      </div>
                      <div className="bg-cream border border-line/45 rounded-2xl p-5 flex flex-col justify-between">
                        <div className="text-[10px] font-mono text-muted uppercase tracking-wider">Pricing</div>
                        <div className="text-xl font-bold font-sans text-ink mt-3 leading-tight">$10k+ Retainers</div>
                        <div className="text-xs text-muted/80 mt-1">High monthly overheads</div>
                      </div>
                      <div className="bg-cream border border-line/45 rounded-2xl p-5 flex flex-col justify-between">
                        <div className="text-[10px] font-mono text-muted uppercase tracking-wider">Feedback Loop</div>
                        <div className="text-xl font-bold font-sans text-ink mt-3 leading-tight">Weekly Zooms</div>
                        <div className="text-xs text-muted/80 mt-1">Endless review decks</div>
                      </div>
                      <div className="bg-cream border border-line/45 rounded-2xl p-5 flex flex-col justify-between">
                        <div className="text-[10px] font-mono text-muted uppercase tracking-wider">Production</div>
                        <div className="text-xl font-bold font-sans text-ink mt-3 leading-tight">Heavy Gear</div>
                        <div className="text-xs text-muted/80 mt-1">Massive studio shoot budgets</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-cream border border-jelly/35 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-jelly/10 rounded-bl-full flex justify-center items-center text-jelly-deep pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-[10px] font-mono text-jelly-deep uppercase tracking-wider font-semibold">Timeline</div>
                        <div className="text-xl font-bold font-sans text-ink mt-3 leading-tight flex items-center gap-1.5">
                          <span>48h – 72h</span>
                        </div>
                        <div className="text-xs text-muted mt-1">⚡ AI speed, ready in days</div>
                      </div>
                      <div className="bg-cream border border-jelly/35 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-jelly/10 rounded-bl-full flex justify-center items-center text-jelly-deep pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-[10px] font-mono text-jelly-deep uppercase tracking-wider font-semibold">Pricing</div>
                        <div className="text-xl font-bold font-sans text-ink mt-3 leading-tight">Flat-Rate</div>
                        <div className="text-xs text-muted mt-1">Pay per project. Zero fluff</div>
                      </div>
                      <div className="bg-cream border border-jelly/35 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-jelly/10 rounded-bl-full flex justify-center items-center text-jelly-deep pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-[10px] font-mono text-jelly-deep uppercase tracking-wider font-semibold">Feedback Loop</div>
                        <div className="text-xl font-bold font-sans text-ink mt-3 leading-tight">Async-First</div>
                        <div className="text-xs text-muted mt-1">Loom clips &amp; shared Canvas links</div>
                      </div>
                      <div className="bg-cream border border-jelly/35 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-jelly/10 rounded-bl-full flex justify-center items-center text-jelly-deep pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-[10px] font-mono text-jelly-deep uppercase tracking-wider font-semibold">Production</div>
                        <div className="text-xl font-bold font-sans text-ink mt-3 leading-tight">Neural Synth</div>
                        <div className="text-xs text-muted mt-1">Infinite assets, custom grade &amp; sound</div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Section 3: Origin & Location (Kerala with Live Clock) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 bg-cream rounded-[32px] p-8 md:p-12 border border-line relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-jelly/5 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

          <div className="lg:col-span-7 space-y-6 order-last lg:order-first relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase font-mono">
                Our Roots
              </span>
              
              {/* Dynamic local hours status */}
              {localTime && (
                <div className="bg-white border border-line/80 px-3 py-1 rounded-full text-[9px] font-bold font-mono text-ink shadow-sm flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-jelly-mid animate-pulse" />
                  <span>Kooriyad time: {localTime}</span>
                </div>
              )}
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
              Made in Kerala. Serving founders globally.
            </h2>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Jellycut is proudly based in Kooriyad, Kerala — a lush tropical hub of tech talent, design heritage, and creative expression. 
            </p>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Operating fully remote, we serve clients across the US, UK, and Europe. We have structured our workflows around async collaboration, meaning you get detailed progress logs and drafts in your inbox without having to coordinate time-zone calls.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="https://maps.app.goo.gl/FW4w87cYtvGjYMHN6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-ink hover:text-jelly-deep transition-colors font-mono cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-jelly" />
                <span>Kooriyad, Kerala, India (IST // UTC+5:30)</span>
              </a>

              {status && (
                <div className="text-xs text-muted font-mono flex items-center gap-1.5">
                  <span>{status}</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative z-10">
            <img
              src="https://playground.bravebrand.com/assets/backgrounds/signal-foundry-pixel-flower.webp"
              alt="Botanical design mark representing Kerala"
              className="max-h-[320px] object-contain mix-blend-multiply opacity-95 hover:scale-105 transition-transform duration-750"
            />
          </div>
        </div>

        {/* Section 4: Tech Stack */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              The Engine Room
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
              Our Creative &amp; Production Stack
            </h2>
            <p className="mt-4 text-muted text-xs md:text-sm font-light leading-relaxed">
              We compose assets using state-of-the-art neural engines and hand-refine them inside professional developer environments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stack.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-line rounded-2xl p-5 flex flex-col justify-between min-h-[140px] hover:border-jelly-mid/40 hover:shadow-md transition-all duration-300 group cursor-default"
                >
                  <div className="bg-cream rounded-xl p-2.5 w-fit mb-4 text-jelly-deep group-hover:bg-jelly/10 transition-colors">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-ink leading-tight">{item.name}</div>
                    <div className="text-[9px] text-muted uppercase font-mono tracking-wider mt-1">{item.type}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5: Guarantees */}
        <div>
          <div className="max-w-3xl mb-12">
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              Confidence Built-In
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
              Why brands trust Jellycut Studios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((g, idx) => {
              const Icon = g.icon;
              return (
                <div key={idx} className="bg-white border border-line rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-jelly-mid/20 transition-all duration-300 relative group overflow-hidden">
                  {/* Subtle hover background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-jelly/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="bg-cream text-jelly-deep p-3 rounded-2xl w-fit relative z-10 group-hover:bg-jelly/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-base font-bold font-sans text-ink mb-2">{g.title}</h3>
                    <p className="text-muted text-xs md:text-sm font-light leading-relaxed">{g.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
