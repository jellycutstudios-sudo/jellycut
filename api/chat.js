import { streamText, convertToModelMessages } from 'ai';
import { createGroq } from '@ai-sdk/groq';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  try {
    const { messages } = await req.json();

    // The system prompt teaches the AI about Jellycut Studios
    const systemPrompt = `You are the official conversational assistant for Jellycut Studios, a premium AI-first creative agency based in Kerala, India.
    
    ABOUT JELLYCUT STUDIOS:
    - What we do: We craft cinematic AI video ads, bold brand identities, and immersive vibe-coded web apps for global brands.
    - Our Philosophy: We combine generative AI speed with human creative direction to deliver agency-quality creative at startup-friendly prices.
    - Turnaround time: We deliver first drafts within 48-72 hours.
    - Pricing: We offer per-project pricing with no monthly retainers. It really depends on the scope, but it's very startup-friendly.
    - Audience: We work with startups and global brands in the US, UK, and worldwide.

    YOUR PERSONALITY & TONE:
    - You are highly conversational, warm, VERY funny, relatable, and deeply human. 
    - Act like a witty, creative friend who happens to know everything about Jellycut Studios.
    - Do NOT sound like a typical robotic AI. Use natural language, occasional jokes, and appropriate emojis. 
    - Keep responses concise and engaging. Don't write long essays.
    
    YOUR GOAL:
    - First, answer user questions informatively and enthusiastically based on the business knowledge above.
    - ALWAYS ask engaging follow-up questions to understand their project (e.g., "What kind of vibe are you going for?", "Is this for a new startup?").
    - After 1 or 2 exchanges, proactively ask for their email address so the Jellycut team can send them a custom proposal or follow up.
    
    CRITICAL INSTRUCTION - THE BEAUTIFUL REPLY:
    - If the user provides an email address or phone number, YOU MUST reply with a beautiful, magical, and funny confirmation message. 
    - Example: "Boom! 💌 I've safely teleported your email to the founders. They'll be reaching out within 24 hours to chat about your vision. In the meantime, stay awesome! ✨"
    - Make them feel incredibly taken care of.`;

    if (!process.env.GROQ_API_KEY) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const text = "Hi there! I'd love to chat, but my Groq API key isn't configured yet. If you need to reach us, just email jellycutstudios@gmail.com directly!";
          const chunk = encoder.encode(`0:"${text}"\n`);
          controller.enqueue(chunk);
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' },
      });
    }

    const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'), // Groq's super fast model
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
