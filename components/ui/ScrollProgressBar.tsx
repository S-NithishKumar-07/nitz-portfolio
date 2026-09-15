"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #3b82f6, #6366f1, #0ea5e9)",
          transformOrigin: "0%",
          zIndex: 99999,
          boxShadow: "0 0 10px rgba(59,130,246,0.5), 0 0 20px rgba(99,102,241,0.3)",
        }}
      />
      {/* Glow dot at right edge */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          zIndex: 99999,
          scaleX,
          transformOrigin: "0%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#3b82f6",
          boxShadow: "0 0 12px #3b82f6, 0 0 24px #6366f1",
          marginTop: "2px",
          flexShrink: 0,
        }} />
      </motion.div>
    </>
  );
}
