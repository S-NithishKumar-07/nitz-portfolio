"use client";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Experience() {
  const { isMobile } = useBreakpoint();

  return (
    <section id="experience" className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] pt-32 pb-24 md:pt-[140px] md:pb-[100px]">
      <div className="e-container">
        
        {/* Editorial Header */}
        <div className="e-grid-12 items-end mb-24 md:mb-32 border-b border-[var(--border-subtle)] pb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-6 text-4xl sm:text-5xl font-heading font-bold uppercase tracking-tighter text-[var(--text-primary)]"
          >
            My Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 md:col-span-6 text-sm text-[var(--text-secondary)] font-serif italic md:text-right mt-4 md:mt-0"
          >
            Internships, part-time roles &amp; freelance work that shaped my skills
          </motion.p>
        </div>

        {/* Experience — Table rows */}
        <div className="flex flex-col border-t border-[var(--border-subtle)]">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="e-grid-12 py-14 md:py-[80px] border-b border-[var(--border-subtle)] items-start group hover:bg-[rgba(0,0,0,0.015)] transition-colors"
            >
              {/* Left: Index + Duration + Location (3 cols) */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                <span className="metadata text-[var(--text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="metadata text-[var(--text-primary)] mt-1">
                  {exp.duration}
                </span>
                <span className="metadata text-[var(--text-secondary)]">
                  {exp.location}
                </span>
              </div>

              {/* Middle: Role & Details (7 cols) */}
              <div className="col-span-12 md:col-span-6 lg:col-span-8 mt-8 md:mt-0">
                <div className="flex flex-col gap-3 mb-10">
                  <h3 className="text-3xl lg:text-4xl font-serif italic text-[var(--text-primary)] leading-tight">
                    {exp.role}
                  </h3>
                  <p className="metadata text-[var(--text-primary)] mt-1">
                    {exp.company}
                  </p>
                </div>

                <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl">
                  {exp.description}
                </p>

                <div className="flex flex-col gap-5">
                  {exp.highlights.map((h, j) => (
                    <p key={j} className="text-sm text-[var(--text-muted)] leading-relaxed flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0">—</span>
                      <span>{h}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Right: Pill (2 cols) */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 flex justify-start md:justify-end mt-6 md:mt-0">
                <span className="metadata border border-[var(--border-subtle)] px-4 py-2 rounded-full text-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-colors">
                  {exp.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
