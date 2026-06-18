import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Palette, Code, Globe, ArrowRight, X, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const projects = [
  {
    id: 'p7',
    title: 'Starbucks Summer AI Ad',
    category: 'AI Video Ads',
    icon: Video,
    description: 'Cinematic conceptual ad campaign for Starbucks Summer Refreshers, built using advanced AI motion synthesis.',
    longDescription: 'We produced a conceptual commercial showcasing the Starbucks Summer Refreshers line. By training custom AI video models on product semantics, we generated photorealistic, high-fidelity liquid flow, condensation, and slow-motion fruit slice interactions. The entire sequence was rendered, color-graded, and sound-designed in 24 hours without a physical camera or production set.',
    timeline: '24 Hours',
    deliverables: ['1x 45s Concept Commercial', 'Vibrant Color Grading Assets', 'Sound FX Design'],
    results: 'Delivered a broadcast-ready beverage commercial in 24 hours, saving over 90% in typical camera production costs.',
    image: 'https://img.youtube.com/vi/TLmlYZSDTMw/maxresdefault.jpg',
    youtubeId: 'TLmlYZSDTMw',
    color: 'from-[#006241]/20 to-jelly/10'
  },
  {
    id: 'p8',
    title: 'RuPOS Billing Software',
    category: 'Vibe-Coded Apps',
    icon: Code,
    description: 'A mobile-first, multi-branch POS system designed for textile retailers to track stock and bill customers.',
    longDescription: 'Drawing from 10+ years of expert UI/UX design experience, we built RuPOS — a powerful, web-based Point of Sale (POS) system tailored specifically for the textile and clothing retail industry in India. Operating on any mobile, tablet, or desktop, RuPOS works completely offline, synchronizes branches instantly, logs audit trails for staff PIN cashouts to prevent theft, and generates automated daily sales reports sent via WhatsApp to store owners.',
    timeline: '10 Days',
    deliverables: [
      'Offline-First React Application',
      'Real-time Multi-branch Firestore Sync',
      'Bluetooth Thermal Receipt Printing',
      'WhatsApp Daily Sales Engine'
    ],
    results: 'Trusted by 100+ textile shops. Bill in seconds, prevent staff leakage, and monitor inventory live.',
    image: 'https://rupos.in/og-image.png',
    projectUrl: 'https://rupos.in/',
    color: 'from-[#0A120E]/40 to-jelly/10'
  },
  {
    id: 'p1',
    title: 'Aeroflow Athletics',
    category: 'AI Video Ads',
    icon: Video,
    description: 'High-energy cinematic ad campaign for a performance sportswear brand. Designed with dynamic AI motion synthesis.',
    longDescription: 'Aeroflow wanted to launch their new eco-fiber activewear with a commercial that felt futuristic and hyper-kinetic. We synthesized cinematic athlete clips and animated clothing micro-textures using generative AI, then composited, color-graded, and sound-designed the final video sequence in 48 hours.',
    timeline: '48 Hours',
    deliverables: ['1x 30s Master Ad', '3x 15s Story Hooks', 'Custom Sound Design'],
    results: '2.4x increase in CTR on Meta Ads vs previous agency baseline.',
    image: 'https://playground.bravebrand.com/assets/backgrounds/signal-foundry-painted-city-hero.webp', // We can use placeholder backgrounds with beautiful style
    color: 'from-jelly-deep/20 to-jelly/10'
  },
  {
    id: 'p2',
    title: 'Synapse Labs',
    category: 'Brand Identity',
    icon: Palette,
    description: 'A clean, digital-first brand identity and design system for a pioneering artificial intelligence research lab.',
    longDescription: 'Synapse Labs needed a visual language that felt academically rigorous yet digitally native. We developed a custom dynamic logo generator, curated a botanical color system, and provided a Figma design library with extensive brand guidelines spanning typography, print layouts, and digital UI states.',
    timeline: '5 Days',
    deliverables: ['Custom SVG Logo Mark', 'Design System System UI', 'Figma Guidelines', 'Brand Book PDF'],
    results: 'Successfully raised $4.2M seed round with a highly polished visual pitch.',
    image: 'https://playground.bravebrand.com/assets/backgrounds/signal-foundry-pixel-flower.webp',
    color: 'from-cream to-line/30'
  },
  {
    id: 'p3',
    title: 'Vesper Social',
    category: 'Vibe-Coded Apps',
    icon: Code,
    description: 'A web platform for community curators, featuring interactive maps and rich profile styling. Shipped in 3 weeks.',
    longDescription: 'Vesper is a niche network for curating architectural guides. Leveraging AI-assisted coding, we built a responsive React frontend coupled with a lightweight Supabase backend. The site features interactive maps, dynamic canvas rendering for custom guide sharing, and ultra-smooth fluid UI transitions.',
    timeline: '3 Weeks',
    deliverables: ['React App Codebase', 'Supabase Database Integration', 'Mapbox Custom Layouts'],
    results: 'Acquired 12,000 active beta users within the first month of launch.',
    image: 'https://playground.bravebrand.com/assets/backgrounds/signal-foundry-painted-city-hero.webp',
    color: 'from-jelly/10 to-cream'
  },
  {
    id: 'p4',
    title: 'Nova Cafe',
    category: 'Websites',
    icon: Globe,
    description: 'A cinematic, immersive product landing page with high-end typography and custom interactive menus.',
    longDescription: 'Nova is a premium specialty roastery. We built a visual experience using Framer Motion that mimics the physical act of pouring coffee through progressive color changes and subtle viewport scroll scaling. Complete with an interactive beans selector, flavor profiles drawer, and shop integrations.',
    timeline: '4 Days',
    deliverables: ['Cinematic Landing Page', 'Custom Menu Interactions', 'E-commerce Checkout Integration'],
    results: '40% increase in checkout conversions compared to standard Shopify templates.',
    image: 'https://playground.bravebrand.com/assets/backgrounds/signal-foundry-pixel-flower.webp',
    color: 'from-line/20 to-paper'
  },
  {
    id: 'p5',
    title: 'Modus Wear',
    category: 'AI Video Ads',
    icon: Video,
    description: 'Scroll-stopping product reveal loop with custom sound design and futuristic neon color grading.',
    longDescription: 'Modus needed a striking video hook for Meta and TikTok to showcase their winter capsule. We trained an AI model on their product photography to generate high-fidelity cloth simulations flowing through abstract environments. Rendered in 4K with deep green-lime tones.',
    timeline: '72 Hours',
    deliverables: ['3x Video Loop variations', 'Optimized vertical assets for TikTok'],
    results: '4.8s average watch time, beating platform benchmark by 35%.',
    image: 'https://playground.bravebrand.com/assets/backgrounds/signal-foundry-painted-city-hero.webp',
    color: 'from-jelly-mid/10 to-ink/10'
  },
  {
    id: 'p6',
    title: 'Ember CMS',
    category: 'Websites',
    icon: Globe,
    description: 'A sleek, conversion-driven landing page for a developer tool. Focus on micro-animations and data layouts.',
    longDescription: 'Ember is a headless CMS for developer teams. We designed a premium SaaS landing page containing live playground simulators, clean copy highlighting the API capabilities, and customized SVG illustrations explaining the cache layers.',
    timeline: '5 Days',
    deliverables: ['Tailwind-optimized Page Code', 'Interactions & Mockups', 'Light/Dark Theme Styles'],
    results: 'Reduced bounce rate from 62% to 31% within 2 weeks of redesign.',
    image: 'https://playground.bravebrand.com/assets/backgrounds/signal-foundry-pixel-flower.webp',
    color: 'from-cream to-line/40'
  }
];

const categories = ['All', 'AI Video Ads', 'Brand Identity', 'Websites', 'Vibe-Coded Apps'];

export default function Works({ setIsModalOpen }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section className="relative min-h-screen bg-paper text-ink pt-8 pb-20 px-6 md:px-12 lg:px-24">
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
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-line pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-cream text-muted hover:text-ink hover:bg-line/45'
              }`}
            >
              {cat}
            </button>
          ))}
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
                  onClick={() => setActiveProject(project)}
                  className="group bg-white rounded-3xl overflow-hidden border border-line flex flex-col justify-between cursor-pointer hover:shadow-xl hover:border-jelly-mid/40 transition-all duration-500 h-[380px]"
                >
                  {/* Top image/pattern container */}
                  <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative p-6 flex flex-col justify-between overflow-hidden`}>
                    {/* Project Thumbnail Image */}
                    {project.image && (
                      <>
                        <img 
                          src={project.image} 
                          alt={project.title} 
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-line relative max-h-[85vh] flex flex-col"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ ease, duration: 0.4 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 text-muted hover:text-ink p-2 rounded-full hover:bg-cream transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto w-full">
                {/* Header Banner */}
                <div className={`h-48 bg-gradient-to-br ${activeProject.color} p-8 flex flex-col justify-end relative overflow-hidden`}>
                  {activeProject.image && (
                    <>
                      <img 
                        src={activeProject.image} 
                        alt={activeProject.title} 
                        className="absolute inset-0 w-full h-full object-cover z-0" 
                      />
                      <div className="absolute inset-0 bg-black/30 z-0" />
                    </>
                  )}
                  <span className="bg-white/95 text-ink backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider font-mono shadow-sm absolute top-8 left-8 z-10">
                    {activeProject.category}
                  </span>
                  <h3 className={`font-serif text-3xl md:text-4xl ${activeProject.image ? 'text-white' : 'text-ink'} font-normal leading-tight relative z-10`}>
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
                          setActiveProject(null);
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
    </section>
  );
}
