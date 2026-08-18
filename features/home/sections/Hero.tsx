import Container from "@/components/layout/Container";
import CategoryRail from "../components/CategoryRail";
import HeroSearchPanel from "../components/HeroSearchPanel";
import HeroBuyerDesk from "../components/HeroBuyerDesk";
import { fetchCategories } from "@/features/categories/api";

export default async function Hero() {
  const categories = await fetchCategories();

  return (
    <section className="relative overflow-hidden border-b border-border bg-ivory">
      {/* Decorative background — soft brand-color washes + a fine dot grid, purely visual */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--sapphire) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-16 h-[340px] w-[340px] rounded-full opacity-[0.14] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--champagne) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--obsidian) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            opacity: 0.05,
          }}
        />
      </div>

      <Container className="relative py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr_300px]">
          <div className="hidden lg:block">
            <CategoryRail categories={categories} />
          </div>

          <div className="flex flex-col justify-center">
            <HeroSearchPanel />
          </div>

          <div className="hidden lg:block">
            <HeroBuyerDesk />
          </div>
        </div>
      </Container>
    </section>
  );
}
