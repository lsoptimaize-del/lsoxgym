import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Results from "@/components/sections/Results";
import Stack from "@/components/sections/Stack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Problem />
        <Stack />
        <Results />
        <section
          id="pricing"
          className="flex h-screen items-center justify-center bg-background text-muted"
        >
          Pricing placeholder
        </section>
      </main>
    </>
  );
}
