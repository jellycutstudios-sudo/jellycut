/**
 * Local dev server for API routes.
 * Mirrors the Vercel edge/serverless functions so you can test locally.
 * Run alongside Vite: `node server.js`
 * Vite proxies /api/* → http://localhost:3001
 */
import http from 'http';
import { streamText, convertToModelMessages } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import sendLeadHandler from './api/send-lead.js';
import sendOutreachHandler from './api/send-outreach.js';
import { sendOutreachEmail } from './scripts/send-outreach.mjs';
import { generatePersonalizedPitch } from './api/outreachEngine.js';
import { getAllLeads, saveLead, markLeadSent, addSuppression, isSuppressed } from './api/outreachStore.js';
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
        headers: req.headers,
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

  // ── POST /api/send-outreach or /api/outreach/send ──────────────────────
  if ((url.pathname === '/api/send-outreach' || url.pathname === '/api/outreach/send') && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const mockReq = {
        method: req.method,
        headers: req.headers,
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
      await sendOutreachHandler(mockReq, mockRes);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── POST /api/outreach/analyze ─────────────────────────────────────────
  if (url.pathname === '/api/outreach/analyze' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const { email, companyName, websiteUrl, country, leadType, customAngle } = body;

      if (!email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Email address is required' }));
        return;
      }

      // Check suppression / duplicate
      const suppressionStatus = isSuppressed(email);

      // Generate pitch
      const pitchResult = await generatePersonalizedPitch({
        email,
        companyName,
        websiteUrl,
        country,
        leadType,
        customAngle
      });

      // Save as draft in persistent store
      const savedRecord = saveLead({
        email,
        companyName: pitchResult.company,
        websiteUrl: websiteUrl || pitchResult.domain,
        country: pitchResult.country,
        leadType: pitchResult.detectedType,
        researchSummary: `Targeted for: ${pitchResult.recommendedService}. Anchor: ${pitchResult.portfolioAnchor}`,
        confidenceLevel: pitchResult.confidenceLevel,
        sources: pitchResult.sources,
        recommendedService: pitchResult.recommendedService,
        portfolioAnchor: pitchResult.portfolioAnchor,
        subject: pitchResult.subject,
        body: pitchResult.body,
        status: suppressionStatus.suppressed ? 'suppressed' : 'draft'
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        lead: savedRecord,
        pitch: pitchResult,
        suppressionStatus
      }));
    } catch (e) {
      console.error('[Outreach Analyze Error]:', e);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── GET /api/outreach/prospects ───────────────────────────────────────
  if (url.pathname === '/api/outreach/prospects' && req.method === 'GET') {
    try {
      const prospectsPath = join(__dirname, 'data', 'prospects-database.json');
      const data = existsSync(prospectsPath) ? JSON.parse(readFileSync(prospectsPath, 'utf-8')) : [];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: data.length, prospects: data }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── POST /api/outreach/batch-generate ──────────────────────────────────
  if (url.pathname === '/api/outreach/batch-generate' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const { prospects = [] } = body;

      if (!Array.isArray(prospects) || prospects.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Array of prospects is required' }));
        return;
      }

      const drafts = [];
      for (const p of prospects) {
        if (!p.email) continue;
        const suppressionCheck = isSuppressed(p.email);
        const pitchResult = await generatePersonalizedPitch({
          email: p.email,
          companyName: p.company || p.companyName,
          websiteUrl: p.website || p.websiteUrl,
          country: p.country,
          leadType: p.segment?.toLowerCase().includes('agency') ? 'Agency' : 'Direct Brand',
          customAngle: p.pitchAngle
        });

        const savedRecord = saveLead({
          email: p.email,
          companyName: pitchResult.company,
          websiteUrl: p.website || pitchResult.domain,
          country: pitchResult.country,
          leadType: pitchResult.detectedType,
          researchSummary: `Targeted for: ${pitchResult.recommendedService}. Anchor: ${pitchResult.portfolioAnchor}`,
          confidenceLevel: pitchResult.confidenceLevel,
          sources: pitchResult.sources,
          recommendedService: pitchResult.recommendedService,
          portfolioAnchor: pitchResult.portfolioAnchor,
          subject: pitchResult.subject,
          body: pitchResult.body,
          status: suppressionCheck.suppressed ? 'suppressed' : 'draft'
        });

        drafts.push({
          leadId: savedRecord.id,
          to: p.email,
          company: pitchResult.company,
          country: pitchResult.country,
          recommendedService: pitchResult.recommendedService,
          portfolioAnchor: pitchResult.portfolioAnchor,
          subject: pitchResult.subject,
          body: pitchResult.body,
          suppressed: suppressionCheck.suppressed,
          suppressionReason: suppressionCheck.reason
        });
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: drafts.length, drafts }));
    } catch (e) {
      console.error('[Batch Generate Error]:', e);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── POST /api/outreach/batch-send ──────────────────────────────────────
  if (url.pathname === '/api/outreach/batch-send' && req.method === 'POST') {
    try {
      const adminSecret = process.env.ADMIN_SECRET_KEY || 'jellycut_outreach_secret_2026';
      const authHeader = req.headers.authorization || req.headers['x-admin-token'] || '';
      const token = authHeader.replace(/^Bearer\s+/i, '').trim();

      if (!token || token !== adminSecret) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized: Valid admin secret required' }));
        return;
      }

      const body = await readBody(req);
      const { items = [], delaySeconds = 5, isSimulation = false } = body;

      if (!Array.isArray(items) || items.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Array of items is required' }));
        return;
      }

      const results = [];
      const delayMs = isSimulation ? 300 : Math.max(delaySeconds, 15) * 1000;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const { to, name, subject, body: emailBody, leadId } = item;

        // Skip if suppressed
        const suppressionCheck = isSuppressed(to);
        if (suppressionCheck.suppressed && !isSimulation) {
          results.push({
            to,
            status: 'skipped',
            reason: `Suppressed: ${suppressionCheck.reason}`
          });
          continue;
        }

        try {
          if (isSimulation) {
            results.push({
              to,
              status: 'simulated_ok',
              messageId: `sim_${Date.now()}_${i}`
            });
          } else {
            const sendResult = await sendOutreachEmail({
              to,
              name,
              subject,
              body: emailBody
            });
            if (leadId) markLeadSent(leadId, sendResult.messageId);
            results.push({
              to,
              status: 'sent',
              messageId: sendResult.messageId
            });
          }
        } catch (err) {
          results.push({
            to,
            status: 'failed',
            error: err.message
          });
        }

        // Delay between emails if not last item
        if (i < items.length - 1) {
          await new Promise(r => setTimeout(r, delayMs));
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        total: items.length,
        sent: results.filter(r => r.status === 'sent' || r.status === 'simulated_ok').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        failed: results.filter(r => r.status === 'failed').length,
        results
      }));
    } catch (e) {
      console.error('[Batch Send Error]:', e);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── GET /api/outreach/leads ───────────────────────────────────────────
  if (url.pathname === '/api/outreach/leads' && req.method === 'GET') {
    try {
      const leads = getAllLeads();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: leads.length, leads }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── POST /api/outreach/suppress ───────────────────────────────────────
  if (url.pathname === '/api/outreach/suppress' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      if (!body.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Email is required' }));
        return;
      }
      const result = addSuppression(body.email, body.reason || 'manual_admin');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, ...result }));
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
  console.log('   Handles: /api/chat  /api/send-lead  /api/send-outreach');
  console.log('   Run Vite in a separate terminal: npm run dev\n');
});
