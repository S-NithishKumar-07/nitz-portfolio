"use client";
import { useState } from "react";
import { Copy, Check, ArrowUp } from "lucide-react";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

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
    <section id="contact" className="relative bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] pt-32 pb-20 md:pt-[160px] md:pb-[100px] overflow-hidden flex flex-col justify-between min-h-[80vh]">
      <div className="e-container w-full flex-1 flex flex-col justify-center">
        
        {/* Main Content */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          <h3 className="metadata text-[var(--text-primary)] mb-16">Got a project in mind?</h3>
          
          {/* Continuous Single-Line Email & Copy */}
          <div className="flex flex-col items-center gap-16 mb-32 max-w-full">
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-[clamp(2rem,6vw,5.5rem)] font-serif tracking-tight text-[var(--text-primary)] hover:opacity-60 transition-opacity"
              style={{ wordBreak: "keep-all" }}
            >
              {personalInfo.email}
            </a>
            
            <button
              onClick={handleCopy}
              className="group relative flex items-center justify-center px-8 py-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-[11px] font-bold uppercase tracking-widest hover:border-[var(--text-primary)] transition-all duration-300 flex-shrink-0"
            >
              {copied ? (
                <span className="flex items-center gap-2"><Check size={14} /> COPIED</span>
              ) : (
                <span className="flex items-center gap-2"><Copy size={14} /> COPY EMAIL</span>
              )}
            </button>
          </div>

          {/* Social Links (Clean minimal typographic) */}
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap border-t border-[var(--border-subtle)] pt-20 w-full">
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
