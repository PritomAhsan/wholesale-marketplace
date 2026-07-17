"use client";

import {
  BadgeCheck,
  Globe2,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

const items = [
  {
    icon: BadgeCheck,
    title: "Verified Suppliers",
    description: "Identity & factory verified",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Protected transactions",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Truck,
    title: "Global Shipping",
    description: "Fast worldwide delivery",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Package,
    title: "Bulk Orders",
    description: "Competitive wholesale pricing",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Globe2,
    title: "180+ Countries",
    description: "Worldwide sourcing network",
    color: "from-cyan-500 to-sky-600",
  },
];

export default function TrustBadges() {
  return (
    <section className="mt-16">

      <div className="rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-xl">

        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">

          <div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Why Businesses Trust Us
            </span>

            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              Everything You Need for Safe Global Sourcing
            </h3>

          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-center text-white shadow-lg">

            <p className="text-2xl font-black">
              25K+
            </p>

            <p className="text-xs uppercase tracking-widest text-blue-100">
              Verified Suppliers
            </p>

          </div>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
              >

                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h4 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
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