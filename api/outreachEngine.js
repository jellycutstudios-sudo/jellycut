/**
 * Jellycut Studios — AI Outreach Intelligence & Drafting Engine
 * 
 * Conducts business opportunity analysis, pairs prospects with the single best
 * Jellycut service & portfolio proof, and drafts natural, low-pressure, compliant emails.
 */

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const GENERIC_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
  'icloud.com', 'proton.me', 'protonmail.com', 'zoho.com'
];

const PORTFOLIO_MAPPING = {
  agency_whitelabel: {
    service: 'White-Label Video & Web Production',
    portfolioTitle: 'Jellycut Agency White-Label Services',
    portfolioUrl: 'https://jellycutstudio.com/agencies',
    pilotOffer: 'A single fixed-scope test ad or landing page pilot',
    rationale: 'Independent agencies need elastic production capacity without payroll bloat.'
  },
  ecommerce_video: {
    service: 'AI Product Video Ads & Hook Packs',
    portfolioTitle: 'Filbey’s Commercial (15s spot + 3 hook test cuts)',
    portfolioUrl: 'https://jellycutstudio.com/works/filbey-neural-crunch',
    pilotOffer: 'A 15–20s spec video ad with 3 hook variations',
    rationale: 'E-commerce brands require high-retention social creatives for Meta & TikTok algorithms.'
  },
  luxury_cgi: {
    service: 'Photorealistic 3D CGI & Product Visuals',
    portfolioTitle: 'Fawah Fragrances Luxury CGI Commercial',
    portfolioUrl: 'https://jellycutstudio.com/works/fawah-perfumes-ai-commercial',
    pilotOffer: 'A 3D product render or 15s luxury visual asset',
    rationale: 'Premium luxury and fragrance brands need high-end cinematic visuals at sustainable budgets.'
  },
  travel_hospitality: {
    service: 'Responsive Web Architecture & Destination Visuals',
    portfolioTitle: 'Skylight UAE Tourism Platform',
    portfolioUrl: 'https://jellycutstudio.com/works/skylight-travel-website',
    pilotOffer: 'A mobile-optimized itinerary page or booking funnel',
    rationale: 'Travel and hospitality operators need high-trust digital booking experiences.'
  },
  saas_webapp: {
    service: 'Web Application Development & Modern UI',
    portfolioTitle: 'FeeSync Automated Billing Platform',
    portfolioUrl: 'https://jellycutstudio.com/works/feesync-website',
    pilotOffer: 'A rapid interactive MVP or dashboard prototype',
    rationale: 'SaaS and tech founders require clean, fast React platforms built on milestone sprints.'
  },
  brand_identity: {
    service: 'Complete Brand Identity & Packaging Systems',
    portfolioTitle: 'Showaiter Plus Luxury Brand System',
    portfolioUrl: 'https://jellycutstudio.com/works/showaiter-plus-halwa-branding',
    pilotOffer: 'A brand identity refresh or packaging concept suite',
    rationale: 'Growing companies need distinctive visual hierarchy and design tokens that scale.'
  }
};

/**
 * Safely parse domain and company name
 */
export function extractCompanyInfo(email, inputCompany = '', inputUrl = '') {
  let domain = '';
  let isGenericEmail = false;

  if (email && email.includes('@')) {
    const rawDomain = email.split('@')[1].toLowerCase().trim();
    if (GENERIC_EMAIL_DOMAINS.includes(rawDomain)) {
      isGenericEmail = true;
    } else {
      domain = rawDomain;
    }
  }

  if (inputUrl) {
    try {
      const cleanUrl = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
      const urlObj = new URL(cleanUrl);
      domain = urlObj.hostname.replace(/^www\./, '');
    } catch (e) {
      domain = inputUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    }
  }

  let derivedCompany = inputCompany.trim();
  if (!derivedCompany && domain) {
    const parts = domain.split('.');
    if (parts.length > 0) {
      const namePart = parts[0];
      derivedCompany = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
  }

  return {
    company: derivedCompany || (isGenericEmail ? 'Your Team' : 'Your Company'),
    domain: domain || 'unknown',
    isGenericEmail
  };
}

/**
 * Detect single best opportunity based on lead metadata
 */
export function determineOpportunity({ leadType, company, domain, country }) {
  const lowerCompany = company.toLowerCase();
  const lowerDomain = domain.toLowerCase();

  // 1. Explicit or detected Agency
  if (
    leadType === 'Agency' ||
    lowerCompany.includes('agency') ||
    lowerCompany.includes('media') ||
    lowerCompany.includes('creative') ||
    lowerCompany.includes('studio') ||
    lowerCompany.includes('digital') ||
    lowerDomain.includes('agency') ||
    lowerDomain.includes('media') ||
    lowerDomain.includes('creative')
  ) {
    return {
      opportunityKey: 'agency_whitelabel',
      ...PORTFOLIO_MAPPING.agency_whitelabel,
      detectedType: 'Agency'
    };
  }

  // 2. Luxury / Fragrance / Beauty
  if (
    lowerCompany.includes('perfume') ||
    lowerCompany.includes('fragrance') ||
    lowerCompany.includes('beauty') ||
    lowerCompany.includes('cosmetic') ||
    lowerCompany.includes('parfum') ||
    lowerCompany.includes('luxury')
  ) {
    return {
      opportunityKey: 'luxury_cgi',
      ...PORTFOLIO_MAPPING.luxury_cgi,
      detectedType: 'Direct Brand (Luxury / Beauty)'
    };
  }

  // 3. Tourism / Travel / Hospitality
  if (
    lowerCompany.includes('travel') ||
    lowerCompany.includes('tour') ||
    lowerCompany.includes('safari') ||
    lowerCompany.includes('hotel') ||
    lowerCompany.includes('resort') ||
    lowerCompany.includes('destination')
  ) {
    return {
      opportunityKey: 'travel_hospitality',
      ...PORTFOLIO_MAPPING.travel_hospitality,
      detectedType: 'Direct Brand (Travel / Tourism)'
    };
  }

  // 4. Tech / SaaS / Software
  if (
    lowerCompany.includes('app') ||
    lowerCompany.includes('tech') ||
    lowerCompany.includes('software') ||
    lowerCompany.includes('saas') ||
    lowerCompany.includes('io') ||
    lowerDomain.endsWith('.io') ||
    lowerDomain.includes('tech')
  ) {
    return {
      opportunityKey: 'saas_webapp',
      ...PORTFOLIO_MAPPING.saas_webapp,
      detectedType: 'Tech Startup / SaaS'
    };
  }

  // 5. Default to E-commerce / D2C Video Ads (highest broad appeal)
  return {
    opportunityKey: 'ecommerce_video',
    ...PORTFOLIO_MAPPING.ecommerce_video,
    detectedType: 'Direct Brand / E-commerce'
  };
}

/**
 * Generate high-converting, compliant email text using deterministic template or Groq
 */
export async function generatePersonalizedPitch({ email, companyName, websiteUrl, country, leadType, customAngle = null }) {
  const { company, domain, isGenericEmail } = extractCompanyInfo(email, companyName, websiteUrl);
  const opp = determineOpportunity({ leadType, company, domain, country });
  
  const targetCountry = country || 'International';
  const confidence = isGenericEmail && !websiteUrl ? 'needs_manual_review' : (websiteUrl ? 'high' : 'medium');
  
  const sources = [
    domain !== 'unknown' ? `Domain analysis: ${domain}` : 'Direct contact inquiry',
    `Opportunity classification: ${opp.detectedType}`
  ];

  // Try Groq LLM generation if key exists
  if (process.env.GROQ_API_KEY) {
    try {
      const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
      const prompt = `You are Salman Abu, founder of Jellycut Studios (https://jellycutstudio.com), a boutique creative production studio from Kerala, India.
We specialize in AI-assisted video commercials (48-72h turnaround), brand identities, and modern web application engineering.

Task: Write a concise, natural, highly professional B2B cold email to:
- Company Name: ${company}
- Domain: ${domain}
- Target Opportunity: ${opp.service}
- Relevant Portfolio Proof: ${opp.portfolioTitle} (${opp.portfolioUrl})
- Target Country: ${targetCountry}
- Buyer Type: ${opp.detectedType}
- Specific Angle: ${customAngle || opp.rationale}

CRITICAL RULES:
1. Length: Exactly 85 to 120 words. No long essays.
2. Tone: Calm, thoughtful, peer-to-peer business proposal.
3. NEVER use generic AI sales cliches: "I hope this email finds you well", "supercharge", "elevate your brand to the next level", "synergy", "cutting-edge".
4. Do NOT make up fake metrics or fake client testimonials.
5. Pitch ONLY the single target opportunity (${opp.service}). Do not list multiple services.
6. Provide a low-friction, zero-pressure CTA (e.g. "Open to taking a look at a 15-second spec cut?", "Worth a 2-minute look at our agency pilot?").
7. Output format MUST be valid JSON:
{
  "subject": "...",
  "body": "..."
}`;

      const { text } = await generateText({
        model: groq('llama-3.3-70b-versatile'),
        prompt,
        temperature: 0.5,
        maxRetries: 1,
        abortSignal: AbortSignal.timeout(4000)
      });

      // Parse JSON from LLM output
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.subject && parsed.body) {
          return {
            company,
            domain,
            country: targetCountry,
            detectedType: opp.detectedType,
            recommendedService: opp.service,
            portfolioAnchor: opp.portfolioTitle,
            portfolioUrl: opp.portfolioUrl,
            confidenceLevel: confidence,
            sources,
            subject: parsed.subject,
            body: appendComplianceFooter(parsed.body, domain),
            isAiGenerated: true
          };
        }
      }
    } catch (err) {
      console.warn('[OutreachEngine]: Groq generation fallback to template engine:', err.message);
    }
  }

  // Reliable, high-conversion template generation (Production-safe fallback)
  let subject = '';
  let body = '';

  if (opp.opportunityKey === 'agency_whitelabel') {
    subject = `Creative production support for ${company}`;
    body = `Hi ${company} team,

I came across ${company} while looking through independent creative teams delivering top-tier brand work.

We run Jellycut Studios — an agile behind-the-scenes production arm for agencies. We handle end-to-end AI video advertising, motion graphics, and web development under full white-label terms (with mutual NDAs).

Rather than asking for ongoing commitments upfront, we often start with a single fixed-scope test ad or landing page pilot so agencies can experience our turnaround (first cuts in 48–72h) and wholesale rates firsthand.

You can preview our agency capabilities here: https://jellycutstudio.com/agencies

Would you be open to a 2-minute look at our wholesale rate card to see if we'd be a useful overflow partner?

Best regards,
Salman Abu
Founder · Jellycut Studios
https://jellycutstudio.com · team@jellycutstudio.com`;
  } else if (opp.opportunityKey === 'luxury_cgi') {
    subject = `Quick visual concept idea for ${company}`;
    body = `Hi ${company} team,

I've been following ${company}'s visual direction and product lineup.

At Jellycut Studios, we specialize in high-fidelity 3D CGI product commercials and social video assets delivered in 48–72 hours — achieving photorealistic fluid dynamics and studio lighting at startup-friendly flat rates.

We recently produced a cinematic fragrance campaign for Fawah Perfumes (viewable at https://jellycutstudio.com/works/fawah-perfumes-ai-commercial).

Would you be open to seeing a 15-second spec visual concept tailored for ${company}'s upcoming campaigns?

Best regards,
Salman Abu
Founder · Jellycut Studios
https://jellycutstudio.com · team@jellycutstudio.com`;
  } else if (opp.opportunityKey === 'travel_hospitality') {
    subject = `Digital experience idea for ${company}`;
    body = `Hi ${company} team,

I came across ${company} while exploring standout travel and destination operators.

At Jellycut Studios, we engineer high-converting digital platforms and visual campaigns for international tourism brands. We recently built the digital platform for Skylight Tourism (https://jellycutstudio.com/works/skylight-travel-website), featuring dynamic itinerary filtering, real-time timezone sync, and direct-to-consultant inquiry flows.

If you're exploring ways to streamline digital bookings or refresh your campaign creative this quarter, I'd love to share a couple of specific ideas.

Would you be open to an async look at how we structure travel platforms?

Best regards,
Salman Abu
Founder · Jellycut Studios
https://jellycutstudio.com · team@jellycutstudio.com`;
  } else if (opp.opportunityKey === 'saas_webapp') {
    subject = `Frontend & app development support for ${company}`;
    body = `Hi ${company} team,

I saw what you're building with ${company} and wanted to reach out directly.

At Jellycut Studios, we engineer modern, sub-second React web applications, portals, and conversion landing pages for founders. We recently shipped the recurring billing platform for FeeSync (https://jellycutstudio.com/works/feesync-website) in agile milestone sprints.

If you have backlog frontend features, client portal tools, or a marketing site refresh you'd like to ship without pulling your core team off product development, we'd love to help.

Would you be open to a quick async note on how we structure sprint milestone builds?

Best regards,
Salman Abu
Founder · Jellycut Studios
https://jellycutstudio.com · team@jellycutstudio.com`;
  } else {
    // E-commerce default
    subject = `Video ad variations for ${company}`;
    body = `Hi ${company} team,

I came across ${company} and was really impressed by your product catalog.

At Jellycut Studios, we produce scroll-stopping 9:16 social video ads and hook-testing packs for Meta and TikTok, delivered within 48–72 hours with full commercial audio and voiceover.

We recently delivered the commercial campaign for Filbey’s (viewable at https://jellycutstudio.com/works/filbey-neural-crunch), combining neural physics with studio color grading.

Would you be open to seeing a couple of 15-second video ad concepts crafted specifically for ${company}?

Best regards,
Salman Abu
Founder · Jellycut Studios
https://jellycutstudio.com · team@jellycutstudio.com`;
  }

  return {
    company,
    domain,
    country: targetCountry,
    detectedType: opp.detectedType,
    recommendedService: opp.service,
    portfolioAnchor: opp.portfolioTitle,
    portfolioUrl: opp.portfolioUrl,
    confidenceLevel: confidence,
    sources,
    subject,
    body: appendComplianceFooter(body, domain),
    isAiGenerated: false
  };
}

/**
 * Append international anti-spam compliance opt-out notice
 */
function appendComplianceFooter(bodyText, domain) {
  // If opt-out line already present, avoid duplicate
  if (bodyText.includes('unsubscribe') || bodyText.includes('opt out')) {
    return bodyText;
  }
  return `${bodyText}

---
Opt-out: If you'd prefer not to hear from us, reply "opt-out" and we'll immediately remove ${domain} from our contacts.
Jellycut Studios · Kerala, India · jellycutstudio.com`;
}

