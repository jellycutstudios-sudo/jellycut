import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';

// Import components and pages
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import { projects } from './data/projects';


const ease = [0.16, 1, 0.3, 1];

function App() {
  const [route, setRoute] = useState(window.location.pathname + window.location.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    brief: '',
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // 1. Mobile viewport detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Path router change listener
  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname + window.location.search);
      window.scrollTo(0, 0); // Scroll to top on navigation
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0);
  };

  // 3. Dynamic SEO Metadata Update
  useEffect(() => {
    let title = 'Jellycut Studios — AI Video Ads, Brand Identity & Web Apps | Kerala, India';
    let description = 'Jellycut Studios is an AI-first creative studio from Kerala, India. Cinematic video ads, bold brand identities, and vibe-coded web apps for global brands — delivered in 48–72 hours.';
    
    const mainRoute = route.split('?')[0];
    if (mainRoute === '/works') {
      title = 'Portfolio & Case Studies — AI Video Ads & Brand Design | Jellycut Studios';
      description = 'Browse Jellycut Studios\' portfolio — cinematic AI video ads, brand identities, vibe-coded apps, and website designs for global clients. See real results.';
    } else if (mainRoute.startsWith('/works/')) {
      const slug = mainRoute.substring(7);
      const project = projects.find(p => p.slug === slug);
      if (project) {
        title = `${project.title} Case Study — AI Video Ads & Brand Design | Jellycut Studios`;
        description = project.description;
      }
    } else if (mainRoute === '/about') {
      title = 'About Jellycut Studios — AI Creative Studio from Kerala, India';
      description = 'Jellycut Studios combines generative AI speed with human creative direction. Built in Kerala, India to deliver agency-quality creative for US, UK & global brands at startup-friendly prices.';
    } else if (mainRoute === '/contact') {
      title = 'Start a Project — 48-Hour Creative Brief | Jellycut Studios';
      description = 'Start your project with Jellycut Studios in 15 minutes. No calls required. Submit your brief online and get your first draft within 48–72 hours. AI video ads, brand identity, web apps.';
    }

    document.title = title;
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [route]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      const serviceLabels = {
        'ai-video-ad': 'AI Video Ad',
        'brand-identity': 'Brand Identity',
        'vibe-coded-app': 'Vibe-Coded App',
        'website': 'Website Design',
        'not-sure': 'Not sure yet',
      };
      const serviceLabel = serviceLabels[formData.service] || formData.service || 'Not specified';
      
      const whatsappText = `Hello Jellycut Studios,\n\nI would like to discuss a project:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Service:* ${serviceLabel}\n*Brief:* ${formData.brief}`;
      const whatsappUrl = `https://wa.me/919400025062?text=${encodeURIComponent(whatsappText)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      setFormSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSubmitted(false);
        setFormData({ name: '', email: '', service: '', brief: '' });
      }, 3500);
    }
  };

  const renderActivePage = () => {
    const mainRoute = route.split('?')[0];
    if (mainRoute === '/works') {
      return <Works setIsModalOpen={setIsModalOpen} currentRoute={route} />;
    } else if (mainRoute.startsWith('/works/')) {
      const slug = mainRoute.substring(7);
      const project = projects.find(p => p.slug === slug);
      if (project) {
        return (
          <ProjectDetail 
            project={project} 
            setRoute={handleNavigate} 
            setIsModalOpen={setIsModalOpen} 
          />
        );
      }
      return <Works setIsModalOpen={setIsModalOpen} currentRoute={route} />;
    }
    switch (mainRoute) {
      case '/about':
        return <About />;
      case '/contact':
        return <Contact />;
      case '/':
      default:
        return <Home setIsModalOpen={setIsModalOpen} setRoute={handleNavigate} isMobile={isMobile} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-paper text-ink overflow-x-hidden font-sans selection:bg-jelly/20 selection:text-ink">
      
      {/* Dynamic Navigation Header */}
      <Header 
        currentRoute={route.split('?')[0]} 
        setRoute={handleNavigate} 
        setIsModalOpen={setIsModalOpen} 
      />

      {/* Page Content Switcher with Cross-Fade Transitions */}
      <main
        className="w-full relative"
        aria-label={(() => {
          const r = route.split('?')[0];
          if (r === '/works') return 'Portfolio and case studies';
          if (r === '/about') return 'About Jellycut Studios';
          if (r === '/contact') return 'Start a project with Jellycut Studios';
          return 'Jellycut Studios home';
        })()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            className="w-full"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer 
        setIsModalOpen={setIsModalOpen} 
      />



      {/* ── PROJECT INQUIRY MODAL (Shared Global Modal) ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-ink/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-t-3xl md:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-t md:border border-line relative max-h-[92dvh] flex flex-col pb-safe"
              initial={isMobile ? { y: '100%' } : { scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={isMobile ? { y: '100%' } : { scale: 0.95, y: 20 }}
              transition={{ ease, duration: 0.4 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 bg-white/80 hover:bg-white text-ink shadow-md backdrop-blur-md p-1.5 rounded-full hover:scale-105 transition-all z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>


              <div className="p-6 md:p-10 overflow-y-auto w-full">
                {!formSubmitted ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-jelly-deep" />
                      <span className="text-xs font-mono uppercase tracking-wider text-jelly-deep font-semibold">
                        Jellycut Studio Portal
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl text-ink font-normal leading-snug mb-2">
                      Tell us about your project
                    </h3>
                    <p className="text-muted text-xs md:text-sm font-light leading-relaxed mb-7">
                      We'll review your brief and get back within 24 hours. No calls needed to get started.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-sans">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Rivera"
                          className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-jelly transition-colors text-ink placeholder:text-muted/50"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-sans">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="hello@yourbrand.com"
                          className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-jelly transition-colors text-ink placeholder:text-muted/50"
                        />
                      </div>

                      {/* Service dropdown */}
                      <div>
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-sans">
                          What Do You Need?
                        </label>
                        <div className="relative">
                          <select
                             value={formData.service}
                             onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                             className="w-full appearance-none bg-cream border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-jelly transition-colors text-ink cursor-pointer pr-10"
                          >
                            <option value="" disabled>Select a service…</option>
                            <option value="ai-video-ad">AI Video Ad</option>
                            <option value="brand-identity">Brand Identity</option>
                            <option value="vibe-coded-app">Vibe-Coded App</option>
                            <option value="website">Website Design</option>
                            <option value="not-sure">Not sure yet — let's talk</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                        </div>
                      </div>

                      {/* Brief textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-sans">
                          Brief / Goals
                        </label>
                        <textarea
                          rows="3"
                          value={formData.brief}
                          onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                          placeholder="Budget range, timeline, or anything that helps us understand your goal…"
                          className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-jelly transition-colors text-ink placeholder:text-muted/50 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-ink hover:bg-ink/90 text-white font-semibold py-3.5 rounded-xl text-sm transition-all mt-2 shadow-md active:scale-[0.98] cursor-pointer"
                      >
                        <span>Submit &amp; Open WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-[10px] text-muted text-center mt-2 font-mono">
                        Note: Submitting will open WhatsApp to send your project details.
                      </p>

                      <p className="text-center text-[11px] text-muted font-light pt-1">
                        We reply within 24 hours. No calls required to start.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div
                    className="py-12 text-center flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="bg-jelly/15 text-jelly-deep p-4 rounded-full mb-6">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <h3 className="font-serif text-2xl text-ink font-normal mb-3">
                      Brief received!
                    </h3>
                    <p className="text-muted text-xs md:text-sm font-light max-w-xs leading-relaxed">
                      Thanks, <strong className="text-ink font-medium">{formData.name}</strong>. We'll review your project and get back to you at{' '}
                      <strong className="text-ink font-medium">{formData.email}</strong> within 24 hours.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
