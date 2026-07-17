"use client";

import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import Container from "@/components/layout/Container";
import HeroSearch from "../components/HeroSearch";
import CategoryPills from "../components/CategoryPills";
import HeroStats from "../components/HeroStats";
import TrustBadges from "../components/TrustBadges";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-200/20 blur-3xl" />

      </div>

      <Container className="relative py-14 md:py-20 xl:py-28">

        <div className="grid items-center gap-16 xl:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 shadow-sm">

              <Sparkles className="h-4 w-4 text-blue-600" />

              <span className="text-sm font-semibold text-blue-700">
                Trusted by 25,000+ Businesses
              </span>

            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl xl:text-7xl">

              Source Wholesale

              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Products Globally
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">

              Connect directly with verified manufacturers and suppliers.

              Compare quotations, negotiate pricing, and purchase wholesale
              products confidently through one modern B2B marketplace.

            </p>

            {/* Search */}

            {/* <div className="mt-10">
              <HeroSearch />
            </div> */}

            {/* Categories */}

            {/* <div className="mt-8">
              <CategoryPills />
            </div> */}

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/products"
                className="flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-300"
              >
                Browse Products

                <ArrowRight className="ml-2 h-5 w-5" />

              </Link>

              <Link
                href="/rfq"
                className="flex h-14 items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 font-semibold text-slate-700 transition-all hover:border-blue-500 hover:text-blue-600"
              >
                Request Quotation
              </Link>

            </div>

            {/* Trust */}

            {/* <div className="mt-12">
              <TrustBadges />
            </div> */}

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Main Card */}

            <div className="overflow-hidden rounded-[32px] border border-white bg-white shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80"
                alt="Wholesale Marketplace"
                className="h-[520px] w-full object-cover"
              />

            </div>

            {/* Floating Card */}

            <div className="absolute -left-6 top-12 hidden w-64 rounded-3xl bg-white p-5 shadow-2xl lg:block">

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-green-100 p-3">

                  <BadgeCheck className="h-6 w-6 text-green-600" />

                </div>

                <div>

                  <h4 className="font-bold text-slate-900">
                    Verified Suppliers
                  </h4>

                  <p className="text-sm text-slate-500">
                    Quality Checked
                  </p>

                </div>

              </div>

            </div>

            <div className="absolute -right-6 bottom-10 hidden w-72 rounded-3xl bg-white p-6 shadow-2xl lg:block">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-blue-100 p-3">

                  <Globe2 className="h-7 w-7 text-blue-600" />

                </div>

                <div>

                  <h4 className="text-3xl font-black text-slate-900">
                    180+
                  </h4>

                  <p className="text-sm text-slate-500">
                    Countries Connected
                  </p>

                </div>

              </div>

            </div>

            <div className="absolute left-10 bottom-24 hidden rounded-2xl bg-slate-900 px-6 py-4 text-white shadow-xl xl:block">

              <div className="flex items-center gap-3">

                <ShieldCheck className="h-6 w-6 text-green-400" />

                <div>

                  <p className="font-semibold">
                    Buyer Protection
                  </p>

                  <p className="text-xs text-slate-300">
                    Secure B2B Transactions
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Stats */}

        {/* <div className="mt-24">
          <HeroStats />
        </div> */}

      </Container>

    </section>
  );
}