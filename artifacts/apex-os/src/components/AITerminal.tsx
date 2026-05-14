import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS: Record<string, string[]> = {
  help: [
    "APEX_OS COMMAND INTERFACE v2.0.1",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "  analyze   [topic]     — Deep intelligence scan",
    "  simulate  [scenario]  — Run predictive simulation",
    "  optimize  [target]    — Find peak performance path",
    "  deploy    [workflow]  — Launch autonomous agent",
    "  train     [skill]     — Build neural learning path",
    "  research  [query]     — Extract global intelligence",
    "  execute   [command]   — Run priority action",
    "  status               — System diagnostics",
    "  agents               — List active agents",
    "  clear                — Clear terminal",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],
  status: [
    "SYSTEM DIAGNOSTICS",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "  Neural Core          ████████████████  ONLINE",
    "  Agent Cluster        ████████████████  11/11 ACTIVE",
    "  Intelligence Matrix  ████████████████  OPTIMAL",
    "  Automation Engine    ████████████████  RUNNING",
    "  Career Galaxy        ████████████████  CALIBRATED",
    "  Future Engine        ████████████████  SIMULATING",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "  Uptime: 99.97%  |  Latency: 1.2ms  |  Load: 34%",
    "",
    "  All systems nominal.",
  ],
  agents: [
    "ACTIVE AGENT REGISTRY",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "  [01] Study Agent       ● ACTIVE    3,241 ops today",
    "  [02] Research Agent    ● ACTIVE    8,472 scans today",
    "  [03] Career Agent      ● ACTIVE    1,893 paths mapped",
    "  [04] Productivity Ag.  ● ACTIVE    2,120 optimizations",
    "  [05] Wellness Agent    ● ACTIVE    450 cycles tracked",
    "  [06] Strategy Agent    ● ACTIVE    12,000 simulations",
    "  [07] Finance Agent     ● ACTIVE    $4.2M analyzed",
    "  [08] Automation Agent  ● ACTIVE    14 workflows live",
    "  [09] Networking Agent  ● ACTIVE    23 connections found",
    "  [10] Portfolio Agent   ● ACTIVE    98 projects reviewed",
    "  [11] Trend Agent       ● ACTIVE    847 signals scanned",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],
};

const getDynamicResponse = (cmd: string, args: string): string[] => {
  const argUpper = args ? args.toUpperCase() : "QUERY";
  switch (cmd) {
    case "analyze":
      return [
        `ANALYZING: ${argUpper}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  Scanning 10,000+ intelligence sources...",
        "  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░  Ingesting...",
        "  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Complete.",
        "",
        "  KEY FINDINGS",
        "  › Signal strength: HIGH (89% confidence)",
        "  › Market relevance: CRITICAL in next 12 months",
        "  › Risk factors: 2 identified, both mitigable",
        "  › Strategic opportunity: CONFIRMED",
        "",
        "  RECOMMENDED ACTION: Proceed immediately.",
      ];
    case "simulate":
      return [
        `SIMULATION: ${argUpper}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  Initializing 200-scenario Monte Carlo engine...",
        "",
        "  Scenario A (Best):    94.2% probability → SUCCESS",
        "  Scenario B (Base):    71.8% probability → SUCCESS",
        "  Scenario C (Bear):    48.3% probability → MANAGED",
        "  Scenario D (Tail):    11.2% probability → RISK",
        "",
        "  CRITICAL PATH: Resource + timing alignment",
        "  INFLECTION POINT: Month 6 decision node",
        "  VERDICT: High optionality. Proceed with pilot.",
      ];
    case "optimize":
      return [
        `OPTIMIZING: ${argUpper}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  Running performance bottleneck analysis...",
        "",
        "  FRICTION POINTS IDENTIFIED",
        "  › Time leakage: 2.4h/day (recoverable)",
        "  › Decision latency: HIGH (reduce via frameworks)",
        "  › Energy allocation: 34% on low-ROI tasks",
        "",
        "  OPTIMIZED CONFIGURATION",
        "  › Peak hours: 06:00–10:00 → deep work locked",
        "  › Delegation candidates: 6 tasks identified",
        "  › Efficiency gain: +67% projected",
        "",
        "  ETA TO PEAK STATE: 21 days.",
      ];
    case "deploy":
      return [
        `DEPLOYING: ${argUpper}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  Building workflow graph...",
        "",
        "  [1] Trigger node ............... ✓ DEPLOYED",
        "  [2] Intelligence layer ......... ✓ DEPLOYED",
        "  [3] Decision routing ........... ✓ DEPLOYED",
        "  [4] Execution engine ........... ✓ DEPLOYED",
        "  [5] Monitoring + alerts ........ ✓ DEPLOYED",
        "",
        "  WORKFLOW LIVE — Running autonomously.",
        "  Time saved estimate: 4.2h/week",
        "  Error rate: 0.3% (vs 8.4% manual)",
      ];
    case "train":
      return [
        `TRAINING PATH: ${argUpper}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  Neural learning architecture initialized...",
        "",
        "  Phase 1 — Foundations   [14 days]  → SCHEDULED",
        "  Phase 2 — Application   [21 days]  → SCHEDULED",
        "  Phase 3 — Mastery       [30 days]  → SCHEDULED",
        "",
        "  RESOURCES IDENTIFIED: 14 primary, 6 supplemental",
        "  PRACTICE SCHEDULE: Daily 45-min deep work blocks",
        "  RETENTION SCORE: 94/100 (optimized for your profile)",
        "",
        "  Mastery ETA: 54 days. Begin today.",
      ];
    case "research":
      return [
        `RESEARCH QUERY: ${argUpper}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  Scanning 10,000+ sources...",
        "",
        "  INTELLIGENCE REPORT",
        "  › Key insight #1: Market trajectory +340% YoY",
        "  › Key insight #2: 3 early-mover windows open",
        "  › Key insight #3: Regulatory shift expected Q3",
        "",
        "  ENTITIES MAPPED: 12 players, 2 underestimated",
        "  CONFIDENCE: 89% | GRADE: A+",
        "",
        "  14 strategic actions extracted.",
      ];
    case "execute":
      return [
        `EXECUTING: ${argUpper}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  Priority classification: CRITICAL",
        "  Resource allocation: OPTIMAL",
        "  Agent assignment: Strategy + Automation",
        "",
        "  EXECUTION SEQUENCE",
        "  › Step 1: Context loading ......... ✓ DONE",
        "  › Step 2: Plan generation ......... ✓ DONE",
        "  › Step 3: Risk assessment ......... ✓ DONE",
        "  › Step 4: Action deployment ....... ✓ DONE",
        "",
        "  COMPLETE. Results propagated to all agents.",
      ];
    default:
      return [`Command not recognized: ${cmd}`, `Type 'help' for available commands.`];
  }
};

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

const BOOT_LINES = [
  "APEX_OS v2.0.1 — Neural Command Interface",
  "Neural Core: ONLINE  |  11 Agents: ACTIVE  |  Intelligence: OPTIMAL",
  "Type 'help' for available commands.",
  "",
];

export default function AITerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [bootLine, setBootLine] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bootLine < BOOT_LINES.length) {
      const t = setTimeout(() => {
        setHistory((h) => [...h, { type: "output", content: BOOT_LINES[bootLine] }]);
        setBootLine((b) => b + 1);
      }, bootLine === 0 ? 300 : 250);
      return () => clearTimeout(t);
    } else {
      setBooted(true);
    }
  }, [bootLine]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setHistory((h) => [...h, { type: "input", content: trimmed }]);
    setCmdHistory((h) => [trimmed, ...h]);
    setHistIdx(-1);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const [cmd, ...argParts] = trimmed.split(" ");
    const args = argParts.join(" ");

    const known = COMMANDS[cmd.toLowerCase()];
    const response = known ?? getDynamicResponse(cmd.toLowerCase(), args);

    let delay = 100;
    response.forEach((line, i) => {
      setTimeout(() => {
        setHistory((h) => [...h, { type: "output", content: line }]);
      }, delay + i * 40);
    });
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(next); setInput(cmdHistory[next] ?? ""); }
    }
  };

  const quickCmds = ["help", "status", "agents", "analyze future of work", "simulate startup launch", "optimize my day", "research AI market 2025"];

  return (
    <section id="terminal" className="py-24 px-6" style={{ background: "#050508" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
          >
            Neural Command Interface · Live
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Command the<br />
            <span style={{ color: "#10B981" }}>Intelligence</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Direct access to the APEX OS neural core. Type a command or click a shortcut below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "rgba(16,185,129,0.2)", boxShadow: "0 0 60px rgba(16,185,129,0.06)" }}
        >
          {/* Terminal chrome */}
          <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: "#0D0D10", borderColor: "#1C1C1F" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#E50914" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#10B981" }} />
            </div>
            <div className="text-xs font-mono" style={{ color: "#7A7A7A" }}>apex_os — neural-command-interface</div>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="ml-auto flex items-center gap-1.5 text-[10px] font-mono" style={{ color: "#10B981" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              LIVE
            </motion.div>
          </div>

          {/* Output */}
          <div
            ref={outputRef}
            onClick={() => inputRef.current?.focus()}
            className="p-5 font-mono text-xs leading-relaxed overflow-y-auto cursor-text"
            style={{ background: "#080810", minHeight: "380px", maxHeight: "420px", color: "#B3B3B3" }}
          >
            {history.map((line, i) => (
              <div key={i} className="mb-0.5" style={{ color: line.type === "input" ? "#10B981" : line.type === "error" ? "#E50914" : line.content.startsWith("  ›") || line.content.startsWith("  [") || line.content.startsWith("  VERDICT") || line.content.startsWith("  COMPLETE") ? "#10B981" : line.content.startsWith("APEX_OS") || line.content.startsWith("ANALYZING") || line.content.startsWith("SIMULATION") || line.content.startsWith("OPTIMIZING") || line.content.startsWith("DEPLOYING") || line.content.startsWith("TRAINING") || line.content.startsWith("RESEARCH") || line.content.startsWith("EXECUTING") || line.content.startsWith("ACTIVE") || line.content.startsWith("SYSTEM") ? "#E50914" : "#B3B3B3" }}>
                {line.type === "input" ? (
                  <span><span style={{ color: "#10B981" }}>apex@os</span><span style={{ color: "#7A7A7A" }}>:~$</span> {line.content}</span>
                ) : (
                  line.content || "\u00A0"
                )}
              </div>
            ))}

            {/* Input line */}
            {booted && (
              <div className="flex items-center gap-2 mt-1">
                <span style={{ color: "#10B981" }}>apex@os</span>
                <span style={{ color: "#7A7A7A" }}>:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="flex-1 bg-transparent outline-none caret-green-400"
                  style={{ color: "#10B981", fontFamily: "monospace", fontSize: "12px" }}
                  autoFocus
                  spellCheck={false}
                />
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ color: "#10B981" }}>█</motion.span>
              </div>
            )}
          </div>

          {/* Quick commands */}
          <div className="px-4 py-3 border-t flex flex-wrap gap-2" style={{ background: "#0D0D10", borderColor: "#1C1C1F" }}>
            <span className="text-[10px] font-mono self-center mr-1" style={{ color: "#7A7A7A" }}>Quick:</span>
            {quickCmds.map((cmd) => (
              <motion.button
                key={cmd}
                whileHover={{ scale: 1.04, borderColor: "rgba(16,185,129,0.5)", color: "#10B981" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { runCommand(cmd); inputRef.current?.focus(); }}
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-all"
                style={{ color: "#7A7A7A", borderColor: "#2A2A2E", background: "#141414" }}
              >
                {cmd}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
