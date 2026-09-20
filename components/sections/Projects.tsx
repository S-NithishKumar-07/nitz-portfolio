"use client";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";

// Type augmentation for our project data shape
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  year?: string;
  tech: string[];
  github?: string;
  live?: string;
  displayLabel?: string;
  portfolioLinks?: { label: string; url: string }[];
  company?: string;
}

export default function Projects() {
  const typedProjects = projects as Project[];

  return (
    <section
      id="projects"
      className="relative min-h-[90vh] bg-[var(--bg-primary)] overflow-hidden flex items-center pt-32 pb-24 md:pt-[140px] md:pb-[120px] border-b border-[var(--border-subtle)]"
    >
      <div className="e-container w-full relative z-10">
        <div className="e-grid-12 items-start gap-y-20">
          {/* LEFT COLUMN: Editorial Section Header */}
          <div className="col-span-12 xl:col-span-5 flex flex-col justify-center xl:sticky xl:top-40">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="heading-primary text-left mb-10"
            >
              Projects
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-t border-[var(--border-subtle)] pt-10"
            >
              <p className="text-xl md:text-2xl font-serif italic text-[var(--text-primary)] mb-6">
                Selected Work
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md">
                A curated collection of development projects — from full-stack
                web applications and machine learning to freelance client work
                and mobile apps.
              </p>

              <div className="flex items-center gap-3 mt-12">
                <span className="metadata text-[var(--text-muted)]">
                  {String(typedProjects.length).padStart(2, "0")} Projects
                </span>
                <span className="w-12 h-px bg-[var(--border-subtle)]" />
                <span className="metadata text-[var(--text-muted)]">
                  2024 — Present
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Vertical Project List */}
          <div className="col-span-12 xl:col-span-7">
            <div className="flex flex-col border-t border-[var(--border-subtle)]">
              {typedProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group border-b border-[var(--border-subtle)]"
                >
                  <div className="py-10 md:py-14 transition-transform duration-300 ease-out group-hover:translate-x-2">
                    {/* Index */}
                    <span className="metadata text-[var(--text-muted)] block mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-[var(--text-primary)] leading-tight mb-4">
                      {project.title}
                    </h3>

                    {/* Category / Display Label */}
                    <p className="metadata text-[var(--text-muted)] mb-2">
                      {project.displayLabel || project.category}
                    </p>

                    {/* Tech Stack */}
                    <p className="metadata text-[var(--text-secondary)] mb-1">
                      {project.tech.join(" / ")}
                    </p>

                    {/* Company (if present, no URL) */}
                    {project.company && (
                      <p className="metadata text-[var(--text-muted)] mt-2">
                        {project.company}
                      </p>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-6">
                      {/* GitHub link */}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="metadata border-b border-[var(--text-primary)] pb-1 text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors inline-flex items-center gap-2"
                        >
                          <span>
                            {project.live
                              ? "VIEW PROJECT"
                              : "VIEW GITHUB"}
                          </span>
                          <motion.span
                            className="inline-block"
                            initial={{ opacity: 0, x: -4 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            →
                          </motion.span>
                        </a>
                      )}

                      {/* Portfolio links (special case) */}
                      {project.portfolioLinks?.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="metadata border-b border-[var(--text-primary)] pb-1 text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors inline-flex items-center gap-2"
                        >
                          <span>{link.label.toUpperCase()}</span>
                          <motion.span
                            className="inline-block"
                            initial={{ opacity: 0, x: -4 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            →
                          </motion.span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
