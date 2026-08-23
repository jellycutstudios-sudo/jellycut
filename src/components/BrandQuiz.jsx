import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RefreshCcw, Sparkles, Check } from 'lucide-react';

const questions = [
  {
    id: 'goal',
    stepLabel: '01 // Objective',
    question: "What's your primary focus right now?",
    hint: "We'll match your priority to the highest-leverage deliverable.",
    options: [
      { text: "Acquire new customers", value: "growth", sub: "High-converting video creative & performance assets" },
      { text: "Launch a new product", value: "launch", sub: "Cinematic launch video & digital flagship presence" },
      { text: "Build market authority", value: "trust", sub: "World-class brand identity & high-trust positioning" }
    ]
  },
  {
    id: 'audience',
    stepLabel: '02 // Channel',
    question: "Where do your buyers discover you?",
    hint: "Every asset is engineered specifically for its target platform.",
    options: [
      { text: "Instagram, TikTok & Meta", value: "social", sub: "Fast-paced, 9:16 vertical storytelling" },
      { text: "LinkedIn & B2B Networks", value: "professional", sub: "Authority-driven carousels & executive video" },
      { text: "Search & Web Direct", value: "search", sub: "High-speed landing pages & interactive experiences" }
    ]
  },
  {
    id: 'timeline',
    stepLabel: '03 // Timeline',
    question: "When do you need to go live?",
    hint: "Standard production is 1–2 weeks; rush delivery available.",
    options: [
      { text: "Urgent (Within 48–72 hours)", value: "fast", sub: "Fast-track sprint pipeline" },
      { text: "This month (1–2 weeks)", value: "medium", sub: "Standard studio development cycle" },
      { text: "Planning next quarter", value: "slow", sub: "Strategic scoping & creative prep" }
    ]
  }
];

const recommendations = {
  growth_social:       { title: "AI Video Ad Campaign", tag: "Highest ROI", desc: "Scroll-stopping, cinematic 9:16 ads for Meta and TikTok with first cuts ready in 48 hours." },
  growth_professional: { title: "B2B Authority Video Pack", tag: "Enterprise Growth", desc: "Executive-grade motion assets and visual case studies tuned for high-value B2B pipeline." },
  growth_search:       { title: "High-Speed Web App & Site", tag: "Max Conversion", desc: "A bespoke, sub-second interactive website engineered to convert paid & organic traffic." },
  launch_social:       { title: "Cinematic Launch Campaign", tag: "Product Debut", desc: "A show-stopping 3D/AI hero commercial that commands attention and drives Day-1 demand." },
  launch_professional: { title: "Complete Brand Identity", tag: "Category Leader", desc: "Logo architecture, design system, and brand guidelines that position you as an established leader." },
  launch_search:       { title: "Digital Flagship Website", tag: "Product Launch", desc: "A complete launch landing page with 3D elements, interactive brief flows, and SEO foundations." },
  trust_social:        { title: "Identity & Social Content", tag: "Visual Authority", desc: "Cohesive visual language bridging high-end brand guidelines with ongoing social assets." },
  trust_professional:  { title: "Executive Brand Identity", tag: "Enterprise Trust", desc: "A meticulous identity package that earns immediate buy-in from decision-makers and investors." },
  trust_search:        { title: "Authority Web Flagship", tag: "Market Leadership", desc: "A polished, ultra-responsive website that clearly signals why you're the leader in your space." },
};

const getRecommendation = (answers) => {
  const key = `${answers.goal}_${answers.audience}`;
  return recommendations[key] || {
    title: "Bespoke Creative Strategy",
    tag: "Custom Scope",
    desc: "Let's align directly. We'll map out the exact creative, motion, and digital assets needed to achieve your targets."
  };
};

const ease = [0.16, 1, 0.3, 1];

export default function BrandQuiz({ setIsModalOpen }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
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

  return (
    <div className="w-full max-w-xl mx-auto relative">
      
      {/* Subtle top decoration */}
      <div className="flex items-center justify-between pb-6 border-b border-line/50">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-jelly animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted font-bold">
            Interactive Brief
          </span>
        </div>

        {!showResult && (
          <span className="text-xs font-mono font-bold text-jelly-deep bg-cream px-3 py-1 rounded-full border border-line">
            Step {currentStep + 1} of {questions.length}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {!showResult && (
        <div className="h-[2px] w-full bg-line rounded-full overflow-hidden mt-6 mb-8">
          <motion.div
            className="h-full bg-jelly-deep rounded-full"
            initial={{ width: '33.33%' }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            transition={{ ease, duration: 0.4 }}
          />
        </div>
      )}

      {/* Question / Result Area */}
      <div className="relative min-h-[340px]">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ ease, duration: 0.3 }}
              className="w-full"
            >
              {/* Question Header */}
              <div className="mb-6">
                <span className="text-[11px] font-mono text-muted tracking-wider uppercase font-semibold block mb-1.5">
                  {currentQuestion.stepLabel}
                </span>
                <h4 className="font-serif text-2xl md:text-3xl text-ink font-normal leading-snug tracking-tight mb-2">
                  {currentQuestion.question}
                </h4>
                <p className="text-xs md:text-sm text-muted font-light leading-relaxed">
                  {currentQuestion.hint}
                </p>
              </div>

              {/* Options Stack */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selected === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group cursor-pointer active:scale-[0.99] ${
                        isSelected
                          ? 'border-jelly-deep bg-cream shadow-sm ring-1 ring-jelly-deep/30'
                          : 'border-line bg-white hover:border-jelly-deep/50 hover:bg-cream/40 shadow-xs'
                      }`}
                    >
                      {/* Number Prefix */}
                      <span className={`text-xs font-mono font-bold w-6 shrink-0 transition-colors ${
                        isSelected ? 'text-jelly-deep' : 'text-muted/50 group-hover:text-jelly-deep'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <p className={`text-sm font-semibold leading-snug transition-colors ${
                          isSelected ? 'text-jelly-deep' : 'text-ink'
                        }`}>
                          {opt.text}
                        </p>
                        <p className="text-xs text-muted font-light mt-0.5 leading-relaxed">
                          {opt.sub}
                        </p>
                      </div>

                      {/* Selection Check Indicator */}
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-jelly-deep bg-jelly-deep text-white shadow-xs'
                          : 'border-line/80 group-hover:border-jelly-deep/40'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Bar */}
              <div className="mt-8 pt-5 border-t border-line/40 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="text-xs font-semibold text-muted hover:text-ink transition-colors disabled:opacity-0 disabled:pointer-events-none font-mono uppercase tracking-wider cursor-pointer"
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className={`flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all ${
                    selected
                      ? 'bg-ink text-white hover:bg-jelly-deep shadow-md hover:scale-[1.02] cursor-pointer'
                      : 'bg-line/40 text-muted/50 cursor-not-allowed'
                  }`}
                >
                  <span>{currentStep === questions.length - 1 ? 'View Recommendation' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease, duration: 0.35 }}
              className="w-full pt-2"
            >
              {/* Recommendation Card */}
              <div className="bg-ink text-white rounded-[1.75rem] p-8 relative overflow-hidden shadow-2xl space-y-6">
                <div className="absolute top-0 right-0 w-48 h-48 bg-jelly/20 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <span className="inline-block bg-jelly/20 text-jelly border border-jelly/30 text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                    Recommended Path // {result.tag}
                  </span>
                  <h4 className="font-serif text-2xl md:text-3xl text-white font-normal leading-tight">
                    {result.title}
                  </h4>
                </div>

                <p className="text-white/70 text-sm font-light leading-relaxed">
                  {result.desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setIsModalOpen && setIsModalOpen(true)}
                    className="flex-1 bg-jelly hover:bg-jelly-mid text-ink rounded-full px-6 py-4 text-xs font-bold tracking-wider font-mono uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-jelly/10 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Start This Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-1.5 px-5 py-4 rounded-full border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
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
