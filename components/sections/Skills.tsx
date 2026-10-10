"use client";
import { motion } from "framer-motion";
import { useState, useRef, MouseEvent as ReactMouseEvent } from "react";

const skillGroups = [
  {
    title: "DEVELOPMENT",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    title: "DATABASE",
    skills: ["MongoDB", "PostgreSQL"],
  },
  {
    title: "MOTION & DESIGN",
    skills: ["Framer Motion", "Figma"],
  },
  {
    title: "VISUAL PRODUCTION",
    skills: ["Premiere Pro", "Lightroom"],
  },
];

// Interactive Skill Pill Component
function SkillPill({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const pillRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={pillRef}
      className="skill-pill-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="skill-pill">
        <span className="skill-text">{name}</span>
        
        {/* Liquid Glass Overlay on Hover */}
        <div className="skill-glass" style={{ opacity: isHovered ? 1 : 0 }} />
        
        {/* Cursor Following Glow */}
        <div 
          className="skill-cursor-glow"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    },
  };

  return (
    <section
      id="skills"
      style={{
        backgroundColor: "var(--bg-0)",
        paddingTop: "clamp(100px, 15vw, 200px)",
        paddingBottom: "clamp(100px, 15vw, 200px)",
        position: "relative",
      }}
    >
      <div className="container">
        <div className="skills-layout">
          
          {/* LEFT: Heading */}
          <motion.div
            className="skills-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <h2 className="skills-heading">
              SKILLS<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, textTransform: "none" }}>
                &amp;
              </span>{" "}
              TECH
            </h2>
            <p className="skills-desc">
              Tools and technologies I use to build digital products and visual experiences.
            </p>
          </motion.div>

          {/* RIGHT: Skill Groups */}
          <motion.div
            className="skills-right"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {skillGroups.map((group, idx) => (
              <motion.div key={idx} variants={itemVariants} className="skill-group">
                <h3 className="sg-title">{group.title}</h3>
                <div className="sg-grid">
                  {group.skills.map((skill) => (
                    <SkillPill key={skill} name={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1400px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 64px); }
        
        .skills-layout {
          display: grid;
          grid-template-columns: 4fr 7fr;
          gap: clamp(60px, 8vw, 120px);
          align-items: start;
        }

        .skills-heading {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--off-white);
          margin-bottom: 24px;
        }

        .skills-desc {
          font-family: var(--font-body);
          font-size: clamp(0.875rem, 1.1vw, 1rem);
          line-height: 1.85;
          color: var(--grey-1);
          max-width: 320px;
        }

        .skills-right {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .skill-group {
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-top: 1px solid rgba(255,255,255,0.04);
          padding-top: 32px;
        }
        
        /* Remove top border from first group */
        .skill-group:first-child {
          border-top: none;
          padding-top: 0;
        }

        .sg-title {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--grey-2);
          text-transform: uppercase;
        }

        .sg-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* ── INTERACTIVE PILL STYLES ── */
        .skill-pill-wrap {
          position: relative;
          cursor: none;
        }

        .skill-pill {
          position: relative;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        
        .skill-pill-wrap:hover .skill-pill {
          border-color: rgba(150, 110, 220, 0.4);
          box-shadow: 0 4px 20px -2px rgba(120, 60, 200, 0.15);
        }

        .skill-text {
          position: relative;
          z-index: 2;
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--grey-1);
          transition: color 0.4s ease;
        }

        .skill-pill-wrap:hover .skill-text {
          color: var(--off-white);
        }

        .skill-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
          z-index: 1;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .skill-cursor-glow {
          position: absolute;
          top: -40px; /* offset to center the glow on cursor */
          left: -40px;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle closest-side, rgba(150, 110, 220, 0.3), transparent);
          filter: blur(10px);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.3s ease;
        }

        @media (max-width: 900px) {
          .skills-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .skills-heading {
            br { display: none; }
          }
          .skills-desc {
            max-width: 100%;
          }
          .skill-right {
            gap: 40px;
          }
          .skill-group {
            padding-top: 24px;
            gap: 20px;
          }
        }
      `}} />
    </section>
  );
}
