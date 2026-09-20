"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface LiquidGlassTextProps {
  text: string;
  className?: string;
  containerClassName?: string;
}

const Letter = ({
  char,
  mouseX,
  mouseY,
}: {
  char: string;
  mouseX: any;
  mouseY: any;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  // Derive distance from mouse to this letter's center
  const distance = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) => {
      if (!ref.current || x === -1000 || y === -1000) return 1000;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      return Math.sqrt(dx * dx + dy * dy);
    }
  );

  // Transform based on distance
  // If mouse is close (e.g. < 80px), apply distortion
  const scale = useTransform(distance, [0, 60, 120], [1.15, 1.05, 1]);
  const y = useTransform(distance, [0, 60, 120], [-8, -2, 0]);
  
  // Blur effect for glass look
  const blurValue = useTransform(distance, [0, 30, 80], [2, 0, 0]);
  const blurStr = useTransform(blurValue, (v) => `blur(${v}px)`);

  // Opacity/Highlight effect
  const opacity = useTransform(distance, [0, 60, 120], [0.7, 0.85, 1]);

  return (
    <motion.span
      ref={ref}
      style={{
        display: "inline-block",
        scale,
        y,
        opacity,
        filter: blurStr,
        transformOrigin: "center center",
        position: "relative",
        willChange: "transform, filter, opacity"
      }}
      className="transition-none"
    >
      {char === " " ? "\u00A0" : char}
      
      {/* Subtle glass highlight overlay */}
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: useTransform(distance, [0, 50], [1, 0]),
          pointerEvents: "none",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </motion.span>
  );
};

export const LiquidGlassText: React.FC<LiquidGlassTextProps> = ({
  text,
  className = "",
  containerClassName = "",
}) => {
  const { isMobile } = useBreakpoint();
  
  // Track mouse position globally within the container
  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  
  // Smooth the mouse movement for the liquid feel
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const mouseX = useSpring(rawX, springConfig);
  const mouseY = useSpring(rawY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    // Move target far away so letters return to normal smoothly
    rawX.set(-1000);
    rawY.set(-1000);
  };

  if (isMobile) {
    return (
      <span className={`${className} ${containerClassName}`}>
        {text}
      </span>
    );
  }

  // Split into words then letters to preserve word wrapping
  const words = text.split(" ");

  return (
    <div
      className={`inline-flex flex-wrap ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex whitespace-nowrap">
          {word.split("").map((char, charIdx) => (
            <Letter
              key={`${wordIdx}-${charIdx}`}
              char={char}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
          {/* Add space after each word except the last */}
          {wordIdx < words.length - 1 && (
            <Letter char=" " mouseX={mouseX} mouseY={mouseY} />
          )}
        </span>
      ))}
    </div>
  );
};
