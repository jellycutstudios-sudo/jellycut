import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

const statuses = [
  { icon: CheckCircle2, text: "AI Ad delivered for a UAE brand — 2 hours ago", color: "text-green-600" },
  { icon: Clock, text: "Brand identity in progress — 3 slots open this week", color: "text-amber-600" },
  { icon: Sparkles, text: "Next premium web project slot opens Thursday", color: "text-jelly-deep" }
];

export default function StudioStatusTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statuses.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 flex items-center justify-center animate-fade-rise">
      <div className="bg-white/80 backdrop-blur-md border border-line/40 rounded-full py-2 px-4 shadow-sm flex items-center gap-2 overflow-hidden w-[340px] sm:w-[380px] h-10">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jelly opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-jelly-deep"></span>
          </span>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted">
            Live
          </span>
          <div className="h-3 w-[1px] bg-line/50 ml-1"></div>
        </div>
        
        <div className="relative flex-grow h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center gap-1.5"
            >
              {(() => {
                const Icon = statuses[currentIndex].icon;
                return <Icon className={`w-3.5 h-3.5 ${statuses[currentIndex].color}`} />;
              })()}
              <span className="text-[11px] sm:text-xs font-medium text-ink truncate">
                {statuses[currentIndex].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
