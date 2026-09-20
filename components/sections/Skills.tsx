"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";
import { skills } from "@/lib/data";

const TECH_SKILLS = skills.filter((s) => s.category !== "Languages");

const LANGUAGES = [
  { name: "Tamil",     level: 100, label: "Native" },
  { name: "English",  level: 95,  label: "Fluent"  },
  { name: "Malayalam",level: 80,  label: "Fluent"  },
];

/* ─── Infinite Horizontal Marquee ─── */
function SkillMarquee({ items }: { items: { name: string; level: number }[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const targetSpeed = isHovered ? 1.8 : 0.6;
  const currentSpeed = useRef(0.6);
  const baseX = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Pad the list so the duplicate pair is always wider than the viewport
  const filledItems = useMemo(() => {
    let arr = [...items];
    while (arr.length < 12) arr = [...arr, ...items];
    return arr;
  }, [items]);

  useAnimationFrame((_t, delta) => {
    currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.05;
    const moveBy = -50 * currentSpeed.current * (delta / 1000);

    if (contentRef.current && !isDragging.current) {
      const half = (contentRef.current.children[0] as HTMLElement)?.clientWidth ?? 0;
      let x = baseX.get() + moveBy;
      if (x <= -half) x += half;
      else if (x > 0) x -= half;
      baseX.set(x);
    }
  });

  return (
    <div
      className="relative flex overflow-hidden w-full cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setHoveredSkill(null); }}
    >
      <motion.div
        style={{ x: baseX }}
        ref={contentRef}
        className="flex"
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }}
        onDragStart={() => { isDragging.current = true; setHoveredSkill(null); }}
        onDragEnd={() => { isDragging.current = false; }}
        dragElastic={0}
      >
        {[0, 1].map((blockIdx) => (
          <div
            key={blockIdx}
            className="flex shrink-0"
            style={{ gap: "clamp(36px, 5vw, 80px)", paddingRight: "clamp(36px, 5vw, 80px)" }}
          >
            {filledItems.map((skill, idx) => {
              const uid = `${skill.name}-${blockIdx}-${idx}`;
              const isActive = hoveredSkill === uid;
              const anyHovered = hoveredSkill !== null && !isDragging.current;
              return (
                <div
                  key={uid}
                  className="flex flex-col shrink-0 select-none"
                  style={{
                    gap: "6px",
                    opacity: anyHovered ? (isActive ? 1 : 0.28) : 1,
                    transform: isActive ? "scale(1.06)" : "scale(1)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                  }}
                  onMouseEnter={() => !isDragging.current && setHoveredSkill(uid)}
                >
                  <span
                    className="whitespace-nowrap font-heading tracking-tight leading-none"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      transition: "color 0.35s ease, font-weight 0.35s ease",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="whitespace-nowrap uppercase tracking-widest"
                    style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)" }}
                  >
                    {skill.level}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Language Row with Editorial Hover ─── */
function LanguageRow({ name, level, label, delay }: { name: string; level: number; label: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="e-grid-12 border-b border-[var(--border-subtle)] items-center"
      style={{ paddingTop: "clamp(24px, 3vw, 40px)", paddingBottom: "clamp(24px, 3vw, 40px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Name */}
      <div className="col-span-12 md:col-span-4">
        <motion.span
          className="block font-serif italic text-[var(--text-primary)]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          animate={{ x: hovered ? 8 : 0, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          {name}
        </motion.span>
      </div>

      {/* Bar + Label */}
      <div className="col-span-12 md:col-span-8 flex flex-col md:flex-row md:items-center gap-6 mt-6 md:mt-0">
        <div className="flex-1 h-[1px] bg-[var(--border-subtle)] relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-[var(--text-primary)]"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay, ease: "easeOut" }}
          />
          {/* Hover shimmer */}
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent)", width: "60%" }}
            animate={{ x: hovered ? "200%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <motion.span
          className="metadata min-w-[80px] text-right"
          animate={{ opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.35 }}
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ─── Main Export ─── */
export default function Skills() {
  return (
    <>
      {/* ═══ SKILLS & TECH ═══ */}
      <section
        id="skills"
        className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]"
        style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(80px, 12vw, 140px)" }}
      >
        <div className="e-container">
          <div className="e-grid-12 items-start" style={{ gap: "clamp(32px, 4vw, 64px)" }}>

            {/* LEFT — sticky editorial header */}
            <div className="col-span-12 xl:col-span-4 flex flex-col xl:sticky xl:top-40">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="heading-primary text-left"
                style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}
              >
                Skills &amp; Tech
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border-t border-[var(--border-subtle)]"
                style={{ paddingTop: "clamp(24px, 3vw, 40px)" }}
              >
                <p
                  className="font-serif italic text-[var(--text-primary)] leading-relaxed"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", maxWidth: "22rem" }}
                >
                  A blend of technical proficiency and creative excellence
                </p>
              </motion.div>
            </div>

            {/* RIGHT — scrolling category rows */}
            <div className="col-span-12 xl:col-span-8 flex flex-col border-t border-[var(--border-subtle)] xl:border-t-0">
              {TECH_SKILLS.map((cat, i) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col lg:flex-row items-start lg:items-center border-b border-[var(--border-subtle)] overflow-hidden"
                  style={{
                    paddingTop: "clamp(20px, 2.5vw, 36px)",
                    paddingBottom: "clamp(20px, 2.5vw, 36px)",
                    minHeight: "clamp(80px, 10vw, 110px)",
                  }}
                >
                  {/* Fixed category label */}
                  <div
                    className="shrink-0 mb-4 lg:mb-0"
                    style={{ width: "clamp(120px, 14vw, 220px)", paddingRight: "16px" }}
                  >
                    <span className="metadata text-[var(--text-muted)]">{cat.category}</span>
                  </div>

                  {/* Marquee viewport — strictly clipped */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <SkillMarquee items={cat.items} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LANGUAGES ═══ */}
      <section
        id="languages"
        className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]"
        style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(80px, 12vw, 140px)" }}
      >
        <div className="e-container">
          {/* Header */}
          <div
            className="e-grid-12 items-end border-b border-[var(--border-subtle)]"
            style={{ marginBottom: "clamp(40px, 6vw, 80px)", paddingBottom: "clamp(24px, 3vw, 40px)" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-12 md:col-span-6 font-heading font-bold uppercase tracking-tighter text-[var(--text-primary)]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Languages
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 md:col-span-6 text-sm text-[var(--text-secondary)] font-serif italic md:text-right mt-4 md:mt-0"
            >
              Bridging cultures through communication
            </motion.p>
          </div>

          {/* Language rows */}
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {LANGUAGES.map((lang, i) => (
              <LanguageRow
                key={lang.name}
                name={lang.name}
                level={lang.level}
                label={lang.label}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
