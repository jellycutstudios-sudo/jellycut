import { Globe, Utensils, Star, ZoomIn } from 'lucide-react';

const pillars = [
  {
    icon: '🔥',
    title: 'Authentic Preparation',
    desc: 'Every dish is slow-cooked using time-honoured Yemeni techniques, preserving the real flavours of Arabian cuisine.',
  },
  {
    icon: '🌿',
    title: 'Premium Ingredients',
    desc: 'Only the finest cuts of meat, the freshest basmati rice, and a carefully balanced blend of spices that bring lightness to Mandi aroma and taste.',
  },
  {
    icon: '✨',
    title: 'Ambience & Hospitality',
    desc: 'At Mandi Manzil, we believe in warmth and service — an environment that reflects the true spirit of Arabian dining.',
  },
];

const menuItems = [
  { name: 'Chicken Mandi',     desc: 'Classic whole-roasted chicken on fragrant basmati rice' },
  { name: 'Mutton Mandi',      desc: 'Slow-cooked tender mutton, the crown jewel of the menu' },
  { name: 'Beef Mandi',        desc: 'Rich, hearty beef with a smoky pit-roasted finish' },
  { name: 'Spicy Mandi',       desc: 'A bold, chilli-loaded twist on the traditional recipe' },
  { name: 'Alfaham Mandi',     desc: 'Charcoal-grilled chicken in the beloved Alfaham style' },
  { name: 'Honey Chilly Mandi',desc: 'Sweet heat — honey glaze meets a kick of fresh chilli' },
  { name: 'Peri Peri Mandi',   desc: 'Tangy African-inspired peri peri marinade' },
  { name: 'Green Chilly Mandi',desc: 'A fresh, herbaceous green chilli marinade for the bold' },
];

export default function MandiManzilCaseStudyDetails({ project, onZoomIndex }) {
  if (!project) return null;

  return (
    <div className="space-y-16 border-t border-line pt-10">

      {/* 1 — About the project */}
      <div className="space-y-5">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal">
          Building a Digital Home for Kerala's Favourite Arabian Kitchen
        </h2>
        <div className="bg-cream/40 border border-line/50 rounded-3xl p-6 md:p-8">
          <p className="text-ink text-base md:text-lg font-light leading-relaxed">
            Mandi Manzil has been serving authentic Yemeni Mandi since 2016 — a family of restaurants
            rooted in tradition and warmth. They needed a website that matched the richness of their
            food: cinematic, premium, and genuinely welcoming. We designed and built{' '}
            <a
              href="https://mandimanzil.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-jelly-deep font-semibold underline underline-offset-2"
            >
              mandimanzil.com
            </a>{' '}
            — a dark-gold restaurant experience that showcases their full menu, multiple Kerala
            branches, catering services, and photo gallery.
          </p>
        </div>
      </div>

      {/* ── Big Showcase Image 1: Desktop Experience ── */}
      <div className="space-y-3">
        <div 
          onClick={() => onZoomIndex && onZoomIndex(0)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#1a1008]"
        >
          <img 
            src="/mandi_desktop.jpg" 
            alt="Mandi Manzil homepage on desktop — Timeless Tastes, Shared Traditions" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>
        <p className="text-xs text-muted font-mono text-center">Desktop Hero Landing — Warm Arabian Architecture & Ambience</p>
      </div>

      {/* 2 — Three pillars */}
      <div className="space-y-5">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
          What Makes Mandi Manzil Stand Out
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-line/40 rounded-2xl p-5 space-y-2 hover:border-amber-400/40 transition-colors shadow-sm"
            >
              <span className="text-2xl">{p.icon}</span>
              <h4 className="font-semibold text-sm text-ink">{p.title}</h4>
              <p className="text-muted text-xs leading-relaxed font-light">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Big Showcase Image 2: Mobile Menu in Hand ── */}
      <div className="space-y-3">
        <div 
          onClick={() => onZoomIndex && onZoomIndex(1)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#1a1008]"
        >
          <img 
            src="/mandi_phone.jpg" 
            alt="Mandi Manzil digital menu on mobile — Discover Flavors Worth Craving" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>
        <p className="text-xs text-muted font-mono text-center">Mobile Menu Interface — High-Speed Digital Ordering Experience</p>
      </div>

      {/* 3 — Digital Menu Highlights */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal flex items-center gap-2">
          <Utensils className="w-5 h-5 text-jelly-deep flex-shrink-0" />
          The Digital Menu Experience
        </h2>
        <p className="text-muted text-sm font-light leading-relaxed max-w-2xl">
          Rather than a static PDF, we built a fully designed menu page that makes every dish feel
          craveable — complete with dish names, descriptions, and photography. Visitors can browse
          all 8 Mandi varieties before they even walk through the door.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              className="flex items-start gap-3 bg-white border border-line/40 rounded-2xl px-4 py-3 shadow-sm"
            >
              <span className="text-amber-600 font-bold text-xs font-mono mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-semibold text-sm text-ink">{item.name}</p>
                <p className="text-xs text-muted font-light leading-snug mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Big Showcase Image 3: Tablet Dining Table ── */}
      <div className="space-y-3">
        <div 
          onClick={() => onZoomIndex && onZoomIndex(2)}
          className="rounded-[2.5rem] overflow-hidden border border-line shadow-2xl group cursor-zoom-in relative bg-[#1a1008]"
        >
          <img 
            src="/mandi_tablet.jpg" 
            alt="Mandi Manzil three pillars section on tablet at dining table" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand</span>
          </div>
        </div>
        <p className="text-xs text-muted font-mono text-center">Tablet UI — Interactive Story & Culinary Pillars</p>
      </div>

      {/* 4 — What we built */}
      <div className="space-y-5">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal">
          What We Built
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Platform',    value: 'WordPress + Astra Theme (custom)' },
            { label: 'Pages',       value: 'Home, About, Menu, Branches, Gallery, Contact' },
            { label: 'Menu',        value: '8 Mandi varieties with descriptions' },
            { label: 'Timeline',    value: '1 Week' },
            { label: 'Design Style',value: 'Dark charcoal + gold — premium restaurant aesthetic' },
            { label: 'Live at',     value: 'mandimanzil.com' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-line/40 rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted font-mono">{label}</p>
              <p className="text-sm font-semibold text-ink mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5 — CTA */}
      <div className="bg-[#2c2926] rounded-3xl p-8 text-center space-y-4 shadow-xl">
        <p className="text-amber-400 text-xs font-mono font-semibold uppercase tracking-widest">
          Live Website
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-snug">
          Timeless Tastes, Shared Traditions
        </h3>
        <p className="text-white/60 text-sm font-light max-w-sm mx-auto">
          Visit the live site to explore the full menu, find a branch near you, and book a table.
        </p>
        <a
          href="https://mandimanzil.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#2c2926] font-bold text-sm px-6 py-3.5 rounded-full transition-all shadow-md hover:scale-105"
        >
          <Globe className="w-4 h-4" />
          <span>Visit Mandimanzil.com</span>
        </a>
      </div>

    </div>
  );
}
