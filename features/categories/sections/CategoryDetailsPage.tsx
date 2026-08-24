import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";

import ProductToolbar from "@/features/products/components/ProductToolbar";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductGridWithCompare from "@/features/products/components/ProductGridWithCompare";
import Pagination from "@/features/products/components/Pagination";
import NoResultsState from "@/features/products/components/NoResultsState";
import { Product } from "@/features/products/data/products";
import { Brand } from "@/features/products/brandsApi";

import { Category } from "../data/categories";
import { categoryAbbreviation, categoryTint } from "../utils/categoryBadge";
import { categoryIcon } from "../utils/categoryIcon";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Props {
  category: Category;
  products: Product[];
  pagination: Pagination;
  categories: Category[];
  brands: Brand[];
}

export default function CategoryDetailsPage({
  category,
  products,
  pagination,
  categories,
  brands,
}: Props) {
  const tint = categoryTint(category.name);

  return (
    <>
      {/* Header band — distinct wash separates category intro from the
          product listing below instead of both sitting on the same flat
          background. */}

      <section
        className="border-b border-border py-10"
        style={{
          background:
            "linear-gradient(135deg, var(--sapphire-soft) 0%, var(--ivory) 55%, var(--champagne-soft) 100%)",
        }}
      >
        <Container>
          <div className="flex items-center gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-base font-bold"
              style={{ backgroundColor: tint.bg, color: tint.fg }}
            >
              {categoryAbbreviation(category.name)}
            </span>

            <div>
              <h1 className="text-2xl font-bold text-obsidian sm:text-3xl">
                {category.name}
              </h1>
              {category.description && (
                <p className="mt-1 text-sm text-obsidian/60">
                  {category.description}
                </p>
              )}
            </div>
          </div>

          {/* Subcategories — parent categories are groupings; the real
              products live on these children, so surface them as a real
              browsing path rather than leaving the buyer on an empty grid. */}

          {category.children.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-obsidian/70">
                Browse {category.name} by subcategory
              </h2>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {category.children.map((child) => {
                  const childTint = categoryTint(child.name);
                  const Icon = categoryIcon(child.name);

                  return (
                    <Link
                      key={child.slug}
                      href={`/categories/${child.slug}`}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-white p-3.5 transition hover:border-sapphire hover:shadow-sm"
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: childTint.bg }}
                      >
                        <Icon className="h-5 w-5" style={{ color: childTint.fg }} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-semibold text-obsidian group-hover:text-sapphire">
                          {child.name}
                        </p>
                        <p className="text-xs text-obsidian/40">
                          {child.products.toLocaleString()} products
                        </p>
                      </div>

                      <ArrowRight className="h-4 w-4 shrink-0 text-obsidian/20 transition group-hover:translate-x-0.5 group-hover:text-sapphire" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white py-8">
        <Container>
          {/* Toolbar */}

          <ProductToolbar
            total={pagination.total}
            categories={categories}
            brands={brands}
            hideCategories
          />

          {/* Content */}

          <div className="mt-8 grid gap-8 xl:grid-cols-[280px_1fr]">
            <aside className="hidden xl:block">
              <div className="sticky top-20 lg:top-[172px]">
                <ProductFilters categories={categories} brands={brands} hideCategories />
              </div>
            </aside>

            <div className="min-w-0">
              {products.length > 0 ? (
                <>
                  <ProductGridWithCompare products={products} />

                  <Pagination
                    currentPage={pagination.current_page}
                    totalPages={pagination.last_page}
                    totalResults={pagination.total}
                    perPage={pagination.per_page}
                  />
                </>
              ) : (
                <NoResultsState />
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
