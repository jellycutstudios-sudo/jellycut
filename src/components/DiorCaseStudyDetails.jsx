import BeforeAfterSlider from './BeforeAfterSlider';
import { Eye, Film, Layers, Sliders, AlertCircle } from 'lucide-react';

export default function DiorCaseStudyDetails({ project, onZoomIndex }) {
  if (!project) return null;

  return (
    <div className="space-y-12 border-t border-line pt-10">
      
      {/* 1. Visual Engineering Breakdown */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-jelly" />
          <span>Visual Engineering Breakdown</span>
        </h3>
        
        <div className="bg-cream/35 border border-line/45 rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-ink uppercase tracking-wide mb-2 font-mono">The Vision</h4>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans">
              {project.breakdown?.vision}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-line/45 pt-6">
            {project.breakdown?.technicalFocus.map((focus, idx) => (
              <div key={idx} className="space-y-2 bg-white rounded-2xl p-5 border border-line/30 shadow-sm hover:border-jelly-mid/20 transition-colors">
                <div className="flex items-center gap-2">
                  {idx === 0 ? (
                    <Sliders className="w-4 h-4 text-jelly-deep" />
                  ) : (
                    <Film className="w-4 h-4 text-jelly-deep" />
                  )}
                  <h5 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                    {focus.title}
                  </h5>
                </div>
                <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                  {focus.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Storyboard Section */}
      {project.storyboard && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono flex items-center gap-1.5">
            <Film className="w-4 h-4 text-jelly" />
            <span>CGI Layout Storyboard</span>
          </h3>

          <div 
            onClick={() => onZoomIndex(3)} // Index of storyboard in images array
            className="group relative rounded-3xl overflow-hidden border border-line cursor-zoom-in shadow-md bg-cream/30 aspect-[16/10] md:aspect-[16/9]"
          >
            <img 
              src={project.storyboard} 
              alt="Dior Chessboard Storyboard" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
              <button className="bg-white/90 group-hover:bg-white text-ink rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider font-mono shadow-md flex items-center gap-1.5 transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                <Eye className="w-3.5 h-3.5" />
                <span>Zoom Storyboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Behind The Scenes Slider */}
      {project.behindTheScenes && (
        <BeforeAfterSlider 
          clayImage={project.behindTheScenes.clay}
          finalImage={project.behindTheScenes.final}
          description={project.behindTheScenes.desc}
        />
      )}

      {/* 4. High-Res Styleframes */}
      {project.styleframes && project.styleframes.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-jelly" />
            <span>High-Res Styleframes (4K CGI Stills)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.styleframes.map((frame, idx) => (
              <div 
                key={idx}
                onClick={() => onZoomIndex(idx)}
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

      {/* 5. Speculative Concept Disclaimer */}
      {project.disclaimer && (
        <div className="bg-cream/20 border border-line/30 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted font-light leading-relaxed font-sans">
            <strong className="font-semibold text-ink">Disclaimer:</strong> {project.disclaimer}
          </p>
        </div>
      )}

    </div>
  );
}
