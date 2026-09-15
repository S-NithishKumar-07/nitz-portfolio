"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#photos", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["about", "skills", "projects", "photos", "contact"];
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top } : { id, top: 999 };
      });
      const active = offsets.filter((s) => s.top <= 100).pop();
      if (active) setActiveSection(active.id);
      else setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(252, 252, 252, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4 md:px-12">
          
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <motion.a
              href="#"
              className="font-black tracking-tighter text-2xl font-heading uppercase"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              whileHover={{ scale: 1.02 }}
              style={{ color: "var(--text-primary)" }}
            >
              WN<span style={{ color: "var(--text-muted)", marginLeft: "1px" }}>.</span>
            </motion.a>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 font-sans"
                style={{
                  color: activeSection === link.href.replace("#", "")
                    ? "var(--text-primary)"
                    : "var(--text-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "var(--text-primary)" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="hidden md:flex flex-1 justify-end items-center">
            <button
              onClick={() => scrollTo("#contact")}
              className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-primary)",
              }}
            >
              GET IN TOUCH <span style={{ transition: "transform 0.2s" }} className="hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex-1 flex justify-end"
            style={{ color: "var(--text-primary)", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{
              background: "var(--bg-primary)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-heading font-black tracking-tighter uppercase transition-colors duration-300"
                style={{ color: "var(--text-primary)", background: "none", border: "none", cursor: "pointer" }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => scrollTo("#contact")}
              className="mt-8 px-8 py-3 border border-[var(--text-primary)] rounded-full text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]"
            >
              GET IN TOUCH →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
