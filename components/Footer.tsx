"use client";

const FOOTER_LINKS = [
  { label: "The Problem", id: "problem" },
  { label: "The Stack", id: "stack" },
  { label: "Results", id: "results" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gym/lso_new.png" alt="LS OptimAIze" className="h-8 w-auto" />

        <div className="flex flex-wrap items-center justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} LS OptimAIze. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
