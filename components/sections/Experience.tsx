"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="experience"
      style={{
        background: "var(--bg-0)",
        paddingTop: "var(--section-y)",
        paddingBottom: "clamp(60px,8vw,100px)", // reduced bottom padding to flow into Projects
        position: "relative",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="exp-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="t-label" style={{ 
              fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, 
              textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--grey-2)" 
            }}>Experience</span>
          </motion.div>
          
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}
              style={{ 
                fontFamily: "var(--font-heading)", fontWeight: 700, 
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em", 
                lineHeight: 0.95, textTransform: "uppercase", color: "var(--off-white)",
                marginBottom: "12px" 
              }}
            >
              Where I&apos;ve{" "}
              <span style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:400, textTransform:"none" }}>
                Worked
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              style={{ 
                fontFamily: "var(--font-body)", fontSize: "clamp(0.875rem, 1.1vw, 1rem)", 
                lineHeight: 1.85, color: "var(--grey-1)",
                maxWidth: "400px", marginBottom: "clamp(40px,6vw,80px)" 
              }}
            >
              Experiences that shaped the way I build, create and tell stories.
            </motion.p>
          </div>
        </div>

        {/* Experience List */}
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {experience.map((exp, i) => {
            const isHov = hoveredIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  borderBottom: "1px solid var(--line)",
                  transition: "background 0.4s ease, border-color 0.4s",
                  background: isHov ? "rgba(110,75,170,0.03)" : "transparent",
                  borderColor: isHov ? "rgba(150,110,220,0.2)" : "var(--line)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle purple hover glow */}
                {isHov && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    style={{
                      position: "absolute", inset: 0,
                      background: "radial-gradient(ellipse at 50% 50%, rgba(90,55,140,0.05) 0%, transparent 80%)",
                      pointerEvents: "none", zIndex: 0,
                    }}
                  />
                )}

                <div className="exp-row" style={{
                  padding: "clamp(24px,3.5vw,40px) 0",
                  position: "relative", zIndex: 1,
                  transform: isHov ? "translateX(6px)" : "translateX(0)",
                  transition: "transform 0.4s cubic-bezier(0.25,1,0.5,1)",
                }}>
                  <span style={{ 
                    fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", 
                    letterSpacing: "0.2em", color: "var(--grey-3)" 
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-heading)", fontWeight: 700,
                      fontSize: "clamp(1.1rem,2vw,1.6rem)",
                      textTransform: "uppercase", letterSpacing: "-0.01em",
                      color: isHov ? "var(--off-white)" : "var(--grey-1)",
                      marginBottom: "4px", transition: "color 0.3s",
                      textShadow: isHov ? "0 0 16px rgba(150,110,220,0.2)" : "none",
                    }}>
                      {exp.role}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-serif)", fontStyle: "italic",
                      color: "rgba(200,170,240,0.8)", fontSize: "0.9rem",
                    }}>
                      {exp.company}
                    </p>
                  </div>

                  <span className="hide-mobile" style={{
                    fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, 
                    textTransform: "uppercase", letterSpacing: "0.22em",
                    justifySelf: "end", textAlign: "right",
                    color: isHov ? "var(--grey-1)" : "var(--grey-2)", transition: "color 0.3s",
                  }}>
                    {exp.duration}
                  </span>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25,1,0.5,1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="exp-details">
                        <p style={{
                          fontFamily: "var(--font-body)", fontSize: "0.85rem",
                          lineHeight: 1.8, color: "var(--grey-2)", marginBottom: "20px",
                          maxWidth: "600px",
                        }}>
                          {exp.description}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {exp.highlights.map((h, j) => (
                            <p key={j} style={{
                              fontFamily: "var(--font-body)", fontSize: "0.8rem",
                              color: "var(--grey-1)", display: "flex", gap: "12px",
                            }}>
                              <span style={{ color: "rgba(150,110,220,0.6)" }}>—</span>
                              {h}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1400px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 64px); }
        .exp-header {
          display: grid;
          grid-template-columns: minmax(120px, 180px) 1fr;
          gap: clamp(32px, 5vw, 80px);
        }
        .exp-row {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          align-items: flex-start;
          gap: 16px;
        }
        .exp-details {
          padding-left: 60px;
          padding-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .exp-header { grid-template-columns: 1fr; gap: 24px; }
          .exp-row { grid-template-columns: 32px 1fr; }
          .exp-details { padding-left: 48px; }
          .hide-mobile { display: none !important; }
        }
      `}} />
    </section>
  );
}
