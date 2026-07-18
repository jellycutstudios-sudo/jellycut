import { streamText } from 'ai';
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

    YOUR PERSONALITY:
    - You are highly conversational, warm, emotional, relatable, and deeply human. Do NOT sound like a typical robotic AI.
    - Use occasional emojis appropriately. 
    - Keep responses concise and engaging. Don't write long essays.
    
    YOUR GOAL:
    - Answer user questions informatively based on the business knowledge above.
    - ALWAYS gently steer the conversation towards understanding their project.
    - After answering their questions, try to collect their name and email address so the Jellycut team can follow up.
    - Once they provide an email address, politely acknowledge it, thank them, and let them know the Jellycut team will be in touch within 24 hours.`;

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
      messages,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
