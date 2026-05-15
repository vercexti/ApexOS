import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionId } from "@/components/MainHub";

interface NavSection {
  id: SectionId;
  name: string;
  desc: string;
  icon: string;
  hot?: boolean;
}

interface NavCategory {
  label: string;
  color: string;
  sections: NavSection[];
}

const navCategories: NavCategory[] = [
  {
    label: "Wellness",
    color: "#8B5CF6",
    sections: [
      { id: "soulsync",      name: "SoulSync Companion",   desc: "Emotionally intelligent AI",       icon: "◈", hot: true },
      { id: "recovery",      name: "Daily Recovery",        desc: "Quests, mood, XP streaks",         icon: "◉" },
      { id: "psychologists", name: "Psychologist Connect",  desc: "Verified pros from $12/session",   icon: "◎" },
      { id: "breathing",     name: "Breathing & Grounding", desc: "4-4-6 anxiety protocol",           icon: "◇" },
      { id: "ambient",       name: "Ambient Soundscapes",   desc: "Focus, calm & sleep audio",        icon: "◆" },
    ],
  },
  {
    label: "Intelligence",
    color: "#F97316",
    sections: [
      { id: "agents",      name: "AI Agent Network",     desc: "11 autonomous intelligences",     icon: "◈", hot: true },
      { id: "debate",      name: "Neural Debate Arena",  desc: "Agents debate your decisions",    icon: "◉" },
      { id: "dashboard",   name: "Strategic Dashboard",  desc: "Live metrics & neural heatmap",   icon: "◆" },
      { id: "terminal",    name: "AI Terminal",          desc: "Neural command interface",         icon: "◎" },
      { id: "neural-arch", name: "Neural Architecture",  desc: "Cognitive system visualization",  icon: "◇" },
      { id: "research",    name: "Research Intelligence", desc: "Deep scan 10,000+ sources",      icon: "◈" },
    ],
  },
  {
    label: "Career",
    color: "#10B981",
    sections: [
      { id: "career-galaxy",  name: "Career Galaxy",            desc: "Cosmic career path map",          icon: "◎", hot: true },
      { id: "career-cards",   name: "Opportunity Cards",       desc: "Netflix-style career browser",    icon: "◉" },
      { id: "future-self",    name: "Future Self Simulator",   desc: "1 / 3 / 5 year projection",      icon: "◆" },
      { id: "network-engine", name: "Network Engine",          desc: "High-value connection finder",    icon: "◇" },
    ],
  },
  {
    label: "Learning",
    color: "#5865F2",
    sections: [
      { id: "study",        name: "Study Command Center", desc: "Mission-control for learning",  icon: "◈" },
      { id: "universe",     name: "Neural Universe",      desc: "Knowledge cosmos visualization", icon: "◉" },
      { id: "focus-sprint", name: "Focus Sprint",         desc: "25-min ADHD-friendly timer",    icon: "◎" },
    ],
  },
  {
    label: "Automation",
    color: "#A78BFA",
    sections: [
      { id: "workflows",          name: "Workflow Universe",   desc: "6 autonomous engines",          icon: "◇", hot: true },
      { id: "decision-sim",       name: "Decision Simulator",  desc: "Monte Carlo scenario testing",  icon: "◆" },
      { id: "finance",            name: "Finance Projector",   desc: "Wealth trajectory simulation",  icon: "◈" },
      { id: "automation-builder", name: "Automation Builder",  desc: "Custom workflow architect",     icon: "◉" },
    ],
  },
];

interface Props {
  user: { name: string; plan: string };
  onSection: (id: SectionId) => void;
}

export default function HubHeader({ user, onSection }: Props) {
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const planColor = user.plan === "elite" ? "#E50914" : user.plan === "pro" ? "#F59E0B" : "#7A7A7A";

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenCat(label);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenCat(null), 120);
  };

  const go = (id: SectionId) => {
    setOpenCat(null);
    setMobileOpen(false);
    onSection(id);
  };

  const activeCat = navCategories.find((c) => c.label === openCat);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[300] border-b"
        style={{ background: "rgba(9,9,15,0.95)", borderColor: "#1E1E24", backdropFilter: "blur(24px)" }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #8B5CF6, #5865F2, transparent)" }} />

        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-6">
          {/* Logo */}
          <button onClick={() => setMobileOpen(false)} className="flex items-center gap-2 shrink-0">
            <div className="relative" style={{ width: 28, height: 28 }}>
              <div className="absolute inset-0 rounded-lg blur-md opacity-80" style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }} />
              <div className="relative w-full h-full rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}>
                <span className="text-white font-black text-sm">◈</span>
              </div>
            </div>
            <span className="font-black tracking-widest text-sm" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
              SOUL<span style={{ color: "#8B5CF6" }}>SYNC</span>
            </span>
          </button>

          {/* Desktop nav categories */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navCategories.map((cat) => (
              <div
                key={cat.label}
                onMouseEnter={() => handleMouseEnter(cat.label)}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <button
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    color: openCat === cat.label ? cat.color : "#B3B3B3",
                    background: openCat === cat.label ? cat.color + "12" : "transparent",
                  }}
                >
                  <span style={{ color: cat.color, fontSize: 9 }}>●</span>
                  {cat.label}
                  <svg
                    width="8" height="8" viewBox="0 0 8 8" fill="none"
                    style={{ transform: openCat === cat.label ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                  >
                    <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </nav>

          {/* Right: plan + avatar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Subscription */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => go("subscription")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all"
              style={{ color: planColor, borderColor: planColor + "40", background: planColor + "10" }}
            >
              {user.plan === "free" ? (
                <>
                  <span>Upgrade</span>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 1L7 4L4 7M1 4H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </>
              ) : (
                <>{user.plan.toUpperCase()}</>
              )}
            </motion.button>

            {/* Profile avatar */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => go("profile")}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #E50914, #5865F2)" }}
              title={user.name}
            >
              {(user.name[0] ?? "U").toUpperCase()}
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            >
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }} className="block w-5 h-px" style={{ background: "#B3B3B3" }} />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="block w-5 h-px" style={{ background: "#B3B3B3" }} />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }} className="block w-5 h-px" style={{ background: "#B3B3B3" }} />
            </button>
          </div>
        </div>

        {/* Desktop dropdown panel */}
        <AnimatePresence>
          {openCat && activeCat && (
            <motion.div
              key={openCat}
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute left-0 right-0 border-b origin-top"
              style={{ top: "100%", background: "rgba(9,9,15,0.98)", borderColor: "#1E1E24", backdropFilter: "blur(24px)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${activeCat.color}, transparent)` }} />

              <div className="max-w-7xl mx-auto px-5 py-5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {activeCat.sections.map((sec) => (
                    <motion.button
                      key={sec.id}
                      whileHover={{ x: 3, background: activeCat.color + "0D" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => go(sec.id)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border border-transparent hover:border-[#2A2A2E]"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                        style={{ background: activeCat.color + "18", color: activeCat.color }}
                      >
                        {sec.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-white truncate">{sec.name}</span>
                          {sec.hot && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0" style={{ color: "#F59E0B", background: "rgba(245,158,11,0.15)" }}>HOT</span>
                          )}
                        </div>
                        <div className="text-xs truncate mt-0.5" style={{ color: "#7A7A7A" }}>{sec.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer row */}
                <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: "#1E1E24" }}>
                  <span className="text-xs font-mono" style={{ color: "#7A7A7A" }}>
                    {activeCat.sections.length} sections · {activeCat.label} module
                  </span>
                  <motion.button
                    whileHover={{ x: 2 }}
                    onClick={() => go(activeCat.sections[0]!.id)}
                    className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: activeCat.color }}
                  >
                    Enter {activeCat.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5H8M5.5 2.5L8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[299] overflow-y-auto pt-14"
            style={{ background: "rgba(9,9,15,0.98)" }}
          >
            <div className="px-5 py-6 space-y-2">
              {navCategories.map((cat) => (
                <div key={cat.label} className="rounded-xl overflow-hidden border" style={{ borderColor: "#1E1E24" }}>
                  <button
                    onClick={() => setMobileExpanded((e) => e === cat.label ? null : cat.label)}
                    className="w-full flex items-center justify-between px-4 py-3"
                    style={{ background: "#141418" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                      <span className="text-sm font-bold text-white">{cat.label}</span>
                      <span className="text-xs" style={{ color: "#7A7A7A" }}>{cat.sections.length} sections</span>
                    </div>
                    <motion.svg
                      animate={{ rotate: mobileExpanded === cat.label ? 180 : 0 }}
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M2 4L6 8L10 4" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === cat.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                        style={{ background: "#0C0C12" }}
                      >
                        {cat.sections.map((sec) => (
                          <button
                            key={sec.id}
                            onClick={() => go(sec.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 border-t text-left"
                            style={{ borderColor: "#1E1E24" }}
                          >
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0" style={{ background: cat.color + "18", color: cat.color }}>
                              {sec.icon}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">{sec.name}</div>
                              <div className="text-xs" style={{ color: "#7A7A7A" }}>{sec.desc}</div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile account links */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => go("profile")} className="py-3 rounded-xl border text-sm font-semibold text-white text-center" style={{ borderColor: "#2A2A2E", background: "#141418" }}>
                  My Profile
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => go("subscription")} className="py-3 rounded-xl text-sm font-semibold text-white text-center" style={{ background: "#E50914" }}>
                  {user.plan === "free" ? "Upgrade Plan" : `${user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan`}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
