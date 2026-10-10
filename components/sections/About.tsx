"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--bg-1)",
        paddingTop: "var(--section-y)",
        paddingBottom: "clamp(60px,8vw,100px)", // Flow nicely into next section
        position: "relative",
      }}
    >
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Portrait */}
          <div className="about-portrait-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25,1,0.5,1] }}
              className="about-portrait-wrap"
            >
              <Image
                src="/gallery/48.webp"
                alt="Nithish Kumar portrait"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{
                  objectFit: "cover",
                  filter: "grayscale(20%) contrast(1.1) brightness(0.9)",
                }}
              />
              <div className="portrait-overlay" />
            </motion.div>
          </div>

          {/* Right Column: Text Content */}
          <div className="about-text-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ 
                fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, 
                textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--grey-2)",
                marginBottom: "24px", display: "block" 
              }}>
                About Me
              </span>
              
              <h2 style={{ 
                fontFamily: "var(--font-heading)", fontWeight: 700, 
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em", 
                lineHeight: 0.95, textTransform: "uppercase", color: "var(--off-white)",
                marginBottom: "24px" 
              }}>
                <span style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:400, textTransform:"none" }}>
                  Merging
                </span>{" "}
                Logic &amp; Emotion
              </h2>

              <div style={{
                width: "40px", height: "1px",
                background: "linear-gradient(to right, rgba(150,110,220,0.4), transparent)",
                marginBottom: "32px",
              }} />

              <p style={{ 
                fontFamily: "var(--font-body)", fontSize: "clamp(0.875rem, 1.1vw, 1rem)", 
                lineHeight: 1.85, color: "var(--grey-1)", marginBottom: "20px" 
              }}>
                I am a Full Stack Developer and Cinematographer. I believe the best digital experiences are built at the intersection of robust engineering and compelling visual storytelling.
              </p>
              
              <p style={{ 
                fontFamily: "var(--font-body)", fontSize: "clamp(0.875rem, 1.1vw, 1rem)", 
                lineHeight: 1.85, color: "var(--grey-1)", marginBottom: "20px" 
              }}>
                With a background in both code and camera work, I approach software not just as logic, but as an experience. Whether I&apos;m architecting a web application or framing a cinematic shot, my goal is always to create something that feels premium, intuitive, and impactful.
              </p>

              <div className="about-metrics">
                <div className="metric">
                  <span className="metric-val">3+</span>
                  <span className="metric-label">Years<br/>Experience</span>
                </div>
                <div className="metric">
                  <span className="metric-val">50+</span>
                  <span className="metric-label">Projects<br/>Completed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1400px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 64px); }
        .about-grid {
          display: grid;
          grid-template-columns: 4fr 6fr;
          gap: clamp(40px, 8vw, 100px);
          align-items: center;
        }
        .about-portrait-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
        }
        .portrait-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(8,7,11,0.8) 100%);
          pointer-events: none;
        }
        .about-metrics {
          display: flex;
          gap: 40px;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid var(--line);
        }
        .metric {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .metric-val {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 2.5rem;
          color: var(--off-white);
          line-height: 1;
        }
        .metric-label {
          font-family: var(--font-body);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--grey-2);
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-portrait-col { order: 2; }
          .about-text-col { order: 1; }
        }
      `}} />
    </section>
  );
}
