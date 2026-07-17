"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Globe2,
  Mail,
  TrendingUp,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";

const benefits = [
  "Weekly Wholesale Trends",
  "Verified Supplier Updates",
  "Exclusive Product Launches",
  "Business Growth Tips",
];

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden py-28">

      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />

      <Container className="relative">

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">

          {/* Background */}

          <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

          <div className="relative grid items-center gap-20 px-8 py-16 lg:grid-cols-2 lg:px-16 lg:py-20">

            {/* LEFT */}

            <div>

              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">

                <Bell className="h-4 w-4" />

                Newsletter

              </span>

              <h2 className="mt-6 text-5xl font-black leading-tight text-white">

                Stay Ahead of
                <span className="block text-blue-400">
                  The Wholesale Market
                </span>

              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
                Receive supplier updates, trending products, sourcing
                insights, RFQ opportunities and wholesale market news
                directly in your inbox.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">

                {benefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur"
                  >

                    <BadgeCheck className="h-5 w-5 text-green-400" />

                    <span className="font-medium text-slate-200">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <div className="rounded-[36px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl">

                  <Mail className="h-10 w-10 text-white" />

                </div>

                <h3 className="mt-8 text-center text-3xl font-bold text-white">
                  Join 150,000+ Businesses
                </h3>

                <p className="mt-4 text-center leading-7 text-slate-300">
                  Trusted by importers, wholesalers and manufacturers
                  around the world.
                </p>

                <form className="mt-10 space-y-4">

                  <input
                    type="email"
                    placeholder="Enter your business email"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white px-5 text-slate-900 outline-none transition focus:border-blue-500"
                  />

                  <AppButton
                    size="lg"
                    className="h-14 w-full rounded-2xl justify-center"
                  >
                    Subscribe Now

                    <ArrowRight className="ml-2 h-5 w-5" />

                  </AppButton>

                </form>

                <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">

                  <div className="flex items-center gap-3">

                    <TrendingUp className="h-6 w-6 text-blue-300" />

                    <div>

                      <p className="font-semibold text-white">
                        35,000+
                      </p>

                      <p className="text-sm text-slate-300">
                        Professionals subscribed this month
                      </p>

                    </div>

                  </div>

                </div>

                <p className="mt-6 text-center text-sm text-slate-400">
                  No spam. Unsubscribe anytime.
                </p>

              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="relative border-t border-white/10 px-8 py-8 lg:px-16">

            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

              <div className="flex items-center gap-8 text-slate-300">

                <div className="flex items-center gap-2">

                  <Globe2 className="h-5 w-5 text-blue-400" />

                  <span>180+ Countries</span>

                </div>

                <div className="flex items-center gap-2">

                  <BadgeCheck className="h-5 w-5 text-green-400" />

                  <span>25K+ Verified Suppliers</span>

                </div>

              </div>

              <Link
                href="/newsletter"
                className="font-semibold text-blue-300 transition hover:text-white"
              >
                Learn More →
              </Link>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}