import { motion } from "framer-motion";
import type { SectionId } from "@/components/MainHub";

const sectionNames: Record<SectionId, string> = {
  soulsync: "SoulSync Companion",
  recovery: "Daily Recovery",
  psychologists: "Psychologist Connect",
  breathing: "Breathing & Grounding",
  ambient: "Ambient Soundscapes",
  agents: "AI Agent Network",
  debate: "Neural Debate Arena",
  dashboard: "Strategic Dashboard",
  terminal: "AI Terminal",
  "neural-arch": "Neural Architecture",
  research: "Research Intelligence",
  "career-galaxy": "Career Galaxy",
  "career-cards": "Opportunity Cards",
  "future-self": "Future Self Simulator",
  "network-engine": "Network Engine",
  study: "Study Command Center",
  universe: "Neural Universe",
  "focus-sprint": "Focus Sprint",
  workflows: "Workflow Universe",
  "decision-sim": "Decision Simulator",
  finance: "Finance Projector",
  "automation-builder": "Automation Builder",
  profile: "My Profile",
  subscription: "Subscription & Plans",
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
}

export default function HubNav({ section, onBack, user, onProfile, onSubscription }: Props) {
  const color = sectionColors[section] ?? "#E50914";
  const planColors: Record<string, string> = { free: "#7A7A7A", pro: "#F59E0B", elite: "#E50914" };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[200] px-5 py-3 flex items-center justify-between border-b"
      style={{ background: "rgba(11,11,15,0.92)", borderColor: "#2A2A2E", backdropFilter: "blur(20px)" }}
    >
      {/* Back button + section name */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all"
          style={{ color: "#B3B3B3", borderColor: "#2A2A2E", background: "#141414" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Hub
        </motion.button>

        <div className="hidden md:flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#7A7A7A" }} />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            <span className="text-sm font-black" style={{ color: "#fff", fontFamily: "'Syne', sans-serif" }}>
              {sectionNames[section]}
            </span>
          </div>
        </div>
      </div>

      {/* Center: APEX logo */}
      <button onClick={onBack} className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        <div className="relative">
          <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ background: "#E50914" }}>
            <span className="text-white font-black text-xs" style={{ fontFamily: "'Syne', sans-serif" }}>A</span>
          </div>
          <div className="absolute inset-0 blur-md opacity-60" style={{ background: "#E50914" }} />
        </div>
        <span className="text-white font-black tracking-widest text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
          APEX<span style={{ color: "#E50914" }}>OS</span>
        </span>
      </button>

      {/* Right: user info */}
      <div className="flex items-center gap-3">
        <div
          className="hidden md:flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border font-semibold"
          style={{ color: planColors[user.plan] ?? "#7A7A7A", borderColor: (planColors[user.plan] ?? "#7A7A7A") + "30", background: (planColors[user.plan] ?? "#7A7A7A") + "10" }}
        >
          {user.plan.toUpperCase()}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onProfile}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
          style={{ background: "linear-gradient(135deg, #E50914, #5865F2)" }}
        >
          {(user.name[0] ?? "U").toUpperCase()}
        </motion.button>
      </div>
    </motion.nav>
  );
}
