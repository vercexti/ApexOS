import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FinalSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; alpha: number; size: number };
    const pts: P[] = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
      alpha: Math.random() * 0.5 + 0.1,
      size: Math.random() * 1.8 + 0.3,
    }));

    let time = 0;
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.004;

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;

        const glow = Math.sin(time + p.x * 20) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229,9,20,${p.alpha * glow * 0.7})`;
        ctx.fill();
      });

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const breathe = Math.sin(time * 0.8) * 0.05 + 0.95;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.height * 0.8 * breathe);
      grad.addColorStop(0, "rgba(229,9,20,0.06)");
      grad.addColorStop(0.5, "rgba(88,101,242,0.03)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="final" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24" style={{ background: "#050508" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight mb-4 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            The future will not<br />
            use <span style={{ color: "#E50914" }}>apps.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <p className="text-4xl md:text-5xl font-black leading-[1.1] mb-16 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            It will use<br />
            <span style={{ color: "#B3B3B3" }}>intelligent ecosystems.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-3xl opacity-50" style={{ background: "radial-gradient(circle, #E50914 0%, transparent 70%)" }} />
            <h2 className="relative text-4xl md:text-6xl font-black tracking-[0.2em] text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              APEX<span style={{ color: "#E50914" }}>OS</span>
            </h2>
          </div>
          <p className="text-sm tracking-[0.3em] uppercase mt-2" style={{ color: "#7A7A7A" }}>The Operating System for Human Potential</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 60px rgba(229,9,20,0.6)" }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-5 rounded text-white font-bold text-lg tracking-wide"
            style={{ background: "#E50914", boxShadow: "0 0 30px rgba(229,9,20,0.4)" }}
            data-testid="button-begin-evolution"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Begin Your Evolution
          </motion.button>
          <p className="text-xs tracking-wide" style={{ color: "#7A7A7A" }}>
            You are not building a career. You are building evolution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
