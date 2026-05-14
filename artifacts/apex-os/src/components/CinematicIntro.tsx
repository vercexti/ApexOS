import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const bootLines = [
  "APEX_OS v2.0.1 initializing...",
  "Loading neural inference engine... OK",
  "Connecting AI agent cluster... OK",
  "Bootstrapping cognitive systems... OK",
  "Calibrating opportunity radar... OK",
  "Future simulation ready.",
  "Welcome, human.",
];

export default function CinematicIntro({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        size: Math.random() * 2 + 0.5,
      });
    }

    let animId: number;
    const render = () => {
      ctx.fillStyle = "rgba(11,11,15,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229,9,20,${p.alpha})`;
        ctx.fill();
      });

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
      grad.addColorStop(0, "rgba(229,9,20,0.06)");
      grad.addColorStop(1, "rgba(229,9,20,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= bootLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 500);
      }
    }, 320);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0B0B0F" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-2xl opacity-60" style={{ background: "radial-gradient(circle, #E50914 0%, transparent 70%)" }} />
                <h1
                  className="relative text-5xl md:text-7xl font-black tracking-[0.2em] text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  APEX<span style={{ color: "#E50914" }}>_</span>OS
                </h1>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-sm tracking-[0.4em] uppercase mt-2"
                style={{ color: "#7A7A7A" }}
              >
                The Operating System for Human Potential
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-80 font-mono text-xs space-y-1 mb-8"
              style={{ color: "#B3B3B3" }}
            >
              {bootLines.slice(0, visibleLines).map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span style={{ color: "#E50914" }}>›</span>
                  <span>{line}</span>
                </motion.div>
              ))}
              {visibleLines < bootLines.length && (
                <span className="inline-block w-2 h-4 ml-4 animate-pulse" style={{ background: "#E50914" }} />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="w-64 h-px relative overflow-hidden"
              style={{ background: "#2A2A2E" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 h-full"
                style={{ background: "linear-gradient(90deg, transparent, #E50914, transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          <button
            onClick={() => { setDone(true); setTimeout(onComplete, 600); }}
            className="absolute bottom-8 right-8 text-xs tracking-widest uppercase opacity-40 hover:opacity-80 transition-opacity"
            style={{ color: "#B3B3B3" }}
            data-testid="button-skip-intro"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
