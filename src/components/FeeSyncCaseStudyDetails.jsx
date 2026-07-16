import { Layers, TrendingUp, Sparkles, ArrowRight, Eye, Zap, ShieldCheck } from 'lucide-react';

export default function FeeSyncCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  return (
    <div className="space-y-12 border-t border-line pt-10">
      
      {/* Section 1: The Objective */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
          The Objective: Designing the Future of Automated Recurring Billing
        </h2>
        <div className="bg-cream/35 border border-line/45 rounded-3xl p-6 md:p-8">
          <p className="text-ink text-base md:text-lg font-light leading-relaxed font-sans">
            Invoicing, manual tracking, and constantly chasing customers for recurring payments are significant friction points for service businesses and communities. FeeSync solves this by automating weekly and monthly collections. The objective was to build a premium web presence at <a href="https://feesync.com/" target="_blank" rel="noopener noreferrer" className="text-jelly-deep font-semibold underline">feesync.com</a> that instantly communicates this simplicity, builds high-trust authority, and seamlessly guides visitors into the dashboard onboarding flow.
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
            We developed a cinematic web experience combined with a highly intuitive dashboard layout:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Detail 1 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Zap className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Sub-Second Page Speed
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                By optimizing assets and implementing custom CSS transition layouts, the marketing site loads almost instantly, maximizing user retention and sign-up conversions.
              </p>
            </div>

            {/* Detail 2 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  Modern Dashboard UI
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                Designed a clean dashboard that lets admins schedule automatic payment request triggers, view billing calendars, and track collection rates with zero training.
              </p>
            </div>

            {/* Detail 3 */}
            <div className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-jelly-deep" />
                <h4 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  High-Trust Security Feel
                </h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                Used elegant deep blues, crisp typography, and micro-interactions to reinforce trust. The community setup flow makes launching branded collection spaces simple.
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

      {/* Section 4: Why This Works */}
      <div className="space-y-6 border-t border-line/50 pt-10">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-jelly flex-shrink-0" />
          <span>Why the FeeSync Platform Converts</span>
        </h2>
        
        <div className="bg-cream/20 border border-line/30 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider font-mono">
              AEO FAQ: How does FeeSync streamline client payments?
            </h4>
            <p className="text-ink text-base font-light leading-relaxed font-sans">
              FeeSync removes the human friction of billing by letting service business owners and creators build subscription tiers once. The site and dashboard automate payments on weekly or monthly cadences, handling payment retries and communication seamlessly. With instant payment links and customized brand spaces, client retention increases while time spent on administrative billing tasks drops to near zero.
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
              Ready to Automate Your Business?
            </h3>
            <p className="text-white/70 text-sm md:text-base font-light">
              Are you looking to launch a high-converting marketing site, a modern subscription platform, or an interactive client dashboard? Jellycut Studios designs and ships premium platforms in days.
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
