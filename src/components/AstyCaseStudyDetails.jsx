import { 
  Building2, 
  Layers, 
  Hammer, 
  Compass, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  ZoomIn, 
  CheckCircle2, 
  ShieldCheck, 
  Ruler, 
  HardHat, 
  Trees, 
  ExternalLink 
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

  const pillars = [
    {
      num: '01',
      title: 'Turnkey Construction & Civil Engineering',
      tagline: 'Precision Execution from Foundation to Finish',
      desc: 'Executing high-end residential estates, commercial hubs, and bespoke villas with rigorous structural engineering discipline, zero material compromise, and strict milestone timelines.',
      icon: HardHat,
    },
    {
      num: '02',
      title: 'Bespoke Architectural Interiors',
      tagline: 'Warm Travertine, Fine Woods & Ambient Light',
      desc: 'Transforming empty volumes into soulful, liveable spaces through custom millwork, curated lighting architecture, tactile natural finishes, and seamless indoor-outdoor tropical flow.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Heavy Structural Steel Fabrication',
      tagline: 'Industrial Strength meets Architectural Elegance',
      desc: 'Specialized fabrication of long-span structural trusses, architectural steel facades, custom pergolas, cantilevered staircases, and heavy-duty industrial framing.',
      icon: Hammer,
    },
    {
      num: '04',
      title: 'Project Management & Consultation (PMC)',
      tagline: 'End-to-End Governance & Quality Assurance',
      desc: 'Guiding homeowners, developers, and institutional clients through budgeting, architectural validation, vendor procurement, MEP coordination, and site quality control.',
      icon: Compass,
    },
  ];

  const brandTouchpoints = [
    {
      title: 'Monolithic Architectural Wayfinding',
      material: 'Cast Concrete & Matte Powder-Coated Steel',
      desc: 'Directional monoliths, room identification plaques, and entrance gate monuments that blend naturally into raw stone masonry and tropical Kerala landscapes.'
    },
    {
      title: 'Corporate Experience Center & Lobby',
      material: 'Chiseled Basalt, Fluted Oak & Architectural Typography',
      desc: 'A physical brand statement designed to greet premium clients with timeless gravitas, balanced textures, and restrained luxury.'
    },
    {
      title: 'Heavy Fleet & On-Site Construction Signage',
      material: 'Weatherproof Heavy-Duty Vinyl & Scaffolding Mesh',
      desc: 'Transforming commercial utility vehicles and active construction sites into dynamic, high-visibility brand ambassadors across Kerala.'
    },
    {
      title: 'Editorial Print & Monograph Lookbook',
      material: 'Uncoated Tactile Cotton Stock with Minimalist Layouts',
      desc: 'Showcasing completed residential and commercial projects through disciplined editorial spreads: Kerala Rooted, Globally Inspired.'
    }
  ];

  return (
    <div className="space-y-16 pt-4 pb-12">
      
      {/* ── Brand Narrative & Philosophy ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-jelly-deep/60" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-jelly-deep">
            Architecture • Construction • Steel Fabrication • PMC
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.15] font-normal tracking-tight">
          We Build and Deliver with Engineering Discipline.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
          <p className="md:col-span-7 text-ink text-base md:text-lg font-light leading-relaxed font-sans">
            <strong className="font-semibold text-ink">asty</strong> is a progressive construction, interior architecture, structural steel fabrication, and project management consultation firm based in Kerala, India. Rooted in regional vernacular craftsmanship yet inspired by global brutalist and tropical modernism, asty creates built environments designed for enduring longevity.
          </p>
          <p className="md:col-span-5 text-muted text-sm md:text-base font-light leading-relaxed font-sans bg-cream/40 p-5 rounded-2xl border border-line/50">
            Jellycut Studio was commissioned to formulate asty’s complete brand universe — from the geometric architectural logomark and physical wayfinding system to heavy fleet liveries, experience centre spatial branding, and high-touch editorial lookbooks.
          </p>
        </div>
      </div>

      {/* ── Visual Showcase Gallery (Click to Zoom Lightbox) ── */}
      <div className="space-y-10">
        
        {/* Showcase Item 1: Reception Lobby Interior */}
        <div 
          onClick={() => onZoomIndex && onZoomIndex(0)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#131715]"
        >
          <img 
            src="/asty_reception_lobby.webp" 
            alt="asty Construction Corporate Experience Center Reception & Lobby Interior" 
            className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block">
                01 // Spatial Branding
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Corporate Experience Center &amp; Reception Lobby
              </h3>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                Matte black architectural logo typography offset against warm limestone plaster, fluted timber dividers, and a monolithic chiseled stone reception island.
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
              <ZoomIn className="w-3.5 h-3.5 text-[#a8c7b4]" />
              <span>Expand Preview</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Granite Entrance & Sandstone Stele */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Showcase Item 2: Granite Entrance Monument */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(1)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#131715]"
          >
            <img 
              src="/asty_granite_entrance_wall.webp" 
              alt="asty Construction Textured Granite Entrance Wall and Modern Villa" 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                02 // Brutalist Masonry
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                Textured Granite Entrance Monument
              </h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">
                Brushed metallic dimensional logo mounted on rugged textured basalt stone framing a private estate driveway.
              </p>
            </div>
          </div>

          {/* Showcase Item 3: Sandstone Stele */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(5)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#151a17]"
          >
            <img 
              src="/asty_sandstone_stele.webp" 
              alt="asty Construction Sandstone Entrance Stele and Tropical Landscape" 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                03 // Natural Stone Stele
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                Sandstone Wayfinding Stele
              </h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">
                Honed travertine monolith integrated with laterite masonry and Kerala tropical vegetation.
              </p>
            </div>
          </div>

        </div>

        {/* Showcase Item 4: Active Jobsite Perimeter Wall */}
        <div 
          onClick={() => onZoomIndex && onZoomIndex(2)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#181d19]"
        >
          <img 
            src="/asty_site_perimeter_wall.webp" 
            alt="asty Construction Active Site Perimeter Wall - Crafting Lasting Spaces / Built With Purpose" 
            className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block">
                04 // Job-Site Architecture
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Active Jobsite Perimeter Wall &amp; Scaffolding Signage
              </h3>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                Crisp brand typography across rendered boundary walls (&ldquo;Crafting Lasting Spaces • Built With Purpose&rdquo;) framing a multi-level concrete villa build in progress.
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
              <ZoomIn className="w-3.5 h-3.5 text-[#a8c7b4]" />
              <span>Expand Preview</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Safety Gear & Fleet Truck */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Showcase Item 5: Safety Helmet & Workwear */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(3)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#131715]"
          >
            <img 
              src="/asty_helmet_workwear.webp" 
              alt="asty Engineering Hard Hat and Embroidered Field Workwear Uniform" 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                05 // Field Workwear & Safety
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                Engineering Safety Gear &amp; Uniforms
              </h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">
                Heavy-duty impact safety helmets and deep forest green embroidered field shirts built for site engineers.
              </p>
            </div>
          </div>

          {/* Showcase Item 6: Fleet Truck */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(7)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#1c1f1c]"
          >
            <img 
              src="/asty_fleet_truck.webp" 
              alt="asty Construction Commercial Fleet Livery and Scaffolding Banner" 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                06 // Heavy Fleet Livery
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                4x4 Utility Fleet &amp; Scaffolding
              </h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">
                Commercial pickup livery featuring the racing accent stripe and heavy-gauge site scaffolding banners.
              </p>
            </div>
          </div>

        </div>

        {/* Showcase Item 7: Villa Gateway */}
        <div 
          onClick={() => onZoomIndex && onZoomIndex(4)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#151a17]"
        >
          <img 
            src="/asty_villa_gateway.webp" 
            alt="asty Construction Exterior Architectural Gate & Monolith Monument Signage" 
            className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block">
                07 // Landscape Architecture
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Architectural Gateway &amp; Landscape Integration
              </h3>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                Ground-illuminated cast stone entrance monument harmonized with Kerala laterite stonework, lush tropical foliage, and modern cantilevered concrete eaves.
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
              <ZoomIn className="w-3.5 h-3.5 text-[#a8c7b4]" />
              <span>Expand Preview</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Collateral Grid & Signage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Showcase Item 8: Collateral Grid */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(6)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#131715]"
          >
            <img 
              src="/asty_collateral_grid.webp" 
              alt="asty Complete Identity Collateral Grid - Stationery, Tote Bags, Site Banners, Vehicle Liveries" 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                08 // Identity Collateral
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                Stationery &amp; Merchandising Suite
              </h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">
                Executive folders, textured business cards, corporate tote bags, and outdoor architectural pole flags.
              </p>
            </div>
          </div>

          {/* Showcase Item 9: Wayfinding Grid */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(8)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#1a1b1a]"
          >
            <img 
              src="/asty_signage_grid.webp" 
              alt="asty Comprehensive Wayfinding System - Directional Bollards, Room Plaques and Blade Signs" 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8c7b4] bg-[#1a2e22]/90 px-3 py-1 rounded-full border border-[#2d4d3a]/60 inline-block w-fit">
                09 // Spatial Wayfinding
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                Wayfinding &amp; Signage System
              </h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">
                Modular suite of cast bronze, dark graphite, and sandstone markers spanning vehicular navigation and room plaques.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ── Service Capabilities Quad ── */}
      <div className="space-y-8 border-t border-line/60 pt-12">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-jelly-deep bg-cream px-3 py-1 rounded-full border border-line inline-block mb-3">
            Core Service Architecture
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal tracking-tight">
            Integrated Built-Environment Capabilities
          </h2>
          <p className="text-muted text-sm md:text-base font-light mt-2 max-w-2xl font-sans">
            asty unifies four critical pillars under one engineering-led organization, eliminating inter-vendor friction and cost overruns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.num}
                className="bg-white rounded-3xl p-7 md:p-8 border border-line shadow-sm hover:border-jelly-deep/40 hover:shadow-md transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cream border border-line flex items-center justify-center text-jelly-deep group-hover:bg-ink group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted/60 tracking-wider">
                    {pillar.num}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl md:text-2xl text-ink font-normal leading-snug">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-jelly-deep font-mono">
                    {pillar.tagline}
                  </div>
                </div>

                <p className="text-muted text-sm font-light leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Brand System & Materials Breakdown ── */}
      <div className="space-y-8 border-t border-line/60 pt-12">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-jelly-deep bg-cream px-3 py-1 rounded-full border border-line inline-block mb-1">
            Design Philosophy
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal tracking-tight">
            Material Honesty &amp; Spatial Typography
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brandTouchpoints.map((tp, idx) => (
            <div key={idx} className="bg-cream/35 border border-line/60 rounded-3xl p-6 md:p-7 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-jelly-deep flex-shrink-0" />
                <h4 className="font-sans font-bold text-sm md:text-base text-ink">
                  {tp.title}
                </h4>
              </div>
              <div className="text-xs font-mono font-semibold text-jelly-deep/90 bg-white/70 px-3 py-1 rounded-lg border border-line/40 inline-block">
                {tp.material}
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                {tp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Direct Client & Consultation Channels ── */}
      <div className="bg-gradient-to-br from-[#121c16] via-[#1a2e22] to-[#0d1711] rounded-[2.5rem] p-8 sm:p-10 md:p-14 text-white shadow-2xl relative overflow-hidden border border-[#2d4d3a]/50">
        
        {/* Subtle geometric background motif */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d523c]/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#a8c7b4] bg-[#1f3829] px-3.5 py-1 rounded-full border border-[#376148] inline-block">
              Direct Consultation Channel
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
              Ready to Build Your Space with Discipline?
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
              Connect directly with asty’s engineering and project consultation team for residential builds, commercial spaces, turnkey interior packages, and heavy steel fabrication.
            </p>
          </div>

          {/* Quick Contact & Instagram Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            {/* Phone Call / WhatsApp */}
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

            {/* Instagram Profile */}
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

            {/* Jellycut Studio Inquiry */}
            <button
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#a8c7b4] hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer ml-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Brand Your Firm with Jellycut</span>
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}
