import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
  { name: "Deep Focus", desc: "40Hz binaural · neural clarity", duration: "∞", color: "#8B5CF6" },
  { name: "Calm Rain", desc: "Ambient rainfall · stress relief", duration: "∞", color: "#5865F2" },
  { name: "Ocean Drift", desc: "Coastal waves · grounding", duration: "∞", color: "#06B6D4" },
  { name: "Sleep Tide", desc: "Delta waves · 0.5–4Hz", duration: "∞", color: "#4F46E5" },
  { name: "Forest Breath", desc: "Nature ambience · presence", duration: "∞", color: "#10B981" },
  { name: "Void State", desc: "Deep silence with texture", duration: "∞", color: "#7C3AED" },
];

export default function SoulSyncAmbient() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(70);

  const currentTrack = playing !== null ? tracks[playing] : null;

  return (
    <>
      {/* Floating player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-6 z-[200]"
      >
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-full mb-3 left-0 rounded-2xl border overflow-hidden w-72"
              style={{ background: "#0A0A14", borderColor: "rgba(139,92,246,0.3)", boxShadow: "0 0 40px rgba(139,92,246,0.15)" }}
            >
              <div className="p-4 border-b" style={{ borderColor: "#1C1C2E" }}>
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#8B5CF6" }}>
                  Ambient Soundscapes
                </div>
                <div className="text-[10px]" style={{ color: "#7A7A7A" }}>Emotional audio for focus, calm, and sleep</div>
              </div>

              <div className="p-2">
                {tracks.map((track, i) => (
                  <motion.button
                    key={track.name}
                    whileHover={{ x: 2 }}
                    onClick={() => setPlaying(playing === i ? null : i)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      background: playing === i ? track.color + "15" : "transparent",
                    }}
                  >
                    <div className="relative shrink-0">
                      {playing === i ? (
                        <motion.div className="flex gap-0.5 items-end h-4">
                          {[1, 2, 3].map((b) => (
                            <motion.div
                              key={b}
                              animate={{ height: [4, 12, 6, 14, 4][b % 5] }}
                              transition={{ duration: 0.5 + b * 0.1, repeat: Infinity, repeatType: "reverse" }}
                              className="w-1 rounded-full"
                              style={{ background: track.color }}
                            />
                          ))}
                        </motion.div>
                      ) : (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full" style={{ background: track.color + "40", border: `1px solid ${track.color}60` }} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate" style={{ color: playing === i ? track.color : "#B3B3B3" }}>
                        {track.name}
                      </div>
                      <div className="text-[9px] truncate" style={{ color: "#7A7A7A" }}>{track.desc}</div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Volume */}
              <div className="px-4 py-3 border-t" style={{ borderColor: "#1C1C2E" }}>
                <div className="flex items-center gap-3">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 4H3L6 1.5V10.5L3 8H1V4Z" fill="#7A7A7A" />
                    <path d="M8 3C9.1 4 9.7 5 9.7 6C9.7 7 9.1 8 8 9" stroke="#7A7A7A" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#8B5CF6" }}
                  />
                  <span className="text-[10px] w-6 text-right" style={{ color: "#7A7A7A" }}>{volume}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pill button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full border"
          style={{
            background: expanded ? "rgba(139,92,246,0.15)" : "rgba(10,10,20,0.9)",
            borderColor: expanded ? "rgba(139,92,246,0.5)" : "rgba(139,92,246,0.25)",
            backdropFilter: "blur(20px)",
            boxShadow: currentTrack ? `0 0 20px ${currentTrack.color}20` : "none",
          }}
        >
          {currentTrack ? (
            <>
              <motion.div className="flex gap-0.5 items-end h-3.5">
                {[1, 2, 3].map((b) => (
                  <motion.div
                    key={b}
                    animate={{ height: [3, 10, 5, 12, 3][b % 5] }}
                    transition={{ duration: 0.5 + b * 0.1, repeat: Infinity, repeatType: "reverse" }}
                    className="w-0.5 rounded-full"
                    style={{ background: currentTrack.color }}
                  />
                ))}
              </motion.div>
              <span className="text-xs font-semibold" style={{ color: currentTrack.color }}>
                {currentTrack.name}
              </span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 4H3L6 1.5V10.5L3 8H1V4Z" fill="#8B5CF6" />
                <path d="M8 3C9.1 4 9.7 5 9.7 6C9.7 7 9.1 8 8 9" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M9.5 1.5C11.2 3 12 4.5 12 6C12 7.5 11.2 9 9.5 10.5" stroke="#8B5CF680" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: "#8B5CF6" }}>Ambient</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </>
  );
}
