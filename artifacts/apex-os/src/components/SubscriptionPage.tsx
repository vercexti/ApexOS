import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  user: { name: string; plan: string };
  onUpgrade: (plan: string) => void;
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    color: "#7A7A7A",
    desc: "Start your journey",
    features: [
      "5 AI agent interactions / day",
      "SoulSync Companion (10 msgs/day)",
      "Basic Career Cards",
      "Study Command Center",
      "AI Terminal (3 commands/day)",
      "1 Workflow execution / day",
      "Community support",
    ],
    locked: [
      "Strategic Dashboard",
      "Research Intelligence",
      "Finance Projector",
      "Network Engine",
      "Unlimited agents",
      "Psychologist Connect",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "/ month",
    color: "#E50914",
    desc: "Full OS access",
    popular: true,
    features: [
      "Unlimited AI agent interactions",
      "SoulSync Companion (unlimited)",
      "All 11 agents fully unlocked",
      "Strategic Dashboard live metrics",
      "Research Intelligence (A+ reports)",
      "Finance Projector + wealth maps",
      "Network Engine access",
      "Psychologist Connect (3 sessions/mo)",
      "Unlimited workflows",
      "Career Galaxy + Future Simulator",
      "AI Terminal (unlimited)",
      "Priority support",
    ],
    locked: ["Elite Neural Profile", "Custom agent training"],
  },
  {
    id: "elite",
    name: "Elite",
    price: "$49",
    period: "/ month",
    color: "#F59E0B",
    desc: "Maximum intelligence",
    features: [
      "Everything in Pro",
      "Elite Neural Profile generation",
      "Custom agent personality training",
      "Psychologist Connect (unlimited)",
      "Exclusive SoulSync deep sessions",
      "AI decision war-room access",
      "Private research pipeline",
      "Neural OS voice interface",
      "Priority 24/7 support",
      "Early access to new features",
      "APEX OS certification",
      "Founding member badge",
    ],
    locked: [],
  },
];

export default function SubscriptionPage({ user, onUpgrade }: Props) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [upgraded, setUpgraded] = useState<string | null>(null);

  const handleUpgrade = (planId: string) => {
    if (planId === user.plan) return;
    setUpgrading(planId);
    setTimeout(() => {
      onUpgrade(planId);
      setUpgraded(planId);
      setUpgrading(null);
    }, 1200);
  };

  const getDiscount = (price: string) => {
    if (price === "$0") return "$0";
    const num = parseInt(price.replace("$", ""));
    return `$${Math.round(num * 10 * 0.8)}`;
  };

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "#0B0B0F" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-block text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full mb-5 border" style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)" }}>
            Subscription Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Unlock Your Full<br />
            <span style={{ color: "#E50914" }}>Intelligence Stack</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: "#B3B3B3" }}>
            Start free. Scale when ready. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-2 rounded-full border p-1" style={{ borderColor: "#2A2A2E", background: "#141414" }}>
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: billing === b ? "#E50914" : "transparent",
                  color: billing === b ? "#fff" : "#7A7A7A",
                }}
              >
                {b === "monthly" ? "Monthly" : "Annual (20% off)"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const isCurrent = user.plan === plan.id;
            const isUpgrading = upgrading === plan.id;
            const isUpgraded = upgraded === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border overflow-hidden relative"
                style={{
                  background: plan.popular ? "#0E0E18" : "#141414",
                  borderColor: plan.popular ? plan.color + "50" : isCurrent ? plan.color + "40" : "#2A2A2E",
                  boxShadow: plan.popular ? `0 0 40px ${plan.color}12` : "none",
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }} />
                )}
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-black px-2 py-1 rounded-full" style={{ background: plan.color, color: "#fff" }}>MOST POPULAR</span>
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-5">
                    <div className="font-black text-lg text-white mb-0.5" style={{ fontFamily: "'Syne', sans-serif", color: plan.color }}>{plan.name}</div>
                    <div className="text-xs mb-3" style={{ color: "#7A7A7A" }}>{plan.desc}</div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                        {billing === "annual" && plan.price !== "$0" ? getDiscount(plan.price) : plan.price}
                      </span>
                      {billing === "annual" && plan.price !== "$0" && (
                        <span className="text-sm line-through mb-1" style={{ color: "#7A7A7A" }}>{plan.price}</span>
                      )}
                      <span className="text-sm mb-1" style={{ color: "#7A7A7A" }}>{plan.period}</span>
                    </div>
                  </div>

                  {isCurrent ? (
                    <div className="w-full py-3 rounded-xl text-sm font-bold text-center mb-6 border" style={{ color: plan.color, borderColor: plan.color + "40", background: plan.color + "10" }}>
                      Current Plan
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${plan.color}30` }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={!!upgrading}
                      className="w-full py-3 rounded-xl text-sm font-bold text-white mb-6 transition-all"
                      style={{ background: plan.id === "free" ? "#1C1C1F" : plan.color, color: plan.id === "free" ? "#B3B3B3" : "#fff" }}
                    >
                      {isUpgrading ? (
                        <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                          Processing…
                        </motion.span>
                      ) : isUpgraded ? "Activated!" : plan.id === "free" ? "Downgrade to Free" : `Upgrade to ${plan.name}`}
                    </motion.button>
                  )}

                  <div className="space-y-2.5">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <span className="text-xs shrink-0 mt-0.5" style={{ color: plan.color }}>✓</span>
                        <span className="text-xs" style={{ color: "#B3B3B3" }}>{f}</span>
                      </div>
                    ))}
                    {plan.locked.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 opacity-35">
                        <span className="text-xs shrink-0 mt-0.5" style={{ color: "#7A7A7A" }}>○</span>
                        <span className="text-xs" style={{ color: "#7A7A7A" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 text-center">
          <div className="text-xs" style={{ color: "#7A7A7A" }}>
            All plans include a 7-day free trial. No credit card required for Free plan. Cancel anytime.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
