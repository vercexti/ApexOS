import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClose: () => void;
}

const steps = [
  {
    id: "ambition",
    question: "What is your primary ambition?",
    sub: "APEX OS will reconfigure its neural architecture around your answer.",
    options: [
      { id: "startup", label: "Launch a Startup", icon: "◈", agents: ["Strategy Agent", "Finance Agent", "Trend Agent"], color: "#E50914" },
      { id: "career", label: "Land a Dream Role", icon: "◎", agents: ["Career Agent", "Portfolio Agent", "Networking Agent"], color: "#10B981" },
      { id: "skill", label: "Master a High-Value Skill", icon: "◆", agents: ["Study Agent", "Research Agent", "Productivity Agent"], color: "#5865F2" },
      { id: "wealth", label: "Build Long-Term Wealth", icon: "◇", agents: ["Finance Agent", "Automation Agent", "Strategy Agent"], color: "#F59E0B" },
    ],
  },
  {
    id: "stage",
    question: "Where are you in your journey?",
    sub: "Your current position recalibrates the intelligence baseline across all 11 agents.",
    options: [
      { id: "student", label: "Student / Just Starting", icon: "◈", agents: ["Study Agent", "Research Agent"], color: "#A78BFA" },
      { id: "early", label: "Early Career (0–3 yrs)", icon: "◉", agents: ["Career Agent", "Networking Agent"], color: "#06B6D4" },
      { id: "mid", label: "Mid Career (3–8 yrs)", icon: "◎", agents: ["Strategy Agent", "Portfolio Agent"], color: "#EC4899" },
      { id: "pivot", label: "Career Transition", icon: "◆", agents: ["Trend Agent", "Research Agent"], color: "#F97316" },
    ],
  },
  {
    id: "priority",
    question: "Which AI capability matters most?",
    sub: "This prioritizes compute allocation across the Neural Intelligence Core.",
    options: [
      { id: "intel", label: "Career Intelligence", icon: "◈", agents: ["Career Agent", "Trend Agent", "Research Agent"], color: "#E50914" },
      { id: "learn", label: "Adaptive Learning", icon: "◎", agents: ["Study Agent", "Productivity Agent"], color: "#10B981" },
      { id: "finance", label: "Financial Strategy", icon: "◆", agents: ["Finance Agent", "Automation Agent"], color: "#F59E0B" },
      { id: "auto", label: "Workflow Automation", icon: "◇", agents: ["Automation Agent", "Strategy Agent"], color: "#5865F2" },
    ],
  },
];

const allAgents = [
  { name: "Study Agent", color: "#5865F2" },
  { name: "Research Agent", color: "#E50914" },
  { name: "Career Agent", color: "#10B981" },
  { name: "Productivity Agent", color: "#F59E0B" },
  { name: "Wellness Agent", color: "#8B5CF6" },
  { name: "Strategy Agent", color: "#06B6D4" },
  { name: "Finance Agent", color: "#34D399" },
  { name: "Automation Agent", color: "#F97316" },
  { name: "Networking Agent", color: "#EC4899" },
  { name: "Portfolio Agent", color: "#A78BFA" },
  { name: "Trend Agent", color: "#E50914" },
];

const calibrationLines = [
  "Initializing Neural Intelligence Core…",
  "Mapping ambition vectors to career lattice…",
  "Calibrating 11 autonomous agents…",
  "Allocating compute resources…",
  "Synthesizing personalized intelligence layer…",
  "Activating predictive intelligence matrix…",
  "Synchronizing future simulation engine…",
  "APEX OS is ready for you.",
];

type Selection = { ambition?: string; stage?: string; priority?: string };

export default function NeuralOnboarding({ onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Selection>({});
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [showCalibration, setShowCalibration] = useState(false);
  const [calibrationLine, setCalibrationLine] = useState(0);
  const [visibleAgents, setVisibleAgents] = useState<number>(0);
  const [done, setDone] = useState(false);

  const step = steps[currentStep];
  const hoveredOpt = step?.options.find((o) => o.id === hoveredOption);

  const selectOption = (optId: string) => {
    const opt = step.options.find((o) => o.id === optId);
    if (!opt) return;

    setSelections((prev) => ({ ...prev, [step.id]: optId }));
    setActiveAgents((prev) => [...new Set([...prev, ...opt.agents])]);

    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep((s) => s + 1);
        setHoveredOption(null);
      }, 500);
    } else {
      setTimeout(() => {
        setShowCalibration(true);
      }, 600);
    }
  };

  useEffect(() => {
    if (!showCalibration) return;
    let line = 0;
    const interval = setInterval(() => {
      line++;
      setCalibrationLine(line);
      if (line >= calibrationLines.length - 1) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [showCalibration]);

  useEffect(() => {
    if (!showCalibration) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleAgents(count);
      if (count >= allAgents.length) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [showCalibration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[800] flex items-center justify-center"
      style={{ background: "rgba(5,5,8,0.97)", backdropFilter: "blur(20px)" }}
    >
      {/* Ambient neural background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, #E50914, transparent)" }}
        />
        <motion.div
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 40% 50% at 30% 60%, #5865F2, transparent)" }}
        />
      </div>

      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)", backgroundSize: "100% 4px" }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col lg:flex-row gap-8 items-start">

        <AnimatePresence mode="wait">
          {!showCalibration ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-8">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-0.5 flex-1 rounded-full transition-all duration-500"
                    style={{ background: i <= currentStep ? "#E50914" : "#2A2A2E" }}
                  />
                ))}
                <span className="text-xs font-mono ml-2" style={{ color: "#7A7A7A" }}>
                  {currentStep + 1}/{steps.length}
                </span>
              </div>

              <div className="mb-2 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: "#E50914" }}>
                Neural Configuration · Step {currentStep + 1}
              </div>
              <h2
                className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {step.question}
              </h2>
              <p className="text-sm mb-8 max-w-lg" style={{ color: "#7A7A7A" }}>{step.sub}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {step.options.map((opt, i) => {
                  const isSelected = selections[step.id as keyof Selection] === opt.id;
                  const isHovered = hoveredOption === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => setHoveredOption(opt.id)}
                      onMouseLeave={() => setHoveredOption(null)}
                      onClick={() => selectOption(opt.id)}
                      className="relative text-left p-5 rounded-xl border transition-all duration-200 overflow-hidden group"
                      style={{
                        background: isSelected || isHovered ? opt.color + "12" : "#0B0B0F",
                        borderColor: isSelected || isHovered ? opt.color + "60" : "#2A2A2E",
                        boxShadow: isSelected || isHovered ? `0 0 20px ${opt.color}18` : "none",
                      }}
                      data-testid={`option-${opt.id}`}
                    >
                      {(isHovered || isSelected) && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                          style={{ background: `linear-gradient(90deg, ${opt.color}, transparent)` }}
                        />
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                          style={{ background: opt.color + "20", color: opt.color }}
                        >
                          {opt.icon}
                        </div>
                        <span className="font-bold text-white text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
                          {opt.label}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono flex flex-wrap gap-1">
                        {opt.agents.map((a) => (
                          <span key={a} className="px-1.5 py-0.5 rounded" style={{ color: opt.color, background: opt.color + "15" }}>
                            {a}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calibration"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="mb-6">
                <div className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "#E50914" }}>
                  Personalizing Neural Architecture
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  APEX OS is<br />
                  <span style={{ color: "#E50914" }}>calibrating for you</span>
                </h2>
              </div>

              <div className="space-y-1.5 mb-6 font-mono text-xs">
                {calibrationLines.slice(0, calibrationLine + 1).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                    style={{ color: i === calibrationLine ? "#fff" : "#7A7A7A" }}
                  >
                    <span style={{ color: i < calibrationLine ? "#10B981" : "#E50914" }}>
                      {i < calibrationLine ? "✓" : "›"}
                    </span>
                    {line}
                    {i === calibrationLine && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="inline-block w-1.5 h-3"
                        style={{ background: "#E50914" }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {done && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(229,9,20,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="px-8 py-4 rounded font-bold text-white text-base tracking-wide"
                  style={{ background: "#E50914", boxShadow: "0 0 30px rgba(229,9,20,0.4)" }}
                  data-testid="button-enter-apex"
                >
                  Enter APEX OS →
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agent grid — right panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-72 shrink-0"
        >
          <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#7A7A7A" }}>
            Neural Intelligence Core
          </div>
          <div className="grid grid-cols-1 gap-2">
            {allAgents.map((agent, i) => {
              const isActive = activeAgents.includes(agent.name);
              const isCalibrated = showCalibration && i < visibleAgents;
              return (
                <motion.div
                  key={agent.name}
                  animate={{
                    borderColor: isCalibrated ? agent.color + "70" : isActive ? agent.color + "50" : "#2A2A2E",
                    background: isCalibrated ? agent.color + "12" : isActive ? agent.color + "08" : "#0B0B0F",
                  }}
                  transition={{ duration: 0.3, delay: isCalibrated ? i * 0.05 : 0 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border"
                  data-testid={`onboarding-agent-${i}`}
                >
                  <motion.div
                    animate={{
                      scale: isCalibrated ? [1, 1.4, 1] : 1,
                      opacity: isActive || isCalibrated ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.4, delay: isCalibrated ? i * 0.05 : 0 }}
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: agent.color }}
                  />
                  <span
                    className="text-xs font-semibold transition-colors duration-300"
                    style={{ color: isActive || isCalibrated ? "#fff" : "#7A7A7A" }}
                  >
                    {agent.name}
                  </span>
                  {isCalibrated && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-auto text-[10px] font-mono"
                      style={{ color: agent.color }}
                    >
                      READY
                    </motion.span>
                  )}
                  {isActive && !isCalibrated && (
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="ml-auto text-[10px] font-mono"
                      style={{ color: agent.color }}
                    >
                      ASSIGNED
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Hovered option preview */}
          <AnimatePresence>
            {hoveredOpt && !showCalibration && (
              <motion.div
                key={hoveredOpt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 rounded-xl border p-4"
                style={{ background: hoveredOpt.color + "08", borderColor: hoveredOpt.color + "40" }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: hoveredOpt.color }}>
                  Agents activated:
                </div>
                <div className="text-xs" style={{ color: "#B3B3B3" }}>
                  {hoveredOpt.agents.join(", ")} will prioritize your profile across all intelligence layers.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Skip */}
      <button
        onClick={onClose}
        className="absolute bottom-6 right-6 text-xs tracking-widest uppercase opacity-30 hover:opacity-70 transition-opacity"
        style={{ color: "#B3B3B3" }}
        data-testid="button-skip-onboarding"
      >
        Skip →
      </button>
    </motion.div>
  );
}
