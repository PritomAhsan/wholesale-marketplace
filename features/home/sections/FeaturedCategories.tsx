import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import CategoryCard from "../components/CategoryCard";
import { fetchFeaturedCategories } from "../api";

export default async function FeaturedCategories() {
  const featuredCategories = await fetchFeaturedCategories();

  return (
    <section
      className="border-b border-border py-16"
      style={{
        background:
          "linear-gradient(135deg, var(--sapphire-soft) 0%, var(--ivory) 45%, var(--champagne-soft) 100%)",
      }}
    >
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wide text-sapphire">
          Inventory directory
        </p>
        <h2 className="mt-2 text-2xl font-bold text-obsidian">
          Shop by category
        </h2>
        <p className="mt-1.5 text-sm text-obsidian/60">
          Start with the products your business needs most.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>

        <div className="mt-6 text-right">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sapphire hover:text-sapphire-strong"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
