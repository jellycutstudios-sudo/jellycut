/**
 * Plan B Fallback Agent for Jellycut Studios.
 * 
 * Activates automatically whenever the LLM (Groq) is unavailable, rate-limited,
 * or encountering API/network errors.
 * 
 * Provides instantaneous, on-brand, witty responses, handles all common studio FAQs,
 * and ensures visitor leads (name, email, phone) are captured without interruption.
 */

export function extractLeadInfo(messages = []) {
  const userTexts = messages
    .filter(m => m.role === 'user')
    .map(m => {
      if (m.parts) {
        return m.parts.filter(p => p.type === 'text').map(p => p.text).join(' ');
      }
      return m.content || '';
    });

  const fullText = userTexts.join('\n');

  // Extract email
  const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0].trim() : null;

  // Extract phone (international or 10-digit formats)
  const phoneMatch = fullText.match(/[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}/) || fullText.match(/\b\d{8,14}\b/);
  const phone = phoneMatch ? phoneMatch[0].trim() : null;

  // Extract name (simple heuristic)
  let name = null;
  for (const text of userTexts) {
    const namePattern = /(?:my name is|i am|i'm|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i;
    const match = text.match(namePattern);
    if (match && match[1]) {
      name = match[1].trim();
      break;
    }
  }

  return { email, phone, name };
}

export function generateFallbackReply(messages = []) {
  // Get the last user message
  const userMessages = messages.filter(m => m.role === 'user');
  const lastUserMsg = userMessages[userMessages.length - 1];

  let query = '';
  if (lastUserMsg) {
    if (lastUserMsg.parts) {
      query = lastUserMsg.parts.filter(p => p.type === 'text').map(p => p.text).join(' ').trim();
    } else {
      query = (lastUserMsg.content || '').trim();
    }
  }

  const lower = query.toLowerCase();
  const { email, phone, name } = extractLeadInfo(messages);

  // 1. Contact info provided in this turn
  const hasEmailInQuery = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(query);
  const hasPhoneInQuery = /(?:[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}|\b\d{8,14}\b)/.test(query);

  if (hasEmailInQuery || hasPhoneInQuery) {
    return (
      "Boom! 💌 I've safely teleported your details directly to the founders!\n\n" +
      "They'll review your project and get back to you with ideas, sample work, and a proposal draft within a few hours. " +
      "If you'd like to share any specific notes on budget, timeline, or references, feel free to drop them right here!"
    );
  }

  // 2. Name introduced without contact info
  const nameIntro = query.match(/^(?:my name is|i am|i'm|this is|call me)\s+([A-Za-z\s]+)/i);
  if (nameIntro && !email && !phone) {
    const caller = nameIntro[1].trim().split(/\s+/)[0];
    return (
      `Awesome to meet you, ${caller}! 😊\n\n` +
      `What's the best email address or WhatsApp number for our founders to send over some tailored ideas and a proposal draft? (Zero pushy calls, promise!)`
    );
  }

  // 3. Pricing / Cost / Budget
  if (/\b(pric|cost|budget|rate|fee|how much|quote|package|expensive|afford)\b/i.test(lower)) {
    return (
      "We work with transparent, per-project pricing with zero retainers or hidden fees! 💸\n\n" +
      "Because we blend AI generation speed with high-end creative direction, we deliver agency-tier quality at startup-friendly rates.\n\n" +
      "Drop your email or WhatsApp along with what you need (e.g. AI video ad, rebrand, or web app), and we'll send a custom quote within 24 hours!"
    );
  }

  // 4. Turnaround / Delivery time
  if (/\b(turnaround|timeline|how long|delivery|duration|deadline|speed|fast|hours|days)\b/i.test(lower)) {
    return (
      "Speed is our superpower ⚡ We deliver initial concepts and first drafts within 48 to 72 hours!\n\n" +
      "What kind of timeline do you have in mind for your project?"
    );
  }

  // 5. Video ads / Commercials
  if (/\b(video|ad\b|ads\b|commercial|cinematic|animation|clip|reels|tiktok)\b/i.test(lower)) {
    return (
      "We craft cinematic, scroll-stopping AI video ads built to convert across social, paid ads, and product launches 🎬\n\n" +
      "From hyper-realistic product visuals to futuristic concept ads, our first drafts arrive in 48–72 hours.\n\n" +
      "What kind of product or campaign is this for?"
    );
  }

  // 6. Web / Web apps / Development
  if (/\b(web|site|app|landing|code|software|frontend|developer|react|next)\b/i.test(lower)) {
    return (
      "We build ultra-fast, bespoke, 'vibe-coded' web apps and landing pages with rich micro-interactions, sleek dark modes, and high-converting flow 💻\n\n" +
      "What kind of website or web app are you envisioning?"
    );
  }

  // 7. Branding / Identity / Design
  if (/\b(brand|identity|logo|design system|visual|rebrand|typography|guidelines)\b/i.test(lower)) {
    return (
      "We create distinct, bold brand identities—from visual direction and 3D assets to logos and comprehensive guidelines 🎨\n\n" +
      "Tell us a bit about your brand vibe or the feeling you want to evoke!"
    );
  }

  // 8. Portfolio / Work / Case Studies
  if (/\b(portfolio|case stud|work|example|sample|client|projects|showcase)\b/i.test(lower)) {
    return (
      "You can explore our featured case studies (FeeSync, Crimson & Silver, Dine, and Showaiter) right on this site! ✦\n\n" +
      "Drop your email or WhatsApp number, and we'll gladly send over a custom deck matching your specific industry."
    );
  }

  // 9. Location / About the team
  if (/\b(where|location|team|kerala|india|who are you|about you|founders)\b/i.test(lower)) {
    return (
      "We're Jellycut Studios, an AI-first creative agency based in Kerala, India, partnering with fast-moving startups and global brands worldwide (US, UK, and beyond) 🌍\n\n" +
      "We combine generative AI speed with top-tier human creative direction. What project can we help you create?"
    );
  }

  // 10. Greetings
  if (/\b(hi\b|hello\b|hey\b|morning|evening|yo\b|sup\b|greetings)\b/i.test(lower)) {
    return (
      "Hey there! 👋 Excited to connect with you.\n\n" +
      "What kind of project are you cooking up—a cinematic AI video ad, a bold brand identity, or a sleek vibe-coded web app?"
    );
  }

  // 11. Thanks / Farewell
  if (/\b(thank|thanks|bye|cheers|appreciate|cool|awesome|great)\b/i.test(lower)) {
    return (
      "Anytime! 🙌 If you'd like to kick off a project or get a proposal, just drop your email or WhatsApp here, or email team@jellycutstudio.com directly. Have an amazing day!"
    );
  }

  // 12. Default catch-all
  return (
    "Got it! Our studio team specializes in cinematic AI video ads, bold brand identities, and high-converting web apps 🚀\n\n" +
    "What's your name, and either your email or WhatsApp number? Our founders will personally reach out with custom ideas and pricing!"
  );
}

/**
 * Creates a stream conforming to Vercel AI SDK UI message protocol (v7/v4).
 * This ensures the client UI can stream the text cleanly without throwing.
 */
export function createFallbackStreamResponse(replyText) {
  const encoder = new TextEncoder();
  const chunks = [
    `data: {"type":"start"}\n\n`,
    `data: {"type":"start-step"}\n\n`,
    `data: {"type":"text-start","id":"txt-0"}\n\n`,
    `data: {"type":"text-delta","id":"txt-0","delta":${JSON.stringify(replyText)}}\n\n`,
    `data: {"type":"text-end","id":"txt-0"}\n\n`,
    `data: {"type":"finish-step"}\n\n`,
    `data: {"type":"finish","finishReason":"stop"}\n\n`,
    `data: [DONE]\n\n`,
  ];

  const stream = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      'connection': 'keep-alive',
      'x-accel-buffering': 'no',
      'x-vercel-ai-ui-message-stream': 'v1',
    },
  });
}

/**
 * Intercepts an AI SDK stream response. If an error occurs before real text is produced,
 * smoothly swaps the stream to the Plan B fallback agent response so the visitor
 * receives an authentic response without broken chat or error toasts.
 */
export function wrapStreamWithFallback(webResponse, messages, onLeadCaptured) {
  const reader = webResponse.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let textStarted = false;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const textChunk = decoder.decode(value, { stream: true });

          // If the AI stream emitted an error event before generating text
          if (textChunk.includes('"type":"error"') && !textStarted) {
            console.warn('⚠️  [Plan B Fallback activated from stream error]');

            const reply = generateFallbackReply(messages);
            if (onLeadCaptured) {
              const lead = extractLeadInfo(messages);
              if (lead.email || lead.phone) {
                onLeadCaptured(lead);
              }
            }

            const fallbackChunks = [
              `data: {"type":"text-start","id":"txt-planb"}\n\n`,
              `data: {"type":"text-delta","id":"txt-planb","delta":${JSON.stringify(reply)}}\n\n`,
              `data: {"type":"text-end","id":"txt-planb"}\n\n`,
              `data: {"type":"finish-step"}\n\n`,
              `data: {"type":"finish","finishReason":"stop"}\n\n`,
              `data: [DONE]\n\n`
            ];
            for (const chunk of fallbackChunks) {
              controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
            return;
          }

          if (textChunk.includes('"type":"text-delta"') || textChunk.includes('"type":"text-start"')) {
            textStarted = true;
          }

          controller.enqueue(value);
        }
        controller.close();
      } catch (err) {
        console.warn('⚠️  [Plan B Fallback caught stream exception]:', err.message);
        if (!textStarted) {
          const reply = generateFallbackReply(messages);
          if (onLeadCaptured) {
            const lead = extractLeadInfo(messages);
            if (lead.email || lead.phone) {
              onLeadCaptured(lead);
            }
          }
          const fallbackChunks = [
            `data: {"type":"text-start","id":"txt-planb"}\n\n`,
            `data: {"type":"text-delta","id":"txt-planb","delta":${JSON.stringify(reply)}}\n\n`,
            `data: {"type":"text-end","id":"txt-planb"}\n\n`,
            `data: {"type":"finish-step"}\n\n`,
            `data: {"type":"finish","finishReason":"stop"}\n\n`,
            `data: [DONE]\n\n`
          ];
          for (const chunk of fallbackChunks) {
            controller.enqueue(encoder.encode(chunk));
          }
        }
        controller.close();
      }
    }
  });

  return new Response(stream, {
    status: 200,
    headers: webResponse.headers
  });
}

