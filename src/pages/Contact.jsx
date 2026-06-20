import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, MapPin, ChevronDown, CheckCircle, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

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

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    brief: '',
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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
      const whatsappUrl = `https://wa.me/919400112833?text=${encodeURIComponent(whatsappText)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', service: '', brief: '' });
      }, 5000);
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
                  href="mailto:hello@jellycut.studio" 
                  className="flex items-center gap-3 p-3 bg-white border border-line rounded-2xl hover:border-jelly transition-colors group cursor-pointer"
                >
                  <div className="bg-cream text-jelly-deep p-2 rounded-xl group-hover:bg-jelly/10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">Email Address</div>
                    <div className="text-xs font-bold text-ink group-hover:text-jelly-deep transition-colors">hello@jellycut.studio</div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/919400112833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white border border-line rounded-2xl hover:border-jelly transition-colors group cursor-pointer"
                >
                  <div className="bg-cream text-jelly-deep p-2 rounded-xl group-hover:bg-jelly/10">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-muted font-mono">WhatsApp</div>
                    <div className="text-xs font-bold text-ink group-hover:text-jelly-deep transition-colors">+91 9400112833</div>
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

          {/* Right Column: Interactive Intake Widget */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-line rounded-[32px] p-6 md:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-jelly/5 blur-3xl pointer-events-none" />

              {!formSubmitted ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-jelly-deep" />
                    <span className="text-xs font-mono uppercase tracking-wider text-jelly-deep font-semibold">
                      Jellycut Portal // Online
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl text-ink font-normal mb-2 leading-snug">
                    Tell us about your project
                  </h3>
                  <p className="text-muted text-xs md:text-sm font-light leading-relaxed mb-8">
                    Compile your brief in 15 minutes. We will review and provide a structured project statement and proposal within 24 hours.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-semibold text-ink uppercase tracking-wider mb-2 font-sans">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Rivera"
                        className="w-full bg-cream border border-line rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-jelly transition-colors text-ink placeholder:text-muted/50"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-semibold text-ink uppercase tracking-wider mb-2 font-sans">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="hello@yourbrand.com"
                        className="w-full bg-cream border border-line rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-jelly transition-colors text-ink placeholder:text-muted/50"
                      />
                    </div>

                    {/* Service selection pills */}
                    <div>
                      <label className="block text-[10px] font-semibold text-ink uppercase tracking-wider mb-2 font-sans">
                        What Service Do You Need?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { val: 'ai-video-ad', label: 'AI Video Ad' },
                          { val: 'brand-identity', label: 'Brand Identity' },
                          { val: 'vibe-coded-app', label: 'Vibe-Coded App' },
                          { val: 'website', label: 'Website Design' },
                          { val: 'not-sure', label: 'Not sure yet' },
                        ].map((item) => (
                          <button
                            type="button"
                            key={item.val}
                            onClick={() => setFormData({ ...formData, service: item.val })}
                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              formData.service === item.val
                                ? 'bg-ink border-ink text-white shadow-sm'
                                : 'bg-cream border-line text-muted hover:border-jelly hover:text-ink'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Brief description */}
                    <div>
                      <label className="block text-[10px] font-semibold text-ink uppercase tracking-wider mb-2 font-sans">
                        Brief &amp; Project Goals
                      </label>
                      <textarea
                        rows="4"
                        value={formData.brief}
                        onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                        placeholder="Detail your goals, budget range, timeline guidelines, or references. The more context you provide, the faster we can initiate..."
                        className="w-full bg-cream border border-line rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-jelly transition-colors text-ink placeholder:text-muted/50 resize-none h-32"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-ink hover:bg-ink/90 text-white font-semibold py-4 rounded-xl text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <span>Submit &amp; Open WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-muted text-center mt-2 font-mono">
                      Note: Submitting will open WhatsApp to send your project details.
                    </p>
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
