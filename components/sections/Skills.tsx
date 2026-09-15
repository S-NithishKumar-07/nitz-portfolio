"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const TECH_SKILLS = skills.filter((s) => s.category !== "Languages");

const LANGUAGES = [
  { name: "Tamil",     level: 100, label: "Native" },
  { name: "English",   level: 100, label: "Native" },
  { name: "Malayalam", level: 80,  label: "Fluent" },
];

export default function Skills() {
  return (
    <>
      {/* ─── TECH SKILLS ─── */}
      <section id="skills" className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] pt-32 pb-24 md:pt-[120px] md:pb-[100px]">
        <div className="e-container">
          
          {/* Editorial Header */}
          <div className="e-grid-12 items-end mb-20 md:mb-28 border-b border-[var(--border-subtle)] pb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-12 md:col-span-6 text-4xl sm:text-5xl font-heading font-bold uppercase tracking-tighter text-[var(--text-primary)]"
            >
              Skills & Tech
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 md:col-span-6 text-sm text-[var(--text-secondary)] font-serif italic md:text-right mt-4 md:mt-0"
            >
              A blend of technical proficiency and creative excellence
            </motion.p>
          </div>

          {/* Skills — Table-style rows */}
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {TECH_SKILLS.map((category, catIdx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.06 }}
                className="e-grid-12 py-6 md:py-7 border-b border-[var(--border-subtle)] items-start group hover:bg-[rgba(0,0,0,0.02)] transition-colors"
              >
                {/* Category Label */}
                <div className="col-span-12 md:col-span-3 lg:col-span-2">
                  <span className="metadata text-[var(--text-primary)]">
                    {category.category}
                  </span>
                </div>

                {/* Skills Tags */}
                <div className="col-span-12 md:col-span-9 lg:col-span-10 flex flex-wrap gap-x-12 gap-y-8 mt-6 md:mt-0">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-2 md:gap-3">
                      <span className="text-lg md:text-xl font-heading font-medium tracking-tight text-[var(--text-primary)]">
                        {skill.name}
                      </span>
                      <span className="metadata text-[10px] text-[var(--text-muted)]">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LANGUAGES ─── */}
      <section id="languages" className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] pt-32 pb-24 md:pt-[120px] md:pb-[100px]">
        <div className="e-container">
          
          {/* Editorial Header */}
          <div className="e-grid-12 items-end mb-20 md:mb-28 border-b border-[var(--border-subtle)] pb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-12 md:col-span-6 text-4xl sm:text-5xl font-heading font-bold uppercase tracking-tighter text-[var(--text-primary)]"
            >
              Languages
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 md:col-span-6 text-sm text-[var(--text-secondary)] font-serif italic md:text-right mt-4 md:mt-0"
            >
              Bridging cultures through communication
            </motion.p>
          </div>

          {/* Language rows */}
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {LANGUAGES.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="e-grid-12 py-6 md:py-8 border-b border-[var(--border-subtle)] items-center group"
              >
                {/* Language Name */}
                <div className="col-span-12 md:col-span-4">
                  <span className="text-4xl md:text-5xl font-serif italic text-[var(--text-primary)]">
                    {lang.name}
                  </span>
                </div>

                {/* Level Bar & Label */}
                <div className="col-span-12 md:col-span-8 flex flex-col md:flex-row md:items-center gap-8 mt-8 md:mt-0">
                  <div className="flex-1 h-[1px] bg-[var(--border-subtle)] relative overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-[var(--text-primary)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="metadata text-[var(--text-primary)] text-right min-w-[80px]">
                    {lang.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
