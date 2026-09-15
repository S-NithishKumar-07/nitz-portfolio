"use client";
import { motion } from "framer-motion";
import { Code2, Camera, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function About() {
  const { isMobile, isTablet } = useBreakpoint();
  const isSmall = isMobile || isTablet;

  return (
    <section
      id="about"
      className="relative bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]"
      style={{
        padding: isMobile ? "80px 0" : "120px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div style={{
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr" : "1fr 1.3fr",
          gap: isMobile ? "48px" : "80px",
          alignItems: "center",
        }}>
          {/* LEFT — Polaroid-style Photo Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-[340px] bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 pb-12 shadow-sm rounded-sm">
              <div className="relative aspect-[4/5] w-full bg-[var(--bg-secondary)] overflow-hidden rounded-sm">
                <Image
                  src="/gallery/48.webp"
                  alt="Nithishkumar"
                  fill
                  sizes="340px"
                  style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(15%)" }}
                />
              </div>
              <div className="mt-6 text-center font-serif italic text-lg text-[var(--text-primary)]">
                Nithishkumar
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-6 text-[var(--text-muted)] text-sm">
              <MapPin size={14} className="text-[var(--accent-blue)]" />
              <span>{personalInfo.location}</span>
            </div>
          </motion.div>

          {/* RIGHT — Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-start"
          >
            <span className="section-label mb-4 flex items-center gap-2">
              <Sparkles size={11} /> ABOUT ME
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-8 text-[var(--text-primary)]">
              Developer by <span className="italic font-normal">Code</span>,<br />
              Storyteller by <span className="italic font-normal">Lens</span>
            </h2>
            
            <div className="flex flex-col gap-6 text-[var(--text-secondary)] text-base leading-relaxed mb-10 font-sans">
              {personalInfo.about.split("\n\n").filter(Boolean).map((p, i) => (
                <p key={i}>{p.trim()}</p>
              ))}
            </div>

            {/* Split Skills highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg">
                <Code2 size={24} className="text-[var(--text-primary)] mb-4" />
                <h3 className="text-lg font-bold font-serif mb-2 text-[var(--text-primary)]">Developer</h3>
                <p className="text-sm text-[var(--text-secondary)]">MERN Stack · React · Node.js · APIs</p>
              </div>
              <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg">
                <Camera size={24} className="text-[var(--text-primary)] mb-4" />
                <h3 className="text-lg font-bold font-serif mb-2 text-[var(--text-primary)]">Visual Artist</h3>
                <p className="text-sm text-[var(--text-secondary)]">Photography · Cinematography · Post-Production</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
