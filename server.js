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
- If the user provides their contact details (email and/or mobile), reply with a beautiful, magical, funny confirmation.
- Example: "Boom! 💌 I've safely teleported your details to the founders. They'll reach out within 24 hours. Stay awesome! ✨"

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
    try {
      const body = await readBody(req);
      const { messages } = body;

      if (!process.env.GROQ_API_KEY) {
        res.writeHead(200, {
          'Content-Type': 'text/plain; charset=utf-8',
          'x-vercel-ai-data-stream': 'v1',
          'Transfer-Encoding': 'chunked',
        });
        res.write('0:"Hi! The GROQ_API_KEY isn\'t set locally. Add it to a .env.local file to enable AI chat.\\n\\nTo get a free key: https://console.groq.com"\\n');
        res.end();
        return;
      }

      const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
      const result = streamText({
        model: groq('llama-3.3-70b-versatile'),
        system: SYSTEM_PROMPT,
        messages: await convertToModelMessages(messages),
        temperature: 0.7,
      });

      // Stream the AI SDK response directly into the http response
      const webResponse = result.toUIMessageStreamResponse();
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
      console.error('[/api/chat]', e);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
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
