"use client";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { personalInfo } from "@/lib/data";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  // Scroll-driven horizontal parallax — alternating left / right
  const rawX1 = useTransform(scrollY, [0, 600], [0,  80]);  // right
  const rawX2 = useTransform(scrollY, [0, 600], [0, -80]);  // left
  const rawX3 = useTransform(scrollY, [0, 600], [0,  80]);  // right
  const rawX4 = useTransform(scrollY, [0, 600], [0, -80]);  // left
  const rawX5 = useTransform(scrollY, [0, 600], [0,  80]);  // right

  const x1 = useSpring(rawX1, { stiffness: 60, damping: 20 });
  const x2 = useSpring(rawX2, { stiffness: 60, damping: 20 });
  const x3 = useSpring(rawX3, { stiffness: 60, damping: 20 });
  const x4 = useSpring(rawX4, { stiffness: 60, damping: 20 });
  const x5 = useSpring(rawX5, { stiffness: 60, damping: 20 });

  const roleLines = [
    { text: "Full Stack Engineer",    x: x1 },
    { text: "Photographer & Film",    x: x2 },
    { text: "Visual Storyteller",     x: x3 },
    { text: "Software Developer",     x: x4 },
    { text: "Digital Marketing",      x: x5 },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
      <div className="e-container w-full h-full flex flex-col justify-center">
        <div className="e-grid-12 items-center w-full">
          
          {/* Left Column: Text (Spans 7 cols on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y, opacity }}
            className="col-span-12 lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            {/* Section label */}
            <motion.span variants={itemVariants} className="metadata mb-8">
              MERN STACK & VISUAL ARTIST
            </motion.span>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="heading-primary mb-12"
              style={{ color: "var(--text-primary)" }}
            >
              {personalInfo.name}
              <span style={{ color: "var(--text-muted)" }}>.</span>
            </motion.h1>

            {/* Stacked Roles — scroll-parallax bands */}
            <motion.div variants={itemVariants} className="flex flex-col gap-0 mb-12 w-full overflow-hidden border-t border-[var(--border-subtle)]">
              {roleLines.map(({ text, x }, idx) => (
                <motion.p
                  key={text}
                  style={{ x }}
                  className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-4 pt-4 pr-12 whitespace-nowrap"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors"
              >
                VIEW PROJECTS <ArrowRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-full text-xs font-bold uppercase tracking-widest hover:border-[var(--text-primary)] transition-colors"
              >
                HIRE ME
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image (Spans 5 cols on desktop) */}
          <div className="col-span-12 lg:col-span-5 flex items-center justify-center lg:justify-end relative mt-16 lg:mt-0">
            
            {/* Rotating text ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -left-12 w-32 h-32 hidden lg:flex items-center justify-center z-20 pointer-events-none"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="textPath"
                  d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text fontSize="8.5" fontWeight="700" fill="var(--text-primary)" letterSpacing="2">
                  <textPath href="#textPath" startOffset="0%">
                    FEATURED WORK • FEATURED WORK • 
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Hero Portrait Card (Editorial flat border style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
              className="relative w-full max-w-[360px] lg:max-w-[420px] aspect-[3/4] border-8 border-white bg-white shadow-xl z-10"
            >
              <div className="relative w-full h-full bg-[var(--bg-secondary)] overflow-hidden">
                <Image
                  src="/hero.jpg"
                  alt="Nithishkumar Portrait"
                  fill
                  priority
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 1024px) 80vw, 33vw"
                />
              </div>
            </motion.div>

            {/* Arrow indicator */}
            <div className="absolute -bottom-16 right-0 hidden lg:block">
              <span className="metadata block mb-3 text-right">SCROLL</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex justify-end"
              >
                <ArrowDown size={20} className="text-[var(--text-primary)]" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
