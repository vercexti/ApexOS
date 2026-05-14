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
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "#0B0B0F" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 6, repeat: Infinity }} className="absolute rounded-full blur-[120px]" style={{ width: 500, height: 500, left: "5%", top: "10%", background: "#E50914" }} />
        <motion.div animate={{ opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} className="absolute rounded-full blur-[100px]" style={{ width: 400, height: 400, right: "5%", bottom: "10%", background: "#5865F2" }} />
      </div>

      {/* CRT grain */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)", backgroundSize: "100% 4px" }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#E50914" }}>
                <span className="text-white font-black text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>A</span>
              </div>
              <div className="absolute inset-0 blur-lg opacity-60" style={{ background: "#E50914" }} />
            </div>
            <span className="text-2xl font-black tracking-widest" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
              APEX<span style={{ color: "#E50914" }}>OS</span>
            </span>
          </div>
          <div className="text-sm" style={{ color: "#7A7A7A" }}>The AI Operating System For Human Potential</div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: "#0E0E14", borderColor: "#2A2A2E" }}
        >
          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "#2A2A2E" }}>
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className="flex-1 py-4 text-sm font-bold capitalize transition-all"
                style={{
                  color: tab === t ? "#fff" : "#7A7A7A",
                  borderBottom: tab === t ? "2px solid #E50914" : "2px solid transparent",
                  background: tab === t ? "rgba(229,9,20,0.05)" : "transparent",
                }}
              >
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
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>Full Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                        style={{ background: "#141420", borderColor: name ? "rgba(229,9,20,0.5)" : "#2A2A2E", color: "#fff" }}
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      type="email"
                      className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                      style={{ background: "#141420", borderColor: email ? "rgba(229,9,20,0.5)" : "#2A2A2E", color: "#fff" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      type="password"
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                      style={{ background: "#141420", borderColor: password ? "rgba(229,9,20,0.5)" : "#2A2A2E", color: "#fff" }}
                    />
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mb-4 px-3 py-2 rounded-lg" style={{ color: "#E50914", background: "rgba(229,9,20,0.1)", border: "1px solid rgba(229,9,20,0.2)" }}>
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(229,9,20,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white mb-3 transition-all"
                  style={{ background: loading ? "#2A2A2E" : "#E50914", color: loading ? "#7A7A7A" : "#fff" }}
                >
                  {loading ? (
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                      Authenticating…
                    </motion.span>
                  ) : tab === "login" ? "Sign In to APEX OS" : "Create My Account"}
                </motion.button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px" style={{ background: "#2A2A2E" }} />
                  <span className="text-[10px]" style={{ color: "#7A7A7A" }}>or</span>
                  <div className="flex-1 h-px" style={{ background: "#2A2A2E" }} />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDemo}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm border transition-all"
                  style={{ color: "#B3B3B3", borderColor: "#2A2A2E", background: "transparent" }}
                >
                  Continue as Guest (Demo Mode)
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center mt-6">
          <div className="flex items-center justify-center gap-3 text-xs" style={{ color: "#7A7A7A" }}>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />12,847 users</span>
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
