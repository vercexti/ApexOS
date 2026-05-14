import { motion } from "framer-motion";

const topics = [
  { name: "Linear Algebra", progress: 84, color: "#5865F2" },
  { name: "Neural Networks", progress: 67, color: "#E50914" },
  { name: "Statistics & Probability", progress: 91, color: "#10B981" },
  { name: "Reinforcement Learning", progress: 43, color: "#F59E0B", weak: true },
  { name: "Transformers Architecture", progress: 58, color: "#A78BFA" },
  { name: "MLOps & Deployment", progress: 29, color: "#EC4899", weak: true },
];

const schedule = [
  { time: "09:00", task: "Neural Networks — Backpropagation deep dive", duration: "90 min" },
  { time: "11:00", task: "Practice: PyTorch implementation", duration: "60 min" },
  { time: "14:00", task: "Statistics review — Bayesian inference", duration: "45 min" },
  { time: "16:00", task: "Flash quiz — Weak areas (RL + MLOps)", duration: "30 min" },
];

export default function StudyCommandCenter() {
  return (
    <section id="study" className="py-24 px-6" style={{ background: "#0B0B0F" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
          >
            Study Command Center
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Your AI Study<br />
            <span style={{ color: "#10B981" }}>Intelligence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl border p-6"
            style={{ background: "#141414", borderColor: "#2A2A2E" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Machine Learning Fundamentals</h3>
                <div className="text-xs mt-1" style={{ color: "#7A7A7A" }}>AI-Generated Curriculum · Week 6 of 12</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black" style={{ color: "#10B981", fontFamily: "'Syne', sans-serif" }}>64%</div>
                <div className="text-xs" style={{ color: "#7A7A7A" }}>Complete</div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {topics.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4"
                  data-testid={`topic-${t.name.toLowerCase().replace(/ /g, "-")}`}
                >
                  <div className="w-36 text-xs truncate flex items-center gap-1.5" style={{ color: t.weak ? "#EF4444" : "#B3B3B3" }}>
                    {t.weak && <span className="text-[10px] px-1 rounded" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>WEAK</span>}
                    {t.name}
                  </div>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#2A2A2E" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                      className="h-full rounded-full"
                      style={{ background: t.weak ? "#EF4444" : t.color }}
                    />
                  </div>
                  <span className="text-xs w-8 text-right" style={{ color: t.color }}>{t.progress}%</span>
                </motion.div>
              ))}
            </div>

            <div className="border-t pt-4" style={{ borderColor: "#2A2A2E" }}>
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: "#7A7A7A" }}>Today's Schedule</h4>
              <div className="space-y-2">
                {schedule.map((s, i) => (
                  <motion.div
                    key={s.time}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 py-2 rounded-lg px-3"
                    style={{ background: i === 0 ? "rgba(16,185,129,0.08)" : "transparent", border: i === 0 ? "1px solid rgba(16,185,129,0.2)" : "none" }}
                  >
                    <span className="text-xs font-mono w-12" style={{ color: i === 0 ? "#10B981" : "#7A7A7A" }}>{s.time}</span>
                    <span className="text-xs flex-1 text-white">{s.task}</span>
                    <span className="text-xs" style={{ color: "#7A7A7A" }}>{s.duration}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {[
              { label: "Study Streak", value: "23 days", icon: "◈", color: "#F59E0B" },
              { label: "Focus Time Today", value: "4h 12m", icon: "◉", color: "#5865F2" },
              { label: "Quiz Score Avg", value: "87%", icon: "◎", color: "#10B981" },
              { label: "Next Session", value: "09:00 AM", icon: "◆", color: "#E50914" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border p-5 flex items-center gap-4"
                style={{ background: "#141414", borderColor: "#2A2A2E" }}
                data-testid={`stat-study-${stat.label.toLowerCase().replace(/ /g, "-")}`}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: stat.color + "20", color: stat.color }}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{stat.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#7A7A7A" }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
