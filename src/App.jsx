import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';

// Import components and pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';

const ease = [0.16, 1, 0.3, 1];

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [time, setTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    brief: '',
  });
  const [isMobile, setIsMobile] = useState(false);

  // 1. Mobile viewport detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Hash router change listener
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0); // Scroll to top on navigation
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Dynamic SEO Metadata Update
  useEffect(() => {
    let title = 'Jellycut Studios | Cinematic Creative AI Studio';
    let description = 'Creative AI studio from Kerala building scroll-stopping video ads, brand identities, and vibe-coded apps.';
    
    if (route === '#/works') {
      title = 'Selected Portfolio | Jellycut Studios';
      description = 'Check out our cinematic video ads, brand identities, vibe-coded apps, and website designs.';
    } else if (route === '#/about') {
      title = 'About Us | Jellycut Studios';
      description = 'Disrupting agency models. We combine generative AI speed with meticulous human creative direction from Kerala.';
    } else if (route === '#/contact') {
      title = 'Start a Project | Jellycut Studios';
      description = 'Submit your project brief online in 15 minutes. No scheduling required. First draft in 48-72 hours.';
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

  // 4. Live US Eastern Time Clock
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSubmitted(false);
        setFormData({ name: '', email: '', service: '', brief: '' });
      }, 3500);
    }
  };

  const renderActivePage = () => {
    switch (route) {
      case '#/works':
        return <Works setIsModalOpen={setIsModalOpen} />;
      case '#/about':
        return <About />;
      case '#/contact':
        return <Contact />;
      case '#/':
      default:
        return <Home setIsModalOpen={setIsModalOpen} setRoute={setRoute} isMobile={isMobile} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-paper text-ink overflow-x-hidden font-sans selection:bg-jelly/20 selection:text-ink">
      
      {/* Dynamic Navigation Header */}
      <Header 
        currentRoute={route} 
        setRoute={setRoute} 
        setIsModalOpen={setIsModalOpen} 
        time={time} 
      />

      {/* Page Content Switcher with Cross-Fade Transitions */}
      <main className="w-full relative">
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
        hideCTA={route === '#/contact'} 
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
                className="absolute top-5 right-5 text-muted hover:text-ink p-1.5 rounded-full hover:bg-cream transition-colors z-10 cursor-pointer"
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
                        <span>Submit Brief</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

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
