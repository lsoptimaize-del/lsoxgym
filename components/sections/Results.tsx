"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VIDEO_TESTIMONIALS = [
  {
    src: "/gym/testimonial-2 (1).mp4",
    name: "CULT FIT OWNER",
    role: "Founder, Cult Fit",
  },
  {
    src: "/gym/testimonial-2 (2).mp4",
    name: "CLOUTFIT OWNER",
    role: "Founder, Cloutfit",
  },
];

const TEXT_TESTIMONIALS = [
  {
    quote:
      "We went from 12 trial bookings a month to 47 in 6 weeks. The AI follow up alone paid for the entire stack.",
    name: "DEREK WILLIAMS",
    gym: "Aurum Ultra Luxury",
  },
  {
    quote:
      "Churn dropped 22% in the first quarter. Members feel looked after without my staff doing anything extra.",
    name: "PRIYA NAIR",
    gym: "Woohoo Health Club",
  },
  {
    quote:
      "Our Google ranking went from page 3 to top 3 in our city in 90 days. Walk-ins doubled.",
    name: "CARLOS REYES",
    gym: "Gold's Gym",
  },
  {
    quote:
      "The website converts at 18%. Our old one was at 2%. I wish I had done this two years ago.",
    name: "AMANDA FOSTER",
    gym: "FitZone Premier",
  },
  {
    quote:
      "Finally one system for everything. No more switching between 4 apps just to check who paid.",
    name: "JAMES OKAFOR",
    gym: "Titan Strength Collective",
  },
  {
    quote:
      "The trainer app keeps coaches accountable and members obsessed. Retention is at an all time high.",
    name: "LISA PARK",
    gym: "PowerHouse Athletic",
  },
];

const ALL_TICKER_CARDS = [...TEXT_TESTIMONIALS, ...TEXT_TESTIMONIALS];

// ---------------------------------------------------------------------------
// Text Carousel
// ---------------------------------------------------------------------------

function TextCarousel({ inView }: { inView: boolean }) {
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();
  const innerRef = useRef<HTMLDivElement>(null);
  const [halfHeight, setHalfHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const kids = el.children;
    if (kids.length < 2) return;
    const half = Math.floor(kids.length / 2);
    const firstTop = (kids[0] as HTMLElement).getBoundingClientRect().top;
    const halfTop = (kids[half] as HTMLElement).getBoundingClientRect().top;
    setHalfHeight(halfTop - firstTop);
  }, []);

  const startAnimation = useCallback(() => {
    if (!halfHeight) return;
    controls.start({
      y: [0, -halfHeight],
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, halfHeight]);

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;
    startAnimation();
  }, [inView, prefersReducedMotion, startAnimation]);

  return (
    <div className="relative h-full overflow-hidden">
      {/* Top fade */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }}
      />

      <motion.div
        ref={innerRef}
        animate={controls}
        className="flex flex-col gap-3"
        onHoverStart={() => !prefersReducedMotion && controls.stop()}
        onHoverEnd={() => !prefersReducedMotion && startAnimation()}
      >
        {ALL_TICKER_CARDS.map((t, i) => (
          <div
            key={i}
            className="bg-[#111111] border border-[#ffffff06] px-4 py-3 flex-shrink-0"
          >
            <p className="font-sans text-[13px] leading-[1.5] text-[#D0D0D0] mb-2">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex justify-between items-center gap-2">
              <span className="font-mono text-xs text-accent">{t.name}</span>
              <span className="font-sans text-xs text-[#A0A0A0]">{t.gym}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    amount: 0.2,
  });

  const [activePlayingIndex, setActivePlayingIndex] = useState<null | 0 | 1>(null);
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);

  function handleVideoClick(index: 0 | 1) {
    const vid = (index === 0 ? videoRef0 : videoRef1).current;
    const other = (index === 0 ? videoRef1 : videoRef0).current;
    if (!vid) return;

    if (activePlayingIndex === index) {
      vid.pause();
      vid.loop = false;
      setActivePlayingIndex(null);
    } else {
      if (other) {
        other.pause();
        other.currentTime = 0;
        other.loop = false;
      }
      vid.loop = true;
      vid.play().catch(() => {});
      setActivePlayingIndex(index);
    }
  }

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] border-b border-white/10 flex flex-col gap-6 px-5 py-10 md:grid md:grid-rows-[auto_1fr] md:gap-8 md:px-[56px] md:py-[48px] md:h-screen md:overflow-hidden"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Title block                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: "easeOut" }
          }
          className="font-mono text-xs tracking-[0.3em] uppercase mb-3 text-accent"
        >
          PROOF, NOT PROMISES
        </motion.p>

        <motion.h2
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: "easeOut", delay: 0.1 }
          }
          className="font-display font-extrabold italic uppercase leading-[0.95] text-white"
          style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}
        >
          REAL GYMS.{" "}
          <span className="text-accent">REAL NUMBERS.</span>
        </motion.h2>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Content grid                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.3fr] md:gap-8 md:min-h-0"
      >
        {/* LEFT COLUMN */}
        <div className="md:flex md:flex-col md:min-h-0">
          {/* Testimonial video cards */}
          <div
            className="flex gap-3 flex-shrink-0 h-[40vh] md:h-[45vh] md:gap-4"
            style={{ maxHeight: "50vh" }}
          >
            {VIDEO_TESTIMONIALS.map((v, i) => {
              const isPlaying = activePlayingIndex === i;
              return (
                <motion.div
                  key={v.src}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.5, ease: "easeOut", delay: i * 0.15 }
                  }
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : { scale: 1.015, transition: { duration: 0.2 } }
                  }
                  className="relative overflow-hidden bg-[#111111] border border-[#ffffff08] cursor-pointer flex-1 min-w-0"
                  onClick={() => handleVideoClick(i as 0 | 1)}
                >
                  <video
                    ref={i === 0 ? videoRef0 : videoRef1}
                    src={v.src}
                    playsInline
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay fades when playing */}
                  <div
                    aria-hidden
                    className={`absolute inset-0 z-10 transition-colors duration-300 ${
                      isPlaying ? "bg-black/10" : "bg-black/35"
                    }`}
                  />

                  {/* Play button */}
                  <div
                    className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 ${
                      isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                  >
                    <div
                      className="flex items-center justify-center rounded-full backdrop-blur-sm"
                      style={{
                        width: 56,
                        height: 56,
                        backgroundColor: "rgba(232,92,26,0.9)",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="white"
                        aria-hidden="true"
                      >
                        <path d="M5 2.5l11 6.5-11 6.5V2.5z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <p className="font-mono text-sm text-white">{v.name}</p>
                    <p className="font-sans text-xs text-[#A0A0A0] mt-1">{v.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Text carousel */}
          <div className="mt-4 h-[240px] md:mt-6 md:h-auto md:flex-1 md:min-h-0 overflow-hidden">
            <TextCarousel inView={inView} />
          </div>
        </div>

        {/* RIGHT COLUMN — Work reel */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }
          }
          className="relative flex items-center justify-center overflow-hidden bg-[#111111] border border-[#E85C1A]/20 h-[50vh] md:h-full md:min-h-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            src="/gym/comp.mp4"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
          />

          {/* "OUR WORK" badge */}
          <div className="absolute top-6 left-6 z-20">
            <div
              className="border border-[#E85C1A]/30 px-3 py-2 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(10,10,10,0.8)" }}
            >
              <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
                OUR WORK
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
