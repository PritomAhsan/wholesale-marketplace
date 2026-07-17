"use client";

import Container from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/section-heading";
import Pagination from "@/features/products/components/Pagination";

import ProductBreadcrumb from "@/features/products/components/ProductBreadcrumb";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductGrid from "@/features/products/components/ProductGrid";
import ProductToolbar from "@/features/products/components/ProductToolbar";
import { products } from "@/features/products/data/products";

export default function ProductsPage() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-12">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-3xl" />

        <div className="absolute right-0 top-80 h-[450px] w-[450px] rounded-full bg-indigo-100/40 blur-3xl" />

      </div>

      <Container className="relative">

        {/* Breadcrumb */}

        <ProductBreadcrumb />

        {/* Hero */}

        <div className="mt-8 overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-8 py-14 text-white shadow-[0_30px_80px_rgba(15,23,42,.30)] lg:px-14">

          <div className="max-w-4xl">

            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              B2B Marketplace
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight lg:text-6xl">
              Discover Premium
              <span className="block text-blue-400">
                Wholesale Products
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Compare suppliers, request quotations, negotiate pricing,
              and source products from trusted manufacturers worldwide.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur">

                <h3 className="text-3xl font-black">
                  {products.length}+
                </h3>

                <p className="mt-1 text-sm text-slate-300">
                  Products
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur">

                <h3 className="text-3xl font-black">
                  25K+
                </h3>

                <p className="mt-1 text-sm text-slate-300">
                  Suppliers
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur">

                <h3 className="text-3xl font-black">
                  180+
                </h3>

                <p className="mt-1 text-sm text-slate-300">
                  Countries
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Heading */}

        {/* <div className="mt-20">

          <SectionHeading
            badge="Marketplace"
            title="Explore Wholesale Products"
            description="Browse premium wholesale products from verified suppliers across electronics, fashion, machinery, home, industrial and many more categories."
          />

        </div> */}

        {/* Toolbar */}

        <div className="mt-14">

          <ProductToolbar total={products.length} />

        </div>

        {/* Content */}

        <div className="mt-10 grid gap-8 xl:grid-cols-[320px_1fr]">

          {/* Filters */}

          <aside className="hidden xl:block">

            <div className="sticky top-24">

              <ProductFilters />

            </div>

          </aside>

          {/* Products */}

          <div>

            <ProductGrid products={products} />

            <Pagination
              currentPage={1}
              totalPages={12}
              totalResults={248}
              perPage={20}
            />

          </div>

        </div>

      </Container>

    </section>
  );
}