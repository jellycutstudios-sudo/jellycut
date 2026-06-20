import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Cpu, Clock, Award, ShieldCheck, MapPin } from 'lucide-react';

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
  { name: 'Midjourney v6', type: 'Creative Asset Synth' },
  { name: 'Runway Gen-3', type: 'AI Video Synthesis' },
  { name: 'Figma', type: 'Design System & UX' },
  { name: 'React / Vite', type: 'Frontend Framework' },
  { name: 'Framer Motion', type: 'Micro-Animations' },
  { name: 'AI Pair-Coding', type: 'Vibe-Coded Shipping' }
];

export default function About() {
  return (
    <section className="relative min-h-screen bg-paper text-ink pt-32 md:pt-8 pb-20 px-6 md:px-12 lg:px-24">
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

        {/* Section 2: Origin & Location (Kerala) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 bg-cream rounded-[32px] p-8 md:p-12 border border-line">
          <div className="lg:col-span-7 space-y-6 order-last lg:order-first">
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase font-mono block">
              Our Roots
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
              Made in Kerala. Serving founders globally.
            </h2>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Jellycut is proudly based in Kooriyad, Kerala — a lush tropical hub of tech talent, design heritage, and creative expression. 
            </p>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Operating fully remote, we serve clients across the US, UK, and Europe. We have structured our workflows around async collaboration, meaning you get detailed progress logs and drafts in your inbox without having to coordinate time-zone calls.
            </p>
            <a 
              href="https://maps.app.goo.gl/FW4w87cYtvGjYMHN6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-ink hover:text-jelly-deep transition-colors font-mono mt-4 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-jelly" />
              <span>Kooriyad, Kerala, India (IST // UTC+5:30)</span>
            </a>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <img
              src="https://playground.bravebrand.com/assets/backgrounds/signal-foundry-pixel-flower.webp"
              alt="Botanical design mark representing Kerala"
              className="max-h-[320px] object-contain mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Section 3: Tech Stack */}
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
            {stack.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-line rounded-2xl p-5 flex flex-col justify-between min-h-[120px] hover:border-jelly transition-colors duration-300"
              >
                <div className="bg-cream rounded-lg p-2 w-fit mb-4">
                  <Cpu className="w-4 h-4 text-jelly-deep" />
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">{item.name}</div>
                  <div className="text-[10px] text-muted uppercase font-mono tracking-wider mt-1">{item.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Guarantees */}
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
                <div key={idx} className="bg-white border border-line rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-jelly/10 text-jelly-deep p-3 rounded-2xl w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
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
