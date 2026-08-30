import Container from "@/components/layout/Container";
import HeroSearchPanel from "../components/HeroSearchPanel";

export default function Hero() {
  return (
    <section className="hero-animated-bg relative overflow-hidden border-b border-border">
      {/* Floating color blobs — slow drift, purely decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="hero-blob-a absolute -right-20 -top-24 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--sapphire) 0%, transparent 70%)" }}
        />
        <div
          className="hero-blob-b absolute -bottom-28 -left-16 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--champagne) 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative py-10 md:py-14">
        <div className="mx-auto max-w-2xl">
          <HeroSearchPanel />
        </div>
      </Container>
    </section>
  );
}
