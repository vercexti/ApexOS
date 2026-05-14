import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tourSections = [
  { id: "prologue-section", label: "Prologue", desc: "Why the future needs an OS" },
  { id: "hero", label: "Hero", desc: "The awakening begins" },
  { id: "agents", label: "Neural Core", desc: "11 autonomous intelligences" },
  { id: "agent-debate", label: "Agent Debate", desc: "Watch AI reason together" },
  { id: "ai-thinking", label: "Cognition", desc: "AI thinking made visible" },
  { id: "neural-universe", label: "Neural Universe", desc: "Expand the intelligence web" },
  { id: "career", label: "Career Galaxy", desc: "Explore the career cosmos" },
  { id: "career-cards", label: "Career Paths", desc: "Your future paths" },
  { id: "study", label: "Study Core", desc: "Intelligence architecture" },
  { id: "workflows", label: "Workflows", desc: "Automation that thinks" },
  { id: "future-self", label: "Future Self", desc: "Simulate your evolution" },
  { id: "final", label: "Finale", desc: "The vision" },
];

interface Props {
  onExit: () => void;
}

export default function GuidedTourBar({ onExit }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const goToSection = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, tourSections.length - 1));
    setCurrentIdx(clamped);
    const target = document.getElementById(tourSections[clamped].id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Track scroll position to sync current section
  useEffect(() => {
    const onScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let best = 0;
      tourSections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollMid) best = i;
      });
      setCurrentIdx(best);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-play: advance every 12s
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      if (currentIdx < tourSections.length - 1) goToSection(currentIdx + 1);
      else setAutoPlay(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, [autoPlay, currentIdx, goToSection]);

  const section = tourSections[currentIdx];
  const isLast = currentIdx === tourSections.length - 1;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-[150] px-4 pb-4 pt-3"
      style={{ background: "linear-gradient(0deg, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.85) 80%, transparent 100%)" }}
    >
      {/* Progress rail */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-1.5 mb-3">
          {tourSections.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => goToSection(i)}
              className="relative h-1 rounded-full transition-all duration-300 flex-1"
              style={{ background: i < currentIdx ? "#E50914" : i === currentIdx ? "#FF3B47" : "#2A2A2E" }}
              title={s.label}
              data-testid={`tour-dot-${i}`}
            >
              {i === currentIdx && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ background: "#FF3B47", boxShadow: "0 0 6px #FF3B47" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Section info */}
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs font-mono" style={{ color: "#7A7A7A" }}>
                {currentIdx + 1} / {tourSections.length}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-sm font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{section.label}</div>
                  <div className="text-xs" style={{ color: "#7A7A7A" }}>{section.desc}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Auto-play toggle */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setAutoPlay((a) => !a)}
              className="px-3 py-1.5 rounded-lg text-xs border transition-all"
              style={{
                color: autoPlay ? "#10B981" : "#7A7A7A",
                borderColor: autoPlay ? "rgba(16,185,129,0.4)" : "#2A2A2E",
                background: autoPlay ? "rgba(16,185,129,0.08)" : "transparent",
              }}
              data-testid="button-autoplay"
            >
              {autoPlay ? "Auto ●" : "Auto ○"}
            </motion.button>

            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => goToSection(currentIdx - 1)}
              disabled={currentIdx === 0}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-all"
              style={{
                color: currentIdx === 0 ? "#2A2A2E" : "#B3B3B3",
                borderColor: currentIdx === 0 ? "#1C1C1F" : "#2A2A2E",
                background: "#0B0B0F",
              }}
              data-testid="button-tour-prev"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>

            {/* Next / Finish */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: isLast ? "0 0 20px rgba(229,9,20,0.4)" : "none" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => isLast ? onExit() : goToSection(currentIdx + 1)}
              className="px-5 py-2 rounded-full font-bold text-xs tracking-wide text-white flex items-center gap-2"
              style={{ background: isLast ? "#E50914" : "#1C1C1F", border: "1px solid", borderColor: isLast ? "#E50914" : "#2A2A2E" }}
              data-testid="button-tour-next"
            >
              {isLast ? "Finish Tour" : "Next"}
              {!isLast && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </motion.button>

            {/* Exit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              className="text-xs px-3 py-1.5 rounded-lg border"
              style={{ color: "#7A7A7A", borderColor: "#2A2A2E", background: "transparent" }}
              data-testid="button-tour-exit"
            >
              Exit
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
