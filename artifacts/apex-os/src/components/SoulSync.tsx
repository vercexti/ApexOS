import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SoulSyncCompanion from "@/components/SoulSyncCompanion";
import SoulSyncRecovery from "@/components/SoulSyncRecovery";
import SoulSyncPsychologists from "@/components/SoulSyncPsychologists";
import SoulSyncAmbient from "@/components/SoulSyncAmbient";

const tabs = ["Companion", "Recovery", "Psychologists"] as const;
type Tab = typeof tabs[number];

const tabIcons: Record<Tab, string> = {
  Companion: "◈",
  Recovery: "◉",
  Psychologists: "◎",
};

const tabDescs: Record<Tab, string> = {
  Companion: "Emotionally intelligent AI · Always present",
  Recovery: "Daily quests · Mood tracking · Breathing",
  Psychologists: "Verified professionals · Affordable sessions",
};

function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: Math.random() * 3 + 1,
        height: Math.random() * 3 + 1,
        left: `${x}%`,
        top: `${y}%`,
        background: Math.random() > 0.5 ? "#8B5CF6" : "#5865F2",
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, -40, -80],
        x: [0, Math.random() * 20 - 10],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
  x: Math.random() * 100,
  y: 20 + Math.random() * 60,
}));

export default function SoulSync() {
  const [activeTab, setActiveTab] = useState<Tab>("Companion");
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SoulSyncAmbient />

      <section
        id="soulsync"
        ref={sectionRef}
        className="relative py-24 px-6 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0B0B0F 0%, #09090F 40%, #0A081A 100%)" }}
      >
        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full blur-[120px]"
            style={{ width: 600, height: 600, left: "10%", top: "10%", background: "#8B5CF6" }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute rounded-full blur-[100px]"
            style={{ width: 400, height: 400, right: "10%", top: "20%", background: "#5865F2" }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute rounded-full blur-[80px]"
            style={{ width: 300, height: 300, left: "50%", bottom: "10%", background: "#EC4899" }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <FloatingParticle key={p.id} {...p} />
          ))}
        </div>

        {/* Cinematic divider from APEX content */}
        <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(180deg, #0B0B0F 0%, transparent 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8 border"
              style={{ color: "#8B5CF6", borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.08)" }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#8B5CF6" }}
              />
              Emotional Intelligence Core · Online
            </motion.div>

            {/* Main heading */}
            <div className="mb-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-black mb-2"
                style={{ fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}
              >
                Soul
                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  Sync
                </motion.span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="text-lg md:text-xl tracking-widest font-medium"
                style={{ color: "#8B5CF6", fontFamily: "'Syne', sans-serif" }}
              >
                The AI Companion That Stays.
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg max-w-2xl mx-auto leading-relaxed mb-6"
              style={{ color: "#B3B3B3" }}
            >
              Not a chatbot. Not a therapy replacement. An emotionally intelligent AI companion
              that learns your patterns, supports your recovery, and connects you to real professionals — all inside APEX OS.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {[
                { label: "Anxiety Support", color: "#8B5CF6" },
                { label: "ADHD Guidance", color: "#5865F2" },
                { label: "Burnout Recovery", color: "#EC4899" },
                { label: "Loneliness", color: "#06B6D4" },
                { label: "Motivation Engine", color: "#F59E0B" },
                { label: "OCD Support", color: "#10B981" },
              ].map((pill) => (
                <span
                  key={pill.label}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium"
                  style={{ color: pill.color, borderColor: pill.color + "40", background: pill.color + "0D" }}
                >
                  {pill.label}
                </span>
              ))}
            </motion.div>

            {/* Key feature stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14"
            >
              {[
                { stat: "Sage", label: "Your AI Companion", sub: "Adapts to every emotion", color: "#8B5CF6" },
                { stat: "6+", label: "Verified Psychologists", sub: "From $12/session", color: "#5865F2" },
                { stat: "∞", label: "Ambient Soundscapes", sub: "Focus, calm, and sleep audio", color: "#EC4899" },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className="rounded-2xl border p-5 text-left relative overflow-hidden"
                  style={{ background: "rgba(10,8,25,0.8)", borderColor: card.color + "30", backdropFilter: "blur(20px)" }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 0%, ${card.color}12 0%, transparent 70%)` }} />
                  <div className="text-3xl font-black mb-1" style={{ color: card.color, fontFamily: "'Syne', sans-serif" }}>{card.stat}</div>
                  <div className="text-sm font-bold text-white mb-0.5">{card.label}</div>
                  <div className="text-xs" style={{ color: "#7A7A7A" }}>{card.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-semibold transition-all"
                style={{
                  background: activeTab === tab ? "rgba(139,92,246,0.15)" : "rgba(10,8,20,0.6)",
                  borderColor: activeTab === tab ? "rgba(139,92,246,0.5)" : "#2A2A2E",
                  color: activeTab === tab ? "#8B5CF6" : "#7A7A7A",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span style={{ color: activeTab === tab ? "#8B5CF6" : "#2A2A2E" }}>{tabIcons[tab]}</span>
                <div className="text-left">
                  <div style={{ fontFamily: "'Syne', sans-serif" }}>{tab}</div>
                  <div className="text-[9px] font-normal hidden lg:block" style={{ color: activeTab === tab ? "#8B5CF680" : "#7A7A7A" }}>{tabDescs[tab]}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "Companion" && <SoulSyncCompanion />}
              {activeTab === "Recovery" && <SoulSyncRecovery />}
              {activeTab === "Psychologists" && <SoulSyncPsychologists />}
            </motion.div>
          </AnimatePresence>

          {/* Bottom ethics note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <div
              className="inline-block text-[11px] px-5 py-3 rounded-xl border"
              style={{ color: "#7A7A7A", borderColor: "#2A2A2E", background: "rgba(10,10,20,0.5)" }}
            >
              SoulSync is not a replacement for medical or mental health treatment.
              It is a supportive companion and connection tool.
              Always seek professional help for serious mental health concerns.
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
