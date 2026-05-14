import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quests = [
  { id: 1, label: "Go outside for 10 minutes", xp: 20, icon: "◎" },
  { id: 2, label: "Drink 3 glasses of water", xp: 15, icon: "◈" },
  { id: 3, label: "Complete one priority task", xp: 30, icon: "◆" },
  { id: 4, label: "Avoid doomscrolling for 30 min", xp: 25, icon: "◇" },
  { id: 5, label: "Write one honest thought in your journal", xp: 20, icon: "◉" },
  { id: 6, label: "5-minute breathing exercise", xp: 15, icon: "◎" },
];

const moodLabels = ["Terrible", "Very Bad", "Bad", "Meh", "Okay", "Fine", "Good", "Great", "Excellent", "Perfect"];

function BreathingExercise() {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const phases: { name: "inhale" | "hold" | "exhale"; duration: number; label: string }[] = [
    { name: "inhale", duration: 4, label: "Breathe In" },
    { name: "hold", duration: 4, label: "Hold" },
    { name: "exhale", duration: 6, label: "Breathe Out" },
  ];

  const [phaseIdx, setPhaseIdx] = useState(0);

  useEffect(() => {
    if (phase === "idle") return;
    const current = phases[phaseIdx];
    setPhase(current.name);
    setCount(current.duration);

    const interval = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(interval);
          const next = (phaseIdx + 1) % phases.length;
          setPhaseIdx(next);
          if (next === 0) setCycles((cy) => cy + 1);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phaseIdx, phase]);

  const start = () => {
    setPhase("inhale");
    setPhaseIdx(0);
    setCycles(0);
    setCount(4);
  };

  const stop = () => {
    setPhase("idle");
    setPhaseIdx(0);
    setCount(0);
    setCycles(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const phaseColor: Record<string, string> = {
    idle: "#7A7A7A",
    inhale: "#8B5CF6",
    hold: "#5865F2",
    exhale: "#10B981",
  };

  const phaseLabel: Record<string, string> = {
    idle: "Ready",
    inhale: "Breathe In",
    hold: "Hold",
    exhale: "Breathe Out",
  };

  const orbScale = phase === "inhale" ? 1.35 : phase === "hold" ? 1.35 : phase === "exhale" ? 0.85 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border p-6"
      style={{ background: "#0A0A10", borderColor: "rgba(139,92,246,0.2)" }}
    >
      <div className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "#7A7A7A" }}>
        Breathing Exercise
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
          <motion.div
            animate={{ scale: orbScale, opacity: phase === "idle" ? 0.3 : 0.6 }}
            transition={{ duration: phase === "inhale" ? 4 : phase === "hold" ? 0.1 : 6, ease: "easeInOut" }}
            className="absolute rounded-full blur-xl"
            style={{ width: 80, height: 80, background: phaseColor[phase] }}
          />
          <motion.div
            animate={{ scale: orbScale }}
            transition={{ duration: phase === "inhale" ? 4 : phase === "hold" ? 0.1 : 6, ease: "easeInOut" }}
            className="relative w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl"
            style={{ background: `linear-gradient(135deg, ${phaseColor[phase]}60, ${phaseColor[phase]}30)`, border: `1px solid ${phaseColor[phase]}60` }}
          >
            {phase !== "idle" ? count : "4"}
          </motion.div>
        </div>

        <div>
          <div className="text-center text-sm font-bold" style={{ color: phaseColor[phase], fontFamily: "'Syne', sans-serif" }}>
            {phaseLabel[phase]}
          </div>
          {cycles > 0 && (
            <div className="text-center text-xs mt-1" style={{ color: "#7A7A7A" }}>{cycles} cycle{cycles !== 1 ? "s" : ""} complete</div>
          )}
        </div>

        {phase === "idle" ? (
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}
            whileTap={{ scale: 0.96 }}
            onClick={start}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}
          >
            Start
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={stop}
            className="px-6 py-2.5 rounded-xl text-xs border"
            style={{ color: "#7A7A7A", borderColor: "#2A2A2E" }}
          >
            Stop
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default function SoulSyncRecovery() {
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set());
  const [mood, setMood] = useState(5);
  const [streak] = useState(7);
  const [totalXP, setTotalXP] = useState(0);

  const toggleQuest = (id: number, xp: number) => {
    setCompletedQuests((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setTotalXP((x) => x - xp);
      } else {
        next.add(id);
        setTotalXP((x) => x + xp);
      }
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Daily Quests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 rounded-2xl border p-6"
        style={{ background: "#080810", borderColor: "rgba(139,92,246,0.15)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Today's Recovery Quests</div>
            <div className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
              {completedQuests.size} / {quests.length} complete · {totalXP} XP earned
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: "#F59E0B" }}
              />
              <span className="font-black text-lg" style={{ color: "#F59E0B", fontFamily: "'Syne', sans-serif" }}>
                {streak}
              </span>
            </div>
            <div className="text-[10px]" style={{ color: "#7A7A7A" }}>day streak</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: "#1C1C2E" }}>
          <motion.div
            animate={{ width: `${(completedQuests.size / quests.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #8B5CF6, #5865F2)" }}
          />
        </div>

        <div className="space-y-3">
          {quests.map((quest, i) => {
            const done = completedQuests.has(quest.id);
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 2 }}
                onClick={() => toggleQuest(quest.id, quest.xp)}
                className="flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all"
                style={{
                  background: done ? "rgba(139,92,246,0.08)" : "#0E0E14",
                  borderColor: done ? "rgba(139,92,246,0.3)" : "#2A2A2E",
                }}
              >
                <motion.div
                  animate={done ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: done ? "rgba(139,92,246,0.3)" : "#1C1C2E",
                    border: `1px solid ${done ? "#8B5CF6" : "#2A2A2E"}`,
                  }}
                >
                  {done && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ color: "#8B5CF6", fontSize: 12 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
                <div className="flex-1">
                  <div
                    className="text-sm font-semibold"
                    style={{
                      color: done ? "#8B5CF6" : "#B3B3B3",
                      textDecoration: done ? "line-through" : "none",
                      textDecorationColor: "#8B5CF680",
                    }}
                  >
                    {quest.label}
                  </div>
                </div>
                <div
                  className="text-[10px] font-bold px-2 py-1 rounded-lg"
                  style={{
                    color: done ? "#8B5CF6" : "#7A7A7A",
                    background: done ? "rgba(139,92,246,0.15)" : "#1C1C2E",
                  }}
                >
                  +{quest.xp} XP
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Right Column */}
      <div className="flex flex-col gap-4">
        {/* Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border p-6"
          style={{ background: "#080810", borderColor: "rgba(139,92,246,0.15)" }}
        >
          <div className="font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Mood Check-In
          </div>
          <div className="text-xs mb-5" style={{ color: "#7A7A7A" }}>How are you doing right now?</div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-black" style={{ color: "#8B5CF6", fontFamily: "'Syne', sans-serif" }}>
              {mood}
            </span>
            <span className="text-xs font-semibold" style={{ color: "#B3B3B3" }}>
              {moodLabels[mood - 1]}
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={10}
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: "#8B5CF6", background: `linear-gradient(90deg, #8B5CF6 ${(mood - 1) * 11.1}%, #1C1C2E ${(mood - 1) * 11.1}%)` }}
          />

          <div className="flex justify-between mt-2 text-[9px]" style={{ color: "#7A7A7A" }}>
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>

          <div className="mt-4 h-px" style={{ background: "#2A2A2E" }} />

          <div className="mt-4 grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
              const vals = [6, 4, 7, 5, 8, 6, mood];
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm"
                    style={{ height: `${vals[i] * 5}px`, background: i === 6 ? "#8B5CF6" : "#1C1C2E", minHeight: 8 }}
                  />
                  <span className="text-[9px]" style={{ color: "#7A7A7A" }}>{d}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Breathing */}
        <BreathingExercise />
      </div>
    </div>
  );
}
