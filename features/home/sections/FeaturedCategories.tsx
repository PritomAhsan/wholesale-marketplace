"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import CategoryCard from "../components/CategoryCard";
import { featuredCategories } from "../data/featuredCategories";

export default function FeaturedCategories() {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

      </div>

      <Container className="relative">

        {/* Header */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Browse Categories
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Explore Wholesale Categories
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Discover millions of wholesale products from verified
              manufacturers across the worlds fastest growing industries.
            </p>

          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg"
          >
            View All Categories

            <ArrowRight className="h-5 w-5" />

          </Link>

        </div>

        {/* Categories */}

        <div className="mt-16 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">

          {featuredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
            />
          ))}

        </div>

        {/* Bottom CTA */}

        <div className="mt-20 rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-10 text-center shadow-2xl">

          <h3 className="text-3xl font-bold text-white">
            Cant Find Your Product?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Submit a Request for Quotation and receive competitive offers
            directly from verified suppliers worldwide.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/rfq"
              className="rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:-translate-y-1 hover:shadow-xl"
            >
              Request a Quote
            </Link>

            <Link
              href="/products"
              className="rounded-2xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              Browse Products
            </Link>

          </div>

        </div>

      </Container>

    </section>
  );
}