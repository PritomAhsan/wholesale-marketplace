"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { fetchSellerProfile } from "@/features/sellers/api";
import { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface Props {
  sellerId: string;
  currentProductUuid: string;
}

export default function SupplierOtherProducts({
  sellerId,
  currentProductUuid,
}: Props) {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchSellerProfile(sellerId, { per_page: 8 }).then((data) => {
      if (cancelled) return;

      const listings = (data?.listings ?? []).filter(
        (p) => p.uuid !== currentProductUuid
      );

      setProducts(listings.slice(0, 4));
    });

    return () => {
      cancelled = true;
    };
  }, [sellerId, currentProductUuid]);

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-obsidian sm:text-3xl">
            More from {sellerId}
          </h2>
          <p className="mt-2 text-obsidian/50">
            Other wholesale listings from this supplier.
          </p>
        </div>

        <Link
          href={`/sellers/${sellerId}`}
          className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-sapphire hover:text-sapphire-strong sm:inline-flex"
        >
          View store
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.uuid} product={product} />
        ))}
      </div>
    </section>
  );
}
