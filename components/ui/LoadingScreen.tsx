"use client";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Animated counter that springs to target value
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => String(Math.floor(v)).padStart(2, "0"));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </motion.span>
  );
}

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth, realistic loading counter that eases at the end
    let current = 0;
    const target = 100;

    const tick = () => {
      // Slow down as it approaches 100
      const remaining = target - current;
      const increment = Math.max(0.5, remaining * 0.04 + Math.random() * 2);
      current = Math.min(target, current + increment);
      setProgress(Math.floor(current));

      if (current < target) {
        setTimeout(tick, 40 + Math.random() * 60);
      } else {
        // Hold at 100 briefly then exit
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
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-serif italic tracking-tighter text-[var(--text-primary,#1a1a1a)] select-none leading-none"
            >
              Portfolio
            </motion.h1>
          </div>

          {/* Bottom-left: Big animated counter number */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black font-sans tracking-tighter leading-none text-[var(--text-primary,#1a1a1a)] tabular-nums"
            >
              <AnimatedNumber value={progress} />
            </motion.div>
          </div>

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
