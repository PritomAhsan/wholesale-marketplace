import Link from "next/link";
import { ArrowRight, Eye, PackageCheck, ScanSearch, ShoppingCart } from "lucide-react";
import Container from "@/components/layout/Container";

const STEPS = [
  {
    num: 1,
    icon: ScanSearch,
    title: "Discover",
    copy: "Search inventory or describe the requirement.",
    href: "/products",
  },
  {
    num: 2,
    icon: Eye,
    title: "Compare",
    copy: "Review case economics and seller terms.",
    href: "/products",
  },
  {
    num: 3,
    icon: ShoppingCart,
    title: "Order",
    copy: "Purchase inventory or accept an offer.",
    href: "/rfq",
  },
  {
    num: 4,
    icon: PackageCheck,
    title: "Track",
    copy: "Follow fulfillment and retain the record.",
    href: "/orders",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Container className="relative">
        <div className="text-center">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-champagne">
            Simple workflow
          </span>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            How purchasing works
          </h2>
          <p className="mt-2 text-sm text-ivory/50">
            Move from a clear requirement to a documented wholesale
            transaction.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className="relative"
              >
                <Link
                  href={step.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-champagne/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-champagne to-champagne/60 text-obsidian">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-3xl font-black text-white/10">
                      {String(step.num).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-ivory/50">{step.copy}</p>

                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-champagne opacity-0 transition group-hover:opacity-100">
                    Go <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>

                {i < STEPS.length - 1 && (
                  <ArrowRight className="pointer-events-none absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/15 lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
