import Container from "@/components/layout/Container";
import CatalogSearchHero from "@/components/shared/CatalogSearchHero";

import { Category } from "../data/categories";

import CategoryGrid from "../components/CategoryGrid";
import CategoryDirectory from "../components/CategoryDirectory";
import RfqDesk from "@/features/home/sections/RfqDesk";

interface Props {
  categories: Category[];
}

export default function CategoriesPage({ categories }: Props) {
  return (
    <>
      <section className="py-10">
        <Container>
          <CatalogSearchHero
            eyebrow="Bulkare wholesale"
            headline="Find the right inventory for your store"
            copy="Search categories, products, brands or UPCs."
            placeholder="Product, brand or UPC"
          />

          <div
            className="mt-10 rounded-2xl border border-border p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, var(--sapphire-soft) 0%, var(--ivory) 45%, var(--champagne-soft) 100%)",
            }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-sapphire">
              Inventory directory
            </p>
            <h2 className="mb-1 text-2xl font-bold text-obsidian">
              Shop by category
            </h2>
            <p className="mb-6 text-sm text-obsidian/60">
              Start with the products your business needs most.
            </p>
            <CategoryGrid categories={categories} />
          </div>

          <CategoryDirectory categories={categories} />
        </Container>
      </section>

      <RfqDesk />
    </>
  );
}
