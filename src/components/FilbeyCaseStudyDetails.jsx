import { Layers, Film, Sliders, Sparkles, ArrowRight, Cpu, Zap, Eye } from 'lucide-react';

const techStack = [
  { phase: 'Concept', tool: 'Midjourney v6', desc: 'Visual ideation and styleframe generation for the "Midnight & Ember" palette.' },
  { phase: 'Motion', tool: 'Runway Gen-3 Alpha / Kling AI', desc: 'Neural video synthesis for fluid sauce dynamics and fracture physics.' },
  { phase: 'Enhancement', tool: 'Magnific AI & Topaz Video', desc: 'Custom 8K upscaling pipeline for hyper-real texture fidelity on every frame.' },
  { phase: 'Post & Grade', tool: 'Adobe Creative Suite', desc: 'Final color grading, sound design integration, and broadcast-ready export.' },
];

const paletteItems = [
  {
    icon: Sliders,
    title: 'Deep Obsidian & Slate',
    desc: 'A premium dark stage that forces the eye toward the food — stripping away the clinical white-studio aesthetic of traditional fast-food ads.',
    swatch: 'bg-[#1a1a2e]',
  },
  {
    icon: Zap,
    title: 'Electric Gold & Amber',
    desc: 'Ember-toned rim lights that catch the moisture of the meat and the crystalline peaks of fried breading, making every frame feel like fire.',
    swatch: 'bg-[#F5A623]',
  },
  {
    icon: Eye,
    title: 'Macro Physics',
    desc: 'Extreme close-ups that turn food into a topographic landscape — breading becomes a mountain range, sauce becomes a tidal wave.',
    swatch: 'bg-[#3d2b1f]',
  },
];

export default function FilbeyCaseStudyDetails({ project, onZoomIndex, setIsModalOpen }) {
  if (!project) return null;

  return (
    <div className="space-y-16 border-t border-line pt-12">

      {/* ── Section 01: The Brief ───────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">01</span>
          <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
            The Brief
          </h2>
        </div>
        <div className="bg-[#0f0c08] border border-[#2a1f0f] rounded-3xl p-6 md:p-8 relative overflow-hidden">
          {/* Ember glow */}
          <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#F5A623]/10 blur-3xl pointer-events-none" />
          <p className="text-[#e8d5b7] text-base md:text-lg font-light leading-relaxed font-sans relative z-10">
            Filbey approached Jellycut Studio to create a 20-second <strong className="text-[#F5A623] font-semibold">"sensory assault"</strong> that would
            disrupt the traditional fast-food advertising landscape. The goal was to move away from flat, bright, commercial lighting and into{' '}
            <strong className="text-[#F5A623] font-semibold">"Midnight &amp; Ember"</strong>—a moody, high-contrast aesthetic that emphasizes
            texture, heat, and the "unbelievable" crunch of their signature menu.
          </p>
        </div>
      </div>

      {/* ── Section 02: The Vision: Midnight & Ember ───────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">02</span>
          <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-jelly flex-shrink-0" />
            The Vision: Midnight &amp; Ember
          </h2>
        </div>

        <p className="text-muted text-sm md:text-base font-light leading-relaxed font-sans">
          We developed a visual language built entirely on contrast — premium darkness as a stage, and electric warmth as the spotlight.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {paletteItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white border border-line rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-jelly-mid/20 transition-all duration-300 space-y-3 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full ${item.swatch} border border-white/20 flex-shrink-0`} />
                <item.icon className="w-4 h-4 text-jelly-deep" />
                <h4 className="text-[11px] font-bold text-ink uppercase tracking-wide font-mono">{item.title}</h4>
              </div>
              <p className="text-muted text-xs md:text-sm font-light leading-relaxed flex-grow">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 03: The Tech: Neural Motion Synthesis ──────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">03</span>
          <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-jelly flex-shrink-0" />
            The Tech: Neural Motion Synthesis
          </h2>
        </div>

        <div className="bg-[#0f0c08] border border-[#2a1f0f] rounded-3xl p-6 md:p-8 relative overflow-hidden space-y-4">
          <div className="absolute top-0 left-0 w-64 h-32 rounded-full bg-[#F5A623]/8 blur-3xl pointer-events-none" />
          <p className="text-[#e8d5b7] text-sm md:text-base font-light leading-relaxed font-sans relative z-10">
            This project marks a milestone for Jellycut Studio as a <strong className="text-[#F5A623] font-semibold">fully AI-integrated production</strong>.
            By leveraging the latest in Generative AI and Neural Physics, we achieved "impossible" shots that traditional CG pipelines would take months to render.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 pt-2">
            {/* Latent Space Physics */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 hover:bg-white/8 transition-colors">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#F5A623]" />
                <h5 className="text-[11px] font-bold text-white uppercase tracking-wide font-mono">Latent Space Physics</h5>
              </div>
              <p className="text-[#e8d5b7]/70 text-xs font-light leading-relaxed">
                We used AI models to simulate the viscous flow of sauces and the "fracture physics" of crispy chicken skin in real-time.
              </p>
            </div>
            {/* Neural Upscaling */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 hover:bg-white/8 transition-colors">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#F5A623]" />
                <h5 className="text-[11px] font-bold text-white uppercase tracking-wide font-mono">Neural Upscaling</h5>
              </div>
              <p className="text-[#e8d5b7]/70 text-xs font-light leading-relaxed">
                Every frame was processed through a custom enhancement pipeline to ensure 8K clarity and "hyper-real" textures.
              </p>
            </div>
          </div>
        </div>

        {/* Hybrid Workflow Stack */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono flex items-center gap-1.5">
            <Film className="w-4 h-4 text-jelly" />
            <span>Hybrid Production Workflow</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techStack.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-cream/40 border border-line/50 rounded-2xl p-4 hover:border-jelly-mid/25 transition-colors"
              >
                <span className="mt-0.5 h-5 w-5 rounded-full bg-jelly text-ink flex items-center justify-center text-[9px] font-black flex-shrink-0 font-mono">
                  {idx + 1}
                </span>
                <div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-wider font-mono">{step.phase}</div>
                  <div className="text-xs font-semibold text-ink mt-0.5">{step.tool}</div>
                  <p className="text-[11px] text-muted font-light leading-relaxed mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 04: Key Visual Highlights ─────────────────────────── */}
      {project.styleframes && project.styleframes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">04</span>
            <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
              Key Visual Highlights
            </h2>
          </div>
          <p className="text-muted text-sm font-light leading-relaxed font-sans">
            Actual production frames from the Filbey commercial — every shot storyboarded, synthesized, and graded in-house at Jellycut Studio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.styleframes.map((frame, idx) => (
              <div
                key={idx}
                onClick={() => onZoomIndex && onZoomIndex(idx)}
                className="group flex flex-col bg-[#0f0c08] border border-[#2a1f0f] rounded-3xl overflow-hidden cursor-zoom-in hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={frame.url}
                    alt={frame.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5" /> Zoom
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-center space-y-1">
                  <h4 className="text-[11px] font-bold text-[#F5A623] uppercase tracking-wide font-mono">{frame.title}</h4>
                  <p className="text-[11px] font-light text-[#e8d5b7]/70 leading-relaxed">{frame.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Storyboard Section ──────────────────────────────────────────── */}
      {project.storyboard && (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-jelly" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted font-mono">Production Storyboard</h3>
          </div>
          <p className="text-muted text-sm font-light leading-relaxed">
            All 10 frames of the final Filbey commercial — storyboarded before production, shot-by-shot.
          </p>
          <div
            onClick={() => onZoomIndex && onZoomIndex(0)}
            className="group relative rounded-3xl overflow-hidden border border-line cursor-zoom-in shadow-md bg-cream/30 aspect-[16/9]"
          >
            <img
              src={project.storyboard}
              alt="Filbey Commercial Storyboard — All 10 Frames"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="bg-white/90 group-hover:bg-white text-ink rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider font-mono shadow-md flex items-center gap-1.5 transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Storyboard</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Section 05: Creative Credits ──────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">05</span>
          <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
            Creative Credits
          </h2>
        </div>
        <div className="bg-cream/35 border border-line/45 rounded-3xl p-6 md:p-8">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {[
              { label: 'Client', value: 'Filbey' },
              { label: 'Studio', value: 'Jellycut Studio' },
              { label: 'Creative Direction', value: 'Salman Abu' },
              { label: 'AI Technical Lead', value: 'Thufail Zaman' },
              { label: 'Sound Design', value: 'Anas' },
              { label: 'Duration', value: '12 Seconds' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <dt className="text-[10px] font-bold uppercase tracking-widest text-muted font-mono">{item.label}</dt>
                <dd className="text-sm font-semibold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Section 06: The Final Result (Video Embed) ────────────────── */}
      {project.youtubeId && (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">06</span>
            <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight">
              The Final Result
            </h2>
          </div>
          <p className="text-muted text-sm font-light leading-relaxed">
            The complete 20-second campaign — a full "sensory assault" born from Neural Motion Synthesis.
          </p>
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-[#2a1f0f] shadow-2xl shadow-black/30 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&rel=0&color=white&modestbranding=1`}
              title="Filbey – The Neural Crunch"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <div className="border-t border-line/50 pt-12 pb-4">
        <div className="bg-[#0f0c08] text-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/30 space-y-6 text-center relative overflow-hidden">
          {/* Ambient ember glows */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#F5A623]/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#F5A623]/5 blur-3xl pointer-events-none" />

          <Sparkles className="w-8 h-8 text-[#F5A623] mx-auto animate-pulse relative z-10" />

          <div className="space-y-3 max-w-xl mx-auto relative z-10">
            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-tight">
              Ready to Elevate Your Brand?
            </h3>
            <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
              Jellycut Studio specializes in high-fidelity AI production and cinematic motion design.
              Let's build the future of your visual identity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2 relative z-10">
            <button
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
              className="bg-[#F5A623] hover:bg-[#F5A623]/90 hover:scale-[1.02] text-[#0f0c08] rounded-full px-8 py-4 text-xs font-black tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F5A623]/25 uppercase"
            >
              <span>Work With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
