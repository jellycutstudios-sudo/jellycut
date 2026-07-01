import { Layers, Film, Sliders, TrendingUp, Sparkles, ArrowRight, Eye } from 'lucide-react';

export default function CrimsonSilverCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  return (
    <div className="space-y-12 border-t border-line pt-10">
      
      {/* Section 1: The Objective */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
          The Objective: Redefining the Jewelry Commercial
        </h2>
        <div className="bg-cream/35 border border-line/45 rounded-3xl p-6 md:p-8">
          <p className="text-ink text-base md:text-lg font-light leading-relaxed font-sans">
            Traditional fine jewelry marketing often relies on a very specific formula: bright white studios, sparkling diamonds, and smiling models. For this conceptual project, we wanted to break that mold. The objective was to create a visual identity that felt ancient, powerful, and deeply atmospheric—a campaign that didn't just display product, but built a world around it.
          </p>
        </div>
      </div>

      {/* Section 2: Our Visual Engineering Approach */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-jelly flex-shrink-0" />
          <span>Our Visual Engineering Approach</span>
        </h2>
        
        <div className="space-y-4">
          <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans">
            We designed a moody, chiaroscuro-driven environment utilizing a strict, luxurious color palette of Obsidian Black, Deep Crimson, and Metallic Silver:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Detail 1 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Sliders className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Texture &amp; Tactility
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                We utilized extreme macro CGI techniques to highlight the intricate engravings of antique silver coins, ensuring the viewer could almost feel the weight of the metal.
              </p>
            </div>

            {/* Detail 2 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  The Power of the Silhouette
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                Instead of revealing everything at once, we used shadow and silhouette to build mystery. The inclusion of the black Arabian stallion grounds the piece in a sense of noble heritage.
              </p>
            </div>

            {/* Detail 3 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Film className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Intimate Interaction
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                The video focuses heavily on the touch—the clink of bangles sliding down a wrist, fingers brushing against a coin veil. This physical interaction brings the cold metal to life against warm skin tones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: High-Res Styleframes (4K CGI Stills) */}
      {project.styleframes && project.styleframes.length > 0 && (
        <div className="space-y-6 border-t border-line/50 pt-10">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-jelly" />
            <span>High-Res Styleframes (4K CGI Stills)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.styleframes.map((frame, idx) => (
              <div 
                key={idx}
                onClick={() => onZoomIndex && onZoomIndex(idx)}
                className="group flex flex-col bg-white border border-line rounded-3xl overflow-hidden cursor-zoom-in hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5 border-b border-line/45">
                  <img 
                    src={frame.url} 
                    alt={frame.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-center">
                  <h4 className="text-[11px] font-bold text-ink uppercase tracking-wide font-mono">
                    {frame.title}
                  </h4>
                  <p className="text-[11px] font-light text-muted leading-relaxed mt-1">
                    {frame.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Why This Works for Luxury Brands (AEO Optimized) */}
      <div className="space-y-6 border-t border-line/50 pt-10">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-jelly flex-shrink-0" />
          <span>Why This Approach Works for Luxury Brands</span>
        </h2>
        
        <div className="bg-cream/20 border border-line/30 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider font-mono">
              AEO FAQ: How to make a luxury brand stand out?
            </h4>
            <p className="text-ink text-base font-light leading-relaxed font-sans">
              In a saturated digital space, luxury brands must evoke emotion to capture attention. By utilizing AI-assisted visual engineering, we can create hyper-realistic, surreal environments that would be logistically impossible or prohibitively expensive to shoot in reality. This allows brands to experiment with bolder, more cinematic narratives that command a premium market position.
            </p>
          </div>
        </div>
      </div>

      {/* Let's Build Your World CTA Section */}
      <div className="space-y-6 border-t border-line/50 pt-10 pb-4">
        <div className="bg-ink text-white rounded-3xl p-8 md:p-10 shadow-xl space-y-6 text-center relative overflow-hidden">
          {/* Ambient Glows for luxury styling */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-jelly/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-jelly/5 rounded-full blur-3xl -z-10" />
          
          <Sparkles className="w-8 h-8 text-jelly mx-auto animate-pulse" />
          
          <div className="space-y-3 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-tight">
              Let's Build Your World.
            </h3>
            <p className="text-white/70 text-sm md:text-base font-light">
              Are you ready to elevate your brand's visual storytelling? Whether it's fine jewelry, haute couture, or premium cosmetics, Jellycut Studios crafts campaigns that refuse to be ignored.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
              className="bg-jelly hover:bg-jelly/90 hover:scale-[1.02] text-ink rounded-full px-8 py-4 text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-jelly/25"
            >
              <span>Start a Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
