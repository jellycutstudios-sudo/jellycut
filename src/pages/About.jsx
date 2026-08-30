import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Compass, Clock, Award, ShieldCheck, MapPin, 
  Image, Zap, Layout, Globe, Layers, Terminal, Sparkles
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

/* ─── Data ─────────────────────────────────────────────────────────────── */

const timeline = [
  {
    year: 'The beginning',
    label: 'Same streets, same sky',
    text: "Three kids from the same neighbourhood in Kerala. We didn't choose each other — life did. Same roads, same rooftops, same nonsense ideas whispered under the open sky.",
    emoji: '🌴'
  },
  {
    year: 'School',
    label: 'Different in every way. Always on the same side.',
    text: "Classrooms, football fields, late-night movies. We argued about everything — films, cricket, who was right. But we always showed up for each other. That part never changed.",
    emoji: '✏️'
  },
  {
    year: 'First jobs',
    label: 'Different paths. The group chat never went quiet.',
    text: "Life pulled us in separate directions — some to top tech companies, others to creative studios, production houses. We built careers working for some of the best companies in Kerala and India. And we learned a lot. But something felt unfinished.",
    emoji: '🏙️'
  },
  {
    year: 'The call',
    label: '"What if we did this for ourselves?"',
    text: "One call. One idea. One question that kept us up all night. We had the skills, we had the trust, and we had each other. That was enough.",
    emoji: '📞'
  },
  {
    year: 'Today',
    label: 'Jellycut — built on friendship, powered by craft.',
    text: "We came back to where it all started — Kerala — and built something we're genuinely proud of. A studio where every project carries a piece of who we are.",
    emoji: '✦'
  }
];

const team = [
  {
    name: 'Salman Abu',
    tagline: 'Builder by instinct. Thinker by habit.',
    bio: "Before Jellycut, I spent years at top companies building products used by real people. I learned a lot — but the best thing I learned was that the work means more when it's yours. I wanted to build something that actually felt like us.",
    hobby: '📖  Always reading — always looking for the next problem worth solving.',
    initial: 'S',
    color: 'from-jelly-deep to-jelly'
  },
  {
    name: 'Anas',
    tagline: 'Sees stories where others see footage.',
    bio: "I've always believed the best creative work makes you feel something before you understand it. After years working with some of Kerala's leading creative teams, I came to Jellycut to tell stories on my own terms — without compromise.",
    hobby: '🎬  Film marathons. Cricket on match days. Always searching for the perfect shot.',
    initial: 'A',
    color: 'from-[#1a5c00] to-jelly-mid'
  },
  {
    name: 'Thufail',
    tagline: "Obsessed with details you'd never notice — but always feel.",
    bio: "I spent years helping brands find their visual language at some of Kerala's sharpest companies. Every colour, every curve, every choice matters to me. Jellycut is where that obsession finally has a home.",
    hobby: '📚  Reading everything. Cricket fan. Branding is how I see the world.',
    initial: 'T',
    color: 'from-[#2d7a00] to-jelly-deep'
  }
];

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

/* ─── Sub-components ────────────────────────────────────────────────────── */

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLast = index === timeline.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease, delay: index * 0.08 }}
      className="flex gap-5 md:gap-10 items-start"
    >
      {/* Year label — desktop */}
      <div className="w-36 shrink-0 text-right pt-1.5 hidden md:block select-none">
        <div className="text-[10px] font-mono text-jelly-deep uppercase tracking-widest font-semibold leading-tight">
          {item.year}
        </div>
      </div>

      {/* Spine: dot + line */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, ease, delay: index * 0.08 + 0.15 }}
          className="w-3 h-3 rounded-full bg-jelly-deep ring-4 ring-jelly/20 shrink-0"
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.55, ease, delay: index * 0.08 + 0.3 }}
            className="w-px origin-top mt-2"
            style={{
              height: '88px',
              background: 'linear-gradient(to bottom, var(--jelly-deep) 0%, var(--line) 100%)',
              opacity: 0.45
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        {/* Year label — mobile */}
        <div className="md:hidden mb-1 text-[10px] font-mono text-jelly-deep uppercase tracking-widest font-semibold">
          {item.year}
        </div>
        <div className="text-xl mb-2 leading-none">{item.emoji}</div>
        <h3 className="font-serif text-lg md:text-xl text-ink leading-tight mb-2 font-normal">
          {item.label}
        </h3>
        <p className="text-muted text-sm font-light leading-relaxed max-w-lg">
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}

function TeamCard({ member, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.12 }}
      className="bg-white border border-line rounded-3xl p-7 flex flex-col gap-5 hover:shadow-xl hover:border-jelly-mid/30 transition-all duration-500 group relative overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-jelly/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

      {/* Avatar + name */}
      <div className="flex items-center gap-4 relative z-10">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-2xl font-serif shadow-md shrink-0 select-none`}
        >
          {member.initial}
        </div>
        <div>
          <h3 className="text-base font-bold text-ink font-sans leading-tight">{member.name}</h3>
          <p className="text-[11px] text-jelly-deep font-mono font-semibold tracking-wide mt-1 leading-tight max-w-[200px]">
            {member.tagline}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-muted text-sm font-light leading-relaxed relative z-10 flex-1">
        {member.bio}
      </p>

      {/* Hobby */}
      <div className="text-xs text-ink/55 font-mono border-t border-line pt-4 relative z-10 leading-relaxed">
        {member.hobby}
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function About() {
  const [localTime, setLocalTime] = useState('');
  const [status, setStatus] = useState('');
  const [velocityMode, setVelocityMode] = useState('jellycut');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setLocalTime(timeString);

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

        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl mb-8 mt-8"
        >
          <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
            Our Story
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] font-normal tracking-tight">
            Three friends.<br />
            One crazy bet<br />
            on each other.
          </h1>
          <p className="mt-6 text-muted text-sm md:text-base font-light leading-relaxed max-w-2xl">
            We didn't start as an agency. We started as friends — childhood friends from Kerala who shared roads, rooftops, and the kind of trust that only comes from growing up side by side. Jellycut is what happened when we finally stopped building for others and started building for ourselves.
          </p>
        </motion.div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="mb-24 border-l-2 border-jelly pl-6 max-w-xl"
        >
          <p className="font-serif text-xl md:text-2xl text-ink/75 italic leading-relaxed">
            "Different skills. Different minds. But always the same table."
          </p>
        </motion.div>

        {/* ─── Origin Timeline ───────────────────────────────────────────── */}
        <div className="mb-28 border-t border-line pt-16">
          <div className="max-w-3xl mb-14">
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              How We Got Here
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
              The story so far
            </h2>
            <p className="mt-4 text-muted text-sm font-light leading-relaxed max-w-lg">
              Every company has a founding story. Ours started long before anyone opened a laptop.
            </p>
          </div>

          <div className="relative">
            {timeline.map((item, idx) => (
              <TimelineItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>

        {/* ─── Team Cards ────────────────────────────────────────────────── */}
        <div className="mb-28">
          <div className="max-w-3xl mb-12">
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
              The Minds Behind It
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
              Meet the team
            </h2>
            <p className="mt-4 text-muted text-sm md:text-base font-light leading-relaxed max-w-xl">
              Three people who bring completely different obsessions to the same studio — and somehow make it work every single time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <TeamCard key={idx} member={member} index={idx} />
            ))}
          </div>
        </div>

        {/* ─── Philosophy ────────────────────────────────────────────────── */}
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

        {/* ─── Velocity Index ────────────────────────────────────────────── */}
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
                        <div className="text-xs text-muted/80 mt-1">Slow approvals &amp; meetings</div>
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

        {/* ─── Origin & Location (Kerala with Live Clock) ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 bg-cream rounded-[32px] p-8 md:p-12 border border-line relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-jelly/5 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

          <div className="lg:col-span-7 space-y-6 order-last lg:order-first relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase font-mono">
                Our Roots
              </span>
              
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
              We didn't move to a metro. Kerala made us, and we're proud of that. Operating fully remote, we serve clients across the US, UK, and Europe — and we've built workflows that mean you never need to worry about time-zone calls.
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

        {/* ─── Tech Stack ─────────────────────────────────────────────────── */}
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

        {/* ─── Guarantees ─────────────────────────────────────────────────── */}
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
