import { motion } from "framer-motion";

const futures = [
  {
    label: "1 Year",
    role: "Senior AI Engineer",
    salary: "$180K",
    milestones: ["First ML model shipped", "Open source contributions", "Team lead role"],
    network: "340 connections",
    gradient: "from-[#2A2A2E] to-[#1C1C1F]",
    accent: "#5865F2",
    glow: "rgba(88,101,242,0.15)",
  },
  {
    label: "3 Years",
    role: "Principal AI Architect",
    salary: "$280K",
    milestones: ["Patent filed", "Conference speaker", "Team of 8 engineers"],
    network: "1,200 connections",
    gradient: "from-[#2A1A1A] to-[#1C1010]",
    accent: "#E50914",
    glow: "rgba(229,9,20,0.2)",
    featured: true,
  },
  {
    label: "5 Years",
    role: "AI Startup Founder / CTO",
    salary: "$500K+",
    milestones: ["Series A raised", "50+ team members", "Industry recognition"],
    network: "5,000+ connections",
    gradient: "from-[#1A1E2A] to-[#10121C]",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.15)",
  },
];

export default function FutureSelf() {
  return (
    <section className="py-24 px-6" style={{ background: "#0B0B0F" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)" }}
          >
            Future Self Simulation
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Meet Your<br />
            <span style={{ color: "#F59E0B" }}>Future Self</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            AI-simulated projections based on your trajectory. Not predictions — possibilities you can build toward.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futures.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative rounded-2xl border overflow-hidden cursor-default"
              style={{
                background: "#141414",
                borderColor: f.featured ? f.accent + "80" : "#2A2A2E",
                boxShadow: f.featured ? `0 0 40px ${f.glow}` : "none",
              }}
              data-testid={`card-future-${f.label.replace(" ", "-").toLowerCase()}`}
            >
              {f.featured && (
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }} />
              )}

              <div className="relative p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ color: f.accent, background: f.glow, border: `1px solid ${f.accent}40` }}
                  >
                    {f.label}
                  </span>
                  {f.featured && (
                    <span className="text-xs px-2 py-0.5 rounded" style={{ color: "#E50914", background: "rgba(229,9,20,0.1)" }}>
                      Most Likely
                    </span>
                  )}
                </div>

                <div className="mb-2 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center relative" style={{ background: f.glow, border: `2px solid ${f.accent}40` }}>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      className="w-10 h-10 rounded-full"
                      style={{ background: `radial-gradient(circle, ${f.accent}60 0%, transparent 70%)` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-black" style={{ color: f.accent, fontFamily: "'Syne', sans-serif" }}>
                      {i + 1}
                    </div>
                  </div>
                </div>

                <h3 className="text-center font-black text-white text-lg mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{f.role}</h3>
                <div className="text-center text-2xl font-black mb-4" style={{ color: f.accent, fontFamily: "'Syne', sans-serif" }}>{f.salary}</div>

                <div className="space-y-2 mb-4">
                  {f.milestones.map((m) => (
                    <div key={m} className="flex items-center gap-2 text-xs" style={{ color: "#B3B3B3" }}>
                      <span style={{ color: f.accent }}>✓</span>
                      {m}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "#2A2A2E" }}>
                  <span className="text-xs" style={{ color: "#7A7A7A" }}>Network</span>
                  <span className="text-xs font-semibold" style={{ color: f.accent }}>{f.network}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
