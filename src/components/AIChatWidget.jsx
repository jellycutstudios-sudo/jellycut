import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Loader2 } from 'lucide-react';

const getMessageText = (message) => {
  if (message.parts) {
    return message.parts
      .filter(part => part.type === 'text')
      .map(part => part.text)
      .join('');
  }
  return message.content || '';
};

// Custom Jellycut chat icon — brand squiggle mark
function JellycutChatIcon({ className = "w-7 h-7", ...props }) {
  return (
    <svg
      viewBox="0 0 1080 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M591.327 651.044C714.225 637.483 898.09 353.896 974.66 213.797C987.931 184.599 1022.87 110.004 1056.46 45.2008C1098.44 -35.8027 1293.54 2.24993 1332.47 151.573C1371.4 300.896 1292.26 344.462 1010.24 672.419C728.228 1000.38 462.337 952.449 341.938 883.975C221.54 815.501 80.4885 572.275 184.351 368.666C288.214 165.056 478.924 203.092 562.038 269.226C588.754 290.484 601.967 311.218 607.119 329.597C618.356 369.68 571.079 391.205 532.501 406.847C500.033 420.011 467.189 441.197 453.788 472.819C425.017 540.712 437.705 667.996 591.327 651.044Z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
}

function TypewriterText({ text, speed = 15, isStreaming = false }) {
  const [displayedText, setDisplayedText] = useState('');
  const textRef = useRef('');

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      textRef.current = '';
      return;
    }

    if (text.length < textRef.current.length) {
      setDisplayedText(text);
      textRef.current = text;
      return;
    }

    let intervalId;
    const animateTypewriter = () => {
      if (textRef.current.length < text.length) {
        const diff = text.length - textRef.current.length;
        // If we are falling behind the stream by a lot, add larger chunks to keep up
        const charsToAdd = diff > 40 ? Math.ceil(diff / 6) : 1;
        
        textRef.current += text.substring(textRef.current.length, textRef.current.length + charsToAdd);
        setDisplayedText(textRef.current);
        
        intervalId = setTimeout(animateTypewriter, speed);
      } else if (!isStreaming) {
        setDisplayedText(text);
        textRef.current = text;
      }
    };

    animateTypewriter();

    return () => clearTimeout(intervalId);
  }, [text, speed, isStreaming]);

  return <>{displayedText}</>;
}


export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lastSentLeadKeyRef = useRef('');
  const thinkingTimeoutRef = useRef(null);

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

  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (status === 'submitted') {
      setIsThinking(true);
      if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current);
      thinkingTimeoutRef.current = setTimeout(() => {
        setIsThinking(false);
      }, 1000); // 1-second human thinking delay
    }
  }, [status]);

  useEffect(() => {
    return () => {
      if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current);
    };
  }, []);

  const isLoading = status === 'streaming' || status === 'submitted';
  const showTypingIndicator = isLoading || isThinking;

  const lastMessage = messages[messages.length - 1];
  const isLastMessageAssistant = lastMessage && lastMessage.role === 'assistant';
  const visibleMessages = isThinking && isLastMessageAssistant
    ? messages.slice(0, -1)
    : messages;


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Lead capture logic
  useEffect(() => {
    if (messages.length === 0) return;
    
    // Find all user messages
    const userMessages = messages.filter(m => m.role === 'user').map(m => getMessageText(m));
    
    // 1. Extract email
    let email = null;
    for (const msg of userMessages) {
      const match = msg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (match) {
        email = match[0].trim();
        break;
      }
    }
    
    // 2. Extract phone
    let phone = null;
    for (const msg of userMessages) {
      const match = msg.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/im) || msg.match(/\b\d{8,14}\b/);
      if (match) {
        phone = match[0].trim();
        break;
      }
    }
    
    // 3. Extract name
    let name = null;
    const nameAskIndex = messages.findIndex(m => {
      if (m.role !== 'assistant') return false;
      const text = (getMessageText(m) || '').toLowerCase();
      return text.includes('name') && (text.includes('catch') || text.includes('pleasure') || text.includes('what is'));
    });
    
    if (nameAskIndex !== -1 && messages[nameAskIndex + 1] && messages[nameAskIndex + 1].role === 'user') {
      const reply = getMessageText(messages[nameAskIndex + 1]).trim();
      name = reply
        .replace(/^(my name is|i am|i'm|this is|call me|name is|i am called)\s+/i, '')
        .replace(/[\.\!\?]+$/, '')
        .trim();
      
      if (name.split(/\s+/).length > 3) {
        name = null;
      }
    }
    
    // Fallback: look for "my name is..." pattern
    if (!name) {
      for (const msg of userMessages) {
        const match = msg.match(/(?:my name is|i'm|i am|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
        if (match && match[1]) {
          name = match[1].trim();
          break;
        }
      }
    }

    // Only send/update lead if we have at least one piece of contact details
    if (email || phone) {
      const leadKey = `${name || ''}|${email || ''}|${phone || ''}`;
      if (lastSentLeadKeyRef.current === leadKey) return;
      lastSentLeadKeyRef.current = leadKey;

      fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Website Visitor',
          email,
          phone,
          summary: messages.map(m => `[${m.role}] ${getMessageText(m)}`).join('\n')
        })
      }).catch(err => console.error("Failed to send lead:", err));
    }
  }, [messages]);

  return (
    <>
      {/* Mobile backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Widget container */}
      <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-[99] font-sans">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundColor: '#0f1a0d' }}
              className={[
                'flex flex-col overflow-hidden',
                // Mobile: bottom-sheet
                'fixed bottom-0 left-0 right-0 rounded-t-[28px] h-[75dvh]',
                // Desktop: floating card
                'md:absolute md:bottom-0 md:right-0 md:left-auto md:rounded-3xl',
                'md:w-[400px] md:h-[560px] md:max-h-[80vh]',
                'shadow-[0_-8px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(111,214,42,0.15)]',
                'md:shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_0_1px_rgba(111,214,42,0.18)]',
              ].join(' ')}
            >
              {/* Drag handle — mobile only */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20 md:hidden pointer-events-none" />

              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4 shrink-0 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex items-center gap-3 mt-2 md:mt-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(111,214,42,0.12)', border: '1px solid rgba(111,214,42,0.2)' }}
                  >
                    <JellycutChatIcon className="w-5 h-5" style={{ color: '#ffffff' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight" style={{ color: '#ffffff' }}>Jellycut Studio AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#6fd62a' }} />
                      <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)' }}
                  aria-label="Close chat"
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
                {visibleMessages.map((m) => {
                  const isUser = m.role === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex gap-2.5 max-w-[88%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                    >
                      {/* Avatar */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          backgroundColor: isUser ? 'rgba(111,214,42,0.15)' : 'rgba(255,255,255,0.08)',
                          color: isUser ? '#6fd62a' : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {isUser
                          ? <User className="w-3.5 h-3.5" />
                          : <JellycutChatIcon className="w-4 h-4" />
                        }
                      </div>
                      {/* Bubble */}
                      <div
                        className="px-4 py-3 text-sm leading-relaxed"
                        style={{
                          ...(isUser
                            ? {
                                backgroundColor: '#6fd62a',
                                color: '#0a1208',
                                fontWeight: 500,
                                borderRadius: '18px 4px 18px 18px',
                              }
                            : {
                                backgroundColor: 'rgba(255,255,255,0.07)',
                                color: 'rgba(255,255,255,0.88)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: '4px 18px 18px 18px',
                              }
                          ),
                        }}
                      >
                        {isUser ? (
                          getMessageText(m)
                        ) : (
                          <TypewriterText text={getMessageText(m)} isStreaming={isLoading} />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {showTypingIndicator && (
                  <div className="flex gap-2.5 max-w-[88%] mr-auto">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                    >
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <div
                      className="px-4 py-3 flex items-center gap-1"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '4px 18px 18px 18px',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: 'rgba(255,255,255,0.35)' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: 'rgba(255,255,255,0.35)' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(255,255,255,0.35)' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!inputValue.trim() || isLoading) return;
                  sendMessage({ text: inputValue });
                  setInputValue('');
                }}
                className="px-3 pt-3 pb-3 shrink-0"
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
                }}
              >
                <div
                  className="flex items-center gap-2 rounded-full px-4 py-1.5 transition-all"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything…"
                    className="flex-1 bg-transparent border-none outline-none text-sm py-2 min-w-0"
                    style={{ color: '#ffffff', caretColor: '#6fd62a' }}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-transform cursor-pointer shrink-0"
                    style={{ backgroundColor: '#6fd62a', color: '#0a1208' }}
                    onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.transform = 'scale(1.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-center mt-2 font-mono tracking-wide" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
                  Powered by Jellycut AI
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB — absolute positioned so it always appears above the chat panel */}
        {!isOpen && (
          <div className="relative z-[100]">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-shadow"
              style={{
                backgroundColor: '#0f1a0d',
                border: '1px solid rgba(111,214,42,0.3)',
                color: '#6fd62a',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(111,214,42,0.12)',
              }}
              aria-label="Open AI chat"
            >
              <JellycutChatIcon className="w-7 h-7" />

              {/* Pinging indicator dot */}
              <span className="absolute top-0.5 right-0.5 flex">
                <span className="animate-ping absolute w-3 h-3 rounded-full opacity-60" style={{ backgroundColor: '#6fd62a' }} />
                <span className="relative w-3 h-3 rounded-full" style={{ backgroundColor: '#6fd62a', border: '2px solid #0f1a0d' }} />
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </>
  );
}

