import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const careerNodes = [
  { id: "ai-eng", label: "AI Engineer", salary: "$180K–$320K", score: 96, x: 50, y: 30, hot: true },
  { id: "designer", label: "Product Designer", salary: "$120K–$220K", score: 88, x: 25, y: 20, hot: false },
  { id: "founder", label: "Startup Founder", salary: "Unlimited", score: 79, x: 75, y: 20, hot: true },
  { id: "data-sci", label: "Data Scientist", salary: "$140K–$260K", score: 91, x: 15, y: 55, hot: false },
  { id: "vc", label: "VC Analyst", salary: "$150K–$400K", score: 74, x: 85, y: 55, hot: false },
  { id: "growth", label: "Growth Hacker", salary: "$100K–$180K", score: 83, x: 35, y: 75, hot: false },
  { id: "fullstack", label: "Full Stack Dev", salary: "$130K–$220K", score: 87, x: 65, y: 75, hot: false },
  { id: "quant", label: "Quant Researcher", salary: "$200K–$500K", score: 78, x: 50, y: 60, hot: true },
  { id: "ml", label: "ML Researcher", salary: "$180K–$350K", score: 94, x: 50, y: 15, hot: true },
  { id: "creative", label: "Creative Director", salary: "$110K–$200K", score: 70, x: 20, y: 38, hot: false },
];

export default function CareerGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredData, setHoveredData] = useState<typeof careerNodes[0] | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.7 + 0.1 });
    }

    let time = 0;
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * (0.8 + Math.sin(time + s.x * 10) * 0.2)})`;
        ctx.fill();
      });

      const pairs = [
        ["ai-eng", "ml"], ["ai-eng", "data-sci"], ["ai-eng", "founder"],
        ["founder", "vc"], ["founder", "growth"], ["fullstack", "ai-eng"],
        ["designer", "creative"], ["designer", "founder"], ["quant", "data-sci"],
        ["growth", "fullstack"],
      ];

      pairs.forEach(([a, b]) => {
        const na = careerNodes.find((n) => n.id === a);
        const nb = careerNodes.find((n) => n.id === b);
        if (!na || !nb) return;
        const ax = (na.x / 100) * canvas.width;
        const ay = (na.y / 100) * canvas.height;
        const bx = (nb.x / 100) * canvas.width;
        const by = (nb.y / 100) * canvas.height;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(229,9,20,${0.1 + Math.sin(time) * 0.05})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="career" className="py-24 px-6" style={{ background: "#0B0B0F" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#E50914", borderColor: "rgba(229,9,20,0.3)", background: "rgba(229,9,20,0.08)" }}
          >
            Human Potential Matrix · Interactive
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Navigate the<br />
            <span style={{ color: "#E50914" }}>Career Cosmos</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Every career is a planet. Every skill a constellation. Your opportunities — mapped across the universe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border overflow-hidden"
          style={{ background: "#050508", borderColor: "#2A2A2E", height: "520px" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {careerNodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => { setHovered(node.id); setHoveredData(node); }}
              onMouseLeave={() => { setHovered(null); setHoveredData(null); }}
              data-testid={`node-career-${node.id}`}
            >
              <motion.div
                animate={{
                  scale: hovered === node.id ? 1.3 : 1,
                  boxShadow: hovered === node.id
                    ? `0 0 30px rgba(229,9,20,0.7)`
                    : node.hot ? `0 0 15px rgba(229,9,20,0.35)` : `0 0 8px rgba(88,101,242,0.2)`,
                }}
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: node.hot ? "20px" : "14px",
                  height: node.hot ? "20px" : "14px",
                  background: node.hot ? "#E50914" : "#5865F2",
                }}
              >
                {node.hot && (
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "#E50914" }}
                  />
                )}
              </motion.div>

              <div
                className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-xs font-semibold pointer-events-none"
                style={{ color: hovered === node.id ? "#fff" : "#B3B3B3", top: "100%" }}
              >
                {node.label}
                {node.hot && <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: "#E50914", background: "rgba(229,9,20,0.15)" }}>HOT</span>}
              </div>
            </motion.div>
          ))}

          {hoveredData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 rounded-xl border p-4 min-w-[200px]"
              style={{ background: "rgba(28,28,31,0.95)", borderColor: "#2A2A2E", backdropFilter: "blur(12px)" }}
            >
              <h4 className="font-bold text-white text-sm mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{hoveredData.label}</h4>
              <div className="text-xs mb-2" style={{ color: "#B3B3B3" }}>{hoveredData.salary}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "#7A7A7A" }}>AI Match</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#2A2A2E" }}>
                  <div className="h-full rounded-full" style={{ width: `${hoveredData.score}%`, background: "#E50914" }} />
                </div>
                <span className="text-xs font-bold" style={{ color: "#E50914" }}>{hoveredData.score}%</span>
              </div>
            </motion.div>
          )}

          <div className="absolute top-4 right-4 flex flex-col gap-2 text-xs" style={{ color: "#7A7A7A" }}>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full inline-block" style={{ background: "#E50914" }} /> In-Demand</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#5865F2" }} /> Emerging</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
