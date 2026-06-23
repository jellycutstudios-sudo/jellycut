import { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function BeforeAfterSlider({ clayImage, finalImage, description }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // Left click held down
      handleMove(e.clientX);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-jelly animate-pulse" />
          <span>Interactive Behind-The-Scenes</span>
        </h4>
        <span className="text-[10px] font-mono font-medium text-jelly-deep bg-cream px-2 py-0.5 rounded-full border border-line">
          Drag Slider
        </span>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-video rounded-3xl overflow-hidden border border-line select-none shadow-lg cursor-ew-resize bg-black/10"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={(e) => handleMove(e.clientX)}
      >
        {/* Clay Render (Background) */}
        <img 
          src={clayImage} 
          alt="Clay Wireframe Render" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold font-mono px-2.5 py-1 rounded-md border border-white/10 z-10">
          Clay/Wireframe
        </div>

        {/* Final Composited Render (Foreground - Clipped with clip-path) */}
        <img 
          src={finalImage} 
          alt="Final Composited Render" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />
        <div className="absolute top-4 left-4 bg-jelly/90 text-ink text-[10px] font-bold font-mono px-2.5 py-1 rounded-md shadow-sm z-10 whitespace-nowrap">
          Final Render
        </div>

        {/* Vertical Divider Line */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-ink border-2 border-jelly flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-30 cursor-ew-resize">
            <svg 
              className="w-4 h-4 text-jelly-deep" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
            </svg>
          </div>
        </div>
      </div>

      {description && (
        <p className="text-[11px] font-light leading-relaxed text-muted italic font-sans pl-1">
          {description}
        </p>
      )}
    </div>
  );
}
