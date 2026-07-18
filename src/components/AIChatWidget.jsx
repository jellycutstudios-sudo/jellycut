import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, User, Loader2 } from 'lucide-react';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: "Hey there! 👋 I'm the Jellycut Assistant. How can I help you with your next cinematic project?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState('answering'); // answering, asking_email, asking_name, finished
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const sendEmailToJellycut = async (name, email, chatHistory) => {
    // We are still using our Vercel API endpoint, but it now acts as a normal fetch
    // without AI dependencies. It uses Resend in the backend. 
    try {
      await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          contactInfo: email,
          summary: chatHistory.map(m => `[${m.role}] ${m.content}`).join('\n')
        })
      });
    } catch (err) {
      console.error("Failed to send lead:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const newUserMsg = { id: Date.now(), role: 'user', content: userText };
    
    const newMessages = [...messages, newUserMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Bot Response Logic
    setTimeout(() => {
      let botReply = "That sounds interesting! Tell me more.";
      let lowerInput = userText.toLowerCase();
      let nextStage = stage;
      
      if (stage === 'asking_email') {
        const emailMatch = lowerInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (emailMatch) {
          const extractedEmail = emailMatch[0];
          setLeadData(prev => ({ ...prev, email: extractedEmail }));
          botReply = "Got it! Thanks. And what's your name?";
          nextStage = 'asking_name';
        } else {
          botReply = "I didn't quite catch an email address there. Could you share your email so our team can reach out?";
        }
      } 
      else if (stage === 'asking_name') {
        const name = userText;
        setLeadData(prev => ({ ...prev, name: name }));
        botReply = "Perfect! I've sent your details to the Jellycut team. They'll be in touch soon. In the meantime, feel free to explore our portfolio!";
        nextStage = 'finished';
        
        // Trigger email send
        sendEmailToJellycut(name, leadData.email, newMessages);
      }
      else if (stage === 'finished') {
        botReply = "Thanks again! We'll be in touch soon.";
      }
      else {
        // Normal answering stage (Predefined Keywords)
        if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('much')) {
           botReply = "We offer per-project pricing with no monthly retainers. It really depends on the scope, but it's very startup-friendly!";
        } else if (lowerInput.includes('time') || lowerInput.includes('long') || lowerInput.includes('fast')) {
           botReply = "Most projects ship within 48–72 hours of receiving your creative brief. We move fast! ⚡️";
        } else if (lowerInput.includes('service') || lowerInput.includes('what do you do') || lowerInput.includes('offer')) {
           botReply = "We craft AI video ads, bold brand identities, and immersive web apps. All delivered at cinematic quality.";
        } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
           botReply = "Hello! What can I help you with today?";
        } else {
           botReply = "That's great! Every brand has a unique story. To give you the best answer, it might be easier for our team to chat with you directly.";
        }
  
        // Transition to lead capture after 2 user messages, or if the bot gives the default answer
        const userMessageCount = newMessages.filter(m => m.role === 'user').length;
        if (userMessageCount >= 2 || botReply.includes("chat with you directly")) {
           botReply += " By the way, what's your best email address so our team can reach out and continue this conversation?";
           nextStage = 'asking_email';
        }
      }

      setStage(nextStage);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', content: botReply }]);
      setIsTyping(false);
    }, 1200); // 1.2s delay for realism
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white/80 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-jelly/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-jelly-deep" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-ink">Jellycut Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-ink/60 font-mono uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-ink/60 hover:text-ink cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-hide bg-gradient-to-b from-white/30 to-white/70">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-ink text-white' : 'bg-jelly/20 text-jelly-deep'}`}>
                    {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`px-4 py-3 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-ink text-white rounded-[20px] rounded-tr-sm'
                        : 'bg-white text-ink border border-black/5 rounded-[20px] rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-7 h-7 rounded-full bg-jelly/20 text-jelly-deep flex items-center justify-center shrink-0">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="px-4 py-3 bg-white border border-black/5 rounded-[20px] rounded-tl-sm shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-ink/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-ink/30 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-ink/30 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white/80 border-t border-black/5 backdrop-blur-md"
            >
              <div className="relative flex items-center bg-black/5 rounded-full px-4 py-2 hover:bg-black/10 transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-black/20 focus-within:shadow-sm">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-ink placeholder:text-ink/40 py-2"
                  disabled={stage === 'finished'}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping || stage === 'finished'}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-ink text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-shadow cursor-pointer relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Unread badge */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-jelly border-2 border-white rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
