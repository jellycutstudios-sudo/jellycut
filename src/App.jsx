import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components and pages
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

import Home from './pages/Home';
const Works = lazy(() => import('./pages/Works'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const Editor = lazy(() => import('./pages/Editor'));
import { projects } from './data/projects';
import { posts } from './data/posts';
import AIChatWidget from './components/AIChatWidget';
import VibeCheck from './components/VibeCheck';
import ProjectModal from './components/ProjectModal';

const ease = [0.16, 1, 0.3, 1];

function App() {
  const [route, setRoute] = useState(window.location.pathname + window.location.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const project = projects.find(p => p.slug === slug || (p.slug === 'skylight-travel-website' && (slug === 'skylight-tourism' || slug === 'skylight-tourism-website' || slug === 'skylight-travel')));
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
    } else if (mainRoute === '/blog') {
      title = 'Creative Engineering Blog — Video Ads, CGI & UI Strategy | Jellycut Studios';
      description = 'Read Jellycut Studios\' insights on AI video ads, 3D CGI product rendering, local UGC marketing, and performance-focused branding strategies for global startups.';
    } else if (mainRoute.startsWith('/blog/')) {
      const slug = mainRoute.substring(6);
      const post = posts.find(p => p.slug === slug);
      if (post) {
        title = `${post.title} | Jellycut Studios Blog`;
        description = post.summary;
      }
    } else if (mainRoute === '/editor' || mainRoute === '/video-editor') {
      title = 'Jellycut Video Editor — Online Watermark Removal & Video Upscaling';
      description = 'Edit video directly in your browser with Jellycut Video Editor. Features built-in AI watermark remover and HD/4K video upscaling on export. 100% free and client-side.';
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




  const renderActivePage = () => {
    const mainRoute = route.split('?')[0];
    if (mainRoute === '/works') {
      return <Works setIsModalOpen={setIsModalOpen} currentRoute={route} setRoute={handleNavigate} />;
    } else if (mainRoute.startsWith('/works/')) {
      const slug = mainRoute.substring(7);
      const project = projects.find(p => p.slug === slug || (p.slug === 'skylight-travel-website' && (slug === 'skylight-tourism' || slug === 'skylight-tourism-website' || slug === 'skylight-travel')));
      if (project) {
        return (
          <ProjectDetail 
            project={project} 
            setRoute={handleNavigate} 
            setIsModalOpen={setIsModalOpen} 
          />
        );
      }
      return <Works setIsModalOpen={setIsModalOpen} currentRoute={route} setRoute={handleNavigate} />;
    } else if (mainRoute === '/blog') {
      return <Blog setRoute={handleNavigate} />;
    } else if (mainRoute.startsWith('/blog/')) {
      const slug = mainRoute.substring(6);
      const post = posts.find(p => p.slug === slug);
      if (post) {
        return (
          <BlogPostDetail 
            post={post} 
            setRoute={handleNavigate} 
            setIsModalOpen={setIsModalOpen} 
          />
        );
      }
      return <Blog setRoute={handleNavigate} />;
    } else if (mainRoute === '/editor' || mainRoute === '/video-editor') {
      return <Editor setIsModalOpen={setIsModalOpen} />;
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
    <div className={`relative min-h-screen bg-paper text-ink overflow-x-hidden font-sans selection:bg-jelly/20 selection:text-ink ${isModalOpen ? 'overflow-hidden' : ''}`}>
      
      <CustomCursor />

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
            <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-6 h-6 border-2 border-jelly border-t-transparent rounded-full animate-spin" /></div>}>
              {renderActivePage()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer 
        setIsModalOpen={setIsModalOpen} 
      />



      {/* ── PROJECT INQUIRY MODAL ── */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMobile={isMobile}
      />

      <AIChatWidget />
      <VibeCheck setRoute={handleNavigate} />
    </div>
  );
}

export default App;
