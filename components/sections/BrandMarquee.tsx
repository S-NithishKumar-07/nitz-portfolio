"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiNextdotjs } from "react-icons/si";
import { FaCamera, FaVideo, FaFilm, FaPalette, FaBookOpen } from "react-icons/fa";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const row1 = [
  { text: "REACT.JS", icon: SiReact },
  { text: "NODE.JS", icon: SiNodedotjs },
  { text: "MONGODB", icon: SiMongodb },
  { text: "EXPRESS.JS", icon: SiExpress },
  { text: "NEXT.JS", icon: SiNextdotjs },
];

const row2 = [
  { text: "PHOTOGRAPHY", icon: FaCamera },
  { text: "CINEMATOGRAPHY", icon: FaVideo },
  { text: "VIDEO EDITING", icon: FaFilm },
  { text: "COLOR GRADING", icon: FaPalette },
  { text: "STORYTELLING", icon: FaBookOpen },
];

export default function BrandMarquee() {
  const containerRef = useRef<HTMLElement>(null);
  const { isMobile } = useBreakpoint();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Slow moving scroll transformation
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-600, 0]);

  // For infinite seamless scrolling, we repeat the elements several times.
  const repeatedRow1 = [...row1, ...row1, ...row1, ...row1, ...row1];
  const repeatedRow2 = [...row2, ...row2, ...row2, ...row2, ...row2];

  return (
    <section ref={containerRef} className="py-12 md:py-24 bg-[var(--bg-primary)] overflow-hidden border-b border-[var(--border-subtle)] flex flex-col gap-12 md:gap-16">
      
      {/* Row 1 - Scrolling Left */}
      <div className="relative flex overflow-hidden w-[200vw] sm:w-[150vw] md:w-full">
        <motion.div style={{ x: x1 }} className="flex items-center">
          {repeatedRow1.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center px-6 md:px-12 gap-6 md:gap-12 whitespace-nowrap">
                <span className="text-5xl sm:text-7xl md:text-[6rem] font-serif italic tracking-tight text-[var(--text-primary)]">
                  {item.text}
                </span>
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-[var(--border-subtle)] flex items-center justify-center bg-[var(--bg-card)] flex-shrink-0 text-[var(--text-primary)]">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Row 2 - Scrolling Right */}
      <div className="relative flex overflow-hidden w-[200vw] sm:w-[150vw] md:w-full">
        <motion.div style={{ x: x2 }} className="flex items-center">
          {repeatedRow2.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center px-6 md:px-12 gap-6 md:gap-12 whitespace-nowrap">
                <span className="text-5xl sm:text-7xl md:text-[6rem] font-serif italic tracking-tight text-[var(--text-primary)]">
                  {item.text}
                </span>
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-[var(--border-subtle)] flex items-center justify-center bg-[var(--bg-card)] flex-shrink-0 text-[var(--text-primary)]">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      
    </section>
  );
}
