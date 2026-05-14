import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const psychologists = [
  {
    name: "Dr. Aria Menon",
    title: "Clinical Psychologist",
    specializations: ["Anxiety", "OCD", "Burnout"],
    rating: 4.9,
    sessions: 1240,
    price: "$40/session",
    available: true,
    color: "#8B5CF6",
    initials: "AM",
    bio: "8 years helping professionals navigate high-pressure environments. Specializes in cognitive-behavioral therapy and mindfulness-based interventions.",
    modes: ["Video", "Voice", "Chat"],
  },
  {
    name: "Rishi Kapoor",
    title: "Counseling Intern",
    specializations: ["ADHD", "Motivation", "Loneliness"],
    rating: 4.7,
    sessions: 320,
    price: "$15/session",
    available: true,
    color: "#5865F2",
    initials: "RK",
    bio: "Masters-level intern supervised by licensed psychologists. Passionate about helping students and young professionals find direction and emotional clarity.",
    modes: ["Chat", "Voice"],
  },
  {
    name: "Dr. Priya Nair",
    title: "Behavioral Therapist",
    specializations: ["Addiction", "Stress", "Sleep"],
    rating: 4.8,
    sessions: 890,
    price: "$55/session",
    available: false,
    color: "#EC4899",
    initials: "PN",
    bio: "Specializes in addiction recovery and behavioral restructuring. Known for compassionate, non-judgmental approach with evidence-based techniques.",
    modes: ["Video", "Voice"],
  },
  {
    name: "Marcus Osei",
    title: "Emotional Wellness Coach",
    specializations: ["Emotional Pressure", "Burnout", "Motivation"],
    rating: 4.6,
    sessions: 540,
    price: "$25/session",
    available: true,
    color: "#10B981",
    initials: "MO",
    bio: "Former athlete turned wellness coach. Brings a performance mindset to emotional health. Expert at rebuilding momentum after personal setbacks.",
    modes: ["Video", "Chat"],
  },
  {
    name: "Dr. Leila Hassan",
    title: "Trauma & Anxiety Specialist",
    specializations: ["Anxiety", "Emotional Isolation", "Stress"],
    rating: 4.9,
    sessions: 2100,
    price: "$70/session",
    available: true,
    color: "#F59E0B",
    initials: "LH",
    bio: "15 years in trauma-informed care. Expert in EMDR and somatic approaches. Creates profoundly safe environments for deep emotional work.",
    modes: ["Video", "Voice", "Chat"],
  },
  {
    name: "Ananya Sharma",
    title: "Psychology Intern",
    specializations: ["ADHD", "OCD", "Sleep"],
    rating: 4.5,
    sessions: 180,
    price: "$12/session",
    available: true,
    color: "#06B6D4",
    initials: "AS",
    bio: "Final-year psychology student with supervised practice. Brings fresh evidence-based techniques and a genuine passion for supporting young adults.",
    modes: ["Chat"],
  },
];

interface PsychCard {
  p: typeof psychologists[number];
}

function PsychCard({ p }: PsychCard) {
  const [expanded, setExpanded] = useState(false);
  const [booked, setBooked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border overflow-hidden cursor-pointer"
      style={{
        background: "#0A0A12",
        borderColor: expanded ? p.color + "40" : "#2A2A2E",
        boxShadow: expanded ? `0 0 30px ${p.color}10` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      {/* Top accent bar */}
      <div className="h-0.5" style={{ background: p.available ? `linear-gradient(90deg, ${p.color}, transparent)` : "transparent" }} />

      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-white"
              style={{ background: `linear-gradient(135deg, ${p.color}80, ${p.color}40)`, border: `1px solid ${p.color}40` }}
            >
              {p.initials}
            </div>
            {p.available && (
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                style={{ background: "#10B981", borderColor: "#0A0A12" }}
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-black text-white text-sm truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
              {p.name}
            </div>
            <div className="text-[10px] mb-2" style={{ color: p.color }}>{p.title}</div>
            <div className="flex flex-wrap gap-1">
              {p.specializations.map((s) => (
                <span
                  key={s}
                  className="text-[9px] px-2 py-0.5 rounded-full"
                  style={{ background: p.color + "15", color: p.color, border: `1px solid ${p.color}30` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs font-black" style={{ color: "#F59E0B" }}>★ {p.rating}</div>
              <div className="text-[9px]" style={{ color: "#7A7A7A" }}>{p.sessions.toLocaleString()} sessions</div>
            </div>
            <div>
              <div className="text-xs font-black" style={{ color: "#fff" }}>{p.price}</div>
              <div className="text-[9px]" style={{ color: "#7A7A7A" }}>
                {p.available ? "Available now" : "Next: Tomorrow"}
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            {p.modes.map((mode) => (
              <span
                key={mode}
                className="text-[9px] px-1.5 py-0.5 rounded border font-semibold"
                style={{ color: "#7A7A7A", borderColor: "#2A2A2E" }}
              >
                {mode}
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "#2A2A2E" }}>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#B3B3B3" }}>{p.bio}</p>

                <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
                  <div className="text-[10px] font-bold mb-2" style={{ color: "#8B5CF6" }}>AI Context Sharing</div>
                  <div className="text-[10px]" style={{ color: "#7A7A7A" }}>
                    With your consent, your psychologist will receive your SoulSync emotional summaries for more personalized, faster sessions.
                  </div>
                </div>

                {booked ? (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="w-full py-3 rounded-xl text-sm font-bold text-center"
                    style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }}
                  >
                    Session Requested
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${p.color}30` }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => { e.stopPropagation(); setBooked(true); }}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}99)` }}
                  >
                    Book a Session
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function SoulSyncPsychologists() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <div className="font-black text-white text-2xl mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Verified Psychologists
          </div>
          <div className="text-sm" style={{ color: "#7A7A7A" }}>
            Real professionals. Verified credentials. Affordable sessions. Click any card to book.
          </div>
        </div>
        <div
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold"
          style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#10B981" }}
          />
          4 available now
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {psychologists.map((p) => (
          <PsychCard key={p.name} p={p} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 rounded-2xl border p-6 flex flex-col md:flex-row items-center gap-6"
        style={{ background: "rgba(139,92,246,0.06)", borderColor: "rgba(139,92,246,0.2)" }}
      >
        <div className="flex-1">
          <div className="font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Are you a psychologist or intern?
          </div>
          <div className="text-sm" style={{ color: "#7A7A7A" }}>
            Join SoulSync as a verified professional. Get AI-powered patient context, scheduling tools, and access to users who need you most.
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(139,92,246,0.3)" }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #5865F2)" }}
        >
          Apply to Join
        </motion.button>
      </motion.div>
    </div>
  );
}
