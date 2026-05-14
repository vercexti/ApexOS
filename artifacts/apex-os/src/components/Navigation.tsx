import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Agents", href: "#agents" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Terminal", href: "#terminal" },
  { label: "Career", href: "#career" },
  { label: "Study", href: "#study" },
  { label: "Workflows", href: "#workflows" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(20px)" : "none",
        background: scrolled ? "rgba(11,11,15,0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid #2A2A2E" : "1px solid transparent",
      }}
    >
      <a href="#" className="flex items-center gap-2" data-testid="link-logo">
        <div className="relative">
          <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ background: "#E50914" }}>
            <span className="text-white font-black text-xs" style={{ fontFamily: "'Syne', sans-serif" }}>A</span>
          </div>
          <div className="absolute inset-0 blur-md opacity-70" style={{ background: "#E50914" }} />
        </div>
        <span className="text-white font-black tracking-widest text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
          APEX<span style={{ color: "#E50914" }}>OS</span>
        </span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-sm tracking-wide transition-colors duration-200 hover:text-white"
            style={{ color: "#B3B3B3" }}
            data-testid={`link-nav-${link.label.toLowerCase()}`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="px-4 py-2 rounded text-sm font-semibold tracking-wide text-white"
        style={{ background: "#E50914", boxShadow: "0 0 20px rgba(229,9,20,0.3)" }}
        data-testid="button-early-access"
        onClick={() => scrollTo("#final")}
      >
        Get Early Access
      </motion.button>
    </motion.nav>
  );
}
