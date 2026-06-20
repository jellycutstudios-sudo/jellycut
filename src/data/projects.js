import { Globe, Video, Code } from 'lucide-react';

export const projects = [
  {
    id: 'p11',
    title: 'Filbey Premium Website',
    category: 'Websites',
    icon: Globe,
    description: 'A butter-smooth, ultra-fast, clean premium brand website built using advanced AI-assisted coding and design systems.',
    longDescription: 'We designed and developed a high-end website showcase for Filbey. The project prioritizes premium aesthetics, ultra-fast performance, and a completely responsive mobile-first experience. By utilizing cutting-edge AI website design systems and clean React architectures, the final build features butter-smooth interactive animations, sub-second initial load speeds, and a design that feels entirely distinct from conventional website templates.',
    timeline: '3 Days',
    deliverables: [
      'Butter-Smooth Interactive Frontend',
      'Performance Optimization (Lighthouse 100/100)',
      'Clean Mobile-Responsive Layouts',
      'Dynamic Brand Media Integration'
    ],
    results: 'Shipped a premium showcase in 3 days with sub-second page rendering and clean, native responsiveness across all device sizes.',
    image: '/filbey_home.webp',
    images: [
      '/filbey_home.webp',
      '/filbey_detail.webp'
    ],
    projectUrl: 'https://www.filbey.in/',
    color: 'from-[#1C1C1C]/40 to-jelly/10'
  },
  {
    id: 'p12',
    title: 'Dr Pepper Concept Ad',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A cinematic conceptual commercial campaign showcasing high-fidelity liquid splashes and dynamic carbonation for Dr Pepper.',
    longDescription: 'We produced a conceptual cinematic commercial campaign for Dr Pepper. Leveraging advanced generative video models, we synthesized high-fidelity animations of liquid splashes, carbonation fizz, and slow-motion product interactions. The entire sequence was post-processed with professional color grading to emphasize the iconic cherry-red branding and polished with custom Foley sound design in under 24 hours.',
    timeline: '24 Hours',
    deliverables: [
      '1x 30s Master Concept Commercial',
      'Dynamic Carbonation & Liquid Splash Assets',
      'Dr Pepper Red Color Grading Presets',
      'Immersive Foley Sound Design'
    ],
    results: 'Delivered a broadcast-ready concept commercial in 24 hours with zero physical production costs or gear requirements.',
    image: 'https://img.youtube.com/vi/9jdw_X2ADJw/hqdefault.jpg',
    youtubeId: '9jdw_X2ADJw',
    color: 'from-[#711F2E]/30 to-jelly/10'
  },
  {
    id: 'p13',
    title: 'e.l.f. Skin Concept Ad',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A cinematic conceptual commercial campaign showcasing hyper-realistic texture detail and slow-motion product physics for e.l.f. Skin.',
    longDescription: 'We produced a conceptual cinematic commercial campaign for e.l.f. Skin. Utilizing advanced AI video synthesis pipelines, we rendered hyper-detailed product shots highlighting smooth cream textures, hydrating liquid droplets, and elegant product container physics in slow motion. The sequences were color-graded to emphasize skin-health tones and completed with custom Foley sound design in under 24 hours, demonstrating how cosmetic brands can visualize premium product campaigns.',
    timeline: '24 Hours',
    deliverables: [
      '1x 30s Master Concept Commercial',
      'High-fidelity Product Texture Syntheses',
      'Cosmetic Brand Color Grading Presets',
      'Immersive Foley Sound Design'
    ],
    results: 'Produced a broadcast-quality cosmetics commercial in 24 hours with zero physical studio gear, saving over 95% in typical production budgets.',
    image: 'https://img.youtube.com/vi/i7f8MPgUqfQ/hqdefault.jpg',
    youtubeId: 'i7f8MPgUqfQ',
    color: 'from-[#EAE0D5]/40 to-jelly/10'
  },
  {
    id: 'p9',
    title: 'FeeSync Explainer Campaign',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A cinematic explainer campaign showcasing how business owners can automate weekly and monthly fee collections.',
    longDescription: 'We partnered with FeeSync to design and produce a premium product promo campaign. The video demonstrates how business owners can effortlessly add customer information to FeeSync to automate recurring billing. It clearly visualizes the process where the app automatically sends payment collection requests to clients on a weekly or monthly schedule, eliminating manual invoicing and chasing payments.',
    timeline: '48 Hours',
    deliverables: [
      '1x 60s Product Explainer Ad',
      '2x 15s Direct-Response Ad Variations',
      'Automated Billing Flow Animation'
    ],
    results: 'Successfully translated a complex automated collection flow into a clear, 60-second visual hook that accelerates client onboarding.',
    image: 'https://img.youtube.com/vi/tB6UQac9DB4/hqdefault.jpg',
    youtubeId: 'tB6UQac9DB4',
    projectUrl: 'https://feesync.com/',
    color: 'from-[#0B1E36]/40 to-jelly/10'
  },
  {
    id: 'p10',
    title: 'Froot Concept Commercial',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A vibrant conceptual AI commercial showcasing ultra-realistic liquid simulations and dynamic fruit splashes for Froot.',
    longDescription: 'We produced a conceptual cinematic commercial campaign for Froot. By leveraging custom-trained diffusion models optimized for fluid dynamics, we generated hyper-detailed fruit slices plunging into liquid waves, slow-motion splash patterns, and pristine bottle condensation runs. The sequences were color-graded with warm, summery orange tones and completed with rich Foley sound design, showing how consumer packaged goods can be visualized dramatically in 24 hours.',
    timeline: '24 Hours',
    deliverables: [
      '1x 30s Master Concept Commercial',
      'Dynamic Fluid Simulation Assets',
      'Summer-themed Color Grading Presets',
      'Immersive Foley Sound Design'
    ],
    results: 'Created a broadcast-quality beverage commercial in 24 hours with zero camera equipment or production set, saving over 95% in typical production budgets.',
    image: 'https://img.youtube.com/vi/GZmORUV77wI/hqdefault.jpg',
    youtubeId: 'GZmORUV77wI',
    color: 'from-[#D9381E]/30 to-jelly/10'
  },
  {
    id: 'p7',
    title: 'Starbucks Summer AI Ad',
    category: 'AI Video Ads',
    icon: Video,
    description: 'Cinematic conceptual ad campaign for Starbucks Summer Refreshers, built using advanced AI motion synthesis.',
    longDescription: 'We produced a conceptual commercial showcasing the Starbucks Summer Refreshers line. By training custom AI video models on product semantics, we generated photorealistic, high-fidelity liquid flow, condensation, and slow-motion fruit slice interactions. The entire sequence was rendered, color-graded, and sound-designed in 24 hours without a physical camera or production set.',
    timeline: '24 Hours',
    deliverables: ['1x 45s Concept Commercial', 'Vibrant Color Grading Assets', 'Sound FX Design'],
    results: 'Delivered a broadcast-ready beverage commercial in 24 hours, saving over 90% in typical camera production costs.',
    image: 'https://img.youtube.com/vi/TLmlYZSDTMw/hqdefault.jpg',
    youtubeId: 'TLmlYZSDTMw',
    color: 'from-[#006241]/20 to-jelly/10'
  },
  {
    id: 'p8',
    title: 'RuPOS Billing Software',
    category: 'Vibe-Coded Apps',
    icon: Code,
    description: 'A mobile-first, multi-branch POS system designed for textile retailers to track stock and bill customers.',
    longDescription: 'Drawing from 10+ years of expert UI/UX design experience, we built RuPOS — a powerful, web-based Point of Sale (POS) system tailored specifically for the textile and clothing retail industry in India. Operating on any mobile, tablet, or desktop, RuPOS works completely offline, synchronizes branches instantly, logs audit trails for staff PIN cashouts to prevent theft, and generates automated daily sales reports sent via WhatsApp to store owners.',
    timeline: '10 Days',
    deliverables: [
      'Offline-First React Application',
      'Real-time Multi-branch Firestore Sync',
      'Bluetooth Thermal Receipt Printing',
      'WhatsApp Daily Sales Engine'
    ],
    results: 'Trusted by 100+ textile shops. Bill in seconds, prevent staff leakage, and monitor inventory live.',
    image: '/rupos_checkout.webp',
    images: [
      '/rupos_checkout.webp',
      '/rupos_tablet.webp',
      '/rupos_lifestyle.webp'
    ],
    projectUrl: 'https://rupos.in/',
    color: 'from-[#0A120E]/40 to-jelly/10'
  }
];
