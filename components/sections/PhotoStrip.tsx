"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";

import { LiquidGlassText } from "@/components/ui/LiquidGlassText";

const photoPools = [
  ['/gallery/49.jpg', '/gallery/1.jpg',  '/gallery/11.jpg', '/gallery/20.JPG', '/gallery/33.webp', '/gallery/61.JPG'],
  ['/gallery/29.jpg', '/gallery/2.jpg',  '/gallery/22.jpg', '/gallery/26.JPG', '/gallery/36.webp', '/gallery/62.JPG'],
  ['/gallery/63.JPG', '/gallery/3.JPG',  '/gallery/24.jpg', '/gallery/27.JPG', '/gallery/42.webp', '/gallery/65.jpg'],
  ['/gallery/54.jpg', '/gallery/4.jpg',  '/gallery/25.jpg', '/gallery/28.jpg', '/gallery/43.webp', '/gallery/66.jpg'],
  ['/gallery/62.JPG', '/gallery/5.png',  '/gallery/30.jpg', '/gallery/34.jpg', '/gallery/46.webp', '/gallery/67.jpg'],
];

export default function PhotoStrip() {
  const { isMobile } = useBreakpoint();
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndices, setActiveIndices] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndices((prev) =>
        prev.map((idx, ci) => (idx + 1) % photoPools[ci].length)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateClockwise     = useTransform(scrollYProgress, [0, 1], [0,  360]);
  const rotateAntiClockwise = useTransform(scrollYProgress, [0, 1], [0, -360]);

  const photoSize = isMobile ? 170 : 260;

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] overflow-hidden"
      style={{ padding: isMobile ? "80px 0 100px" : "clamp(80px, 12vw, 140px) 0" }}
    >
      {/* ── Centered Editorial Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center px-6"
        style={{ marginBottom: isMobile ? "56px" : "clamp(56px, 8vw, 100px)" }}
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="metadata text-[var(--text-muted)] block"
          style={{ marginBottom: "clamp(20px, 3vw, 32px)", letterSpacing: "0.2em" }}
        >
          VISUAL WORKS
        </motion.span>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-heading font-bold uppercase tracking-tighter text-[var(--text-primary)] leading-none"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", marginBottom: "clamp(16px, 2vw, 24px)", position: "relative", zIndex: 10 }}
        >
          <LiquidGlassText text="Watch My Stuff" />
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="font-serif italic text-[var(--text-secondary)]"
          style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
        >
          Curated Captures · Auto-cycling · Scroll-reactive
        </motion.p>
      </motion.div>

      {/* ── 5 Rotating Photo Circles ── */}
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="flex flex-row justify-center items-center flex-wrap xl:flex-nowrap"
          style={{ gap: isMobile ? "20px" : "clamp(20px, 3vw, 48px)" }}
        >
          {photoPools.map((pool, idx) => {
            const rotation = idx % 2 === 0 ? rotateClockwise : rotateAntiClockwise;
            const currentSrc = pool[activeIndices[idx]];

            return (
              <motion.div
                key={idx}
                style={{
                  position: "relative",
                  width: `${photoSize}px`,
                  height: `${photoSize}px`,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  border: "2px solid var(--border-subtle)",
                  rotate: rotation,
                }}
                whileHover={{
                  filter: "grayscale(0%)",
                  scale: 1.06,
                  borderColor: "var(--text-primary)",
                  transition: { duration: 0.35 },
                }}
                initial={{ filter: "grayscale(100%)" }}
                animate={{ filter: "grayscale(100%)" }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentSrc}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentSrc}
                      alt={`Visual capture ${idx + 1}`}
                      fill
                      sizes={`${photoSize}px`}
                      style={{ objectFit: "cover" }}
                      priority={idx < 3}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
