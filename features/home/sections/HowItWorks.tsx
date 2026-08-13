"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import Container from "@/components/layout/Container";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Suppliers",
    description:
      "Every supplier is carefully reviewed to ensure authenticity and product quality.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description:
      "Protected payments and buyer safeguards give you confidence with every order.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Globe2,
    title: "Global Marketplace",
    description:
      "Source products from trusted manufacturers across more than 180 countries.",
    color: "from-cyan-500 to-sky-600",
  },
  {
    icon: Truck,
    title: "Worldwide Shipping",
    description:
      "Reliable logistics partners ensure fast and secure international delivery.",
    color: "from-orange-500 to-red-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 bg-slate-50">

      <div className="absolute inset-0">

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-indigo-100/40 blur-3xl" />

      </div>

      <Container className="relative">

        <div className="grid items-center gap-20 xl:grid-cols-2">

          {/* Left */}

          <div>

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Why Choose BULKARE
            </span>

            <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
              Wholesale Sourcing
              <span className="block text-blue-600">
                Made Simple
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Discover trusted suppliers, negotiate better pricing,
              request quotations, and manage your sourcing journey
              from one modern B2B marketplace.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              <div className="rounded-3xl bg-white p-6 shadow-xl">

                <h3 className="text-4xl font-black text-blue-600">
                  25K+
                </h3>

                <p className="mt-2 font-semibold text-slate-900">
                  Verified Suppliers
                </p>

              </div>

              <div className="rounded-3xl bg-white p-6 shadow-xl">

                <h3 className="text-4xl font-black text-blue-600">
                  1.2M+
                </h3>

                <p className="mt-2 font-semibold text-slate-900">
                  Wholesale Products
                </p>

              </div>

              <div className="rounded-3xl bg-white p-6 shadow-xl">

                <h3 className="text-4xl font-black text-blue-600">
                  180+
                </h3>

                <p className="mt-2 font-semibold text-slate-900">
                  Countries
                </p>

              </div>

              <div className="rounded-3xl bg-white p-6 shadow-xl">

                <h3 className="text-4xl font-black text-blue-600">
                  99%
                </h3>

                <p className="mt-2 font-semibold text-slate-900">
                  Buyer Satisfaction
                </p>

              </div>

            </div>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
            >
              Learn More

              <ArrowRight className="h-5 w-5" />

            </Link>

          </div>

          {/* Right */}

          <div className="grid gap-6">

            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
                >

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>

                </div>
              );
            })}

            <div className="rounded-[30px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 text-white shadow-2xl">

              <div className="flex items-center gap-4">

                <Users className="h-12 w-12" />

                <div>

                  <h3 className="text-2xl font-bold">
                    Join 120,000+ Buyers
                  </h3>

                  <p className="mt-2 text-blue-100">
                    Start sourcing from trusted suppliers today.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}