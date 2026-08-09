import { ArrowRight, ShieldCheck, Download } from 'lucide-react';

export default function MaptoCaseStudyDetails({ project, setIsModalOpen }) {
  if (!project) return null;

  return (
    <div className="space-y-24 pt-8 pb-12">
      
      {/* Brand Aim (Sleek Typography) */}
      <div className="space-y-8">
        <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight font-normal tracking-tight">
          Mobility Revolution
        </h2>
        <div className="space-y-6 max-w-3xl">
          <p className="text-ink text-xl md:text-2xl font-light leading-relaxed font-sans">
            Mapto is a modern taxi service designed to revolutionize urban mobility by providing fast, reliable, and affordable rides for every need.
          </p>
          <p className="text-muted text-lg md:text-xl font-light leading-relaxed font-sans">
            Inspired by industry leaders, Mapto offers versatile transportation options—from cars to auto-rickshaws and bikes—catering to a wide range of commuters. Our vision is to become India's most trusted mobility platform.
          </p>
        </div>
      </div>

      {/* Cinematic Image Gallery */}
      <div className="space-y-6">
        <div className="rounded-[2rem] overflow-hidden bg-ink p-0 flex items-center justify-center shadow-2xl">
          <img 
            src="/mapto_animation.gif" 
            alt="Mapto Dynamic Animation" 
            className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        <div className="rounded-[2rem] overflow-hidden bg-ink p-12 md:p-24 flex items-center justify-center shadow-2xl">
          <img 
            src="/mapto_cover.png" 
            alt="Mapto Logo Grid and Construction" 
            className="w-full h-auto max-w-4xl object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        <div className="rounded-[2rem] overflow-hidden bg-[#111111] p-12 md:p-24 flex items-center justify-center shadow-xl">
          <img 
            src="/mapto_logo_white.png" 
            alt="Mapto White Logo Identity" 
            className="w-full h-auto max-w-2xl object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[2rem] overflow-hidden bg-ink p-0 flex items-center justify-center shadow-2xl h-full">
            <img 
              src="/mapto_mockup.png" 
              alt="Mapto Mobile App Mockup" 
              className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
          <div className="rounded-[2rem] overflow-hidden bg-[#e5e5e5] p-0 flex items-center justify-center shadow-2xl h-full">
            <img 
              src="/mapto_badge.png" 
              alt="Mapto Driver ID Badge" 
              className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>
      </div>

      {/* Visual Identity list */}
      <div className="space-y-12">
        <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal tracking-tight">
          Visual Identity & Design System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <div className="space-y-4 border-t border-ink/20 pt-6">
            <h4 className="text-sm font-bold text-ink uppercase tracking-widest font-mono">
              01 // The Mapto Logomark
            </h4>
            <p className="text-muted text-base font-light leading-relaxed">
              The logo combines a geometric map pin with dynamic mountain-like zig-zags, symbolizing both point-to-point navigation and the journey itself. Engineered to scale perfectly down to a 16px app icon.
            </p>
          </div>

          <div className="space-y-4 border-t border-ink/20 pt-6">
            <h4 className="text-sm font-bold text-ink uppercase tracking-widest font-mono">
              02 // Typography & Grids
            </h4>
            <p className="text-muted text-base font-light leading-relaxed">
              We utilized custom geometric sans-serif typography for the wordmark, drawn on a rigorous grid system ensuring a highly readable, premium feel across billboards and mobile interfaces.
            </p>
          </div>
          
          <div className="space-y-4 border-t border-ink/20 pt-6">
            <h4 className="text-sm font-bold text-ink uppercase tracking-widest font-mono">
              03 // "Uber-Level" Feel
            </h4>
            <p className="text-muted text-base font-light leading-relaxed">
              We eschewed traditional taxi yellows for a sophisticated high-contrast monochrome palette. Deep blacks and stark whites create an authoritative "black-car" aesthetic.
            </p>
          </div>

          <div className="space-y-4 border-t border-ink/20 pt-6">
            <h4 className="text-sm font-bold text-ink uppercase tracking-widest font-mono">
              04 // App-First Architecture
            </h4>
            <p className="text-muted text-base font-light leading-relaxed">
              Every brand element was designed with digital native interactions in mind—from the loading spinners to the driver tracking UI components, ensuring a cohesive ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Sleek App Download Section */}
      <div className="bg-ink rounded-[2rem] p-12 md:p-20 flex flex-col items-center text-center gap-10 shadow-2xl">
        <div className="space-y-4 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight font-normal">
            Experience the Platform
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
            The brand identity system has been fully implemented across the native mobile applications. Download the live apps now.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.mapto&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white hover:bg-cream text-ink rounded-full px-10 py-5 transition-transform hover:scale-105 w-full sm:w-64"
          >
            <Download className="w-5 h-5" />
            <span className="font-bold tracking-wide text-sm">Passenger App</span>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.mapto.driver&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-transparent border border-white/30 hover:border-white text-white rounded-full px-10 py-5 transition-transform hover:scale-105 w-full sm:w-64"
          >
            <Download className="w-5 h-5" />
            <span className="font-bold tracking-wide text-sm">Driver Partner</span>
          </a>
        </div>
      </div>

      {/* Market Impact */}
      <div className="space-y-8 pb-12 border-b border-line/40">
        <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal tracking-tight flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-ink flex-shrink-0" />
          <span>Market Impact</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <p className="text-ink text-xl md:text-2xl font-light leading-relaxed font-sans">
            By adopting a world-class, rigorous brand identity, Mapto bypassed the "local startup" perception entirely.
          </p>
          <div className="border-l border-ink/20 pl-8 flex flex-col justify-center">
            <div className="text-3xl font-bold font-serif text-ink">Trust Established</div>
            <div className="text-base text-muted font-light mt-2">Premium brand authority immediately established, positioning Mapto alongside global mobility giants.</div>
          </div>
        </div>
      </div>

      {/* Minimal CTA */}
      <div className="text-center space-y-8 pt-8">
        <h3 className="font-serif text-3xl md:text-4xl text-ink font-normal leading-tight">
          Building a platform brand?
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-ink hover:bg-ink/90 text-white rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-all inline-flex items-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 mx-auto"
        >
          <span>Start Your Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
