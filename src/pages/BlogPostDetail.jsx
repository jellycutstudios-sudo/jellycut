import { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Globe, User, Sparkles, ArrowRight } from 'lucide-react';

export default function BlogPostDetail({ post, setRoute, setIsModalOpen }) {
  
  // Scroll to top and inject JSON-LD schema on mount
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!post) return;

    // Create JSON-LD schema object
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.summary,
      "image": `https://www.jellycutstudio.com${post.image}`,
      "datePublished": new Date(post.date).toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "Jellycut Studios",
        "url": "https://www.jellycutstudio.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Jellycut Studios",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.jellycutstudio.com/logo.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.jellycutstudio.com/blog/${post.slug}`
      }
    };

    // Inject script tag
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', 'jsonld-blogpost');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      // Remove script tag on unmount
      const existingScript = document.getElementById('jsonld-blogpost');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [post]);

  if (!post) return null;

  return (
    <section className="relative min-h-screen bg-paper text-ink pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-jelly/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        
        {/* Back Link */}
        <button
          onClick={() => setRoute('/blog')}
          className="group inline-flex items-center gap-2 text-xs font-semibold text-jelly-deep hover:text-ink transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </button>

        {/* Article Meta Headers */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-wrap gap-2">
            <span className="bg-cream border border-line text-jelly-deep px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider font-mono shadow-sm flex items-center gap-1">
              <Globe className="w-3 h-3 text-jelly" />
              <span>{post.region}</span>
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="bg-white border border-line/65 text-muted px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider font-mono">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.15] font-normal tracking-tight">
            {post.title}
          </h1>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line/65 py-4 text-xs font-semibold uppercase tracking-wider text-muted font-mono">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-jelly" />
              By {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-jelly" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-jelly" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/9] w-full rounded-[32px] overflow-hidden border border-line shadow-lg mb-12 bg-black/5">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-ink font-light leading-relaxed font-sans space-y-8">
          {post.content.map((block, idx) => {
            if (block.type === 'h2') {
              return (
                <h2 key={idx} className="font-serif text-2xl md:text-3xl text-ink leading-snug font-normal tracking-tight pt-4 border-t border-line/45 first:border-0 first:pt-0">
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'h3') {
              return (
                <h3 key={idx} className="font-serif text-xl md:text-2xl text-ink leading-snug font-normal tracking-tight pt-2">
                  {block.text}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-base md:text-lg font-light leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </article>

        {/* Lead Gen Box / CTA */}
        <div className="border-t border-line pt-16 mt-16 pb-4">
          <div className="bg-ink text-white rounded-3xl p-8 md:p-10 shadow-xl space-y-6 text-center relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-jelly/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-jelly/5 rounded-full blur-3xl -z-10" />
            
            <Sparkles className="w-8 h-8 text-jelly mx-auto animate-pulse" />
            
            <div className="space-y-3 max-w-xl mx-auto">
              <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-tight">
                Want to double your ad retention &amp; ROI?
              </h3>
              <p className="text-white/70 text-sm md:text-base font-light">
                Jellycut Studios blends creative intelligence with high-fidelity CGI and AI code to deliver assets that scale brands globally in 48-72 hours.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-jelly hover:bg-jelly/90 hover:scale-[1.02] text-ink rounded-full px-8 py-4 text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-jelly/25"
              >
                <span>Start Your Project Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
