import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/section-heading";

import ProductCard from "../components/ProductCard";
import { fetchFeaturedProducts } from "../api";

export default async function FeaturedProducts() {
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <section className="relative overflow-hidden py-24">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

      </div>

      <Container className="relative">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <SectionHeading
            badge="Featured Products"
            title="Trending Wholesale Products"
            description="Explore high-demand wholesale products sourced directly from trusted manufacturers and verified suppliers around the globe."
          />

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-xl"
          >
            Browse All Products

            <ArrowRight className="h-5 w-5" />

          </Link>

        </div>

        {/* Products */}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}

        </div>

        {/* Bottom CTA */}

        <div className="mt-20 rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-center shadow-2xl">

          <h3 className="text-3xl font-bold text-white">
            Looking for Something Specific?
          </h3>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Submit your RFQ and receive competitive quotations from multiple
            verified suppliers within hours.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/rfq"
              className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
            >
              Submit RFQ
            </Link>

            <Link
              href="/products"
              className="rounded-2xl border border-slate-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-slate-900"
            >
              Explore Products
            </Link>

          </div>

        </div>

      </Container>

    </section>
  );
}