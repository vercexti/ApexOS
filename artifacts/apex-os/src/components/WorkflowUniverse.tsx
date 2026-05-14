import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const workflows = [
  { name: "Resume Builder", status: "running", lastRun: "2 min ago", metric: "98 versions tested", color: "#E50914" },
  { name: "LinkedIn Optimizer", status: "running", lastRun: "5 min ago", metric: "+34% profile views", color: "#5865F2" },
  { name: "Interview Prep AI", status: "idle", lastRun: "1h ago", metric: "127 questions ready", color: "#10B981" },
  { name: "Skill Gap Analyzer", status: "running", lastRun: "12 min ago", metric: "8 gaps identified", color: "#F59E0B" },
  { name: "Network Intelligence", status: "running", lastRun: "Just now", metric: "23 new connections", color: "#A78BFA" },
  { name: "Market Radar", status: "idle", lastRun: "30 min ago", metric: "847 signals tracked", color: "#06B6D4" },
];

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
            Workflow Universe
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Autonomous Workflows<br />
            <span style={{ color: "#A78BFA" }}>That Never Sleep</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Set them once. They optimize, iterate, and improve — without your attention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workflows.map((wf, i) => (
            <motion.div
              key={wf.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, borderColor: wf.color + "60" }}
              className="rounded-xl border p-6 cursor-default relative overflow-hidden transition-all duration-200"
              style={{ background: "#1C1C1F", borderColor: "#2A2A2E" }}
              data-testid={`card-workflow-${i}`}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: wf.status === "running" ? `linear-gradient(90deg, ${wf.color}, transparent)` : "transparent" }}
                animate={wf.status === "running" ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{ background: wf.color + "20", color: wf.color, fontFamily: "'Syne', sans-serif" }}
                >
                  {wf.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={wf.status === "running" ? { opacity: [1, 0.3, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: wf.status === "running" ? "#10B981" : "#7A7A7A" }}
                  />
                  <span className="text-xs capitalize" style={{ color: wf.status === "running" ? "#10B981" : "#7A7A7A" }}>
                    {wf.status}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-white text-sm mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{wf.name}</h3>
              <div className="text-xs mb-3" style={{ color: "#7A7A7A" }}>Last run: {wf.lastRun}</div>
              <div
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg inline-block"
                style={{ color: wf.color, background: wf.color + "15" }}
              >
                {wf.metric}
              </div>
            </motion.div>
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
