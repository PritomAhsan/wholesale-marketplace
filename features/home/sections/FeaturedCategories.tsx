import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import CategoryCard from "../components/CategoryCard";
import { fetchFeaturedCategories } from "../api";

export default async function FeaturedCategories() {
  const featuredCategories = await fetchFeaturedCategories();

  return (
    <section className="bg-ivory py-16">
      <Container>
        {/* Gradient-bordered card — translates the client reference's
            purple gradient-outline density into Bulkare's own palette
            instead of copying the color literally. */}
        <div
          className="rounded-3xl p-[1.5px]"
          style={{
            background:
              "linear-gradient(120deg, var(--sapphire) 0%, var(--champagne) 50%, var(--sapphire) 100%)",
          }}
        >
          <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-sapphire">
                  Inventory directory
                </p>
                <h2 className="mt-2 text-2xl font-bold text-obsidian">
                  Shop by category
                </h2>
                <p className="mt-1.5 text-sm text-obsidian/60">
                  Start with the products your business needs most.
                </p>
              </div>

              <Link
                href="/categories"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-sapphire hover:text-sapphire-strong"
              >
                View all categories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
