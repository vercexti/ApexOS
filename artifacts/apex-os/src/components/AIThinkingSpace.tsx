import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const thoughts = [
  { text: "Analyzing market saturation…", x: 15, y: 20, color: "#5865F2", delay: 0 },
  { text: "Cross-referencing 847 data points…", x: 65, y: 15, color: "#E50914", delay: 0.3 },
  { text: "Predicting outcome probability: 74%", x: 80, y: 50, color: "#F59E0B", delay: 0.6 },
  { text: "Identifying competitive gaps…", x: 10, y: 65, color: "#10B981", delay: 0.9 },
  { text: "Funding landscape mapped.", x: 55, y: 78, color: "#A78BFA", delay: 1.2 },
  { text: "Simulating 2,000 scenarios…", x: 30, y: 45, color: "#06B6D4", delay: 1.5 },
];

const findings = [
  { title: "Market Opportunity", value: "High", score: 82, color: "#10B981" },
  { title: "Competition Density", value: "Moderate", score: 55, color: "#F59E0B" },
  { title: "Funding Climate", value: "Active", score: 71, color: "#5865F2" },
  { title: "Success Probability", value: "Strong", score: 74, color: "#E50914" },
];

export default function AIThinkingSpace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showFindings, setShowFindings] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFindings(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number; color: string; pulse: number }[] = [];
    const colors = ["#5865F2", "#E50914", "#10B981", "#F59E0B", "#A78BFA", "#06B6D4"];
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.05;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (j <= i) return;
          const dx = a.x - b.x; const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const alpha = 0.2 * (1 - dist / 150) * (Math.sin(time + i) * 0.3 + 0.7);
            ctx.strokeStyle = `rgba(88,101,242,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      nodes.forEach((n) => {
        const glow = Math.sin(n.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * glow, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "cc";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.5 * glow, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "20";
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="ai-thinking" className="py-24 px-6" style={{ background: "#141414" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#5865F2", borderColor: "rgba(88,101,242,0.3)", background: "rgba(88,101,242,0.08)" }}
          >
            Synthetic Cognition Chamber · Live
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Cognition Made<br />
            <span style={{ color: "#5865F2" }}>Visible</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Not a chatbot. An intelligence that externalizes its own reasoning — in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: "#0B0B0F", borderColor: "#2A2A2E" }}
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#2A2A2E", background: "#141414" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#E50914" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#10B981" }} />
            </div>
            <span className="text-xs font-mono" style={{ color: "#7A7A7A" }}>APEX Neural Workspace — Query: "Should I launch an AI startup?"</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
              <span className="text-xs font-mono" style={{ color: "#10B981" }}>Processing</span>
            </div>
          </div>

          <div className="relative" style={{ height: "400px" }}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {thoughts.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: t.delay + 0.5, duration: 0.4 }}
                className="absolute text-xs font-mono px-2.5 py-1.5 rounded-lg border pointer-events-none"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  color: t.color,
                  borderColor: t.color + "40",
                  background: t.color + "12",
                  backdropFilter: "blur(8px)",
                }}
              >
                {t.text}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showFindings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border-t px-5 py-5"
                style={{ borderColor: "#2A2A2E", background: "#141414" }}
              >
                <p className="text-xs font-mono mb-4" style={{ color: "#7A7A7A" }}>Analysis complete — 2,847ms · 99.4% confidence</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {findings.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-lg p-3 border"
                      style={{ background: "#1C1C1F", borderColor: "#2A2A2E" }}
                      data-testid={`finding-${f.title.toLowerCase().replace(/ /g, "-")}`}
                    >
                      <div className="text-xs mb-2" style={{ color: "#7A7A7A" }}>{f.title}</div>
                      <div className="font-bold text-sm text-white mb-2">{f.value}</div>
                      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "#2A2A2E" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${f.score}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ background: f.color }}
                        />
                      </div>
                      <div className="text-xs mt-1 text-right" style={{ color: f.color }}>{f.score}%</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
