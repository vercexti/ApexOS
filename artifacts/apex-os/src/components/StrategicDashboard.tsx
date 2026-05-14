import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const useCounter = (target: number, duration = 2000) => {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const t = setInterval(() => {
      current += inc;
      if (current >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.round(current));
    }, duration / steps);
    return () => clearInterval(t);
  }, [started, target, duration]);
  return { val, start: () => setStarted(true) };
};

const metrics = [
  { label: "Neural Operations / Day", value: 3200000, format: (v: number) => (v / 1000000).toFixed(1) + "M", color: "#E50914", icon: "◈" },
  { label: "Agent Accuracy Rate", value: 94, format: (v: number) => v + "%", color: "#10B981", icon: "◎" },
  { label: "Futures Simulated", value: 12000, format: (v: number) => v.toLocaleString(), color: "#5865F2", icon: "◆" },
  { label: "Time Saved / Week", value: 42, format: (v: number) => v / 10 + "h", color: "#F59E0B", icon: "◇" },
];

const agentActivity = [
  { agent: "Strategy Agent", action: "Completed 200-scenario simulation for startup pivot", time: "2s ago", color: "#06B6D4" },
  { agent: "Research Agent", action: "Flagged 3 early-mover opportunities in AI infra", time: "8s ago", color: "#E50914" },
  { agent: "Career Agent", action: "Mapped optimal 18-month trajectory for profile #4821", time: "14s ago", color: "#10B981" },
  { agent: "Finance Agent", action: "Updated wealth projection: +$340K optimization found", time: "23s ago", color: "#34D399" },
  { agent: "Study Agent", action: "Neural roadmap deployed for Machine Learning path", time: "31s ago", color: "#5865F2" },
  { agent: "Automation Agent", action: "Workflow #14 self-optimized — 12% efficiency gain", time: "47s ago", color: "#F97316" },
];

const sparklineData = [30, 45, 38, 60, 55, 72, 68, 85, 78, 92, 88, 97, 91, 99, 95, 100];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  const area = `0,${h} ` + pts + ` ${w},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height: 32 }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        points={area}
        fill={`url(#grad-${color.replace("#", "")})`}
      />
      <motion.polyline
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  );
}

export default function StrategicDashboard() {
  const [activityIdx, setActivityIdx] = useState(0);
  const [inView, setInView] = useState(false);

  const counters = metrics.map((m) => useCounter(m.value, 2000));

  useEffect(() => {
    const interval = setInterval(() => setActivityIdx((i) => (i + 1) % agentActivity.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-24 px-6" style={{ background: "#0B0B0F" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          onViewportEnter={() => {
            setInView(true);
            counters.forEach((c) => c.start());
          }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#5865F2", borderColor: "rgba(88,101,242,0.3)", background: "rgba(88,101,242,0.08)" }}
          >
            Strategic Intelligence Dashboard · Live
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Everything Is<br />
            <span style={{ color: "#5865F2" }}>Measured</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Real-time intelligence metrics across all 11 agents. Every decision tracked, every outcome optimized.
          </p>
        </motion.div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border p-5 relative overflow-hidden"
              style={{ background: "#141414", borderColor: "#2A2A2E" }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 0%, ${m.color}10 0%, transparent 70%)` }} />
              <div className="text-lg font-bold mb-1" style={{ color: m.color }}>{m.icon}</div>
              <motion.div
                className="text-2xl font-black text-white mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {m.format(counters[i].val)}
              </motion.div>
              <div className="text-[10px] tracking-wide uppercase mb-3" style={{ color: "#7A7A7A" }}>{m.label}</div>
              <Sparkline data={sparklineData} color={m.color} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Neural activity heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 rounded-xl border p-6"
            style={{ background: "#141414", borderColor: "#2A2A2E" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-bold text-white text-sm mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>Neural Activity Matrix</div>
                <div className="text-xs" style={{ color: "#7A7A7A" }}>Agent collaboration intensity — last 24 hours</div>
              </div>
              <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#10B981" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
                Live
              </motion.div>
            </div>

            {/* Heatmap grid */}
            <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(24, 1fr)" }}>
              {Array.from({ length: 24 * 11 }, (_, i) => {
                const intensity = Math.random();
                const colors = ["#E50914", "#5865F2", "#10B981", "#F59E0B", "#8B5CF6", "#06B6D4", "#34D399", "#F97316", "#EC4899", "#A78BFA", "#E50914"];
                const agentColor = colors[Math.floor(i / 24)];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: (i % 24) * 0.008 + Math.floor(i / 24) * 0.04 }}
                    className="rounded-sm"
                    style={{
                      height: 14,
                      background: intensity > 0.7 ? agentColor : intensity > 0.4 ? agentColor + "60" : "#1C1C1F",
                    }}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                {["Low", "Medium", "High"].map((level, i) => (
                  <div key={level} className="flex items-center gap-1 text-[10px]" style={{ color: "#7A7A7A" }}>
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: i === 0 ? "#1C1C1F" : i === 1 ? "#E5091460" : "#E50914" }} />
                    {level}
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-mono" style={{ color: "#7A7A7A" }}>11 agents × 24h</div>
            </div>
          </motion.div>

          {/* Live agent activity stream */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border p-6"
            style={{ background: "#141414", borderColor: "#2A2A2E" }}
          >
            <div className="font-bold text-white text-sm mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Live Agent Stream</div>
            <div className="text-xs mb-5" style={{ color: "#7A7A7A" }}>Real-time agent activity</div>
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {agentActivity.slice(activityIdx, activityIdx + 4).concat(
                  activityIdx + 4 > agentActivity.length ? agentActivity.slice(0, (activityIdx + 4) % agentActivity.length) : []
                ).map((a, i) => (
                  <motion.div
                    key={a.agent + a.time}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1 - i * 0.2, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2.5"
                  >
                    <motion.span
                      animate={{ opacity: i === 0 ? [1, 0.3, 1] : 1 }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                      style={{ background: a.color }}
                    />
                    <div>
                      <div className="text-[10px] font-bold mb-0.5" style={{ color: a.color }}>{a.agent}</div>
                      <div className="text-[10px] leading-relaxed" style={{ color: "#B3B3B3" }}>{a.action}</div>
                      <div className="text-[9px] mt-0.5" style={{ color: "#7A7A7A" }}>{a.time}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
