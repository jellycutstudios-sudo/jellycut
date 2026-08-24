import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Check, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const services = [
  { 
    id: 'video', 
    label: 'AI Video Ad', 
    basePrice: 149,
    scopes: [
      { id: 'single', label: 'Single Video (MP4 in 3 Formats)', price: 149, delivery: '48 Hours' },
      { id: 'pack', label: '3-Video Campaign Pack (MP4)', price: 349, delivery: '3-4 Days' },
    ]
  },
  { 
    id: 'brand', 
    label: 'Brand Identity', 
    basePrice: 449,
    scopes: [
      { id: 'lite', label: 'Logo + Color Palette', price: 449, delivery: '2-3 Days' },
      { id: 'full', label: 'Full Brand Guidelines & Assets', price: 799, delivery: '5-7 Days' },
    ]
  },
  { 
    id: 'web', 
    label: 'Cinematic Website', 
    basePrice: 799,
    scopes: [
      { id: 'landing', label: 'High-Converting Landing Page', price: 799, delivery: '3-5 Days' },
      { id: 'multi', label: 'Multi-Page CMS Website', price: 1499, delivery: '1-2 Weeks' },
    ]
  },
  { 
    id: 'app', 
    label: 'Web App / Tool', 
    basePrice: 1099,
    scopes: [
      { id: 'mvp', label: 'Core Interactive MVP', price: 1099, delivery: '1-2 Weeks' },
      { id: 'scale', label: 'Full Custom Application', price: 1999, delivery: '2-3 Weeks' },
    ]
  }
];

export default function PriceEstimator({ setIsModalOpen }) {
  const [selectedService, setSelectedService] = useState('video');
  const [selectedScopeIndex, setSelectedScopeIndex] = useState(0);
  const [isRush, setIsRush] = useState(false);

  const currentService = services.find(s => s.id === selectedService) || services[0];
  const currentScope = currentService.scopes[selectedScopeIndex] || currentService.scopes[0];

  const calculatedPrice = isRush 
    ? Math.round(currentScope.price * 1.25) // friendly +25% rush
    : currentScope.price;

  const handleServiceChange = (id) => {
    setSelectedService(id);
    setSelectedScopeIndex(0);
  };

  return (
    <div className="w-full bg-paper rounded-[2.5rem] border border-line/70 shadow-xl overflow-hidden flex flex-col md:flex-row">
      
      {/* Left side: Friendly Controls */}
      <div className="w-full md:w-3/5 p-8 md:p-10 space-y-7">
        
        {/* Header with Budget-Friendly Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center border border-line/60">
              <Calculator className="w-5 h-5 text-jelly-deep" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-ink font-normal">Project Estimator</h3>
              <p className="text-muted text-xs md:text-sm font-light">Transparent, studio-direct rates with zero agency markups.</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-cream border border-line text-jelly-deep px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Budget-Friendly
          </span>
        </div>

        {/* 1. Service Picker */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-mono uppercase tracking-widest text-muted font-bold block">
            01 // Select Service
          </label>
          <div className="grid grid-cols-2 gap-2">
            {services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => handleServiceChange(svc.id)}
                className={`px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedService === svc.id 
                    ? 'border-jelly-deep bg-cream text-jelly-deep font-semibold shadow-xs ring-1 ring-jelly-deep/20'
                    : 'border-line bg-white hover:border-jelly-deep/40 hover:bg-cream/30 text-ink/80 text-sm font-normal'
                }`}
              >
                <div className="text-xs md:text-sm">{svc.label}</div>
                <div className="text-[10px] text-muted font-mono mt-0.5">From ${svc.basePrice}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Scope Picker */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-mono uppercase tracking-widest text-muted font-bold block">
            02 // Select Package & Scope
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentService.scopes.map((scope, idx) => (
              <button
                key={scope.id}
                onClick={() => setSelectedScopeIndex(idx)}
                className={`px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedScopeIndex === idx 
                    ? 'border-jelly-deep bg-cream text-jelly-deep font-semibold shadow-xs ring-1 ring-jelly-deep/20'
                    : 'border-line bg-white hover:border-jelly-deep/40 hover:bg-cream/30 text-ink/80 text-sm font-normal'
                }`}
              >
                <div className="text-xs md:text-sm">{scope.label}</div>
                <div className="text-[10px] text-muted font-mono mt-0.5">Est. {scope.delivery}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Fast-Track Toggle */}
        <div className="pt-1 flex items-center justify-between border-t border-line/50">
          <button
            onClick={() => setIsRush(!isRush)}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              isRush ? 'bg-jelly-deep border-jelly-deep' : 'border-line bg-white group-hover:border-jelly-deep'
            }`}>
              {isRush && <Check className="w-3 h-3 text-white stroke-[3]" />}
            </div>
            <span className="text-xs font-medium text-ink flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Priority 48-Hour Rush Delivery (+25%)</span>
            </span>
          </button>

          <span className="text-[10px] font-mono text-muted hidden sm:inline-block">
            Standard: {currentScope.delivery}
          </span>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-line/40 text-center">
          <div className="bg-white border border-line/60 rounded-lg py-2 px-1">
            <div className="text-[10px] font-bold text-ink">Free Revisions</div>
            <div className="text-[9px] text-muted font-light">Until satisfied</div>
          </div>
          <div className="bg-white border border-line/60 rounded-lg py-2 px-1">
            <div className="text-[10px] font-bold text-ink">Zero Lock-In</div>
            <div className="text-[9px] text-muted font-light">Milestone payments</div>
          </div>
          <div className="bg-white border border-line/60 rounded-lg py-2 px-1">
            <div className="text-[10px] font-bold text-ink">100% Direct</div>
            <div className="text-[9px] text-muted font-light">No agency bloat</div>
          </div>
        </div>

      </div>

      {/* Right side: Clear, Accessible Investment Summary */}
      <div className="w-full md:w-2/5 bg-ink p-8 md:p-10 flex flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-jelly/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-jelly">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Studio-Direct Pricing</span>
          </div>

          <div className="pt-2">
            <p className="text-white/60 text-xs font-mono uppercase tracking-wider">
              Estimated Investment
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-white/40 text-xl font-light font-mono">From</span>
              <span className="text-jelly text-2xl md:text-3xl font-light font-mono">$</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={calculatedPrice}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-5xl md:text-6xl text-white font-normal tracking-tight"
                >
                  {calculatedPrice}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1 mt-3">
            <div className="text-xs font-semibold text-white flex items-center justify-between">
              <span>{currentService.label}</span>
              <span className="text-jelly font-mono text-[11px]">${calculatedPrice}</span>
            </div>
            <p className="text-[11px] text-white/60 font-light">
              {currentScope.label} • {isRush ? 'Priority 48h Delivery' : currentScope.delivery}
            </p>
          </div>

          <p className="text-white/40 text-[10px] font-mono leading-relaxed pt-1">
            *Have a custom budget or unique requirement? We tailor packages to fit your scope.
          </p>
        </div>

        <div className="pt-6">
          <button
            onClick={() => setIsModalOpen && setIsModalOpen(true)}
            className="w-full bg-jelly hover:bg-jelly-mid text-ink rounded-full px-6 py-4 text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-lg shadow-jelly/20 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
          >
            <span>Start With This Budget</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
