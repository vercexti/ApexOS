import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SectionId =
  | "soulsync" | "recovery" | "psychologists" | "breathing" | "ambient"
  | "agents" | "debate" | "dashboard" | "terminal" | "neural-arch" | "research"
  | "career-galaxy" | "career-cards" | "future-self" | "network-engine"
  | "study" | "universe" | "focus-sprint"
  | "workflows" | "decision-sim" | "finance" | "automation-builder"
  | "profile" | "subscription" | "onboarding";

interface HubSection {
  id: SectionId;
  category: string;
  name: string;
  desc: string;
  color: string;
  icon: string;
  hot?: boolean;
  pro?: boolean;
}

const sections: HubSection[] = [
  // WELLNESS
  { id: "soulsync", category: "Wellness", name: "SoulSync Companion", desc: "Emotionally intelligent AI · Sage adapts to your needs", color: "#8B5CF6", icon: "◈", hot: true },
  { id: "recovery", category: "Wellness", name: "Daily Recovery", desc: "Quests, mood tracking, XP streaks", color: "#5865F2", icon: "◉" },
  { id: "psychologists", category: "Wellness", name: "Psychologist Connect", desc: "Verified professionals from $12/session", color: "#EC4899", icon: "◎" },
  { id: "breathing", category: "Wellness", name: "Breathing & Grounding", desc: "4-4-6 protocol · Anxiety reduction exercises", color: "#7C3AED", icon: "◇" },
  { id: "ambient", category: "Wellness", name: "Ambient Soundscapes", desc: "Focus, calm, sleep audio streams", color: "#6D28D9", icon: "◆" },
  // INTELLIGENCE
  { id: "agents", category: "Intelligence", name: "AI Agent Network", desc: "11 autonomous intelligences · Click to activate", color: "#E50914", icon: "◈", hot: true },
  { id: "debate", category: "Intelligence", name: "Neural Debate Arena", desc: "Agents debate your decisions in real time", color: "#E50914", icon: "◉" },
  { id: "dashboard", category: "Intelligence", name: "Strategic Dashboard", desc: "Live metrics, neural heatmap, agent stream", color: "#5865F2", icon: "◆" },
  { id: "terminal", category: "Intelligence", name: "AI Terminal", desc: "Neural command interface · analyze, simulate, deploy", color: "#10B981", icon: "◎" },
  { id: "neural-arch", category: "Intelligence", name: "Neural Architecture", desc: "Cognitive system visualization · live thought map", color: "#5865F2", icon: "◇" },
  { id: "research", category: "Intelligence", name: "Research Intelligence", desc: "Deep scan 10,000+ sources · A+ grade reports", color: "#E50914", icon: "◈", pro: true },
  // CAREER
  { id: "career-galaxy", category: "Career", name: "Career Galaxy", desc: "Cosmic career path map · interactive node system", color: "#10B981", icon: "◎" },
  { id: "career-cards", category: "Career", name: "Opportunity Cards", desc: "Netflix-style career browser · fullscreen modal", color: "#10B981", icon: "◉" },
  { id: "future-self", category: "Career", name: "Future Self Simulator", desc: "1 / 3 / 5 year projection engine", color: "#F59E0B", icon: "◆" },
  { id: "network-engine", category: "Career", name: "Network Engine", desc: "High-value connection finder · 34% reply rate", color: "#EC4899", icon: "◇", pro: true },
  // LEARNING
  { id: "study", category: "Learning", name: "Study Command Center", desc: "Mission-control for accelerated learning", color: "#5865F2", icon: "◈" },
  { id: "universe", category: "Learning", name: "Neural Universe", desc: "Knowledge cosmos · interactive concept clusters", color: "#A78BFA", icon: "◉" },
  { id: "focus-sprint", category: "Learning", name: "Focus Sprint", desc: "25-min deep work engine · ADHD-friendly", color: "#F59E0B", icon: "◎" },
  // AUTOMATION
  { id: "workflows", category: "Automation", name: "Workflow Universe", desc: "6 autonomous workflow engines · execute live", color: "#A78BFA", icon: "◇", hot: true },
  { id: "decision-sim", category: "Automation", name: "Decision Simulator", desc: "200-scenario Monte Carlo · stress-test choices", color: "#06B6D4", icon: "◆" },
  { id: "finance", category: "Automation", name: "Finance Projector", desc: "Wealth trajectory · $1M+ path simulation", color: "#34D399", icon: "◈", pro: true },
  { id: "automation-builder", category: "Automation", name: "Automation Builder", desc: "Custom workflow architect · deploy instantly", color: "#F97316", icon: "◉" },
  // PERSONAL
  { id: "profile", category: "Personal", name: "My Profile", desc: "Account, achievements, neural score", color: "#7A7A7A", icon: "◎" },
  { id: "subscription", category: "Personal", name: "Subscription & Plans", desc: "Free → Pro → Elite · unlock full OS", color: "#F59E0B", icon: "◆" },
  { id: "onboarding", category: "Personal", name: "Neural Onboarding", desc: "Personalize your OS intelligence profile", color: "#8B5CF6", icon: "◇" },
];

const categories = ["All", "Wellness", "Intelligence", "Career", "Learning", "Automation", "Personal"];
const categoryColors: Record<string, string> = {
  Wellness: "#8B5CF6", Intelligence: "#E50914", Career: "#10B981",
  Learning: "#5865F2", Automation: "#A78BFA", Personal: "#7A7A7A",
};

interface Props {
  onSection: (id: SectionId) => void;
  user: { name: string; plan: string };
}

export default function MainHub({ onSection, user }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = sections.filter((s) => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const stats = [
    { label: "Agents Online", value: "11 / 11", color: "#10B981" },
    { label: "Sections Live", value: "25", color: "#E50914" },
    { label: "Your Plan", value: user.plan === "pro" ? "Pro" : user.plan === "elite" ? "Elite" : "Free", color: user.plan === "free" ? "#7A7A7A" : "#F59E0B" },
    { label: "System Uptime", value: "99.97%", color: "#5865F2" },
  ];

  return (
    <div className="min-h-screen px-6 py-8" style={{ background: "#0B0B0F" }}>
      {/* CRT grain */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)", backgroundSize: "100% 4px" }} />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 8, repeat: Infinity }} className="absolute rounded-full blur-[140px]" style={{ width: 600, height: 600, left: "20%", top: "-10%", background: "#E50914" }} />
        <motion.div animate={{ opacity: [0.02, 0.05, 0.02] }} transition={{ duration: 10, repeat: Infinity, delay: 3 }} className="absolute rounded-full blur-[100px]" style={{ width: 400, height: 400, right: "10%", bottom: "20%", background: "#5865F2" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Welcome header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="text-xs font-mono mb-1" style={{ color: "#E50914" }}>
                APEX OS · COMMAND CENTER
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                Welcome back, <span style={{ color: "#E50914" }}>{user.name}</span>
              </h1>
              <div className="text-sm mt-1" style={{ color: "#7A7A7A" }}>
                Your intelligence ecosystem is fully operational.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: "#10B981" }}
              />
              <span className="text-xs font-mono" style={{ color: "#10B981" }}>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Status bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border px-4 py-3"
                style={{ background: "#141414", borderColor: "#2A2A2E" }}
              >
                <div className="text-lg font-black" style={{ color: s.color, fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
                <div className="text-[10px] tracking-wide" style={{ color: "#7A7A7A" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#7A7A7A" strokeWidth="1.2" />
              <path d="M9.5 9.5L12 12" stroke="#7A7A7A" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sections, features, agents…"
              className="w-full rounded-xl border pl-10 pr-4 py-3 text-sm outline-none transition-all"
              style={{ background: "#141414", borderColor: search ? "rgba(229,9,20,0.4)" : "#2A2A2E", color: "#fff" }}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  background: activeCategory === cat ? (categoryColors[cat] ?? "#E50914") + "20" : "transparent",
                  borderColor: activeCategory === cat ? (categoryColors[cat] ?? "#E50914") + "60" : "#2A2A2E",
                  color: activeCategory === cat ? (categoryColors[cat] ?? "#E50914") : "#7A7A7A",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Section cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((section, i) => {
              const locked = section.pro && user.plan === "free";
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -3, boxShadow: `0 8px 30px ${section.color}20` }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => locked ? onSection("subscription") : onSection(section.id)}
                  className="relative rounded-xl border p-5 cursor-pointer overflow-hidden group transition-all duration-300"
                  style={{ background: "#141414", borderColor: "#2A2A2E" }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at 30% 30%, ${section.color}08 0%, transparent 60%)` }} />

                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${section.color}, transparent)` }} />

                  {/* Category pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ color: categoryColors[section.category] ?? "#7A7A7A", background: (categoryColors[section.category] ?? "#7A7A7A") + "15" }}>
                      {section.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {section.hot && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: "#F59E0B", background: "rgba(245,158,11,0.15)" }}>HOT</span>
                      )}
                      {locked && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: "#7A7A7A", background: "#1C1C1F" }}>PRO</span>
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black mb-3" style={{ background: section.color + "20", color: section.color }}>
                    {section.icon}
                  </div>

                  {/* Name + desc */}
                  <div className="font-black text-sm text-white mb-1.5" style={{ fontFamily: "'Syne', sans-serif" }}>{section.name}</div>
                  <div className="text-[11px] leading-relaxed mb-4" style={{ color: "#7A7A7A" }}>{section.desc}</div>

                  {/* Enter indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: locked ? "#7A7A7A" : "#10B981" }} />
                      <span className="text-[10px]" style={{ color: locked ? "#7A7A7A" : "#10B981" }}>{locked ? "Pro Required" : "Live"}</span>
                    </div>
                    <motion.div className="flex items-center gap-1 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: section.color }}>
                      {locked ? "Upgrade" : "Enter"}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5H8M5.5 2.5L8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                    style={{ background: `linear-gradient(90deg, ${section.color}, transparent)` }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: "#7A7A7A" }}>
            <div className="text-4xl mb-3" style={{ color: "#2A2A2E" }}>◎</div>
            <div className="text-sm">No sections match "{search}"</div>
          </div>
        )}

        {/* Bottom status */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border" style={{ color: "#7A7A7A", borderColor: "#2A2A2E", background: "#141414" }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
            APEX OS v2.0 · {sections.length} sections · Neural core online
          </div>
        </motion.div>
      </div>
    </div>
  );
}
