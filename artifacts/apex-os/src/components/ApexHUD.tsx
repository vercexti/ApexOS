import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const agentMessages = [
  { agent: "Career Agent", msg: "Mapping 3 optimal role transitions…", color: "#10B981" },
  { agent: "Trend Agent", msg: "AI opportunity window closing in 16 months", color: "#E50914" },
  { agent: "Research Agent", msg: "Ingested 847 market signals today", color: "#5865F2" },
  { agent: "Finance Agent", msg: "Wealth trajectory updated: +$340K", color: "#F59E0B" },
  { agent: "Strategy Agent", msg: "Running 200 decision simulations…", color: "#06B6D4" },
  { agent: "Study Agent", msg: "Neural plan 78% optimized", color: "#A78BFA" },
  { agent: "Automation Agent", msg: "Workflow saved 4.2h this week", color: "#F97316" },
  { agent: "Networking Agent", msg: "23 high-value connections identified", color: "#EC4899" },
];

const sections = [
  "Prologue", "Hero", "Neural Core", "Agent Debate",
  "Cognition", "Neural Universe", "Career Galaxy",
  "Career Paths", "Study", "Workflows", "Future Self", "Finale",
];

interface Props {
  onboardingComplete: boolean;
  onboardingProfile: { ambition?: string; stage?: string; priority?: string };
}

export default function ApexHUD({ onboardingComplete, onboardingProfile }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [intelligenceScore, setIntelligenceScore] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const scoreRef = useRef(0);
  const targetRef = useRef(0);

  // Rotate agent messages
  useEffect(() => {
    const interval = setInterval(() => setMsgIdx((i) => (i + 1) % agentMessages.length), 3500);
    return () => clearInterval(interval);
  }, []);

  // Intelligence score from scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      targetRef.current = Math.round(scrollPct * 1000);

      const sectionCount = sections.length;
      setActiveSection(Math.min(sectionCount - 1, Math.floor(scrollPct * sectionCount)));
    };
    window.addEventListener("scroll", onScroll);

    const lerp = setInterval(() => {
      const diff = targetRef.current - scoreRef.current;
      if (Math.abs(diff) > 0.5) {
        scoreRef.current += diff * 0.06;
        setIntelligenceScore(Math.round(scoreRef.current));
      }
    }, 16);

    return () => { window.removeEventListener("scroll", onScroll); clearInterval(lerp); };
  }, []);

  const profileLabels: Record<string, string> = {
    startup: "Startup Founder",
    career: "Career Climber",
    skill: "Skill Master",
    wealth: "Wealth Builder",
    student: "Student",
    early: "Early Career",
    mid: "Mid Career",
    pivot: "Transitioning",
    intel: "Career Intel",
    learn: "Learner",
    finance: "Finance",
    auto: "Automation",
  };

  const msg = agentMessages[msgIdx];

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border overflow-hidden w-72"
            style={{ background: "rgba(11,11,15,0.97)", borderColor: "rgba(229,9,20,0.3)", backdropFilter: "blur(20px)" }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b flex items-center justify-between"
              style={{ borderColor: "#2A2A2E", background: "rgba(229,9,20,0.05)" }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#E50914" }}
                />
                <span className="text-xs font-black tracking-widest uppercase text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  APEX HUD
                </span>
              </div>
              <span className="text-[10px] font-mono" style={{ color: "#7A7A7A" }}>Live Intelligence</span>
            </div>

            {/* Intelligence Score */}
            <div className="px-4 py-4 border-b" style={{ borderColor: "#2A2A2E" }}>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#7A7A7A" }}>Intelligence Score</div>
                  <motion.div
                    key={intelligenceScore}
                    className="text-3xl font-black"
                    style={{ color: "#E50914", fontFamily: "'Syne', sans-serif" }}
                  >
                    {intelligenceScore.toString().padStart(4, "0")}
                  </motion.div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#7A7A7A" }}>Section</div>
                  <div className="text-xs font-semibold text-white">{sections[activeSection]}</div>
                </div>
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "#2A2A2E" }}>
                <motion.div
                  animate={{ width: `${intelligenceScore / 10}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #E50914, #FF3B47)" }}
                />
              </div>
            </div>

            {/* Live Agent Activity */}
            <div className="px-4 py-3 border-b" style={{ borderColor: "#2A2A2E" }}>
              <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>Live Agent Activity</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={msgIdx}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: msg.color }}
                  />
                  <div>
                    <div className="text-[10px] font-bold mb-0.5" style={{ color: msg.color }}>{msg.agent}</div>
                    <div className="text-xs" style={{ color: "#B3B3B3" }}>{msg.msg}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Profile */}
            {onboardingComplete && (
              <div className="px-4 py-3 border-b" style={{ borderColor: "#2A2A2E" }}>
                <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>Your Profile</div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.values(onboardingProfile).map((v) => v && (
                    <span
                      key={v}
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: "rgba(229,9,20,0.12)", color: "#E50914", border: "1px solid rgba(229,9,20,0.25)" }}
                    >
                      {profileLabels[v] ?? v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Section dots */}
            <div className="px-4 py-3">
              <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>Journey Progress</div>
              <div className="flex flex-wrap gap-1.5">
                {sections.map((s, i) => (
                  <motion.div
                    key={s}
                    className="w-2 h-2 rounded-full cursor-default"
                    title={s}
                    animate={{
                      background: i < activeSection ? "#E50914" : i === activeSection ? "#FF3B47" : "#2A2A2E",
                      scale: i === activeSection ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setExpanded((e) => !e)}
        className="relative w-12 h-12 rounded-full flex items-center justify-center border"
        style={{
          background: expanded ? "rgba(229,9,20,0.15)" : "rgba(11,11,15,0.95)",
          borderColor: expanded ? "rgba(229,9,20,0.5)" : "rgba(229,9,20,0.3)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 20px rgba(229,9,20,0.2)",
        }}
        data-testid="button-apex-hud"
        aria-label="Toggle APEX HUD"
      >
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {expanded ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="#E50914" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#E50914" opacity="0.9" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#E50914" opacity="0.5" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#E50914" opacity="0.5" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#E50914" opacity="0.25" />
            </svg>
          )}
        </motion.div>
        {/* Pulse ring */}
        {!expanded && (
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: "#E50914" }}
          />
        )}
        {/* Score badge */}
        {!expanded && intelligenceScore > 0 && (
          <div
            className="absolute -top-1 -right-1 text-[9px] font-black rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center"
            style={{ background: "#E50914", color: "#fff", fontFamily: "'Syne', sans-serif" }}
          >
            {Math.floor(intelligenceScore / 100)}
          </div>
        )}
      </motion.button>
    </div>
  );
}
