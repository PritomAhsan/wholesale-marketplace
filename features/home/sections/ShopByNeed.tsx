import Link from "next/link";
import Container from "@/components/layout/Container";

const LANES = [
  {
    num: "01",
    title: "Fast-moving restock",
    copy: "Everyday inventory with a defined dispatch window.",
    action: "Shop fast dispatch",
    href: "/products?sort=newest",
    featured: true,
  },
  {
    num: "02",
    title: "Low-MOQ trials",
    copy: "Test a new assortment with a lower opening commitment.",
    action: "Browse low MOQ",
    href: "/products?max_moq=5",
    featured: false,
  },
  {
    num: "03",
    title: "Pallet economics",
    copy: "Compare higher-volume thresholds on one unit basis.",
    action: "View pallet offers",
    href: "/products?min_moq=50&sort=price_desc",
    featured: false,
  },
  {
    num: "04",
    title: "Controlled inventory",
    copy: "Eligibility-led access for approved business buyers.",
    action: "Review requirements",
    href: "/categories",
    featured: false,
  },
];

export default function ShopByNeed() {
  return (
    <section className="border-b border-border bg-ivory py-16">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wide text-sapphire">
          Buying paths
        </p>
        <h2 className="mt-2 text-2xl font-bold text-obsidian">
          Start with the way your business buys
        </h2>
        <p className="mt-1.5 text-sm text-obsidian/60">
          Purpose-built routes shorten the path from a store need to a
          qualified product set.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LANES.map((lane) => (
            <Link
              key={lane.num}
              href={lane.href}
              className={`rounded-xl p-5 transition ${
                lane.featured
                  ? "bg-obsidian text-white hover:bg-obsidian-soft"
                  : "border border-border bg-white hover:border-sapphire"
              }`}
            >
              <div
                className={`mb-3 h-px w-6 ${
                  lane.featured ? "bg-champagne" : "bg-sapphire"
                }`}
              />
              <p
                className={`text-[11px] font-semibold ${
                  lane.featured ? "text-champagne" : "text-sapphire"
                }`}
              >
                {lane.num}
              </p>
              <h3
                className={`mt-2 font-semibold ${
                  lane.featured ? "text-white" : "text-obsidian"
                }`}
              >
                {lane.title}
              </h3>
              <p
                className={`mt-2 text-xs leading-5 ${
                  lane.featured ? "text-ivory/60" : "text-obsidian/50"
                }`}
              >
                {lane.copy}
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-1 text-xs font-medium ${
                  lane.featured ? "text-champagne" : "text-sapphire"
                }`}
              >
                {lane.action} →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
