import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import CinematicIntro from "@/components/CinematicIntro";
import CursorGlow from "@/components/CursorGlow";
import Navigation from "@/components/Navigation";
import GuidedExperience from "@/components/GuidedExperience";
import GuidedTourBar from "@/components/GuidedTourBar";
import CinematicPrologue from "@/components/CinematicPrologue";
import HeroSection from "@/components/HeroSection";
import NeuralOnboarding from "@/components/NeuralOnboarding";
import ApexHUD from "@/components/ApexHUD";
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
import FinalSection from "@/components/FinalSection";

const queryClient = new QueryClient();

const isDebug = new URLSearchParams(window.location.search).has("debug");

function ApexOS() {
  const [introComplete, setIntroComplete] = useState(isDebug);
  const [gatewayComplete, setGatewayComplete] = useState(isDebug);
  const [guidedMode, setGuidedMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [onboardingProfile, setOnboardingProfile] = useState<{
    ambition?: string; stage?: string; priority?: string;
  }>({});

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (!gatewayComplete) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [gatewayComplete]);

  const handleBeginGuided = () => {
    setGatewayComplete(true);
    setGuidedMode(true);
    setTimeout(() => window.scrollTo({ top: 0 }), 50);
  };

  const handleExploreFree = () => {
    setGatewayComplete(true);
    setGuidedMode(false);
    setTimeout(() => window.scrollTo({ top: 0 }), 50);
  };

  const handleOnboardingClose = (profile?: { ambition?: string; stage?: string; priority?: string }) => {
    setShowOnboarding(false);
    if (profile) {
      setOnboardingProfile(profile);
      setOnboardingComplete(true);
    }
    setTimeout(() => {
      document.querySelector("#agents")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <CursorGlow />

      {/* Boot sequence */}
      {!isDebug && <CinematicIntro onComplete={() => setIntroComplete(true)} />}

      {/* Cinematic gateway — shown after boot, before main content */}
      <AnimatePresence>
        {!isDebug && introComplete && !gatewayComplete && (
          <GuidedExperience
            onBeginGuided={handleBeginGuided}
            onExploreFree={handleExploreFree}
          />
        )}
      </AnimatePresence>

      {/* Neural onboarding overlay */}
      <AnimatePresence>
        {showOnboarding && (
          <NeuralOnboarding
            onClose={(profile) => handleOnboardingClose(profile)}
          />
        )}
      </AnimatePresence>

      {/* Main OS content */}
      {gatewayComplete && (
        <div style={{ background: "#0B0B0F" }}>
          {/* Global CRT scan-line grain */}
          <div
            className="fixed inset-0 pointer-events-none z-[50] opacity-[0.018]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
              backgroundSize: "100% 4px",
            }}
          />

          <Navigation />

          <CinematicPrologue />
          <HeroSection onLaunch={() => setShowOnboarding(true)} />
          <AgentEcosystem />
          <AgentDebate />
          <AIThinkingSpace />
          <StrategicDashboard />
          <AITerminal />
          <NeuralUniverse />
          <CareerGalaxy />
          <CareerCards />
          <StudyCommandCenter />
          <WorkflowUniverse />
          <FutureSelf />
          <FinalSection />

          {/* Persistent APEX HUD */}
          <ApexHUD
            onboardingComplete={onboardingComplete}
            onboardingProfile={onboardingProfile}
          />

          {/* Guided tour bar */}
          <AnimatePresence>
            {guidedMode && (
              <GuidedTourBar onExit={() => setGuidedMode(false)} />
            )}
          </AnimatePresence>
        </div>
      )}
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
