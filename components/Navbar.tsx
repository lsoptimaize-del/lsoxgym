"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CtaSweepLabel } from "@/components/ui/CtaSweepLabel";

const NAV_LINKS = [
  { label: "The Problem", id: "problem" },
  { label: "The Stack", id: "stack" },
  { label: "Results", id: "results" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 60);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 150 && !isMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToId = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: isHidden ? "-100%" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "border-b border-[#E85C1A]/20 bg-[#0A0A0A]/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gym/lso_new.png"
              alt="LS OptimAIze"
              height={36}
              className="h-9 w-auto"
            />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(link.id);
                }}
                className="font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              className="group relative isolate inline-flex items-center justify-center overflow-hidden bg-accent px-5 py-2 font-mono text-sm text-white"
            >
              <CtaSweepLabel>Get the AI Stack</CtaSweepLabel>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={
                isMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="block h-0.5 w-6 bg-white"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: "-100%", opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: "-100%", opacity: 0 }
            }
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(link.id);
                }}
                className="font-mono text-2xl uppercase tracking-widest text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              className="group relative isolate mt-4 inline-flex items-center justify-center overflow-hidden bg-accent px-8 py-4 font-mono text-sm text-white"
            >
              <CtaSweepLabel>Get the AI Stack</CtaSweepLabel>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
