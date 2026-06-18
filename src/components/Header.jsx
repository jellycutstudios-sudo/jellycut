import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Clock, Sparkles, ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

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
      {/* Main Header Container with improved mobile padding and safe areas */}
      <header className={`${headerPositionClass} ${isMenuOpen ? 'z-50' : 'z-30'} w-full px-6 header-padding md:px-12 flex justify-between items-center transition-colors duration-300`}>
        
        {/* Left: status label (Desktop) */}
        <div className={`hidden md:flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase font-mono ${mutedColorClass}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-jelly animate-pulse" />
          <span>US &amp; UK Clients // Open</span>
        </div>

        {/* Left: Mobile Logo */}
        <div 
          onClick={() => handleNavClick('#/')}
          className="flex md:hidden items-center pl-1 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="Jellycut Studios"
            className="h-7 w-auto object-contain drop-shadow-sm"
          />
        </div>

        {/* Center: Desktop Glass Nav Pill */}
        <motion.nav
          className="hidden md:flex glass-nav rounded-full px-2 py-1.5 items-center gap-1 md:gap-2 border mx-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <div 
            onClick={() => handleNavClick('#/')}
            className="flex items-center pl-1 pr-2 py-0.5 cursor-pointer"
          >
            <img
              src="/logo.png"
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

        {/* Right: US ET Clock & Mobile Hamburger Button */}
        <div className="flex items-center gap-4">
          <motion.div
            className={`flex items-center gap-2 text-xs font-mono tracking-widest text-right ${textColorClass}`}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="hidden sm:inline opacity-60">US ET</span>
            <Clock className="w-3.5 h-3.5 text-jelly" />
            <span className="tabular-nums font-semibold opacity-95">{time || '12:00 PM'}</span>
          </motion.div>

          {/* Mobile Burger Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="flex md:hidden items-center justify-center p-2 rounded-full border bg-white/10 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            style={{ borderColor: isMenuDark ? 'rgba(255, 255, 255, 0.2)' : 'var(--line)' }}
          >
            {isMenuOpen ? (
              <X className={`w-5 h-5 ${textColorClass}`} />
            ) : (
              <Menu className={`w-5 h-5 ${textColorClass}`} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl md:hidden flex flex-col justify-between pt-24 pb-8 px-8 text-white overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-jelly/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-jelly-deep/15 blur-[120px] pointer-events-none" />

            {/* Menu Links */}
            <nav className="flex flex-col gap-6 mt-6">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Navigation</span>
              <div className="flex flex-col gap-4">
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    className="text-left font-serif text-3xl hover:text-jelly transition-colors flex items-center justify-between group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.5, ease }}
                  >
                    <span className={currentRoute === item.path ? 'text-jelly' : ''}>{item.label}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
                  </motion.button>
                ))}
              </div>

              <div className="h-px bg-white/10 my-4" />

              {/* Sub items / Home anchors */}
              <div className="flex gap-6">
                {subItems.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    className="text-xs font-mono tracking-wider text-white/70 hover:text-white transition-colors cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    // {item.label}
                  </motion.button>
                ))}
              </div>
            </nav>

            {/* CTA & Status details at bottom of menu */}
            <div className="flex flex-col gap-6">
              <motion.button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full py-4 bg-jelly text-ink rounded-full text-sm font-bold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-jelly/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a Project</span>
              </motion.button>

              <motion.div 
                className="flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-jelly animate-pulse" />
                  <span>US &amp; UK // Open</span>
                </div>
                <div className="tabular-nums">
                  ET: {time || '12:00 PM'}
                </div>
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
