import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ExternalLink, Calendar, CheckCircle, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';
import DiorCaseStudyDetails from '../components/DiorCaseStudyDetails';
import CrimsonSilverCaseStudyDetails from '../components/CrimsonSilverCaseStudyDetails';

const ease = [0.16, 1, 0.3, 1];


const categories = ['All', 'AI Video Ads', 'Websites', 'Vibe-Coded Apps'];

export default function Works({ setIsModalOpen, currentRoute }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleCloseProject = () => {
    setActiveProject(null);
    window.history.pushState(null, '', '/works');
    document.title = 'Portfolio & Case Studies — AI Video Ads & Brand Design | Jellycut Studios';
  };
  const [lightboxImageIndex, setLightboxImageIndex] = useState(null);

  // Parse query parameter to open project modal directly
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setTimeout(() => {
          setActiveProject(project);
          setActiveImageIndex(0);
        }, 0);
        return;
      }
    }
    setTimeout(() => {
      setActiveProject(null);
    }, 0);
  }, [currentRoute]);

  const projectImages = useMemo(() => {
    return activeProject?.images || (activeProject?.image ? [activeProject.image] : []);
  }, [activeProject]);

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

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section className="relative min-h-screen bg-paper text-ink pt-32 md:pt-8 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="max-w-3xl mb-16 mt-8">
          <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
            Our Portfolio
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] font-normal tracking-tight">
            Selected Works // Proof in the pixels.
          </h1>
          <p className="mt-5 text-muted text-sm md:text-base font-light leading-relaxed max-w-xl">
            A showcase of scroll-stopping video ads, pristine brand identities, cinematic websites, and vibe-coded applications. Built fast, refined by human design.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center w-full mb-12 border-b border-line pb-5 overflow-hidden">
          <div className="flex flex-row overflow-x-auto scrollbar-none gap-3 pb-2 -mb-2 w-full max-w-full touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 active:scale-95 z-10 whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'text-paper font-bold shadow-sm' 
                    : 'bg-cream text-muted hover:text-ink hover:bg-line/45'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-ink rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>


        {/* Works Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease, delay: index * 0.05 }}
                  onClick={() => {
                    setActiveProject(project);
                    setActiveImageIndex(0);
                    window.history.pushState(null, '', '/works/' + project.slug);
                    document.title = `${project.title} Case Study — AI Video Ads & Brand Design | Jellycut Studios`;
                  }}
                  className="group bg-white rounded-3xl overflow-hidden border border-line flex flex-col justify-between cursor-pointer hover:shadow-xl hover:border-jelly-mid/40 transition-all duration-500 h-[420px]"
                >
                  {/* Top image/pattern container */}
                  <div className={`h-60 w-full bg-gradient-to-br ${project.color} relative p-6 flex flex-col justify-between overflow-hidden`}>
                    {/* Project Thumbnail Image */}
                    {project.image && (
                      <>
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors duration-500 z-0" />
                      </>
                    )}

                    {/* Background Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    
                    {/* Category tag & Video Badge */}
                    <div className="flex justify-between items-start relative z-10 w-full">
                      <span className="bg-white/95 text-ink backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider font-mono shadow-sm">
                        {project.category}
                      </span>
                      {project.youtubeId ? (
                        <span className="bg-jelly text-ink backdrop-blur-md rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider font-mono shadow-sm flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
                          Watch Ad
                        </span>
                      ) : (
                        <div className="bg-white/90 backdrop-blur-md text-ink p-2 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Logo/Icon placeholder style */}
                    <div className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center text-jelly-deep shadow-sm self-start mt-4 relative z-10">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Copy info */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-sans text-ink group-hover:text-jelly-deep transition-colors duration-300 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-jelly-deep mt-4">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-muted font-light">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-md cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseProject}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-line relative max-h-[85vh] flex flex-col cursor-default"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ ease, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseProject}
                className="absolute top-5 right-5 bg-white/80 hover:bg-white text-ink shadow-md backdrop-blur-md p-2 rounded-full hover:scale-105 transition-all z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>


              <div className="overflow-y-auto w-full">
                {/* Header Banner */}
                <div 
                  onClick={() => {
                    if (projectImages.length > 0) {
                      setLightboxImageIndex(activeImageIndex);
                    }
                  }}
                  className={`h-48 bg-gradient-to-br ${activeProject.color} p-8 flex flex-col justify-end relative overflow-hidden cursor-zoom-in group/header`}
                >
                  {((activeProject.images && activeProject.images[activeImageIndex]) || activeProject.image) && (
                    <>
                      <img 
                        src={(activeProject.images && activeProject.images[activeImageIndex]) || activeProject.image} 
                        alt={activeProject.title} 
                        className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500 group-hover/header:scale-[1.02]" 
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover/header:bg-black/45 transition-colors duration-300 z-0" />
                    </>
                  )}

                  {/* Zoom indicator button */}
                  {projectImages.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImageIndex(activeImageIndex);
                      }}
                      className="absolute bottom-6 right-6 bg-black/60 hover:bg-black/80 hover:scale-105 text-white rounded-full p-2.5 backdrop-blur-sm border border-white/20 transition-all cursor-pointer z-20 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider font-mono"
                    >
                      <ZoomIn className="w-4 h-4" />
                      <span>Zoom</span>
                    </button>
                  )}

                  <span className="bg-white/95 text-ink backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider font-mono shadow-sm absolute top-8 left-8 z-10">
                    {activeProject.category}
                  </span>
                  <h3 className={`font-serif text-3xl md:text-4xl ${activeProject.image ? 'text-white' : 'text-ink'} font-normal leading-tight relative z-10 mb-2`}>
                    {activeProject.title}
                  </h3>
                </div>

                {/* Body Details */}
                <div className="p-8 space-y-6">
                  {/* Video Embed if present */}
                  {activeProject.youtubeId && (
                    <div>
                      <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted font-mono mb-3">Watch Campaign Video</h4>
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-line shadow-sm bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${activeProject.youtubeId}?autoplay=0&rel=0`}
                          title={activeProject.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted font-mono mb-2">The Challenge &amp; Solution</h4>
                    <p className="text-muted text-sm md:text-base font-light leading-relaxed">
                      {activeProject.longDescription}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-line py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-jelly-deep" />
                      <div>
                        <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">Project Timeline</div>
                        <div className="text-xs font-semibold text-ink">{activeProject.timeline}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-jelly-deep" />
                      <div>
                        <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">Performance Impact</div>
                        <div className="text-xs font-semibold text-ink">{activeProject.results}</div>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted font-mono mb-2">Key Deliverables</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink">
                      {activeProject.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-center gap-2 bg-cream rounded-xl p-2.5 border border-line/50">
                          <span className="h-1.5 w-1.5 rounded-full bg-jelly" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dior Specific Content or General Gallery */}
                  {activeProject.isDiorShowcase ? (
                    <DiorCaseStudyDetails 
                      project={activeProject} 
                      onZoomIndex={setLightboxImageIndex} 
                    />
                  ) : activeProject.isCrimsonSilverShowcase ? (
                    <CrimsonSilverCaseStudyDetails
                      project={activeProject}
                      onZoomIndex={setLightboxImageIndex}
                      setIsModalOpen={setIsModalOpen}
                    />
                  ) : (
                    activeProject.images && activeProject.images.length > 0 && (
                      <div className="border-t border-line pt-6">
                        <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted font-mono mb-3">Project Gallery</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {activeProject.images.map((img, idx) => (
                            <div 
                              key={idx}
                              onClick={() => {
                                setActiveImageIndex(idx);
                                setLightboxImageIndex(idx);
                              }}
                              className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in border-2 transition-all duration-300 ${
                                activeImageIndex === idx ? 'border-jelly-deep shadow-md scale-[1.02]' : 'border-line hover:border-jelly/40'
                              }`}
                            >
                              <img 
                                src={img} 
                                alt={`${activeProject.title} screenshot ${idx + 1}`} 
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              {/* Hover overlay */}
                              <div className={`absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300 ${activeImageIndex === idx ? 'bg-transparent' : ''}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {/* Project Call to Action */}
                  <div className="bg-cream rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-line">
                    <div>
                      <div className="text-xs font-bold text-ink mb-1">Want similar results for your brand?</div>
                      <p className="text-muted text-[11px] font-light">Get custom creative and code shipped in days.</p>
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
                      {activeProject.projectUrl && (
                        <a
                          href={activeProject.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-cream border border-line text-ink rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
                        >
                          <span>Visit Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => {
                          handleCloseProject();
                          setIsModalOpen(true);
                        }}
                        className="bg-ink hover:bg-ink/90 text-white rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1.5"
                      >
                        <span>Start Your Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Popup */}
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
                alt={`${activeProject.title} lightbox screenshot`}
                className="max-w-full max-h-[80vh] object-contain"
              />
              {/* Caption or info */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white flex justify-between items-center z-10">
                <span className="font-mono text-xs text-white/50">
                  {lightboxImageIndex + 1} / {projectImages.length}
                </span>
                <span className="font-serif text-sm font-light">
                  {activeProject.title}
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
