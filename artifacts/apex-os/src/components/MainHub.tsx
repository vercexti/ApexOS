import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SectionId =
  | "soulsync" | "recovery" | "psychologists" | "breathing" | "ambient"
  | "agents" | "debate" | "dashboard" | "terminal" | "neural-arch" | "research"
  | "career-galaxy" | "career-cards" | "future-self" | "network-engine"
  | "study" | "universe" | "focus-sprint"
  | "workflows" | "decision-sim" | "finance" | "automation-builder"
  | "profile" | "subscription" | "onboarding";

// ── Shared: SoulSync Orb ───────────────────────────────────────────────────
function SoulOrb({ size = 160, animate: doAnimate = true }: { size?: number; animate?: boolean }) {
  const core = size * 0.38;
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      {[1, 0.68, 0.42].map((s, i) => (
        <motion.div
          key={i}
          animate={doAnimate ? { scale: [s, s * 1.14, s], opacity: [0.07, 0.18, 0.07] } : {}}
          transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{ width: size, height: size, background: "radial-gradient(circle, #8B5CF6 0%, #5865F2 55%, transparent 80%)", filter: "blur(6px)" }}
        />
      ))}
      <motion.div
        animate={doAnimate ? { scale: [1, 1.06, 1], boxShadow: ["0 0 30px rgba(139,92,246,0.55)", "0 0 55px rgba(139,92,246,0.85)", "0 0 30px rgba(139,92,246,0.55)"] } : {}}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center rounded-full z-10"
        style={{ width: core, height: core, background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}
      >
        <span style={{ color: "white", fontSize: core * 0.35, fontWeight: 900 }}>◈</span>
      </motion.div>
    </div>
  );
}

// ── Shared: Section Label ──────────────────────────────────────────────────
function SectionLabel({ text, color = "#8B5CF6" }: { text: string; color?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="h-px w-12 rounded-full" style={{ background: color + "50" }} />
      <span className="text-xs font-mono tracking-[0.28em] uppercase" style={{ color }}>{text}</span>
      <div className="h-px w-12 rounded-full" style={{ background: color + "50" }} />
    </div>
  );
}

// ── SECTION 1: HERO ───────────────────────────────────────────────────────
function HeroSection({ onSection, userName }: { onSection: (id: SectionId) => void; userName: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    type Pt = { x: number; y: number; vx: number; vy: number; alpha: number; size: number; hue: number };
    const pts: Pt[] = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0005, vy: (Math.random() - 0.5) * 0.0005,
      alpha: Math.random() * 0.3 + 0.05,
      size: Math.random() * 1.8 + 0.5,
      hue: 250 + Math.random() * 50,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},65%,70%,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(139,92,246,0.10) 0%, rgba(88,101,242,0.05) 50%, transparent 80%)" }} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8">
          <SoulOrb size={140} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <SectionLabel text="SoulSync · Emotionally Intelligent AI" color="#8B5CF6" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.1 }}
          className="text-xs font-mono tracking-widest mb-4" style={{ color: "#5A5A6A" }}>
          Welcome back, {userName}.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="font-black leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
        >
          <span className="text-white">You Were Never Meant</span><br />
          <span style={{ color: "#8B5CF6" }}>To Fight Your Mind</span><br />
          <span className="text-white">Alone.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          className="text-lg leading-relaxed mb-10 max-w-2xl"
          style={{ color: "#7A7A8A" }}
        >
          SoulSync is an emotionally intelligent AI companion that helps you recover focus, rebuild discipline,
          reduce emotional overwhelm, and evolve with adaptive intelligence — one session at a time.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-4 flex-wrap justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSection("soulsync")}
            className="px-8 py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}
          >
            Begin Recovery
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, borderColor: "#8B5CF6" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSection("soulsync")}
            className="px-8 py-4 rounded-2xl font-semibold text-base border transition-all"
            style={{ color: "#A78BFA", borderColor: "rgba(139,92,246,0.35)", background: "rgba(139,92,246,0.06)" }}
          >
            Meet Sage AI
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="mt-16 flex items-center gap-2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3V15M4 10L9 15L14 10" stroke="#5A5A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <span className="text-xs font-mono" style={{ color: "#4A4A5A" }}>scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}

// ── SECTION 2: SAGE DEMO ──────────────────────────────────────────────────
const conversations = [
  {
    user: "I feel mentally exhausted and can't focus anymore.",
    sage: "That sounds like you've been carrying too much without real recovery time. Your mind isn't broken — it's overwhelmed. Let's start small, together.",
    action: "Focus Sprint recommended · 25 min",
    actionColor: "#F59E0B",
    mood: "Overwhelmed",
    moodColor: "#EC4899",
  },
  {
    user: "I haven't felt motivated in weeks. Everything feels heavy.",
    sage: "Low motivation is often a signal of emotional depletion, not laziness. Your system needs restoration before it can rebuild momentum.",
    action: "Daily Recovery queued · Mood check-in",
    actionColor: "#8B5CF6",
    mood: "Depleted",
    moodColor: "#8B5CF6",
  },
  {
    user: "I feel lonely even when I'm surrounded by people.",
    sage: "That kind of loneliness runs deeper — it's a disconnect between who you are and how you're living. You're not alone in feeling this way.",
    action: "Sage companion active · Ambient mode on",
    actionColor: "#5865F2",
    mood: "Disconnected",
    moodColor: "#5865F2",
  },
];

function SageDemo({ onSection }: { onSection: (id: SectionId) => void }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"user" | "sage" | "action">("user");

  useEffect(() => {
    setPhase("user");
    const t1 = setTimeout(() => setPhase("sage"), 1400);
    const t2 = setTimeout(() => setPhase("action"), 3200);
    const t3 = setTimeout(() => setIdx(i => (i + 1) % conversations.length), 5800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [idx]);

  const convo = conversations[idx]!;

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(88,101,242,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionLabel text="Live AI Companion" color="#5865F2" />
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-4 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Meet <span style={{ color: "#8B5CF6" }}>Sage.</span>
          </h2>
          <p className="text-base text-center mb-12" style={{ color: "#6A6A7A" }}>
            Your emotionally intelligent AI companion. Sage listens, adapts, and guides you through every moment.
          </p>
        </motion.div>

        <div className="rounded-3xl border overflow-hidden" style={{ background: "#0C0C14", borderColor: "#1E1E2C" }}>
          {/* Mood bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#1A1A24", background: "#08080F" }}>
            <div className="flex items-center gap-2">
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
              <span className="text-xs font-mono" style={{ color: "#10B981" }}>Sage · Active</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="text-xs font-mono px-3 py-1 rounded-full border"
                style={{ color: convo.moodColor, borderColor: convo.moodColor + "40", background: convo.moodColor + "0F" }}>
                Mood detected: {convo.mood}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-8 space-y-6 min-h-[260px]">
            {/* User message */}
            <AnimatePresence mode="wait">
              <motion.div key={`u-${idx}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="flex justify-end">
                <div className="max-w-[78%] rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm leading-relaxed"
                  style={{ background: "#1C1C2C", color: "#C8C8D8" }}>
                  {convo.user}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Sage response */}
            <AnimatePresence>
              {(phase === "sage" || phase === "action") && (
                <motion.div key={`s-${idx}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}>
                    <span className="text-white font-black text-sm">◈</span>
                  </div>
                  <div className="max-w-[78%] rounded-2xl rounded-tl-sm px-5 py-3.5 text-sm leading-relaxed"
                    style={{ background: "rgba(139,92,246,0.10)", color: "#D4D4E8", border: "1px solid rgba(139,92,246,0.18)" }}>
                    {convo.sage}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action suggestion */}
            <AnimatePresence>
              {phase === "action" && (
                <motion.div key={`a-${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold"
                    style={{ color: convo.actionColor, borderColor: convo.actionColor + "40", background: convo.actionColor + "0C" }}>
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full" style={{ background: convo.actionColor }} />
                    {convo.action}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pb-6">
            {conversations.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === idx ? 24 : 8, height: 6, background: i === idx ? "#8B5CF6" : "#2A2A3A" }} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => onSection("soulsync")}
            className="px-7 py-3.5 rounded-xl font-semibold text-white text-sm border"
            style={{ borderColor: "rgba(139,92,246,0.4)", background: "rgba(139,92,246,0.08)", color: "#A78BFA" }}>
            Start talking to Sage →
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 3: RECOVERY SYSTEMS ───────────────────────────────────────────
const recoveryItems = [
  { name: "Focus Sprint",         desc: "Rebuild concentration slowly, session by session.",          id: "focus-sprint" as SectionId, color: "#F59E0B", icon: "⏱" },
  { name: "Daily Recovery",       desc: "Small wins compound into lasting momentum.",                 id: "recovery" as SectionId,     color: "#8B5CF6", icon: "◉" },
  { name: "Mood Reflection",      desc: "Understand emotional patterns before they spiral.",          id: "soulsync" as SectionId,     color: "#5865F2", icon: "◈" },
  { name: "Ambient Soundscapes",  desc: "Calm your nervous system through targeted audio.",           id: "ambient" as SectionId,      color: "#06B6D4", icon: "◆" },
  { name: "Breathing Protocol",   desc: "Reduce anxiety in real time. The 4-4-6 method.",            id: "breathing" as SectionId,    color: "#10B981", icon: "◇" },
  { name: "Sleep Stabilizer",     desc: "Repair cognitive energy through sleep optimization.",        id: "soulsync" as SectionId,     color: "#A78BFA", icon: "◎" },
];

function RecoverySystems({ onSection }: { onSection: (id: SectionId) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)" }} />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <SectionLabel text="Recovery Layers" color="#8B5CF6" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Built For You <span style={{ color: "#8B5CF6" }}>To Recover.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#6A6A7A" }}>
            Each layer targets a specific dimension of human restoration. Not tools — lifelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recoveryItems.map((item, i) => (
            <motion.div key={item.name}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              onHoverStart={() => setHovered(item.name)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => onSection(item.id)}
              className="relative rounded-2xl border cursor-pointer overflow-hidden p-6 flex flex-col gap-4 transition-all"
              style={{
                background: "#0C0C14",
                borderColor: hovered === item.name ? item.color + "40" : "#1A1A24",
                boxShadow: hovered === item.name ? `0 12px 40px ${item.color}18` : "none",
              }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${item.color}60, transparent)` }} />

              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: item.color + "14", color: item.color }}>
                {item.icon}
              </div>
              <div>
                <div className="font-black text-base text-white mb-1.5" style={{ fontFamily: "'Syne', sans-serif" }}>{item.name}</div>
                <div className="text-sm leading-relaxed" style={{ color: "#6A6A7A" }}>{item.desc}</div>
              </div>
              <motion.div animate={{ x: hovered === item.name ? 4 : 0 }} className="flex items-center gap-1.5 text-xs font-semibold mt-auto" style={{ color: item.color }}>
                Open layer
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5H8M5.5 2.5L8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 4: HUMAN LAYER ─────────────────────────────────────────────────
const psychologists = [
  { name: "Dr. Aisha Patel",  specialty: "Burnout & Emotional Recovery", sessions: "1,247",  rating: "4.97", available: true,  badge: "Top Rated",       color: "#8B5CF6" },
  { name: "Dr. Marcus Lin",   specialty: "Anxiety & Focus Rebuilding",    sessions: "892",    rating: "4.95", available: true,  badge: "Most Requested",  color: "#5865F2" },
  { name: "Dr. Sofia Reyes",  specialty: "Identity & Personal Growth",    sessions: "2,103",  rating: "4.99", available: false, badge: "Expert",          color: "#A78BFA" },
];

function HumanLayer({ onSection }: { onSection: (id: SectionId) => void }) {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(88,101,242,0.06) 0%, transparent 60%)" }} />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <SectionLabel text="The Human Layer" color="#5865F2" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            When AI Support<br />
            <span style={{ color: "#5865F2" }}>Isn't Enough, Humans Step In.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#6A6A7A" }}>
            Verified psychologists seamlessly continue where SoulSync leaves off — no gap, no friction, full context.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {psychologists.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border p-6 flex flex-col gap-4"
              style={{ background: "#0C0C14", borderColor: "#1A1A24" }}>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg text-white"
                  style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}88)` }}>
                  {p.name.split(" ")[1]?.[0] ?? "?"}
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ color: p.color, background: p.color + "15" }}>{p.badge}</span>
              </div>
              <div>
                <div className="font-black text-white text-sm mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>{p.name}</div>
                <div className="text-xs" style={{ color: "#6A6A7A" }}>{p.specialty}</div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "#5A5A6A" }}>{p.sessions} sessions</span>
                <span style={{ color: "#F59E0B" }}>★ {p.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: p.available ? "#10B981" : "#3A3A4A" }} />
                <span className="text-xs" style={{ color: p.available ? "#10B981" : "#5A5A6A" }}>
                  {p.available ? "Available now · from $12/session" : "Waitlist open"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => onSection("psychologists")}
            className="px-7 py-3.5 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(88,101,242,0.10)", color: "#818CF8", border: "1px solid rgba(88,101,242,0.3)" }}>
            Browse All Psychologists →
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 5: HOW SOULSYNC WORKS ─────────────────────────────────────────
const emotionAgents = [
  { name: "Focus",      color: "#F59E0B" },
  { name: "Emotion",    color: "#EC4899" },
  { name: "Pattern",    color: "#8B5CF6" },
  { name: "Habit",      color: "#10B981" },
  { name: "Motivation", color: "#E50914" },
  { name: "Recovery",   color: "#06B6D4" },
  { name: "Sleep",      color: "#A78BFA" },
  { name: "Cognitive",  color: "#F97316" },
];

function NeuralIntelligence({ onSection }: { onSection: (id: SectionId) => void }) {
  const [activeAgent, setActiveAgent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveAgent(a => (a + 1) % emotionAgents.length), 900);
    return () => clearInterval(t);
  }, []);

  const R = 110, cx = 160, cy = 160;

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 65%)" }} />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <SectionLabel text="How SoulSync Works" color="#A78BFA" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Powered By Parallel<br />
            <span style={{ color: "#A78BFA" }}>Emotional Intelligence.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#6A6A7A" }}>
            11 AI agents operate in parallel — sensing, adapting, and responding to your emotional state in real time.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Orbital SVG */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="shrink-0">
            <svg width="320" height="320" viewBox="0 0 320 320">
              <circle cx={cx} cy={cy} r={R} fill="none" stroke="#1E1E2C" strokeWidth="1" strokeDasharray="4 6" />
              {emotionAgents.map((agent, i) => {
                const angle = (i / emotionAgents.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + R * Math.cos(angle);
                const y = cy + R * Math.sin(angle);
                const isActive = i === activeAgent;
                return (
                  <g key={agent.name}>
                    <motion.line x1={cx} y1={cy} x2={x} y2={y}
                      stroke={agent.color} strokeWidth={isActive ? 1.2 : 0.4}
                      strokeOpacity={isActive ? 0.7 : 0.15}
                      animate={{ strokeOpacity: isActive ? 0.7 : 0.12 }} transition={{ duration: 0.4 }} />
                    {isActive && (
                      <motion.circle cx={x} cy={y} r={18} fill={agent.color} fillOpacity={0.1}
                        animate={{ r: [18, 26, 18] }} transition={{ duration: 0.9, repeat: Infinity }} />
                    )}
                    <circle cx={x} cy={y} r={isActive ? 7 : 5}
                      fill={isActive ? agent.color : "#141420"}
                      stroke={agent.color} strokeWidth={isActive ? 2 : 1} strokeOpacity="0.7" />
                    <text x={x} y={y + (y > cy ? 22 : -14)} textAnchor="middle"
                      fill={isActive ? agent.color : "#3A3A4A"} fontSize="10" fontWeight={isActive ? "700" : "400"}>
                      {agent.name}
                    </text>
                  </g>
                );
              })}
              {/* Center orb */}
              <motion.circle cx={cx} cy={cy} r={30} fill="#8B5CF6" fillOpacity={0.12}
                animate={{ r: [30, 38, 30] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
              <circle cx={cx} cy={cy} r={22} fill="url(#orbGrad)" />
              <defs>
                <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#5865F2" />
                </radialGradient>
              </defs>
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14" fontWeight="900">◈</text>
            </svg>
          </motion.div>

          {/* Agent list */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {emotionAgents.map((agent, i) => (
              <motion.div key={agent.name}
                initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl p-3.5 border transition-all duration-300"
                style={{
                  borderColor: i === activeAgent ? agent.color + "40" : "#1A1A24",
                  background: i === activeAgent ? agent.color + "08" : "#0C0C14",
                }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0"
                  style={{ background: agent.color + "18", color: agent.color }}>◈</div>
                <div>
                  <div className="text-xs font-bold text-white">{agent.name} Agent</div>
                  <div className="text-xs" style={{ color: i === activeAgent ? agent.color : "#4A4A5A" }}>
                    {i === activeAgent ? "Active" : "Monitoring"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => onSection("agents")}
            className="px-7 py-3.5 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(167,139,250,0.09)", color: "#C4B5FD", border: "1px solid rgba(167,139,250,0.28)" }}>
            Explore AI Agent Network →
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 6: REBUILD ─────────────────────────────────────────────────────
const rebuildModules = [
  { id: "career-galaxy" as SectionId,  name: "Career Galaxy",          desc: "Map your path across the cosmos of possibility.",           color: "#10B981", icon: "◎" },
  { id: "future-self" as SectionId,    name: "Future Self Simulator",  desc: "Visualize yourself 1, 3, and 5 years from now.",            color: "#F59E0B", icon: "◆" },
  { id: "career-cards" as SectionId,   name: "Opportunity Cards",      desc: "Discover career paths you haven't considered yet.",         color: "#5865F2", icon: "◉" },
  { id: "universe" as SectionId,       name: "Neural Universe",        desc: "Expand knowledge across a living, breathing cosmos.",       color: "#A78BFA", icon: "◇" },
];

function RebuildSection({ onSection }: { onSection: (id: SectionId) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)" }} />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <SectionLabel text="Rebuild Phase" color="#10B981" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Once You Recover,<br />
            <span style={{ color: "#10B981" }}>You Rebuild.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#6A6A7A" }}>
            Growth tools unlock after stabilization. Career clarity, future visualization, and opportunity discovery — when you're ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rebuildModules.map((mod, i) => (
            <motion.div key={mod.id}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHovered(mod.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => onSection(mod.id)}
              className="relative rounded-2xl border cursor-pointer overflow-hidden p-7 flex items-start gap-5 transition-all"
              style={{
                background: "#0C0C14",
                borderColor: hovered === mod.id ? mod.color + "45" : "#1A1A24",
                boxShadow: hovered === mod.id ? `0 12px 40px ${mod.color}14` : "none",
              }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${mod.color}55, transparent)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: mod.color + "14", color: mod.color }}>{mod.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-white text-base mb-1.5" style={{ fontFamily: "'Syne', sans-serif" }}>{mod.name}</div>
                <div className="text-sm leading-relaxed" style={{ color: "#6A6A7A" }}>{mod.desc}</div>
              </div>
              <motion.svg animate={{ x: hovered === mod.id ? 4 : 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-1">
                <path d="M3 8H13M8.5 3.5L13 8L8.5 12.5" stroke={mod.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 7: EMOTIONAL ENDING ────────────────────────────────────────────
const endingLines = [
  "Healing Is Not Linear.",
  "Growth Is Not Instant.",
  "But You Should Never Have To Do It Alone.",
];

function EmotionalEnding({ onSection }: { onSection: (id: SectionId) => void }) {
  return (
    <section className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12">
          <SoulOrb size={100} />
        </motion.div>

        {endingLines.map((line, i) => (
          <motion.div key={line}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.25, ease: "easeOut" }}
            className="font-black leading-tight mb-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: i === 2 ? "clamp(1.5rem, 3.5vw, 2.2rem)" : "clamp(1.8rem, 4vw, 2.8rem)",
              color: i === 2 ? "#8B5CF6" : "#FFFFFF",
            }}>
            {line}
          </motion.div>
        ))}

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.9 }} className="text-base mt-8 mb-10" style={{ color: "#5A5A6A" }}>
          SoulSync is ready when you are.
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.1 }}>
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(139,92,246,0.55)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSection("soulsync")}
            className="px-10 py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}>
            Begin Your Recovery
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
interface Props {
  onSection: (id: SectionId) => void;
  user: { name: string; plan: string };
}

export default function MainHub({ onSection, user }: Props) {
  return (
    <div style={{ background: "#0B0B0F" }}>
      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10">
        <HeroSection onSection={onSection} userName={user.name} />

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)" }} />
        </div>

        <SageDemo onSection={onSection} />

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(88,101,242,0.2), transparent)" }} />
        </div>

        <RecoverySystems onSection={onSection} />

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(88,101,242,0.2), transparent)" }} />
        </div>

        <HumanLayer onSection={onSection} />

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)" }} />
        </div>

        <NeuralIntelligence onSection={onSection} />

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent)" }} />
        </div>

        <RebuildSection onSection={onSection} />

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)" }} />
        </div>

        <EmotionalEnding onSection={onSection} />
      </div>
    </div>
  );
}
