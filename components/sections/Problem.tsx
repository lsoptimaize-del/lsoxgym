"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CtaSweepLabel } from "@/components/ui/CtaSweepLabel";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TAGLINE_LINES = [
  { text: "YOUR", accent: false },
  { text: "COMPETITORS", accent: false },
  { text: "ALREADY", accent: true },
  { text: "AUTOMATED", accent: true },
  { text: "EVERYTHING.", accent: false },
];

const PAIN_POINTS = [
  {
    number: "01",
    text: "LEADS GO COLD IN 4 HOURS. YOUR FOLLOW UP TAKES 4 DAYS.",
    micro: "Every hour you wait after an enquiry, your close rate drops 10x. AI follows up in 60 seconds, every time.",
  },
  {
    number: "02",
    text: "30% OF YOUR MEMBERS WILL QUIT THIS QUARTER. YOU WON'T KNOW UNTIL THEY'RE GONE.",
    micro: "Churn is predictable with the right data. Without it, you are always reacting, never preventing.",
  },
  {
    number: "03",
    text: "YOUR WEBSITE LOOKS LIKE 2018. IT IS KILLING YOUR CONVERSION.",
    micro: "A gym owner's website is their #1 sales rep. If it does not convert in 5 seconds, they are gone to the next gym.",
  },
  {
    number: "04",
    text: "THE GYM THAT AUTOMATES FIRST OWNS THE MARKET. SECOND PLACE GETS THE SCRAPS.",
    micro: "AI adoption in fitness is happening right now. The window to be the dominant gym in your city is open for maybe 12 more months. Then it closes.",
  },
];

export default function Problem() {
  const prefersReducedMotion = useReducedMotion();

  function fadeUp(
    delay: number,
    duration = 0.6,
    distance = 40,
    amount = 0.2,
  ) {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount },
        transition: { duration: 0.3 },
      };
    }
    return {
      initial: { opacity: 0, y: distance },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount },
      transition: { duration, delay, ease: EASE },
    };
  }

  return (
    <section
      id="problem"
      className="relative w-full bg-background py-[120px] min-h-screen"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-12 md:grid-cols-[1fr_2fr] md:gap-24">
        {/* Left column: sticky tagline */}
        <div className="relative md:sticky md:top-32 md:h-fit">
          <motion.p
            {...fadeUp(0, 0.6, 20)}
            className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent"
          >
            WHILE YOU WERE BUSY RUNNING YOUR GYM
          </motion.p>

          <h2 className="text-left font-display text-[clamp(48px,5vw,80px)] italic font-extrabold uppercase leading-[0.92]">
            {TAGLINE_LINES.map((line, i) => (
              <motion.span
                key={line.text}
                {...fadeUp(i * 0.1, 0.55)}
                className={`block ${line.accent ? "text-accent" : "text-foreground"}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h2>

          <motion.p
            {...fadeUp(0.6, 0.7, 0)}
            className="mt-10 max-w-xs font-sans text-base leading-[1.7] text-muted"
          >
            The gyms winning in 2025 are not working harder. They plugged in
            AI and let it run. You are still doing it manually.
          </motion.p>

          <div
            aria-hidden
            className="absolute right-0 top-0 hidden h-full w-px bg-accent/30 md:block"
          />
        </div>

        {/* Right column: scrolling pain points */}
        <div>
          <p className="mb-16 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            HERE IS WHAT THAT IS COSTING YOU RIGHT NOW
          </p>

          <div className="flex flex-col gap-20">
            {PAIN_POINTS.map((point) => (
              <div key={point.number} className="relative pb-16">
                <motion.span
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.3 }
                      : { duration: 0.4, ease: EASE }
                  }
                  className="mb-4 block font-mono text-sm text-accent"
                >
                  {point.number}
                </motion.span>

                <motion.p
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.3 }
                      : { duration: 0.5, delay: 0.1, ease: EASE }
                  }
                  className="font-display text-[clamp(32px,3vw,52px)] font-bold uppercase leading-[1.0] text-foreground"
                >
                  {point.text}
                </motion.p>

                <motion.p
                  {...fadeUp(0.25, 0.5, 0, 0.3)}
                  className="mt-4 max-w-sm font-sans text-[15px] leading-[1.6] text-muted"
                >
                  {point.micro}
                </motion.p>

                <motion.div
                  aria-hidden
                  initial={
                    prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }
                  }
                  whileInView={
                    prefersReducedMotion ? { opacity: 1 } : { scaleX: 1 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.3 }
                      : { duration: 0.6, delay: 0.3, ease: EASE }
                  }
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-0 left-0 h-px w-full bg-[#ffffff08]"
                />
              </div>
            ))}

            {/* Closing statement + CTA continue the same scroll flow as the pain points */}
            <div>
              <motion.p
                {...fadeUp(0, 0.6, 30, 0.1)}
                className="font-display text-[clamp(40px,5vw,80px)] italic font-extrabold uppercase leading-[0.95] text-foreground"
              >
                EVERY MONTH YOU WAIT
              </motion.p>
              <motion.p
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 30, color: "#FFFFFF" }
                }
                whileInView={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, color: "#E85C1A" }
                }
                viewport={{ once: true, amount: 0.1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.3 }
                    : {
                        opacity: { duration: 0.6, delay: 0.2, ease: EASE },
                        y: { duration: 0.6, delay: 0.2, ease: EASE },
                        color: { duration: 0.3, delay: 0.35, ease: EASE },
                      }
                }
                className="font-display text-[clamp(40px,5vw,80px)] italic font-extrabold uppercase leading-[0.95]"
              >
                IS $8,000 GONE.
              </motion.p>
              <motion.p
                {...fadeUp(0.4, 0.6, 0, 0.1)}
                className="mt-6 font-sans text-[15px] text-muted"
              >
                That is not a pitch. That is math.
              </motion.p>

              <motion.div
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 60 }
                }
                whileInView={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.5 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.3 }
                    : { duration: 0.7, delay: 0.4, ease: EASE }
                }
                className="mt-10 flex flex-col items-start"
              >
                <motion.a
                  href="#get-started"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.95 }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1 }
                  }
                  viewport={{ once: true, amount: 0.1 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.3 }
                      : { duration: 0.5, delay: 0.3, ease: EASE }
                  }
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.04, transition: { duration: 0.2 } }
                  }
                  whileTap={
                    prefersReducedMotion ? undefined : { scale: 0.97 }
                  }
                  className="group relative isolate inline-flex items-center justify-center overflow-hidden bg-accent px-10 py-5 font-mono text-sm text-white"
                >
                  <CtaSweepLabel>Get the AI Stack →</CtaSweepLabel>
                </motion.a>
                <p className="mt-3 font-sans text-[13px] text-muted">
                  No contracts. No fluff. Just results.
                </p>
                <p className="mt-1 font-mono text-[12px] text-accent/70">
                  NEXT SLOT OPENS MONDAY
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
