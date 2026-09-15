"use client";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Blog() {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section
      id="blog"
      className="relative bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]"
      style={{
        padding: isMobile ? "80px 0" : "120px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 flex items-center justify-center gap-2">
            <BookOpen size={11} /> WRITING
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-serif mb-4 text-[var(--text-primary)]">
            Blog &amp; <span className="italic font-normal">Articles</span>
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
            Thoughts on development, design, and visual storytelling
          </p>
        </motion.div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:border-[var(--text-primary)] transition-colors duration-300"
            >
              <div>
                {/* Top banner */}
                <div
                  className="h-28 w-full flex items-center justify-center text-4xl bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]"
                >
                  {post.icon}
                </div>

                {/* Card body */}
                <div className="p-6 md:p-8 flex flex-col">
                  {/* Category + date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{post.date}</span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-[var(--text-primary)] mb-3 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-secondary)]/30">
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </div>
                <button
                  className="flex items-center gap-1 text-xs font-bold text-[var(--text-primary)] hover:underline bg-none border-none cursor-pointer"
                  id={`blog-read-${post.id}`}
                >
                  READ MORE <ArrowRight size={12} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
