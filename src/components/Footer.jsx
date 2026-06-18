import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Footer({ setIsModalOpen, hideCTA }) {
  const sectionPaddingClass = hideCTA ? 'py-12 md:py-16' : 'py-28 md:py-36';
  const footerMarginClass = hideCTA ? 'mt-0' : 'mt-28 md:mt-36';

  if (hideCTA) {
    return (
      <section className={`relative ${sectionPaddingClass} px-6 md:px-12 lg:px-24 bg-paper text-ink border-t border-line w-full`}>
        {/* Footer link row */}
        <footer className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Jellycut Studios" className="h-5 w-auto object-contain" />
          </div>
          <div className="text-muted text-xs font-light text-center font-sans tracking-wide">
            Creative AI for brands that want to grow.
          </div>
          <div className="text-muted/65 text-[11px] font-mono">
            &copy; {new Date().getFullYear()} Jellycut Studios. Kerala,&nbsp;India.
          </div>
        </footer>
      </section>
    );
  }

  return (
    <section className={`relative ${sectionPaddingClass} px-6 md:px-12 lg:px-24 bg-ink text-white overflow-hidden w-full`}>
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://playground.bravebrand.com/assets/backgrounds/signal-foundry-painted-city-hero.webp"
          alt="Jellycut Studios closing background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#151313]/90 via-[#151313]/70 to-[#151313] z-5 pointer-events-none" />

      {/* CTA content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
        >
          <span className="text-jelly text-xs font-semibold tracking-widest uppercase mb-6 block font-mono">
            Ready When You Are
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1] mb-8 md:mb-10 tracking-tight max-w-3xl">
            Your next great creative is 48 hours&nbsp;away.
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-ink hover:bg-white/95 text-sm md:text-base font-semibold px-8 py-4 rounded-full transition-all shadow-lg active:scale-[0.98] cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Footer link row */}
      <footer className={`relative z-10 max-w-7xl mx-auto ${footerMarginClass} border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6`}>
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Jellycut Studios" className="h-5 w-auto object-contain brightness-0 invert" />
        </div>
        <div className="text-white/60 text-xs font-light text-center font-sans tracking-wide">
          Creative AI for brands that want to grow.
        </div>
        <div className="text-white/40 text-[11px] font-mono">
          &copy; {new Date().getFullYear()} Jellycut Studios. Kerala,&nbsp;India.
        </div>
      </footer>
    </section>
  );
}
