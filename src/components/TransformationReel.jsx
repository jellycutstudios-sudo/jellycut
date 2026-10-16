import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

const cards = [
  {
    id: 1,
    title: "Dior Chessboard CGI",
    description: "Fully lit, cinematic CGI visualization showcasing refractive luxury materials and dramatic studio chiaroscuro.",
    tag: "3D Animation",
    badge: "Final CGI Master",
    image: "/dior_chessboard_final.webp",
    slug: "dior-chessboard-concept",
    meta: "Photorealistic 3D · 4K Master",
  },
  {
    id: 2,
    title: "Filbey's Food Campaign",
    description: "Mouth-watering live-action food cinematography composited for dynamic product advertising and high-impact social campaigns.",
    tag: "AI Video Ad",
    badge: "Final Film Frame",
    image: "/filbey_detail.webp",
    slug: "filbey-neural-crunch",
    meta: "Cinematic Grade · Social Campaign",
  },
  {
    id: 3,
    title: "Showaiter Plus",
    description: "Traditional Bahraini confectionery heritage translated into a contemporary luxury packaging and retail experience.",
    tag: "Brand Identity",
    badge: "Luxury Brand Suite",
    image: "/showaiter_gifting_bag.webp",
    slug: "showaiter-plus-halwa-branding",
    meta: "Packaging · Retail · Gifting",
  },
];

export default function TransformationReel({ setRoute }) {
  const handleCardClick = (slug) => {
    const targetPath = `/works/${slug}`;
    if (setRoute) {
      setRoute(targetPath);
    } else {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-paper border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-paper border border-line flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-jelly-deep" />
            </div>
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase font-mono">
              Craft & Execution
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight font-normal mb-4">
            The Work, Up Close.
          </h2>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed">
            From cinematic AI video commercials to photorealistic 3D CGI and bespoke brand identities — every deliverable crafted with agency-tier polish and startup velocity.
          </p>
          <div className="flex items-center gap-2 mt-4 text-xs text-muted font-mono">
            <ArrowRight className="w-3.5 h-3.5 text-jelly-deep" />
            <span>Click any project to explore the full case study</span>
          </div>
        </div>

        {/* 3-Column Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.slug)}
              className="group bg-white rounded-3xl border border-line flex flex-col justify-between p-6 shadow-sm hover:shadow-2xl hover:border-jelly-mid/60 transition-all duration-500 cursor-pointer"
            >
              <div className="mb-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-jelly/15 text-jelly-deep text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-mono text-muted/70 flex items-center gap-1 group-hover:text-jelly-deep transition-colors">
                    <span>Explore</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
                <h3 className="text-xl font-bold font-sans text-ink leading-snug mb-2 group-hover:text-jelly-deep transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Pristine Final Version Image Frame */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-line bg-ink select-none shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                {/* Top badges */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-jelly/90 text-ink text-[10px] font-bold font-mono px-2.5 py-1 rounded-md z-10 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
                  <span>{item.badge}</span>
                </div>

                {/* Bottom meta caption */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono z-10 pointer-events-none">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px]">
                    {item.meta}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-sans font-semibold text-white/90 group-hover:text-jelly transition-colors">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
