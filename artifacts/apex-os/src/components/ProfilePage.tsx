import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  user: { name: string; email: string; plan: string };
  onUpdate: (u: { name: string; email: string; plan: string }) => void;
  onLogout: () => void;
}

const achievements = [
  { label: "First Login", desc: "Entered the OS", color: "#E50914", done: true },
  { label: "Agent Activated", desc: "Ran your first agent", color: "#5865F2", done: true },
  { label: "SoulSync Session", desc: "Started a companion session", color: "#8B5CF6", done: true },
  { label: "Workflow Deployed", desc: "Executed a live workflow", color: "#A78BFA", done: false },
  { label: "7-Day Streak", desc: "Recovery streak champion", color: "#F59E0B", done: false },
  { label: "Terminal Master", desc: "Used 5 terminal commands", color: "#10B981", done: false },
];

const neuralScore = 71;

export default function ProfilePage({ user, onUpdate, onLogout }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [saved, setSaved] = useState(false);

  const save = () => {
    onUpdate({ ...user, name: name.trim() || user.name, email: email.trim() || user.email });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const planColors: Record<string, string> = { free: "#7A7A7A", pro: "#F59E0B", elite: "#E50914" };
  const planColor = planColors[user.plan] ?? "#7A7A7A";

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "#0B0B0F" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Avatar + identity */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border p-6 text-center" style={{ background: "#141414", borderColor: "#2A2A2E" }}>
              <div className="relative inline-block mb-4">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 rounded-full blur-xl opacity-30" style={{ background: "#E50914" }} />
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto" style={{ background: "linear-gradient(135deg, #E50914, #5865F2)", fontFamily: "'Syne', sans-serif" }}>
                  {(user.name[0] ?? "U").toUpperCase()}
                </div>
              </div>
              <div className="font-black text-white text-lg mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>{user.name}</div>
              <div className="text-xs mb-3" style={{ color: "#7A7A7A" }}>{user.email}</div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ color: planColor, background: planColor + "15", border: `1px solid ${planColor}40` }}>
                {user.plan.toUpperCase()} PLAN
              </div>
            </div>

            {/* Neural score */}
            <div className="rounded-2xl border p-5" style={{ background: "#141414", borderColor: "#2A2A2E" }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#7A7A7A" }}>Neural Score</div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-black" style={{ color: "#E50914", fontFamily: "'Syne', sans-serif" }}>{neuralScore}</span>
                <span className="text-sm mb-1" style={{ color: "#7A7A7A" }}>/ 100</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1C1C1F" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${neuralScore}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #E50914, #5865F2)" }} />
              </div>
              <div className="text-[10px] mt-2" style={{ color: "#7A7A7A" }}>+29 points to unlock Elite tier</div>
            </div>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogout}
              className="w-full py-3 rounded-xl border text-sm font-semibold transition-all"
              style={{ color: "#7A7A7A", borderColor: "#2A2A2E", background: "transparent" }}
            >
              Sign Out
            </motion.button>
          </div>

          {/* Right: Edit + achievements */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Edit profile */}
            <div className="rounded-2xl border p-6" style={{ background: "#141414", borderColor: "#2A2A2E" }}>
              <div className="flex items-center justify-between mb-5">
                <div className="font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Profile Settings</div>
                {!editing ? (
                  <motion.button whileHover={{ scale: 1.04 }} onClick={() => setEditing(true)} className="text-xs px-3 py-1.5 rounded-lg border transition-all" style={{ color: "#E50914", borderColor: "rgba(229,9,20,0.3)", background: "rgba(229,9,20,0.08)" }}>
                    Edit
                  </motion.button>
                ) : (
                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.04 }} onClick={() => { setEditing(false); setName(user.name); setEmail(user.email); }} className="text-xs px-3 py-1.5 rounded-lg border" style={{ color: "#7A7A7A", borderColor: "#2A2A2E" }}>
                      Cancel
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.04 }} onClick={save} className="text-xs px-3 py-1.5 rounded-lg font-bold text-white" style={{ background: "#E50914" }}>
                      Save
                    </motion.button>
                  </div>
                )}
              </div>

              {saved && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs px-3 py-2 rounded-lg mb-4" style={{ color: "#10B981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  Profile updated successfully.
                </motion.div>
              )}

              <div className="space-y-4">
                {[{ label: "Display Name", value: name, set: setName }, { label: "Email Address", value: email, set: setEmail }].map(({ label, value, set }) => (
                  <div key={label}>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>{label}</label>
                    <input
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      disabled={!editing}
                      className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                      style={{ background: editing ? "#1C1C1F" : "#141414", borderColor: editing ? "rgba(229,9,20,0.4)" : "#2A2A2E", color: editing ? "#fff" : "#B3B3B3" }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7A7A7A" }}>Current Plan</label>
                  <div className="rounded-xl border px-4 py-3 text-sm flex items-center justify-between" style={{ background: "#141414", borderColor: "#2A2A2E" }}>
                    <span className="font-bold" style={{ color: planColor }}>{user.plan.toUpperCase()} — {user.plan === "free" ? "Basic access" : user.plan === "pro" ? "$19 / month" : "$49 / month"}</span>
                    <span className="text-[10px]" style={{ color: "#7A7A7A" }}>Manage in Subscription</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-2xl border p-6" style={{ background: "#141414", borderColor: "#2A2A2E" }}>
              <div className="font-black text-white mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>Achievements</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((a, i) => (
                  <motion.div
                    key={a.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl border"
                    style={{ background: a.done ? a.color + "08" : "#0E0E12", borderColor: a.done ? a.color + "30" : "#2A2A2E", opacity: a.done ? 1 : 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: a.done ? a.color + "20" : "#1C1C1F", color: a.done ? a.color : "#7A7A7A" }}>
                      {a.done ? "✓" : "○"}
                    </div>
                    <div>
                      <div className="text-xs font-bold" style={{ color: a.done ? "#fff" : "#7A7A7A" }}>{a.label}</div>
                      <div className="text-[10px]" style={{ color: "#7A7A7A" }}>{a.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
