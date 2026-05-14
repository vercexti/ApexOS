import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "agent" | "milestone" | "streak" | "workflow" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastContextValue {
  addToast: (type: ToastType, title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ addToast: () => {} });
export const useToast = () => useContext(ToastContext);

const typeConfig: Record<ToastType, { color: string; icon: string; label: string }> = {
  agent:     { color: "#E50914", icon: "◈", label: "AGENT ALERT" },
  milestone: { color: "#F59E0B", icon: "◆", label: "MILESTONE" },
  streak:    { color: "#8B5CF6", icon: "◉", label: "STREAK" },
  workflow:  { color: "#A78BFA", icon: "◇", label: "WORKFLOW" },
  info:      { color: "#5865F2", icon: "◎", label: "SYSTEM" },
};

const activityFeed: Array<{ type: ToastType; title: string; message: string }> = [
  { type: "agent",     title: "Research Agent",        message: "Found 47 relevant papers on your topic" },
  { type: "agent",     title: "Strategy Agent",        message: "Identified 3 high-impact career moves" },
  { type: "agent",     title: "Finance Agent",         message: "Portfolio simulation complete — +23% projected" },
  { type: "milestone", title: "Neural Score +2",       message: "You leveled up your intelligence profile" },
  { type: "milestone", title: "Achievement Unlocked",  message: "Agent Activated — keep exploring!" },
  { type: "streak",    title: "3-Day Streak",          message: "SoulSync is proud of your consistency" },
  { type: "workflow",  title: "Daily Focus",           message: "Workflow executed successfully — 4 tasks completed" },
  { type: "workflow",  title: "Research Pipeline",     message: "12 articles ingested and summarized" },
  { type: "agent",     title: "Career Agent",          message: "Found 5 new opportunities matching your profile" },
  { type: "info",      title: "System Update",         message: "Neural core optimized — 12% faster response" },
  { type: "agent",     title: "Wellness Agent",        message: "Mood trend: improving over last 7 days" },
  { type: "milestone", title: "First Sprint Done",     message: "You completed your first Focus Sprint — great work" },
];

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const cfg = typeConfig[toast.type];

  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative w-80 rounded-xl border overflow-hidden cursor-pointer group"
      style={{ background: "rgba(11,11,15,0.96)", borderColor: cfg.color + "30", backdropFilter: "blur(20px)" }}
      onClick={onDismiss}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)` }} />

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 5, ease: "linear" }}
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ background: cfg.color + "60" }}
      />

      <div className="flex items-start gap-3 px-4 py-3.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm" style={{ background: cfg.color + "15", color: cfg.color }}>
          {cfg.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] font-bold tracking-widest" style={{ color: cfg.color }}>{cfg.label}</span>
          </div>
          <div className="text-xs font-bold text-white mb-0.5">{toast.title}</div>
          <div className="text-[11px] leading-relaxed" style={{ color: "#B3B3B3" }}>{toast.message}</div>
        </div>
        <button
          className="text-xs opacity-0 group-hover:opacity-60 transition-opacity shrink-0"
          style={{ color: "#7A7A7A" }}
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev.slice(-3), { id, type, title, message }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Random activity feed
  useEffect(() => {
    let idx = Math.floor(Math.random() * activityFeed.length);
    const schedule = () => {
      const delay = 20000 + Math.random() * 40000; // 20-60s
      return setTimeout(() => {
        const item = activityFeed[idx % activityFeed.length];
        idx++;
        addToast(item.type, item.title, item.message);
        schedule();
      }, delay);
    };
    // First toast after 8s
    const first = setTimeout(() => {
      addToast(activityFeed[0].type, activityFeed[0].title, activityFeed[0].message);
      idx = 1;
      schedule();
    }, 8000);
    return () => clearTimeout(first);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem toast={t} onDismiss={() => dismiss(t.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
