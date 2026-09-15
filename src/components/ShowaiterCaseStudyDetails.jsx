import { 
  ArrowRight, 
  ZoomIn, 
  Sparkles, 
  Layers, 
  Compass, 
  Box, 
  Coffee,
  Store,
  Gift,
  CheckCircle2,
  UtensilsCrossed,
  Crown
} from 'lucide-react';

export default function ShowaiterCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  const mockups = [
    {
      index: 0,
      url: '/showaiter_gifting_bag.webp',
      tag: '01 // Packaging & Gifting',
      title: 'Luxury Confectionery Bag & Rigid Box Suite',
      description: 'Tactile uncoated ivory gift bag with grosgrain ribbon handles, deep crimson and turquoise bilingual typography, paired with authentic halwa tasting portions.',
      layout: 'hero'
    },
    {
      index: 1,
      url: '/showaiter_tasting_box.webp',
      tag: '02 // Tasting Experience',
      title: '9-Compartment Artisanal Halwa Box',
      description: 'Rigid confectionery gift box revealing nine delicately garnished halwa variations featuring authentic saffron strands, roasted pistachios, and almonds.',
      layout: 'hero'
    },
    {
      index: 2,
      url: '/showaiter_ceramic_bowl.webp',
      tag: '03 // Heritage Tableware',
      title: 'Ceramic Halwa Presentation Bowl',
      description: 'Custom porcelain serving vessel featuring a crimson domed lid with solid brass finial, turquoise rim detailing, and warm gold service spoon.',
      layout: 'pair'
    },
    {
      index: 3,
      url: '/showaiter_halwa_jar.webp',
      tag: '04 // Artisanal Packaging',
      title: 'Luxury Glass Jar & Wax Medallion',
      description: 'Wide-mouth preserve jar capped with a crimson lacquer lid, signature turquoise ribbon, and embossed gold foil palm seal.',
      layout: 'pair'
    },
    {
      index: 4,
      url: '/showaiter_luxury_box.webp',
      tag: '05 // Product Packaging',
      title: 'Two-Piece Confectionery Box',
      description: 'Tactile rigid gift box with turquoise color-block band, opening to reveal assorted freshly prepared Bahraini halwa squares.',
      layout: 'pair'
    },
    {
      index: 5,
      url: '/showaiter_gift_hamper.webp',
      tag: '06 // Royal Gifting Hamper',
      title: 'Grand Gifting Hamper & Wax-Sealed Scroll',
      description: 'Deep crimson presentation hamper containing individual halwa volumes, paired with a custom thank-you scroll secured by a gold wax palm seal.',
      layout: 'pair'
    },
    {
      index: 6,
      url: '/showaiter_interior_counter.webp',
      tag: '07 // Flagship Retail Interior',
      title: 'Boutique Experience Counter & Display Vitrines',
      description: 'Warm limestone, fluted crimson walnut paneling, brushed brass vitrines, and halo-lit Arabic brandmark creating an inviting luxury retail sanctuary.',
      layout: 'hero'
    },
    {
      index: 7,
      url: '/showaiter_hospitality_tray.webp',
      tag: '08 // Hospitality Presentation',
      title: 'Bespoke Walnut & Brass Serving Tray',
      description: 'Dark walnut serving tray with brushed brass handles and laser-engraved emblem, accompanied by traditional finjan coffee service against the Manama skyline.',
      layout: 'pair'
    },
    {
      index: 8,
      url: '/showaiter_retail_facade.webp',
      tag: '09 // Retail Architecture',
      title: 'Flagship Boutique Exterior & Signage',
      description: 'Warm limestone facade with halo-illuminated dimensional Arabic mark, arched timber portal, and illuminated interior halwa displays.',
      layout: 'pair'
    },
    {
      index: 9,
      url: '/showaiter_stationery_suite.webp',
      tag: '10 // Brand Collateral',
      title: 'Executive Stationery & Monogram Suite',
      description: 'Tactile cotton letterheads, thank-you cards, deep crimson envelopes with gold foil palm emblem, and bilingual executive cards.',
      layout: 'pair'
    },
    {
      index: 10,
      url: '/showaiter_majlis_gifting.webp',
      tag: '11 // Cultural Hospitality',
      title: 'Majlis Tabletop & Traditional Hospitality',
      description: 'Crimson and cream luxury confectionery box presented on a carved wooden majlis table alongside Arabic coffee cups and gourmet dates.',
      layout: 'pair'
    }
  ];

  const brandPillars = [
    {
      icon: Gift,
      title: 'Heritage Without Clichés',
      desc: 'Instead of relying on generic Middle Eastern ornamentation, the identity draws its character from color, material, proportion, and quiet restraint.'
    },
    {
      icon: Box,
      title: 'Tactile Packaging System',
      desc: 'Rigid boxes, glass preserve jars, porcelain serving vessels, and gift bags crafted with heavy uncoated stock, crimson lacquer, and signature turquoise accents.'
    },
    {
      icon: Store,
      title: 'Atmospheric Retail Spaces',
      desc: 'Warm limestone, dark walnut, brushed brass, and soft architectural lighting create a retail environment inspired by contemporary Bahraini architecture.'
    },
    {
      icon: Coffee,
      title: 'Contemporary Hospitality',
      desc: 'Custom wooden serving trays, porcelain bowls, and finjan cups designed to feel equally at home in royal salons and modern luxury lounges.'
    }
  ];

  return (
    <div className="space-y-20 pt-2 pb-16">
      
      {/* ── Section 1: Overview & The Challenge / Solution ── */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#8a1c27]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8a1c27]">
            Reimagining Bahraini Halwa • Contemporary Luxury
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.15] font-normal tracking-tight">
            Heritage, Without Nostalgia. Luxury, Without Excess.
          </h2>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed font-sans max-w-3xl">
            <strong className="text-ink font-semibold">Showaiter Plus</strong> is a traditional Bahraini confectionery brand specializing in world-renowned premium halwa. We were commissioned to build a visual world that respects generational culinary heritage while positioning the brand for modern luxury retail and international gifting.
          </p>
        </div>

        {/* Challenge vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* The Challenge */}
          <div className="bg-[#6e151e]/[0.03] border border-line/80 rounded-3xl p-7 md:p-8 space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#6e151e]/10 border border-[#6e151e]/20 flex items-center justify-center text-[#6e151e] font-mono text-xs font-bold">
              01
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted">The Challenge</span>
              <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                Elevating Cultural Heritage to Modern Luxury
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans">
              Traditional Gulf confectionery often relies on crowded historic ornaments or generic tourist tropes. Showaiter Plus needed an identity that felt deeply Bahraini yet clean, timeless, and sophisticated enough to sit alongside the world's most prestigious luxury food houses.
            </p>
          </div>

          {/* The Solution */}
          <div className="bg-[#00897b]/[0.04] border border-[#00897b]/20 rounded-3xl p-7 md:p-8 space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#00897b]/10 border border-[#00897b]/30 flex items-center justify-center text-[#00897b] font-mono text-xs font-bold">
              02
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00897b]">The Solution</span>
              <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                Material Restraint, Color Harmony &amp; Architectural Balance
              </h3>
            </div>
            <p className="text-ink/80 text-sm md:text-base font-light leading-relaxed font-sans">
              We developed a distinctive brand ecosystem built around deep crimson red, signature turquoise, warm ivory, and subtle brass. Rather than overt decoration, the brand draws strength from clean geometry, tactile unboxing rituals, and architectural warmth.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Creative Direction & Brand System ── */}
      <section className="space-y-8 border-t border-line/60 pt-16">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#8a1c27]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8a1c27]">
              Creative Direction
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight font-normal tracking-tight">
            The Brand Ecosystem
          </h2>
          <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans max-w-2xl">
            A cohesive design framework engineered to deliver warmth and gravitas across all physical, tactile, and spatial touchpoints.
          </p>
        </div>

        {/* Brand Touchpoints 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {brandPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 border border-line shadow-sm hover:border-[#8a1c27]/40 hover:shadow-md transition-all space-y-4 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#6e151e]/5 border border-line/60 flex items-center justify-center text-[#8a1c27] group-hover:bg-[#8a1c27] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl text-ink font-normal">{pillar.title}</h4>
                  <p className="text-muted text-xs sm:text-sm font-light leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Color & Material Palette Ribbon */}
        <div className="bg-[#f9f7f2] rounded-3xl p-6 md:p-7 border border-line/60 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8a1c27]">Signature Color &amp; Material Palette</div>
            <div className="text-xs text-muted font-sans font-light">Deep Crimson • Desert Turquoise • Warm Ivory • Brushed Brass</div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8a1c27] border border-line shadow-inner" />
              <span className="text-[11px] font-mono text-muted">Deep Red</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#009b8c] border border-line shadow-inner" />
              <span className="text-[11px] font-mono text-muted">Turquoise</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#f4eee1] border border-line shadow-inner" />
              <span className="text-[11px] font-mono text-muted">Warm Ivory</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c2a661] border border-line shadow-inner" />
              <span className="text-[11px] font-mono text-muted">Subtle Brass</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Curated Showcase Mockups ── */}
      <section className="space-y-8 border-t border-line/60 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#8a1c27]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8a1c27]">
                Complete Visual Showcase
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight font-normal tracking-tight">
              Packaging, Gifting &amp; Spatial Architecture
            </h2>
          </div>
          <span className="text-xs font-mono text-muted">Click any mockup to inspect high resolution</span>
        </div>

        {/* Mockup Flow */}
        <div className="space-y-8">
          
          {/* Mockup 1: Gifting Bag & Box (Hero Spread) */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(0)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#f4eee1]"
          >
            <img 
              src={mockups[0].url} 
              alt={mockups[0].title} 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5ce1d2] bg-[#004d40]/90 px-3 py-1 rounded-full border border-[#00796b]/60 inline-block">
                  {mockups[0].tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                  {mockups[0].title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                  {mockups[0].description}
                </p>
              </div>
              <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
                <ZoomIn className="w-3.5 h-3.5 text-[#5ce1d2]" />
                <span>Expand View</span>
              </div>
            </div>
          </div>

          {/* Mockup 2: 9-Compartment Halwa Tasting Box (Hero Spread) */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(1)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#f4eee1]"
          >
            <img 
              src={mockups[1].url} 
              alt={mockups[1].title} 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5ce1d2] bg-[#004d40]/90 px-3 py-1 rounded-full border border-[#00796b]/60 inline-block">
                  {mockups[1].tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                  {mockups[1].title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                  {mockups[1].description}
                </p>
              </div>
              <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
                <ZoomIn className="w-3.5 h-3.5 text-[#5ce1d2]" />
                <span>Expand View</span>
              </div>
            </div>
          </div>

          {/* Pair 1: Ceramic Bowl + Luxury Glass Jar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[mockups[2], mockups[3]].map((m) => (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#f4eee1] flex flex-col"
              >
                <div className="relative overflow-hidden flex-1">
                  <img 
                    src={m.url} 
                    alt={m.title} 
                    className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5ce1d2] bg-[#004d40]/90 px-3 py-1 rounded-full border border-[#00796b]/60 inline-block w-fit">
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

          {/* Pair 2: Two-Piece Box + Royal Gift Hamper */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[mockups[4], mockups[5]].map((m) => (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#f4eee1] flex flex-col"
              >
                <div className="relative overflow-hidden flex-1">
                  <img 
                    src={m.url} 
                    alt={m.title} 
                    className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5ce1d2] bg-[#004d40]/90 px-3 py-1 rounded-full border border-[#00796b]/60 inline-block w-fit">
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

          {/* Mockup 7: Flagship Retail Interior (Hero Spread) */}
          <div 
            onClick={() => onZoomIndex && onZoomIndex(6)}
            className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#f4eee1]"
          >
            <img 
              src={mockups[6].url} 
              alt={mockups[6].title} 
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5ce1d2] bg-[#004d40]/90 px-3 py-1 rounded-full border border-[#00796b]/60 inline-block">
                  {mockups[6].tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                  {mockups[6].title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                  {mockups[6].description}
                </p>
              </div>
              <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-white/10 self-start md:self-auto flex-shrink-0">
                <ZoomIn className="w-3.5 h-3.5 text-[#5ce1d2]" />
                <span>Expand View</span>
              </div>
            </div>
          </div>

          {/* Pair 3: Hospitality Tray + Retail Facade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[mockups[7], mockups[8]].map((m) => (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#1c1511] flex flex-col"
              >
                <div className="relative overflow-hidden flex-1">
                  <img 
                    src={m.url} 
                    alt={m.title} 
                    className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5ce1d2] bg-[#004d40]/90 px-3 py-1 rounded-full border border-[#00796b]/60 inline-block w-fit">
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

          {/* Pair 4: Stationery Suite + Majlis Gifting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[mockups[9], mockups[10]].map((m) => (
              <div 
                key={m.index}
                onClick={() => onZoomIndex && onZoomIndex(m.index)}
                className="rounded-[2.5rem] overflow-hidden border border-line shadow-xl group cursor-zoom-in relative bg-[#f4eee1] flex flex-col"
              >
                <div className="relative overflow-hidden flex-1">
                  <img 
                    src={m.url} 
                    alt={m.title} 
                    className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-2 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5ce1d2] bg-[#004d40]/90 px-3 py-1 rounded-full border border-[#00796b]/60 inline-block w-fit">
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

      {/* ── Section 4: Brand Impact ── */}
      <section className="bg-[#f9f7f2] border border-line/70 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#8a1c27]" />
          <h3 className="font-serif text-2xl text-ink font-normal">
            A New Benchmark in Contemporary Regional Luxury
          </h3>
        </div>
        <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans max-w-3xl">
          The final identity creates a contemporary expression of a cherished tradition — ensuring Showaiter Plus feels equally at home in traditional Bahraini hospitality settings, royal gifting ceremonies, and international luxury retail corridors.
        </p>
      </section>

      {/* ── Section 5: Studio CTA ── */}
      <section className="bg-gradient-to-br from-[#4a0d14] via-[#6e151e] to-[#0f2824] rounded-[2.5rem] p-8 sm:p-10 md:p-14 text-white shadow-2xl relative overflow-hidden border border-[#8a1c27]/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#009b8c]/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5ce1d2] bg-[#004d40]/80 px-3.5 py-1 rounded-full border border-[#00796b] inline-block">
              Brand Identity &amp; Packaging
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
              Ready to Craft a Timeless Luxury Identity?
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
              Jellycut Studios partners with heritage brands, luxury retail houses, and visionary founders to build world-class packaging, spatial experiences, and visual universes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
              className="inline-flex items-center gap-3 bg-white text-[#4a0d14] hover:bg-[#faeee5] px-7 py-4 rounded-2xl font-sans font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#6e151e]" />
              <span>Start Your Brand Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
