"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe2,
  TrendingUp,
  Users,
} from "lucide-react";

import Container from "@/components/layout/Container";

const benefits = [
  {
    icon: Globe2,
    title: "Reach Global Buyers",
    description: "Sell to businesses in over 180 countries.",
  },
  {
    icon: TrendingUp,
    title: "Increase Sales",
    description: "Generate more qualified wholesale inquiries.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Seller Badge",
    description: "Build trust and improve buyer confidence.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Our team helps you grow your business.",
  },
];

export default function BecomeSupplier() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950" />

      <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />

      <Container className="relative">

        <div className="grid items-center gap-20 xl:grid-cols-2">

          {/* LEFT */}

          <div>

            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              Become a Supplier
            </span>

            <h2 className="mt-6 text-5xl font-black leading-tight text-white xl:text-6xl">
              Grow Your Wholesale Business
              <span className="block text-blue-400">
                With Global Buyers
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Join thousands of manufacturers, exporters and wholesalers
              already using WholesaleHub to showcase products, receive
              qualified RFQs and connect with serious buyers worldwide.
            </p>

            {/* Stats */}

            <div className="mt-12 grid grid-cols-2 gap-5">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

                <h3 className="text-4xl font-black text-white">
                  25K+
                </h3>

                <p className="mt-2 text-slate-400">
                  Verified Suppliers
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

                <h3 className="text-4xl font-black text-white">
                  120K+
                </h3>

                <p className="mt-2 text-slate-400">
                  Active Buyers
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

                <h3 className="text-4xl font-black text-white">
                  180+
                </h3>

                <p className="mt-2 text-slate-400">
                  Countries
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

                <h3 className="text-4xl font-black text-white">
                  1.2M+
                </h3>

                <p className="mt-2 text-slate-400">
                  Products Listed
                </p>

              </div>

            </div>

            {/* CTA */}

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/become-supplier"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                Become a Supplier

                <ArrowRight className="h-5 w-5" />

              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Contact Sales
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="rounded-[36px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

              <div className="grid gap-6">

                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
                    >

                      <div className="flex items-start gap-5">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">

                          <Icon className="h-8 w-8 text-white" />

                        </div>

                        <div>

                          <h3 className="text-xl font-bold text-white">
                            {item.title}
                          </h3>

                          <p className="mt-3 leading-7 text-slate-300">
                            {item.description}
                          </p>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Floating Card */}

            {/* <div className="absolute -bottom-8 -left-8 hidden rounded-3xl bg-white p-6 shadow-2xl lg:block">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-blue-100 p-4">

                  <Building2 className="h-8 w-8 text-blue-600" />

                </div>

                <div>

                  <p className="text-3xl font-black text-slate-900">
                    3,500+
                  </p>

                  <p className="text-sm text-slate-500">
                    New RFQs Every Week
                  </p>

                </div>

              </div>

            </div> */}

          </div>

        </div>

      </Container>

    </section>
  );
}