"use client";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const WHATSAPP_NUMBER = "919080706050"; // Replace with actual number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const LINKEDIN_URL = personalInfo.socials.linkedin;
const INSTAGRAM_URL = personalInfo.socials.instagram;

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: "var(--bg-0)",
        paddingTop: "clamp(80px, 10vw, 150px)",
        paddingBottom: "clamp(80px, 10vw, 150px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial gradient behind Let's Talk */}
      <div 
        aria-hidden="true" 
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1000px",
          height: "1000px",
          background: "radial-gradient(circle at 50% 50%, rgba(90, 55, 140, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ 
            fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, 
            textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--grey-2)",
            marginBottom: "16px", display: "block" 
          }}>
            Next Steps
          </span>
          
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Soft blurred glow behind text */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(circle, rgba(150,110,220,0.15) 0%, transparent 70%)",
              filter: "blur(20px)", zIndex: -1, pointerEvents: "none"
            }} />
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "var(--off-white)",
              marginBottom: "16px",
              lineHeight: 1,
            }}>
              LET&apos;S TALK
            </h2>
          </div>

          <p style={{ 
            fontFamily: "var(--font-body)", fontSize: "clamp(0.875rem, 1.1vw, 1rem)", 
            lineHeight: 1.85, color: "var(--grey-1)",
            maxWidth: "500px", margin: "0 auto 40px" 
          }}>
            I am currently open to new opportunities, collaborations, and interesting projects. Whether you have a question or just want to say hi, my inbox is open.
          </p>

          <button 
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
            className="contact-main-btn"
            data-cursor="hover"
          >
            LET&apos;S TALK ON WHATSAPP ↗
          </button>
        </motion.div>

        {/* Social Cards */}
        <motion.div 
          className="social-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* WhatsApp Card */}
          <div className="social-card" onClick={() => window.open(WHATSAPP_URL, "_blank")}>
            <div className="sc-glow" />
            <span className="sc-label">WHATSAPP</span>
            <h3 className="sc-title">Let&apos;s chat</h3>
            <p className="sc-desc">Start a conversation <span className="sc-arrow">→</span></p>
          </div>

          {/* LinkedIn Card */}
          <div className="social-card" onClick={() => window.open(LINKEDIN_URL, "_blank")}>
            <div className="sc-glow" />
            <span className="sc-label">LINKEDIN</span>
            <h3 className="sc-title">Professional network</h3>
            <p className="sc-desc">Connect with me <span className="sc-arrow">→</span></p>
          </div>

          {/* Instagram Card */}
          <div className="social-card" onClick={() => window.open(INSTAGRAM_URL, "_blank")}>
            <div className="sc-glow" />
            <span className="sc-label">INSTAGRAM</span>
            <h3 className="sc-title">Visual work &amp; BTS</h3>
            <p className="sc-desc">Follow my work <span className="sc-arrow">→</span></p>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(24px, 4vw, 64px); }
        
        .contact-main-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 18px 40px;
          background: transparent;
          border: 1px solid rgba(150,110,220,0.5);
          color: var(--off-white);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          cursor: none;
          transition: all 0.4s ease;
          margin-bottom: clamp(60px, 8vw, 100px);
        }
        .contact-main-btn:hover {
          background: rgba(120,60,200,0.1);
          border-color: rgba(150,110,220,0.8);
          box-shadow: 0 0 20px rgba(120,60,200,0.2);
          transform: translateY(-2px);
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          text-align: left;
        }

        .social-card {
          position: relative;
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 8px;
          padding: 32px 24px;
          cursor: none;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          display: flex;
          flex-direction: column;
        }

        .sc-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 100%, rgba(120,60,200,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .social-card:hover {
          transform: translateY(-4px);
          border-color: rgba(150,110,220,0.3);
          background: rgba(255,255,255,0.02);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }
        
        .social-card:hover .sc-glow {
          opacity: 1;
        }

        .social-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .social-card:hover::after {
          opacity: 1;
        }

        .sc-label {
          font-family: var(--font-body);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--grey-3);
          margin-bottom: 16px;
          transition: color 0.3s;
        }

        .sc-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--off-white);
          margin-bottom: 8px;
        }

        .sc-desc {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--grey-1);
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sc-arrow {
          color: rgba(150,110,220,0.7);
          transition: transform 0.3s ease;
        }

        .social-card:hover .sc-label {
          color: rgba(150,110,220,0.8);
        }

        .social-card:hover .sc-arrow {
          transform: translateX(4px);
          color: var(--off-white);
        }

        @media (max-width: 900px) {
          .social-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}} />
    </section>
  );
}
