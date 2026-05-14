import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stanzas = [
  {
    text: "The digital world is fragmented.",
    sub: "47 apps. 12 dashboards. Zero intelligence.",
    color: "#B3B3B3",
    delay: 0,
  },
  {
    text: "AI today is trapped inside chat windows.",
    sub: "Brilliant — but passive. Reactive — but not autonomous.",
    color: "#B3B3B3",
    delay: 2.2,
  },
  {
    text: "Human potential is leaking into noise.",
    sub: "The gap between who you are and who you could be has never been wider.",
    color: "#7A7A7A",
    delay: 4.4,
  },
  {
    text: "What if AI became an operating system?",
    sub: "Not a tool. An ecosystem. Alive. Autonomous. Yours.",
    color: "#E50914",
    delay: 6.8,
    big: true,
  },
];

export default function CinematicPrologue() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Line = { x: number; y: number; len: number; angle: number; alpha: number; speed: number };
    const lines: Line[] = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: Math.random() * 0.08 + 0.02,
      angle: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.15 + 0.03,
      speed: (Math.random() - 0.5) * 0.001,
    }));

    let time = 0;
    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(11,11,15,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      lines.forEach((l) => {
        l.angle += l.speed;
        const x = l.x * canvas.width;
        const y = l.y * canvas.height;
        const ex = x + Math.cos(l.angle) * l.len * canvas.width;
        const ey = y + Math.sin(l.angle) * l.len * canvas.height;
        const glow = Math.sin(time + l.x * 10) * 0.05 + l.alpha;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(229,9,20,${Math.max(0, glow)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    stanzas.forEach((s, i) => {
      setTimeout(() => setPhase(i + 1), s.delay * 1000 + 400);
    });

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "#050508" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(229,9,20,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-16">
        {stanzas.map((s, i) => (
          <AnimatePresence key={i}>
            {phase > i && (
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p
                  className={`font-black leading-tight tracking-tight ${s.big ? "text-4xl md:text-6xl lg:text-7xl" : "text-2xl md:text-4xl"}`}
                  style={{ fontFamily: "'Syne', sans-serif", color: s.big ? "#fff" : "#7A7A7A" }}
                >
                  {s.big ? (
                    <>What if AI became{" "}
                      <span style={{ color: "#E50914" }}>an operating system?</span>
                    </>
                  ) : s.text}
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm md:text-base mt-3"
                  style={{ color: "#7A7A7A" }}
                >
                  {s.sub}
                </motion.p>
                {s.big && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-6 mx-auto h-px max-w-sm origin-center"
                    style={{ background: "linear-gradient(90deg, transparent, #E50914, transparent)" }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </section>
  );
}
