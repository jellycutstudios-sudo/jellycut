import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

const ease = [0.16, 1, 0.3, 1];

const categories = ['All', 'AI Video Ads', 'Websites', 'Vibe-Coded Apps'];

export default function Works({ setRoute }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

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
                    setRoute('/works/' + project.slug);
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

      </div>
    </section>
  );
}
