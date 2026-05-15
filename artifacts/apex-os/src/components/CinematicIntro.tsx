import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const bootLines = [
  { text: "Loneliness levels rising…",        color: "#8B5CF6" },
  { text: "Attention systems collapsing…",     color: "#5865F2" },
  { text: "Human focus degrading…",            color: "#A78BFA" },
  { text: "Emotional overload detected…",      color: "#EC4899" },
  { text: "Analyzing recovery pathways…",      color: "#8B5CF6" },
  { text: "SoulSync AI loading…",              color: "#5865F2" },
  { text: "Initializing SoulSync.",            color: "#ffffff" },
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

    type Particle = { x: number; y: number; vx: number; vy: number; alpha: number; size: number; hue: number };
    const particles: Particle[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.4 + 0.08,
        size: Math.random() * 1.8 + 0.4,
        hue: 250 + Math.random() * 60,
      });
    }

    let animId: number;
    const render = () => {
      ctx.fillStyle = "rgba(11,11,15,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},70%,65%,${p.alpha})`;
        ctx.fill();
      });

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 320);
      grad.addColorStop(0, "rgba(139,92,246,0.07)");
      grad.addColorStop(0.5, "rgba(88,101,242,0.04)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
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
          setTimeout(onComplete, 700);
        }, 600);
      }
    }, 380);
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
          transition={{ duration: 0.8 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-10 flex flex-col items-center"
            >
              {/* Orb */}
              <div className="relative mb-6" style={{ width: 80, height: 80 }}>
                {[1, 0.65, 0.38].map((s, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [s, s * 1.15, s], opacity: [0.1, 0.22, 0.1] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "radial-gradient(circle, #8B5CF6, #5865F2 70%)", filter: "blur(4px)" }}
                  />
                ))}
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)", boxShadow: "0 0 40px rgba(139,92,246,0.7)" }}
                >
                  <span className="text-white font-black text-xl">◈</span>
                </motion.div>
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-[0.15em] text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                SOUL<span style={{ color: "#8B5CF6" }}>SYNC</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-xs tracking-[0.35em] uppercase mt-2"
                style={{ color: "#5A5A6A" }}
              >
                Emotionally Intelligent AI Ecosystem
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-88 font-mono text-sm space-y-2 mb-8"
              style={{ color: "#B3B3B3", minWidth: 340 }}
            >
              {bootLines.slice(0, visibleLines).map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <span style={{ color: line.color }}>›</span>
                  <span style={{ color: idx === visibleLines - 1 ? line.color : "#6A6A7A", fontWeight: idx === bootLines.length - 1 ? 700 : 400 }}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
              {visibleLines < bootLines.length && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 ml-4"
                  style={{ background: "#8B5CF6" }}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-72 h-px relative overflow-hidden rounded-full"
              style={{ background: "#1E1E28" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 h-full rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, #8B5CF6, #5865F2, transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          <button
            onClick={() => { setDone(true); setTimeout(onComplete, 700); }}
            className="absolute bottom-8 right-8 text-xs tracking-widest uppercase opacity-35 hover:opacity-70 transition-opacity"
            style={{ color: "#8B5CF6" }}
            data-testid="button-skip-intro"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
