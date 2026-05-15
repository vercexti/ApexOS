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
  { id: "soulsync",          category: "Wellness",      name: "SoulSync Companion",    desc: "Emotionally intelligent AI — Sage adapts to your needs",         color: "#8B5CF6", icon: "◈", hot: true  },
  { id: "recovery",          category: "Wellness",      name: "Daily Recovery",         desc: "Quests, mood tracking, XP streaks",                              color: "#5865F2", icon: "◉"            },
  { id: "psychologists",     category: "Wellness",      name: "Psychologist Connect",   desc: "Verified professionals from $12 / session",                      color: "#EC4899", icon: "◎"            },
  { id: "breathing",         category: "Wellness",      name: "Breathing & Grounding",  desc: "4-4-6 protocol — Anxiety reduction exercises",                  color: "#7C3AED", icon: "◇"            },
  { id: "ambient",           category: "Wellness",      name: "Ambient Soundscapes",    desc: "Focus, calm, sleep audio streams",                               color: "#6D28D9", icon: "◆"            },
  { id: "agents",            category: "Intelligence",  name: "AI Agent Network",       desc: "11 autonomous intelligences — click to activate",                color: "#E50914", icon: "◈", hot: true  },
  { id: "debate",            category: "Intelligence",  name: "Neural Debate Arena",    desc: "Agents debate your decisions in real time",                      color: "#E50914", icon: "◉"            },
  { id: "dashboard",         category: "Intelligence",  name: "Strategic Dashboard",    desc: "Live metrics, neural heatmap, agent stream",                     color: "#5865F2", icon: "◆"            },
  { id: "terminal",          category: "Intelligence",  name: "AI Terminal",            desc: "Neural command interface — analyze, simulate, deploy",           color: "#10B981", icon: "◎"            },
  { id: "neural-arch",       category: "Intelligence",  name: "Neural Architecture",    desc: "Cognitive system visualization — live thought map",              color: "#5865F2", icon: "◇"            },
  { id: "research",          category: "Intelligence",  name: "Research Intelligence",  desc: "Deep scan 10,000+ sources — A+ grade reports",                  color: "#E50914", icon: "◈", pro: true  },
  { id: "career-galaxy",     category: "Career",        name: "Career Galaxy",          desc: "Cosmic career path map — interactive node system",               color: "#10B981", icon: "◎"            },
  { id: "career-cards",      category: "Career",        name: "Opportunity Cards",      desc: "Netflix-style career browser — fullscreen modal",                color: "#10B981", icon: "◉"            },
  { id: "future-self",       category: "Career",        name: "Future Self Simulator",  desc: "1 / 3 / 5 year projection engine",                               color: "#F59E0B", icon: "◆"            },
  { id: "network-engine",    category: "Career",        name: "Network Engine",         desc: "High-value connection finder — 34% reply rate",                 color: "#EC4899", icon: "◇", pro: true  },
  { id: "study",             category: "Learning",      name: "Study Command Center",   desc: "Mission-control for accelerated learning",                       color: "#5865F2", icon: "◈"            },
  { id: "universe",          category: "Learning",      name: "Neural Universe",        desc: "Knowledge cosmos — interactive concept clusters",                color: "#A78BFA", icon: "◉"            },
  { id: "focus-sprint",      category: "Learning",      name: "Focus Sprint",           desc: "25-min deep work engine — ADHD-friendly",                       color: "#F59E0B", icon: "◎"            },
  { id: "workflows",         category: "Automation",    name: "Workflow Universe",       desc: "6 autonomous workflow engines — execute live",                   color: "#A78BFA", icon: "◇", hot: true  },
  { id: "decision-sim",      category: "Automation",    name: "Decision Simulator",     desc: "200-scenario Monte Carlo — stress-test choices",                 color: "#06B6D4", icon: "◆"            },
  { id: "finance",           category: "Automation",    name: "Finance Projector",      desc: "Wealth trajectory — $1M+ path simulation",                      color: "#34D399", icon: "◈", pro: true  },
  { id: "automation-builder",category: "Automation",    name: "Automation Builder",     desc: "Custom workflow architect — deploy instantly",                   color: "#F97316", icon: "◉"            },
  { id: "profile",           category: "Personal",      name: "My Profile",             desc: "Account, achievements, neural score",                            color: "#7A7A7A", icon: "◎"            },
  { id: "subscription",      category: "Personal",      name: "Subscription & Plans",   desc: "Free → Pro → Elite — unlock full OS",                           color: "#F59E0B", icon: "◆"            },
  { id: "onboarding",        category: "Personal",      name: "Neural Onboarding",      desc: "Personalize your OS intelligence profile",                       color: "#8B5CF6", icon: "◇"            },
];

const categories = ["All", "Wellness", "Intelligence", "Career", "Learning", "Automation", "Personal"];
const categoryColors: Record<string, string> = {
  Wellness: "#8B5CF6", Intelligence: "#E50914", Career: "#10B981",
  Learning: "#5865F2", Automation: "#A78BFA", Personal: "#7A7A7A",
};

// ── Hooks ──────────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration / 16);
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(t); }
        else setVal(Math.floor(start));
      }, 16);
      return () => clearInterval(t);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return val;
}

function useTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

// ── Neural Score Ring ──────────────────────────────────────────────────────
function NeuralScoreRing({ score = 78 }: { score?: number }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#1E1E24" strokeWidth="7" />
        <circle cx="48" cy="48" r={r} fill="none" stroke="#2A2A2E" strokeWidth="1" />
        <motion.circle
          cx="48" cy="48" r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
          transform="rotate(-90 48 48)"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E50914" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>
        </defs>
        <text x="48" y="44" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="Syne, sans-serif">{score}</text>
        <text x="48" y="59" textAnchor="middle" dominantBaseline="middle" fill="#7A7A7A" fontSize="9" letterSpacing="2">NEURAL</text>
      </svg>
      <div className="text-xs font-mono tracking-widest" style={{ color: "#7A7A7A" }}>SCORE</div>
    </div>
  );
}

// ── Daily Briefing ─────────────────────────────────────────────────────────
const briefingItems = [
  { label: "Focus", text: "Your peak cognitive window opens at 2 PM — Focus Sprint is recommended.", accent: "#F59E0B" },
  { label: "Career", text: "3 new opportunities match your Career Galaxy nodes. Salary range: $130–$180k.", accent: "#10B981" },
  { label: "Wellness", text: "Sage detected elevated stress patterns. Breathing & Grounding session queued.", accent: "#8B5CF6" },
  { label: "Research", text: "Research Agent completed overnight scan — 14 papers flagged as high-relevance.", accent: "#E50914" },
];

function DailyBriefing() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % briefingItems.length), 3500); return () => clearInterval(t); }, []);
  const item = briefingItems[idx];
  return (
    <div className="rounded-xl border p-4 h-full flex flex-col justify-between"
      style={{ background: "#0C0C12", borderColor: "#1E1E24" }}>
      <div className="flex items-center gap-2 mb-3">
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
        <span className="text-xs font-mono tracking-widest" style={{ color: "#10B981" }}>DAILY INTELLIGENCE BRIEF</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}>
          <div className="text-[11px] font-bold tracking-widest uppercase mb-1.5 px-2 py-0.5 rounded-full inline-block"
            style={{ color: item.accent, background: item.accent + "15" }}>{item.label}</div>
          <p className="text-sm leading-relaxed text-white">{item.text}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-1.5 mt-3">
        {briefingItems.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="h-0.5 rounded-full transition-all duration-300"
            style={{ background: i === idx ? briefingItems[i].accent : "#2A2A2E", width: i === idx ? 20 : 8 }} />
        ))}
      </div>
    </div>
  );
}

// ── Quick Actions ──────────────────────────────────────────────────────────
interface QuickAction { label: string; id: SectionId; color: string; icon: string }
const quickActions: QuickAction[] = [
  { label: "Focus Sprint",    id: "focus-sprint",   color: "#F59E0B", icon: "⏱" },
  { label: "Run Agents",      id: "agents",         color: "#E50914", icon: "◈" },
  { label: "Career Scan",     id: "career-galaxy",  color: "#10B981", icon: "◎" },
  { label: "Daily Recovery",  id: "recovery",       color: "#5865F2", icon: "◉" },
  { label: "AI Terminal",     id: "terminal",       color: "#10B981", icon: ">" },
  { label: "Soul Check",      id: "soulsync",       color: "#8B5CF6", icon: "◈" },
];

// ── Live Activity Ticker ───────────────────────────────────────────────────
const tickerMessages = [
  "Research Agent scanned 14,203 sources",
  "Sage adapted to Focused mode",
  "Career Galaxy updated — 3 new matches",
  "Workflow: Daily Focus executed at 09:41",
  "Finance Projector: +$2,400 trajectory delta",
  "Neural Debate: 3-way agent consensus reached",
  "Study streak: Day 14 maintained",
  "Network Engine: 2 high-value contacts flagged",
  "Sleep Guard: Optimal wind-down in 40 min",
  "Automation Builder: 1 workflow deployed",
];

function ActivityTicker() {
  const msg = tickerMessages.join("  ·  ");
  const doubled = msg + "  ·  " + msg;
  return (
    <div className="overflow-hidden rounded-lg border px-0 py-2 mb-6 relative"
      style={{ background: "#080810", borderColor: "#1A1A22" }}>
      <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #080810, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #080810, transparent)" }} />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        className="flex items-center gap-0 whitespace-nowrap px-4"
        style={{ width: "max-content" }}
      >
        <span className="text-xs font-mono" style={{ color: "#5A5A6A" }}>{doubled}</span>
      </motion.div>
    </div>
  );
}

// ── SoulSync Mini-Viz ──────────────────────────────────────────────────────
const moodLabels = ["Calm", "Grounded", "Focused", "Reflective", "Motivated"];
function SoulSyncViz() {
  const [mood, setMood] = useState(0);
  useEffect(() => { const t = setInterval(() => setMood(m => (m + 1) % moodLabels.length), 3200); return () => clearInterval(t); }, []);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
      <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
        {[1.0, 0.68, 0.42].map((s, i) => (
          <motion.div key={i}
            animate={{ scale: [s, s * 1.16, s], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{ width: 110, height: 110, background: "radial-gradient(circle, #8B5CF6 0%, #5865F2 80%)", filter: "blur(3px)" }}
          />
        ))}
        <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-black z-10"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)", boxShadow: "0 0 28px rgba(139,92,246,0.65)" }}>
          ◈
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={mood} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.5 }}
          className="mt-2.5 text-xs font-bold tracking-widest uppercase" style={{ color: "#A78BFA" }}>
          {moodLabels[mood]} Mode
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Agent Network Mini-Viz ─────────────────────────────────────────────────
const AGENT_NAMES = ["Research", "Career", "Strategy", "Finance", "Study", "Wellness", "Code", "Legal", "Network", "Creative", "Debate"];
function AgentViz() {
  const [active, setActive] = useState([0, 3, 7]);
  const [label, setLabel] = useState(AGENT_NAMES[0]);
  useEffect(() => {
    const t = setInterval(() => {
      const next = Math.floor(Math.random() * 11);
      setActive(prev => {
        const filtered = prev.filter(n => n !== next);
        return filtered.length === prev.length ? [...prev.slice(-3), next] : filtered;
      });
      setLabel(AGENT_NAMES[next]);
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const R = 50, cx = 65, cy = 65;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <svg width="130" height="130" viewBox="0 0 130 130" overflow="visible">
        {active.map(i => {
          const a = (i / 11) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.line key={`ln-${i}`} x1={cx} y1={cy}
              x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)}
              stroke="#E50914" strokeWidth="0.7" strokeOpacity="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          );
        })}
        {AGENT_NAMES.map((_, i) => {
          const a = (i / 11) * Math.PI * 2 - Math.PI / 2;
          const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
          const isOn = active.includes(i);
          return (
            <g key={i}>
              {isOn && (
                <motion.circle cx={x} cy={y} r={9} fill="#E50914" opacity={0.12}
                  animate={{ r: [9, 14, 9] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
              )}
              <circle cx={x} cy={y} r={3.5} fill={isOn ? "#E50914" : "#2A2A2E"}
                stroke={isOn ? "#FF3B47" : "#3A3A3E"} strokeWidth="1" />
            </g>
          );
        })}
        <motion.circle cx={cx} cy={cy} r={13} fill="none" stroke="#E50914" strokeWidth="1.5" strokeOpacity="0.4"
          animate={{ r: [13, 17, 13] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
        <circle cx={cx} cy={cy} r={9} fill="#E50914" fillOpacity="0.14" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fill="#E50914" fontSize="12" fontWeight="900">AI</text>
      </svg>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }} className="text-xs font-mono" style={{ color: "#E50914" }}>
            {label} activated
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Workflow Pipeline Viz ──────────────────────────────────────────────────
const WF_STEPS = ["Trigger", "Analyze", "Execute", "Verify", "Deploy", "Report"];
const WF_NAMES = ["Daily Focus", "Research", "Finance Scan", "Study Streak", "Network", "Sleep Guard"];
function WorkflowViz() {
  const [step, setStep] = useState(0);
  const [wfIdx, setWfIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setStep(s => {
        if (s >= WF_STEPS.length - 1) { setWfIdx(w => (w + 1) % WF_NAMES.length); return 0; }
        return s + 1;
      });
    }, 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none select-none px-5">
      <div className="flex items-center w-full max-w-[220px] gap-0">
        {WF_STEPS.map((node, i) => (
          <div key={node} className="flex items-center flex-1 min-w-0">
            <motion.div
              animate={{
                background: i < step ? "#A78BFA18" : i === step ? "#A78BFA28" : "#141420",
                color: i <= step ? "#A78BFA" : "#4A4A5A",
                borderColor: i <= step ? "#A78BFA40" : "#1E1E2A",
              }}
              transition={{ duration: 0.4 }}
              className="flex-1 text-center rounded py-1.5 text-[10px] font-bold border min-w-0 truncate px-1"
              style={{ boxShadow: i === step ? "0 0 10px rgba(167,139,250,0.25)" : "none" }}
            >
              {node}
            </motion.div>
            {i < WF_STEPS.length - 1 && (
              <motion.div className="h-px w-2 shrink-0"
                animate={{ background: i < step ? "#A78BFA60" : "#1E1E2A" }}
                transition={{ duration: 0.4 }} />
            )}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={wfIdx} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }} className="text-xs font-mono" style={{ color: "#A78BFA" }}>
          Running: {WF_NAMES[wfIdx]}
        </motion.div>
      </AnimatePresence>
      <div className="flex flex-wrap gap-1 justify-center">
        {WF_NAMES.map((wf, i) => (
          <motion.div key={wf}
            animate={{ opacity: i === wfIdx ? 1 : 0.28 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{ color: "#A78BFA", background: "#A78BFA0F", border: "1px solid #A78BFA20" }}>
            {wf}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Celestial Map Viz ─────────────────────────────────────────────────────
const CAREER_NODES = [
  { label: "AI Eng", x: 50, y: 22, score: 96 },
  { label: "Founder", x: 78, y: 38, score: 79 },
  { label: "Data Sci", x: 22, y: 50, score: 91 },
  { label: "Designer", x: 50, y: 66, score: 88 },
  { label: "Full Stack", x: 76, y: 62, score: 87 },
];
function CelestialViz() {
  const [pulse, setPulse] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  useEffect(() => {
    const t1 = setInterval(() => setPulse(p => (p + 1) % 60), 50);
    const t2 = setInterval(() => setActiveNode(n => (n + 1) % CAREER_NODES.length), 1600);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);
  const stars = Array.from({ length: 28 }, (_, i) => ({
    x: ((i * 47 + 13) % 100),
    y: ((i * 31 + 7) % 100),
    r: 0.6 + (i % 3) * 0.4,
    phase: i * 0.4,
  }));
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <svg width="140" height="140" viewBox="0 0 140 140" overflow="visible">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x * 1.4} cy={s.y * 1.4} r={s.r}
            fill="white" fillOpacity={0.15 + Math.abs(Math.sin(pulse * 0.08 + s.phase)) * 0.4} />
        ))}
        <circle cx="70" cy="70" r="38" fill="none" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.2" />
        <circle cx="70" cy="70" r="55" fill="none" stroke="#10B981" strokeWidth="0.3" strokeOpacity="0.1" />
        {CAREER_NODES.map((node, i) => {
          const x = node.x * 1.4;
          const y = node.y * 1.4;
          const isActive = i === activeNode;
          return (
            <g key={node.label}>
              <line x1="70" y1="70" x2={x} y2={y} stroke="#10B981" strokeWidth="0.6" strokeOpacity={isActive ? 0.5 : 0.12} />
              {isActive && (
                <motion.circle cx={x} cy={y} r={10} fill="#10B981" fillOpacity={0.12}
                  animate={{ r: [10, 15, 10] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
              )}
              <circle cx={x} cy={y} r={isActive ? 4.5 : 3}
                fill={isActive ? "#10B981" : "#1E3A2E"} stroke="#10B981" strokeWidth={isActive ? 1.5 : 0.8} strokeOpacity="0.8" />
            </g>
          );
        })}
        <motion.circle cx="70" cy="70" r="10" fill="#10B981" fillOpacity="0.18"
          animate={{ r: [10, 14, 10] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <circle cx="70" cy="70" r="6" fill="#10B981" fillOpacity="0.35" />
        <text x="70" y="70" textAnchor="middle" dominantBaseline="middle" fill="#10B981" fontSize="8" fontWeight="900">◎</text>
      </svg>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span key={activeNode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }} className="text-xs font-mono" style={{ color: "#10B981" }}>
            {CAREER_NODES[activeNode]?.label} — match score {CAREER_NODES[activeNode]?.score}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Featured Card Data ─────────────────────────────────────────────────────
const featuredDefs = [
  {
    id: "soulsync" as SectionId,
    color: "#8B5CF6",
    bg: "linear-gradient(160deg, #0E0820 0%, #0A0A1C 100%)",
    border: "rgba(139,92,246,0.28)",
    glow: "rgba(139,92,246,0.13)",
    label: "Wellness Core",
    title: "SoulSync Companion",
    subtitle: "Your emotionally intelligent AI. Sage reads your mood, adapts in real time, and guides every session.",
    tags: ["Sage AI", "5 Modes", "Recovery Quests", "Psychologists"],
    Viz: SoulSyncViz,
  },
  {
    id: "agents" as SectionId,
    color: "#E50914",
    bg: "linear-gradient(160deg, #160509 0%, #0B0B0F 100%)",
    border: "rgba(229,9,20,0.25)",
    glow: "rgba(229,9,20,0.11)",
    label: "Intelligence Core",
    title: "AI Agent Network",
    subtitle: "11 autonomous intelligences running in parallel — researching, debating, and executing simultaneously.",
    tags: ["11 Agents", "Live Debate", "Auto-Execute", "Neural Link"],
    Viz: AgentViz,
  },
  {
    id: "workflows" as SectionId,
    color: "#A78BFA",
    bg: "linear-gradient(160deg, #100B1C 0%, #0A0B16 100%)",
    border: "rgba(167,139,250,0.25)",
    glow: "rgba(167,139,250,0.11)",
    label: "Automation Core",
    title: "Workflow Universe",
    subtitle: "6 autonomous pipelines execute silently. Daily Focus, Finance Scan, Sleep Guard — running without you.",
    tags: ["6 Workflows", "Auto-Trigger", "Live Execution", "Zero Effort"],
    Viz: WorkflowViz,
  },
  {
    id: "career-galaxy" as SectionId,
    color: "#10B981",
    bg: "linear-gradient(160deg, #051510 0%, #060D0A 100%)",
    border: "rgba(16,185,129,0.22)",
    glow: "rgba(16,185,129,0.10)",
    label: "Career Core",
    title: "Career Galaxy",
    subtitle: "Your cosmic career atlas. Navigate paths, match opportunities, and chart your trajectory across the stars.",
    tags: ["10 Career Nodes", "Salary Data", "Match Score", "Live Paths"],
    Viz: CelestialViz,
  },
];

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  onSection: (id: SectionId) => void;
  user: { name: string; plan: string };
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function MainHub({ onSection, user }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const greeting = useTimeGreeting();

  const agentsVal  = useCounter(11,    1800, 200);
  const sectionsVal= useCounter(25,    2000, 300);
  const usersVal   = useCounter(12847, 2400, 400);

  const nonFeatured = sections.filter(s => !["soulsync", "agents", "workflows"].includes(s.id));
  const filtered = nonFeatured.filter(s => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSrch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSrch;
  });

  const showGrouped = activeCategory === "All" && !search;
  const groupedCategories = ["Wellness", "Intelligence", "Career", "Learning", "Automation", "Personal"];

  return (
    <div className="min-h-screen" style={{ background: "#0B0B0F" }}>
      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div animate={{ opacity: [0.045, 0.09, 0.045], x: [0, 25, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full blur-[180px]" style={{ width: 800, height: 500, left: "10%", top: "-8%", background: "#E50914" }} />
        <motion.div animate={{ opacity: [0.03, 0.06, 0.03], x: [0, -18, 0] }} transition={{ duration: 22, repeat: Infinity, delay: 5, ease: "easeInOut" }}
          className="absolute rounded-full blur-[140px]" style={{ width: 600, height: 400, right: "2%", bottom: "12%", background: "#8B5CF6" }} />
        <motion.div animate={{ opacity: [0.02, 0.045, 0.02] }} transition={{ duration: 16, repeat: Infinity, delay: 9, ease: "easeInOut" }}
          className="absolute rounded-full blur-[120px]" style={{ width: 500, height: 300, left: "48%", bottom: "22%", background: "#5865F2" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 pb-20">

        {/* ─── HERO ──────────────────────────────────────────── */}
        <div className="pt-10 pb-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
            <div className="flex items-start justify-between gap-6 flex-wrap">

              {/* Left: greeting + stats */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#10B981" }} />
                  <span className="text-[10px] font-mono tracking-widest" style={{ color: "#10B981" }}>ALL SYSTEMS OPERATIONAL</span>
                  <span className="text-[10px] font-mono" style={{ color: "#2A2A2E" }}>·</span>
                  <span className="text-[10px] font-mono" style={{ color: "#5A5A6A" }}>APEX OS v2.0</span>
                </div>

                <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "#5A5A6A" }}>
                  {greeting}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {user.name}<span style={{ color: "#E50914" }}>.</span>
                </h1>
                <p className="text-sm md:text-base mb-6 max-w-lg leading-relaxed" style={{ color: "#6A6A7A" }}>
                  Your intelligence ecosystem is fully operational. Select a module or use Quick Actions below.
                </p>

                {/* Stat pills */}
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { v: `${agentsVal} / 11`, label: "Agents Online",  color: "#10B981" },
                    { v: `${sectionsVal}`,    label: "Modules Live",   color: "#E50914" },
                    { v: `${usersVal.toLocaleString()}`, label: "Users",  color: "#F59E0B" },
                    { v: user.plan === "elite" ? "Elite" : user.plan === "pro" ? "Pro" : "Free", label: "Your Plan", color: user.plan === "free" ? "#5A5A6A" : "#F59E0B" },
                  ].map(({ v, label, color }) => (
                    <motion.div key={label} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border"
                      style={{ background: color + "0C", borderColor: color + "28" }}>
                      <span className="font-black text-sm" style={{ color, fontFamily: "'Syne', sans-serif" }}>{v}</span>
                      <span className="text-xs" style={{ color: "#5A5A6A" }}>{label}</span>
                    </motion.div>
                  ))}
                  {user.plan === "free" && (
                    <motion.button whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(229,9,20,0.3)" }}
                      whileTap={{ scale: 0.97 }} onClick={() => onSection("subscription")}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #E50914, #A00" }}>
                      Upgrade →
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Right: Neural Score */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="shrink-0 flex flex-col items-center gap-3">
                <NeuralScoreRing score={78} />
                <div className="text-center">
                  <div className="text-[10px] font-mono" style={{ color: "#5A5A6A" }}>Rank #2,847</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ─── BRIEFING + QUICK ACTIONS ──────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Briefing */}
          <DailyBriefing />

          {/* Quick actions */}
          <div className="rounded-xl border p-4" style={{ background: "#0C0C12", borderColor: "#1E1E24" }}>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#5A5A6A" }}>QUICK ACTIONS</div>
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((qa) => (
                <motion.button key={qa.id}
                  whileHover={{ scale: 1.04, boxShadow: `0 4px 18px ${qa.color}22` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSection(qa.id)}
                  className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-center transition-all"
                  style={{ background: qa.color + "0C", borderColor: qa.color + "22" }}>
                  <span className="text-lg" style={{ color: qa.color }}>{qa.icon}</span>
                  <span className="text-xs font-bold leading-tight" style={{ color: qa.color }}>{qa.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── ACTIVITY TICKER ───────────────────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <ActivityTicker />
        </motion.div>

        {/* ─── FEATURED CARDS ────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: "#5A5A6A" }}>Core Modules</div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #2A2A2E, transparent)" }} />
            <div className="text-xs font-mono" style={{ color: "#3A3A4A" }}>Live</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {featuredDefs.map(({ id, color, bg, border, glow, label, title, subtitle, tags, Viz }, idx) => (
              <motion.div key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.12, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.985, transition: { duration: 0.1 } }}
                onClick={() => onSection(id)}
                onHoverStart={() => setHoveredCard(id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative rounded-2xl border cursor-pointer overflow-hidden flex flex-col"
                style={{ background: bg, borderColor: border, minHeight: 300 }}>
                {/* Top glow bar */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}90, transparent)` }} />
                {/* Radial glow bg */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 75% 15%, ${glow}, transparent 65%)` }} />

                {/* Viz area — fixed height so card content aligns */}
                <div className="relative shrink-0" style={{ height: 148 }}>
                  <Viz />
                </div>

                {/* Card body */}
                <div className="relative px-5 pb-5 flex flex-col flex-1">
                  <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: color + "BB" }}>{label}</div>
                  <div className="font-black text-[17px] text-white mb-2 leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>{title}</div>
                  <div className="text-xs leading-relaxed mb-3 flex-1" style={{ color: "#8A8A9A" }}>{subtitle}</div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: color + "14", color, border: `1px solid ${color}28` }}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <motion.span animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#10B981" }} />
                      <span className="text-xs font-mono" style={{ color: "#10B981" }}>Live</span>
                    </div>
                    <motion.div animate={{ x: hoveredCard === id ? 4 : 0 }} transition={{ duration: 0.2 }}
                      className="flex items-center gap-1 text-sm font-bold" style={{ color }}>
                      Enter
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── SEARCH + FILTERS ──────────────────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: "#5A5A6A" }}>All Modules</div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #2A2A2E, transparent)" }} />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search */}
            <div className="relative sm:w-72">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0" width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#5A5A6A" strokeWidth="1.2" />
                <path d="M9.5 9.5L12 12" stroke="#5A5A6A" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search modules…"
                className="w-full rounded-xl border pl-9 pr-4 py-2.5 text-sm outline-none"
                style={{ background: "#0C0C14", borderColor: search ? "rgba(229,9,20,0.35)" : "#1E1E28", color: "#fff" }} />
            </div>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map(cat => {
                const col = categoryColors[cat] ?? "#E50914";
                const isActive = activeCategory === cat;
                return (
                  <motion.button key={cat} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                    onClick={() => setActiveCategory(cat)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200"
                    style={{
                      background: isActive ? col + "1E" : "transparent",
                      borderColor: isActive ? col + "55" : "#1E1E28",
                      color: isActive ? col : "#5A5A6A",
                    }}>
                    {cat}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ─── SECTION GRID ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {showGrouped ? (
            <motion.div key="grouped" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {groupedCategories.map((cat, catIdx) => {
                const catSections = nonFeatured.filter(s => s.category === cat);
                if (catSections.length === 0) return null;
                const catColor = categoryColors[cat] ?? "#7A7A7A";
                return (
                  <div key={cat} className="mb-8">
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: catIdx * 0.06 }}
                      className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-4 rounded-full" style={{ background: catColor }} />
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: catColor }}>{cat}</span>
                      <div className="flex-1 h-px" style={{ background: catColor + "20" }} />
                      <span className="text-xs font-mono" style={{ color: "#3A3A4A" }}>{catSections.length} modules</span>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {catSections.map((section, i) => (
                        <SectionCard key={section.id} section={section} user={user} idx={catIdx * 10 + i}
                          hovered={hoveredCard === section.id}
                          onHover={setHoveredCard}
                          onSection={onSection} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div key={activeCategory + search} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map((section, i) => (
                <SectionCard key={section.id} section={section} user={user} idx={i}
                  hovered={hoveredCard === section.id}
                  onHover={setHoveredCard}
                  onSection={onSection} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 && !showGrouped && (
          <div className="text-center py-20" style={{ color: "#5A5A6A" }}>
            <div className="text-5xl mb-4" style={{ color: "#1E1E28" }}>◎</div>
            <div className="text-sm">No modules match "{search}"</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section Card (extracted for reuse) ────────────────────────────────────
interface CardProps {
  section: HubSection;
  user: { name: string; plan: string };
  idx: number;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onSection: (id: SectionId) => void;
}
function SectionCard({ section, user, idx, hovered, onHover, onSection }: CardProps) {
  const locked = section.pro && user.plan === "free";
  const catColor = categoryColors[section.category] ?? "#7A7A7A";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.015, 0.28), ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
      onClick={() => locked ? onSection("subscription") : onSection(section.id)}
      onHoverStart={() => onHover(section.id)}
      onHoverEnd={() => onHover(null)}
      className="relative rounded-xl border cursor-pointer overflow-hidden flex flex-col"
      style={{
        background: "#0C0C14",
        borderColor: hovered ? section.color + "35" : "#1E1E28",
        boxShadow: hovered ? `0 8px 32px ${section.color}14` : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        minHeight: 185,
      }}
    >
      {/* Top color stripe */}
      <div className="h-[2px] w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${section.color}, ${section.color}40, transparent)` }} />
      {/* Hover glow overlay */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 20% 0%, ${section.color}07, transparent 55%)`, opacity: hovered ? 1 : 0 }} />

      <div className="p-4 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{ color: catColor, background: catColor + "10" }}>{section.category}</span>
          <div className="flex gap-1 items-center">
            {section.hot && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ color: "#F59E0B", background: "#F59E0B12" }}>HOT</span>}
            {locked       && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ color: "#5A5A6A", background: "#1A1A22" }}>PRO</span>}
          </div>
        </div>

        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
            style={{ background: section.color + "16", color: section.color }}>
            {section.icon}
          </div>
          <div className="font-black text-sm text-white leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
            {section.name}
          </div>
        </div>

        {/* Desc */}
        <div className="text-xs leading-relaxed flex-1" style={{ color: "#5A5A6A" }}>{section.desc}</div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full"
              style={{ background: locked ? "#2A2A2E" : "#10B981" }} />
            <span className="text-xs" style={{ color: locked ? "#5A5A6A" : "#10B981" }}>
              {locked ? "Pro Required" : "Live"}
            </span>
          </div>
          <motion.div animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.18 }}
            className="flex items-center gap-1 text-xs font-bold" style={{ color: section.color }}>
            {locked ? "Upgrade" : "Open"}
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M2 5H8M5.5 2.5L8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
