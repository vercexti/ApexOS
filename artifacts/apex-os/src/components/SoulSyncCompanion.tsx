import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const moods = [
  { label: "Anxious", color: "#8B5CF6" },
  { label: "Stressed", color: "#E50914" },
  { label: "Lonely", color: "#5865F2" },
  { label: "Unmotivated", color: "#F59E0B" },
  { label: "Okay", color: "#10B981" },
  { label: "Good", color: "#34D399" },
];

const modes = ["Calm", "Grounding", "Motivational", "Focus", "Reflective"] as const;
type Mode = typeof modes[number];

const sageName = "Sage";

const aiResponses: Record<Mode, string[][]> = {
  Calm: [
    [
      "I hear you.",
      "You don't need to figure everything out right now.",
      "Let's just breathe for a moment together.",
      "What's one small thing that felt okay today — even briefly?",
    ],
    [
      "That sounds really heavy to carry.",
      "You've been holding a lot.",
      "You don't have to have it all figured out right now.",
      "We can take this one moment at a time.",
    ],
    [
      "You reached out — and that takes courage.",
      "Whatever you're carrying, you don't have to carry it alone.",
      "Tell me what's on your mind. I'm not going anywhere.",
    ],
  ],
  Grounding: [
    [
      "Let's ground you right now.",
      "Notice 5 things you can see around you. Name them slowly.",
      "You're here. You're safe. This moment is real.",
      "When you're ready, take a slow breath in for 4 counts... hold for 4... out for 6.",
    ],
    [
      "Put your feet flat on the floor.",
      "Feel the pressure beneath you. Feel how solid it is.",
      "Breathe in slowly — 1, 2, 3, 4. Hold — 1, 2, 3, 4. Out — 1, 2, 3, 4, 5, 6.",
      "You're here. You're real. You're okay.",
    ],
    [
      "Right now, nothing else matters except this moment.",
      "Feel the weight of your body in your seat.",
      "Notice one sound nearby. Let it anchor you to now.",
      "The anxiety is a signal, not a sentence. You are safe.",
    ],
  ],
  Motivational: [
    [
      "You reached out. That already matters.",
      "Every hard day you've made it through is proof of your strength.",
      "You are not behind. You are not broken.",
      "What would feel like a win today — no matter how small?",
    ],
    [
      "I need you to hear something important.",
      "Progress isn't always visible. But it's happening.",
      "The fact that you're still here, still trying? That's everything.",
      "What's one thing you want to do for yourself today?",
    ],
    [
      "Hard seasons don't last. You have evidence of that.",
      "You've survived every single bad day so far — that's 100%.",
      "Let's build momentum. Tell me one thing you can start in the next 10 minutes.",
    ],
  ],
  Focus: [
    [
      "Let's clear the noise together.",
      "Close every tab you don't need right now.",
      "We're working in a focused 25-minute block.",
      "One task. What's the most important thing in front of you right now?",
    ],
    [
      "Your brain is overwhelmed — not broken.",
      "Let's break this down together.",
      "Tell me your three most pressing things.",
      "We'll tackle them one at a time. No rush. Just one thing.",
    ],
    [
      "Distraction is normal. Refocus is a skill.",
      "Take one breath. Now come back to the page.",
      "What were you working on before you got pulled away?",
      "Let's pick up exactly where you left off.",
    ],
  ],
  Reflective: [
    [
      "What's been sitting heaviest on your mind lately?",
      "No pressure to have a perfect answer — just let thoughts surface naturally.",
      "I'm here and not going anywhere.",
    ],
    [
      "If this week were a chapter in your story, what would you call it?",
      "What would you want to be different about the next one?",
      "You have more power over that than you might think right now.",
    ],
    [
      "What emotion keeps coming back, even when you push it away?",
      "Sometimes the feelings we avoid are the ones trying to tell us something important.",
      "You don't have to fix it right now. Just name it. That's enough.",
    ],
  ],
};

const getResponse = (mode: Mode, count: number): string[] => {
  const pool = aiResponses[mode];
  return pool[count % pool.length];
};

interface Message {
  from: "user" | "sage";
  text: string;
  timestamp: Date;
}

interface StreamingMsg {
  lines: string[];
  displayedLines: string[];
  currentLine: number;
  currentChar: number;
  done: boolean;
}

export default function SoulSyncCompanion() {
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>("Calm");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState<StreamingMsg | null>(null);
  const [input, setInput] = useState("");
  const [responseCount, setResponseCount] = useState(0);
  const [started, setStarted] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const moodColor = moods.find((m) => m.label === activeMood)?.color ?? "#8B5CF6";

  const beginChat = () => {
    setStarted(true);
    const opening = [
      `Hi. I'm ${sageName}.`,
      "I'm here to listen — not judge, not fix, just be present with you.",
      "You can tell me anything. What's on your mind right now?",
    ];
    streamSage(opening);
  };

  const streamSage = (lines: string[]) => {
    setStreaming({ lines, displayedLines: [""], currentLine: 0, currentChar: 0, done: false });
  };

  useEffect(() => {
    if (!streaming || streaming.done) return;
    const { lines, currentLine, currentChar } = streaming;
    if (currentLine >= lines.length) {
      const finalLines = [...streaming.displayedLines];
      setStreaming(null);
      setMessages((prev) => [
        ...prev,
        { from: "sage", text: finalLines.filter(Boolean).join(" "), timestamp: new Date() },
      ]);
      return;
    }
    const line = lines[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setStreaming((s) => {
          if (!s) return s;
          const dl = [...s.displayedLines];
          dl[s.currentLine] = (dl[s.currentLine] ?? "") + line[s.currentChar];
          return { ...s, displayedLines: dl, currentChar: s.currentChar + 1 };
        });
      }, 14);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setStreaming((s) => {
          if (!s) return s;
          const dl = [...s.displayedLines, ""];
          return { ...s, displayedLines: dl, currentLine: s.currentLine + 1, currentChar: 0 };
        });
      }, 200);
      return () => clearTimeout(t);
    }
  }, [streaming]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = () => {
    const text = input.trim();
    if (!text || streaming) return;
    setMessages((prev) => [...prev, { from: "user", text, timestamp: new Date() }]);
    setInput("");
    setTimeout(() => {
      const resp = getResponse(activeMode, responseCount);
      setResponseCount((c) => c + 1);
      streamSage(resp);
    }, 600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Left Panel */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        {/* Companion Identity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border p-6"
          style={{ background: "rgba(139,92,246,0.06)", borderColor: "rgba(139,92,246,0.2)" }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full blur-lg"
                style={{ background: "rgba(139,92,246,0.5)" }}
              />
              <div
                className="relative w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)", fontFamily: "'Syne', sans-serif" }}
              >
                S
              </div>
            </div>
            <div>
              <div className="font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Sage</div>
              <div className="text-xs" style={{ color: "#8B5CF6" }}>Your AI Companion</div>
              <div className="flex items-center gap-1.5 mt-1">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#10B981" }}
                />
                <span className="text-[10px]" style={{ color: "#7A7A7A" }}>Present with you</span>
              </div>
            </div>
          </div>
          <div className="text-xs leading-relaxed" style={{ color: "#B3B3B3" }}>
            Sage remembers your emotional journey, adapts to your needs, and never judges. This is a safe space.
          </div>
        </motion.div>

        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border p-5"
          style={{ background: "#0E0E12", borderColor: "#2A2A2E" }}
        >
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#7A7A7A" }}>
            How are you feeling?
          </div>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <motion.button
                key={mood.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveMood(mood.label)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  background: activeMood === mood.label ? mood.color + "20" : "transparent",
                  borderColor: activeMood === mood.label ? mood.color + "80" : "#2A2A2E",
                  color: activeMood === mood.label ? mood.color : "#7A7A7A",
                }}
              >
                {mood.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border p-5"
          style={{ background: "#0E0E12", borderColor: "#2A2A2E" }}
        >
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#7A7A7A" }}>
            Companion Mode
          </div>
          <div className="flex flex-col gap-2">
            {modes.map((mode) => {
              const modeColors: Record<Mode, string> = {
                Calm: "#8B5CF6",
                Grounding: "#5865F2",
                Motivational: "#F59E0B",
                Focus: "#10B981",
                Reflective: "#EC4899",
              };
              const modeDescs: Record<Mode, string> = {
                Calm: "Gentle presence, no pressure",
                Grounding: "Anchor to the present moment",
                Motivational: "Rebuild momentum & belief",
                Focus: "Clear the noise, get moving",
                Reflective: "Explore your inner landscape",
              };
              return (
                <motion.button
                  key={mode}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveMode(mode)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all"
                  style={{
                    background: activeMode === mode ? modeColors[mode] + "15" : "transparent",
                    borderColor: activeMode === mode ? modeColors[mode] + "60" : "#2A2A2E",
                  }}
                >
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: modeColors[mode] }} />
                  <div>
                    <div className="text-xs font-bold" style={{ color: activeMode === mode ? modeColors[mode] : "#B3B3B3" }}>
                      {mode}
                    </div>
                    <div className="text-[10px]" style={{ color: "#7A7A7A" }}>{modeDescs[mode]}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 rounded-2xl border overflow-hidden flex flex-col"
        style={{ background: "#080810", borderColor: "rgba(139,92,246,0.2)", minHeight: 560 }}
      >
        {/* Chat header */}
        <div
          className="flex items-center gap-3 px-5 py-4 border-b shrink-0"
          style={{ borderColor: "#2A2A2E", background: "#0D0D12" }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: "#8B5CF6" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#5865F2" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#10B981" }} />
          <div className="ml-2 text-xs font-mono" style={{ color: "#7A7A7A" }}>
            soulsync — sage companion · {activeMode.toLowerCase()} mode
          </div>
          {activeMood && (
            <div
              className="ml-auto text-[10px] px-2.5 py-1 rounded-full border font-semibold"
              style={{ color: moodColor, borderColor: moodColor + "40", background: moodColor + "10" }}
            >
              {activeMood}
            </div>
          )}
        </div>

        {/* Messages */}
        <div ref={outputRef} className="flex-1 overflow-y-auto p-5 space-y-5">
          {!started ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-8">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-20 h-20"
              >
                <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: "#8B5CF6" }} />
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)", fontFamily: "'Syne', sans-serif" }}
                >
                  S
                </div>
              </motion.div>
              <div>
                <div className="text-white font-black text-lg mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Meet Sage
                </div>
                <div className="text-sm max-w-xs mx-auto" style={{ color: "#7A7A7A" }}>
                  An emotionally intelligent companion who remembers, adapts, and stays.
                  Select your mood above, then begin.
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={beginChat}
                className="px-8 py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}
              >
                Begin Your Session
              </motion.button>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.from === "sage" && (
                    <div
                      className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-black"
                      style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}
                    >
                      S
                    </div>
                  )}
                  <div
                    className="max-w-xs md:max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={
                      msg.from === "sage"
                        ? { background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#E8E8FF" }
                        : { background: "rgba(88,101,242,0.15)", border: "1px solid rgba(88,101,242,0.3)", color: "#fff" }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Streaming message */}
              {streaming && (
                <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-black"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}
                  >
                    S
                  </div>
                  <div
                    className="max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#E8E8FF" }}
                  >
                    {streaming.displayedLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < streaming.displayedLines.length - 1 && <br />}
                      </span>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      style={{ color: "#8B5CF6" }}
                    >
                      █
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Input */}
        {started && (
          <div className="px-5 py-4 border-t shrink-0" style={{ borderColor: "#2A2A2E", background: "#0A0A0E" }}>
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={2}
                placeholder="Share what's on your mind… (Enter to send)"
                className="flex-1 rounded-xl border px-4 py-3 text-sm resize-none outline-none transition-all"
                style={{
                  background: "#141420",
                  borderColor: input ? "rgba(139,92,246,0.5)" : "#2A2A2E",
                  color: "#fff",
                  boxShadow: input ? "0 0 12px rgba(139,92,246,0.15)" : "none",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139,92,246,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={send}
                disabled={!input.trim() || !!streaming}
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: input.trim() && !streaming ? "linear-gradient(135deg, #8B5CF6, #5865F2)" : "#1C1C2E",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 14L14 8L2 2V6.5L10 8L2 9.5V14Z" fill="white" />
                </svg>
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
