"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Images } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

// 5 curated pools of images for each circle to cycle through automatically
const photoPools = [
  ['/gallery/49.jpg', '/gallery/1.jpg', '/gallery/11.jpg', '/gallery/20.JPG', '/gallery/33.webp', '/gallery/61.JPG'],
  ['/gallery/29.jpg', '/gallery/2.jpg', '/gallery/22.jpg', '/gallery/26.JPG', '/gallery/36.webp', '/gallery/62.JPG'],
  ['/gallery/63.JPG', '/gallery/3.JPG', '/gallery/24.jpg', '/gallery/27.JPG', '/gallery/42.webp', '/gallery/65.jpg'],
  ['/gallery/54.jpg', '/gallery/4.jpg', '/gallery/25.jpg', '/gallery/28.jpg', '/gallery/43.webp', '/gallery/66.jpg'],
  ['/gallery/62.JPG', '/gallery/5.png', '/gallery/30.jpg', '/gallery/34.jpg', '/gallery/46.webp', '/gallery/67.jpg'],
];

export default function PhotoStrip() {
  const { isMobile } = useBreakpoint();
  const containerRef = useRef<HTMLElement>(null);

  // Track active photo index for each of the 5 circles
  const [activeIndices, setActiveIndices] = useState([0, 0, 0, 0, 0]);

  // Automatically cycle photos in the circles
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndices((prev) =>
        prev.map((idx, circleIdx) => (idx + 1) % photoPools[circleIdx].length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Hook into scroll position of page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress (0 to 1) to rotation degrees (0 to 360)
  const rotateClockwise = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateAntiClockwise = useTransform(scrollYProgress, [0, 1], [0, -360]);

  // Bigger size filled inside circle
  const photoSize = isMobile ? 180 : 270;

  return (
    <section
      id="gallery"
      ref={containerRef}
      style={{
        background: "transparent",
        padding: isMobile ? "80px 0" : "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)" }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: isMobile ? "50px" : "80px", padding: "0 20px" }}
      >
        <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
          <Images size={12} /> Visual Works
        </span>
        <h2 style={{ fontSize: isMobile ? "2.2rem" : "clamp(2.5rem,5vw,3.5rem)", fontWeight: 900, color: "var(--text-primary)", margin: 0 }}>
          Watch My{" "}
          <span className="gradient-text-cyan">Stuff</span>
        </h2>
        <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)" }}>
          Curated Captures · Auto-cycling · Scroll-reactive
        </p>
      </motion.div>

      {/* 5 Big Circles Row */}
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="flex flex-row justify-center gap-6 md:gap-8 lg:gap-10 items-center flex-wrap xl:flex-nowrap">
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
                  border: "3px solid var(--text-primary)",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
                  filter: "grayscale(100%)",
                  rotate: rotation,
                }}
                whileHover={{
                  filter: "grayscale(0%)",
                  scale: 1.08,
                  borderColor: "var(--accent-blue)",
                  transition: { duration: 0.3 }
                }}
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

      {/* Bottom line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }} />
    </section>
  );
}
