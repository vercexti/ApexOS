import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface EmotionalProfile {
  primaryMode: string;
  supportStyle: string;
  focusAreas: string[];
  sageGreeting: string;
}

interface Props {
  onComplete: (profile: EmotionalProfile) => void;
}

const questions = [
  {
    id: "challenge",
    question: "What's weighing on you most right now?",
    subtitle: "Sage uses this to calibrate emotional support",
    options: [
      { value: "anxiety", label: "Anxiety & overthinking", icon: "◈" },
      { value: "motivation", label: "Low motivation or burnout", icon: "◉" },
      { value: "loneliness", label: "Feeling disconnected", icon: "◎" },
      { value: "focus", label: "Can't focus or stay consistent", icon: "◇" },
      { value: "growth", label: "Stuck in life — need direction", icon: "◆" },
    ],
  },
  {
    id: "support",
    question: "How do you prefer to be supported?",
    subtitle: "This shapes how Sage communicates with you",
    options: [
      { value: "direct", label: "Direct & practical — give me a plan", icon: "◈" },
      { value: "gentle", label: "Warm & gentle — ease me in", icon: "◉" },
      { value: "challenge", label: "Challenge me — push my limits", icon: "◎" },
      { value: "listen", label: "Just listen first, then guide", icon: "◇" },
      { value: "science", label: "Give me the research + data", icon: "◆" },
    ],
  },
  {
    id: "goal",
    question: "What's your primary goal with SoulSync?",
    subtitle: "This sets your personalized wellness roadmap",
    options: [
      { value: "peace", label: "Find inner calm & reduce stress", icon: "◈" },
      { value: "performance", label: "Peak mental performance", icon: "◉" },
      { value: "clarity", label: "Gain clarity on life direction", icon: "◎" },
      { value: "healing", label: "Process difficult emotions", icon: "◇" },
      { value: "habits", label: "Build better daily habits", icon: "◆" },
    ],
  },
  {
    id: "time",
    question: "How much time can you invest daily?",
    subtitle: "Sage will tailor session length to fit your life",
    options: [
      { value: "5", label: "5 minutes — I'm very busy", icon: "◈" },
      { value: "15", label: "15 minutes — short but consistent", icon: "◉" },
      { value: "30", label: "30 minutes — deep work sessions", icon: "◎" },
      { value: "60", label: "An hour — I'm committed", icon: "◇" },
      { value: "flex", label: "Flexible — depends on the day", icon: "◆" },
    ],
  },
  {
    id: "feeling",
    question: "How are you feeling right now, honestly?",
    subtitle: "No judgement — this is just between you and Sage",
    options: [
      { value: "struggling", label: "Struggling — I really need this", icon: "◈" },
      { value: "okay", label: "Okay but want better", icon: "◉" },
      { value: "curious", label: "Curious and open to explore", icon: "◎" },
      { value: "optimistic", label: "Optimistic — ready to grow", icon: "◇" },
      { value: "numb", label: "Numb or unsure how I feel", icon: "◆" },
    ],
  },
];

function buildProfile(answers: Record<string, string>): EmotionalProfile {
  const modeMap: Record<string, string> = {
    anxiety: "Calm", motivation: "Motivational", loneliness: "Grounding",
    focus: "Focus", growth: "Reflective",
  };
  const styleMap: Record<string, string> = {
    direct: "Structured", gentle: "Nurturing", challenge: "Challenging",
    listen: "Empathetic", science: "Analytical",
  };
  const greetingMap: Record<string, string> = {
    struggling: "I see you, and I'm glad you're here. This took courage.",
    okay: "There's always room to grow — let's find your next level together.",
    curious: "Curiosity is the first step. I'm excited to explore with you.",
    optimistic: "That energy is everything. Let's channel it into real change.",
    numb: "Sometimes feelings go quiet. That's okay — I'll be patient with you.",
  };
  const focusMap: Record<string, string[]> = {
    peace: ["Breathing exercises", "Mindfulness", "Stress reduction"],
    performance: ["Focus sprints", "Sleep optimization", "Flow state"],
    clarity: ["Journaling", "Decision frameworks", "Goal mapping"],
    healing: ["Emotional processing", "Somatic work", "Boundary setting"],
    habits: ["Habit stacking", "Daily quests", "Accountability"],
  };

  return {
    primaryMode: (modeMap[answers.challenge] as string) ?? "Calm",
    supportStyle: (styleMap[answers.support] as string) ?? "Empathetic",
    focusAreas: (focusMap[answers.goal] as string[]) ?? ["Mindfulness", "Focus", "Growth"],
    sageGreeting: (greetingMap[answers.feeling] as string) ?? "Welcome. I'm here.",
  };
}

export default function SoulSyncOnboardingQuiz({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);

  const q = questions[step]!;

  const handleSelect = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      const next = { ...answers, [q.id]: value };
      setAnswers(next);
      setSelected(null);
      if (step < questions.length - 1) {
        setStep((s) => s + 1);
      } else {
        setBuilding(true);
        setTimeout(() => {
          onComplete(buildProfile(next));
        }, 1800);
      }
    }, 350);
  };

  const progress = ((step) / questions.length) * 100;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center px-4" style={{ background: "rgba(9,9,15,0.97)", backdropFilter: "blur(20px)" }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute rounded-full blur-[120px]" style={{ width: 500, height: 500, left: "10%", top: "10%", background: "#8B5CF6" }} />
        <motion.div animate={{ opacity: [0.03, 0.07, 0.03] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} className="absolute rounded-full blur-[100px]" style={{ width: 400, height: 400, right: "5%", bottom: "15%", background: "#5865F2" }} />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {building ? (
            <motion.div key="building" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-transparent mx-auto mb-6" style={{ borderTopColor: "#8B5CF6", borderRightColor: "#5865F2" }} />
              <div className="font-black text-xl text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Building your profile…</div>
              <div className="text-sm" style={{ color: "#7A7A7A" }}>Sage is personalizing your experience</div>
              {["Mapping emotional patterns", "Calibrating support mode", "Generating wellness roadmap", "Initializing Sage"].map((t, i) => (
                <motion.div key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.35 }} className="text-xs mt-2 font-mono" style={{ color: "#5865F2" }}>
                  › {t}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#8B5CF6" }}>
                  SoulSync · Question {step + 1} of {questions.length}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{q.question}</h2>
                <div className="text-sm" style={{ color: "#7A7A7A" }}>{q.subtitle}</div>
              </div>

              {/* Progress bar */}
              <div className="h-1 rounded-full mb-8 overflow-hidden" style={{ background: "#1C1C1F" }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #8B5CF6, #5865F2)" }} />
              </div>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <motion.button
                    key={opt.value}
                    whileHover={{ x: 4, boxShadow: "0 0 20px rgba(139,92,246,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.value)}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all"
                    style={{
                      background: selected === opt.value ? "rgba(139,92,246,0.15)" : "#0E0E18",
                      borderColor: selected === opt.value ? "#8B5CF6" : "#2A2A2E",
                    }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: selected === opt.value ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.08)", color: "#8B5CF6" }}>
                      {selected === opt.value ? "✓" : opt.icon}
                    </div>
                    <span className="text-sm font-medium" style={{ color: selected === opt.value ? "#fff" : "#B3B3B3" }}>{opt.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Step dots */}
              <div className="flex justify-center gap-2 mt-8">
                {questions.map((_, i) => (
                  <div key={i} className="rounded-full transition-all" style={{ width: i === step ? 20 : 6, height: 6, background: i <= step ? "#8B5CF6" : "#2A2A2E" }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
