import { useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "12,847", label: "Users" },
  { value: "11", label: "AI Agents" },
  { value: "25", label: "Sections" },
  { value: "99.97%", label: "Uptime" },
  { value: "4.9 / 5", label: "Rating" },
];

const highlights = [
  { label: "SoulSync Companion", color: "#8B5CF6", dot: true },
  { label: "AI Agent Network", color: "#E50914", dot: true },
  { label: "Career Galaxy", color: "#10B981", dot: true },
  { label: "Workflow Universe", color: "#A78BFA", dot: true },
  { label: "Neural Debate Arena", color: "#E50914", dot: false },
  { label: "Study Command Center", color: "#5865F2", dot: false },
  { label: "Focus Sprint", color: "#F59E0B", dot: false },
  { label: "Future Self Simulator", color: "#F59E0B", dot: false },
];

interface Props {
  onSection?: (id: string) => void;
}

export default function AppFooter({ onSection }: Props) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes("@")) return;
    setSubscribing(true);
    setTimeout(() => { setSubscribed(true); setSubscribing(false); }, 900);
  };

  return (
    <footer className="relative overflow-hidden border-t" style={{ background: "#08080D", borderColor: "#1A1A1E" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full blur-[140px] opacity-[0.05]" style={{ width: 600, height: 350, left: "5%", top: 0, background: "#E50914" }} />
        <div className="absolute rounded-full blur-[120px] opacity-[0.04]" style={{ width: 500, height: 350, right: "2%", bottom: 0, background: "#5865F2" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Stats bar */}
        <div className="border-b py-10" style={{ borderColor: "#1A1A1E" }}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: "#E50914", fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
                <div className="text-sm tracking-widest uppercase" style={{ color: "#7A7A7A" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main body: Brand + Newsletter */}
        <div className="py-14 grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#E50914" }}>
                  <span className="text-white font-black text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>A</span>
                </div>
                <div className="absolute inset-0 blur-xl opacity-60 rounded-xl" style={{ background: "#E50914" }} />
              </div>
              <span className="text-2xl font-black tracking-widest" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                APEX<span style={{ color: "#E50914" }}>OS</span>
              </span>
            </div>

            <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color: "#7A7A7A" }}>
              The AI Operating System for Human Potential. 11 intelligent agents, 25 powerful modules, one unified ecosystem built for the ambitious.
            </p>

            <div className="flex items-center gap-2 mb-8">
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
              <span className="text-sm font-mono" style={{ color: "#10B981" }}>ALL SYSTEMS OPERATIONAL</span>
            </div>

            {/* Featured modules pill list */}
            <div className="flex flex-wrap gap-2">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
                  style={{ borderColor: h.color + "30", color: h.color, background: h.color + "0A" }}>
                  {h.dot && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: h.color }} />}
                  {h.label}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border p-8" style={{ background: "#0C0C14", borderColor: "#1E1E28" }}>
              <div className="text-lg font-black text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                Join the Intelligence Network
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#7A7A7A" }}>
                Weekly drops: AI agent updates, productivity protocols, and early feature access. No spam — just signal.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl border text-base"
                  style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
                >
                  <span className="text-lg">✓</span>
                  <span className="font-semibold">You're in. Welcome to the network.</span>
                </motion.div>
              ) : (
                <div className="flex gap-3">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    placeholder="your@email.com"
                    type="email"
                    className="flex-1 min-w-0 rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                    style={{ background: "#141420", borderColor: email ? "rgba(229,9,20,0.5)" : "#2A2A2E", color: "#fff" }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(229,9,20,0.35)" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleSubscribe}
                    disabled={subscribing}
                    className="px-5 py-3 rounded-xl text-sm font-bold text-white shrink-0 transition-all"
                    style={{ background: "#E50914" }}
                  >
                    {subscribing ? (
                      <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>…</motion.span>
                    ) : "Subscribe"}
                  </motion.button>
                </div>
              )}

              <div className="text-xs mt-3" style={{ color: "#4A4A5A" }}>~12,847 subscribers · Unsubscribe anytime</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t py-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "#1A1A1E" }}>
          <div className="text-sm" style={{ color: "#5A5A6A" }}>
            © 2026 APEX OS. All rights reserved. Built for human potential.
          </div>

          <div className="flex items-center gap-6 text-sm" style={{ color: "#5A5A6A" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => (
              <button key={l} className="hover:text-white transition-colors">{l}</button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-mono" style={{ color: "#5A5A6A" }}>v2.0 · Neural core online</span>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full" style={{ background: "#E50914" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
