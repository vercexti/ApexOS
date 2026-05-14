import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const floatingStats = [
  { label: "Futures Shaped", value: "12,847" },
  { label: "Decisions Guided", value: "3.2M" },
  { label: "AI Agents Active", value: "99" },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Pt = { x: number; y: number; vx: number; vy: number; alpha: number; size: number };
    const pts: Pt[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.05,
      size: Math.random() * 1.5 + 0.5,
    }));

    let time = 0;
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = Math.sin(time * 2) * 0.03 + 0.97;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.height * 0.7 * pulse);
      grad.addColorStop(0, "rgba(229,9,20,0.07)");
      grad.addColorStop(0.4, "rgba(88,101,242,0.04)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229,9,20,${p.alpha * pulse})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(229,9,20,${0.06 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "#0B0B0F" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(88,101,242,0.06) 0%, transparent 70%)" }} />

      {/* Floating holographic UI cards — background depth layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left floating card */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-2, 0, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[4%] w-44 rounded-xl border p-3 hidden lg:block"
          style={{ background: "rgba(20,20,20,0.7)", borderColor: "rgba(88,101,242,0.25)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5865F2" }} />
            <span className="text-[10px] font-mono" style={{ color: "#7A7A7A" }}>Study Agent</span>
          </div>
          <div className="text-xs font-bold text-white mb-1">Neural Plan Ready</div>
          <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "#2A2A2E" }}>
            <motion.div animate={{ width: ["20%", "78%"] }} transition={{ duration: 3, delay: 1 }} className="h-full rounded-full" style={{ background: "#5865F2" }} />
          </div>
          <div className="text-[10px] mt-1" style={{ color: "#7A7A7A" }}>78% optimized</div>
        </motion.div>

        {/* Top-right floating card */}
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [1.5, -1, 1.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[14%] right-[5%] w-44 rounded-xl border p-3 hidden lg:block"
          style={{ background: "rgba(20,20,20,0.7)", borderColor: "rgba(229,9,20,0.2)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E50914" }} />
            <span className="text-[10px] font-mono" style={{ color: "#7A7A7A" }}>Career Agent</span>
          </div>
          <div className="text-xs font-bold text-white mb-1">AI Match Score</div>
          <div className="text-xl font-black" style={{ color: "#E50914", fontFamily: "'Syne', sans-serif" }}>94%</div>
          <div className="text-[10px]" style={{ color: "#7A7A7A" }}>AI Engineer · Remote</div>
        </motion.div>

        {/* Bottom-left floating card */}
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [2, -1, 2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[22%] left-[5%] w-48 rounded-xl border p-3 hidden lg:block"
          style={{ background: "rgba(20,20,20,0.7)", borderColor: "rgba(16,185,129,0.2)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
            <span className="text-[10px] font-mono" style={{ color: "#7A7A7A" }}>Trend Agent</span>
          </div>
          <div className="text-xs font-bold text-white mb-1">Opportunity Detected</div>
          <div className="text-[10px] leading-relaxed" style={{ color: "#10B981" }}>AI SaaS valuations +220% YoY — window closing in 14 months</div>
        </motion.div>

        {/* Bottom-right floating card */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-1.5, 1, -1.5] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[20%] right-[4%] w-44 rounded-xl border p-3 hidden lg:block"
          style={{ background: "rgba(20,20,20,0.7)", borderColor: "rgba(245,158,11,0.2)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#F59E0B" }} />
            <span className="text-[10px] font-mono" style={{ color: "#7A7A7A" }}>Finance Agent</span>
          </div>
          <div className="text-xs font-bold text-white mb-0.5">Wealth Projection</div>
          <div className="text-lg font-black" style={{ color: "#F59E0B", fontFamily: "'Syne', sans-serif" }}>$2.4M</div>
          <div className="text-[10px]" style={{ color: "#7A7A7A" }}>5-year trajectory</div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-8 border"
            style={{ color: "#E50914", borderColor: "rgba(229,9,20,0.3)", background: "rgba(229,9,20,0.08)" }}
          >
            AI Operating System · v2.0
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight mb-6 text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Your future should<br />
          <span style={{ color: "#E50914" }}>not feel random.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#B3B3B3" }}
        >
          The AI Operating System for Ambitious Humans — 11 autonomous agents collaborating to shape your career, skills, decisions, and future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(229,9,20,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded text-white font-bold text-base tracking-wide"
            style={{ background: "#E50914", boxShadow: "0 0 24px rgba(229,9,20,0.35)" }}
            data-testid="button-launch"
            onClick={() => document.querySelector("#agents")?.scrollIntoView({ behavior: "smooth" })}
          >
            Launch APEX OS
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "#E50914", color: "#E50914" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded font-bold text-base tracking-wide border transition-colors duration-200"
            style={{ color: "#B3B3B3", borderColor: "#2A2A2E", background: "transparent" }}
            data-testid="button-explore"
            onClick={() => document.querySelector("#career")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore the Future
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {floatingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="flex flex-col items-center px-6 py-4 rounded-xl border"
              style={{ background: "rgba(28,28,31,0.6)", borderColor: "#2A2A2E", backdropFilter: "blur(12px)" }}
              data-testid={`stat-${stat.label.toLowerCase().replace(/ /g, "-")}`}
            >
              <span className="text-2xl font-black" style={{ color: "#E50914", fontFamily: "'Syne', sans-serif" }}>{stat.value}</span>
              <span className="text-xs tracking-widest uppercase mt-1" style={{ color: "#7A7A7A" }}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "#7A7A7A" }}>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(180deg, #E50914, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
