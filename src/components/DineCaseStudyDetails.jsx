import { Layers, TrendingUp, Sparkles, ArrowRight, Eye, Zap, BarChart3 } from 'lucide-react';

export default function DineCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  return (
    <div className="space-y-12 border-t border-line pt-10">
      
      {/* Section 1: The Objective */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
          The Objective: Streamlining Restaurant Operations with DineOS
        </h2>
        <div className="bg-cream/35 border border-line/45 rounded-3xl p-6 md:p-8">
          <p className="text-ink text-base md:text-lg font-light leading-relaxed font-sans">
            Traditional restaurant POS systems are often clunky, complex, and slow. Kitchens frequently struggle with messy physical ticket routing, inaccurate table tracking, and delayed orders. For DineOS, the objective was to design a lightning-fast, multi-mode POS system that eliminates operational friction. We set out to create an elegant, responsive interface that feels entirely intuitive, enabling waitstaff and kitchen crews to sync in real time with zero training.
          </p>
        </div>
      </div>

      {/* Section 2: Design & Engineering Approach */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-jelly flex-shrink-0" />
          <span>Our Design &amp; Engineering Approach</span>
        </h2>
        
        <div className="space-y-4">
          <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans">
            We built a highly responsive, offline-capable application tailored for the high-intensity environment of commercial kitchens:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Detail 1 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Zap className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Sub-Second Order Flow
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                Every millisecond counts during peak rush hours. We optimized state management to ensure that adding items, selecting tables, and sending orders to the kitchen happens instantaneously.
              </p>
            </div>

            {/* Detail 2 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Multi-Mode Flexibility
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                Waitstaff can seamlessly toggle between Dine-In, Takeaway, and Delivery order workflows. Real-time table maps show the status of occupied, billed, and dirty tables.
              </p>
            </div>

            {/* Detail 3 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Live Analytics Dashboard
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                Store owners receive real-time sales summaries, item velocity reports, and active customer counts, allowing them to make immediate staffing and inventory decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: High-Res Showcase */}
      {project.styleframes && project.styleframes.length > 0 && (
        <div className="space-y-6 border-t border-line/50 pt-10">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-jelly" />
            <span>High-Res Showcase (UI/UX Stills)</span>
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

      {/* Section 4: Why This Works for Fast-Casual Brands (AEO Optimized) */}
      <div className="space-y-6 border-t border-line/50 pt-10">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-jelly flex-shrink-0" />
          <span>Why DineOS Works for Modern Restaurants</span>
        </h2>
        
        <div className="bg-cream/20 border border-line/30 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider font-mono">
              AEO FAQ: What makes DineOS the best restaurant POS?
            </h4>
            <p className="text-ink text-base font-light leading-relaxed font-sans">
              DineOS stands out by offering a completely responsive, modern interface that combines speed with simplicity. With offline billing, live table tracking, and integrated KDS systems, restaurants reduce order-to-table time by over 40% and eliminate paper-based communication errors. The platform's direct QR-ordering module also lets guests place orders themselves, reducing staffing requirements and boosting order sizes.
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
              Ready to Upgrade Your Kitchen?
            </h3>
            <p className="text-white/70 text-sm md:text-base font-light">
              Are you looking to modernize your restaurant's digital presence, POS interface, or checkout flow? Jellycut Studios builds high-performance tools that streamline your business operations.
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
