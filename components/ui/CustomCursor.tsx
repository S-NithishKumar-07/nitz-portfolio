"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24);
      cursorY.set(e.clientY - 24);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };
    
    // Check if device supports hover
    const isHoverableDevice = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isHoverableDevice) {
      window.addEventListener("mousemove", moveCursor);
    }
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Liquid Glass Orb */}
      <motion.div
        className="hidden md:block"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "48px",
          height: "48px",
          x: cursorXSpring,
          y: cursorYSpring,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px) invert(15%)",
          WebkitBackdropFilter: "blur(12px) invert(15%)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.1)",
        }}
      />
      {/* Sharp Inner Dot */}
      <motion.div
        className="hidden md:block"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "8px",
          height: "8px",
          x: dotX,
          y: dotY,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
          background: "#ffffff",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
