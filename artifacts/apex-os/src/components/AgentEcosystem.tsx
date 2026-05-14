import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const agents = [
  { name: "Study Agent", desc: "Builds adaptive learning paths and detects weak areas", color: "#5865F2", icon: "◈" },
  { name: "Research Agent", desc: "Scans 10,000+ sources for relevant intelligence daily", color: "#E50914", icon: "◉" },
  { name: "Career Agent", desc: "Maps optimal career paths based on your unique profile", color: "#10B981", icon: "◎" },
  { name: "Productivity Agent", desc: "Orchestrates your time for peak cognitive performance", color: "#F59E0B", icon: "◆" },
  { name: "Wellness Agent", desc: "Monitors energy cycles and optimizes your wellbeing", color: "#8B5CF6", icon: "◇" },
  { name: "Strategy Agent", desc: "Runs simulations to stress-test your decisions", color: "#06B6D4", icon: "◈" },
  { name: "Finance Agent", desc: "Projects wealth trajectories and identifies opportunities", color: "#34D399", icon: "◉" },
  { name: "Automation Agent", desc: "Builds workflows that run without your attention", color: "#F97316", icon: "◎" },
  { name: "Networking Agent", desc: "Identifies high-value connections and drafts outreach", color: "#EC4899", icon: "◆" },
  { name: "Portfolio Agent", desc: "Curates and positions your work for maximum impact", color: "#A78BFA", icon: "◇" },
  { name: "Trend Agent", desc: "Predicts emerging opportunities 18 months ahead", color: "#E50914", icon: "◈" },
];

const liveActivity = [
  "Neural systems processing 3.2M data points…",
  "AI opportunity radar scanning 847 markets…",
  "Predictive intelligence calibrating models…",
  "Future simulation updating 12,000 scenarios…",
  "Autonomous agents collaborating on your path…",
  "Career trajectory analysis complete…",
];

export default function AgentEcosystem() {
  const [activityIdx, setActivityIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setActivityIdx((i) => (i + 1) % liveActivity.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="agents" className="py-24 px-6" style={{ background: "#0B0B0F" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#E50914", borderColor: "rgba(229,9,20,0.3)", background: "rgba(229,9,20,0.08)" }}
          >
            AI Agent Ecosystem
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            11 Autonomous Agents<br />
            <span style={{ color: "#E50914" }}>Working For You</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Not tools. Not assistants. Autonomous intelligences that never stop optimizing your potential.
          </p>

          <motion.div
            key={activityIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono"
            style={{ color: "#B3B3B3", borderColor: "#2A2A2E", background: "#141414" }}
            data-testid="live-activity-feed"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
            {liveActivity[activityIdx]}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative rounded-xl p-5 border cursor-default overflow-hidden group transition-all duration-300"
              style={{
                background: hoveredIdx === i ? "#1C1C1F" : "#141414",
                borderColor: hoveredIdx === i ? agent.color + "60" : "#2A2A2E",
                boxShadow: hoveredIdx === i ? `0 0 30px ${agent.color}20` : "none",
              }}
              data-testid={`card-agent-${i}`}
            >
              {hoveredIdx === i && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 30% 30%, ${agent.color}10 0%, transparent 60%)` }} />
              )}

              <div className="relative z-10 flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                  style={{ background: agent.color + "20", color: agent.color }}
                >
                  {agent.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
                  <span className="text-xs" style={{ color: "#7A7A7A" }}>Active</span>
                </div>
              </div>

              <h3 className="relative z-10 font-bold text-sm text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                {agent.name}
              </h3>
              <p className="relative z-10 text-xs leading-relaxed" style={{ color: "#7A7A7A" }}>
                {agent.desc}
              </p>

              {hoveredIdx === i && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                  style={{ background: `linear-gradient(90deg, ${agent.color}, transparent)` }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
