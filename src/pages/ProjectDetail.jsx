import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, CheckCircle, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import DiorCaseStudyDetails from '../components/DiorCaseStudyDetails';
import FawahCaseStudyDetails from '../components/FawahCaseStudyDetails';
import CrimsonSilverCaseStudyDetails from '../components/CrimsonSilverCaseStudyDetails';



export default function ProjectDetail({ project, setRoute, setIsModalOpen }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  const projectImages = useMemo(() => {
    return project?.images || (project?.image ? [project.image] : []);
  }, [project]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxImageIndex === null || projectImages.length === 0) return;
      if (e.key === 'Escape') {
        setLightboxImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxImageIndex((prev) => 
          prev === 0 ? projectImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxImageIndex((prev) => 
          prev === projectImages.length - 1 ? 0 : prev + 1
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImageIndex, projectImages]);

  if (!project) return null;

  return (
    <section className="relative min-h-screen bg-paper text-ink pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <button
          onClick={() => setRoute('/works')}
          className="group inline-flex items-center gap-2 text-xs font-semibold text-jelly-deep hover:text-ink transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>

        {/* Dynamic Title / Metadata */}
        <div className="mb-10">
          <span className="bg-cream border border-line text-jelly-deep px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider font-mono shadow-sm inline-block mb-4">
            {project.category}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] font-normal tracking-tight">
            {project.title}
          </h1>
        </div>

        {/* Hero Media Container */}
        <div 
          onClick={() => {
            if (projectImages.length > 0) {
              setLightboxImageIndex(activeImageIndex);
            }
          }}
          className={`h-[350px] md:h-[480px] bg-gradient-to-br ${project.color} rounded-[32px] relative overflow-hidden cursor-zoom-in group/header border border-line shadow-lg mb-12`}
        >
          {((project.images && project.images[activeImageIndex]) || project.image) && (
            <>
              <img 
                src={(project.images && project.images[activeImageIndex]) || project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-750 group-hover/header:scale-[1.02]" 
              />
              <div className="absolute inset-0 bg-black/25 group-hover/header:bg-black/40 transition-colors duration-300 z-0" />
            </>
          )}

          {/* Zoom button */}
          {projectImages.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex(activeImageIndex);
              }}
              className="absolute bottom-6 right-6 bg-black/60 hover:bg-black/80 hover:scale-105 text-white rounded-full p-2.5 backdrop-blur-sm border border-white/20 transition-all cursor-pointer z-20 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider font-mono"
            >
              <ZoomIn className="w-4 h-4" />
              <span>Zoom Image</span>
            </button>
          )}
        </div>

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Main Column: Challenge & Solution + Video */}
          <div className="md:col-span-8 space-y-10">
            {/* Video Embed */}
            {project.youtubeId && (
              <div className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono">Watch Campaign Video</h2>
                <div className={`relative ${project.isVertical ? 'max-w-sm mx-auto aspect-[9/16]' : 'w-full aspect-video'} rounded-3xl overflow-hidden border border-line shadow-md bg-black`}>
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&rel=0`}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Challenge & Solution */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono">The Challenge &amp; Solution</h2>
              <p className="text-ink text-base md:text-lg font-light leading-relaxed font-sans">
                {project.longDescription}
              </p>
            </div>
            {/* Dior/Fawah Specific Content or General Gallery */}
            {project.isDiorShowcase ? (
              <DiorCaseStudyDetails 
                project={project} 
                onZoomIndex={setLightboxImageIndex} 
              />
            ) : project.isFawahShowcase ? (
              <FawahCaseStudyDetails 
                project={project} 
                setIsModalOpen={setIsModalOpen}
              />
            ) : project.isCrimsonSilverShowcase ? (
              <CrimsonSilverCaseStudyDetails
                project={project}
                onZoomIndex={setLightboxImageIndex}
                setIsModalOpen={setIsModalOpen}
              />
            ) : (
              project.images && project.images.length > 0 && (
                <div className="space-y-4 border-t border-line pt-10">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono">Project Gallery</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {project.images.map((img, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setActiveImageIndex(idx);
                          setLightboxImageIndex(idx);
                        }}
                        className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-zoom-in border-2 transition-all duration-300 ${
                          activeImageIndex === idx ? 'border-jelly-deep shadow-md scale-[1.02]' : 'border-line hover:border-jelly/40'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${project.title} screenshot ${idx + 1}`} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300 ${activeImageIndex === idx ? 'bg-transparent' : ''}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Sidebar Column: Metrics & Deliverables */}
          <div className="md:col-span-4 space-y-8 sticky top-28">
            
            {/* Metadata Box */}
            <div className="bg-white border border-line rounded-3xl p-6 shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-jelly-deep flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted font-mono">Timeline</div>
                    <div className="text-sm font-semibold text-ink">{project.timeline}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-line/50 pt-4">
                  <CheckCircle className="w-5 h-5 text-jelly-deep flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted font-mono">Impact &amp; Results</div>
                    <div className="text-sm font-semibold text-ink">{project.results}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverables Box */}
            <div className="bg-cream/45 border border-line/65 rounded-3xl p-6 space-y-4">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted font-mono">Key Deliverables</h3>
              <ul className="space-y-2.5 text-xs text-ink font-medium">
                {project.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white rounded-xl p-3 border border-line/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-jelly mt-1.5 flex-shrink-0" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Call to Action */}
            <div className="bg-ink text-white rounded-3xl p-6 shadow-md space-y-4 text-center">
              <Sparkles className="w-6 h-6 text-jelly mx-auto animate-pulse" />
              <div>
                <h4 className="text-sm font-bold">Want similar results?</h4>
                <p className="text-white/60 text-[11px] font-light mt-1">Get custom creative and code shipped in days.</p>
              </div>
              <div className="space-y-2.5 pt-2">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded-full py-3 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-jelly hover:bg-jelly/90 text-ink rounded-full py-3 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full shadow-lg shadow-jelly/10"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Component */}
      <AnimatePresence>
        {lightboxImageIndex !== null && projectImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 backdrop-blur-lg select-none"
            onClick={() => setLightboxImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex(null);
              }}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-70"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {projectImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex((prev) => 
                    prev === 0 ? projectImages.length - 1 : prev - 1
                  );
                }}
                className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all cursor-pointer z-70"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-[90vw] max-h-[85vh] md:max-w-[80vw] md:max-h-[80vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={projectImages[lightboxImageIndex]}
                alt={`${project.title} lightbox screenshot`}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white flex justify-between items-center z-10">
                <span className="font-mono text-xs text-white/50">
                  {lightboxImageIndex + 1} / {projectImages.length}
                </span>
                <span className="font-serif text-sm font-light">
                  {project.title}
                </span>
              </div>
            </motion.div>

            {/* Next Button */}
            {projectImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex((prev) => 
                    prev === projectImages.length - 1 ? 0 : prev + 1
                  );
                }}
                className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all cursor-pointer z-70"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
