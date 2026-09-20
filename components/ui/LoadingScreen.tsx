"use client";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // The number element ref — used to measure its rendered width
  // so we can offset it and prevent viewport clipping at 100%
  const numberRef = useRef<HTMLDivElement>(null);

  // Raw motion value for the X position (pixels)
  const rawX = useMotionValue(0);
  // Spring-smooth the X for buttery movement
  const smoothX = useSpring(rawX, { stiffness: 40, damping: 20, mass: 0.8 });

  // Recalculate X whenever progress changes
  useEffect(() => {
    const el = numberRef.current;
    const elWidth = el ? el.offsetWidth : 120; // fallback
    const vw = window.innerWidth;
    const padding = 32; // 8px * 4 = matching bottom-8 on mobile, we use 32px each side
    const travelWidth = vw - elWidth - padding * 2;
    const newX = (progress / 100) * travelWidth;
    rawX.set(newX);
  }, [progress, rawX]);

  useEffect(() => {
    let current = 0;
    const target = 100;

    const tick = () => {
      const remaining = target - current;
      const increment = Math.max(0.5, remaining * 0.04 + Math.random() * 2);
      current = Math.min(target, current + increment);
      setProgress(Math.floor(current));

      if (current < target) {
        setTimeout(tick, 40 + Math.random() * 60);
      } else {
        setTimeout(() => setLoading(false), 600);
      }
    };

    setTimeout(tick, 100);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: "var(--bg-primary, #f8f5f0)" }}
        >
          {/* Top-left: Welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute top-8 left-8 md:top-12 md:left-12"
          >
            <p className="text-[16px] md:text-[20px] font-black uppercase tracking-[0.18em] text-[var(--text-primary,#1a1a1a)]">
              Welcome to
            </p>
          </motion.div>

          {/* Top-right: Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute top-8 right-8 md:top-12 md:right-12 text-right"
          >
            <p className="text-[16px] md:text-[20px] font-black uppercase tracking-[0.18em] text-[var(--text-primary,#1a1a1a)]">
              Nithishkumar
            </p>
          </motion.div>

          {/* Center: "Portfolio" in giant serif italic */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-serif italic tracking-tighter text-[var(--text-primary,#1a1a1a)] select-none leading-none"
            >
              Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="mt-4 text-[10px] md:text-xs font-bold tracking-widest text-[var(--text-primary,#1a1a1a)] opacity-60 uppercase text-center px-4"
            >
              For a better experience, view on a Laptop/PC or in Landscape mode
            </motion.p>
          </div>

          {/* Bottom: Travelling progress number — moves left → right with progress */}
          <motion.div
            ref={numberRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              x: smoothX,
              position: "absolute",
              bottom: "32px",
              left: "32px",
              willChange: "transform",
            }}
            className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black font-sans tracking-tighter leading-none text-[var(--text-primary,#1a1a1a)] tabular-nums select-none whitespace-nowrap"
          >
            {String(progress).padStart(2, "0")}
          </motion.div>

          {/* Bottom-right: Thin horizontal loading bar */}
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex items-center gap-4">
            <div
              className="w-32 md:w-56 h-[2px] relative overflow-hidden"
              style={{ background: "rgba(0,0,0,0.1)" }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-[var(--text-primary,#1a1a1a)]"
                style={{ width: `${progress}%`, transition: "width 0.15s ease" }}
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary,#1a1a1a)]">
              Loading
            </span>
          </div>

          {/* Thin bottom border that fills left-to-right */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "rgba(0,0,0,0.05)" }}>
            <motion.div
              className="h-full bg-[var(--text-primary,#1a1a1a)]"
              style={{ width: `${progress}%`, transition: "width 0.15s ease" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
