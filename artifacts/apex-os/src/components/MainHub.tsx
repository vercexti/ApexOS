import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SectionId =
  | "soulsync" | "recovery" | "psychologists" | "breathing" | "ambient"
  | "agents" | "debate" | "dashboard" | "terminal" | "neural-arch" | "research"
  | "career-galaxy" | "career-cards" | "future-self" | "network-engine"
  | "study" | "universe" | "focus-sprint"
  | "workflows" | "decision-sim" | "finance" | "automation-builder"
  | "profile" | "subscription" | "onboarding";

interface HubSection {
  id: SectionId; category: string; name: string; desc: string;
  color: string; icon: string; hot?: boolean; pro?: boolean;
}

const sections: HubSection[] = [
  { id: "soulsync", category: "Wellness", name: "SoulSync Companion", desc: "Emotionally intelligent AI · Sage adapts to your needs", color: "#8B5CF6", icon: "◈", hot: true },
  { id: "recovery", category: "Wellness", name: "Daily Recovery", desc: "Quests, mood tracking, XP streaks", color: "#5865F2", icon: "◉" },
  { id: "psychologists", category: "Wellness", name: "Psychologist Connect", desc: "Verified professionals from $12/session", color: "#EC4899", icon: "◎" },
  { id: "breathing", category: "Wellness", name: "Breathing & Grounding", desc: "4-4-6 protocol · Anxiety reduction exercises", color: "#7C3AED", icon: "◇" },
  { id: "ambient", category: "Wellness", name: "Ambient Soundscapes", desc: "Focus, calm, sleep audio streams", color: "#6D28D9", icon: "◆" },
  { id: "agents", category: "Intelligence", name: "AI Agent Network", desc: "11 autonomous intelligences · Click to activate", color: "#E50914", icon: "◈", hot: true },
  { id: "debate", category: "Intelligence", name: "Neural Debate Arena", desc: "Agents debate your decisions in real time", color: "#E50914", icon: "◉" },
  { id: "dashboard", category: "Intelligence", name: "Strategic Dashboard", desc: "Live metrics, neural heatmap, agent stream", color: "#5865F2", icon: "◆" },
  { id: "terminal", category: "Intelligence", name: "AI Terminal", desc: "Neural command interface · analyze, simulate, deploy", color: "#10B981", icon: "◎" },
  { id: "neural-arch", category: "Intelligence", name: "Neural Architecture", desc: "Cognitive system visualization · live thought map", color: "#5865F2", icon: "◇" },
  { id: "research", category: "Intelligence", name: "Research Intelligence", desc: "Deep scan 10,000+ sources · A+ grade reports", color: "#E50914", icon: "◈", pro: true },
  { id: "career-galaxy", category: "Career", name: "Career Galaxy", desc: "Cosmic career path map · interactive node system", color: "#10B981", icon: "◎" },
  { id: "career-cards", category: "Career", name: "Opportunity Cards", desc: "Netflix-style career browser · fullscreen modal", color: "#10B981", icon: "◉" },
  { id: "future-self", category: "Career", name: "Future Self Simulator", desc: "1 / 3 / 5 year projection engine", color: "#F59E0B", icon: "◆" },
  { id: "network-engine", category: "Career", name: "Network Engine", desc: "High-value connection finder · 34% reply rate", color: "#EC4899", icon: "◇", pro: true },
  { id: "study", category: "Learning", name: "Study Command Center", desc: "Mission-control for accelerated learning", color: "#5865F2", icon: "◈" },
  { id: "universe", category: "Learning", name: "Neural Universe", desc: "Knowledge cosmos · interactive concept clusters", color: "#A78BFA", icon: "◉" },
  { id: "focus-sprint", category: "Learning", name: "Focus Sprint", desc: "25-min deep work engine · ADHD-friendly", color: "#F59E0B", icon: "◎" },
  { id: "workflows", category: "Automation", name: "Workflow Universe", desc: "6 autonomous workflow engines · execute live", color: "#A78BFA", icon: "◇", hot: true },
  { id: "decision-sim", category: "Automation", name: "Decision Simulator", desc: "200-scenario Monte Carlo · stress-test choices", color: "#06B6D4", icon: "◆" },
  { id: "finance", category: "Automation", name: "Finance Projector", desc: "Wealth trajectory · $1M+ path simulation", color: "#34D399", icon: "◈", pro: true },
  { id: "automation-builder", category: "Automation", name: "Automation Builder", desc: "Custom workflow architect · deploy instantly", color: "#F97316", icon: "◉" },
  { id: "profile", category: "Personal", name: "My Profile", desc: "Account, achievements, neural score", color: "#7A7A7A", icon: "◎" },
  { id: "subscription", category: "Personal", name: "Subscription & Plans", desc: "Free → Pro → Elite · unlock full OS", color: "#F59E0B", icon: "◆" },
  { id: "onboarding", category: "Personal", name: "Neural Onboarding", desc: "Personalize your OS intelligence profile", color: "#8B5CF6", icon: "◇" },
];

const categories = ["All", "Wellness", "Intelligence", "Career", "Learning", "Automation", "Personal"];
const categoryColors: Record<string, string> = {
  Wellness: "#8B5CF6", Intelligence: "#E50914", Career: "#10B981",
  Learning: "#5865F2", Automation: "#A78BFA", Personal: "#7A7A7A",
};

// Animated counter hook
function useCounter(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [target, duration]);
  return val;
}

// SoulSync mini-viz: breathing orb
function SoulSyncViz() {
  const moods = ["Calm", "Grounded", "Focused", "Reflective", "Motivated"];
  const [mood, setMood] = useState(0);
  useEffect(() => { const t = setInterval(() => setMood((m) => (m + 1) % moods.length), 2800); return () => clearInterval(t); }, []);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        {[1, 0.7, 0.45].map((scale, i) => (
          <motion.div key={i} animate={{ scale: [scale, scale * 1.18, scale], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{ width: 120, height: 120, background: "radial-gradient(circle, #8B5CF6, #5865F2)", filter: "blur(2px)" }} />
        ))}
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-black"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)", boxShadow: "0 0 30px rgba(139,92,246,0.6)" }}>
          ◈
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={mood} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          className="mt-3 text-xs font-bold tracking-widest uppercase" style={{ color: "#A78BFA" }}>
          {moods[mood]} Mode Active
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-1.5 mt-2">
        {["😮‍💨", "🧘", "⚡", "🌙", "🔥"].map((e, i) => (
          <span key={i} className="text-sm opacity-60">{e}</span>
        ))}
      </div>
    </div>
  );
}

// Agent Network mini-viz: orbiting dots
const AGENT_NAMES = ["Research", "Career", "Strategy", "Finance", "Study", "Wellness", "Code", "Legal", "Network", "Creative", "Debate"];
function AgentViz() {
  const [active, setActive] = useState<number[]>([0, 3, 7]);
  useEffect(() => {
    const t = setInterval(() => {
      setActive(prev => {
        const next = [...prev];
        const toggle = Math.floor(Math.random() * 11);
        return next.includes(toggle) ? next.filter(n => n !== toggle) : [...next, toggle].slice(-4);
      });
    }, 1200);
    return () => clearInterval(t);
  }, []);

  const radius = 52;
  const cx = 68, cy = 68;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <svg width="136" height="136" viewBox="0 0 136 136">
        {/* Connection lines */}
        {active.map(i => {
          const angle = (i / 11) * Math.PI * 2 - Math.PI / 2;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          return <motion.line key={`line-${i}`} x1={cx} y1={cy} x2={x} y2={y}
            stroke="#E50914" strokeWidth="0.8" strokeOpacity="0.35"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />;
        })}
        {/* Outer nodes */}
        {AGENT_NAMES.map((name, i) => {
          const angle = (i / 11) * Math.PI * 2 - Math.PI / 2;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          const isActive = active.includes(i);
          return (
            <g key={name}>
              {isActive && <motion.circle cx={x} cy={y} r={8} fill="#E50914" opacity={0.15}
                animate={{ r: [8, 13, 8] }} transition={{ duration: 1.2, repeat: Infinity }} />}
              <circle cx={x} cy={y} r={4} fill={isActive ? "#E50914" : "#2A2A2E"}
                stroke={isActive ? "#FF3B47" : "#3A3A3E"} strokeWidth="1" />
            </g>
          );
        })}
        {/* Center core */}
        <motion.circle cx={cx} cy={cy} r={14} fill="none" stroke="#E50914" strokeWidth="1.5" strokeOpacity="0.5"
          animate={{ r: [14, 18, 14] }} transition={{ duration: 2, repeat: Infinity }} />
        <circle cx={cx} cy={cy} r={10} fill="#E50914" fillOpacity="0.15" />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="#E50914" fontSize="10" fontWeight="bold">AI</text>
      </svg>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span key={active[0]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-[10px] font-mono" style={{ color: "#E50914" }}>
            {AGENT_NAMES[active[0] ?? 0]} Agent activated
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Workflow mini-viz: flowing pipeline
const WF_NODES = ["Trigger", "Analyze", "Execute", "Verify", "Deploy", "Report"];
function WorkflowViz() {
  const [step, setStep] = useState(0);
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % WF_NODES.length), 900); return () => clearInterval(t); }, []);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none px-6">
      <div className="flex items-center gap-0 w-full max-w-[200px]">
        {WF_NODES.map((node, i) => (
          <div key={node} className="flex items-center flex-1">
            <motion.div
              animate={{ scale: step === i ? 1.15 : 1, boxShadow: step === i ? `0 0 12px #A78BFA` : "none" }}
              className="flex-1 text-center rounded py-1 text-[9px] font-bold transition-all"
              style={{
                background: i < step ? "#A78BFA20" : step === i ? "#A78BFA30" : "#1C1C1F",
                color: i <= step ? "#A78BFA" : "#7A7A7A",
                border: `1px solid ${i <= step ? "#A78BFA40" : "#2A2A2E"}`,
              }}
            >
              {node}
            </motion.div>
            {i < WF_NODES.length - 1 && (
              <motion.div className="w-2 h-px" animate={{ background: i < step ? "#A78BFA" : "#2A2A2E" }} transition={{ duration: 0.3 }} />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-2">
        {["Daily Focus", "Research Pipeline", "Study Streak", "Finance Scan", "Network Reach", "Sleep Guard"].map((wf, i) => (
          <motion.div key={wf} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ color: "#A78BFA", background: "#A78BFA10" }}>
            {wf}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  onSection: (id: SectionId) => void;
  user: { name: string; plan: string };
}

const featuredSections = [
  { id: "soulsync" as SectionId, color: "#8B5CF6", grad: "from-[#0D0820] to-[#0A0B1A]", accent: "rgba(139,92,246,0.15)", label: "Wellness Core", title: "SoulSync Companion", subtitle: "Your emotionally intelligent AI. Sage adapts to every mood, challenge, and goal — in real time.", tags: ["Sage AI", "5 Modes", "Recovery Quests", "Psychologists"], Viz: SoulSyncViz },
  { id: "agents" as SectionId, color: "#E50914", grad: "from-[#150508] to-[#0B0B0F]", accent: "rgba(229,9,20,0.12)", label: "Intelligence Core", title: "AI Agent Network", subtitle: "11 autonomous intelligences running in parallel. Research, debate, strategize, and execute — simultaneously.", tags: ["11 Agents", "Live Debate", "Auto-Execute", "Neural Link"], Viz: AgentViz },
  { id: "workflows" as SectionId, color: "#A78BFA", grad: "from-[#100B1A] to-[#0A0B14]", accent: "rgba(167,139,250,0.12)", label: "Automation Core", title: "Workflow Universe", subtitle: "6 autonomous pipelines executing silently. Daily Focus, Research, Finance Scan — all running without you.", tags: ["6 Workflows", "Auto-Trigger", "Live Execution", "Zero Effort"], Viz: WorkflowViz },
];

export default function MainHub({ onSection, user }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const agentsCount = useCounter(11);
  const sectionsCount = useCounter(25, 1400);
  const uptimeCount = useCounter(9997, 1600);
  const usersCount = useCounter(12847, 1800);

  const nonFeatured = sections.filter(s => !["soulsync", "agents", "workflows"].includes(s.id));
  const filtered = nonFeatured.filter((s) => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ background: "#0B0B0F" }}>
      {/* Background dot grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ opacity: [0.04, 0.08, 0.04], x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute rounded-full blur-[160px]" style={{ width: 700, height: 500, left: "15%", top: "-5%", background: "#E50914" }} />
        <motion.div animate={{ opacity: [0.03, 0.06, 0.03], x: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity, delay: 4 }}
          className="absolute rounded-full blur-[120px]" style={{ width: 500, height: 400, right: "5%", bottom: "10%", background: "#8B5CF6" }} />
        <motion.div animate={{ opacity: [0.02, 0.05, 0.02] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute rounded-full blur-[100px]" style={{ width: 400, height: 300, left: "50%", bottom: "20%", background: "#5865F2" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 pb-16">

        {/* ── HERO ──────────────────────────────── */}
        <div className="pt-10 pb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* System badge */}
            <div className="flex items-center gap-2 mb-5">
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#10B981" }}>ALL SYSTEMS OPERATIONAL</span>
              <span className="text-xs font-mono" style={{ color: "#3A3A3E" }}>·</span>
              <span className="text-xs font-mono" style={{ color: "#7A7A7A" }}>APEX OS v2.0</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Welcome back,<br />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{ color: "#E50914", display: "inline-block" }}
              >
                {user.name}.
              </motion.span>
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-xl" style={{ color: "#7A7A7A" }}>
              Your intelligence ecosystem is fully operational. 11 agents active. Select a module to begin.
            </p>

            {/* Animated stat pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Agents", value: agentsCount, suffix: " online", color: "#10B981" },
                { label: "Sections", value: sectionsCount, suffix: " live", color: "#E50914" },
                { label: "Uptime", value: `${Math.floor(uptimeCount / 100)}.${uptimeCount % 100}`, suffix: "%", color: "#5865F2" },
                { label: "Users", value: usersCount.toLocaleString(), suffix: "", color: "#F59E0B" },
              ].map(({ label, value, suffix, color }) => (
                <motion.div key={label} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border"
                  style={{ background: color + "0A", borderColor: color + "30" }}>
                  <span className="font-black text-sm" style={{ color, fontFamily: "'Syne', sans-serif" }}>
                    {value}{suffix}
                  </span>
                  <span className="text-xs" style={{ color: "#7A7A7A" }}>{label}</span>
                </motion.div>
              ))}
              {user.plan === "free" && (
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => onSection("subscription")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #E50914)" }}>
                  Upgrade to Pro
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5H8M5.5 2.5L8 5L5.5 7.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── FEATURED CARDS ────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#7A7A7A" }}>Featured Modules</div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #2A2A2E, transparent)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredSections.map(({ id, color, grad, accent, label, title, subtitle, tags, Viz }, idx) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4, boxShadow: `0 20px 60px ${color}25` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSection(id)}
                onHoverStart={() => setHoveredCard(id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative rounded-2xl border cursor-pointer overflow-hidden group"
                style={{ background: `linear-gradient(160deg, ${grad.replace("from-", "").replace("to-", "").split(" ").join(", ")})`, borderColor: color + "30", minHeight: 280 }}
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />
                {/* Ambient bg */}
                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 80% 20%, ${color}15, transparent 65%)` }} />

                {/* Mini visualization area */}
                <div className="relative h-[140px]">
                  <Viz />
                </div>

                {/* Card info */}
                <div className="relative px-5 pb-5">
                  <div className="text-[9px] font-bold tracking-widest uppercase mb-1.5" style={{ color: color + "CC" }}>{label}</div>
                  <div className="font-black text-base text-white mb-1.5" style={{ fontFamily: "'Syne', sans-serif" }}>{title}</div>
                  <div className="text-xs mb-3 leading-relaxed" style={{ color: "#9A9A9A" }}>{subtitle}</div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map(t => (
                      <span key={t} className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: color + "15", color, border: `1px solid ${color}30` }}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
                      <span className="text-[10px] font-mono" style={{ color: "#10B981" }}>Live</span>
                    </div>
                    <motion.div animate={{ x: hoveredCard === id ? 3 : 0 }}
                      className="flex items-center gap-1 text-xs font-bold" style={{ color }}>
                      Enter
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── SEARCH + FILTERS ──────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#7A7A7A" }}>All Modules</div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #2A2A2E, transparent)" }} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#7A7A7A" strokeWidth="1.2" />
                <path d="M9.5 9.5L12 12" stroke="#7A7A7A" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search modules, features, agents…"
                className="w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none transition-all"
                style={{ background: "#0F0F14", borderColor: search ? "rgba(229,9,20,0.4)" : "#2A2A2E", color: "#fff" }}
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat) => {
                const col = categoryColors[cat] ?? "#E50914";
                return (
                  <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat)}
                    className="px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all"
                    style={{
                      background: activeCategory === cat ? col + "20" : "transparent",
                      borderColor: activeCategory === cat ? col + "60" : "#2A2A2E",
                      color: activeCategory === cat ? col : "#7A7A7A",
                    }}>
                    {cat}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── SECTION GRID ──────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + search} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((section, i) => {
              const locked = section.pro && user.plan === "free";
              const catColor = categoryColors[section.category] ?? "#7A7A7A";
              return (
                <motion.div key={section.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.025 }}
                  whileHover={{ y: -3, boxShadow: `0 10px 40px ${section.color}18` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => locked ? onSection("subscription") : onSection(section.id)}
                  onHoverStart={() => setHoveredCard(section.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative rounded-xl border cursor-pointer overflow-hidden group"
                  style={{ background: "#0F0F14", borderColor: "#1E1E24" }}
                >
                  {/* Colored top bar */}
                  <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${section.color}, ${section.color}40, transparent)` }} />

                  {/* Hover background glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 25% 0%, ${section.color}08, transparent 60%)` }} />

                  <div className="p-4">
                    {/* Top row: category + badges */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                        style={{ color: catColor, background: catColor + "12" }}>{section.category}</span>
                      <div className="flex gap-1">
                        {section.hot && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ color: "#F59E0B", background: "rgba(245,158,11,0.12)" }}>HOT</span>}
                        {locked && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ color: "#7A7A7A", background: "#1C1C1F" }}>PRO</span>}
                      </div>
                    </div>

                    {/* Icon + name row */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                        style={{ background: section.color + "18", color: section.color }}>
                        {section.icon}
                      </div>
                      <div className="font-black text-sm text-white leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                        {section.name}
                      </div>
                    </div>

                    {/* Desc */}
                    <div className="text-[11px] leading-relaxed mb-4" style={{ color: "#6A6A7A" }}>{section.desc}</div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: locked ? "#3A3A3E" : "#10B981" }} />
                        <span className="text-[10px]" style={{ color: locked ? "#7A7A7A" : "#10B981" }}>
                          {locked ? "Pro Required" : "Live"}
                        </span>
                      </div>
                      <motion.div animate={{ x: hoveredCard === section.id ? 3 : 0, opacity: hoveredCard === section.id ? 1 : 0 }}
                        className="flex items-center gap-1 text-[10px] font-bold" style={{ color: section.color }}>
                        {locked ? "Upgrade" : "Open"}
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5H8M5.5 2.5L8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: "#7A7A7A" }}>
            <div className="text-5xl mb-4" style={{ color: "#1E1E24" }}>◎</div>
            <div className="text-sm">No modules match "{search}"</div>
          </div>
        )}
      </div>
    </div>
  );
}
