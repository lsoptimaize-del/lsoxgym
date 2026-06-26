"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CtaSweepLabel } from "@/components/ui/CtaSweepLabel";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PRICING_TIERS = [
  {
    title: "STARTER AI AUTOMATION",
    price: "$2,000 - $3,000",
    mrr: "$350 - $500 / mo",
    description: "Perfect for establishing your baseline digital presence and getting your first automated campaigns running.",
    features: [
      "High-Converting Gym Website",
      "Local SEO / GEO",
      "Standard Conversion Analytics",
    ],
    highlight: false,
  },
  {
    title: "ADVANCED AI AUTOMATION",
    price: "$5,000 - $10,000",
    mrr: "$800 - $1,000 / mo",
    description: "Scale your operations with advanced conversational logic, SEO dominance, and a full operational dashboard.",
    features: [
      "Everything in Starter",
      "Outreach Software & Automation",
      "Local SEO / GEO & Advanced Ads",
      "Custom Ops & Analytics Dashboard",
    ],
    highlight: true,
  },
  {
    title: "FULL AI AUTOMATION",
    price: "CUSTOM",
    mrr: "Custom Pricing",
    description: "The ultimate ecosystem. Completely custom code to automate everything: your sales, marketing, operations, and retention.",
    features: [
      "Everything in Advanced (Full Package)",
      "100% Custom Coded Automation",
      "Automates Sales, Marketing, Everything",
      "Advanced Ads",
      "1-on-1 Call to Custom Build Your Offer",
    ],
    highlight: false,
  },
];

export default function Pricing() {
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
      id="pricing"
      className="relative w-full bg-background py-[120px] min-h-screen border-t border-[#ffffff08]"
    >
      <div className="mx-auto max-w-7xl px-12">
        <div className="mb-20 md:text-center">
          <motion.p
            {...fadeUp(0, 0.6, 20)}
            className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent"
          >
            INVESTMENT OPTIONS
          </motion.p>
          <h2 className="font-display text-[clamp(40px,5vw,72px)] italic font-extrabold uppercase leading-[0.92]">
            <motion.span {...fadeUp(0.1, 0.55)} className="block text-foreground">CHOOSE YOUR</motion.span>
            <motion.span {...fadeUp(0.2, 0.55)} className="block text-accent">AUTOMATION LEVEL</motion.span>
          </h2>
          <motion.p
            {...fadeUp(0.2, 0.6)}
            className="mt-6 mx-auto max-w-2xl font-sans text-[15px] leading-[1.7] text-muted md:text-center"
          >
            We don't do cookie-cutter solutions. We build tailored AI systems that integrate seamlessly into your gym operations. Choose the scale that fits your current growth phase.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.title}
              {...fadeUp(index * 0.1 + 0.3, 0.6, 40)}
              className={`relative flex flex-col border p-10 ${
                tier.highlight
                  ? "border-accent bg-accent/5"
                  : "border-[#ffffff12] bg-[#ffffff02]"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}
              <motion.h3 {...fadeUp(index * 0.1 + 0.4, 0.6, 20)} className="font-display text-2xl italic font-bold uppercase text-foreground">
                {tier.title}
              </motion.h3>
              <motion.p {...fadeUp(index * 0.1 + 0.5, 0.6, 20)} className="mt-4 text-sm font-sans text-muted min-h-[60px]">
                {tier.description}
              </motion.p>
              
              <motion.div {...fadeUp(index * 0.1 + 0.6, 0.6, 20)} className="my-8 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-foreground">
                  {tier.price}
                </span>
              </motion.div>
              <motion.div {...fadeUp(index * 0.1 + 0.7, 0.6, 20)} className="mb-8 font-mono text-[12px] uppercase tracking-widest text-accent">
                + {tier.mrr}
              </motion.div>

              <div className="flex-1 space-y-4 mb-10">
                {tier.features.map((feature, i) => (
                  <motion.div key={i} {...fadeUp(index * 0.1 + 0.7 + i * 0.1, 0.5, 10)} className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-4 w-4 shrink-0 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-sans text-[14px] text-muted-foreground">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#contact"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.02, transition: { duration: 0.2 } }
                }
                whileTap={
                  prefersReducedMotion ? undefined : { scale: 0.98 }
                }
                className={`group relative isolate mt-auto flex w-full items-center justify-center overflow-hidden px-8 py-4 font-mono text-xs transition-colors ${
                  tier.highlight
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "bg-[#ffffff08] text-foreground hover:bg-[#ffffff12]"
                }`}
              >
                {tier.highlight ? (
                  <CtaSweepLabel>Secure Your Spot →</CtaSweepLabel>
                ) : (
                  <span>Get Started →</span>
                )}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
