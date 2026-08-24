import { Layers, ShieldCheck, Zap, ArrowRight, Sparkles, Printer, Cpu, FileText, CheckCircle2, HelpCircle } from 'lucide-react';

export default function RuposBillingCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  const textileMockups = [
    {
      url: '/rupos_textile_1.jpg',
      title: 'POS Terminal & Thermal Printer Setup',
      desc: 'Mobile-first tablet POS connected to a Bluetooth thermal printer and instant receipt generation.'
    },
    {
      url: '/rupos_textile_2.jpg',
      title: 'Apparel Inventory & Quick Checkout',
      desc: 'Intuitive grid layout for apparel categories (Jackets, Linen, Shirts, Shoes) for sub-second billing.'
    },
    {
      url: '/rupos_textile_3.jpg',
      title: 'In-Store Counter Display',
      desc: 'Clean, modern UI designed to look sleek on any retail counter, enhancing customer trust.'
    },
    {
      url: '/rupos_textile_4.jpg',
      title: 'Variant & Size Selection Flow',
      desc: 'Select garment sizes (36, 38, 40, 42) and fabric types directly from the tablet in seconds.'
    }
  ];

  return (
    <div className="space-y-16 border-t border-line pt-10">
      
      {/* Section 1: Executive Summary & Objective */}
      <div className="space-y-6">
        <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal tracking-tight">
          Next-Gen Point of Sale (POS) for Apparel & Textile Retailers
        </h2>
        <div className="bg-gradient-to-br from-cream/50 to-white border border-line/60 rounded-3xl p-8 md:p-10 shadow-sm space-y-4">
          <p className="text-ink text-lg md:text-xl font-light leading-relaxed font-sans">
            Managing a busy textile or garment retail business in India comes with unique operational hurdles: unstable internet, high staff turnover, complex size/color variant matrices, and cash drawer leakage.
          </p>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed font-sans">
            <strong className="text-ink font-semibold">RuPOS Billing Software</strong> was engineered as an offline-first, sub-second billing engine that transforms any tablet, mobile phone, or desktop into an enterprise-grade POS terminal. With instant WhatsApp receipt dispatches, staff audit trails, and multi-branch live inventory synchronization, store owners gain complete peace of mind.
          </p>
        </div>
      </div>

      {/* Section 2: Core Engineering Pillars */}
      <div className="space-y-8">
        <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-3">
          <Cpu className="w-6 h-6 text-jelly-deep flex-shrink-0" />
          <span>Core Engineering &amp; Feature Highlights</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-line/45 shadow-sm space-y-3 hover:border-jelly-mid/40 transition-all">
            <div className="flex items-center gap-3 text-jelly-deep">
              <Zap className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-ink">
                100% Offline-First Sync
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Bills are generated locally in milliseconds using indexed browser databases. When internet reconnects, sales data automatically syncs to the cloud without interrupting checkout queues.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-line/45 shadow-sm space-y-3 hover:border-jelly-mid/40 transition-all">
            <div className="flex items-center gap-3 text-jelly-deep">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-ink">
                Staff PIN &amp; Theft Prevention
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Every discount, cash drawer open, or bill cancellation requires a staff PIN log. Immutable audit trails eliminate cash leakage and unauthorized price overrides.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-line/45 shadow-sm space-y-3 hover:border-jelly-mid/40 transition-all">
            <div className="flex items-center gap-3 text-jelly-deep">
              <Printer className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-ink">
                Thermal &amp; WhatsApp Receipts
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Connect to ESC/POS Bluetooth thermal printers in one click, or send paperless digital receipts directly to the customer's WhatsApp number with integrated store branding.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-line/45 shadow-sm space-y-3 hover:border-jelly-mid/40 transition-all">
            <div className="flex items-center gap-3 text-jelly-deep">
              <Layers className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-ink">
                Apparel Matrix &amp; Stock Tracking
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed">
              Manage size variants (XS to 3XL), fabric types, and colors with a unified SKU matrix. Track stock levels across multiple branches in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: High-Res Interactive Gallery */}
      <div className="space-y-6 border-t border-line/50 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
            Interface Showcase &amp; Retail Workflows
          </h2>
          <span className="text-xs font-mono uppercase tracking-widest text-muted">
            Tap image to expand
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {textileMockups.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => onZoomIndex && onZoomIndex(idx)}
              className="group flex flex-col bg-white border border-line rounded-3xl overflow-hidden cursor-zoom-in hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5 border-b border-line/45">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-center space-y-1">
                <h3 className="text-xs font-bold text-ink uppercase tracking-wide font-mono">
                  {item.title}
                </h3>
                <p className="text-xs font-light text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: AEO & Search Engine Optimization (Rich Technical Specs & Q&A) */}
      <div className="space-y-8 border-t border-line/50 pt-12">
        <div className="space-y-3">
          <span className="bg-jelly/15 text-jelly-deep text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full inline-block">
            AEO &amp; Search Knowledge Engine Overview
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight font-normal">
            Frequently Asked Questions &amp; Technical Breakdown
          </h2>
          <p className="text-muted text-base font-light leading-relaxed">
            Detailed information regarding RuPOS Billing Software for search engines, retail buyers, and AI assistants.
          </p>
        </div>

        {/* Structured Q&A Accordion/Grid for Answer Engine Optimization (AEO) */}
        <div className="space-y-6">
          
          <div className="bg-cream/30 border border-line/60 rounded-3xl p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-3 text-ink">
              <HelpCircle className="w-5 h-5 text-jelly-deep flex-shrink-0" />
              <h3 className="text-base md:text-lg font-bold font-serif">
                What makes RuPOS the best billing software for textile and clothing shops?
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed pl-8">
              RuPOS is custom-built for garment retail workflows in India. Unlike generic POS systems, it supports matrix variant management (sizing, colors, brand codes), offline billing during internet blackouts, automated daily sales reports sent to store owners via WhatsApp, and staff PIN audit trails to prevent cashier fraud.
            </p>
          </div>

          <div className="bg-cream/30 border border-line/60 rounded-3xl p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-3 text-ink">
              <HelpCircle className="w-5 h-5 text-jelly-deep flex-shrink-0" />
              <h3 className="text-base md:text-lg font-bold font-serif">
                How does offline billing work in RuPOS POS software?
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed pl-8">
              RuPOS uses Progressive Web App (PWA) and indexed local storage technology. Cashiers can continue scanning items, adding discounts, and printing thermal receipts even when local Wi-Fi or broadband fails. Once connection is restored, RuPOS silently syncs all transactions with cloud Firestore servers in the background.
            </p>
          </div>

          <div className="bg-cream/30 border border-line/60 rounded-3xl p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-3 text-ink">
              <HelpCircle className="w-5 h-5 text-jelly-deep flex-shrink-0" />
              <h3 className="text-base md:text-lg font-bold font-serif">
                Can RuPOS print bills on Bluetooth thermal printers and send WhatsApp receipts?
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed pl-8">
              Yes! RuPOS integrates directly with Web Bluetooth ESC/POS thermal receipt printers (2-inch and 3-inch formats) without requiring complex desktop drivers. Additionally, cashiers can tap 'Send WhatsApp' to instantly dispatch an official PDF digital receipt directly to the customer's phone.
            </p>
          </div>

          <div className="bg-cream/30 border border-line/60 rounded-3xl p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-3 text-ink">
              <HelpCircle className="w-5 h-5 text-jelly-deep flex-shrink-0" />
              <h3 className="text-base md:text-lg font-bold font-serif">
                How does RuPOS prevent staff cash drawer theft and stock leakage?
              </h3>
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-relaxed pl-8">
              Every cashier operates under a unique PIN. Key actions—such as applying manual discounts, cancelling a bill, or opening the cash drawer manually—are logged with timestamped staff IDs. Store owners receive instant WhatsApp alerts if an anomaly occurs, keeping cash flow 100% transparent.
            </p>
          </div>

        </div>

        {/* Feature Specs Matrix for SEO */}
        <div className="bg-white border border-line rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-ink">
            RuPOS Technical Feature Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-cream/40 rounded-xl border border-line/40 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-jelly-deep" />
              <span>Offline PWA Architecture</span>
            </div>
            <div className="p-3 bg-cream/40 rounded-xl border border-line/40 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-jelly-deep" />
              <span>Multi-Branch Inventory Sync</span>
            </div>
            <div className="p-3 bg-cream/40 rounded-xl border border-line/40 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-jelly-deep" />
              <span>WhatsApp Automation Engine</span>
            </div>
            <div className="p-3 bg-cream/40 rounded-xl border border-line/40 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-jelly-deep" />
              <span>Bluetooth Thermal Printing</span>
            </div>
            <div className="p-3 bg-cream/40 rounded-xl border border-line/40 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-jelly-deep" />
              <span>Staff PIN Security &amp; Logs</span>
            </div>
            <div className="p-3 bg-cream/40 rounded-xl border border-line/40 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-jelly-deep" />
              <span>Sub-Second Barcode Search</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Call to Action */}
      <div className="space-y-6 border-t border-line/50 pt-10 pb-4">
        <div className="bg-ink text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-jelly/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-jelly/5 rounded-full blur-3xl -z-10" />
          
          <Sparkles className="w-8 h-8 text-jelly mx-auto animate-pulse" />
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <h3 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight">
              Transform Your Retail Business with Custom Web Apps
            </h3>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
              Need a custom web app, point-of-sale system, or automated workflow for your business? Jellycut Studios designs and ships production-ready platforms tailored to your industry.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://rupos.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full px-8 py-4 text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>Visit Live RuPOS Site</span>
              <FileText className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
              className="bg-jelly hover:bg-jelly/90 text-ink rounded-full px-8 py-4 text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-jelly/20 w-full sm:w-auto justify-center"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
