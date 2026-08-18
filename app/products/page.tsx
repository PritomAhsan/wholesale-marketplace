import Container from "@/components/layout/Container";
import Pagination from "@/features/products/components/Pagination";

import CatalogSearchHero from "@/components/shared/CatalogSearchHero";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductGridWithCompare from "@/features/products/components/ProductGridWithCompare";
import ProductToolbar from "@/features/products/components/ProductToolbar";
import NoResultsState from "@/features/products/components/NoResultsState";
import InventoryLanesTabs from "@/features/home/components/InventoryLanesTabs";
import { fetchProducts } from "@/features/products/api";
import { fetchCategories } from "@/features/categories/api";
import { fetchBrands } from "@/features/products/brandsApi";
import { fetchInventoryLanes } from "@/features/home/api";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    brand?: string;
    min_price?: string;
    max_price?: string;
    min_moq?: string;
    max_moq?: string;
    in_stock?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page ?? 1);

  const hasActiveFilters = Boolean(
    params.search ||
      params.category ||
      params.brand ||
      params.min_price ||
      params.max_price ||
      params.min_moq ||
      params.max_moq ||
      params.in_stock ||
      currentPage > 1
  );

  const [{ products, pagination }, categories, brands, inventoryLanes] =
    await Promise.all([
      fetchProducts({
        page: currentPage,
        per_page: 20,
        search: params.search,
        category: params.category,
        brand: params.brand,
        min_price: params.min_price ? Number(params.min_price) : undefined,
        max_price: params.max_price ? Number(params.max_price) : undefined,
        min_moq: params.min_moq ? Number(params.min_moq) : undefined,
        max_moq: params.max_moq ? Number(params.max_moq) : undefined,
        in_stock: params.in_stock === "1" ? true : undefined,
        sort: params.sort,
      }),
      fetchCategories(),
      fetchBrands(),
      hasActiveFilters ? Promise.resolve(null) : fetchInventoryLanes(),
    ]);

  return (
    <section className="py-10">
      <Container>

        <CatalogSearchHero
          eyebrow="Bulkare wholesale"
          headline="Wholesale products ready for business buyers"
          copy="Compare case packs, minimums, lead times and verified seller terms."
        />

        {/* Merchandising rail — curated, so hidden once the buyer is filtering/searching */}

        {inventoryLanes &&
          (inventoryLanes.newThisWeek.length >= 4 || inventoryLanes.lowMoq.length >= 4) && (
            <div className="mt-8 rounded-xl border border-border bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sapphire">
                Current opportunities
              </p>
              <h2 className="mt-1 text-lg font-bold text-obsidian">
                Inventory selected for the way you buy
              </h2>
              <div className="mt-4">
                <InventoryLanesTabs
                  newThisWeek={inventoryLanes.newThisWeek}
                  lowMoq={inventoryLanes.lowMoq}
                />
              </div>
            </div>
          )}

        {/* Toolbar */}

        <div className="mt-10">
          <ProductToolbar total={pagination.total} categories={categories} brands={brands} />
        </div>

        {/* Content */}

        <div className="mt-8 grid gap-8 xl:grid-cols-[280px_1fr]">

          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <ProductFilters categories={categories} brands={brands} />
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
              <NoResultsState search={params.search} />
            )}
          </div>

        </div>

      </Container>
    </section>
  );
}
