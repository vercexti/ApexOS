import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AgentId = "study" | "research" | "career" | "finance" | "strategy" | "automation" | "wellness" | "productivity" | "networking" | "portfolio" | "trend";

interface AgentConfig {
  id: AgentId;
  name: string;
  color: string;
  icon: string;
  tagline: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputType?: "text" | "textarea" | "select";
  inputOptions?: string[];
  generateResponse: (input: string) => string[];
}

const agentConfigs: AgentConfig[] = [
  {
    id: "study",
    name: "Study Agent",
    color: "#5865F2",
    icon: "◈",
    tagline: "Neural Learning Architecture",
    inputLabel: "What do you want to master?",
    inputPlaceholder: "e.g. Machine Learning, Public Speaking, Venture Capital...",
    generateResponse: (topic) => [
      `NEURAL ROADMAP: ${topic.toUpperCase()}`,
      ``,
      `PHASE 1 — FOUNDATIONS  [Week 1–2]`,
      `  › Core concepts mapped across 847 sources`,
      `  › 3 essential mental models identified`,
      `  › Daily 45-min deep-work blocks scheduled`,
      `  › Beginner trap patterns flagged`,
      ``,
      `PHASE 2 — APPLICATION  [Week 3–4]`,
      `  › Project-based learning protocol activated`,
      `  › 2 hands-on challenges deployed`,
      `  › Spaced repetition algorithm calibrated`,
      `  › Progress checkpoints set at days 14, 21`,
      ``,
      `PHASE 3 — MASTERY  [Week 5–8]`,
      `  › Advanced pattern recognition mode`,
      `  › Portfolio project framework initialized`,
      `  › Expert network: 7 connectors identified`,
      `  › Teaching-back sessions scheduled`,
      ``,
      `RETENTION SCORE:  94 / 100`,
      `LEARNING VELOCITY: 3.2x average`,
      `MASTERY ETA: 54 days`,
      ``,
      `STATUS: ROADMAP DEPLOYED — Begin Phase 1 now.`,
    ],
  },
  {
    id: "research",
    name: "Research Agent",
    color: "#E50914",
    icon: "◉",
    tagline: "Deep Intelligence Scanner",
    inputLabel: "What do you need to know?",
    inputPlaceholder: "e.g. AI startup landscape 2025, emerging battery tech...",
    generateResponse: (query) => [
      `DEEP RESEARCH: ${query.toUpperCase()}`,
      ``,
      `SCANNING 10,000+ sources...`,
      ``,
      `STRATEGIC INSIGHTS`,
      `  › Market trajectory: +340% YoY growth signal`,
      `  › 3 early-mover windows identified (closing in 8–14 months)`,
      `  › Key players: 12 entities mapped, 2 underestimated`,
      `  › Disruption probability: 78% within 18 months`,
      ``,
      `TREND ANALYSIS`,
      `  › Rising: AI-native infrastructure, edge compute`,
      `  › Declining: Legacy SaaS tooling, manual workflows`,
      `  › Wildcard: Regulatory shift Q3 2025 — HIGH IMPACT`,
      ``,
      `REFERENCES FLAGGED`,
      `  › 14 primary sources (peer-reviewed + industry)`,
      `  › 3 contrarian viewpoints worth considering`,
      `  › 2 insider reports from private networks`,
      ``,
      `CONFIDENCE SCORE: 89%`,
      `INTELLIGENCE GRADE: A+`,
      ``,
      `STATUS: REPORT COMPILED — 14 strategic actions ready.`,
    ],
  },
  {
    id: "career",
    name: "Career Agent",
    color: "#10B981",
    icon: "◎",
    tagline: "Career Intelligence Cosmos",
    inputLabel: "What's your current role or goal?",
    inputPlaceholder: "e.g. Software Engineer → CTO, Designer → Founder...",
    generateResponse: (profile) => [
      `CAREER MAP: ${profile.toUpperCase()}`,
      ``,
      `TRAJECTORY ANALYSIS`,
      `  › Current trajectory: Linear — HIGH RISK`,
      `  › Optimal path identified: 3 strategic pivots`,
      `  › Probability of target role: 91% (60-month horizon)`,
      ``,
      `PHASE 1 — POSITIONING  [Months 1–3]`,
      `  › Skill gap: 2 critical, 4 accelerating`,
      `  › Personal brand: 6 leverage points found`,
      `  › Network density: 23% below optimal`,
      ``,
      `PHASE 2 — ACCELERATION  [Months 4–9]`,
      `  › 3 high-signal projects to pursue`,
      `  › Compensation: Target +40% at next role`,
      `  › Mentor match: 2 ideal profiles identified`,
      ``,
      `PHASE 3 — DOMINANCE  [Months 10–24]`,
      `  › Leadership visibility strategy activated`,
      `  › Board/advisory positioning unlocked`,
      `  › Exit optionality: 4 paths available`,
      ``,
      `SUCCESS PROBABILITY: 91%`,
      `INCOME PROJECTION 5Y: $380K — $620K`,
      ``,
      `STATUS: CAREER MATRIX ACTIVATED — First action in 24h.`,
    ],
  },
  {
    id: "finance",
    name: "Finance Agent",
    color: "#34D399",
    icon: "◉",
    tagline: "Wealth Intelligence Matrix",
    inputLabel: "Describe your financial goal",
    inputPlaceholder: "e.g. Build $1M by 35, FIRE by 40, fund a startup...",
    generateResponse: (goal) => [
      `WEALTH SIMULATION: ${goal.toUpperCase()}`,
      ``,
      `CURRENT TRAJECTORY ANALYSIS`,
      `  › Default path outcome: $240K (15-year horizon)`,
      `  › Optimized path outcome: $1.4M (same horizon)`,
      `  › Gap source: Allocation inefficiency + missed leverage`,
      ``,
      `OPTIMIZED STRATEGY`,
      `  › Savings rate target: 34% (current industry avg: 18%)`,
      `  › Asset allocation: 60% growth / 30% cash-flow / 10% hedge`,
      `  › Tax efficiency gain: +$24K/yr recoverable`,
      `  › Leverage opportunities: 3 identified`,
      ``,
      `INCOME EXPANSION PATHS`,
      `  › Primary: +$45K negotiation leverage found`,
      `  › Secondary: 2 high-ROI skill monetization paths`,
      `  › Passive: 3 cash-flow vehicles recommended`,
      ``,
      `RISK ANALYSIS`,
      `  › Downside scenario: $680K (conservative)`,
      `  › Base scenario: $1.1M`,
      `  › Upside scenario: $2.4M`,
      ``,
      `WEALTH SCORE: 71 / 100`,
      `OPTIMIZATION POTENTIAL: +$860K`,
      ``,
      `STATUS: FINANCIAL MATRIX DEPLOYED — Begin Week 1 action.`,
    ],
  },
  {
    id: "strategy",
    name: "Strategy Agent",
    color: "#06B6D4",
    icon: "◈",
    tagline: "Decision Intelligence Engine",
    inputLabel: "What decision are you stress-testing?",
    inputPlaceholder: "e.g. Start a company, quit my job, move cities...",
    generateResponse: (decision) => [
      `DECISION SIMULATION: ${decision.toUpperCase()}`,
      ``,
      `RUNNING 200 SIMULATIONS...`,
      ``,
      `OUTCOME DISTRIBUTION`,
      `  › Success (upside): 34% of scenarios`,
      `  › Neutral / stagnant: 28% of scenarios`,
      `  › Manageable setback: 27% of scenarios`,
      `  › Critical failure: 11% of scenarios`,
      ``,
      `KEY FAILURE MODES`,
      `  › Execution timing: 44% of failures (solvable)`,
      `  › Resource underestimation: 31% (mitigable)`,
      `  › Market misread: 25% (requires validation)`,
      ``,
      `STRATEGIC RECOMMENDATIONS`,
      `  › Proceed IF: [Condition A] + [Condition B] met`,
      `  › Delay IF: cash runway < 18 months`,
      `  › Abort IF: key dependency collapses`,
      ``,
      `OPTIONALITY SCORE: 8.2 / 10`,
      `REVERSIBILITY: HIGH (decision can be undone)`,
      `REGRET RISK IF SKIPPED: VERY HIGH`,
      ``,
      `VERDICT: PROCEED — De-risk via 90-day pilot first.`,
    ],
  },
  {
    id: "wellness" as AgentId,
    name: "Wellness Agent",
    color: "#8B5CF6",
    icon: "◇",
    tagline: "Human Performance Optimizer",
    inputLabel: "What's your wellness goal?",
    inputPlaceholder: "e.g. Better sleep, reduce stress, peak energy levels, mental clarity...",
    generateResponse: (goal) => [
      `WELLNESS PROTOCOL: ${goal.toUpperCase()}`,
      ``,
      `BIOMETRIC BASELINE SCAN`,
      `  › Energy cycle: 3 peak windows identified daily`,
      `  › Recovery deficit: 1.4h sleep debt flagged`,
      `  › Stress cortisol pattern: ELEVATED — actionable`,
      `  › HRV trend: Below optimal — 3 fixes available`,
      ``,
      `OPTIMIZATION PROTOCOL`,
      `  › Morning: 10-min cold exposure + sunlight anchor`,
      `  › Nutrition: Protein target 0.8g/lb bodyweight`,
      `  › Movement: Zone 2 cardio 4x/week (45 min)`,
      `  › Sleep: 10:30 PM cutoff — 90-min cycle alignment`,
      ``,
      `MENTAL PERFORMANCE`,
      `  › Deep work capacity: Currently 2.1h → target 4.5h`,
      `  › Distraction audit: 6 friction points eliminated`,
      `  › Meditation protocol: 10-min AM + 5-min PM`,
      `  › Recovery rituals: 4 high-ROI activities mapped`,
      ``,
      `WELLNESS SCORE: 64 / 100`,
      `POTENTIAL GAIN: +36 points in 30 days`,
      ``,
      `STATUS: PROTOCOL DEPLOYED — Week 1 actions ready.`,
    ],
  },
  {
    id: "productivity" as AgentId,
    name: "Productivity Agent",
    color: "#F59E0B",
    icon: "◆",
    tagline: "Cognitive Performance System",
    inputLabel: "What do you want to optimize?",
    inputPlaceholder: "e.g. My daily schedule, deep work blocks, focus system, output rate...",
    generateResponse: (target) => [
      `PRODUCTIVITY AUDIT: ${target.toUpperCase()}`,
      ``,
      `TIME LEAK ANALYSIS`,
      `  › Recoverable hours/day: 3.1h identified`,
      `  › Low-ROI tasks: 6 flagged for elimination`,
      `  › Context switching cost: 1.8h/day (hidden tax)`,
      `  › Meeting overhead: 40% above optimal`,
      ``,
      `PEAK PERFORMANCE ARCHITECTURE`,
      `  › Deep work blocks: 06:00–10:00 (protected)`,
      `  › Reactive work: 13:00–15:00 (batched)`,
      `  › Creative output: 16:00–18:00 (energy-matched)`,
      `  › Admin/comms: 08:30–09:00 + 17:00–17:30`,
      ``,
      `COGNITIVE LEVERAGE STACK`,
      `  › Single-tasking protocol: +67% throughput`,
      `  › Decision batching: 4 frameworks deployed`,
      `  › Energy management: Ultradian rhythm aligned`,
      `  › Delegation candidates: 5 tasks → freed`,
      ``,
      `SYSTEM METRICS`,
      `  › Current output rate: 3.2 / 10`,
      `  › Optimized output rate: 8.7 / 10`,
      `  › ETA to peak state: 21 days`,
      ``,
      `PRODUCTIVITY MULTIPLIER: 2.7x projected`,
      ``,
      `STATUS: SYSTEM DEPLOYED — Begin today at 06:00.`,
    ],
  },
  {
    id: "networking" as AgentId,
    name: "Networking Agent",
    color: "#EC4899",
    icon: "◆",
    tagline: "Relationship Intelligence Engine",
    inputLabel: "Who do you want to connect with?",
    inputPlaceholder: "e.g. VCs in fintech, senior engineers at FAANG, startup founders in NYC...",
    generateResponse: (target) => [
      `NETWORK INTELLIGENCE: ${target.toUpperCase()}`,
      ``,
      `TARGET MAPPING`,
      `  › Primary targets identified: 34 high-value profiles`,
      `  › Warm path to 18 via 2nd-degree connections`,
      `  › Cold outreach viability: 16 targets — HIGH`,
      `  › Highest leverage entry points: 3 mapped`,
      ``,
      `OUTREACH STRATEGY`,
      `  › Message framework: Value-first, 60-word limit`,
      `  › Optimal send window: Tue–Thu, 08:00–09:30 AM`,
      `  › Follow-up cadence: Day 5, Day 12 (non-pushy)`,
      `  › Personalization vectors: 4 per target segment`,
      ``,
      `RELATIONSHIP BUILDING SYSTEM`,
      `  › Insight sharing: Weekly value drops (2 per week)`,
      `  › Event leverage: 2 upcoming conferences flagged`,
      `  › Content positioning: 3 angles to attract inbound`,
      `  › CRM cadence: 90-day touch cycle deployed`,
      ``,
      `PROJECTED OUTCOMES`,
      `  › Reply rate: 34% (vs 8% cold average)`,
      `  › Meetings booked: 6–9 per month`,
      `  › Network density: +40% in 90 days`,
      ``,
      `STATUS: OUTREACH SEQUENCE ARMED — First send in 24h.`,
    ],
  },
  {
    id: "portfolio" as AgentId,
    name: "Portfolio Agent",
    color: "#A78BFA",
    icon: "◇",
    tagline: "Personal Brand Architect",
    inputLabel: "What do you want your portfolio to achieve?",
    inputPlaceholder: "e.g. Land senior roles, attract clients, build credibility as a founder...",
    generateResponse: (goal) => [
      `PORTFOLIO STRATEGY: ${goal.toUpperCase()}`,
      ``,
      `BRAND AUDIT`,
      `  › Current visibility score: 31 / 100`,
      `  › Signal-to-noise ratio: LOW — too generic`,
      `  › Unique positioning: Not yet defined`,
      `  › Content moat: 0 assets working for you 24/7`,
      ``,
      `POSITIONING ARCHITECTURE`,
      `  › Core narrative: 1 sentence, 8-word clarity test`,
      `  › Niche intersection: 3 rare skill combinations`,
      `  › Proof stack: 5 credibility anchors to build`,
      `  › Differentiation angle: Specific + Surprising`,
      ``,
      `CONTENT SYSTEM`,
      `  › Flagship piece: Long-form case study (1 per month)`,
      `  › Insight drops: 3 posts/week across 2 platforms`,
      `  › Social proof loop: Testimonials → reposts → inbound`,
      `  › SEO foundation: 4 high-intent keywords targeted`,
      ``,
      `PORTFOLIO ASSETS TO BUILD`,
      `  › Case study #1: Your biggest win quantified`,
      `  › Case study #2: Complex problem → elegant solution`,
      `  › Personal site: Conversion-optimized, minimal`,
      `  › LinkedIn: Top 1% profile structure mapped`,
      ``,
      `VISIBILITY PROJECTION: 31 → 87 / 100 in 90 days`,
      ``,
      `STATUS: BRAND MATRIX DEPLOYED — First asset in 7 days.`,
    ],
  },
  {
    id: "trend" as AgentId,
    name: "Trend Agent",
    color: "#E50914",
    icon: "◈",
    tagline: "Future Signal Intelligence",
    inputLabel: "What industry or space should I scan?",
    inputPlaceholder: "e.g. AI infrastructure, longevity biotech, creator economy, Web3...",
    generateResponse: (space) => [
      `TREND SCAN: ${space.toUpperCase()}`,
      ``,
      `SCANNING 847 SIGNAL SOURCES...`,
      ``,
      `EMERGING SIGNALS  [18-month window]`,
      `  › Signal #1: Consolidation phase beginning — HIGH`,
      `  › Signal #2: Infrastructure layer emerging — CRITICAL`,
      `  › Signal #3: Regulatory catalyst incoming — WATCH`,
      `  › Signal #4: Consumer behavior shift — +340% YoY`,
      ``,
      `EARLY MOVER WINDOWS`,
      `  › Window A: Closing in 4–6 months (ACT NOW)`,
      `  › Window B: Opening in 8 months (PREPARE)`,
      `  › Window C: 14-month runway available`,
      ``,
      `COMPETITIVE LANDSCAPE`,
      `  › Rising players: 3 (2 underestimated by market)`,
      `  › Declining: 4 incumbents — disruption inevitable`,
      `  › Whitespace: 2 uncontested zones identified`,
      `  › Moat builders: Network effects + data flywheel`,
      ``,
      `STRATEGIC POSITIONING`,
      `  › Optimal entry: Infrastructure layer, not app layer`,
      `  › Leverage point: Distribution before product`,
      `  › Risk: Regulatory — medium, 18-month buffer`,
      ``,
      `CONFIDENCE: 91% | INTELLIGENCE GRADE: A+`,
      ``,
      `STATUS: TREND MAP DEPLOYED — 7 actions extracted.`,
    ],
  },
  {
    id: "automation",
    name: "Automation Agent",
    color: "#F97316",
    icon: "◎",
    tagline: "Autonomous Workflow Engine",
    inputLabel: "What workflow should I automate?",
    inputPlaceholder: "e.g. Daily email triage, content publishing, research pipeline...",
    generateResponse: (workflow) => [
      `WORKFLOW ARCHITECTURE: ${workflow.toUpperCase()}`,
      ``,
      `BUILDING AUTOMATION GRAPH...`,
      ``,
      `TRIGGER LAYER`,
      `  [●] Event detected → System listening`,
      `  [●] Conditions mapped → 4 logic gates`,
      `  [●] Input validation → Schema locked`,
      ``,
      `EXECUTION LAYER`,
      `  [1] → Data ingestion ............ COMPLETE`,
      `  [2] → AI processing node ........ COMPLETE`,
      `  [3] → Decision routing .......... COMPLETE`,
      `  [4] → Output formatting ......... COMPLETE`,
      `  [5] → Delivery / action ......... COMPLETE`,
      ``,
      `OPTIMIZATION REPORT`,
      `  › Estimated time saved: 4.2h / week`,
      `  › Error rate: 0.3% (vs 8.4% manual)`,
      `  › Cost savings: $1,200/month`,
      `  › Scale factor: Unlimited`,
      ``,
      `AUTONOMOUS IMPROVEMENTS`,
      `  › Agent will self-optimize every 72h`,
      `  › Failure recovery: Automatic`,
      `  › Monitoring: Real-time alerts active`,
      ``,
      `STATUS: WORKFLOW DEPLOYED — Running autonomously.`,
    ],
  },
];

const genericConfig = (name: string, color: string, icon: string): AgentConfig => ({
  id: "wellness" as AgentId,
  name,
  color,
  icon,
  tagline: "Intelligent Analysis Engine",
  inputLabel: "What would you like to optimize?",
  inputPlaceholder: "Describe your goal or challenge...",
  generateResponse: (input) => [
    `ANALYSIS: ${input.toUpperCase()}`,
    ``,
    `INITIALIZING ${name.toUpperCase()}...`,
    ``,
    `DATA PROCESSING`,
    `  › Input classified: HIGH PRIORITY`,
    `  › Pattern matching: 847 analogous cases`,
    `  › Confidence calibration: COMPLETE`,
    ``,
    `STRATEGIC OUTPUT`,
    `  › Primary recommendation identified`,
    `  › 3 action vectors mapped`,
    `  › Risk profile: MANAGEABLE`,
    `  › Timeline: 30–90 day window`,
    ``,
    `OPTIMIZATION PATHS`,
    `  › Path A: High-velocity, high-effort (ROI: 4.2x)`,
    `  › Path B: Steady, low-risk (ROI: 2.8x)`,
    `  › Path C: Leverage-first (ROI: 6.1x)`,
    ``,
    `INTELLIGENCE SCORE: 88 / 100`,
    ``,
    `STATUS: ANALYSIS COMPLETE — Awaiting your next input.`,
  ],
});

const getConfig = (agentName: string): AgentConfig => {
  const found = agentConfigs.find((c) => c.name === agentName);
  if (found) return found;
  const agents_data: Record<string, { color: string; icon: string }> = {
    "Wellness Agent": { color: "#8B5CF6", icon: "◇" },
    "Productivity Agent": { color: "#F59E0B", icon: "◆" },
    "Networking Agent": { color: "#EC4899", icon: "◆" },
    "Portfolio Agent": { color: "#A78BFA", icon: "◇" },
    "Trend Agent": { color: "#E50914", icon: "◈" },
  };
  const d = agents_data[agentName] ?? { color: "#E50914", icon: "◈" };
  return genericConfig(agentName, d.color, d.icon);
};

interface Props {
  agentName: string;
  onClose: () => void;
}

export default function AgentModal({ agentName, onClose }: Props) {
  const config = getConfig(agentName);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [charIdx, setCharIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [fullResponse, setFullResponse] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running || fullResponse.length === 0) return;
    if (lineIdx >= fullResponse.length) { setDone(true); return; }

    const currentLine = fullResponse[lineIdx];
    if (charIdx < currentLine.length) {
      const t = setTimeout(() => {
        setLines((prev) => {
          const next = [...prev];
          next[lineIdx] = (next[lineIdx] ?? "") + currentLine[charIdx];
          return next;
        });
        setCharIdx((c) => c + 1);
      }, 12);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
        setLines((prev) => {
          const next = [...prev];
          if (next.length <= lineIdx + 1) next.push("");
          return next;
        });
      }, 30);
      return () => clearTimeout(t);
    }
  }, [running, fullResponse, lineIdx, charIdx]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const handleRun = () => {
    if (!input.trim() || running) return;
    const resp = config.generateResponse(input.trim());
    setFullResponse(resp);
    setLines([""]);
    setLineIdx(0);
    setCharIdx(0);
    setDone(false);
    setRunning(true);
  };

  const handleReset = () => {
    setRunning(false);
    setLines([]);
    setLineIdx(0);
    setCharIdx(0);
    setDone(false);
    setFullResponse([]);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(5,5,8,0.95)", backdropFilter: "blur(20px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl rounded-2xl border overflow-hidden flex flex-col"
        style={{
          background: "#0B0B0F",
          borderColor: config.color + "40",
          maxHeight: "90vh",
          boxShadow: `0 0 80px ${config.color}20`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: "#2A2A2E", background: "#0E0E12" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold" style={{ background: config.color + "20", color: config.color }}>
              {config.icon}
            </div>
            <div>
              <div className="font-black text-white text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{config.name}</div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: "#7A7A7A" }}>{config.tagline}</div>
            </div>
            <div className="flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-full border text-[10px] font-mono" style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              NEURAL ACTIVE
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "#7A7A7A", background: "#1C1C1F" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Input panel */}
          <div className="w-full lg:w-80 shrink-0 p-6 border-b lg:border-b-0 lg:border-r flex flex-col gap-4" style={{ borderColor: "#2A2A2E" }}>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#7A7A7A" }}>{config.inputLabel}</div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={config.inputPlaceholder}
                rows={4}
                disabled={running && !done}
                className="w-full rounded-xl border px-4 py-3 text-sm resize-none outline-none transition-all duration-200"
                style={{
                  background: "#141414",
                  borderColor: input ? config.color + "60" : "#2A2A2E",
                  color: "#fff",
                  fontFamily: "monospace",
                  boxShadow: input ? `0 0 12px ${config.color}15` : "none",
                }}
                onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && handleRun()}
              />
              <div className="text-[10px] mt-1.5" style={{ color: "#7A7A7A" }}>Ctrl+Enter to execute</div>
            </div>

            <div className="flex flex-col gap-2">
              {!running || done ? (
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${config.color}40` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={running && done ? handleReset : handleRun}
                  disabled={!input.trim()}
                  className="w-full py-3 rounded-xl font-bold text-sm tracking-wide text-white transition-all"
                  style={{
                    background: !input.trim() ? "#1C1C1F" : config.color,
                    color: !input.trim() ? "#7A7A7A" : "#fff",
                  }}
                >
                  {done ? "Run Again" : "Execute Agent"}
                </motion.button>
              ) : (
                <div className="w-full py-3 rounded-xl font-bold text-sm tracking-wide text-center border" style={{ color: config.color, borderColor: config.color + "40", background: config.color + "10" }}>
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>Processing…</motion.span>
                </div>
              )}
              {done && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleReset}
                  className="w-full py-2 rounded-xl text-xs border transition-all"
                  style={{ color: "#7A7A7A", borderColor: "#2A2A2E", background: "transparent" }}
                >
                  Clear
                </motion.button>
              )}
            </div>

            {/* Agent stats */}
            <div className="mt-auto pt-4 border-t" style={{ borderColor: "#2A2A2E" }}>
              <div className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "#7A7A7A" }}>Agent Stats</div>
              {[["Response Time", "1.2s"], ["Accuracy Rate", "94.7%"], ["Queries Today", "3,241"], ["Status", "Online"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "#7A7A7A" }}>{k}</span>
                  <span className="font-semibold" style={{ color: k === "Status" ? "#10B981" : config.color }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Output terminal */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b shrink-0" style={{ borderColor: "#2A2A2E", background: "#0D0D10" }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#E50914" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#10B981" }} />
              </div>
              <div className="text-xs font-mono ml-2" style={{ color: "#7A7A7A" }}>apex_os — neural output stream</div>
              {running && !done && (
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} className="ml-auto text-[10px] font-mono" style={{ color: config.color }}>
                  ● STREAMING
                </motion.div>
              )}
              {done && <div className="ml-auto text-[10px] font-mono" style={{ color: "#10B981" }}>✓ COMPLETE</div>}
            </div>

            <div ref={outputRef} className="flex-1 overflow-y-auto p-5 font-mono text-xs leading-relaxed" style={{ color: "#B3B3B3" }}>
              {!running && lines.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center" style={{ color: "#2A2A2E" }}>
                  <div className="text-4xl mb-4" style={{ color: config.color + "40" }}>{config.icon}</div>
                  <div className="text-xs" style={{ color: "#2A2A2E" }}>Enter input to activate {config.name}</div>
                </div>
              )}
              {lines.map((line, i) => (
                <div key={i} className="min-h-[1.5em]" style={{ color: line.startsWith("STATUS:") ? "#10B981" : line.startsWith("PHASE") || line.startsWith("NEURAL") || line.startsWith("OUTCOME") || line.startsWith("KEY") || line.startsWith("STRATEGIC") || line.startsWith("VERDICT") || line.startsWith("INTELLIGENCE") || line.startsWith("DATA") || line.startsWith("TRIGGER") || line.startsWith("EXECUTION") || line.startsWith("OPTIMIZATION") || line.startsWith("AUTONOMOUS") || line.startsWith("WEALTH") || line.startsWith("INCOME") || line.startsWith("RISK") || line.startsWith("OPTIONALITY") || line.startsWith("REFERENCES") || line.startsWith("TREND") || line.startsWith("CONFIDENCE") || line.startsWith("TRAJECTORY") || line.startsWith("SUCCESS") || line.startsWith("RETENTION") || line.startsWith("LEARNING") || line.startsWith("MASTERY") || line.startsWith("BUILDING") || line.startsWith("RUNNING") || line.startsWith("SCANNING") ? config.color : "#B3B3B3" }}>
                  {line || "\u00A0"}
                </div>
              ))}
              {running && !done && (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ color: config.color }}>█</motion.span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
