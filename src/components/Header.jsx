import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 18 } }
};

export default function Header({ currentRoute, setRoute, setIsModalOpen, time }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentRoute]);

  const isHome = currentRoute === '#/' || currentRoute === '' || currentRoute === '#';
  const isMenuDark = isMenuOpen || isHome;

  // Text/border colour flips to white on home (dark hero) or when menu overlay is open
  const textColorClass = isMenuDark ? 'text-white' : 'text-ink';
  const mutedColorClass = isMenuDark ? 'text-white/50' : 'text-muted';
  const borderClass = isMenuDark ? 'border-white/20' : 'border-line';

  const menuItems = [
    { label: 'Home', path: '#/' },
    { label: 'Works', path: '#/works' },
    { label: 'About Us', path: '#/about' },
    { label: 'Contact Us', path: '#/contact' },
  ];

  const subItems = [
    { label: 'Services', path: '/#services' },
    { label: 'Process', path: '/#process' },
  ];

  const handleNavClick = (path) => {
    if (path.startsWith('/#')) {
      // It's an anchor on home page
      setRoute('#/');
      setIsMenuOpen(false);
      setTimeout(() => {
        const id = path.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setRoute(path);
      setIsMenuOpen(false);
    }
  };

  const headerPositionClass = isMenuOpen 
    ? 'fixed top-0 left-0 right-0' 
    : (isHome ? 'absolute top-0 left-0 right-0' : 'relative');

  return (
    <>
      {/* Desktop Navigation Header */}
      <header className={`${headerPositionClass} ${isMenuOpen ? 'z-50' : 'z-30'} w-full px-12 py-8 justify-between items-center transition-colors duration-300 hidden md:flex`}>
        
        {/* Left: status label (Desktop) */}
        <div className={`flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase font-mono ${mutedColorClass}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-jelly animate-pulse" />
          <span>US &amp; UK Clients // Open</span>
        </div>

        {/* Center: Desktop Glass Nav Pill */}
        <motion.nav
          className="glass-nav rounded-full px-2 py-1.5 flex items-center gap-1 md:gap-2 border mx-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <div 
            onClick={() => handleNavClick('#/')}
            className="flex items-center pl-1 pr-2 py-0.5 cursor-pointer"
          >
            <img
              src="./logo.png"
              alt="Jellycut Studios"
              className="h-7 w-auto object-contain drop-shadow-sm"
            />
          </div>

          <div className="flex items-center text-xs font-medium text-ink/90">
            <button 
              onClick={() => handleNavClick('#/works')} 
              className={`px-3 py-1 hover:text-jelly-deep transition-colors cursor-pointer ${currentRoute === '#/works' ? 'text-jelly-deep font-semibold' : ''}`}
            >
              Works
            </button>
            <button 
              onClick={() => handleNavClick('#/about')} 
              className={`px-3 py-1 hover:text-jelly-deep transition-colors cursor-pointer ${currentRoute === '#/about' ? 'text-jelly-deep font-semibold' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('#/contact')} 
              className={`px-3 py-1 hover:text-jelly-deep transition-colors cursor-pointer ${currentRoute === '#/contact' ? 'text-jelly-deep font-semibold' : ''}`}
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavClick('/#services')} 
              className="px-3 py-1 hover:text-jelly-deep transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('/#process')} 
              className="px-3 py-1 hover:text-jelly-deep transition-colors cursor-pointer"
            >
              Process
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-ink text-white hover:bg-ink/90 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
          >
            Start a Project
          </button>
        </motion.nav>
      </header>

      {/* Mobile Floating Glass Pill Header */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          className="h-13 rounded-full border bg-line/85 dark:bg-line/75 backdrop-blur-lg px-4.5 flex justify-between items-center shadow-lg transition-all duration-300 w-[55vw] min-w-[210px] max-w-[280px]"
          style={{ 
            borderColor: isMenuOpen 
              ? 'rgba(111, 214, 42, 0.4)' 
              : 'rgba(90, 114, 85, 0.25)', // border-muted/25
            boxShadow: isMenuOpen ? '0 4px 30px rgba(111, 214, 42, 0.1)' : '0 4px 24px rgba(20, 60, 8, 0.08)'
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Left: Mobile Logo */}
          <div 
            onClick={() => handleNavClick('#/')}
            className="flex items-center cursor-pointer hover:opacity-85 transition-opacity"
          >
            <img
              src="./logo.png"
              alt="Jellycut Studios"
              className="h-7.5 w-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Right: Burger Toggle with Custom Morphing Lines (Deep forest ink for readability on light green background) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            className="flex items-center justify-center w-8.5 h-8.5 rounded-full outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none transition-transform active:scale-90 text-ink"
            style={{ outline: 'none' }}
          >
            <svg width="17" height="17" viewBox="0 0 20 20">
              <Path
                variants={{
                  closed: { d: "M 3 5 L 17 5" },
                  open: { d: "M 3 17 L 17 3" }
                }}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <Path
                variants={{
                  closed: { d: "M 3 10 L 17 10", opacity: 1 },
                  open: { d: "M 3 10 L 17 10", opacity: 0 }
                }}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.2 }}
              />
              <Path
                variants={{
                  closed: { d: "M 3 15 L 17 15" },
                  open: { d: "M 3 3 L 17 17" }
                }}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl md:hidden flex flex-col justify-between pt-28 pb-8 px-6 text-white overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* Dotted Grid Canvas Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Glowing Ambient Light Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-jelly/10 blur-[80px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-jelly-deep/15 blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

            {/* Top Section: Links list */}
            <div className="relative z-10 flex flex-col gap-5 mt-2">
              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Navigation</span>
              <motion.nav 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-2"
              >
                {menuItems.map((item, idx) => (
                  <motion.div key={item.label} variants={itemVariants} className="w-full">
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className="w-full flex items-center justify-between group py-2.5 text-left cursor-pointer border-b border-white/5"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] text-white/30 tracking-wider">
                          0{idx + 1}
                        </span>
                        <span className={`font-serif text-3xl tracking-tight transition-colors group-hover:text-jelly ${currentRoute === item.path ? 'text-jelly' : 'text-white'}`}>
                          {item.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 overflow-hidden">
                        {currentRoute === item.path && (
                          <span className="h-1.5 w-1.5 rounded-full bg-jelly animate-ping" />
                        )}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-jelly" />
                      </div>
                    </button>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Sub Navigation / Anchors */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex gap-6 pl-6 mt-1"
              >
                {subItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    className="text-xs font-mono tracking-wider text-white/60 hover:text-jelly transition-colors cursor-pointer"
                  >
                    // {item.label}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Middle Section: Featured Project Mini-Card */}
            <div className="relative z-10 my-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 90 }}
                className="relative p-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group cursor-pointer"
                onClick={() => handleNavClick('#/works?project=p7')}
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-jelly/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0 relative border border-white/10">
                    <img
                      src="https://img.youtube.com/vi/TLmlYZSDTMw/maxresdefault.jpg"
                      alt="Starbucks Summer AI Ad"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-jelly animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <span className="font-mono text-[8px] text-jelly tracking-widest uppercase block mb-0.5">
                      Featured Case Study
                    </span>
                    <h4 className="font-serif text-sm text-white font-medium leading-tight group-hover:text-jelly transition-colors truncate">
                      Starbucks Summer AI Ad
                    </h4>
                    <p className="text-[10px] text-white/50 line-clamp-2 mt-0.5 leading-relaxed font-sans">
                      Cinematic conceptual ad campaign built using advanced AI motion synthesis.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Section: CTA & Details Grid */}
            <div className="relative z-10 flex flex-col gap-5 mt-auto">
              <motion.button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full py-3.5 bg-jelly text-ink rounded-full text-xs font-bold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-jelly/15 hover:bg-jelly/90"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a Project</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest"
              >
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-white/20">Connect</span>
                  <a href="mailto:hello@jellycut.com" className="hover:text-jelly transition-colors normal-case text-white/60">hello@jellycut.com</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-jelly transition-colors normal-case text-white/60">@jellycutstudios</a>
                </div>
                <div className="flex flex-col gap-1.5 items-end text-right">
                  <span className="text-white/20">Availability</span>
                  <div className="flex items-center gap-1.5 text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-jelly animate-pulse" />
                    <span>US &amp; UK // OPEN</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
