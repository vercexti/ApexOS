import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lenis from "lenis";
import CinematicIntro from "@/components/CinematicIntro";
import CursorGlow from "@/components/CursorGlow";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AgentEcosystem from "@/components/AgentEcosystem";
import AIThinkingSpace from "@/components/AIThinkingSpace";
import CareerGalaxy from "@/components/CareerGalaxy";
import CareerCards from "@/components/CareerCards";
import StudyCommandCenter from "@/components/StudyCommandCenter";
import WorkflowUniverse from "@/components/WorkflowUniverse";
import FutureSelf from "@/components/FutureSelf";
import FinalSection from "@/components/FinalSection";

const queryClient = new QueryClient();

function ApexOS() {
  const [introComplete, setIntroComplete] = useState(false);

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

  return (
    <>
      <CursorGlow />
      <CinematicIntro onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <div style={{ background: "#0B0B0F" }}>
          <Navigation />
          <HeroSection />
          <AgentEcosystem />
          <AIThinkingSpace />
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
