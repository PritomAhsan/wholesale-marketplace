import Container from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/section-heading";

import CompanyLogo from "../components/CompanyLogo";
import TrustStatCard from "../components/TrustStatCard";
import { trustStats } from "../data/trustStats";

const logos = [
  "https://placehold.co/2400x600/orange/white.png",
  "https://placehold.co/2400x600/orange/white.png",
  "https://placehold.co/2400x600/orange/white.png",
  "https://placehold.co/2400x600/orange/white.png",
  "https://placehold.co/2400x600/orange/white.png",
  "https://placehold.co/2400x600/orange/white.png",
];

export default function TrustedBusinesses() {
  return (
    <section className="py-24">
      <Container>

        <SectionHeading
          badge="Trusted Worldwide"
          title="Businesses Trust Our Marketplace"
          description="Helping retailers, wholesalers, and importers source products from verified suppliers across the globe."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustStats.map((item) => (
            <TrustStatCard
              key={item.id}
              {...item}
            />
          ))}
        </div>

        <div className="mt-20">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
            Trusted by buyers and suppliers worldwide
          </p>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {logos.map((logo, index) => (
              <CompanyLogo
                key={index}
                src={logo}
                alt={`Partner ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}