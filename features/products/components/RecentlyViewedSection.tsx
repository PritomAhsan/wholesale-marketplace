"use client";

import { useRecentlyViewed } from "@/features/recently-viewed/RecentlyViewedContext";
import ProductCard from "./ProductCard";

interface Props {
  currentProductUuid: string;
}

export default function RecentlyViewedSection({ currentProductUuid }: Props) {
  const { items } = useRecentlyViewed();

  const products = items
    .filter((p) => p.uuid !== currentProductUuid)
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-obsidian sm:text-3xl">
          Recently Viewed
        </h2>
        <p className="mt-2 text-obsidian/50">
          Pick up where you left off browsing.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.uuid} product={product} />
        ))}
      </div>
    </section>
  );
}
