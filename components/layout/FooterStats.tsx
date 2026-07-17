import {
  BadgeCheck,
  Building2,
  Globe2,
  PackageCheck,
} from "lucide-react";

const stats = [
  {
    icon: Globe2,
    value: "180+",
    label: "Countries Served",
    description: "Connecting buyers and suppliers worldwide.",
  },
  {
    icon: Building2,
    value: "25K+",
    label: "Verified Suppliers",
    description: "Trusted manufacturers and wholesalers.",
  },
  {
    icon: PackageCheck,
    value: "1.2M+",
    label: "Wholesale Products",
    description: "Across electronics, fashion, machinery and more.",
  },
  {
    icon: BadgeCheck,
    value: "99%",
    label: "Buyer Satisfaction",
    description: "Reliable sourcing with secure transactions.",
  },
];

export default function FooterStats() {
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-12 text-center">

          <span className="inline-flex rounded-full bg-blue-600/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Marketplace Overview
          </span>

          <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
            Trusted by Businesses Around the World
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-400">
            WholesaleHub helps businesses discover reliable suppliers,
            negotiate better prices, and build long-term partnerships through
            a secure global wholesale marketplace.
          </p>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">

                  <Icon className="h-8 w-8 text-white" />

                </div>

                <h3 className="text-4xl font-black tracking-tight text-white">
                  {item.value}
                </h3>

                <p className="mt-3 text-lg font-semibold text-white">
                  {item.label}
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}