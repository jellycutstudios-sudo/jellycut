import { 
  Compass, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  ZoomIn, 
  FileText, 
  MessageSquare, 
  Star,
  CheckCircle2
} from 'lucide-react';

const packagesList = [
  {
    name: 'Unforgettable Uzbekistan',
    badge: 'Best Seller',
    region: 'Central Asia • Silk Road',
    duration: '3 Nights / 4 Days',
    price: 'AED 1,699',
    rating: '4.9',
    highlights: ['Registan Square', 'Khast Imam Complex (Oldest Quran)', 'Chorsu Bazaar', 'Bukhara Old Town']
  },
  {
    name: 'Armenia Revealed',
    badge: 'Cultural Gem',
    region: 'Caucasus Mountains',
    duration: '6 Nights / 7 Days',
    price: 'AED 2,899',
    rating: '4.8',
    highlights: ['Geghard Monastery', 'Garni Greco-Roman Temple', 'Lake Sevan', 'Yerevan Cascade']
  },
  {
    name: 'Thailand Escape',
    badge: 'Most Popular',
    region: 'Southeast Asia',
    duration: '7 Nights / 8 Days',
    price: 'AED 2,699',
    rating: '4.9',
    highlights: ['Grand Palace Bangkok', 'Phi Phi Islands Cruise', 'Elephant Sanctuary', 'Phuket Old Town']
  },
  {
    name: 'Georgia Discovery',
    badge: 'Trending',
    region: 'Caucasus Mountains',
    duration: '5 Nights / 6 Days',
    price: 'AED 1,999',
    rating: '4.8',
    highlights: ['Gergeti Trinity Church', 'Mtskheta UNESCO Old City', 'Sighnaghi Wine Town', 'Kazbegi Peaks']
  }
];

const visaServices = [
  { country: 'Schengen (Europe)', type: 'Short-Stay C Visa (26 Countries)', turnaround: '10–15 Days', fee: 'AED 500' },
  { country: 'United States', type: 'B1/B2 Tourist & Business', turnaround: '15–30 Days', fee: 'AED 800' },
  { country: 'New Zealand', type: 'Visitor Visa (Online)', turnaround: '7–10 Days', fee: 'AED 450' },
  { country: 'Uzbekistan / Azerbaijan', type: 'Instant e-Visa Assistance', turnaround: '2–3 Days', fee: 'AED 100–150' },
];

const designPillars = [
  {
    icon: Compass,
    title: 'Silk Road & Luxury Palette',
    desc: 'Deep emerald greens (#0D2818) and warm antique gold accents reflect the prestige of Arabian heritage and international discovery.'
  },
  {
    icon: Clock,
    title: 'Real-Time UAE Timezone Sync',
    desc: 'A dynamic live Sharjah/Dubai clock in the mobile drawer provides instant situational awareness for expatriate and resident travellers.'
  },
  {
    icon: MessageSquare,
    title: 'Zero-Friction WhatsApp Flow',
    desc: 'Every itinerary and visa tier features instant direct-to-consultant WhatsApp deep links, removing cumbersome enquiry forms.'
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Credential Architecture',
    desc: 'Highlighting 6+ years of licensed UAE tourism expertise and 5,000+ happy travellers with prominent trust badges and verified stats.'
  }
];

export default function SkylightCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  return (
    <div className="space-y-16 border-t border-line pt-10 font-sans text-ink">

      {/* ── 1. Brand Heritage & The Rebrand ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800 font-mono">
            Client Case Study • Travel &amp; Hospitality
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight font-normal">
          From Highsky Travels to Skylight: Elevating UAE's Trusted Travel Agency into a Digital Luxury Brand
        </h2>

        <div className="bg-emerald-950/5 border border-emerald-900/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <p className="text-ink text-base sm:text-lg font-light leading-relaxed">
            In 2020, a small, dedicated team in Sharjah founded <strong>Highsky Travels</strong> with a singular mission: every UAE family deserves to explore the world without the stress of navigating complicated visa regulations and confusing tour packages alone.
          </p>
          <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
            Fast forward to 2026: with over <strong>5,000+ UAE families served</strong> and 50+ global destinations unlocked, the company rebranded to <strong>Skylight Travel</strong> (<a href="https://www.skylighttourism.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold underline underline-offset-4 hover:text-emerald-900">skylighttourism.com</a>). Jellycut Studios was commissioned to architect and build a digital flagship experience that balances Arabian hospitality, high-converting package discovery, and crystal-clear visa assistance.
          </p>
        </div>

        {/* Live Website Link Badge */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://www.skylighttourism.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-emerald-900 text-white hover:bg-emerald-800 transition-colors px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider font-mono shadow-md group"
          >
            <span>Visit Live Platform</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <span className="text-xs text-muted font-mono">
            📍 Sharjah, United Arab Emirates • Multilingual Ready
          </span>
        </div>
      </div>

      {/* ── 2. Showcase Image 1: VIP Lounge Experience ── */}
      <div className="space-y-3">
        <div 
          onClick={() => onZoomIndex && onZoomIndex(0)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#06180f]"
        >
          <img 
            src="/skylight_lounge_hero.webp" 
            alt="Skylight Travel website on desktop in luxury VIP airport lounge" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/75 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand high-res</span>
          </div>
        </div>
        <p className="text-xs text-muted font-mono text-center">
          Desktop Experience — Framed in a VIP Airport Departure Lounge with Emirates Jets &amp; Arabian Gold Accents
        </p>
      </div>

      {/* ── 3. Four Core Pillars ── */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl sm:text-3xl text-ink leading-snug font-normal flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Strategic Design &amp; Feature Highlights</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {designPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-line/60 rounded-3xl p-6 space-y-3 hover:border-emerald-700/40 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-base text-ink">{pillar.title}</h4>
                <p className="text-muted text-xs sm:text-sm font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. Showcase Image 2: Mobile Stills Side-by-Side ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl text-ink font-normal">
            Mobile-First Architecture &amp; Fluid Drawer Navigation
          </h3>
          <span className="text-xs font-mono text-muted uppercase">5G Optimised</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mobile Hero */}
          <div className="space-y-2">
            <div 
              onClick={() => onZoomIndex && onZoomIndex(3)}
              className="rounded-[2rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#0a1f14]"
            >
              <img 
                src="/skylight_hero_mobile.webp" 
                alt="Skylight mobile landing page with The World Awaits hero" 
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3 h-3" />
                <span>Zoom</span>
              </div>
            </div>
            <p className="text-xs text-muted font-mono text-center">Mobile Hero Screen — "The World Awaits"</p>
          </div>

          {/* Mobile Drawer */}
          <div className="space-y-2">
            <div 
              onClick={() => onZoomIndex && onZoomIndex(4)}
              className="rounded-[2rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#0a1f14]"
            >
              <img 
                src="/skylight_nav_mobile.webp" 
                alt="Skylight mobile navigation menu with live UAE time" 
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3 h-3" />
                <span>Zoom</span>
              </div>
            </div>
            <p className="text-xs text-muted font-mono text-center">Mobile Navigation Drawer with UAE Clock &amp; Direct WhatsApp</p>
          </div>
        </div>
      </div>

      {/* ── 5. Curated Holiday Packages Showcase ── */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800 font-mono block mb-1">
              Curated Itineraries
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
              Signature Holiday Packages Catalog
            </h3>
          </div>
          <p className="text-xs text-muted font-mono">Real Packages Featured on Platform</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {packagesList.map((pkg, i) => (
            <div 
              key={i}
              className="bg-white border border-line/60 rounded-3xl p-6 space-y-4 hover:border-emerald-600/40 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="bg-emerald-950 text-emerald-200 text-[10px] font-bold uppercase tracking-wider font-mono px-3 py-1 rounded-full">
                  {pkg.badge}
                </span>
                <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{pkg.rating} Rating</span>
                </span>
              </div>

              <div>
                <h4 className="font-bold text-lg text-ink font-serif">{pkg.name}</h4>
                <p className="text-xs text-muted font-light">{pkg.region}</p>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-line/40">
                {pkg.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-ink/80 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-line/50">
                <div>
                  <span className="text-[10px] text-muted uppercase font-mono block">Starting From</span>
                  <span className="text-base font-bold text-emerald-900 font-mono">{pkg.price} <span className="text-xs font-normal text-muted">/ person</span></span>
                </div>
                <div className="text-xs font-mono text-muted bg-cream px-3 py-1.5 rounded-full border border-line/50">
                  {pkg.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Showcase Image 3: Desktop Packages Exploration ── */}
      <div className="space-y-3">
        <div 
          onClick={() => onZoomIndex && onZoomIndex(1)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#0b1f14]"
        >
          <img 
            src="/skylight_packages_desktop.webp" 
            alt="Skylight holiday packages catalog on desktop with vintage travel desk backdrop" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/75 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>
        <p className="text-xs text-muted font-mono text-center">
          Holiday Packages Explorer — Silk Road &amp; Caucasus Destinations with Antique Map &amp; Aviation Motifs
        </p>
      </div>

      {/* ── 7. Visa Intelligence & Requirements Hub ── */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800 font-mono block">
            Frictionless Travel Logistics
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <span>Transparent Visa Guidance for UAE Residents</span>
          </h3>
          <p className="text-muted text-sm font-light leading-relaxed max-w-3xl">
            One of Skylight's biggest competitive advantages is demystifying visa requirements for UAE nationals and multinational expatriates. The website organizes visas by processing time, fees, and documentation tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visaServices.map((visa, i) => (
            <div 
              key={i}
              className="bg-white border border-line/60 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm"
            >
              <div className="space-y-1">
                <h5 className="font-bold text-sm text-ink">{visa.country}</h5>
                <p className="text-xs text-muted font-light">{visa.type}</p>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 pt-1">
                  <Clock className="w-3 h-3" />
                  <span>{visa.turnaround}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-bold text-ink font-mono block bg-cream px-3 py-1.5 rounded-xl border border-line/40">
                  {visa.fee}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 8. Showcase Image 4: Trust & Heritage ── */}
      <div className="space-y-3">
        <div 
          onClick={() => onZoomIndex && onZoomIndex(2)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#131b14]"
        >
          <img 
            src="/skylight_about_desktop.webp" 
            alt="Skylight About section commemorating 6+ years serving UAE families" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/75 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>
        <p className="text-xs text-muted font-mono text-center">
          About &amp; Heritage Section — "Built on Trust, Care &amp; Dedication — 6+ Years Serving UAE Families"
        </p>
      </div>

      {/* ── 9. Verified Metrics & Impact ── */}
      <div className="bg-ink text-paper rounded-3xl p-8 md:p-12 relative overflow-hidden border border-line/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono block mb-2">
              Measurable Success
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-normal">
              Platform Performance &amp; Agency Growth
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <span className="font-serif text-3xl md:text-4xl font-normal text-emerald-300">5,000+</span>
              <p className="text-xs text-white/70 font-mono uppercase tracking-wide">UAE Travellers</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl md:text-4xl font-normal text-emerald-300">50+</span>
              <p className="text-xs text-white/70 font-mono uppercase tracking-wide">Destinations</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl md:text-4xl font-normal text-emerald-300">4.9 ★</span>
              <p className="text-xs text-white/70 font-mono uppercase tracking-wide">Client Rating</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl md:text-4xl font-normal text-emerald-300">&lt; 0.6s</span>
              <p className="text-xs text-white/70 font-mono uppercase tracking-wide">Page Load Speed</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 10. Call to Action ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-cream/60 border border-line rounded-3xl p-8">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-2xl text-ink font-normal">Ready to build a cinematic web experience?</h4>
          <p className="text-muted text-xs sm:text-sm font-light">
            We build lightning-fast web applications, brand identities, and high-impact digital platforms in 48–72 hours.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen && setIsModalOpen(true)}
          className="bg-ink hover:bg-black text-paper px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider font-mono flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
        >
          <span>Start Your Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
