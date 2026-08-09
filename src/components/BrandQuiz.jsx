import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RefreshCcw, Sparkles } from 'lucide-react';

const questions = [
  {
    id: 'goal',
    question: "What's your biggest goal right now?",
    hint: "This helps us recommend the right service",
    options: [
      { text: "Get more customers", icon: "📈", value: "growth", sub: "Reach new buyers, fast" },
      { text: "Launch a new product", icon: "🚀", value: "launch", sub: "Make a bold first impression" },
      { text: "Build credibility & trust", icon: "🏆", value: "trust", sub: "Look like the best in your space" }
    ]
  },
  {
    id: 'audience',
    question: "Where does your audience spend time?",
    hint: "We'll tailor your deliverables for the right platform",
    options: [
      { text: "Instagram / TikTok", icon: "📱", value: "social", sub: "Short-form, vertical content" },
      { text: "LinkedIn / B2B", icon: "💼", value: "professional", sub: "Authority-first content" },
      { text: "Google / Website", icon: "🌐", value: "search", sub: "Search-driven discovery" }
    ]
  },
  {
    id: 'timeline',
    question: "What's your timeline?",
    hint: "Helps us set the right expectations",
    options: [
      { text: "This week", icon: "⚡", value: "fast", sub: "We can do 48h rush delivery" },
      { text: "This month", icon: "📅", value: "medium", sub: "Standard delivery window" },
      { text: "Just exploring", icon: "🔍", value: "slow", sub: "No pressure — we'll be ready" }
    ]
  }
];

const recommendations = {
  growth_social:       { title: "AI Video Ad Campaign", tag: "Highest ROI", desc: "Scroll-stopping creative for Meta & TikTok. First draft in 48 hours." },
  growth_professional: { title: "LinkedIn Creative Pack", tag: "B2B Growth", desc: "Authority-building video + carousel ads tuned for LinkedIn's algorithm." },
  growth_search:       { title: "Cinematic Website", tag: "Convert Traffic", desc: "A high-speed, conversion-optimised site that turns visitors into leads." },
  launch_social:       { title: "Product Launch Ad", tag: "Go Viral", desc: "A cinematic launch video that stops the scroll and drives Day-1 sales." },
  launch_professional: { title: "Brand Identity System", tag: "Look Legit", desc: "Logo, typography, and brand guidelines that make you look like a $10M company." },
  launch_search:       { title: "Launch Website", tag: "Digital Flagship", desc: "A full product landing page with animations, CTA flows, and SEO structure built in." },
  trust_social:        { title: "Brand Identity + Content", tag: "Authority First", desc: "Consistent visual language across your brand and social presence." },
  trust_professional:  { title: "Premium Brand Identity", tag: "High Trust", desc: "A cohesive identity package that earns instant credibility with decision-makers." },
  trust_search:        { title: "Professional Website", tag: "Credibility Engine", desc: "A polished, fast website that signals you're the obvious choice in your category." },
};

const getRecommendation = (answers) => {
  const key = `${answers.goal}_${answers.audience}`;
  return recommendations[key] || {
    title: "Custom Creative Strategy",
    tag: "Bespoke",
    desc: "Let's talk. We'll outline exactly what assets you need to hit your goals this quarter."
  };
};

export default function BrandQuiz({ setIsModalOpen }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null); // selected value for current step
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentStep];

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setDirection(-1);
    setSelected(answers[questions[currentStep - 1].id] || null);
    const prev = { ...answers };
    delete prev[currentQuestion.id];
    setAnswers(prev);
    setCurrentStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setSelected(null);
    setShowResult(false);
    setDirection(1);
  };

  const result = showResult ? getRecommendation(answers) : null;
  const progress = showResult ? 100 : ((currentStep) / questions.length) * 100;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-jelly-deep" />
        <span className="text-xs font-mono uppercase tracking-widest text-jelly-deep font-semibold">
          Find Your Perfect Service
        </span>
      </div>

      {/* Progress Steps */}
      {!showResult && (
        <div className="flex items-center gap-2 mb-8">
          {questions.map((_, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                  i < currentStep ? 'bg-jelly-deep' : i === currentStep ? 'bg-jelly' : 'bg-line/50'
                }`}
              />
            </div>
          ))}
          <span className="text-xs font-mono text-muted shrink-0 ml-1">
            {currentStep + 1} / {questions.length}
          </span>
        </div>
      )}

      {/* Question / Result Area */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Question */}
              <div className="mb-1">
                <h4 className="text-xl md:text-2xl text-ink font-medium leading-snug mb-1">
                  {currentQuestion.question}
                </h4>
                <p className="text-xs text-muted font-light">{currentQuestion.hint}</p>
              </div>

              {/* Options */}
              <div className="mt-5 grid gap-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                        isSelected
                          ? 'border-jelly-deep bg-jelly/10 shadow-sm'
                          : 'border-line/50 bg-white hover:border-jelly/50 hover:bg-cream/60'
                      }`}
                    >
                      {/* Icon */}
                      <span className="text-2xl shrink-0 leading-none" aria-hidden="true">
                        {opt.icon}
                      </span>
                      {/* Text */}
                      <div className="flex-grow min-w-0">
                        <p className={`text-sm font-semibold leading-snug transition-colors ${isSelected ? 'text-ink' : 'text-ink'}`}>
                          {opt.text}
                        </p>
                        <p className="text-xs text-muted font-light mt-0.5">{opt.sub}</p>
                      </div>
                      {/* Radio indicator */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? 'border-jelly-deep bg-jelly-deep' : 'border-line/60 group-hover:border-jelly/50'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="text-xs text-muted hover:text-ink transition-colors disabled:opacity-30 disabled:pointer-events-none font-medium"
                >
                  ← Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${
                    selected
                      ? 'bg-ink text-white hover:bg-jelly-deep hover:scale-[1.02] shadow-sm cursor-pointer'
                      : 'bg-line/30 text-muted cursor-not-allowed'
                  }`}
                >
                  <span>{currentStep === questions.length - 1 ? 'See Results' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Result Card */}
              <div className="bg-ink text-white rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-jelly/15 rounded-full blur-3xl" />

                <span className="inline-block bg-jelly text-ink text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  {result.tag}
                </span>

                <h4 className="font-serif text-2xl md:text-3xl text-white mb-3">
                  {result.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  {result.desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsModalOpen && setIsModalOpen(true)}
                    className="flex-1 bg-jelly hover:bg-jelly/90 text-ink rounded-full px-6 py-3.5 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-jelly/20"
                  >
                    <span>Start This Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full border border-white/15 hover:border-white/30 text-white/60 hover:text-white text-xs font-medium transition-all"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
