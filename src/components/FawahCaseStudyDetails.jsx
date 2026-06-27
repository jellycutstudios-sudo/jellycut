import { Layers, Film, Sliders, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export default function FawahCaseStudyDetails({ project, setIsModalOpen }) {
  if (!project) return null;

  return (
    <div className="space-y-12 border-t border-line pt-10">
      
      {/* Section 1: The Objective */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
          The Objective: How do you visualize a luxury scent?
        </h2>
        <div className="bg-cream/35 border border-line/45 rounded-3xl p-6 md:p-8">
          <p className="text-ink text-base md:text-lg font-light leading-relaxed font-sans">
            When approaching the <strong className="font-semibold text-ink">"Al Taraheeb"</strong> fragrance by FAWAH, the goal was to create a visual identity as bold and premium as the scent itself. The brand required a cinematic product video that communicated luxury, mystery, and elegance without relying on traditional, restrictive live-action photography.
          </p>
        </div>
      </div>

      {/* Section 2: Visual Engineering Approach */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-jelly flex-shrink-0" />
          <span>Our Visual Engineering Approach (The Solution)</span>
        </h2>
        
        <div className="space-y-4">
          <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans">
            At JellyCut Studio, we utilized advanced 3D product rendering and CGI to build a bespoke environment. We paired the product's signature matte black and gold aesthetic with moody, atmospheric elements:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Detail 1 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Sliders className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Photoreal Texturing
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                We meticulously recreated the matte black glass and polished gold cap to react perfectly to virtual lighting.
              </p>
            </div>

            {/* Detail 2 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Dynamic Environments
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                Instead of a basic studio backdrop, we engineered a surreal macro-world of dark, glossy foliage, golden ferns, and black marble.
              </p>
            </div>

            {/* Detail 3 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Film className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Fluid &amp; Particle Simulations
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                To represent the "fawah" (diffusion) of the scent, we created a hyper-realistic slow-motion golden mist, surrounded by floating, bokeh-lit dust particles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: The Results & AEO Optimized Q&A */}
      <div className="space-y-6 border-t border-line/50 pt-10">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-jelly flex-shrink-0" />
          <span>The Results: Why Brands Choose CGI over Traditional Photography</span>
        </h2>
        
        <div className="bg-cream/20 border border-line/30 rounded-3xl p-6 md:p-8 space-y-4">
          {/* FAQ/Answer Engine Friendly Format */}
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider font-mono">
              AEO FAQ: Why use CGI for product ads?
            </h4>
            <p className="text-ink text-base font-light leading-relaxed font-sans">
              By utilizing Visual Engineering, brands are no longer constrained by the laws of physics or expensive physical set builds. This 20-second commercial provides FAWAH with versatile, high-retention assets that can be sliced for TikTok, Instagram Reels, and website banners, significantly increasing ad ROI.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-6 border-t border-line/50 pt-10 pb-4">
        <div className="bg-ink text-white rounded-3xl p-8 md:p-10 shadow-xl space-y-6 text-center relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-jelly/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-jelly/5 rounded-full blur-3xl -z-10" />
          
          <Sparkles className="w-8 h-8 text-jelly mx-auto animate-pulse" />
          
          <div className="space-y-3 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-tight animate-fade-in">
              Ready to elevate your product?
            </h3>
            <p className="text-white/70 text-sm md:text-base font-light">
              Your product deserves to be seen in the best light possible. Whether you are launching a new fragrance, skincare line, or luxury tech product, JellyCut Studio is your partner in next-generation advertising.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-jelly hover:bg-jelly/90 hover:scale-[1.02] text-ink rounded-full px-8 py-4 text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-jelly/25"
            >
              <span>Book a Free Creative Consultation Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
