import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import CinematicIntro from "@/components/CinematicIntro";
import CursorGlow from "@/components/CursorGlow";
import Navigation from "@/components/Navigation";
import CinematicPrologue from "@/components/CinematicPrologue";
import HeroSection from "@/components/HeroSection";
import NeuralOnboarding from "@/components/NeuralOnboarding";
import AgentEcosystem from "@/components/AgentEcosystem";
import AgentDebate from "@/components/AgentDebate";
import AIThinkingSpace from "@/components/AIThinkingSpace";
import NeuralUniverse from "@/components/NeuralUniverse";
import CareerGalaxy from "@/components/CareerGalaxy";
import CareerCards from "@/components/CareerCards";
import StudyCommandCenter from "@/components/StudyCommandCenter";
import WorkflowUniverse from "@/components/WorkflowUniverse";
import FutureSelf from "@/components/FutureSelf";
import FinalSection from "@/components/FinalSection";

const queryClient = new QueryClient();

function ApexOS() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (!introComplete) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [introComplete]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    setTimeout(() => {
      document.querySelector("#agents")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <CursorGlow />
      <CinematicIntro onComplete={() => setIntroComplete(true)} />

      <AnimatePresence>
        {showOnboarding && <NeuralOnboarding onClose={handleOnboardingClose} />}
      </AnimatePresence>

      {introComplete && (
        <div style={{ background: "#0B0B0F" }}>
          {/* Global scan-line grain overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-[50] opacity-[0.018]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
              backgroundSize: "100% 4px",
            }}
          />
          <Navigation />
          <CinematicPrologue />
          <HeroSection onLaunch={() => setShowOnboarding(true)} />
          <AgentEcosystem />
          <AgentDebate />
          <AIThinkingSpace />
          <NeuralUniverse />
          <CareerGalaxy />
          <CareerCards />
          <StudyCommandCenter />
          <WorkflowUniverse />
          <FutureSelf />
          <FinalSection />
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
