import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onAuth: (user: { name: string; email: string; plan: string }) => void;
}

export default function AuthPage({ onAuth }: Props) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!email.trim() || !password.trim()) { setError("Please fill all fields."); return; }
    if (tab === "signup" && !name.trim()) { setError("Please enter your name."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(() => {
      const displayName = tab === "signup" ? name.trim() : email.split("@")[0];
      onAuth({ name: displayName, email: email.trim(), plan: "free" });
      setLoading(false);
    }, 900);
  };

  const handleDemo = () => {
    setLoading(true);
    setTimeout(() => {
      onAuth({ name: "Demo User", email: "demo@apexos.ai", plan: "pro" });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{ background: "#0B0B0F" }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ opacity: [0.05, 0.10, 0.05] }} transition={{ duration: 7, repeat: Infinity }}
          className="absolute rounded-full blur-[140px]"
          style={{ width: 500, height: 500, left: "5%", top: "5%", background: "#8B5CF6" }} />
        <motion.div animate={{ opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }}
          className="absolute rounded-full blur-[110px]"
          style={{ width: 380, height: 380, right: "8%", bottom: "10%", background: "#5865F2" }} />
        <motion.div animate={{ opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 11, repeat: Infinity, delay: 4 }}
          className="absolute rounded-full blur-[90px]"
          style={{ width: 260, height: 260, left: "40%", bottom: "5%", background: "#A78BFA" }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          {/* SoulSync Orb */}
          <div className="flex justify-center mb-5">
            <div className="relative" style={{ width: 56, height: 56 }}>
              {[1, 0.65].map((s, i) => (
                <motion.div key={i}
                  animate={{ scale: [s, s * 1.18, s], opacity: [0.1, 0.25, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle, #8B5CF6, #5865F2 70%)", filter: "blur(4px)" }}
                />
              ))}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)", boxShadow: "0 0 28px rgba(139,92,246,0.65)" }}
              >
                <span className="text-white font-black text-xl">◈</span>
              </motion.div>
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-widest mb-1" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
            SOUL<span style={{ color: "#8B5CF6" }}>SYNC</span>
          </h1>
          <div className="text-xs tracking-widest uppercase" style={{ color: "#5A5A6A", fontFamily: "'Syne', sans-serif" }}>
            The AI Companion That Evolves With You
          </div>
        </motion.div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: "#0C0C16", borderColor: "#1C1C2A" }}>
          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "#1C1C2A" }}>
            {(["login", "signup"] as const).map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(""); }}
                className="flex-1 py-4 text-sm font-bold capitalize transition-all"
                style={{
                  color: tab === t ? "#fff" : "#4A4A5A",
                  borderBottom: tab === t ? "2px solid #8B5CF6" : "2px solid transparent",
                  background: tab === t ? "rgba(139,92,246,0.06)" : "transparent",
                }}>
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, x: tab === "login" ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="space-y-4 mb-6">
                  {tab === "signup" && (
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#5A5A6A" }}>Full Name</label>
                      <input
                        value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                        style={{ background: "#10101A", borderColor: name ? "rgba(139,92,246,0.5)" : "#1C1C2A", color: "#fff" }}
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#5A5A6A" }}>Email</label>
                    <input
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" type="email"
                      className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                      style={{ background: "#10101A", borderColor: email ? "rgba(139,92,246,0.5)" : "#1C1C2A", color: "#fff" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#5A5A6A" }}>Password</label>
                    <input
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" type="password"
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                      style={{ background: "#10101A", borderColor: password ? "rgba(139,92,246,0.5)" : "#1C1C2A", color: "#fff" }}
                    />
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-xs mb-4 px-3 py-2 rounded-lg"
                    style={{ color: "#EC4899", background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.2)" }}>
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(139,92,246,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white mb-3 transition-all"
                  style={{ background: loading ? "#1C1C2A" : "linear-gradient(135deg, #8B5CF6, #5865F2)", color: loading ? "#5A5A6A" : "#fff" }}
                >
                  {loading ? (
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                      Connecting…
                    </motion.span>
                  ) : tab === "login" ? "Sign In to SoulSync" : "Begin My Recovery"}
                </motion.button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px" style={{ background: "#1C1C2A" }} />
                  <span className="text-xs" style={{ color: "#3A3A4A" }}>or</span>
                  <div className="flex-1 h-px" style={{ background: "#1C1C2A" }} />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, borderColor: "rgba(139,92,246,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDemo}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm border transition-all"
                  style={{ color: "#8A8A9A", borderColor: "#1C1C2A", background: "transparent" }}
                >
                  Continue as Guest (Demo Mode)
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center mt-6">
          <div className="flex items-center justify-center gap-3 text-xs" style={{ color: "#4A4A5A" }}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              12,847 users
            </span>
            <span>·</span>
            <span>11 AI Agents</span>
            <span>·</span>
            <span>99.97% uptime</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
