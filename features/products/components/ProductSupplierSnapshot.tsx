"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck, Boxes, Star } from "lucide-react";

import { fetchSellerProfile, SellerProfile } from "@/features/sellers/api";

interface Props {
  sellerId: string;
}

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  manufacturer: "Manufacturer",
  wholesaler: "Wholesaler",
  distributor: "Distributor",
  exporter: "Exporter",
  retailer: "Retailer",
};

export default function ProductSupplierSnapshot({ sellerId }: Props) {
  const [seller, setSeller] = useState<SellerProfile | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchSellerProfile(sellerId).then((data) => {
      if (!cancelled) setSeller(data?.seller ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [sellerId]);

  if (!seller) return null;

  return (
    <Link
      href={`/sellers/${seller.sellerId}`}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:border-sapphire/40 hover:shadow-sm"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-obsidian text-sm font-bold text-white">
        {seller.sellerId.slice(-2)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-semibold text-obsidian group-hover:text-sapphire">
            {seller.sellerId}
          </p>
          {seller.verified && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sapphire-soft px-2 py-0.5 text-[11px] font-semibold text-sapphire-strong">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-obsidian/50">
          <span>
            {BUSINESS_TYPE_LABELS[seller.businessType] ?? seller.businessType}
          </span>

          {seller.storeRating !== null && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-champagne text-champagne" />
              <span className="font-medium text-obsidian/70">
                {seller.storeRating.toFixed(1)}
              </span>
              ({seller.reviewsCount})
            </span>
          )}

          <span className="flex items-center gap-1">
            <Boxes className="h-3 w-3" />
            {seller.listingsCount} listing{seller.listingsCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <span className="shrink-0 text-xs font-semibold text-sapphire opacity-0 transition group-hover:opacity-100">
        View store →
      </span>
    </Link>
  );
}
