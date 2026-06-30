import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ExternalLink, 
  ChevronDown, 
  Zap, 
  Layers, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

export default function Editor({ setIsModalOpen }) {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Inject JSON-LD Schema for SEO / AEO on mount
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Jellycut Video Editor",
      "operatingSystem": "Windows, macOS, Linux, ChromeOS",
      "applicationCategory": "MultimediaApplication",
      "browserRequirements": "Requires a modern web browser (HTML5, WebGL/WebGPU support)",
      "url": "https://cut.jellycutstudio.com/",
      "description": "A clean, web-based video editor featuring built-in AI watermark removal and high-definition video upscaling on export.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "category": "Free"
      },
      "featureList": [
        "Browser-based video editing",
        "AI watermark removal tool",
        "Video upscaling on export",
        "Multi-track timeline",
        "Zero-installation required"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'video-editor-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('video-editor-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const screenshots = [
    {
      title: "Clean Editing Workspace",
      description: "A distraction-free, modern interface designed to let you focus on your content. The multi-track timeline allows for precise splitting, dragging, and ordering of video, audio, and image tracks directly in your browser.",
      src: "/editor-preview-1.png",
      badge: "User Interface"
    },
    {
      title: "AI Watermark Removal",
      description: "Our integrated watermark removal tool intelligently sweeps away distracting logos and branding. Using spatial background interpolation, it fills in the erased region to restore clean pixels.",
      src: "/editor-preview-2.png",
      badge: "AI Powered"
    },
    {
      title: "Interactive Overlays & Assets",
      description: "Enhance your project with a library of modern overlays, templates, text formats, and transitions. Easily manage your project media and layers inside our lightning-fast assets panel.",
      src: "/editor-preview-3.png",
      badge: "Assets Library"
    },
    {
      title: "HD & 4K Upscaling on Export",
      description: "Upscale low-resolution clips up to 1080p and 4K on export. Our serverless upscaling runs inside the browser, repairing compression artifacts and smoothing edges for cinematic quality.",
      src: "/editor-preview-4.png",
      badge: "Export Engine"
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI Watermark Remover",
      description: "Clear away pre-existing watermarks, logos, or timestamp overlays. Just select the area and let our AI reconstruct the underlying image details smoothly."
    },
    {
      icon: Maximize2,
      title: "4K Video Upscaling",
      description: "No more pixelated social exports. Automatically enhance contrast, sharpen details, and upscale resolution to 1080p/4K upon export."
    },
    {
      icon: Zap,
      title: "No Installation Needed",
      description: "100% cloud-free, browser-native architecture. Edit immediately at cut.jellycutstudio.com without downloads, slow setups, or heavy RAM usage."
    },
    {
      icon: Layers,
      title: "Multi-Track Timeline",
      description: "Layer footage, add background music, position sound effects, and overlay text headers with a clean drag-and-drop timeline."
    }
  ];

  const faqs = [
    {
      question: "What makes Jellycut Video Editor different from other online editors?",
      answer: "Unlike traditional editors that require uploading heavy media files to a cloud server, Jellycut Video Editor runs entirely in-browser (client-side). This guarantees instant file loading, complete privacy since your data never leaves your computer, and unlocks powerful tools like built-in watermark removal and video upscaling on export."
    },
    {
      question: "How do I use the watermark removal tool?",
      answer: "Once you import your video into the timeline, select the video clip and activate the Watermark Remover from the side utility panel. Outline the area containing the logo or watermark, and the editor's spatial reconstruction engine will replace the watermark with context-aware matching background pixels."
    },
    {
      question: "Does the video upscaler work on export for all formats?",
      answer: "Yes, our upscaling engine is optimized to run client-side on export. It supports common video formats (MP4, WebM, MOV) and works by using spatial interpolation to upscale low-res content (like 480p or 720p footage) up to 1080p or 4K to meet the demands of modern social algorithms."
    },
    {
      question: "Is my video uploaded to your servers?",
      answer: "No. Your video files are processed entirely within your local browser sandbox. We do not upload, store, or view your footage. This client-side execution makes editing with Jellycut exceptionally private and ultra-fast."
    },
    {
      question: "Is there a subscription fee to use the editor?",
      answer: "The Jellycut Video Editor is free to launch and use for standard editing and exporting. Premium export capabilities, such as advanced 4K super-resolution upscaling and batch exports, may require a subscription tier or account."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans selection:bg-jelly/20 selection:text-ink">
      
      {/* Background Ambient Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-jelly/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] rounded-full bg-jelly-deep/5 blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-cream text-jelly-deep text-xs font-semibold tracking-wide uppercase mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-jelly animate-pulse" />
          <span>Now Live: Browser-Native Video Editor</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-ink max-w-4xl leading-[1.05] mb-6"
        >
          Professional video editing. <br />
          <span className="jelly-text italic">Directly in your browser.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10"
        >
          Say goodbye to complex software installations. Trim, splice, and customize video projects with integrated AI watermark removal and high-resolution video upscaling on export.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="https://cut.jellycutstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-ink text-white hover:bg-ink/90 text-sm md:text-base font-semibold px-8 py-4 rounded-full transition-all shadow-md active:scale-[0.98] cursor-pointer"
          >
            <span>Launch Video Editor</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 border border-line bg-white/50 hover:bg-white text-ink text-sm md:text-base font-semibold px-8 py-4 rounded-full transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Book Custom Video Ad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* Interactive Screenshot Showcase (Tabs + Transition) */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-24">
        <div className="w-full bg-cream/70 border border-line rounded-[2.5rem] p-6 md:p-10 shadow-custom relative overflow-hidden">
          
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(111,214,42,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Tab Selectors (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-jelly-deep font-bold tracking-widest uppercase mb-1">
                Explore The Workspace
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-4">
                Designed to be clean, built to be capable.
              </h2>
              
              <div className="flex flex-col gap-2">
                {screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col cursor-pointer ${
                      activeTab === idx 
                        ? 'bg-white border-jelly/40 shadow-sm' 
                        : 'bg-transparent border-transparent hover:bg-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-mono text-xs text-muted">0{idx + 1} // {shot.badge}</span>
                      {activeTab === idx && (
                        <span className="h-1.5 w-1.5 rounded-full bg-jelly" />
                      )}
                    </div>
                    <span className={`font-serif text-lg font-medium mt-1 transition-colors ${activeTab === idx ? 'text-jelly-deep' : 'text-ink'}`}>
                      {shot.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Preview Display (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-line bg-ink/5 shadow-lg group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={screenshots[activeTab].src}
                      alt={screenshots[activeTab].title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tab descriptive copy */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <p className="text-muted text-sm leading-relaxed font-sans font-light">
                    {screenshots[activeTab].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-16 border-t border-line">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[10px] text-jelly-deep font-bold tracking-widest uppercase block mb-3">
            Core Features
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal leading-tight">
            Advanced processing tools, browser simplicity.
          </h2>
          <p className="text-muted text-sm md:text-base font-light mt-4">
            We've packed powerful AI capabilities and rendering performance directly into the web client so you can edit faster without cloud uploads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-line rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-jelly/25 transition-all duration-300 flex flex-col"
              >
                <div className="h-10 w-10 rounded-xl bg-cream flex items-center justify-center text-jelly-deep mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-ink mb-2">
                  {feat.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed font-sans font-light flex-grow">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-16 border-t border-line">
        <div className="bg-ink text-white rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden">
          {/* Subtle light leak gradient */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-to-bl from-jelly/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <span className="font-mono text-[10px] text-jelly tracking-widest uppercase block mb-3">
                Engine Specifications
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight mb-4">
                The technical muscle behind browser-native rendering.
              </h2>
              <p className="text-white/60 text-sm font-sans font-light leading-relaxed">
                Jellycut Editor utilizes client-side WebAssembly compiling and localized GPU pipeline processing (via WebGL) to run hardware-accelerated filters, overlays, and watermark detection, bypassing server bottlenecks entirely.
              </p>
            </div>
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] text-white/40 block mb-1">COMPILATION SPEED</span>
                  <span className="font-serif text-2xl text-jelly">WebAssembly (WASM)</span>
                  <p className="text-white/50 text-[11px] font-sans mt-1 leading-relaxed">Runs machine code directly in-browser for smooth timeline scrubbing.</p>
                </div>
                
                <div className="border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] text-white/40 block mb-1">AI DETECT ENGINE</span>
                  <span className="font-serif text-2xl text-jelly">Spatial Inpainting</span>
                  <p className="text-white/50 text-[11px] font-sans mt-1 leading-relaxed">Intelligently reads neighbor pixels to rebuild background textures.</p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] text-white/40 block mb-1">EXPORT ENGINE</span>
                  <span className="font-serif text-2xl text-jelly">4K Resolution Upscaling</span>
                  <p className="text-white/50 text-[11px] font-sans mt-1 leading-relaxed">Increases output dimensions and fixes compression glitches on client.</p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] text-white/40 block mb-1">PRIVACY PROTOCOL</span>
                  <span className="font-serif text-2xl text-jelly">Zero Upload/100% Local</span>
                  <p className="text-white/50 text-[11px] font-sans mt-1 leading-relaxed">No footage is sent to external servers. Your assets remain on your machine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Q&A Section (FAQ Accordion) */}
      <section className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto py-16 border-t border-line">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] text-jelly-deep font-bold tracking-widest uppercase block mb-3">
            Q&amp;A / Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal">
            Everything you need to know about Jellycut Editor.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-line rounded-2xl bg-white overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-serif text-lg md:text-xl font-medium text-ink cursor-pointer focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted transition-transform duration-300 ${
                    openFaq === idx ? 'transform rotate-180 text-jelly-deep' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <div className="px-5 pb-5 pt-1 text-muted text-sm leading-relaxed border-t border-line/40 font-sans font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-24 pt-12">
        <div className="bg-cream border border-line rounded-[2.5rem] py-16 px-6 md:px-12 text-center relative overflow-hidden shadow-sm">
          <span className="font-mono text-[10px] text-jelly-deep font-bold tracking-widest uppercase block mb-4">
            Get Editing Immediately
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight mb-8">
            Create clean, high-res videos in minutes.
          </h2>
          
          <a
            href="https://cut.jellycutstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-ink text-white hover:bg-ink/90 text-sm md:text-base font-semibold px-8 py-4 rounded-full transition-all shadow-md active:scale-[0.98] cursor-pointer"
          >
            <span>Open Jellycut Video Editor</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </section>

    </div>
  );
}
