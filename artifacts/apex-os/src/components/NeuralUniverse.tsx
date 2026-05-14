import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const systemStats = [
  { label: "Neural Pathways", value: "2.4B", color: "#5865F2" },
  { label: "Active Simulations", value: "12,401", color: "#E50914" },
  { label: "Intelligence Layers", value: "99", color: "#10B981" },
  { label: "Decisions / Second", value: "847K", color: "#F59E0B" },
];

export default function NeuralUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [exploded, setExploded] = useState(false);
  const [explodeTime, setExplodeTime] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Node = {
      x: number; y: number; vx: number; vy: number;
      r: number; color: string; pulse: number; layer: number;
      ox: number; oy: number;
    };
    const colors = ["#E50914", "#5865F2", "#10B981", "#F59E0B", "#A78BFA", "#06B6D4", "#EC4899"];
    let nodes: Node[] = [];
    const initNodes = (w: number, h: number) => {
      nodes = Array.from({ length: 70 }, (_, i) => {
        const layer = Math.floor(i / 10);
        const angle = (i / 10) * Math.PI * 2 + layer * 0.5;
        const radius = 80 + layer * 50;
        const cx = w / 2 + Math.cos(angle) * radius * (0.8 + Math.random() * 0.4);
        const cy = h / 2 + Math.sin(angle) * radius * (0.5 + Math.random() * 0.3);
        return {
          x: cx, y: cy, ox: cx, oy: cy,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          layer,
        };
      });
    };
    initNodes(canvas.width, canvas.height);

    let time = 0;
    let isExploded = false;
    let explodeT = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.012;
      if (isExploded) explodeT += 0.015;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (!isExploded) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
        grad.addColorStop(0, "rgba(229,9,20,0.08)");
        grad.addColorStop(0.5, "rgba(88,101,242,0.04)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        const expandR = explodeT * canvas.width * 0.8;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, expandR);
        grad.addColorStop(0, `rgba(229,9,20,${Math.max(0, 0.15 - explodeT * 0.05)})`);
        grad.addColorStop(0.3, `rgba(88,101,242,${Math.max(0, 0.08 - explodeT * 0.02)})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      nodes.forEach((n, i) => {
        if (isExploded) {
          const escapeAngle = Math.atan2(n.oy - cy, n.ox - cx);
          n.x += Math.cos(escapeAngle) * explodeT * 8;
          n.y += Math.sin(escapeAngle) * explodeT * 8;
        } else {
          n.x += n.vx * 0.3;
          n.y += n.vy * 0.3;
          const dx = n.ox - n.x; const dy = n.oy - n.y;
          n.x += dx * 0.02; n.y += dy * 0.02;
        }
        n.pulse += 0.04;
        const glow = Math.sin(n.pulse) * 0.3 + 0.7;

        nodes.forEach((m, j) => {
          if (j <= i) return;
          const dx = n.x - m.x; const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = isExploded ? 120 : 100;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            const a = (1 - dist / maxDist) * 0.3 * glow;
            ctx.strokeStyle = `rgba(88,101,242,${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });

        const r = n.r * glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "20";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "dd";
        ctx.fill();
      });

      if (!isExploded) {
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#E50914";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, 14 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(229,9,20,0.2)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const handleExplode = () => {
      isExploded = true;
      setExplodeTime(Date.now());
    };
    window.addEventListener("apex-explode", handleExplode);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("apex-explode", handleExplode);
    };
  }, []);

  const triggerExplosion = () => {
    if (exploded) return;
    setExploded(true);
    window.dispatchEvent(new Event("apex-explode"));
  };

  return (
    <section
      id="neural-universe"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#0B0B0F" }}
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(88,101,242,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
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
            Autonomous Cognition Layer
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Expand the<br />
            <span style={{ color: "#A78BFA" }}>Neural Universe</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: "#B3B3B3" }}>
            Every intelligence node connected. Every pathway alive. Activate the full expansion.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={triggerExplosion}
            disabled={exploded}
            className="px-8 py-4 rounded font-bold text-base tracking-wide transition-all duration-300"
            style={{
              background: exploded ? "rgba(16,185,129,0.1)" : "rgba(167,139,250,0.15)",
              border: `1px solid ${exploded ? "rgba(16,185,129,0.4)" : "rgba(167,139,250,0.4)"}`,
              color: exploded ? "#10B981" : "#A78BFA",
              boxShadow: exploded ? "0 0 30px rgba(16,185,129,0.15)" : "0 0 30px rgba(167,139,250,0.15)",
            }}
            data-testid="button-expand-neural"
          >
            {exploded ? "Neural Universe Expanding…" : "Activate Full Expansion"}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border overflow-hidden relative"
          style={{ background: "#050508", borderColor: "#2A2A2E", height: "460px" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="text-xs font-mono" style={{ color: "#7A7A7A" }}>Predictive Intelligence Matrix · 70 nodes active</span>
            <div className="flex items-center gap-2">
              <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full" style={{ background: "#A78BFA" }} />
              <span className="text-xs font-mono" style={{ color: "#A78BFA" }}>{exploded ? "EXPANDING" : "STABLE"}</span>
            </div>
          </div>

          {exploded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <div className="text-5xl font-black mb-2" style={{ color: "#A78BFA", fontFamily: "'Syne', sans-serif" }}>∞</div>
                <div className="text-sm font-mono" style={{ color: "#7A7A7A" }}>Expanding beyond limits</div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {systemStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border p-4 text-center"
              style={{ background: "#141414", borderColor: "#2A2A2E" }}
              data-testid={`stat-neural-${i}`}
            >
              <div className="text-2xl font-black mb-1" style={{ color: s.color, fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#7A7A7A" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
