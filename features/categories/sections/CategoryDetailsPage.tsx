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
    <section className="py-10">
      <Container>
        {/* Compact intro */}

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

        {/* Toolbar */}

        <div className="mt-8">
          <ProductToolbar
            total={pagination.total}
            categories={categories}
            brands={brands}
            hideCategories
          />
        </div>

        {/* Content */}

        <div className="mt-8 grid gap-8 xl:grid-cols-[280px_1fr]">
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <ProductFilters categories={categories} brands={brands} hideCategories />
            </div>
          </aside>

          <div>
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
  );
}
