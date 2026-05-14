import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const debaters = [
  { id: "career", name: "Career Agent", color: "#10B981", x: 15, y: 30, icon: "◎" },
  { id: "strategy", name: "Strategy Agent", color: "#E50914", x: 75, y: 20, icon: "◈" },
  { id: "research", name: "Research Agent", color: "#5865F2", x: 85, y: 65, icon: "◉" },
  { id: "finance", name: "Finance Agent", color: "#F59E0B", x: 20, y: 70, icon: "◆" },
  { id: "trend", name: "Trend Agent", color: "#A78BFA", x: 50, y: 12, icon: "◇" },
];

const debateScripts = [
  {
    from: "career",
    to: "strategy",
    msg: "Probability of success in AI consulting exceeds 84% given current market signals.",
  },
  {
    from: "strategy",
    to: "research",
    msg: "Counter-analysis: Saturation risk in consulting is underweighted. Productization recommended.",
  },
  {
    from: "research",
    to: "finance",
    msg: "Market data confirms: Product-led growth yields 3.4× higher exit multiples in AI sector.",
  },
  {
    from: "finance",
    to: "trend",
    msg: "Runway projections align. Bootstrap to $2M ARR before Series A is optimal path.",
  },
  {
    from: "trend",
    to: "career",
    msg: "Emerging signal: AI-native SaaS valuations surging 220% YoY. Window closing in 18 months.",
  },
  {
    from: "career",
    to: "finance",
    msg: "Consensus forming: Product-first strategy with consulting bridge. Confidence: 91%.",
  },
  {
    from: "strategy",
    to: "trend",
    msg: "Agreed. Initiating roadmap synthesis across all intelligence layers.",
  },
];

const consensusSteps = [
  "Agents analyzing 2.1M data points…",
  "Cross-referencing opportunity matrices…",
  "Simulating 500 future scenarios…",
  "Convergence at 91% confidence…",
  "Optimal path synthesized.",
];

export default function AgentDebate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMsg, setActiveMsg] = useState<number>(0);
  const [consensusIdx, setConsensusIdx] = useState(0);
  const [showConsensus, setShowConsensus] = useState(false);
  const [messageHistory, setMessageHistory] = useState<typeof debateScripts>([]);
  const debateRef = useRef(0);

  const advanceDebate = useCallback(() => {
    const idx = debateRef.current % debateScripts.length;
    setActiveMsg(idx);
    setMessageHistory((prev) => [...prev.slice(-4), debateScripts[idx]]);
    debateRef.current++;

    if (debateRef.current === debateScripts.length) {
      setTimeout(() => setShowConsensus(true), 800);
    }
  }, []);

  useEffect(() => {
    advanceDebate();
    const interval = setInterval(advanceDebate, 2800);
    return () => clearInterval(interval);
  }, [advanceDebate]);

  useEffect(() => {
    if (!showConsensus) return;
    const interval = setInterval(() => {
      setConsensusIdx((i) => {
        if (i >= consensusSteps.length - 1) { clearInterval(interval); return i; }
        return i + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [showConsensus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number; alpha: number; size: number };
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      alpha: Math.random() * 0.3 + 0.05,
      size: Math.random() * 1.2 + 0.3,
    }));

    let time = 0;
    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(11,11,15,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88,101,242,${p.alpha * (0.7 + Math.sin(time + p.x * 20) * 0.3)})`;
        ctx.fill();
      });

      const msg = debateScripts[activeMsg];
      const from = debaters.find((d) => d.id === msg?.from);
      const to = debaters.find((d) => d.id === msg?.to);
      if (from && to) {
        const fx = (from.x / 100) * canvas.width;
        const fy = (from.y / 100) * canvas.height;
        const tx = (to.x / 100) * canvas.width;
        const ty = (to.y / 100) * canvas.height;
        const pulse = (Math.sin(time * 4) + 1) / 2;

        const grad = ctx.createLinearGradient(fx, fy, tx, ty);
        const fc = from.color;
        const tc = to.color;
        grad.addColorStop(0, fc + "90");
        grad.addColorStop(0.5, "rgba(255,255,255,0.15)");
        grad.addColorStop(1, tc + "90");
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + pulse;
        ctx.stroke();

        const t2 = (time * 2) % 1;
        const mx = fx + (tx - fx) * t2;
        const my = fy + (ty - fy) * t2;
        ctx.beginPath();
        ctx.arc(mx, my, 4 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.6 + pulse * 0.4})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mx, my, 10 + pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.1 * pulse})`;
        ctx.fill();
      }

      debaters.forEach((d, i) => {
        const x = (d.x / 100) * canvas.width;
        const y = (d.y / 100) * canvas.height;
        const active = msg?.from === d.id || msg?.to === d.id;
        const breathe = Math.sin(time * 2 + i) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(x, y, active ? 28 + breathe * 4 : 22, 0, Math.PI * 2);
        ctx.fillStyle = d.color + (active ? "25" : "12");
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, active ? 20 : 16, 0, Math.PI * 2);
        ctx.fillStyle = d.color + (active ? "50" : "30");
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, active ? 12 : 10, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();

        if (active) {
          ctx.beginPath();
          ctx.arc(x, y, 35 + breathe * 8, 0, Math.PI * 2);
          ctx.strokeStyle = d.color + "30";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [activeMsg]);

  const fromAgent = debaters.find((d) => d.id === debateScripts[activeMsg]?.from);
  const toAgent = debaters.find((d) => d.id === debateScripts[activeMsg]?.to);

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#050508" }}
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(88,101,242,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: "#5865F2", borderColor: "rgba(88,101,242,0.35)", background: "rgba(88,101,242,0.08)" }}
          >
            Synthetic Intelligence Nexus — Live
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Agents Debating<br />
            <span style={{ color: "#5865F2" }}>Your Future — Right Now</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#B3B3B3" }}>
            Five autonomous intelligences reasoning together in real time. Watch consensus emerge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl border overflow-hidden relative"
            style={{ background: "#0B0B0F", borderColor: "rgba(88,101,242,0.2)", height: "460px" }}
          >
            <div
              className="absolute top-3 left-4 right-4 flex items-center justify-between z-10"
            >
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#10B981" }}
                />
                <span className="text-xs font-mono" style={{ color: "#7A7A7A" }}>Neural Debate Arena · Live Session</span>
              </div>
              <span className="text-xs font-mono" style={{ color: "#7A7A7A" }}>
                {debateScripts.length} exchanges · {debaters.length} agents
              </span>
            </div>

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {debaters.map((d) => (
              <div
                key={d.id}
                className="absolute pointer-events-none"
                style={{ left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold" style={{ color: d.color }}>
                  {d.name}
                </div>
              </div>
            ))}

            <AnimatePresence mode="wait">
              {fromAgent && toAgent && (
                <motion.div
                  key={activeMsg}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bottom-5 left-5 right-5 rounded-xl border p-4"
                  style={{ background: "rgba(11,11,15,0.92)", borderColor: fromAgent.color + "40", backdropFilter: "blur(16px)" }}
                  data-testid="debate-message"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold" style={{ color: fromAgent.color }}>{fromAgent.name}</span>
                    <span style={{ color: "#2A2A2E" }}>→</span>
                    <span className="text-xs font-bold" style={{ color: toAgent.color }}>{toAgent.name}</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{debateScripts[activeMsg]?.msg}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div
              className="rounded-xl border p-4 flex-1"
              style={{ background: "#0B0B0F", borderColor: "#2A2A2E" }}
            >
              <h4 className="text-xs tracking-widest uppercase mb-3" style={{ color: "#7A7A7A" }}>
                Intelligence Stream
              </h4>
              <div className="space-y-2 h-48 overflow-hidden">
                <AnimatePresence>
                  {messageHistory.map((m, i) => {
                    const ag = debaters.find((d) => d.id === m.from);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1 - (messageHistory.length - 1 - i) * 0.18, x: 0 }}
                        className="text-xs p-2 rounded-lg border"
                        style={{ background: "#141414", borderColor: (ag?.color ?? "#2A2A2E") + "25" }}
                      >
                        <span className="font-bold" style={{ color: ag?.color }}>{ag?.name}: </span>
                        <span style={{ color: "#B3B3B3" }}>{m.msg.slice(0, 60)}…</span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence>
              {showConsensus && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border p-5 relative overflow-hidden"
                  style={{ background: "rgba(229,9,20,0.06)", borderColor: "rgba(229,9,20,0.35)" }}
                  data-testid="consensus-panel"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-50"
                    style={{ background: "linear-gradient(90deg, transparent, #E50914, transparent)" }}
                  />
                  <h4 className="text-xs tracking-widest uppercase mb-3 font-bold" style={{ color: "#E50914" }}>
                    Consensus Forming
                  </h4>
                  <div className="space-y-1">
                    {consensusSteps.slice(0, consensusIdx + 1).map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-xs font-mono"
                        style={{ color: i === consensusIdx ? "#fff" : "#7A7A7A" }}
                      >
                        <span style={{ color: i < consensusIdx ? "#10B981" : "#E50914" }}>
                          {i < consensusIdx ? "✓" : "›"}
                        </span>
                        {step}
                      </motion.div>
                    ))}
                  </div>
                  {consensusIdx >= consensusSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-3 pt-3 border-t"
                      style={{ borderColor: "rgba(229,9,20,0.2)" }}
                    >
                      <div className="text-xs font-bold" style={{ color: "#fff" }}>Recommendation:</div>
                      <div className="text-xs mt-1" style={{ color: "#B3B3B3" }}>Product-first AI startup · Bootstrap to $2M ARR · Target Series A in 18 months</div>
                      <div className="mt-2 text-xs font-black" style={{ color: "#10B981" }}>91% confidence · 5 agents aligned</div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
