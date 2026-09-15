"use client";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { education } from "@/lib/data";

export default function Resume() {
  return (
    <section id="resume" className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] pt-32 pb-24 md:pt-[140px] md:pb-[100px]">
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
            Education
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 md:col-span-6 flex justify-start md:justify-end mt-6 md:mt-0"
          >
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] font-bold uppercase tracking-widest rounded-full hover:border-[var(--text-primary)] transition-all duration-300"
              id="resume-download"
            >
              <Download size={14} /> Download Resume
            </a>
          </motion.div>
        </div>

        {/* Education — table rows */}
        <div className="flex flex-col border-t border-[var(--border-subtle)]">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="e-grid-12 py-14 md:py-[80px] border-b border-[var(--border-subtle)] items-start group hover:bg-[rgba(0,0,0,0.015)] transition-colors"
            >
              {/* Left: Year (3 cols) */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2">
                <span className="metadata text-[var(--text-primary)]">
                  {edu.year}
                </span>
              </div>

              {/* Middle: Degree & Institution (7 cols) */}
              <div className="col-span-12 md:col-span-6 lg:col-span-8 mt-6 md:mt-0">
                <h3 className="text-2xl md:text-3xl font-serif italic text-[var(--text-primary)] leading-tight mb-4">
                  {edu.degree}
                </h3>
                <p className="metadata text-[var(--text-secondary)]">
                  {edu.institution}
                </p>
              </div>

              {/* Right: Grade (2 cols) */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 flex justify-start md:justify-end mt-4 md:mt-0">
                {edu.grade && (
                  <span className="metadata border border-[var(--border-subtle)] px-3 py-1.5 rounded-full text-[var(--text-primary)]">
                    {edu.grade}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
