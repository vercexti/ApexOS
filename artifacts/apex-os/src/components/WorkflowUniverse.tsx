import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ExecState = "idle" | "pending" | "running" | "complete" | "failed";

interface Workflow {
  name: string;
  color: string;
  icon: string;
  trigger: string;
  nodes: string[];
  metric: string;
  timeSaved: string;
}

const workflows: Workflow[] = [
  {
    name: "Study Pipeline",
    color: "#5865F2",
    icon: "◈",
    trigger: "Daily at 08:00",
    nodes: ["Topic ingestion", "AI breakdown", "Schedule builder", "Flashcard gen", "Progress sync"],
    metric: "3.2h saved / day",
    timeSaved: "3.2h",
  },
  {
    name: "Content Engine",
    color: "#E50914",
    icon: "◉",
    trigger: "On demand",
    nodes: ["Brief input", "AI research", "Draft generation", "SEO optimize", "Publish"],
    metric: "+220% output",
    timeSaved: "4.1h",
  },
  {
    name: "Career Radar",
    color: "#10B981",
    icon: "◎",
    trigger: "Every 6 hours",
    nodes: ["Market scan", "Job match", "Skill gap check", "Outreach draft", "Track"],
    metric: "23 leads/week",
    timeSaved: "2.8h",
  },
  {
    name: "Finance Monitor",
    color: "#F59E0B",
    icon: "◆",
    trigger: "Real-time",
    nodes: ["Portfolio sync", "Risk analysis", "Opportunity flag", "Alert routing", "Report"],
    metric: "$340K optimized",
    timeSaved: "1.5h",
  },
  {
    name: "Research Loop",
    color: "#A78BFA",
    icon: "◇",
    trigger: "On query",
    nodes: ["Source crawl", "AI synthesis", "Insight extract", "Report build", "Deliver"],
    metric: "847 signals/day",
    timeSaved: "5.0h",
  },
  {
    name: "Network Engine",
    color: "#EC4899",
    icon: "◎",
    trigger: "Weekly",
    nodes: ["Profile scan", "Value match", "Message draft", "Send & track", "Follow-up"],
    metric: "34% reply rate",
    timeSaved: "2.2h",
  },
];

function WorkflowCard({ wf, defaultState }: { wf: Workflow; defaultState: ExecState }) {
  const [state, setState] = useState<ExecState>(defaultState);
  const [nodeIdx, setNodeIdx] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);

  const run = () => {
    if (state === "running" || state === "pending") return;
    setState("pending");
    setNodeIdx(-1);
    setLogs([]);
    setTimeout(() => {
      setState("running");
      setNodeIdx(0);
      setLogs([`[${new Date().toLocaleTimeString()}] Workflow initiated`]);
    }, 600);
  };

  useEffect(() => {
    if (state !== "running" || nodeIdx < 0) return;
    if (nodeIdx >= wf.nodes.length) {
      setState("complete");
      setLogs((l) => [...l, `[${new Date().toLocaleTimeString()}] All nodes complete — ${wf.metric}`]);
      return;
    }
    const t = setTimeout(() => {
      setLogs((l) => [...l, `[${new Date().toLocaleTimeString()}] ${wf.nodes[nodeIdx]} ✓`]);
      setNodeIdx((n) => n + 1);
    }, 700);
    return () => clearTimeout(t);
  }, [state, nodeIdx, wf.nodes, wf.metric]);

  const reset = () => { setState("idle"); setNodeIdx(-1); setLogs([]); };

  const stateColor: Record<ExecState, string> = {
    idle: "#7A7A7A", pending: "#F59E0B", running: "#10B981", complete: "#10B981", failed: "#E50914",
  };
  const stateLabel: Record<ExecState, string> = {
    idle: "Idle", pending: "Pending…", running: "Running", complete: "Complete", failed: "Failed",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border overflow-hidden"
      style={{ background: "#1C1C1F", borderColor: state !== "idle" ? wf.color + "50" : "#2A2A2E", boxShadow: state === "running" ? `0 0 20px ${wf.color}15` : "none", transition: "box-shadow 0.3s, border-color 0.3s" }}
    >
      {/* Top bar */}
      <motion.div
        className="h-0.5"
        style={{ background: state !== "idle" ? `linear-gradient(90deg, ${wf.color}, transparent)` : "transparent" }}
        animate={state === "running" ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 1.2, repeat: Infinity }}
      />

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold" style={{ background: wf.color + "20", color: wf.color }}>
              {wf.icon}
            </div>
            <div>
              <div className="font-bold text-white text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{wf.name}</div>
              <div className="text-[10px] font-mono mt-0.5" style={{ color: "#7A7A7A" }}>{wf.trigger}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span
              animate={state === "running" ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: stateColor[state] }}
            />
            <span className="text-xs font-mono" style={{ color: stateColor[state] }}>{stateLabel[state]}</span>
          </div>
        </div>

        {/* Node pipeline */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-hide">
          {wf.nodes.map((node, i) => (
            <div key={node} className="flex items-center gap-1 shrink-0">
              <motion.div
                animate={{
                  background: i < nodeIdx ? wf.color : i === nodeIdx && state === "running" ? wf.color + "80" : "#2A2A2E",
                  scale: i === nodeIdx && state === "running" ? [1, 1.15, 1] : 1,
                  boxShadow: i === nodeIdx && state === "running" ? [`0 0 0px ${wf.color}`, `0 0 10px ${wf.color}`, `0 0 0px ${wf.color}`] : "none",
                }}
                transition={i === nodeIdx && state === "running" ? { duration: 0.7, repeat: Infinity } : { duration: 0.3 }}
                className="text-[9px] font-mono px-2 py-1 rounded-md whitespace-nowrap"
                style={{ color: i <= nodeIdx ? "#fff" : "#7A7A7A", background: "#2A2A2E" }}
              >
                {i < nodeIdx ? "✓ " : i === nodeIdx && state === "running" ? "▶ " : ""}{node}
              </motion.div>
              {i < wf.nodes.length - 1 && (
                <motion.div
                  className="w-3 h-px shrink-0"
                  animate={{ background: i < nodeIdx ? wf.color : "#2A2A2E" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Execution log */}
        <AnimatePresence>
          {logs.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="rounded-lg p-3 font-mono text-[10px] space-y-0.5" style={{ background: "#141414", color: "#7A7A7A", maxHeight: 80, overflowY: "auto" }}>
                {logs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} style={{ color: log.includes("complete") || log.includes("✓") ? wf.color : "#7A7A7A" }}>
                    {log}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ color: wf.color, background: wf.color + "15" }}>
            {wf.metric}
          </div>
          <div className="flex gap-2">
            {state === "complete" && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.04 }}
                onClick={reset}
                className="text-[10px] px-2.5 py-1.5 rounded-lg border"
                style={{ color: "#7A7A7A", borderColor: "#2A2A2E" }}
              >
                Reset
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 0 16px ${wf.color}40` }}
              whileTap={{ scale: 0.96 }}
              onClick={run}
              disabled={state === "running" || state === "pending"}
              className="text-[10px] font-bold px-3 py-1.5 rounded-lg text-white transition-all"
              style={{
                background: state === "running" || state === "pending" ? "#2A2A2E" : wf.color,
                color: state === "running" || state === "pending" ? "#7A7A7A" : "#fff",
              }}
            >
              {state === "running" ? "Running…" : state === "pending" ? "Starting…" : state === "complete" ? "Run Again" : "Execute"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const defaultStates: ExecState[] = ["running", "running", "idle", "running", "idle", "running"];

export default function WorkflowUniverse() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="workflows" className="py-24 px-6" style={{ background: "#141414" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#A78BFA", borderColor: "rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.08)" }}
          >
            Autonomous Workflow Engine · Click to Execute
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Automation That<br />
            <span style={{ color: "#A78BFA" }}>Thinks For Itself</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Deploy once. Watch it evolve, self-optimize, and compound your outcomes. Click any workflow to execute it live.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workflows.map((wf, i) => (
            <WorkflowCard key={wf.name} wf={wf} defaultState={defaultStates[i]} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <motion.div
            key={tick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border"
            style={{ color: "#7A7A7A", borderColor: "#2A2A2E", background: "#0B0B0F" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
            {["All systems operational · 4 workflows running", "Neural activity: 99.2% uptime", "47 optimizations applied this hour"][tick % 3]}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
