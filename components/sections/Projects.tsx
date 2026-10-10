"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  year?: string;
  tech: string[];
  github?: string;
  live?: string;
  displayLabel?: string;
  portfolioLinks?: { label: string; url: string }[];
  company?: string;
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hov, setHov] = useState(false);
  const hasLinks = project.github || project.live || project.portfolioLinks;
  const primaryLink = project.github || project.live || project.portfolioLinks?.[0]?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => primaryLink && !project.portfolioLinks && window.open(primaryLink, "_blank", "noopener,noreferrer")}
      data-cursor={primaryLink ? "hover" : ""}
      style={{
        borderBottom: "1px solid var(--line)",
        cursor: primaryLink ? "none" : "default",
        background: hov ? "rgba(110,75,170,0.04)" : "transparent",
        transition: "background 0.4s ease, border-color 0.4s",
        borderColor: hov ? "rgba(150,110,220,0.2)" : "var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Deep purple glow background on hover */}
      {hov && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 50%, rgba(90,55,140,0.06) 0%, transparent 80%)",
            pointerEvents: "none", zIndex: 0,
          }}
        />
      )}

      <div
        className="proj-row"
        style={{
          padding: "clamp(24px,3.5vw,40px) 0",
          transform: hov ? "translateX(6px)" : "translateX(0)",
          transition: "transform 0.4s cubic-bezier(0.25,1,0.5,1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--grey-3)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(1.1rem,2vw,1.6rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            color: hov ? "var(--off-white)" : "var(--grey-1)",
            marginBottom: "6px",
            transition: "color 0.3s",
            textShadow: hov ? "0 0 16px rgba(150,110,220,0.2)" : "none",
          }}>
            {project.title}
          </h3>
          {/* View Project indicator (Desktop only) */}
          <div style={{
            height: "14px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}>
            <AnimatePresence>
              {hov && hasLinks && !project.portfolioLinks && (
                <motion.span
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hide-mobile"
                  style={{ 
                    fontFamily: "var(--font-body)", fontSize: "0.55rem", fontWeight: 700, 
                    textTransform: "uppercase", letterSpacing: "0.22em",
                    color: "rgba(200,170,240,0.8)" 
                  }}
                >
                  VIEW PROJECT ↗
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <span
          className="hide-mobile"
          style={{
            fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, 
            textTransform: "uppercase", letterSpacing: "0.22em",
            color: hov ? "var(--grey-1)" : "var(--grey-2)",
            transition: "color 0.3s",
            justifySelf: "end",
            textAlign: "right",
          }}
        >
          {project.tech.join(" · ").toUpperCase()}
        </span>
      </div>

      {/* Expanded section for multi-link projects (Portfolio Websites) */}
      <AnimatePresence>
        {project.portfolioLinks && hov && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              paddingLeft: "60px", paddingBottom: "24px",
              display: "flex", gap: "24px", flexWrap: "wrap",
              position: "relative", zIndex: 1,
            }}>
              {project.portfolioLinks.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} data-cursor="hover"
                  style={{
                    fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, 
                    textTransform: "uppercase", letterSpacing: "0.22em",
                    color: "rgba(200,170,240,0.8)",
                    borderBottom: "1px solid rgba(150,110,220,0.3)",
                    paddingBottom: "4px", textDecoration: "none",
                    transition: "border-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--off-white)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,170,240,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(200,170,240,0.8)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(150,110,220,0.3)";
                  }}
                >
                  {link.label.toUpperCase()} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const typed = projects as Project[];

  return (
    <section
      id="projects"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #08060D 50%, #050505 100%)",
        paddingTop: "clamp(60px,8vw,100px)", // Flow nicely from Experience
        paddingBottom: "var(--section-y)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="proj-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span style={{ 
              fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, 
              textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--grey-2)" 
            }}>Selected Work</span>
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
              <span style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:400, textTransform:"none" }}>
                Things I&apos;ve
              </span>{" "}
              Built
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              style={{ 
                fontFamily: "var(--font-body)", fontSize: "clamp(0.875rem, 1.1vw, 1rem)", 
                lineHeight: 1.85, color: "var(--grey-1)",
                maxWidth: "480px", marginBottom: "clamp(36px,5vw,60px)" 
              }}
            >
              Selected digital products, experiments and client work built through code and creative problem solving.
            </motion.p>
          </div>
        </div>

        {/* Project List */}
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {typed.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Small subtle identity label at bottom */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}
        >
          <span style={{ 
            fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", 
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(150,110,210,0.3)" 
          }}>
            BUILT WITH CODE
          </span>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1400px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 64px); }
        .proj-header {
          display: grid;
          grid-template-columns: minmax(120px, 180px) 1fr;
          gap: clamp(32px, 5vw, 80px);
        }
        .proj-row {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          align-items: center;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .proj-header { grid-template-columns: 1fr; gap: 24px; }
          .proj-row { grid-template-columns: 32px 1fr; }
          .hide-mobile { display: none !important; }
        }
      `}} />
    </section>
  );
}
