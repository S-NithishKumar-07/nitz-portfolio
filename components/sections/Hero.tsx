"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

const navItems = [
  { label: "Home",    href: "#home" },
  { label: "Resume",  href: "#experience" },
  { label: "Works",   href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: "IG", label: "Instagram", href: personalInfo.socials.instagram },
  { icon: "IN", label: "LinkedIn",  href: personalInfo.socials.linkedin },
  { icon: "GH", label: "GitHub",    href: personalInfo.socials.github },
];

function scrollTo(href: string) {
  const id = href.replace("#", "");
  if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [mounted, setMounted]     = useState(false);

  /* Mouse parallax on portrait — very subtle */
  const rawMX = useMotionValue(0);
  const rawMY = useMotionValue(0);
  const mxSp  = useSpring(rawMX, { stiffness: 30, damping: 18 });
  const mySp  = useSpring(rawMY, { stiffness: 30, damping: 18 });
  const imgX  = useTransform(mxSp, [-1, 1], [-8, 8]);
  const imgY  = useTransform(mySp, [-1, 1], [-6, 6]);

  useEffect(() => {
    setMounted(true);
    const ids = ["home", "experience", "projects", "contact"];
    const handler = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveNav(id); return; }
      }
      setActiveNav("home");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawMX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawMY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onMouseLeave = () => { rawMX.set(0); rawMY.set(0); };

  if (!mounted) return null;

  return (
    <>
      <section
        id="home"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="hero-section"
      >
        {/* ══════════ BACKGROUND EFFECTS ══════════ */}
        {/* Purple glow behind portrait area */}
        <div className="hero-glow-portrait" aria-hidden="true" />
        {/* Subtle top-left purple glow */}
        <div className="hero-glow-left" aria-hidden="true" />
        {/* Purple bottom line */}
        <div className="hero-bottom-line" aria-hidden="true" />

        {/* ══════════ TOP NAV BAR ══════════ */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25,1,0.5,1], delay: 0.1 }}
          className="hero-header"
        >
          {/* Brand name */}
          <span className="hero-brand">NITHISH KUMAR</span>

          {/* Desktop nav */}
          <nav className="hero-nav-row hide-mobile">
            {navItems.map((item) => {
              const isActive = activeNav === item.href.replace("#", "");
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  data-cursor="hover"
                  className={`hero-nav-link${isActive ? " active" : ""}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            data-cursor="hover"
            className="show-mobile hero-ham"
          >
            {[0,1,2].map((i) => (
              <motion.span key={i}
                animate={{
                  rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y: menuOpen && i === 0 ? 10 : menuOpen && i === 2 ? -10 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                style={{
                  display: "block",
                  width: i === 1 ? "65%" : "100%",
                  height: "1.5px",
                  background: "#F0EEFF",
                  transformOrigin: "center",
                }}
              />
            ))}
          </button>
        </motion.header>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="hero-mobile-overlay"
          >
            {navItems.map((item, i) => (
              <motion.button key={item.label}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => { scrollTo(item.href); setMenuOpen(false); }}
                className="hero-mobile-link"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ══════════ MAIN 2-COLUMN LAYOUT ══════════ */}
        <div className="hero-grid">
          
          {/* ── LEFT: Content ── */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25,1,0.5,1], delay: 0.35 }}
          >
            {/* Eyebrow */}
            <p className="hero-eyebrow">
              SOFTWARE DEVELOPER &bull; CINEMATOGRAPHER
            </p>

            {/* Name */}
            <h1 className="hero-name">
              NITHISH<br />KUMAR
            </h1>

            {/* Title */}
            <h2 className="hero-title">
              Full Stack Developer &amp;{" "}
              <span className="hero-title-accent">Cinematographer</span>
            </h2>

            {/* Description */}
            <p className="hero-desc">
              I build modern digital experiences and tell visual stories through code, photography and cinematography.
            </p>

            {/* Visual Storyteller badge */}
            <div className="hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(200,170,240,0.7)" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              </svg>
              <span>VISUAL STORYTELLER</span>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-row">
              <button
                data-cursor="hover"
                className="hero-btn-primary"
                onClick={() => scrollTo("#projects")}
              >
                VIEW MY WORK
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button
                data-cursor="hover"
                className="hero-btn-outline"
                onClick={() => scrollTo("#contact")}
              >
                CONTACT ME
              </button>
            </div>

            {/* Bottom details */}
            <div className="hero-details">
              <div className="hero-detail-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(200,170,240,0.6)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>Based in Tamil Nadu, India</span>
              </div>
              <div className="hero-detail-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(200,170,240,0.6)" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                <span>Available for software development, creative projects &amp; visual storytelling</span>
              </div>
              <div className="hero-detail-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(200,170,240,0.6)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <a href={`mailto:${personalInfo.email}`} data-cursor="hover" className="hero-email">
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Portrait ── */}
          <motion.div
            className="hero-portrait-area"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.25,1,0.5,1], delay: 0.25 }}
          >
            {/* Purple glow ring behind portrait */}
            <div className="portrait-glow-ring" aria-hidden="true" />

            {/* Image container — object-fit: contain */}
            <motion.div className="portrait-container" style={{ x: imgX, y: imgY }}>
              <Image
                src="/hero.jpg"
                alt="Nithish Kumar — Full Stack Developer & Cinematographer"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                style={{
                  objectFit: "contain",
                  objectPosition: "center bottom",
                  filter: "brightness(0.95) contrast(1.05) saturate(0.9)",
                }}
              />
              {/* Bottom fade */}
              <div className="portrait-fade" />
            </motion.div>

            {/* "Build, Capture, Tell" cursive text */}
            <motion.div
              className="hero-cursive hide-mobile"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <span>Build,</span>
              <span>Capture,</span>
              <span>Tell</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════ RIGHT SIDE SOCIAL BAR ══════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="hero-social-bar hide-mobile"
        >
          <div className="social-bar-line" />
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              data-cursor="hover"
              className="social-icon-link"
              title={s.label}
            >
              <span className="social-icon-circle">{s.icon}</span>
            </a>
          ))}
          <span className="social-follow-label">FOLLOW ME</span>
          <div className="social-bar-line" />
        </motion.div>

        {/* ══════════ SCROLL INDICATOR ══════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="hero-scroll-indicator hide-mobile"
        >
          {/* Mouse icon */}
          <div className="scroll-mouse">
            <motion.div
              className="scroll-dot"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ═══════════ HERO SECTION ═══════════ */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 800px;
          overflow: hidden;
          background: linear-gradient(160deg, #050505 0%, #08060D 30%, #0C0915 60%, #060510 100%);
        }

        /* ── Background effects ── */
        .hero-glow-portrait {
          position: absolute;
          top: 10%; right: 5%;
          width: 50%; height: 80%;
          background: radial-gradient(ellipse at 60% 50%, 
            rgba(100,50,180,0.12) 0%,
            rgba(70,30,130,0.06) 40%,
            transparent 70%
          );
          pointer-events: none; z-index: 1;
        }
        .hero-glow-left {
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 60%;
          background: radial-gradient(ellipse at 20% 30%,
            rgba(80,40,140,0.06) 0%,
            transparent 70%
          );
          pointer-events: none; z-index: 1;
        }
        .hero-bottom-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, 
            transparent 0%,
            rgba(120,60,200,0.3) 30%,
            rgba(160,80,240,0.5) 50%,
            rgba(120,60,200,0.3) 70%,
            transparent 100%
          );
          z-index: 10;
        }

        /* ═══════════ TOP NAV ═══════════ */
        .hero-header {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px clamp(32px, 5vw, 64px);
        }
        .hero-brand {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(0.85rem, 1.2vw, 1.05rem);
          letter-spacing: 0.08em;
          color: #F0EEFF;
          text-transform: uppercase;
        }
        .hero-nav-row {
          display: flex;
          align-items: center;
          gap: clamp(24px, 3vw, 48px);
        }
        .hero-nav-link {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #8A8595;
          background: none;
          border: none;
          cursor: none;
          padding: 6px 0;
          position: relative;
          transition: color 0.3s;
          text-decoration: none;
        }
        .hero-nav-link.active,
        .hero-nav-link:hover {
          color: #F0EEFF;
        }
        .hero-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(to right, rgba(130,70,210,0.8), rgba(180,120,250,0.5));
          transition: width 0.35s ease;
        }
        .hero-nav-link.active::after,
        .hero-nav-link:hover::after {
          width: 100%;
        }

        /* Mobile */
        .hero-ham {
          background: none;
          border: none;
          cursor: none;
          padding: 0;
          flex-direction: column;
          gap: 5px;
          width: 22px;
          z-index: 50;
        }
        .hero-mobile-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(5,5,5,0.97);
          backdrop-filter: blur(24px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 32px;
        }
        .hero-mobile-link {
          background: none; border: none; cursor: none;
          font-family: var(--font-heading); font-size: 2.2rem;
          font-weight: 700; text-transform: uppercase;
          letter-spacing: -0.02em; color: #F0EEFF;
        }

        /* ═══════════ MAIN GRID ═══════════ */
        .hero-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 55% 45%;
          z-index: 5;
        }

        /* ── LEFT CONTENT ── */
        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px clamp(32px, 5vw, 80px) 60px clamp(32px, 5vw, 80px);
          z-index: 10;
        }
        .hero-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          color: rgba(160,100,240,0.65);
          margin-bottom: 20px;
        }
        .hero-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(3.5rem, 7vw, 7rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: #F0EEFF;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .hero-title {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.5rem, 2.8vw, 2.6rem);
          color: #D4D0DC;
          margin-bottom: 24px;
          line-height: 1.15;
        }
        .hero-title-accent {
          color: rgba(160,100,240,0.85);
        }
        .hero-desc {
          font-family: var(--font-body);
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          line-height: 1.7;
          color: #8A8595;
          max-width: 480px;
          margin-bottom: 20px;
        }
        .hero-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .hero-badge span {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #F0EEFF;
          text-transform: uppercase;
        }

        /* ── CTA Buttons ── */
        .hero-cta-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, rgba(120,60,200,0.85), rgba(90,40,170,0.95));
          border: 1px solid rgba(160,100,240,0.3);
          border-radius: 4px;
          color: #fff;
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: none;
          transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
        }
        .hero-btn-primary:hover {
          background: linear-gradient(135deg, rgba(140,70,220,0.95), rgba(110,50,190,1));
          box-shadow: 0 0 30px rgba(120,60,200,0.3), 0 4px 20px rgba(100,40,180,0.2);
          transform: translateY(-1px);
        }
        .hero-btn-outline {
          display: inline-flex;
          align-items: center;
          padding: 14px 32px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          color: #F0EEFF;
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: none;
          transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
        }
        .hero-btn-outline:hover {
          border-color: rgba(160,100,240,0.5);
          background: rgba(120,60,200,0.08);
          box-shadow: 0 0 20px rgba(120,60,200,0.1);
        }

        /* ── Bottom details ── */
        .hero-details {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 28px;
        }
        .hero-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .hero-detail-item span {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: #8A8595;
          line-height: 1.5;
        }
        .hero-email {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: #F0EEFF;
          text-decoration: none;
          transition: color 0.3s;
        }
        .hero-email:hover {
          color: rgba(180,130,250,0.9);
        }

        /* ═══════════ RIGHT: PORTRAIT ═══════════ */
        .hero-portrait-area {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
        }

        /* Purple glow ring behind portrait */
        .portrait-glow-ring {
          position: absolute;
          bottom: 5%; left: 50%;
          transform: translateX(-50%);
          width: 70%; height: 85%;
          background: radial-gradient(ellipse at center bottom,
            rgba(120,60,200,0.15) 0%,
            rgba(100,40,180,0.08) 40%,
            transparent 70%
          );
          border-radius: 50% 50% 0 0;
          pointer-events: none;
          z-index: 0;
        }

        .portrait-container {
          position: relative;
          width: 100%;
          height: 92%;
          z-index: 2;
        }
        .portrait-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 30%;
          background: linear-gradient(to top,
            rgba(6,5,16,1) 0%,
            rgba(6,5,16,0.7) 40%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 3;
        }

        /* ── Cursive "Build, Capture, Tell" ── */
        .hero-cursive {
          position: absolute;
          top: 22%; right: 6%;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .hero-cursive span {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.5rem, 2.2vw, 2.2rem);
          color: rgba(220,200,255,0.35);
          line-height: 1.2;
        }

        /* ═══════════ SOCIAL BAR ═══════════ */
        .hero-social-bar {
          position: absolute;
          right: clamp(16px, 2vw, 28px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 25;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .social-bar-line {
          width: 1px; height: 30px;
          background: linear-gradient(to bottom, transparent, rgba(160,100,240,0.25), transparent);
        }
        .social-icon-link {
          text-decoration: none;
          transition: transform 0.3s;
        }
        .social-icon-link:hover {
          transform: scale(1.15);
        }
        .social-icon-circle {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(160,100,240,0.25);
          background: rgba(120,60,200,0.06);
          font-family: var(--font-body);
          font-size: 0.5rem;
          font-weight: 700;
          color: rgba(200,170,240,0.7);
          letter-spacing: 0;
          transition: border-color 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s;
        }
        .social-icon-link:hover .social-icon-circle {
          border-color: rgba(160,100,240,0.5);
          background: rgba(120,60,200,0.15);
          color: #F0EEFF;
          box-shadow: 0 0 16px rgba(120,60,200,0.2);
        }
        .social-follow-label {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-body);
          font-size: 0.52rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: rgba(240,238,255,0.2);
        }

        /* ═══════════ SCROLL INDICATOR ═══════════ */
        .hero-scroll-indicator {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
        }
        .scroll-mouse {
          width: 22px; height: 36px;
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 11px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 6px;
        }
        .scroll-dot {
          width: 3px; height: 6px;
          background: rgba(160,100,240,0.6);
          border-radius: 2px;
        }

        /* ═══════════ RESPONSIVE ═══════════ */
        @media (max-width: 1024px) {
          .hero-section {
            height: auto !important;
            min-height: 100vh;
          }
          .hero-grid {
            position: relative;
            display: flex;
            flex-direction: column;
          }
          .hero-content {
            order: 1;
            padding: 120px clamp(24px, 5vw, 40px) 40px;
          }
          .hero-portrait-area {
            order: 2;
            height: 55vh;
            min-height: 400px;
          }
          .hero-name {
            font-size: clamp(3rem, 11vw, 5rem);
          }
          .hero-title {
            font-size: clamp(1.3rem, 4vw, 2rem);
          }
          .hero-cursive { display: none; }
          .portrait-glow-ring {
            width: 90%; height: 80%;
          }
        }

        @media (max-width: 600px) {
          .hero-content {
            padding: 100px 24px 32px;
          }
          .hero-name {
            font-size: clamp(2.5rem, 12vw, 4rem);
          }
          .hero-details {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}} />
    </>
  );
}
