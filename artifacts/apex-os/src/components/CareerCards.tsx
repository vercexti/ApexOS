import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    label: "AI-Proof Careers",
    careers: [
      { title: "AI Engineer", salary: "$180K–$320K", match: 96, gradient: "from-[#E50914] to-[#FF3B47]", skills: ["Python", "PyTorch", "LLMs", "MLOps"], roadmap: ["Learn Python & Math", "Master ML Frameworks", "Build Projects", "Land FAANG Role"] },
      { title: "ML Researcher", salary: "$200K–$380K", match: 94, gradient: "from-[#5865F2] to-[#7289DA]", skills: ["Research Papers", "Statistics", "CUDA", "Transformers"], roadmap: ["BS/MS in CS", "Publish Research", "Open Source", "Research Lab"] },
      { title: "AI Product Manager", salary: "$160K–$280K", match: 88, gradient: "from-[#A78BFA] to-[#7C3AED]", skills: ["Product Strategy", "AI Literacy", "Data Analysis", "Leadership"], roadmap: ["PM Experience", "AI Fundamentals", "Build AI Products", "Director Level"] },
      { title: "Quant Researcher", salary: "$250K–$500K", match: 79, gradient: "from-[#F59E0B] to-[#D97706]", skills: ["Mathematics", "Statistics", "C++", "Algorithmic Trading"], roadmap: ["PhD Mathematics", "Internship Quant Firm", "Systematic Strategies", "Principal Quant"] },
    ],
  },
  {
    label: "High Income Paths",
    careers: [
      { title: "Startup Founder", salary: "Unlimited", match: 81, gradient: "from-[#10B981] to-[#059669]", skills: ["Vision", "Sales", "Product", "Leadership"], roadmap: ["Build Skills", "Find Co-founder", "MVP Launch", "Scale & Raise"] },
      { title: "VC Partner", salary: "$300K–$1M+", match: 73, gradient: "from-[#EC4899] to-[#BE185D]", skills: ["Deal Flow", "Portfolio Management", "Network", "Finance"], roadmap: ["Operator Experience", "Angel Investing", "Associate VC", "Partner"] },
      { title: "Investment Banker", salary: "$200K–$600K", match: 70, gradient: "from-[#06B6D4] to-[#0891B2]", skills: ["Financial Modeling", "M&A", "Valuation", "Client Relations"], roadmap: ["Top University", "IB Internship", "Analyst", "VP/MD"] },
      { title: "Principal Engineer", salary: "$250K–$450K", match: 89, gradient: "from-[#E50914] to-[#5865F2]", skills: ["System Design", "Leadership", "Architecture", "Mentorship"], roadmap: ["Senior Engineer", "Staff Engineer", "Principal", "Distinguished"] },
    ],
  },
  {
    label: "Future Tech Roles",
    careers: [
      { title: "AR/VR Engineer", salary: "$140K–$260K", match: 85, gradient: "from-[#8B5CF6] to-[#6D28D9]", skills: ["Unity", "WebXR", "3D Graphics", "Spatial Computing"], roadmap: ["Game Dev Skills", "XR Specialization", "Build Experiences", "Apple Vision Pro"] },
      { title: "Robotics Engineer", salary: "$150K–$280K", match: 82, gradient: "from-[#F97316] to-[#EA580C]", skills: ["ROS", "Kinematics", "Control Theory", "Embedded"], roadmap: ["ME/EE/CS Degree", "ROS Proficiency", "Physical Builds", "Autonomy Systems"] },
      { title: "BCI Developer", salary: "$180K–$340K", match: 71, gradient: "from-[#34D399] to-[#10B981]", skills: ["Neuroscience", "Signal Processing", "Embedded", "Python"], roadmap: ["Neuroscience PhD", "Signal Processing", "BCI Research", "Neuralink-tier"] },
      { title: "Climate Tech Lead", salary: "$130K–$240K", match: 77, gradient: "from-[#6EE7B7] to-[#059669]", skills: ["Energy Systems", "Data Science", "Policy", "Engineering"], roadmap: ["STEM Background", "Climate Thesis", "Clean Tech Startup", "Scale Impact"] },
    ],
  },
];

function CareerModal({ career, onClose }: { career: typeof categories[0]["careers"][0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl border overflow-hidden"
        style={{ background: "#141414", borderColor: "#2A2A2E" }}
        data-testid="modal-career"
      >
        <div className={`h-2 w-full bg-gradient-to-r ${career.gradient}`} />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm px-3 py-1 rounded border transition-colors"
          style={{ color: "#7A7A7A", borderColor: "#2A2A2E" }}
          data-testid="button-close-modal"
        >
          Close
        </button>

        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{career.title}</h3>
            <div className="text-xl font-bold" style={{ color: "#E50914" }}>{career.salary}</div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: "#7A7A7A" }}>Core Skills</h4>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded text-xs border" style={{ color: "#B3B3B3", borderColor: "#2A2A2E", background: "#1C1C1F" }}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: "#7A7A7A" }}>AI Match Score</h4>
              <div className="text-4xl font-black" style={{ color: "#E50914", fontFamily: "'Syne', sans-serif" }}>{career.match}%</div>
              <div className="w-full h-2 rounded-full mt-2" style={{ background: "#2A2A2E" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${career.match}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full rounded-full bg-gradient-to-r ${career.gradient}`}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: "#7A7A7A" }}>Career Roadmap</h4>
            <div className="flex items-center gap-2 flex-wrap">
              {career.roadmap.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-3 py-2 rounded-lg border text-xs font-medium text-white"
                    style={{ background: "#1C1C1F", borderColor: "#2A2A2E" }}
                  >
                    {step}
                  </motion.div>
                  {i < career.roadmap.length - 1 && (
                    <span style={{ color: "#E50914" }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CareerCards() {
  const [selected, setSelected] = useState<typeof categories[0]["careers"][0] | null>(null);

  return (
    <section id="career-cards" className="py-24 px-6" style={{ background: "#141414" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Explore Your<br />
            <span style={{ color: "#E50914" }}>Future Paths</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Curated career tracks — click any to dive deep.
          </p>
        </motion.div>

        <div className="space-y-10">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
            >
              <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-3" style={{ color: "#B3B3B3" }}>
                {cat.label}
                <div className="flex-1 h-px" style={{ background: "#2A2A2E" }} />
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {cat.careers.map((c, i) => (
                  <motion.div
                    key={c.title}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setSelected(c)}
                    className="flex-shrink-0 w-60 rounded-xl border cursor-pointer overflow-hidden group"
                    style={{ background: "#1C1C1F", borderColor: "#2A2A2E" }}
                    data-testid={`card-career-${c.title.toLowerCase().replace(/ /g, "-")}`}
                  >
                    <div className={`h-28 bg-gradient-to-br ${c.gradient} relative`}>
                      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-xs font-semibold text-white/70 mb-0.5">AI Match</div>
                        <div className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{c.match}%</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white text-sm mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{c.title}</h4>
                      <div className="text-xs" style={{ color: "#7A7A7A" }}>{c.salary}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <CareerModal career={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
