import { useRef, useState } from 'react';
import { Layers, ArrowLeftRight } from 'lucide-react';

// A standalone before/after slider — fully self-contained
function BeforeAfterSlider({ before, beforeLabel, after, afterLabel }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - left) / width) * 100));
    setPosition(pct);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => { isDragging.current = false; };

  const handleTouchMove = (e) => {
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden border border-line select-none bg-ink cursor-ew-resize shadow-sm"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* AFTER (base layer — full width) */}
      <img
        src={after}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* BEFORE (clipped left portion) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth || '100%' }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-20 shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-30">
          <ArrowLeftRight className="w-4 h-4 text-ink" strokeWidth={2.5} />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold font-mono px-2.5 py-1 rounded-md z-10 pointer-events-none">
        {beforeLabel}
      </div>
      <div
        className="absolute top-3 bg-jelly/90 text-ink text-[10px] font-bold font-mono px-2.5 py-1 rounded-md z-10 pointer-events-none transition-all"
        style={{ left: `calc(${position}% + 10px)`, opacity: position < 80 ? 1 : 0 }}
      >
        {afterLabel}
      </div>
    </div>
  );
}

const transformations = [
  {
    id: 1,
    title: "Dior Chessboard CGI",
    description: "Untextured 3D clay render → fully lit, cinematic CGI product shot.",
    tag: "3D Animation",
    before: "/dior_chessboard_clay.webp",
    beforeLabel: "Clay Render",
    after: "/dior_chessboard_final.webp",
    afterLabel: "Final CGI",
  },
  {
    id: 2,
    title: "Filbey's Food Campaign",
    description: "Storyboard concept frame → live-action food photography composite.",
    tag: "AI Video Ad",
    before: "/filbey_storyboard.jpg",
    beforeLabel: "Storyboard",
    after: "/filbey_detail.webp",
    afterLabel: "Final Shot",
  },
  {
    id: 3,
    title: "Mapto Brand Identity",
    description: "Brand guidelines & positioning → unified ground crew & fleet presence.",
    tag: "Brand Identity",
    before: "/mapto_brand_aim.png",
    beforeLabel: "Strategy Brief",
    after: "/mapto_team.jpg",
    afterLabel: "Final Fleet & Crew",
  },
];

export default function TransformationReel() {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-paper border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header — Aligned directly with section grid matching Latest Projects */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-paper border border-line flex items-center justify-center">
              <Layers className="w-4 h-4 text-jelly-deep" />
            </div>
            <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase font-mono">
              Process Transparency
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight font-normal mb-4">
            The Transformation Reel
          </h2>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed">
            We obsess over the process. Drag the sliders on each card to reveal exactly how raw ideas become cinematic results.
          </p>
          <div className="flex items-center gap-2 mt-4 text-xs text-muted font-mono">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Drag left/right on any image to compare</span>
          </div>
        </div>

        {/* 3 Cards Grid — Matches Latest Projects card structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {transformations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-line flex flex-col justify-between p-6 shadow-sm hover:shadow-xl hover:border-jelly-mid/40 transition-all duration-500"
            >
              {/* Card header */}
              <div className="mb-5">
                <span className="bg-jelly/15 text-jelly-deep text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold font-sans text-ink leading-snug mb-1.5">
                  {item.title}
                </h3>
                <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Comparison slider */}
              <BeforeAfterSlider
                before={item.before}
                beforeLabel={item.beforeLabel}
                after={item.after}
                afterLabel={item.afterLabel}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
