import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPRINT = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

const tasks = [
  "Write 500 words of an essay",
  "Complete one coding challenge",
  "Review 20 flashcards",
  "Draft project outline",
  "Read one chapter",
];

type Phase = "focus" | "short-break" | "long-break" | "idle";

export default function FocusSprintPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(SPRINT);
  const [rounds, setRounds] = useState(0);
  const [task, setTask] = useState("");
  const [customTask, setCustomTask] = useState("");
  const [completedRounds, setCompletedRounds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = phase === "focus" ? SPRINT : phase === "short-break" ? SHORT_BREAK : LONG_BREAK;
  const progress = phase === "idle" ? 0 : 1 - timeLeft / totalTime;

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const start = (p: Phase = "focus") => {
    setPhase(p);
    setTimeLeft(p === "focus" ? SPRINT : p === "short-break" ? SHORT_BREAK : LONG_BREAK);
  };

  const stop = () => {
    setPhase("idle");
    setTimeLeft(SPRINT);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (phase === "idle") return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          if (phase === "focus") {
            setRounds((r) => r + 1);
            setCompletedRounds((c) => c + 1);
            const nextBreak = (rounds + 1) % 4 === 0 ? "long-break" : "short-break";
            setTimeout(() => start(nextBreak), 500);
          } else {
            setTimeout(() => start("focus"), 500);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase]);

  const phaseColor = phase === "focus" ? "#E50914" : phase === "short-break" ? "#10B981" : "#5865F2";
  const phaseLabel = phase === "focus" ? "Deep Focus Sprint" : phase === "short-break" ? "Short Break" : phase === "long-break" ? "Long Break" : "Ready";

  const circumference = 2 * Math.PI * 90;

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "#0B0B0F" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-4 border" style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)" }}>
            Focus Sprint Engine · ADHD-Friendly
          </div>
          <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Focus <span style={{ color: "#F59E0B" }}>Sprint</span>
          </h2>
          <p className="text-sm" style={{ color: "#7A7A7A" }}>25-minute deep work blocks. One task. Zero distraction.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Timer */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6">
            {/* Circular timer */}
            <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
              <svg width="220" height="220" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="110" cy="110" r="90" fill="none" stroke="#1C1C1F" strokeWidth="8" />
                <motion.circle
                  cx="110" cy="110" r="90"
                  fill="none"
                  stroke={phaseColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  style={{ filter: `drop-shadow(0 0 8px ${phaseColor}60)`, transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-5xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{fmt(phase === "idle" ? SPRINT : timeLeft)}</div>
                <div className="text-xs mt-1 font-semibold" style={{ color: phaseColor }}>{phaseLabel}</div>
                {completedRounds > 0 && (
                  <div className="text-[10px] mt-0.5" style={{ color: "#7A7A7A" }}>{completedRounds} sprint{completedRounds !== 1 ? "s" : ""} done</div>
                )}
              </div>
            </div>

            {/* Phase indicators */}
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-1.5 rounded-full" style={{ background: i < (rounds % 4) ? "#E50914" : "#1C1C1F" }} />
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              {phase === "idle" ? (
                <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(229,9,20,0.4)" }} whileTap={{ scale: 0.96 }} onClick={() => start("focus")} className="px-8 py-3 rounded-xl font-bold text-sm text-white" style={{ background: "#E50914" }}>
                  Start Sprint
                </motion.button>
              ) : (
                <>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={stop} className="px-6 py-3 rounded-xl font-bold text-sm border" style={{ color: "#7A7A7A", borderColor: "#2A2A2E" }}>
                    Stop
                  </motion.button>
                  {phase !== "focus" && (
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => start("focus")} className="px-6 py-3 rounded-xl font-bold text-sm text-white" style={{ background: "#E50914" }}>
                      Skip to Focus
                    </motion.button>
                  )}
                </>
              )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {[["Today", `${completedRounds}`, "sprints"], ["Focus Time", `${completedRounds * 25}`, "minutes"], ["Streak", "7", "days"]].map(([l, v, u]) => (
                <div key={l} className="rounded-xl border p-3 text-center" style={{ background: "#141414", borderColor: "#2A2A2E" }}>
                  <div className="text-lg font-black" style={{ color: "#E50914", fontFamily: "'Syne', sans-serif" }}>{v}</div>
                  <div className="text-[9px]" style={{ color: "#7A7A7A" }}>{l} · {u}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Task selector */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="flex flex-col gap-4">
            <div className="rounded-2xl border p-6" style={{ background: "#141414", borderColor: "#2A2A2E" }}>
              <div className="font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>What are you working on?</div>
              <div className="space-y-2 mb-4">
                {tasks.map((t) => (
                  <motion.button key={t} whileHover={{ x: 2 }} onClick={() => setTask(t)} className="w-full text-left text-sm px-4 py-3 rounded-xl border transition-all" style={{ background: task === t ? "rgba(229,9,20,0.08)" : "transparent", borderColor: task === t ? "rgba(229,9,20,0.3)" : "#2A2A2E", color: task === t ? "#fff" : "#7A7A7A" }}>
                    {task === t && <span className="mr-2" style={{ color: "#E50914" }}>▶</span>}{t}
                  </motion.button>
                ))}
              </div>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>Or type your own</div>
              <input value={customTask} onChange={(e) => { setCustomTask(e.target.value); setTask(e.target.value); }} placeholder="Custom task…" className="w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ background: "#1C1C1F", borderColor: "#2A2A2E", color: "#fff" }} />
            </div>

            {/* ADHD tips */}
            <div className="rounded-2xl border p-5" style={{ background: "#141414", borderColor: "#2A2A2E" }}>
              <div className="font-black text-white text-sm mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>ADHD Focus Protocol</div>
              <div className="space-y-2.5">
                {[
                  "Close all unneeded browser tabs now",
                  "Phone: face-down or in another room",
                  "One task on screen — nothing else",
                  "Headphones: use ambient or lo-fi",
                  "After sprint: reward yourself briefly",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "#B3B3B3" }}>
                    <span className="shrink-0 mt-0.5" style={{ color: "#F59E0B" }}>›</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
