import { ArrowRight, ShieldCheck, Download, Smartphone, MapPin, Award, Car, ZoomIn } from 'lucide-react';

export default function MaptoCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  return (
    <div className="space-y-16 pt-4 pb-12">
      
      {/* Brand Aim (Sleek Typography) */}
      <div className="space-y-6">
        <h2 className="font-serif text-3xl md:text-5xl text-ink leading-tight font-normal tracking-tight">
          Mobility Revolution
        </h2>
        <div className="space-y-4">
          <p className="text-ink text-lg md:text-xl font-light leading-relaxed font-sans">
            Mapto is a modern mobility platform designed to revolutionize urban transit by providing fast, reliable, and premium rides for every commuter.
          </p>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed font-sans">
            Inspired by industry leaders, Mapto delivers versatile transport options—from everyday city taxis to executive black cars and airport transfers. Our goal was to craft an authoritative brand presence that establishes instant trust.
          </p>
        </div>
      </div>

      {/* Cinematic Large Image Showcase */}
      <div className="space-y-10">
        
        {/* Image 1: Rooftop Illuminated Taxi Light */}
        <div 
          onClick={() => onZoomIndex && onZoomIndex(0)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-black"
        >
          <img 
            src="/mapto_night_taxi.jpg" 
            alt="Mapto Illuminated Taxi Roof Light on City Street" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>

        {/* Image 2: Interactive Lobby Touchscreen Kiosk */}
        <div 
          onClick={() => onZoomIndex && onZoomIndex(1)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-ink"
        >
          <img 
            src="/mapto_lobby_kiosk.jpg" 
            alt="Mapto Interactive Self-Service Booking Terminal in Corporate Lobby" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>

        {/* Image 3: Executive Chauffeur & Mercedes */}
        <div 
          onClick={() => onZoomIndex && onZoomIndex(2)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-ink"
        >
          <img 
            src="/mapto_driver.jpg" 
            alt="Mapto Executive Chauffeur & Premium Black Car" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>

        {/* Image 4: Uniformed Station Ground Crew */}
        <div 
          onClick={() => onZoomIndex && onZoomIndex(3)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-white"
        >
          <img 
            src="/mapto_team.jpg" 
            alt="Mapto Uniformed Ground Logistics Team at Pick-up Station" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>

        {/* Image 5: Airport Transfer Glass Kiosk */}
        <div 
          onClick={() => onZoomIndex && onZoomIndex(4)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-white"
        >
          <img 
            src="/mapto_airport.jpg" 
            alt="Mapto Airport Terminal Wayfinding Kiosk" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>

      </div>

      {/* Visual Identity & System Breakdown */}
      <div className="space-y-10">
        <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal tracking-tight">
          Visual Identity & System Architecture
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          <div className="space-y-3 border-t border-line/60 pt-6">
            <div className="flex items-center gap-2 text-jelly-deep">
              <MapPin className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-ink">
                01 // Dynamic Mark
              </h4>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              The logo fuses the universal map pin with clean geometric contours, symbolizing accurate pick-ups, transparent routing, and forward momentum across mobile screens and vehicle decals.
            </p>
          </div>

          <div className="space-y-3 border-t border-line/60 pt-6">
            <div className="flex items-center gap-2 text-jelly-deep">
              <Smartphone className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-ink">
                02 // App-First Design System
              </h4>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Engineered specifically for low-latency in-transit interactions: high contrast ride cards, clear driver ETA indicators, and instant live vehicle tracking optimized for bright outdoor daylight.
            </p>
          </div>
          
          <div className="space-y-3 border-t border-line/60 pt-6">
            <div className="flex items-center gap-2 text-jelly-deep">
              <Car className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-ink">
                03 // Fleet & Physical Touchpoints
              </h4>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              From electric city sedans to airport terminal digital kiosks, the brand guidelines dictate uniform vehicle liveries, top-light signages, and ground crew apparel that command street presence.
            </p>
          </div>

          <div className="space-y-3 border-t border-line/60 pt-6">
            <div className="flex items-center gap-2 text-jelly-deep">
              <Award className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-ink">
                04 // Global Trust Standard
              </h4>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              By replacing chaotic regional branding with a unified corporate aesthetic, Mapto established instant credibility for corporate accounts, executive travel, and daily commuters alike.
            </p>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-ink rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center text-center gap-8 shadow-2xl text-white">
        <div className="space-y-3 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight font-normal">
            Experience the Platform
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
            The brand identity and design system are live across passenger and partner Android applications.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="https://play.google.com/store/apps/details?id=com.mapto&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-white hover:bg-cream text-ink rounded-full px-8 py-4 transition-transform hover:scale-105 shadow-md font-semibold text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Passenger App</span>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.mapto.driver&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-transparent border border-white/30 hover:border-white text-white rounded-full px-8 py-4 transition-transform hover:scale-105 font-semibold text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Driver Partner</span>
          </a>
        </div>
      </div>

      {/* Market Impact */}
      <div className="space-y-6 pb-6 border-b border-line/40">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-tight font-normal tracking-tight flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-jelly-deep flex-shrink-0" />
          <span>Market Impact</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <p className="text-ink text-base md:text-lg font-light leading-relaxed font-sans">
            By executing an international-standard identity across every physical and digital touchpoint, Mapto elevated its perception from a local taxi operator into a modern mobility network.
          </p>
          <div className="border-l border-ink/20 pl-6 flex flex-col justify-center">
            <div className="text-2xl font-bold font-serif text-ink">Enterprise-Grade Trust</div>
            <div className="text-sm text-muted font-light mt-1">Accelerated corporate partnerships, driver onboarding, and airport transfer bookings from day one.</div>
          </div>
        </div>
      </div>

      {/* Minimal CTA */}
      <div className="text-center space-y-6 pt-4">
        <h3 className="font-serif text-2xl md:text-3xl text-ink font-normal leading-tight">
          Ready to elevate your brand identity?
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-ink hover:bg-ink/90 text-white rounded-full px-8 py-4 text-xs md:text-sm font-bold tracking-wide transition-all inline-flex items-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 mx-auto"
        >
          <span>Start Your Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
