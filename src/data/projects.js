import { Globe, Video, Code } from 'lucide-react';

export const projects = [
  {
    id: 'p20',
    slug: 'rupos-dine',
    title: 'RuPOS Dine — Restaurant POS',
    category: 'Vibe-Coded Apps',
    icon: Code,
    description: 'A modern, premium restaurant POS system with live table maps, token systems, and direct online orders.',
    longDescription: 'We engineered DineOS (RuPOS Dine), a lightning-fast, multi-mode restaurant POS system. Designed with a sleek, minimalist aesthetic to eliminate kitchen clutter, DineOS handles table layouts, KDS (Kitchen Display System), automated tokens, and direct QR-code online ordering. Built using custom React architectures and optimized for sub-second order dispatching, it enables fast-paced restaurants to run entirely paperless with zero operational complexity.',
    timeline: '5 Days',
    deliverables: [
      'High-Fidelity iPad POS Interface',
      'Real-time Table Management & Billing',
      'Instant Kitchen Token Generation',
      'Interactive Owner Dashboard & Insights'
    ],
    results: 'Empowered modern restaurants to ditch spreadsheets, speed up checkouts by 40%, and manage orders with zero friction.',
    image: '/rupos_checkout.webp',
    images: [
      '/rupos_checkout.webp',
      '/rupos_tablet.webp',
      '/rupos_lifestyle.webp'
    ],
    projectUrl: 'https://dine.rupos.in/',
    color: 'from-[#0A0A0B]/95 via-[#161618]/70 to-[#27272A]/60',
    isDineShowcase: true,
    styleframes: [
      {
        url: '/rupos_checkout.webp',
        title: 'POS Terminal Interface',
        desc: 'A premium, black-slate design focusing on fast item selection, visual grid layout, and real-time cart/dine-in tracking.'
      },
      {
        url: '/rupos_tablet.webp',
        title: 'Landing & Demo Experience',
        desc: 'A minimal, high-converting homepage showcasing the tablet interface, emphasizing the core value proposition: "Run your restaurant. Not spreadsheets."'
      },
      {
        url: '/rupos_lifestyle.webp',
        title: 'Real-time Owner Insights',
        desc: 'A sleek dashboard offering daily sales analysis, order statistics, active tables count, and traffic summaries to help managers optimize their operations.'
      }
    ]
  },
  {
    id: 'p19',
    slug: 'treat-in-kerala',
    title: 'Treat In Kerala',
    category: 'Websites',
    icon: Globe,
    description: 'A premium multilingual medical tourism platform connecting international patients with JCI & NABH accredited hospitals in Kerala.',
    longDescription: 'We designed and developed the official digital experience for Treat In Kerala, a premier medical tourism gateway. The platform facilitates end-to-end medical trip coordination—from treatments and Ayurveda therapies to visa documentation, translation assistance, and local travel logistics. Built with high-fidelity React/Next.js architectures, the portal offers multilingual Arabic & English localized search, intuitive medical estimate calculators, and an elegant natural aesthetic referencing Kerala\'s lush landscape.',
    timeline: '5 Days',
    deliverables: [
      'High-Performance Multilingual Frontend',
      'Custom Medical Cost Estimator',
      'Accredited Hospital Network Directory',
      'WhatsApp Integration & Concierge Workflows'
    ],
    results: 'Launched a high-converting, localized medical gateway driving zero-friction international patient inquiries.',
    image: '/treat_kerala_home.webp',
    images: [
      '/treat_kerala_home.webp',
      '/treat_kerala_1.webp',
      '/treat_kerala_2.webp'
    ],
    projectUrl: 'https://www.treatinkerala.com/en',
    color: 'from-[#1B4332]/95 via-[#2D6A4F]/70 to-[#FAF7F2]/60'
  },
  {
    id: 'p18',
    slug: 'crimson-silver-heritage',
    title: 'Case Study: Crimson & Silver Heritage',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A conceptual campaign redefining luxury jewelry commercials through a moody, chiaroscuro-driven atmospheric visual identity.',
    longDescription: 'Traditional fine jewelry marketing often relies on a very specific formula: bright white studios, sparkling diamonds, and smiling models. For this conceptual project, we wanted to break that mold. The objective was to create a visual identity that felt ancient, powerful, and deeply atmospheric—a campaign that didn\'t just display product, but built a world around it.',
    timeline: '48 Hours',
    deliverables: [
      'Cinematic Concept Edit',
      'Chiaroscuro & Silhouette Lighting',
      'Extreme Macro Texturing & CGI',
      'Intimate Interaction Direction'
    ],
    results: 'Delivered an atmospheric, high-impact conceptual campaign that commands a premium market position.',
    image: '/crimson_heritage_cover.png',
    youtubeId: 'dtTiZnu2EbQ',
    color: 'from-[#0d0708]/95 via-[#23090e]/70 to-[#101114]/60',
    isCrimsonSilverShowcase: true,
    styleframes: [
      {
        url: '/crimson_heritage_stallion.png',
        title: 'The Power of the Silhouette',
        desc: 'Instead of revealing everything at once, shadow and silhouette build mystery. The black Arabian stallion grounds the piece in noble heritage.'
      },
      {
        url: '/crimson_heritage_veil.png',
        title: 'Ancient Heritage & Mystery',
        desc: 'Portrait of the model looking through an intricate metallic silver coin veil, drawing the viewer into a deep, atmospheric story.'
      },
      {
        url: '/crimson_heritage_bangles.png',
        title: 'Texture, Tactility & Interaction',
        desc: 'Extreme macro CGI techniques highlight the engravings of silver coins, showing the clink of metal bangles sliding down a wrist.'
      }
    ]
  },
  {
    id: 'p17',
    slug: 'fawah-fragrances',
    title: 'Case Study: Crafting a Photoreal Luxury CGI Commercial for FAWAH Fragrances',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A photoreal cinematic CGI commercial campaign for FAWAH Fragrances, visualizing a luxury scent through moody environments and slow-motion golden mist.',
    longDescription: 'When approaching the "Al Taraheeb" fragrance by FAWAH, the goal was to create a visual identity as bold and premium as the scent itself. The brand required a cinematic product video that communicated luxury, mystery, and elegance without relying on traditional, restrictive live-action photography.',
    timeline: '48 Hours',
    deliverables: [
      'Cinematic CGI Video',
      'Fluid & Particle Simulations',
      'Bespoke Macro Environments',
      'Photoreal 3D Texturing'
    ],
    results: 'Engineered a high-impact product render yielding versatile marketing assets.',
    image: 'https://img.youtube.com/vi/EaLAd1Wj0o0/hqdefault.jpg',
    youtubeId: 'EaLAd1Wj0o0',
    isVertical: true,
    isFawahShowcase: true,
    color: 'from-[#111111] via-[#241d15]/50 to-[#0c0e09]/45'
  },
  {
    id: 'p16',
    slug: 'dior-chessboard-concept',
    title: 'Dior Concept Ad – "The Chessboard"',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A 15-second cinematic CGI commercial concept for Christian Dior, contrasting monumental chessboard scale with photorealistic crimson macro details.',
    longDescription: 'We engineered a 15-second conceptual sprint to explore a darker, more surreal edge for luxury fragrance. The goal was to contrast monumental scale (the giant marble chessboard) with extreme, photoreal macro details (the black stiletto, the crimson glass). This speculative CGI proof-of-concept showcases how high-end lighting, texturing, and rapid speed-ramping camera work can capture a brand\'s luxury identity with modern fashion-edit energy.',
    timeline: '48 Hours',
    deliverables: [
      '15-Second CGI Master Edit',
      'Surreal Mist & Alabaster Lighting',
      'High-Fidelity 3D Texture Mapping',
      'Fashion Phonk Sound Design'
    ],
    results: 'Delivered a hyper-premium CGI commercial proof-of-concept with extreme macro-fidelity and dynamic editing.',
    image: '/dior_wide_chessboard.webp',
    youtubeId: 'ltb9V0oZppk',
    color: 'from-[#141414]/90 via-[#261014]/50 to-[#0A120E]/40',
    isDiorShowcase: true,
    storyboard: '/dior_storyboard.jpeg',
    breakdown: {
      vision: 'We engineered a 15-second conceptual sprint to explore a darker, more surreal edge for luxury fragrance. The goal was to contrast monumental scale (the giant marble chessboard) with extreme, photoreal macro details (the stiletto, the crimson glass).',
      technicalFocus: [
        {
          title: 'Lighting & Texturing',
          desc: 'Muted cinematic color grading to emphasize the alabaster mist and the deep, light-warping crimson of the glass. Specular highlights were carefully mapped to the silver "DIOR" engraving.'
        },
        {
          title: 'Camera Work',
          desc: 'Aggressive speed-ramping and whip-pans synchronized to a dark luxury phonk beat to give the piece a modern, aggressive "fashion edit" energy.'
        }
      ]
    },
    styleframes: [
      {
        url: '/dior_stiletto.webp',
        title: 'Frame 1: Cut 1',
        desc: 'The black stiletto in mist.'
      },
      {
        url: '/dior_wide_chessboard.webp',
        title: 'Frame 2: Cut 5',
        desc: 'The wide shot of the woman dwarfed by the chess pieces.'
      },
      {
        url: '/dior_macro_crimson.webp',
        title: 'Frame 3: Cut 7',
        desc: 'The extreme macro of the crimson glass and silver engraving.'
      }
    ],
    behindTheScenes: {
      clay: '/dior_chessboard_clay.webp',
      final: '/dior_chessboard_final.webp',
      desc: 'Transition from clay render / wireframe to the final composited shot, showing the environment engineered from scratch.'
    },
    disclaimer: 'This is a speculative concept project created by Jellycut Studio for portfolio purposes. It is not an official Dior campaign and is not affiliated with, endorsed by, or commissioned by Christian Dior SE.'
  },
  {
    id: 'p15',
    slug: 'rupos-b2b-storytelling',
    title: 'RuPOS B2B UGC Ad',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A B2B UGC campaign for RuPOS POS software designed to build trust with Keralan retail shop owners through relatable local storytelling.',
    longDescription: 'Selling B2B software to local retail owners requires building real trust rather than relying on standard corporate pitches. For RuPOS, we produced a B2B UGC-style (User-Generated Content) video campaign addressing the exact everyday struggles of shop owners, such as staff cash theft and internet drops. By leveraging native social media pacing, Malayalam voiceover direction, and dynamic captions, the ad highlights RuPOS\'s offline-syncing capability and automatic WhatsApp daily sales reports in a way that feels organic and authentic to social feeds.',
    timeline: '48 Hours',
    deliverables: [
      '9:16 Vertical Video Ad (Meta & Instagram Reels)',
      'B2B UGC Narrative & Storyboard',
      'Dynamic On-Screen Typography & Captions',
      'Malayalam Sound Design & Hook Optimization'
    ],
    results: 'Shipped a highly relatable B2B SaaS advertisement in 48 hours, converting complex tech features into authentic, scroll-stopping social proof.',
    image: 'https://img.youtube.com/vi/Zcsob0enXXs/hqdefault.jpg',
    youtubeId: 'Zcsob0enXXs',
    color: 'from-[#0A120E]/40 to-jelly/10'
  },
  {
    id: 'p14',
    slug: 'tiktok-ugc-liquid-dynamics',
    title: 'TikTok UGC Liquid Dynamics',
    category: 'AI Video Ads',
    icon: Video,
    description: 'A high-converting, TikTok-native UGC campaign enhanced with hyper-realistic AI liquid dynamics and fruit physics.',
    longDescription: 'We took the standard UGC format and gave it a high-end visual upgrade by developing a high-converting, TikTok-native campaign. Leveraging advanced AI-driven fluid dynamics and complex fruit physics, we seamlessly blended organic creator-style video with hyper-realistic product and liquid simulations. The resulting ad campaign captures viewer attention in the first three seconds, significantly enhancing hook rates and brand recall.',
    timeline: '24 Hours',
    deliverables: [
      'TikTok-Native Vertical Video Ad',
      'Hyper-Realistic AI Liquid Dynamics',
      'Fruit Physics Simulations',
      'Engaging Hook Optimization'
    ],
    results: 'Upgraded organic creator formats with broadcast-quality AI physics, driving high scroll-stop engagement rates.',
    image: 'https://img.youtube.com/vi/UruEt87fsuA/hqdefault.jpg',
    youtubeId: 'UruEt87fsuA',
    color: 'from-[#FF0050]/20 via-[#00F2FE]/10 to-jelly/10'
  },
  {
    id: 'p11',
    slug: 'filbey-premium-website',
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
    slug: 'dr-pepper-concept-ad',
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
    slug: 'elf-skin-concept-ad',
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
    slug: 'feesync-explainer-campaign',
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
    slug: 'froot-concept-commercial',
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
    slug: 'starbucks-summer-ai-ad',
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
    slug: 'rupos-billing-software',
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
