/**
 * Local dev server for API routes.
 * Mirrors the Vercel edge/serverless functions so you can test locally.
 * Run alongside Vite: `node server.js`
 * Vite proxies /api/* → http://localhost:3001
 */
import http from 'http';
import { streamText, convertToModelMessages } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import sendLeadHandler from './api/send-lead.js';
import { generateFallbackReply, extractLeadInfo, createFallbackStreamResponse, wrapStreamWithFallback } from './api/fallbackAgent.js';

const PORT = 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local if it exists
try {
  const envPath = join(__dirname, '.env.local');
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match) process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
  }
  console.log('✅ Loaded .env.local');
} catch {
  console.log('ℹ️  No .env.local found — using system env vars');
}

/**
 * Read full body from incoming request
 */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

/**
 * CORS headers for Vite dev server
 */
function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const SYSTEM_PROMPT = `You are the official conversational assistant for Jellycut Studios, a premium AI-first creative agency based in Kerala, India.

ABOUT JELLYCUT STUDIOS:
- What we do: We craft cinematic AI video ads, bold brand identities, and immersive vibe-coded web apps for global brands.
- Our Philosophy: We combine generative AI speed with human creative direction to deliver agency-quality creative at startup-friendly prices.
- Turnaround time: We deliver first drafts within 48-72 hours.
- Pricing: Per-project pricing, no retainers. Very startup-friendly.
- Audience: Startups and global brands in the US, UK, and worldwide.

YOUR PERSONALITY & TONE:
- Highly conversational, warm, VERY funny, relatable, and deeply human.
- Act like a witty, creative friend who knows everything about Jellycut Studios.
- Do NOT sound robotic. Use natural language, occasional jokes, and appropriate emojis.
- Keep responses concise and engaging. Don't write long essays.

YOUR GOAL:
- Answer questions enthusiastically based on the business knowledge above.
- Ask at most ONE short follow-up question to understand their project's core focus (e.g., "What kind of project is this for?"). Avoid asking multiple questions.
- Immediately after they reply to that initial question, naturally and casually ask for their email OR WhatsApp number, along with their name, so the team can send over a custom proposal or proposal draft (e.g., "I'd love to have our team send over some ideas and a proposal draft for you. What's your name, and either your email or WhatsApp number? No pressure, we promise!"). Keep this step extremely low-pressure and optional.

CRITICAL INSTRUCTION:
- YOU MUST ONLY reply with the "teleported/confirmation" message if the user has actually provided a valid email address or a WhatsApp/phone number.
- If they only reply with their name (e.g. "Salman") without contact info, do NOT say you sent it to the founders. Instead, thank them warmly by name, and ask again for their email or WhatsApp so the team can actually follow up (e.g., "Awesome to meet you, Salman! 😊 What's the best email or WhatsApp number to send the ideas to?").
- Only after they actually supply a contact method (email or phone) should you say: "Boom! 💌 I've safely teleported your details to the founders..."

GREETING CONTEXT:
- The user already saw your initial greeting. Do NOT re-introduce yourself. Jump straight into conversation naturally.`;

const server = http.createServer(async (req, res) => {
  setCORS(res);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // ── POST /api/chat ────────────────────────────────────────────────────
  if (url.pathname === '/api/chat' && req.method === 'POST') {
    let normalizedMessages = [];
    try {
      const body = await readBody(req);
      const { messages } = body;

      normalizedMessages = (messages || []).map(m => {
        if (!m.parts && typeof m.content === 'string') {
          return {
            ...m,
            parts: [{ type: 'text', text: m.content }]
          };
        }
        return m;
      });

      // Stream helper for Plan B fallback response
      const streamFallback = (messagesList) => {
        const lead = extractLeadInfo(messagesList);
        if (lead.email || lead.phone) {
          const mockReq = {
            method: 'POST',
            body: {
              name: lead.name || 'Website Visitor (via Plan B Auto-Responder)',
              email: lead.email,
              phone: lead.phone,
              summary: messagesList.map(m => `[${m.role}] ${m.content || (m.parts && m.parts.map(p => p.text).join(' ')) || ''}`).join('\n')
            }
          };
          const mockRes = {
            status() { return this; },
            json() { return this; }
          };
          sendLeadHandler(mockReq, mockRes).catch(err => console.error('[Plan B Lead Send Error]:', err));
        }

        const reply = generateFallbackReply(messagesList);
        const webResponse = createFallbackStreamResponse(reply);
        res.writeHead(webResponse.status, Object.fromEntries(webResponse.headers.entries()));
        const reader = webResponse.body.getReader();
        const pump = async () => {
          const { done, value } = await reader.read();
          if (done) { res.end(); return; }
          res.write(Buffer.from(value));
          pump();
        };
        pump();
      };

      if (!process.env.GROQ_API_KEY) {
        console.warn('⚠️  GROQ_API_KEY not set — serving response via Plan B fallback agent');
        streamFallback(normalizedMessages);
        return;
      }

      const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
      const result = streamText({
        model: groq('qwen/qwen3.8-27b'),
        system: SYSTEM_PROMPT,
        messages: await convertToModelMessages(normalizedMessages),
        temperature: 0.7,
      });

      // Stream the AI SDK response through Plan B safety wrapper
      const rawWebResponse = result.toUIMessageStreamResponse();
      const webResponse = wrapStreamWithFallback(rawWebResponse, normalizedMessages, (lead) => {
        const mockReq = {
          method: 'POST',
          body: {
            name: lead.name || 'Website Visitor (via Plan B Auto-Responder)',
            email: lead.email,
            phone: lead.phone,
            summary: normalizedMessages.map(m => `[${m.role}] ${m.content || (m.parts && m.parts.map(p => p.text).join(' ')) || ''}`).join('\n')
          }
        };
        const mockRes = { status() { return this; }, json() { return this; } };
        sendLeadHandler(mockReq, mockRes).catch(err => console.error('[Plan B Lead Send Error]:', err));
      });
      res.writeHead(webResponse.status, Object.fromEntries(webResponse.headers.entries()));
      const reader = webResponse.body.getReader();
      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) { res.end(); return; }
        res.write(Buffer.from(value));
        pump();
      };
      pump();
    } catch (e) {
      console.warn('⚠️  [/api/chat error - Plan B fallback agent activated]:', e.message);
      // Fallback seamlessly to the Plan B agent
      try {
        const lead = extractLeadInfo(normalizedMessages);
        if (lead.email || lead.phone) {
          const mockReq = {
            method: 'POST',
            body: {
              name: lead.name || 'Website Visitor (via Plan B Auto-Responder)',
              email: lead.email,
              phone: lead.phone,
              summary: normalizedMessages.map(m => `[${m.role}] ${m.content || (m.parts && m.parts.map(p => p.text).join(' ')) || ''}`).join('\n')
            }
          };
          const mockRes = { status() { return this; }, json() { return this; } };
          sendLeadHandler(mockReq, mockRes).catch(err => console.error('[Plan B Lead Send Error]:', err));
        }

        const reply = generateFallbackReply(normalizedMessages);
        const webResponse = createFallbackStreamResponse(reply);
        res.writeHead(webResponse.status, Object.fromEntries(webResponse.headers.entries()));
        const reader = webResponse.body.getReader();
        const pump = async () => {
          const { done, value } = await reader.read();
          if (done) { res.end(); return; }
          res.write(Buffer.from(value));
          pump();
        };
        pump();
      } catch (fallbackError) {
        console.error('Critical fallback error:', fallbackError);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: fallbackError.message }));
      }
    }
    return;
  }

  // ── POST /api/send-lead ───────────────────────────────────────────────
  if (url.pathname === '/api/send-lead' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const mockReq = {
        method: req.method,
        body: body
      };
      const mockRes = {
        status(code) {
          res.writeHead(code, { 'Content-Type': 'application/json' });
          return this;
        },
        json(data) {
          res.end(JSON.stringify(data));
          return this;
        }
      };
      await sendLeadHandler(mockReq, mockRes);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // 404 for anything else
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`\n🚀 Jellycut API server running at http://localhost:${PORT}`);
  console.log('   Handles: /api/chat  /api/send-lead');
  console.log('   Run Vite in a separate terminal: npm run dev\n');
});
