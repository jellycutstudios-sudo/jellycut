import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Check } from 'lucide-react';

const services = [
  { id: 'video', label: 'AI Video Ad', basePrice: 1500 },
  { id: 'brand', label: 'Brand Identity', basePrice: 3500 },
  { id: 'web', label: 'Cinematic Website', basePrice: 5000 },
  { id: 'app', label: 'Vibe-Coded Web App', basePrice: 8500 }
];

const scopes = {
  video: [
    { id: 'single', label: 'Single Video (3 Formats)', multiplier: 1 },
    { id: 'pack', label: '3-Video Campaign', multiplier: 2.5 },
  ],
  brand: [
    { id: 'lite', label: 'Logo + Colors', multiplier: 1 },
    { id: 'full', label: 'Full Brand Guidelines', multiplier: 1.5 },
  ],
  web: [
    { id: 'landing', label: 'Landing Page', multiplier: 1 },
    { id: 'multi', label: 'Multi-Page CMS Site', multiplier: 1.8 },
  ],
  app: [
    { id: 'mvp', label: 'Core MVP', multiplier: 1 },
    { id: 'scale', label: 'Full Production Build', multiplier: 1.6 },
  ]
};

export default function PriceEstimator({ setIsModalOpen }) {
  const [selectedService, setSelectedService] = useState('video');
  const [selectedScope, setSelectedScope] = useState('single');
  const [isRush, setIsRush] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Update scope when service changes if current scope is invalid
  useEffect(() => {
    const validScopes = scopes[selectedService];
    if (!validScopes.find(s => s.id === selectedScope)) {
      setSelectedScope(validScopes[0].id);
    }
  }, [selectedService]);

  useEffect(() => {
    const service = services.find(s => s.id === selectedService);
    const scopeMulti = scopes[selectedService].find(s => s.id === selectedScope)?.multiplier || 1;
    const rushMulti = isRush ? 1.3 : 1; // 30% rush fee

    const price = service.basePrice * scopeMulti * rushMulti;
    setEstimatedPrice(Math.round(price));
  }, [selectedService, selectedScope, isRush]);

  return (
    <div className="w-full bg-white rounded-[2.5rem] border border-line/60 shadow-xl overflow-hidden flex flex-col md:flex-row">
      
      {/* Left side: Controls */}
      <div className="w-full md:w-3/5 p-8 md:p-10 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
            <Calculator className="w-5 h-5 text-jelly-deep" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-ink">Project Estimator</h3>
            <p className="text-muted text-sm font-light">Get a rough idea before we talk.</p>
          </div>
        </div>

        {/* Service Type */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-widest text-muted font-semibold">
            1. Select Service
          </label>
          <div className="grid grid-cols-2 gap-2">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-4 py-3 text-sm font-medium rounded-xl border transition-all text-left ${
                  selectedService === service.id 
                    ? 'border-jelly-deep bg-jelly/10 text-ink'
                    : 'border-line/60 bg-white hover:bg-cream/50 text-muted'
                }`}
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scope */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-widest text-muted font-semibold">
            2. Select Scope
          </label>
          <div className="grid grid-cols-2 gap-2">
            {scopes[selectedService].map((scope) => (
              <button
                key={scope.id}
                onClick={() => setSelectedScope(scope.id)}
                className={`px-4 py-3 text-sm font-medium rounded-xl border transition-all text-left ${
                  selectedScope === scope.id 
                    ? 'border-jelly-deep bg-jelly/10 text-ink'
                    : 'border-line/60 bg-white hover:bg-cream/50 text-muted'
                }`}
              >
                {scope.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => setIsRush(!isRush)}
            className="flex items-center gap-3 group"
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              isRush ? 'bg-jelly-deep border-jelly-deep' : 'border-line/80 bg-white group-hover:border-jelly-deep/50'
            }`}>
              {isRush && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className="text-sm font-medium text-ink">
              Rush Delivery (48h Turnaround, +30%)
            </span>
          </button>
        </div>
      </div>

      {/* Right side: Result & CTA */}
      <div className="w-full md:w-2/5 bg-ink p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-jelly/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="space-y-2 mb-8">
          <p className="text-white/60 text-xs font-mono uppercase tracking-widest">
            Estimated Investment
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-white/50 text-2xl font-light">From $</span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={estimatedPrice}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-5xl md:text-6xl text-white font-normal tracking-tight"
              >
                {estimatedPrice.toLocaleString()}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="text-white/40 text-[10px] font-mono leading-relaxed mt-2 max-w-[200px]">
            *Final cost depends on specific requirements and brief complexity.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen && setIsModalOpen(true)}
          className="w-full bg-jelly hover:bg-jelly/90 hover:scale-[1.02] text-ink rounded-full px-6 py-4 text-xs font-bold tracking-wide transition-all shadow-lg shadow-jelly/20 flex items-center justify-center gap-2"
        >
          <span>Get Custom Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
