import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Clock, MapPin, ChevronDown, CheckCircle, Sparkles, ArrowRight, ArrowLeft, 
  MessageSquare, Video, Globe, Code, Palette, Phone
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const faqs = [
  {
    question: 'How do you work across time zones?',
    answer: 'We are structured specifically for async collaboration. When you submit a project brief, we share a custom dashboard link where you can view updates, inspect draft files, and leave feedback directly on the canvas (using platforms like Figma and frame.io). We communicate clearly via Loom videos and Slack updates, minimizing the need for meetings.'
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer an Aesthetic Guarantee. Your initial invoice is split 50/50 (deposit and completion). If, after reviewing the first round of drafts, you feel our creative direction does not align with your vision, we will refund your 50% deposit in full and cancel the project immediately. No questions asked.'
  },
  {
    question: 'Do you offer monthly design retainers?',
    answer: 'No. We believe retainers incentivize slow work. Instead, we offer transparent flat-rate pricing per project (e.g., pricing per video ad pack or per website launch). This gives you complete control over your cash flow and ensures we deliver high-quality work rapidly.'
  },
  {
    question: 'What deliverables do I receive in a video campaign?',
    answer: 'You receive high-res MP4 masters in all relevant formats: vertical (9:16) for TikTok and Reels, square (1:1) for feed placement, and wide (16:9) for YouTube or desktop ads. We provide native project links, export files, custom voiceovers (both synthesized AI and professional human records), and licensed audio files.'
  }
];

const serviceOptions = [
  {
    id: 'ai-video-ad',
    label: 'AI Video Ad',
    desc: '⚡ Shipped in 24-48h',
    icon: Video,
    color: 'border-red-500/20 hover:border-red-500/40 text-red-600 bg-red-50/20'
  },
  {
    id: 'website',
    label: 'Website Design',
    desc: '🌐 Sub-second speeds',
    icon: Globe,
    color: 'border-blue-500/20 hover:border-blue-500/40 text-blue-600 bg-blue-50/20'
  },
  {
    id: 'vibe-coded-app',
    label: 'Vibe-Coded App',
    desc: '📱 Custom React builds',
    icon: Code,
    color: 'border-emerald-500/20 hover:border-emerald-500/40 text-emerald-600 bg-emerald-50/20'
  },
  {
    id: 'brand-identity',
    label: 'Brand Identity',
    desc: '🎨 Bold brand guidelines',
    icon: Palette,
    color: 'border-amber-500/20 hover:border-amber-500/40 text-amber-600 bg-amber-50/20'
  },
  {
    id: 'not-sure',
    label: 'Other / Let\'s Talk',
    desc: '💬 Custom consulting',
    icon: MessageSquare,
    color: 'border-purple-500/20 hover:border-purple-500/40 text-purple-600 bg-purple-50/20'
  }
];

const budgetOptions = [
  { val: 'under-2k', label: '< $2,000' },
  { val: '2k-5k', label: '$2,000 – $5,000' },
  { val: '5k-10k', label: '$5,000 – $10,000' },
  { val: '10k-plus', label: '$10,000+' }
];

const timelineOptions = [
  { val: 'urgent', label: '⚡ 24-48 Hours (AI Rush)' },
  { val: '1-week', label: '📅 1 Week' },
  { val: '2-3-weeks', label: '📅 2-3 Weeks' },
  { val: 'flexible', label: '🗓️ Flexible' }
];

const aiBriefTemplates = {
  'ai-video-ad': `Campaign Goal: Launch a new product campaign
Target Audience: Millennial beverage consumers
Key Message: The ultimate sugar-free energy boost
Visual Vibe: High-fidelity slow motion, bright summer colors, energetic liquid splashes`,
  'website': `Company Type: Premium e-commerce brand
Core Pages: Home, Product Grid, Checkout, About
Key Integrations: Stripe payment processing, headless Shopify
Visual Vibe: Minimalist dark mode, smooth transitions, clean typography`,
  'vibe-coded-app': `App Type: Mobile-first branch manager / POS dashboard
Key Features: Offline billing support, staff PIN cashout, WhatsApp reporting
Platform: Web app (React + Tailwind)
Visual Vibe: Compact, dashboard-style, high readability`,
  'brand-identity': `Brand Name: [Brand Name]
Industry: Sustainable fashion tech
Deliverables: Logo package, typography system, brand guideline deck
Visual Vibe: Clean organic colors, modern sans-serif, premium minimalist`,
  'not-sure': `Brief Description: [Briefly describe your idea]
Our Target Audience is: [Audience]
Reference Styles: [Style links or adjectives]`
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    brief: '',
    budget: '',
    timeline: '',
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.service) return;
    if (step === 2 && (!formData.name || !formData.email || !validateEmail(formData.email))) return;
    if (step === 3 && !formData.brief) return;

    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAiBriefAssist = () => {
    const template = aiBriefTemplates[formData.service] || aiBriefTemplates['not-sure'];
    setFormData(prev => ({
      ...prev,
      brief: template
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.service && formData.brief) {
      const selectedService = serviceOptions.find(s => s.id === formData.service)?.label || formData.service;
      const selectedBudget = budgetOptions.find(b => b.val === formData.budget)?.label || 'Not specified';
      const selectedTimeline = timelineOptions.find(t => t.val === formData.timeline)?.label || 'Not specified';

      const whatsappText = `Hello Jellycut Studios,\n\nI would like to discuss a project:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Service:* ${selectedService}\n*Timeline:* ${selectedTimeline}\n*Budget:* ${selectedBudget}\n\n*Brief:* \n${formData.brief}`;
      const whatsappUrl = `https://wa.me/919400025062?text=${encodeURIComponent(whatsappText)}`;
      
      window.open(whatsappUrl, '_blank');

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setStep(1);
        setFormData({ name: '', email: '', service: '', brief: '', budget: '', timeline: '' });
      }, 5000);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Choose Service';
      case 2: return 'Your Info';
      case 3: return 'Project Vision';
      case 4: return 'Budget & Timeline';
      default: return '';
    }
  };

  return (
    <section className="relative min-h-screen bg-paper text-ink pt-32 md:pt-8 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="max-w-3xl mb-16 mt-8">
          <span className="text-jelly-deep text-xs font-semibold tracking-widest uppercase mb-4 block font-mono">
            Get In Touch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] font-normal tracking-tight">
            Let's build something impossible to scroll past.
          </h1>
          <p className="mt-5 text-muted text-sm md:text-base font-light leading-relaxed max-w-xl">
            Have an idea for a campaign, design launch, or custom application? Fill in the details below, and we will get back to you within 24 hours.
          </p>
        </div>

        {/* Split Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-t border-line pt-12">
          
          {/* Left Column: Coordinates & FAQs */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Quick coordinates */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-ink font-normal">Coordinates</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:jellycutstudios@gmail.com" 
                  className="flex items-center gap-3 p-3 bg-white border border-line rounded-2xl hover:border-jelly transition-colors group cursor-pointer"
                >
                  <div className="bg-cream text-jelly-deep p-2 rounded-xl group-hover:bg-jelly/10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">Email Address</div>
                    <div className="text-xs font-bold text-ink group-hover:text-jelly-deep transition-colors">jellycutstudios@gmail.com</div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/919400025062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white border border-line rounded-2xl hover:border-jelly transition-colors group cursor-pointer"
                >
                  <div className="bg-cream text-jelly-deep p-2 rounded-xl group-hover:bg-jelly/10">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">WhatsApp</div>
                    <div className="text-xs font-bold text-ink group-hover:text-jelly-deep transition-colors">+91 9400025062</div>
                  </div>
                </a>

                <a 
                  href="tel:+919400018008"
                  className="flex items-center gap-3 p-3 bg-white border border-line rounded-2xl hover:border-jelly transition-colors group cursor-pointer"
                >
                  <div className="bg-cream text-jelly-deep p-2 rounded-xl group-hover:bg-jelly/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">Call Us</div>
                    <div className="text-xs font-bold text-ink group-hover:text-jelly-deep transition-colors">+91 9400018008</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 bg-white border border-line rounded-2xl">
                  <div className="bg-cream text-jelly-deep p-2 rounded-xl">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">Business Hours</div>
                    <div className="text-xs font-bold text-ink">9:00 AM – 6:00 PM IST // Async Friendly</div>
                  </div>
                </div>

                <a 
                  href="https://maps.app.goo.gl/FW4w87cYtvGjYMHN6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white border border-line rounded-2xl hover:border-jelly transition-colors group cursor-pointer"
                >
                  <div className="bg-cream text-jelly-deep p-2 rounded-xl group-hover:bg-jelly/10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">Location</div>
                    <div className="text-xs font-bold text-ink group-hover:text-jelly-deep transition-colors">Vengara Rd, opp. Market, Kooriyad, Kerala</div>
                  </div>
                </a>
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-ink font-normal">Common Inquiries</h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div 
                      key={index}
                      className="bg-white border border-line rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer hover:bg-cream/45 transition-colors"
                      >
                        <span className="text-xs font-bold text-ink">{faq.question}</span>
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4 text-jelly-deep transform rotate-180 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted transition-transform duration-300" />
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                          >
                            <div className="px-5 pb-5 text-muted text-xs font-light leading-relaxed border-t border-line/40 pt-3">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Premium Interactive Intake Wizard */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-line rounded-[32px] p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-jelly/5 blur-3xl pointer-events-none" />

              {!formSubmitted ? (
                <>
                  {/* Progress Header */}
                  <div className="flex flex-col gap-3 mb-8">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4.5 h-4.5 text-jelly-deep" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-jelly-deep font-semibold">
                          Jellycut Portal // Step {step} of 4
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-muted uppercase">
                        {getStepTitle()}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-cream border border-line/35 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-jelly-mid rounded-full"
                        initial={{ width: '25%' }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.3, ease }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease }}
                        className="min-h-[290px] flex flex-col justify-between"
                      >
                        
                        {/* STEP 1: SERVICE SELECTION */}
                        {step === 1 && (
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-serif text-2xl text-ink font-normal leading-snug">
                                What are we creating?
                              </h3>
                              <p className="text-muted text-xs font-light mt-1">
                                Select the service that best aligns with your goals to customize your builder.
                              </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                              {serviceOptions.map((opt) => {
                                const Icon = opt.icon;
                                const isSelected = formData.service === opt.id;
                                return (
                                  <button
                                    type="button"
                                    key={opt.id}
                                    onClick={() => setFormData({ ...formData, service: opt.id })}
                                    className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                                      isSelected 
                                        ? 'bg-ink border-ink text-white shadow-md' 
                                        : 'bg-white border-line hover:border-jelly-mid/40 hover:bg-cream/20'
                                    }`}
                                  >
                                    <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                                      isSelected 
                                        ? 'bg-white/10 border-white/10 text-jelly' 
                                        : opt.color
                                    }`}>
                                      <Icon className="w-4.5 h-4.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold leading-tight truncate">{opt.label}</div>
                                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/60' : 'text-muted'}`}>{opt.desc}</div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* STEP 2: IDENTITY / INFO */}
                        {step === 2 && (
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-serif text-2xl text-ink font-normal leading-snug">
                                How can we reach you?
                              </h3>
                              <p className="text-muted text-xs font-light mt-1">
                                Tell us who you are so we can prepare your project space.
                              </p>
                            </div>
                            <div className="space-y-4 pt-2">
                              <div>
                                <label className="block text-[9px] font-semibold text-ink uppercase tracking-wider mb-2 font-mono">
                                  Your Name
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="e.g. Alex Rivera"
                                  className="w-full bg-cream border border-line rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-jelly transition-colors text-ink placeholder:text-muted/50 font-sans"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-semibold text-ink uppercase tracking-wider mb-2 font-mono">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  placeholder="hello@yourbrand.com"
                                  className={`w-full bg-cream border rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors text-ink placeholder:text-muted/50 font-sans ${
                                    formData.email && !validateEmail(formData.email) 
                                      ? 'border-red-400 focus:border-red-500' 
                                      : 'border-line focus:border-jelly'
                                  }`}
                                />
                                {formData.email && !validateEmail(formData.email) && (
                                  <span className="text-[10px] text-red-500 font-mono mt-1 block">Please enter a valid email address</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 3: BRIEF / THE VISION */}
                        {step === 3 && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h3 className="font-serif text-2xl text-ink font-normal leading-snug">
                                  Tell us about the vision
                                </h3>
                                <p className="text-muted text-xs font-light mt-1">
                                  Detail your project goals, references, or specific deliverables.
                                </p>
                              </div>
                              
                              {/* AI Assist Button */}
                              <button
                                type="button"
                                onClick={handleAiBriefAssist}
                                className="flex items-center gap-1.5 bg-jelly text-ink hover:bg-jelly/90 text-[10px] font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm border border-jelly-deep/15 flex-shrink-0 animate-pulse hover:animate-none"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>AI Assist</span>
                              </button>
                            </div>

                            <div className="pt-2">
                              <textarea
                                required
                                rows="5"
                                value={formData.brief}
                                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                                placeholder="Detail your project guidelines... Use the AI Assist button to populate a custom industry brief template you can fill in!"
                                className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-jelly transition-colors text-ink placeholder:text-muted/50 resize-none h-40 font-mono leading-relaxed"
                              />
                            </div>
                          </div>
                        )}

                        {/* STEP 4: TIMELINE & BUDGET */}
                        {step === 4 && (
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-serif text-2xl text-ink font-normal leading-snug">
                                Timeline &amp; Budget
                              </h3>
                              <p className="text-muted text-xs font-light mt-1">
                                Help us gauge velocity and resource allocation.
                              </p>
                            </div>
                            
                            <div className="space-y-5 pt-2">
                              {/* Budget selector pills */}
                              <div>
                                <label className="block text-[9px] font-semibold text-ink uppercase tracking-wider mb-2.5 font-mono">
                                  Estimated Budget
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {budgetOptions.map((opt) => {
                                    const isSel = formData.budget === opt.val;
                                    return (
                                      <button
                                        type="button"
                                        key={opt.val}
                                        onClick={() => setFormData({ ...formData, budget: opt.val })}
                                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                          isSel
                                            ? 'bg-ink border-ink text-white shadow-sm'
                                            : 'bg-cream border-line text-muted hover:border-jelly hover:text-ink'
                                        }`}
                                      >
                                        {opt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Timeline selector pills */}
                              <div>
                                <label className="block text-[9px] font-semibold text-ink uppercase tracking-wider mb-2.5 font-mono">
                                  Desired Delivery
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {timelineOptions.map((opt) => {
                                    const isSel = formData.timeline === opt.val;
                                    return (
                                      <button
                                        type="button"
                                        key={opt.val}
                                        onClick={() => setFormData({ ...formData, timeline: opt.val })}
                                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                          isSel
                                            ? 'bg-ink border-ink text-white shadow-sm'
                                            : 'bg-cream border-line text-muted hover:border-jelly hover:text-ink'
                                        }`}
                                      >
                                        {opt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      </motion.div>
                    </AnimatePresence>

                    {/* Step Navigation Button Row */}
                    <div className="flex gap-4 pt-6 border-t border-line/65">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex items-center justify-center gap-1.5 border border-line bg-white hover:bg-cream text-ink font-semibold py-3 px-5 rounded-xl text-xs transition-all cursor-pointer active:scale-95"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                      )}

                      {step < 4 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={
                            (step === 1 && !formData.service) ||
                            (step === 2 && (!formData.name || !formData.email || !validateEmail(formData.email))) ||
                            (step === 3 && !formData.brief)
                          }
                          className="flex-grow flex items-center justify-center gap-1.5 bg-ink hover:bg-ink/90 text-white font-semibold py-3 px-5 rounded-xl text-xs transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="flex-grow flex items-center justify-center gap-2 bg-jelly text-ink hover:bg-jelly/90 font-bold py-3.5 px-5 rounded-xl text-xs transition-all cursor-pointer active:scale-95 shadow-md shadow-jelly/10"
                        >
                          <span>Compile &amp; Open WhatsApp</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  className="py-16 text-center flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="bg-jelly/15 text-jelly-deep p-4 rounded-full mb-6">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="font-serif text-3xl text-ink font-normal mb-3">
                    Project brief received!
                  </h3>
                  <p className="text-muted text-xs md:text-sm font-light max-w-sm leading-relaxed mb-6">
                    Thank you, <strong className="text-ink font-medium">{formData.name}</strong>. We have successfully registered your inquiry. A studio producer will review your requirements and reach out to you at{' '}
                    <strong className="text-ink font-medium">{formData.email}</strong> within 24 hours.
                  </p>
                  <div className="h-px bg-line w-full max-w-xs my-6" />
                  <p className="text-[11px] font-mono text-jelly-deep uppercase tracking-wider">
                    Status: Compiling Proposal...
                  </p>
                </motion.div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
