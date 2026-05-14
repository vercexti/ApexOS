import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onBeginGuided: () => void;
  onExploreFree: () => void;
}

export default function GuidedExperience({ onBeginGuided, onExploreFree }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"idle" | "awakening" | "ready">("idle");

  useEffect(() => {
    setTimeout(() => setPhase("awakening"), 600);
    setTimeout(() => setPhase("ready"), 2200);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Ring = { r: number; maxR: number; alpha: number; speed: number; color: string };
    const rings: Ring[] = [];
    const colors = ["#E50914", "#5865F2", "#10B981"];
    const spawnRing = () => {
      rings.push({ r: 0, maxR: 400 + Math.random() * 200, alpha: 0.25, speed: 0.8 + Math.random() * 0.5, color: colors[Math.floor(Math.random() * colors.length)] });
    };
    spawnRing();
    const spawnInterval = setInterval(spawnRing, 1200);

    type Pt = { x: number; y: number; vx: number; vy: number; alpha: number; size: number; color: string };
    const pts: Pt[] = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      alpha: Math.random() * 0.6 + 0.1,
      size: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let time = 0;
    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,8,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += ring.speed;
        ring.alpha = (1 - ring.r / ring.maxR) * 0.2;
        if (ring.r >= ring.maxR) { rings.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color + Math.round(ring.alpha * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const glow = Math.sin(time + p.x * 15) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.size * glow, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * glow * 180).toString(16).padStart(2, "0");
        ctx.fill();
      });

      const breathe = Math.sin(time * 0.8) * 0.06 + 0.94;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 350 * breathe);
      grad.addColorStop(0, "rgba(229,9,20,0.08)");
      grad.addColorStop(0.4, "rgba(88,101,242,0.04)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); clearInterval(spawnInterval); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="fixed inset-0 z-[700] flex flex-col items-center justify-center" style={{ background: "#050508" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 3px)", backgroundSize: "100% 4px" }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {phase === "awakening" && (
            <motion.div
              key="awakening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="text-xs font-mono tracking-[0.4em] uppercase mb-6" style={{ color: "#7A7A7A" }}>
                Systems Awakening
              </div>
              <div className="flex items-center justify-center gap-3">
                {["Neural Core", "Agent Cluster", "Intelligence Matrix", "Future Engine"].map((sys, i) => (
                  <motion.div
                    key={sys}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.22 }}
                    className="flex items-center gap-1.5 text-xs font-mono"
                    style={{ color: "#B3B3B3" }}
                  >
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#E50914" }}
                    />
                    {sys}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="mb-8 relative inline-block"
              >
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 blur-3xl"
                  style={{ background: "radial-gradient(circle, #E50914 0%, transparent 70%)" }}
                />
                <h1 className="relative text-4xl md:text-6xl font-black tracking-[0.3em] text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  APEX<span style={{ color: "#E50914" }}>OS</span>
                </h1>
              </motion.div>

              {/* Giant statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <p className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  The Future<br />
                  <span style={{ color: "#E50914" }}>Awaits.</span>
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed"
                style={{ color: "#7A7A7A" }}
              >
                An AI operating system that evolves with you. Choose your experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {/* Primary: Guided */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(229,9,20,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBeginGuided}
                  className="group relative px-8 py-5 rounded-xl font-bold text-white text-base tracking-wide overflow-hidden"
                  style={{ background: "#E50914", boxShadow: "0 0 30px rgba(229,9,20,0.35)", minWidth: "220px" }}
                  data-testid="button-guided-experience"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    className="absolute inset-y-0 w-1/3 opacity-20"
                    style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }}
                  />
                  <span className="relative">Begin Guided Experience</span>
                  <div className="text-xs font-normal opacity-70 mt-0.5">Cinematic walkthrough · 5 min</div>
                </motion.button>

                {/* Secondary: Explore */}
                <motion.button
                  whileHover={{ scale: 1.04, borderColor: "#E50914", color: "#fff" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onExploreFree}
                  className="px-8 py-5 rounded-xl font-bold text-base tracking-wide border transition-all duration-200"
                  style={{ color: "#B3B3B3", borderColor: "#2A2A2E", background: "transparent", minWidth: "220px" }}
                  data-testid="button-explore-free"
                >
                  Explore Freely
                  <div className="text-xs font-normal opacity-50 mt-0.5">Your pace · No guide</div>
                </motion.button>
              </motion.div>

              {/* Ambient hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-12 flex items-center justify-center gap-2 text-xs font-mono"
                style={{ color: "#7A7A7A" }}
              >
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
                11 agents active · Neural core ready · Intelligence score: initializing
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
