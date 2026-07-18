import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, User, Loader2 } from 'lucide-react';

const getMessageText = (message) => {
  if (message.parts) {
    return message.parts
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('');
  }
  return message.content || '';
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const { messages, sendMessage, status } = useChat({
    api: '/api/chat',
    messages: [
      {
        id: '1',
        role: 'assistant',
        parts: [{ type: 'text', text: "Hey there! 👋 I'm the Jellycut AI. How can I help you with your next project?" }]
      }
    ]
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Lead capture logic - triggers when user provides email
  useEffect(() => {
    if (leadSent || messages.length === 0) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      const text = getMessageText(lastMessage);
      const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const phoneMatch = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/im);
      
      if (emailMatch || phoneMatch) {
        setLeadSent(true);
        const contactInfo = emailMatch ? emailMatch[0] : phoneMatch[0];
        
        fetch('/api/send-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Website Visitor', // You could instruct the AI to ask for name first and extract it, but visitor works fine as a default
            contactInfo: contactInfo,
            summary: messages.map(m => `[${m.role}] ${getMessageText(m)}`).join('\n')
          })
        }).catch(err => console.error("Failed to send lead:", err));
      }
    }
  }, [messages, leadSent]);

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
                <div className="w-8 h-8 rounded-full bg-jelly/5 overflow-hidden flex items-center justify-center">
                  <img 
                    src="/favicon.svg" 
                    alt="Jellycut Logo" 
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-ink">Jellycut Studio AI</h3>
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
                    {getMessageText(m)}
                  </div>
                </div>
              ))}
              {isLoading && (
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
              onSubmit={(e) => {
                e.preventDefault();
                if (!inputValue.trim() || isLoading) return;
                sendMessage({ text: inputValue });
                setInputValue('');
              }}
              className="p-4 bg-white/80 border-t border-black/5 backdrop-blur-md"
            >
              <div className="relative flex items-center bg-black/5 rounded-full px-4 py-2 hover:bg-black/10 transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-black/20 focus-within:shadow-sm">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-ink placeholder:text-ink/40 py-2"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
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
        
        {/* Unread badge logic could go here */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-jelly border-2 border-white rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
