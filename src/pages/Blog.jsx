import { motion } from 'framer-motion';
import { Calendar, Clock, Globe, ArrowRight, BookOpen } from 'lucide-react';
import { posts } from '../data/posts';

const ease = [0.16, 1, 0.3, 1];

export default function Blog({ setRoute }) {
  return (
    <section className="relative min-h-screen bg-paper text-ink pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-jelly/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Blog Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-cream border border-line text-jelly-deep px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider font-mono shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Insights &amp; Strategy</span>
          </div>
          <h1 id="blog-title" className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] font-normal tracking-tight">
            Creative Engineering Blog
          </h1>
          <p className="text-muted text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto font-sans">
            Deep-dives into AI video ads, CGI product rendering, local direct-response UGC, and high-performance brand engineering.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {posts.map((post, idx) => {
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease }}
                className="group flex flex-col bg-white border border-line rounded-[28px] overflow-hidden hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5 border-b border-line/45">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
                  
                  {/* Region Pill */}
                  <div className="absolute top-4 left-4 bg-ink/90 text-white border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider font-mono backdrop-blur-sm flex items-center gap-1">
                    <Globe className="w-3 h-3 text-jelly" />
                    <span>{post.region}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    {/* Meta Row */}
                    <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-muted font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl text-ink font-normal leading-snug group-hover:text-jelly-deep transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-muted text-xs font-light leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Read More button */}
                  <button
                    id={`read-post-${post.slug}`}
                    onClick={() => setRoute(`/blog/${post.slug}`)}
                    className="w-full bg-cream hover:bg-jelly/20 hover:text-ink text-jelly-deep font-semibold py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-line/55 group-hover:border-jelly/20"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
