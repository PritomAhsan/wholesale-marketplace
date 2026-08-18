import Link from "next/link";
import Container from "@/components/layout/Container";

const STEPS = [
  { num: 1, title: "Discover", copy: "Search inventory or describe the requirement.", href: "/products" },
  { num: 2, title: "Compare", copy: "Review case economics and seller terms.", href: "/products" },
  { num: 3, title: "Order", copy: "Purchase inventory or accept an offer.", href: "/rfq" },
  { num: 4, title: "Track", copy: "Follow fulfillment and retain the record.", href: "/orders" },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-border bg-white py-16">
      <Container>
        <div className="rounded-2xl bg-ivory px-8 py-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-sapphire">
              Simple workflow
            </p>
            <h2 className="mt-2 text-2xl font-bold text-obsidian">
              How purchasing works
            </h2>
            <p className="mt-1.5 text-sm text-obsidian/60">
              Move from a clear requirement to a documented wholesale
              transaction.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <Link
                key={step.num}
                href={step.href}
                className="rounded-xl border border-border bg-white p-5 transition hover:border-sapphire hover:shadow-sm"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    step.num === 1
                      ? "bg-sapphire text-white"
                      : "bg-sapphire-soft text-sapphire-strong"
                  }`}
                >
                  {step.num}
                </span>
                <h3 className="mt-3 font-semibold text-obsidian">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-obsidian/50">{step.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
