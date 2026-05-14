import { useState } from "react";
import { motion } from "framer-motion";

const footerLinks = {
  Product: [
    { label: "AI Agent Network", section: "agents" },
    { label: "SoulSync", section: "soulsync" },
    { label: "Career Galaxy", section: "career-galaxy" },
    { label: "Study Command Center", section: "study" },
    { label: "Workflow Universe", section: "workflows" },
    { label: "AI Terminal", section: "terminal" },
  ],
  Wellness: [
    { label: "Sage Companion", section: "soulsync" },
    { label: "Daily Recovery", section: "recovery" },
    { label: "Psychologist Connect", section: "psychologists" },
    { label: "Breathing & Grounding", section: "breathing" },
    { label: "Ambient Soundscapes", section: "ambient" },
    { label: "Focus Sprint", section: "focus-sprint" },
  ],
  Intelligence: [
    { label: "Neural Debate Arena", section: "debate" },
    { label: "Strategic Dashboard", section: "dashboard" },
    { label: "Research Intelligence", section: "research" },
    { label: "Neural Architecture", section: "neural-arch" },
    { label: "Future Self Simulator", section: "future-self" },
    { label: "Decision Simulator", section: "decision-sim" },
  ],
  Company: [
    { label: "About APEX OS", section: null },
    { label: "Careers", section: null },
    { label: "Blog", section: null },
    { label: "Privacy Policy", section: null },
    { label: "Terms of Service", section: null },
    { label: "System Status", section: null },
  ],
};

const stats = [
  { value: "12,847", label: "Users" },
  { value: "11", label: "AI Agents" },
  { value: "25", label: "Sections" },
  { value: "99.97%", label: "Uptime" },
  { value: "4.9 / 5", label: "Rating" },
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
    setTimeout(() => {
      setSubscribed(true);
      setSubscribing(false);
    }, 900);
  };

  return (
    <footer className="relative overflow-hidden border-t" style={{ background: "#08080D", borderColor: "#1A1A1E" }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full blur-[120px] opacity-[0.04]" style={{ width: 500, height: 300, left: "10%", top: 0, background: "#E50914" }} />
        <div className="absolute rounded-full blur-[100px] opacity-[0.03]" style={{ width: 400, height: 300, right: "5%", bottom: 0, background: "#5865F2" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Stats bar */}
        <div className="border-b py-8" style={{ borderColor: "#1A1A1E" }}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: "#E50914", fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "#7A7A7A" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main footer body */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E50914" }}>
                  <span className="text-white font-black" style={{ fontFamily: "'Syne', sans-serif" }}>A</span>
                </div>
                <div className="absolute inset-0 blur-lg opacity-60" style={{ background: "#E50914" }} />
              </div>
              <span className="text-xl font-black tracking-widest" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                APEX<span style={{ color: "#E50914" }}>OS</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#7A7A7A" }}>
              The AI Operating System for Human Potential. 11 intelligent agents. 25 powerful sections. One unified ecosystem.
            </p>

            {/* System status */}
            <div className="flex items-center gap-2 mb-8">
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              <span className="text-xs font-mono" style={{ color: "#10B981" }}>ALL SYSTEMS OPERATIONAL</span>
            </div>

            {/* Newsletter */}
            <div>
              <div className="font-black text-white text-sm mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Join the Intelligence Network</div>
              <div className="text-xs mb-4" style={{ color: "#7A7A7A" }}>
                Weekly drops: AI agent updates, productivity protocols, and early feature access.
              </div>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border text-sm"
                  style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
                >
                  <span>✓</span>
                  <span>You're in. Welcome to the network.</span>
                </motion.div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    placeholder="your@email.com"
                    type="email"
                    className="flex-1 min-w-0 rounded-xl border px-4 py-2.5 text-sm outline-none transition-all"
                    style={{ background: "#141420", borderColor: email ? "rgba(229,9,20,0.4)" : "#2A2A2E", color: "#fff" }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(229,9,20,0.3)" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleSubscribe}
                    disabled={subscribing}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-white shrink-0 transition-all"
                    style={{ background: "#E50914" }}
                  >
                    {subscribing ? (
                      <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>…</motion.span>
                    ) : "Subscribe"}
                  </motion.button>
                </div>
              )}

              <div className="text-[10px] mt-2" style={{ color: "#7A7A7A" }}>No spam. Unsubscribe anytime. ~12,847 subscribers.</div>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <div className="font-black text-xs tracking-widest uppercase mb-4" style={{ color: "#fff" }}>{category}</div>
                <div className="space-y-2.5">
                  {links.map(({ label, section }) => (
                    <button
                      key={label}
                      onClick={() => section && onSection?.(section)}
                      className="block text-xs transition-colors hover:text-white text-left"
                      style={{ color: "#7A7A7A" }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t py-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "#1A1A1E" }}>
          <div className="text-xs" style={{ color: "#7A7A7A" }}>
            © 2026 APEX OS. All rights reserved. Built for human potential.
          </div>

          <div className="flex items-center gap-6 text-xs" style={{ color: "#7A7A7A" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => (
              <button key={l} className="hover:text-white transition-colors">{l}</button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: "#7A7A7A" }}>v2.0 · Neural core online</span>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full" style={{ background: "#E50914" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
