import { 
  ArrowRight, 
  ZoomIn, 
  Sparkles, 
  Layers, 
  Compass, 
  Box, 
  Phone, 
  ExternalLink,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function AstyCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  const mockups = [
    {
      index: 0,
      url: '/asty_reception_lobby.webp',
      tag: '01 // Spatial Identity',
      title: 'Corporate Experience Center & Lobby',
      description: 'Monolithic chiseled basalt reception desk with dimensional matte-black wall typography and warm indirect linear light.',
      colSpan: 'full'
    },
    {
      index: 1,
      url: '/asty_granite_entrance_wall.webp',
      tag: '02 // Brutalist Masonry',
      title: 'Granite Entrance Wall Monument',
      description: 'Brushed metal dimensional logomark set into rugged textured stone framing a private architectural residence.',
      colSpan: 'half'
    },
    {
      index: 5,
      url: '/asty_sandstone_stele.webp',
      tag: '03 // Natural Stone Stele',
      title: 'Sandstone Wayfinding Stele',
      description: 'Honed travertine and laterite monolith integrated seamlessly with tropical Kerala landscape greenery.',
      colSpan: 'half'
    },
    {
      index: 2,
      url: '/asty_site_perimeter_wall.webp',
      tag: '04 // Site Architecture',
      title: 'Active Jobsite Perimeter Wall',
      description: 'Crisp brand typography across rendered boundary walls — "Crafting Lasting Spaces • Built With Purpose".',
      colSpan: 'full'
    },
    {
      index: 3,
      url: '/asty_helmet_workwear.webp',
      tag: '05 // Engineering Apparel',
      title: 'Safety Gear & Field Uniforms',
      description: 'Heavy-duty impact hard hats paired with deep forest green embroidered field uniforms for site engineers.',
      colSpan: 'half'
    },
    {
      index: 7,
      url: '/asty_fleet_truck.webp',
      tag: '06 // Fleet Branding',
      title: 'Commercial 4x4 Fleet & Scaffolding',
      description: 'Commercial utility pickup vehicle livery with signature racing stripe and heavy-gauge site scaffolding banners.',
      colSpan: 'half'
    },
    {
      index: 4,
      url: '/asty_villa_gateway.webp',
      tag: '07 // Gateway Signage',
      title: 'Architectural Gateway & Landscape',
      description: 'Ground-illuminated cast concrete entrance monument framing a cantilevered tropical modern estate.',
      colSpan: 'full'
    },
    {
      index: 6,
      url: '/asty_collateral_grid.webp',
      tag: '08 // Brand Collateral',
      title: 'Stationery & Merchandising Suite',
      description: 'Executive project folders, textured business cards, corporate tote bags, and outdoor pole banners.',
      colSpan: 'half'
    },
    {
      index: 8,
      url: '/asty_signage_grid.webp',
      tag: '09 // Environmental Signage',
      title: 'Wayfinding & Directional System',
      description: 'Cast bronze, dark graphite, and sandstone markers spanning vehicular navigation and room identification.',
      colSpan: 'half'
    }
  ];

  return (
    <div className="space-y-20 pt-2 pb-16">
      
      {/* ── Section 1: The Challenge & Strategic Solution ── */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-jelly-deep/60" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-jelly-deep">
            Case Study • Brand Evolution
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.15] font-normal tracking-tight">
            Building with Discipline. Designed to Endure.
          </h2>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed font-sans max-w-3xl">
            <strong className="text-ink font-semibold">asty</strong> is a premier Kerala-based firm uniting Turnkey Construction, Bespoke Interior Architecture, Heavy Structural Steel Fabrication, and Project Management Consultation under one roof.
          </p>
        </div>

        {/* Challenge vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* The Challenge */}
          <div className="bg-[#121c16]/[0.03] border border-line/80 rounded-3xl p-7 md:p-8 space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 font-mono text-xs font-bold">
              01
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted">The Challenge</span>
              <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                Fragmented Identity Across Four Disciplines
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans">
              asty operated across four heavy, specialized verticals. Their previous brand presence was fragmented and industrial, lacking the monolithic authority, architectural sophistication, and premium trust required to win high-value bespoke villas and commercial projects across South India.
            </p>
          </div>

          {/* The Solution */}
          <div className="bg-jelly-deep/[0.04] border border-jelly-deep/20 rounded-3xl p-7 md:p-8 space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-jelly-deep/10 border border-jelly-deep/30 flex items-center justify-center text-jelly-deep font-mono text-xs font-bold">
              02
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-jelly-deep">The Solution</span>
              <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                Monolithic Architecture &amp; Material Honesty
              </h3>
            </div>
            <p className="text-ink/80 text-sm md:text-base font-light leading-relaxed font-sans">
              We formulated an unshakeable, architectural design universe rooted in Kerala modernism and brutalist material honesty. By combining disciplined geometric typography, raw stone textures, and a signature forest palette, asty now communicates uncompromising engineering rigor at every scale.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Logo Concept & Architectural Anatomy ── */}
      <section className="space-y-8 border-t border-line/60 pt-16">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-jelly-deep/60" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-jelly-deep">
              Core Identity Concept
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight font-normal tracking-tight">
            The Logomark: Geometry, Mass &amp; Precision
          </h2>
          <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans max-w-2xl">
            The wordmark was engineered from the ground up as an architectural element — designed to exist effortlessly whether cast in concrete, cut from heavy steel, or printed on uncoated cotton.
          </p>
        </div>

        {/* Concept Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-cream flex items-center justify-center text-jelly-deep border border-line/60">
              <Box className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-ink font-normal">Monolithic Form</h4>
            <p className="text-muted text-xs sm:text-sm font-light leading-relaxed font-sans">
              Clean, lowercase geometric typography establishing structural stability, balanced weight, and effortless visual permanence.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-cream flex items-center justify-center text-jelly-deep border border-line/60">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-ink font-normal">Material Honesty</h4>
            <p className="text-muted text-xs sm:text-sm font-light leading-relaxed font-sans">
              Built to interact with physical substances — dark basalt, warm travertine, patinated brass, raw concrete, and powder-coated steel.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-line shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-cream flex items-center justify-center text-jelly-deep border border-line/60">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-ink font-normal">Engineering Rigor</h4>
            <p className="text-muted text-xs sm:text-sm font-light leading-relaxed font-sans">
              Mathematical grid proportions and micro-kerning tailored for high visibility across active construction perimeters and heavy fleet utility vehicles.
            </p>
          </div>
        </div>

        {/* Architectural Palette Ribbon */}
        <div className="bg-cream/40 rounded-3xl p-6 border border-line/60 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-jelly-deep">Signature Palette</div>
            <div className="text-xs text-muted font-sans font-light">Engineered around Kerala natural stone, tropical greens, and brutalist neutrals</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#121c16] border border-line shadow-inner" />
              <span className="text-[11px] font-mono text-muted">Basalt Black</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1a2e22] border border-line shadow-inner" />
              <span className="text-[11px] font-mono text-muted">Forest Slate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#e8e4dc] border border-line shadow-inner" />
              <span className="text-[11px] font-mono text-muted">Travertine</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Curated Mockup Gallery ── */}
      <section className="space-y-8 border-t border-line/60 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-jelly-deep/60" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-jelly-deep">
                Visual Showcase
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight font-normal tracking-tight">
              Selected Identity &amp; Spatial Mockups
            </h2>
          </div>
          <span className="text-xs font-mono text-muted">Click any mockup to view high-resolution</span>
        </div>

        {/* Mockups Grid Layout */}
        <div className="space-y-8">
          {/* Full-width 1: Reception */}
          {mockups.filter(m => m.colSpan === 'full').map((m, idx) => {
            if (idx !== 0) return null;
            return (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#131715]"
              >
                <img 
                  src={m.url} 
                  alt={m.title} 
                  className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
                  <div className="space-y-1.5 max-w-xl">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block">
                      {m.tag}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                      {m.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
                    <ZoomIn className="w-3.5 h-3.5 text-[#a8c7b4]" />
                    <span>Expand View</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pair 1: Granite Entrance + Sandstone Stele */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[mockups[1], mockups[2]].map((m) => (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#131715] flex flex-col"
              >
                <div className="relative overflow-hidden flex-1">
                  <img 
                    src={m.url} 
                    alt={m.title} 
                    className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                      {m.tag}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                      {m.title}
                    </h3>
                    <p className="text-white/70 text-xs font-light leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width 2: Jobsite Perimeter */}
          {mockups.filter(m => m.colSpan === 'full').map((m, idx) => {
            if (idx !== 1) return null;
            return (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#181d19]"
              >
                <img 
                  src={m.url} 
                  alt={m.title} 
                  className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
                  <div className="space-y-1.5 max-w-xl">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block">
                      {m.tag}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                      {m.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
                    <ZoomIn className="w-3.5 h-3.5 text-[#a8c7b4]" />
                    <span>Expand View</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pair 2: Safety Apparel + Fleet Truck */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[mockups[4], mockups[5]].map((m) => (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#131715] flex flex-col"
              >
                <div className="relative overflow-hidden flex-1">
                  <img 
                    src={m.url} 
                    alt={m.title} 
                    className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                      {m.tag}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                      {m.title}
                    </h3>
                    <p className="text-white/70 text-xs font-light leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width 3: Villa Gateway */}
          {mockups.filter(m => m.colSpan === 'full').map((m, idx) => {
            if (idx !== 2) return null;
            return (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#151a17]"
              >
                <img 
                  src={m.url} 
                  alt={m.title} 
                  className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
                  <div className="space-y-1.5 max-w-xl">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block">
                      {m.tag}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                      {m.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
                    <ZoomIn className="w-3.5 h-3.5 text-[#a8c7b4]" />
                    <span>Expand View</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pair 3: Collateral Grid + Signage System */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[mockups[7], mockups[8]].map((m) => (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#131715] flex flex-col"
              >
                <div className="relative overflow-hidden flex-1">
                  <img 
                    src={m.url} 
                    alt={m.title} 
                    className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                      {m.tag}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                      {m.title}
                    </h3>
                    <p className="text-white/70 text-xs font-light leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Section 4: Project Takeaway & Impact ── */}
      <section className="bg-cream/40 border border-line/70 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-jelly-deep" />
          <h3 className="font-serif text-2xl text-ink font-normal">
            The Result: An Unshakable Brand Universe
          </h3>
        </div>
        <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans max-w-3xl">
          By translating asty's engineering precision into physical monuments, environmental wayfinding, field apparel, and high-touch collateral, Jellycut Studio equipped asty with a cohesive, timeless identity that anchors their position as the vanguard of modern turnkey construction across South India.
        </p>
      </section>

      {/* ── Section 5: Direct Inquiries & Consultation Channels ── */}
      <section className="bg-gradient-to-br from-[#121c16] via-[#1a2e22] to-[#0d1711] rounded-[2.5rem] p-8 sm:p-10 md:p-14 text-white shadow-2xl relative overflow-hidden border border-[#2d4d3a]/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d523c]/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#a8c7b4] bg-[#1f3829] px-3.5 py-1 rounded-full border border-[#376148] inline-block">
              Direct Contact
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
              Ready to Build Your Space with Discipline?
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
              Connect directly with asty’s engineering and project consultation team for residential builds, commercial spaces, and turnkey interior packages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/918129355721?text=Hello%20asty%20Constructions,%20I%20would%20like%20to%20inquire%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#121c16] hover:bg-[#e4ede7] px-6 py-4 rounded-2xl font-sans font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#1a2e22]" />
              <span>Call / WhatsApp +91 81293 55721</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://www.instagram.com/asty_constructions/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#243e2f]/80 hover:bg-[#2b4c39] text-white px-6 py-4 rounded-2xl font-sans font-medium text-sm transition-all border border-[#3b664d] hover:border-[#4d8564] hover:-translate-y-0.5"
            >
              <InstagramIcon className="w-4 h-4 text-[#a8c7b4]" />
              <span>@asty_constructions</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/50" />
            </a>

            <button
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#a8c7b4] hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer ml-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Brand Your Firm with Jellycut</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
