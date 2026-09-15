"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

// Mock images since data.ts projects don't have images
const getMockImages = (id: number) => {
  const images = [
    ["/gallery/33.webp", "/gallery/36.webp", "/gallery/42.webp"],
    ["/gallery/43.webp", "/gallery/46.webp", "/gallery/48.webp"],
    ["/gallery/50.webp", "/gallery/64.png",  "/gallery/38.png"],
    ["/gallery/52.png",  "/gallery/7.png",   "/gallery/8.png"],
  ];
  return images[id % images.length];
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const { isMobile } = useBreakpoint();

  const nextProject = () => setActiveIndex((p) => (p + 1) % projects.length);
  const prevProject = () => setActiveIndex((p) => (p - 1 + projects.length) % projects.length);

  const images = getMockImages(activeProject.id);

  return (
    <section id="projects" className="relative min-h-[90vh] bg-[var(--bg-primary)] overflow-hidden flex items-center pt-32 pb-24 md:pt-[140px] md:pb-[120px] border-b border-[var(--border-subtle)]">
      <div className="e-container w-full relative z-10">
        
        {/* Navigation Button (Floating top right of section) */}
        <div className="absolute top-0 right-6 md:right-10 z-50 hidden xl:flex items-center gap-4">
          <button
            onClick={prevProject}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-[var(--border-subtle)] text-[11px] font-bold uppercase tracking-widest bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-300"
          >
            <ArrowLeft size={16} /> PREV
          </button>
          <button
            onClick={nextProject}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-[var(--border-subtle)] text-[11px] font-bold uppercase tracking-widest bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-300"
          >
            NEXT PROJECT <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="e-grid-12 items-center gap-y-20">
          {/* LEFT COLUMN: Editorial Typography & Metadata */}
          <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
            
            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeProject.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="heading-primary text-left mb-20"
                style={{ wordBreak: "keep-all", overflowWrap: "normal" }}
              >
                {activeProject.title}
              </motion.h2>
            </AnimatePresence>

            {/* Metadata Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${activeProject.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col gap-8 w-full max-w-lg border-t border-[var(--border-subtle)] pt-12"
              >
                {/* Year */}
                <div className="flex text-[11px] font-bold tracking-widest text-[var(--text-primary)] uppercase">
                  <span className="w-32 flex-shrink-0 text-[var(--text-muted)]">YEAR</span>
                  <span>{new Date().getFullYear()}</span>
                </div>
                
                {/* Category */}
                <div className="flex text-[11px] font-bold tracking-widest text-[var(--text-primary)] uppercase">
                  <span className="w-32 flex-shrink-0 text-[var(--text-muted)]">CATEGORY</span>
                  <span>{activeProject.category}</span>
                </div>
                
                {/* Disciplines / Tech */}
                <div className="flex text-[11px] font-bold tracking-widest text-[var(--text-primary)] uppercase">
                  <span className="w-32 flex-shrink-0 text-[var(--text-muted)]">TECH STACK</span>
                  <div className="flex flex-col gap-1">
                    {activeProject.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-10 border-t border-[var(--border-subtle)] pt-10">
                  <p className="text-xl md:text-2xl font-serif italic text-[var(--text-primary)] mb-6">Project</p>
                  <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div className="flex gap-8 mt-10">
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="metadata border-b border-[var(--text-primary)] pb-1 hover:text-[var(--text-primary)] transition-colors"
                  >
                    VIEW LIVE SITE
                  </a>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="metadata border-b border-[var(--text-primary)] pb-1 hover:text-[var(--text-primary)] transition-colors"
                  >
                    GITHUB REPO
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Editorial Collage */}
          <div className="col-span-12 xl:col-span-7 relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`collage-${activeProject.id}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Image 1 (Background left) */}
                <motion.div
                  className="absolute left-[10%] top-[15%] w-[35%] aspect-[3/4] bg-[var(--bg-secondary)] shadow-lg rounded-xl overflow-hidden z-10"
                  initial={{ rotate: -6, x: -30, y: 20 }}
                  animate={{ rotate: -4, x: 0, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                >
                  <Image src={images[0]} alt="Project 1" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 40vw, 25vw" priority />
                </motion.div>

                {/* Image 2 (Foreground Center) */}
                <motion.div
                  className="absolute left-[50%] top-[50%] w-[45%] aspect-[4/5] bg-[var(--bg-secondary)] shadow-2xl rounded-2xl z-30 overflow-hidden -translate-x-1/2 -translate-y-1/2 border border-[var(--border-subtle)]"
                  initial={{ y: "-40%" }}
                  animate={{ y: "-50%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Image src={images[1]} alt="Project main" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 35vw" priority />
                </motion.div>

                {/* Image 3 (Background right) */}
                <motion.div
                  className="absolute right-[10%] bottom-[15%] w-[35%] aspect-square bg-[var(--bg-secondary)] shadow-lg rounded-xl overflow-hidden z-20"
                  initial={{ rotate: 8, x: 30, y: -20 }}
                  animate={{ rotate: 6, x: 0, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                  <Image src={images[2]} alt="Project 3" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 40vw, 20vw" priority />
                </motion.div>

              </motion.div>
            </AnimatePresence>

            {/* Mobile Nav */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 flex xl:hidden items-center gap-4">
               <button onClick={prevProject} className="w-12 h-12 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] shadow-sm">
                <ArrowLeft size={18} />
               </button>
               <button onClick={nextProject} className="w-12 h-12 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] shadow-sm">
                <ArrowRight size={18} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
