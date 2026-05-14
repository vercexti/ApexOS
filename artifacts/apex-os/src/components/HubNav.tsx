import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionId } from "@/components/MainHub";

interface NavSection {
  id: SectionId;
  name: string;
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
    label: "Wellness", color: "#8B5CF6",
    sections: [
      { id: "soulsync",      name: "SoulSync Companion",   icon: "◈", hot: true },
      { id: "recovery",      name: "Daily Recovery",        icon: "◉" },
      { id: "psychologists", name: "Psychologist Connect",  icon: "◎" },
      { id: "breathing",     name: "Breathing & Grounding", icon: "◇" },
      { id: "ambient",       name: "Ambient Soundscapes",   icon: "◆" },
    ],
  },
  {
    label: "Intelligence", color: "#E50914",
    sections: [
      { id: "agents",      name: "AI Agent Network",     icon: "◈", hot: true },
      { id: "debate",      name: "Neural Debate Arena",  icon: "◉" },
      { id: "dashboard",   name: "Strategic Dashboard",  icon: "◆" },
      { id: "terminal",    name: "AI Terminal",          icon: "◎" },
      { id: "neural-arch", name: "Neural Architecture",  icon: "◇" },
      { id: "research",    name: "Research Intelligence", icon: "◈" },
    ],
  },
  {
    label: "Career", color: "#10B981",
    sections: [
      { id: "career-galaxy",  name: "Career Galaxy",          icon: "◎" },
      { id: "career-cards",   name: "Opportunity Cards",       icon: "◉" },
      { id: "future-self",    name: "Future Self Simulator",   icon: "◆" },
      { id: "network-engine", name: "Network Engine",          icon: "◇" },
    ],
  },
  {
    label: "Learning", color: "#5865F2",
    sections: [
      { id: "study",        name: "Study Command Center", icon: "◈" },
      { id: "universe",     name: "Neural Universe",      icon: "◉" },
      { id: "focus-sprint", name: "Focus Sprint",         icon: "◎" },
    ],
  },
  {
    label: "Automation", color: "#A78BFA",
    sections: [
      { id: "workflows",          name: "Workflow Universe",   icon: "◇", hot: true },
      { id: "decision-sim",       name: "Decision Simulator",  icon: "◆" },
      { id: "finance",            name: "Finance Projector",   icon: "◈" },
      { id: "automation-builder", name: "Automation Builder",  icon: "◉" },
    ],
  },
];

const sectionNames: Record<SectionId, string> = {
  soulsync: "SoulSync Companion", recovery: "Daily Recovery",
  psychologists: "Psychologist Connect", breathing: "Breathing & Grounding",
  ambient: "Ambient Soundscapes", agents: "AI Agent Network",
  debate: "Neural Debate Arena", dashboard: "Strategic Dashboard",
  terminal: "AI Terminal", "neural-arch": "Neural Architecture",
  research: "Research Intelligence", "career-galaxy": "Career Galaxy",
  "career-cards": "Opportunity Cards", "future-self": "Future Self Simulator",
  "network-engine": "Network Engine", study: "Study Command Center",
  universe: "Neural Universe", "focus-sprint": "Focus Sprint",
  workflows: "Workflow Universe", "decision-sim": "Decision Simulator",
  finance: "Finance Projector", "automation-builder": "Automation Builder",
  profile: "My Profile", subscription: "Subscription & Plans",
  onboarding: "Neural Onboarding",
};

const sectionColors: Partial<Record<SectionId, string>> = {
  soulsync: "#8B5CF6", recovery: "#5865F2", psychologists: "#EC4899",
  breathing: "#7C3AED", ambient: "#6D28D9",
  agents: "#E50914", debate: "#E50914", dashboard: "#5865F2",
  terminal: "#10B981", "neural-arch": "#5865F2", research: "#E50914",
  "career-galaxy": "#10B981", "career-cards": "#10B981", "future-self": "#F59E0B",
  "network-engine": "#EC4899", study: "#5865F2", universe: "#A78BFA",
  "focus-sprint": "#F59E0B", workflows: "#A78BFA", "decision-sim": "#06B6D4",
  finance: "#34D399", "automation-builder": "#F97316",
  profile: "#7A7A7A", subscription: "#F59E0B", onboarding: "#8B5CF6",
};

interface Props {
  section: SectionId;
  onBack: () => void;
  user: { name: string; plan: string };
  onProfile: () => void;
  onSubscription: () => void;
  onSection: (id: SectionId) => void;
}

export default function HubNav({ section, onBack, user, onProfile, onSubscription, onSection }: Props) {
  const [openCat, setOpenCat] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const accentColor = sectionColors[section] ?? "#E50914";
  const planColor = user.plan === "elite" ? "#E50914" : user.plan === "pro" ? "#F59E0B" : "#7A7A7A";
  const activeCat = navCategories.find((c) => c.label === openCat);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenCat(label);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenCat(null), 120);
  };

  const go = (id: SectionId) => { setOpenCat(null); onSection(id); };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[300] border-b"
        style={{ background: "rgba(9,9,15,0.95)", borderColor: "#1E1E24", backdropFilter: "blur(24px)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }} />

        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          {/* Left: back + current section */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold"
              style={{ color: "#B3B3B3", borderColor: "#2A2A2E", background: "#141414" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 2L3 5L7 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Hub
            </motion.button>

            <div className="hidden md:flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ background: "#2A2A2E" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
              <span className="text-sm font-black" style={{ color: "#fff", fontFamily: "'Syne', sans-serif" }}>
                {sectionNames[section]}
              </span>
            </div>
          </div>

          {/* Center: category nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navCategories.map((cat) => (
              <div
                key={cat.label}
                onMouseEnter={() => handleMouseEnter(cat.label)}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    color: openCat === cat.label ? cat.color : "#7A7A7A",
                    background: openCat === cat.label ? cat.color + "12" : "transparent",
                  }}
                >
                  <span style={{ color: cat.color, fontSize: 8 }}>●</span>
                  {cat.label}
                  <svg width="7" height="7" viewBox="0 0 8 8" fill="none" style={{ transform: openCat === cat.label ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </nav>

          {/* Right: plan + avatar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onSubscription}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold border"
              style={{ color: planColor, borderColor: planColor + "40", background: planColor + "10" }}
            >
              {user.plan === "free" ? "Upgrade" : user.plan.toUpperCase()}
            </button>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={onProfile}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #E50914, #5865F2)" }}
            >
              {(user.name[0] ?? "U").toUpperCase()}
            </motion.button>
          </div>
        </div>

        {/* Dropdown panel */}
        <AnimatePresence>
          {openCat && activeCat && (
            <motion.div
              key={openCat}
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute left-0 right-0 border-b origin-top"
              style={{ top: "100%", background: "rgba(9,9,15,0.98)", borderColor: "#1E1E24", backdropFilter: "blur(24px)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${activeCat.color}, transparent)` }} />
              <div className="max-w-7xl mx-auto px-5 py-4">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {activeCat.sections.map((sec) => (
                    <motion.button
                      key={sec.id}
                      whileHover={{ y: -2, background: activeCat.color + "10" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => go(sec.id)}
                      className={`flex flex-col items-start gap-1.5 px-3 py-2.5 rounded-xl border text-left transition-all${section === sec.id ? " opacity-100" : " opacity-70 hover:opacity-100"}`}
                      style={{
                        borderColor: section === sec.id ? activeCat.color + "50" : "transparent",
                        background: section === sec.id ? activeCat.color + "10" : "transparent",
                      }}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: activeCat.color + "18", color: activeCat.color }}>
                        {sec.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-white leading-tight">{sec.name}</div>
                        {sec.hot && <span className="text-[8px] font-bold" style={{ color: "#F59E0B" }}>HOT</span>}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
