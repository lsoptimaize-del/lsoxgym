"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CtaSweepLabel } from "@/components/ui/CtaSweepLabel";
import Image from "next/image";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      gym: (form.elements.namedItem("gym") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/gym/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputVariants = {
    idle: { scale: 1, borderColor: "rgba(255, 255, 255, 0.1)" },
    focused: { scale: 1.02, borderColor: "#ff3b30", transition: { duration: 0.3 } },
  };

  return (
    <section
      id="contact"
      className="relative flex w-full flex-col md:flex-row bg-background min-h-screen"
    >
      {/* Left side: Image */}
      <div className="relative w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden">
        <Image
          src="/inner-city.png"
          alt="Inner city at dusk"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background via-background/40 to-transparent" />
        
        <motion.div 
          className="absolute bottom-10 left-6 right-6 md:bottom-20 md:left-20 md:right-20 max-w-md"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-display font-extrabold italic uppercase leading-[0.9] text-white text-5xl md:text-6xl lg:text-7xl mb-4">
            TALK TO <br /><span className="text-accent">THE TEAM</span>
          </h2>
          <p className="font-sans text-[#A0A0A0] text-sm md:text-base leading-relaxed">
            Ready to transform your business? Reach out to our team today and take the first step towards building an unstoppable brand.
          </p>
        </motion.div>
      </div>

      {/* Right side: Form */}
      <div className="flex w-full md:w-1/2 flex-col justify-center items-center px-6 py-16 lg:py-24 relative overflow-hidden bg-[#050505]">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-[520px] bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] p-8 md:p-12 rounded-[2rem] shadow-2xl relative z-10">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
            className="mb-10 text-center md:text-left"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3 text-accent flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-[1px] bg-accent/50 hidden md:block"></span>
              GET STARTED
            </p>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Let's build <span className="text-accent italic">together.</span>
            </h3>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-5"
          >
            {[
              { name: "name", type: "text", placeholder: "Your name", required: true },
              { name: "email", type: "email", placeholder: "Email address", required: true },
              { name: "gym", type: "text", placeholder: "Gym / business name", required: false },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  onFocus={() => setFocusedInput(field.name)}
                  onBlur={() => setFocusedInput(null)}
                  variants={inputVariants}
                  animate={focusedInput === field.name ? "focused" : "idle"}
                  className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] px-5 py-4 font-sans text-sm text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 focus:ring-accent/50 rounded-xl transition-all duration-300"
                />
              </motion.div>
            ))}

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.textarea
                name="message"
                placeholder="How can we help you?"
                rows={4}
                onFocus={() => setFocusedInput("message")}
                onBlur={() => setFocusedInput(null)}
                variants={inputVariants}
                animate={focusedInput === "message" ? "focused" : "idle"}
                className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] px-5 py-4 font-sans text-sm text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 focus:ring-accent/50 resize-none rounded-xl transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2"
            >
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative isolate flex items-center justify-center overflow-hidden bg-accent px-8 py-4 font-mono text-sm font-bold text-white disabled:opacity-60 hover:bg-[#e6352b] transition-all duration-300 rounded-xl w-full shadow-[0_0_20px_rgba(255,59,48,0.3)] hover:shadow-[0_0_30px_rgba(255,59,48,0.5)]"
              >
                <CtaSweepLabel>
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </CtaSweepLabel>
              </button>
            </motion.div>

            {status === "success" && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="font-sans text-sm text-accent text-center mt-2 p-3 bg-accent/10 border border-accent/20 rounded-lg"
              >
                Thanks — we&apos;ll be in touch shortly.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="font-sans text-sm text-red-400 text-center mt-2 p-3 bg-red-400/10 border border-red-400/20 rounded-lg"
              >
                {errorMessage}
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
