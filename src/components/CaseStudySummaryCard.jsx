import { CheckCircle2, ShieldCheck, Target, Layers, TrendingUp, Cpu } from 'lucide-react';

export default function CaseStudySummaryCard({
  problem,
  role,
  deliverables = [],
  qualityVerification,
  outcome,
  aiVsHuman = null,
  badge = 'Verified Case Study'
}) {
  return (
    <div className="bg-[#fafbf7] border border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm mb-12">
      
      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-line/60">
        <div className="inline-flex items-center gap-2 bg-[#f0fbe8] border border-[#c8f0a0] rounded-full px-3.5 py-1 text-[11px] font-bold text-[#2d7a00] font-mono tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-jelly animate-pulse" />
          <span>{badge}</span>
        </div>
        <span className="text-xs font-mono text-muted uppercase tracking-widest">
          Production &amp; Engineering Audit
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        
        {/* Left Column: Problem & Role */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted font-bold mb-2">
              <Target className="w-4 h-4 text-jelly-deep" />
              <span>01. The Client's Problem</span>
            </div>
            <p className="text-sm sm:text-base text-ink/90 font-light leading-relaxed">
              {problem}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted font-bold mb-2">
              <Layers className="w-4 h-4 text-jelly-deep" />
              <span>02. Jellycut's Role &amp; Execution</span>
            </div>
            <p className="text-sm sm:text-base text-ink/90 font-light leading-relaxed">
              {role}
            </p>
          </div>

          {/* AI vs Human Production Breakdown if provided */}
          {aiVsHuman && (
            <div className="bg-white border border-line rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink font-bold">
                <Cpu className="w-4 h-4 text-jelly-deep" />
                <span>Production Pipeline Breakdown (AI vs Human Craft)</span>
              </div>
              <ul className="space-y-2 text-xs text-muted font-sans">
                {aiVsHuman.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono font-bold text-ink shrink-0">{item.label}:</span>
                    <span className="font-light text-ink/80">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Deliverables, Quality & Results */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted font-bold mb-2">
              <CheckCircle2 className="w-4 h-4 text-jelly-deep" />
              <span>03. Exact Deliverables</span>
            </div>
            <ul className="space-y-1.5">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-ink/80">
                  <span className="text-jelly-deep font-bold font-mono">✓</span>
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-jelly-deep" />
              <span>04. Quality &amp; Verification Checks</span>
            </div>
            <p className="text-sm text-muted font-light leading-relaxed">
              {qualityVerification}
            </p>
          </div>

          <div className="pt-2 border-t border-line/60">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-jelly-deep font-bold mb-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>05. Verified Outcome &amp; Impact</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-ink leading-relaxed">
              {outcome}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

