import Container from "@/components/layout/Container";
import HeroSearch from "./HeroSearch";
import CategoryPills from "./CategoryPills";
import HeroStats from "./HeroStats";
import TrustBadges from "./TrustBadges";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">

      <Container className="py-24">

        <div className="mx-auto max-w-4xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            B2B Wholesale Marketplace
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
            Find Trusted Suppliers for Your Business
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            Source wholesale products from verified suppliers,
            compare offers, request quotations, and grow your business.
          </p>

          <HeroSearch />

          <CategoryPills />

          <TrustBadges />

          <HeroStats />

        </div>

      </Container>

    </section>
  );
}