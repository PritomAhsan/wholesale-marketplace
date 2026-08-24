"use client";

import { useEffect, useState } from "react";

import { Product, ProductVariant } from "../data/products";

import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import PriceCard from "../components/PriceCard";
import ProductSupplierSnapshot from "../components/ProductSupplierSnapshot";
import ProductTabs from "../components/ProductTabs";
import { useRecentlyViewed } from "@/features/recently-viewed/RecentlyViewedContext";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.find((v) => v.isDefault) ?? product.variants[0] ?? null
  );

  const { recordView, hydrated } = useRecentlyViewed();

  useEffect(() => {
    // Wait for the provider to finish reading localStorage first — recording
    // before that completes would have its own update overwritten by the
    // provider's hydration read landing right after it.
    if (!hydrated) return;

    recordView(product);
    // Only re-record if the buyer actually navigates to a different
    // product — recordView itself is stable but re-runs would otherwise
    // needlessly reorder the list on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.uuid, hydrated]);

  return (
    <section className="py-2 lg:py-4">
      {/* The price rail spans both rows below (row-span-2) so it stays
          sticky alongside the product-information sections too, not just
          the hero row — and those sections are placed in the same two
          columns as the gallery + info, so their width lines up instead of
          stretching under the price rail. */}
      <div className="grid gap-8 xl:grid-cols-[1.15fr_1fr_360px] xl:grid-rows-[auto_auto]">
        {/* Gallery + Product Information — one shared card instead of two
            separate floating boxes, so the left/center area reads as a
            single cohesive block next to the price rail. */}
        <div className="min-w-0 rounded-2xl border border-border bg-white p-6 shadow-sm xl:col-start-1 xl:col-span-2 xl:row-start-1">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Gallery */}
            <div className="min-w-0 space-y-4">
              <ProductGallery product={product} variant={selectedVariant} />

              {product.sellerId && (
                <ProductSupplierSnapshot sellerId={product.sellerId} />
              )}
            </div>

            {/* Product Information */}
            <div className="min-w-0">
              <ProductInfo
                product={product}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />
            </div>
          </div>
        </div>

        {/* Price Card — sticky across the full height of both rows. The
            offset clears the site's sticky header (promo bar + search row +
            category row, ~160px on desktop) so the card's top edge doesn't
            render underneath it. */}
        <div className="min-w-0 xl:col-start-3 xl:row-start-1 xl:row-span-2">
          <div className="sticky top-20 lg:top-[172px]">
            <PriceCard product={product} variant={selectedVariant} />
          </div>
        </div>

        {/* Product Information sections — same width as gallery + info */}
        <div className="min-w-0 xl:col-start-1 xl:col-span-2 xl:row-start-2">
          <ProductTabs product={product} />
        </div>
      </div>
    </section>
  );
}
