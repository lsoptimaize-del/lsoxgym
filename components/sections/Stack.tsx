"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";

type Pillar = {
  number: string;
  name: string;
  does: string;
  killsOff: string;
  image: string;
  overlay: string;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    name: "CONVERSION WEBSITE",
    does: "Turns every visitor into a booked trial in under 5 seconds. Built to convert, not to impress your designer friends.",
    killsOff:
      "Your outdated site that bounces 80% of traffic and embarrasses you every time you share the link.",
    image: "/stack-01.jpeg",
    overlay: "BUILT TO CONVERT. NOT TO SIT THERE.",
  },
  {
    number: "02",
    name: "AI LEAD CRM",
    does: "Follows up with every single lead in 60 seconds, 24/7, across WhatsApp, SMS, and email. Never misses. Never sleeps.",
    killsOff:
      "Your front desk playing phone tag with leads who already joined the gym across the street.",
    image: "/stack-02.jpeg",
    overlay: "60 SECONDS. EVERY LEAD. EVERY TIME.",
  },
  {
    number: "03",
    name: "MEMBER + TRAINER APP",
    does: "Retention built into every session. Members track progress, trainers manage clients, admins see everything.",
    killsOff:
      "WhatsApp groups, paper schedules, and members ghosting because nobody checked in on them.",
    image: "/stack-03.jpeg",
    overlay: "YOUR GYM IN THEIR POCKET. EVERY DAY.",
  },
  {
    number: "04",
    name: "OPS ERP",
    does: "Check-ins, billing, staff scheduling, and reporting, all automated and running in one dashboard.",
    killsOff:
      "Three different tools, two spreadsheets, and a sticky note on your monitor that says 'fix billing'.",
    image: "/stack-04.jpeg",
    overlay: "THE BACK OFFICE RUNS ITSELF.",
  },
  {
    number: "05",
    name: "SEO, GEO + ADS",
    does: "Dominates local search, owns your Google Map Pack, and runs paid campaigns that actually return money.",
    killsOff:
      "The agency charging you $3k/month to post 3 reels and send a PDF report nobody reads.",
    image: "/stack-05.jpeg",
    overlay: "OWN YOUR CITY. ONLINE AND OFF.",
  },
];

function PillarTextContent({ pillar }: { pillar: Pillar }) {
  return (
    <>
      <p className="mb-4 font-mono text-xs tracking-widest text-accent">
        {pillar.number}
      </p>
      <h3 className="mb-6 font-display text-[clamp(52px,5vw,80px)] italic font-extrabold uppercase leading-[0.9] text-foreground">
        {pillar.name}
      </h3>
      <p className="mb-8 max-w-sm font-sans text-[17px] leading-[1.7] text-muted">
        {pillar.does}
      </p>
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          KILLS OFF
        </p>
        <p className="max-w-xs font-sans text-[15px] leading-[1.5] text-[#ffffff60] line-through decoration-2 decoration-accent/60">
          {pillar.killsOff}
        </p>
      </div>
    </>
  );
}

export default function Stack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    // Percentage form, not "start start"/"end end": that keyword pair
    // numerically collides with framer-motion's internal `All` scroll-offset
    // preset, which reroutes tracking onto the native CSS view-timeline's
    // "contain" range instead of the plain 0->1 progress this relies on.
    offset: ["0% 0%", "100% 100%"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(4, Math.max(0, Math.floor(latest * 5)));
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const pillar = PILLARS[activeIndex];

  const textEnter = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const, delay: 0.3 } };
  const textExit = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -30, transition: { duration: 0.35, ease: "easeIn" as const } };
  const textInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 };

  const mediaEnter = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.35 } };
  const mediaExit = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 1.04, transition: { duration: 0.4, ease: "easeIn" as const } };
  const mediaInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 };

  return (
    <section id="stack" className="relative w-full bg-background">
      {/* Desktop: scroll-pinned sticky experience */}
      <div className="hidden md:block">
        <div ref={wrapperRef} className="relative h-[500vh]">
          <div className="sticky top-0 flex h-screen w-full overflow-hidden">
            {/* Left half */}
            <div className="relative flex h-full w-1/2 flex-col bg-background px-16 py-20">
              <div>
                <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  THE AI STACK
                </p>
                <div className="h-px w-full bg-[#ffffff10]">
                  <motion.div
                    className="h-px bg-accent"
                    animate={{ width: `${(activeIndex + 1) * 20}%` }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.6, ease: "easeInOut" }
                    }
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={textInitial}
                    animate={textEnter}
                    exit={textExit}
                  >
                    <PillarTextContent pillar={pillar} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="absolute bottom-12 left-16 font-mono text-sm text-muted">
                <span className="text-accent">{activeIndex + 1}</span> / 5
              </p>
            </div>

            {/* Right half */}
            <div className="relative h-full w-1/2 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={pillar.image}
                  alt=""
                  initial={mediaInitial}
                  animate={mediaEnter}
                  exit={mediaExit}
                  className="absolute inset-0 z-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div aria-hidden className="absolute inset-0 z-10 bg-black/40" />

              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={mediaInitial}
                  animate={mediaEnter}
                  exit={mediaExit}
                  className="absolute bottom-12 left-10 right-10 z-20 font-display text-[clamp(40px,4vw,64px)] italic font-extrabold uppercase leading-[0.9] text-white"
                  style={{ textShadow: "0 4px 32px rgba(0,0,0,0.8)" }}
                >
                  {pillar.overlay}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked blocks */}
      <div className="md:hidden">
        {PILLARS.map((p, i) => (
          <div
            key={p.number}
            className={i > 0 ? "border-t border-accent/20" : undefined}
          >
            <motion.div
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }
              }
              whileInView={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.3 }
                  : { duration: 0.5, ease: "easeOut" }
              }
              className="relative h-[40vh] w-full overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-black/40" />
              <p
                className="absolute bottom-6 left-6 right-6 font-display text-[clamp(40px,4vw,64px)] italic font-extrabold uppercase leading-[0.9] text-white"
                style={{ textShadow: "0 4px 32px rgba(0,0,0,0.8)" }}
              >
                {p.overlay}
              </p>
            </motion.div>

            <motion.div
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }
              }
              whileInView={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.3 }
                  : { duration: 0.5, ease: "easeOut", delay: 0.1 }
              }
              className="px-6 py-12"
            >
              <PillarTextContent pillar={p} />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
