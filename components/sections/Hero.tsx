"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CtaSweepLabel } from "@/components/ui/CtaSweepLabel";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Percentage form (not the "start"/"end" keyword form) is intentional:
    // the keyword pair numerically collides with framer-motion's internal
    // `Exit` scroll-offset preset, which silently reroutes tracking onto the
    // native CSS view-timeline's "exit" range — a non-linear curve, not the
    // plain 0->1 scroll-distance progress this component relies on.
    offset: ["0% 0%", "100% 0%"],
  });

  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );
  const heroTextY = useTransform(
    scrollYProgress,
    [0, 0.4],
    prefersReducedMotion ? [0, 0] : [0, -60],
  );
  const lowerContentY = useTransform(
    scrollYProgress,
    [0, 0.3],
    prefersReducedMotion ? [0, 0] : [0, -30],
  );
  const lowerContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );
  const glowScale = useTransform(
    scrollYProgress,
    [0, 0.4],
    prefersReducedMotion ? [1, 1] : [1, 1.8],
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.4],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );
  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );

  function fadeUp(delay: number, duration = 0.6) {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      };
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration, delay, ease: EASE },
    };
  }

  const scrollToProblem = () => {
    document
      .getElementById("problem")
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <motion.video
          key={isMobile ? "mobile" : "desktop"}
          style={{ opacity: videoOpacity }}
          className="h-full w-full object-cover"
          src={isMobile ? "/hero_mobile.mp4" : "/hero.mp4"}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <motion.div
        aria-hidden
        style={{ opacity: videoOpacity }}
        className="absolute inset-0 z-10 bg-black/60"
      />

      <motion.div
        aria-hidden
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute bottom-0 left-1/2 z-[15] h-[60%] w-[140%] -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(232,92,26,0.08)_0%,transparent_70%)] blur-3xl"
        />
      </motion.div>

      <div className="relative z-20 mx-auto flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          {...fadeUp(0.1, 0.5)}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lso_new.png"
            alt="LS OptimAIze"
            style={{ display: "inline-block" }}
            className="h-[clamp(36px,9vw,52px)] w-auto md:h-[clamp(48px,6vw,88px)]"
          />
          <span className="font-mono text-[clamp(36px,9vw,52px)] tracking-tight text-accent md:text-[clamp(48px,6vw,88px)]">
            × GYM LAUNCH
          </span>
        </motion.div>

        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <motion.p
            {...fadeUp(0.3)}
            className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-accent"
          >
            THE ONLY AI STACK BUILT FOR GYM OWNERS
          </motion.p>

          <motion.div style={{ y: heroTextY }} className="mt-4">
            <h1 className="font-display text-[clamp(36px,9vw,52px)] italic font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-foreground md:text-[clamp(48px,6vw,88px)]">
              <motion.span {...fadeUp(0.5)} className="block">
                Stop Bleeding Money.
              </motion.span>
              <motion.span {...fadeUp(0.7)} className="block">
                Start Printing It.
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            style={{ y: lowerContentY, opacity: lowerContentOpacity }}
            className="flex flex-col items-center"
          >
            <motion.p
              {...fadeUp(0.9, 0.7)}
              className="mt-6 max-w-lg font-sans text-[17px] font-normal leading-[1.6] text-muted"
            >
              Most gyms lose $8,000+ every month to bad leads, ghost members,
              and zero automation. We fix all of it.
            </motion.p>

            <motion.a
              href="#contact"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95 }
              }
              animate={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.3 }
                  : { duration: 0.5, delay: 1.1, ease: EASE }
              }
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.05,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }
              }
              className="group relative isolate mt-8 inline-flex items-center justify-center overflow-hidden bg-accent px-8 py-4 font-mono text-sm font-medium text-white"
            >
              <CtaSweepLabel>Get the AI Stack →</CtaSweepLabel>
            </motion.a>

            <motion.a
              href="#problem"
              onClick={(e) => {
                e.preventDefault();
                scrollToProblem();
              }}
              {...fadeUp(1.3)}
              className="mt-6 font-sans text-sm text-muted underline underline-offset-4 transition-colors hover:text-foreground"
            >
              See how it works ↓
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#problem"
        onClick={(e) => {
          e.preventDefault();
          scrollToProblem();
        }}
        aria-label="Scroll to next section"
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-foreground"
      >
        <motion.svg
          aria-hidden
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
