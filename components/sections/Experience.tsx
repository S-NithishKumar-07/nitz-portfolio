"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const easeCurve: [number, number, number, number] = [0.25, 1, 0.5, 1];

const contentVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto" as const,
    opacity: 1,
    transition: {
      height: { duration: 0.5, ease: easeCurve },
      opacity: { duration: 0.4, delay: 0.1, ease: easeCurve },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { duration: 0.2, ease: easeCurve },
      height: { duration: 0.5, delay: 0.05, ease: easeCurve },
    },
  },
};

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { isMobile } = useBreakpoint();

  const handleInteraction = useCallback(
    (index: number, action: "enter" | "leave" | "toggle") => {
      if (isMobile) {
        // Mobile: tap to toggle
        if (action === "toggle") {
          setExpandedIndex((prev) => (prev === index ? null : index));
        }
      } else {
        // Desktop: hover
        if (action === "enter") {
          setExpandedIndex(index);
        } else if (action === "leave") {
          setExpandedIndex(null);
        }
      }
    },
    [isMobile]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setExpandedIndex((prev) => (prev === index ? null : index));
      }
    },
    []
  );

  return (
    <section
      id="experience"
      className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] pt-32 pb-24 md:pt-[140px] md:pb-[100px]"
    >
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
            Internships, part-time roles &amp; freelance work that shaped my
            skills
          </motion.p>
        </div>

        {/* Experience — Accordion rows */}
        <div className="flex flex-col border-t border-[var(--border-subtle)]">
          {experience.map((exp, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`border-b border-[var(--border-subtle)] transition-colors duration-300 ${
                  isExpanded ? "bg-[rgba(0,0,0,0.015)]" : ""
                }`}
                onMouseEnter={() => handleInteraction(i, "enter")}
                onMouseLeave={() => handleInteraction(i, "leave")}
                onClick={() => handleInteraction(i, "toggle")}
                onKeyDown={(e) => handleKeyDown(e, i)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                style={{ cursor: "pointer" }}
              >
                {/* Collapsed row: Index | Role | Type */}
                <div className="e-grid-12 py-10 md:py-14 items-center">
                  {/* Left: Index */}
                  <div className="col-span-2 md:col-span-1">
                    <span className="metadata text-[var(--text-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Center: Role */}
                  <div className="col-span-7 md:col-span-9">
                    <h3 className="text-2xl lg:text-3xl font-serif italic text-[var(--text-primary)] leading-tight">
                      {exp.role}
                    </h3>
                  </div>

                  {/* Right: Type pill */}
                  <div className="col-span-3 md:col-span-2 flex justify-end">
                    <span
                      className={`metadata border px-4 py-2 rounded-full transition-colors duration-300 ${
                        isExpanded
                          ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                          : "border-[var(--border-subtle)] text-[var(--text-muted)]"
                      }`}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <div className="e-grid-12 pb-14 md:pb-[80px] items-start">
                        {/* Left spacer to align with content */}
                        <div className="col-span-2 md:col-span-1" />

                        {/* Details */}
                        <div className="col-span-10 md:col-span-9">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.15,
                              ease: "easeOut",
                            }}
                          >
                            {/* Duration + Location */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="metadata text-[var(--text-primary)]">
                                {exp.duration}
                              </span>
                              <span className="metadata text-[var(--text-muted)]">
                                ·
                              </span>
                              <span className="metadata text-[var(--text-muted)]">
                                {exp.location}
                              </span>
                            </div>

                            {/* Company */}
                            <p className="metadata text-[var(--text-primary)] mb-8">
                              {exp.company}
                            </p>

                            {/* Description */}
                            <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl">
                              {exp.description}
                            </p>

                            {/* Highlights */}
                            <div className="flex flex-col gap-5">
                              {exp.highlights.map((h, j) => (
                                <p
                                  key={j}
                                  className="text-sm text-[var(--text-muted)] leading-relaxed flex items-start gap-3"
                                >
                                  <span className="mt-1 flex-shrink-0">—</span>
                                  <span>{h}</span>
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        </div>

                        {/* Right spacer */}
                        <div className="col-span-0 md:col-span-2" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
