import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Package, ShieldCheck, Star } from "lucide-react";

import Container from "@/components/layout/Container";
import ProductToolbar from "@/features/products/components/ProductToolbar";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductGridWithCompare from "@/features/products/components/ProductGridWithCompare";
import Pagination from "@/features/products/components/Pagination";
import NoResultsState from "@/features/products/components/NoResultsState";
import { fetchSellerProfile } from "@/features/sellers/api";
import { fetchCategories } from "@/features/categories/api";
import { fetchBrands } from "@/features/products/brandsApi";
import TrustBadges from "@/features/sellers/components/TrustBadges";
import FollowButton from "@/features/sellers/components/FollowButton";
import StoreReviewsSection from "@/features/sellers/components/StoreReviewsSection";

interface Props {
  params: Promise<{ sellerId: string }>;
  searchParams: Promise<{
    page?: string;
    brand?: string;
    min_price?: string;
    max_price?: string;
    min_moq?: string;
    max_moq?: string;
    in_stock?: string;
    sort?: string;
  }>;
}

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  manufacturer: "Manufacturer",
  wholesaler: "Wholesaler",
  distributor: "Distributor",
  exporter: "Exporter",
  retailer: "Retailer",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sellerId } = await params;
  return { title: `Seller ${sellerId}` };
}

export default async function SellerProfilePage({ params, searchParams }: Props) {
  const { sellerId } = await params;
  const sp = await searchParams;

  const [data, categories, brands] = await Promise.all([
    fetchSellerProfile(sellerId, {
      page: sp.page ? Number(sp.page) : undefined,
      per_page: 20,
      brand: sp.brand,
      min_price: sp.min_price ? Number(sp.min_price) : undefined,
      max_price: sp.max_price ? Number(sp.max_price) : undefined,
      min_moq: sp.min_moq ? Number(sp.min_moq) : undefined,
      max_moq: sp.max_moq ? Number(sp.max_moq) : undefined,
      in_stock: sp.in_stock === "1" ? true : undefined,
      sort: sp.sort,
    }),
    fetchCategories(),
    fetchBrands(),
  ]);

  if (!data) {
    notFound();
  }

  const { seller, listings, pagination } = data;

  const memberSinceYear = new Date(seller.memberSince).getFullYear();

  return (
    <>
      <section className="border-b border-border bg-white py-12">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-obsidian text-lg font-bold text-white">
                {seller.sellerId.slice(-2)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-obsidian">
                    {seller.sellerId}
                  </h1>

                  {seller.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sapphire-soft px-3 py-1 text-xs font-semibold text-sapphire-strong">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-obsidian/60">
                  {BUSINESS_TYPE_LABELS[seller.businessType] ?? seller.businessType}
                  {" · "}
                  On Bulkare since {memberSinceYear}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm text-obsidian/70">
                <Package className="h-4 w-4 text-sapphire" />
                {seller.listingsCount} active listing{seller.listingsCount === 1 ? "" : "s"}
              </div>

              <FollowButton sellerId={seller.sellerId} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            {seller.storeRating !== null && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(seller.storeRating ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-obsidian">
                  {seller.storeRating.toFixed(1)}
                </span>
                <span className="text-sm text-obsidian/50">
                  ({seller.reviewsCount} review{seller.reviewsCount === 1 ? "" : "s"})
                </span>
              </div>
            )}

            {seller.completedOrderCount > 0 && (
              <span className="text-sm text-obsidian/50">
                {seller.completedOrderCount} completed order
                {seller.completedOrderCount === 1 ? "" : "s"}
              </span>
            )}
          </div>

          <div className="mt-4">
            <TrustBadges badges={seller.badges} />
          </div>

          {seller.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {seller.categories.map((category) => (
                <span
                  key={category.uuid}
                  className="rounded-full border border-border bg-ivory px-3 py-1 text-xs font-medium text-obsidian/70"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-start gap-2 rounded-xl bg-champagne-soft/40 px-4 py-3 text-xs text-obsidian/60">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
            This is a protected Seller ID. Bulkare privately verifies the
            legal business behind every account — identity is disclosed
            only where required for payments, tax, invoicing, disputes,
            regulators or applicable law.
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <h2 className="mb-6 text-lg font-semibold text-obsidian">
            Listings from this seller
          </h2>

          {listings.length === 0 && pagination.total === 0 ? (
            <p className="text-sm text-obsidian/50">
              This seller has no published listings right now.
            </p>
          ) : (
            <>
              <ProductToolbar
                total={pagination.total}
                categories={categories}
                brands={brands}
                hideCategories
              />

              <div className="mt-8 grid gap-8 xl:grid-cols-[280px_1fr]">
                <aside className="hidden xl:block">
                  <div className="sticky top-24">
                    <ProductFilters categories={categories} brands={brands} hideCategories />
                  </div>
                </aside>

                <div>
                  {listings.length > 0 ? (
                    <>
                      <ProductGridWithCompare products={listings} />

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
            </>
          )}
        </Container>
      </section>

      <section className="border-t border-border py-12">
        <Container>
          <StoreReviewsSection sellerId={seller.sellerId} />
        </Container>
      </section>
    </>
  );
}
