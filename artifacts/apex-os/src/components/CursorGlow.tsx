import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const animate = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${smooth.current.x - 200}px, ${smooth.current.y - 200}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998]"
        style={{
          background: "#E50914",
          boxShadow: "0 0 8px 2px rgba(229,9,20,0.8)",
          willChange: "transform",
        }}
      />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9990]"
        style={{
          background: "radial-gradient(circle, rgba(229,9,20,0.04) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
