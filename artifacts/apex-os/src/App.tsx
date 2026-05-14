import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import CinematicIntro from "@/components/CinematicIntro";
import CursorGlow from "@/components/CursorGlow";
import NeuralOnboarding from "@/components/NeuralOnboarding";
import ApexHUD from "@/components/ApexHUD";

import AuthPage from "@/components/AuthPage";
import MainHub, { type SectionId } from "@/components/MainHub";
import HubNav from "@/components/HubNav";
import ProfilePage from "@/components/ProfilePage";
import SubscriptionPage from "@/components/SubscriptionPage";
import FocusSprintPage from "@/components/FocusSprintPage";

import SoulSync from "@/components/SoulSync";
import AgentEcosystem from "@/components/AgentEcosystem";
import AgentDebate from "@/components/AgentDebate";
import AIThinkingSpace from "@/components/AIThinkingSpace";
import AITerminal from "@/components/AITerminal";
import StrategicDashboard from "@/components/StrategicDashboard";
import NeuralUniverse from "@/components/NeuralUniverse";
import CareerGalaxy from "@/components/CareerGalaxy";
import CareerCards from "@/components/CareerCards";
import StudyCommandCenter from "@/components/StudyCommandCenter";
import WorkflowUniverse from "@/components/WorkflowUniverse";
import FutureSelf from "@/components/FutureSelf";
import SoulSyncAmbient from "@/components/SoulSyncAmbient";

const queryClient = new QueryClient();
const isDebug = new URLSearchParams(window.location.search).has("debug");

interface User { name: string; email: string; plan: string; }

function SectionContent({
  section,
  user,
  onSection,
}: {
  section: SectionId;
  user: User;
  onSection: (s: SectionId) => void;
}) {
  switch (section) {
    case "soulsync":    return <SoulSync defaultTab="Companion" />;
    case "recovery":    return <SoulSync defaultTab="Recovery" />;
    case "psychologists": return <SoulSync defaultTab="Psychologists" />;
    case "breathing":   return <SoulSync defaultTab="Recovery" />;
    case "ambient":     return <SoulSync defaultTab="Companion" />;
    case "agents":      return <AgentEcosystem />;
    case "research":    return <AgentEcosystem />;
    case "network-engine": return <AgentEcosystem />;
    case "decision-sim": return <AgentEcosystem />;
    case "finance":     return <AgentEcosystem />;
    case "debate":      return <AgentDebate />;
    case "neural-arch": return <AIThinkingSpace />;
    case "dashboard":   return <StrategicDashboard />;
    case "terminal":    return <AITerminal />;
    case "universe":    return <NeuralUniverse />;
    case "career-galaxy": return <CareerGalaxy />;
    case "career-cards":  return <CareerCards />;
    case "future-self":   return <FutureSelf />;
    case "study":         return <StudyCommandCenter />;
    case "workflows":     return <WorkflowUniverse />;
    case "automation-builder": return <WorkflowUniverse />;
    case "focus-sprint":  return <FocusSprintPage />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0B0B0F" }}>
          <div className="text-center">
            <div className="text-4xl mb-4" style={{ color: "#2A2A2E" }}>◎</div>
            <div className="text-sm font-semibold text-white mb-2">Section coming soon</div>
            <button onClick={() => onSection("hub" as SectionId)} className="text-xs mt-4 px-4 py-2 rounded-lg border" style={{ color: "#E50914", borderColor: "rgba(229,9,20,0.3)" }}>
              Back to Hub
            </button>
          </div>
        </div>
      );
  }
}

function HubTopBar({ user, onSection }: { user: User; onSection: (s: SectionId) => void }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] px-5 py-3 flex items-center justify-between border-b"
      style={{ background: "rgba(11,11,15,0.92)", borderColor: "#2A2A2E", backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ background: "#E50914" }}>
            <span className="text-white font-black text-xs" style={{ fontFamily: "'Syne', sans-serif" }}>A</span>
          </div>
          <div className="absolute inset-0 blur-md opacity-60" style={{ background: "#E50914" }} />
        </div>
        <span className="text-white font-black tracking-widest text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
          APEX<span style={{ color: "#E50914" }}>OS</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-2 text-xs font-mono" style={{ color: "#7A7A7A" }}>
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full inline-block mr-1" style={{ background: "#10B981" }} />
        COMMAND CENTER · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onSection("subscription")}
          className="hidden md:flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border font-semibold transition-all hover:opacity-80"
          style={{ color: user.plan === "free" ? "#F59E0B" : "#10B981", borderColor: (user.plan === "free" ? "#F59E0B" : "#10B981") + "30", background: (user.plan === "free" ? "#F59E0B" : "#10B981") + "10" }}
        >
          {user.plan.toUpperCase()}
          {user.plan === "free" && " · Upgrade"}
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSection("profile")}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
          style={{ background: "linear-gradient(135deg, #E50914, #5865F2)" }}
        >
          {(user.name[0] ?? "U").toUpperCase()}
        </motion.button>
      </div>
    </div>
  );
}

function ApexOS() {
  const [user, setUser] = useState<User | null>(null);
  const [introComplete, setIntroComplete] = useState(isDebug);
  const [currentSection, setCurrentSection] = useState<SectionId | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [onboardingProfile, setOnboardingProfile] = useState<{ ambition?: string; stage?: string; priority?: string }>({});

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (!introComplete || !user) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [introComplete, user]);

  const handleAuth = (u: User) => setUser(u);
  const handleLogout = () => { setUser(null); setCurrentSection(null); };
  const handleUpdateUser = (u: User) => setUser(u);
  const handleUpgrade = (plan: string) => setUser((prev) => prev ? { ...prev, plan } : prev);

  const handleSection = (s: SectionId) => {
    if (s === "onboarding") { setShowOnboarding(true); return; }
    setCurrentSection(s);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBack = () => {
    setCurrentSection(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Not logged in
  if (!user) return <AuthPage onAuth={handleAuth} />;

  // Boot intro (first time)
  if (!introComplete) {
    return (
      <>
        <CursorGlow />
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      </>
    );
  }

  // Section view
  if (currentSection) {
    const isProfile = currentSection === "profile";
    const isSubscription = currentSection === "subscription";

    return (
      <>
        <CursorGlow />
        <SoulSyncAmbient />
        <HubNav
          section={currentSection}
          onBack={handleBack}
          user={user}
          onProfile={() => handleSection("profile")}
          onSubscription={() => handleSection("subscription")}
        />

        <AnimatePresence>
          {showOnboarding && (
            <NeuralOnboarding
              onClose={(profile) => {
                setShowOnboarding(false);
                if (profile) { setOnboardingProfile(profile); setOnboardingComplete(true); }
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="pt-14"
          style={{ background: "#0B0B0F", minHeight: "100vh" }}
        >
          {isProfile ? (
            <ProfilePage user={user} onUpdate={handleUpdateUser} onLogout={handleLogout} />
          ) : isSubscription ? (
            <SubscriptionPage user={user} onUpgrade={handleUpgrade} />
          ) : (
            <SectionContent section={currentSection} user={user} onSection={handleSection} />
          )}
        </motion.div>

        <ApexHUD onboardingComplete={onboardingComplete} onboardingProfile={onboardingProfile} />
      </>
    );
  }

  // Hub view (main dashboard)
  return (
    <>
      <CursorGlow />
      <SoulSyncAmbient />

      <AnimatePresence>
        {showOnboarding && (
          <NeuralOnboarding
            onClose={(profile) => {
              setShowOnboarding(false);
              if (profile) { setOnboardingProfile(profile); setOnboardingComplete(true); }
            }}
          />
        )}
      </AnimatePresence>

      {/* Fixed CRT grain */}
      <div
        className="fixed inset-0 pointer-events-none z-[50] opacity-[0.018]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)", backgroundSize: "100% 4px" }}
      />

      <HubTopBar user={user} onSection={handleSection} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-14"
        style={{ background: "#0B0B0F", minHeight: "100vh" }}
      >
        <MainHub onSection={handleSection} user={user} />
      </motion.div>

      <ApexHUD onboardingComplete={onboardingComplete} onboardingProfile={onboardingProfile} />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApexOS />
    </QueryClientProvider>
  );
}
