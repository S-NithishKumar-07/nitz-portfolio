"use client";
import { useState } from "react";
import { Copy, Check, ArrowUp } from "lucide-react";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

import { LiquidGlassText } from "@/components/ui/LiquidGlassText";

const WA_NUMBER = "916374025197";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] flex flex-col justify-between min-h-[85vh]" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
      <div className="e-container w-full flex-1 flex flex-col items-center justify-center">
        
        {/* Main Content (Centered) */}
        <div className="flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto flex-1 my-auto">
          
          <h3 className="metadata text-[var(--text-primary)]" style={{ marginBottom: "clamp(40px, 6vw, 60px)", letterSpacing: "0.2em" }}>
            GOT A PROJECT IN MIND?
          </h3>
          
          {/* Continuous Single-Line Email & Copy */}
          <div className="flex flex-col items-center w-full" style={{ gap: "clamp(40px, 6vw, 80px)", marginBottom: "clamp(60px, 10vw, 100px)" }}>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-serif tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: "clamp(1.5rem, 5vw, 6rem)", wordBreak: "keep-all", display: "inline-block", position: "relative", zIndex: 10 }}
            >
              <LiquidGlassText text={personalInfo.email} />
            </a>
            
            <button
              onClick={handleCopy}
              className="group relative flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-[11px] font-bold uppercase tracking-widest hover:border-[var(--text-primary)] transition-all duration-300 shrink-0"
              style={{ padding: "12px 32px" }}
            >
              {copied ? (
                <span className="flex items-center gap-2"><Check size={14} /> COPIED</span>
              ) : (
                <span className="flex items-center gap-2"><Copy size={14} /> COPY EMAIL</span>
              )}
            </button>
          </div>

          {/* Social Links (Clean minimal typographic) */}
          <div className="flex items-center justify-center flex-wrap w-full border-t border-[var(--border-subtle)]" style={{ gap: "clamp(24px, 4vw, 64px)", paddingTop: "clamp(40px, 6vw, 80px)" }}>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="metadata flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--text-muted)] transition-colors"
            >
              <FaWhatsapp size={16} /> WHATSAPP
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="metadata flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--text-muted)] transition-colors"
            >
              <FaLinkedin size={16} /> LINKEDIN
            </a>

            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="metadata flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--text-muted)] transition-colors"
            >
              <FaInstagram size={16} /> INSTAGRAM
            </a>
          </div>
        </div>
      </div>

      {/* Minimalist Footer */}
      <div className="e-container w-full mt-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[var(--border-subtle)] pt-8">
          <p className="metadata text-[var(--text-muted)]">
            © {new Date().getFullYear()} NITHISHKUMAR
          </p>
          
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>

          <p className="metadata text-[var(--text-muted)]">
            BASED IN TAMIL NADU, INDIA
          </p>
        </div>
      </div>
    </section>
  );
}
