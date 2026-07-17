"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import SupplierCard from "../components/SupplierCard";
import { featuredSuppliers } from "../data/featuredSuppliers";

export default function FeaturedSuppliers() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-indigo-100/40 blur-3xl" />

      </div>

      <Container className="relative">

        {/* Header */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Verified Suppliers
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Trusted Wholesale Suppliers
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Source directly from trusted manufacturers and verified
              wholesale suppliers offering competitive pricing, secure
              transactions and worldwide shipping.
            </p>

          </div>

          <Link
            href="/suppliers"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-xl"
          >
            View All Suppliers

            <ArrowRight className="h-5 w-5" />

          </Link>

        </div>

        {/* Grid */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {featuredSuppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              {...supplier}
            />
          ))}

        </div>

        {/* Bottom CTA */}

        <div className="mt-20 rounded-[32px] border border-blue-100 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-10 text-center shadow-2xl">

          <h3 className="text-3xl font-bold text-white">
            Want to Become a Verified Supplier?
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100 leading-8">
            Join thousands of global manufacturers already growing
            their business through WholesaleHub.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/become-supplier"
              className="rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:-translate-y-1 hover:shadow-xl"
            >
              Become a Supplier
            </Link>

            <Link
              href="/suppliers"
              className="rounded-2xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              Browse Suppliers
            </Link>

          </div>

        </div>

      </Container>

    </section>
  );
}