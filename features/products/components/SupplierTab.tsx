"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck, Boxes, Factory } from "lucide-react";

import { Product } from "../data/products";
import { fetchSellerProfile, SellerProfile } from "@/features/sellers/api";

interface Props {
  product: Product;
}

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  manufacturer: "Manufacturer",
  wholesaler: "Wholesaler",
  distributor: "Distributor",
  exporter: "Exporter",
  retailer: "Retailer",
};

export default function SupplierTab({ product }: Props) {
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product.sellerId) {
      setLoading(false);
      return;
    }

    fetchSellerProfile(product.sellerId).then((data) => {
      setSeller(data?.seller ?? null);
      setLoading(false);
    });
  }, [product.sellerId]);

  if (loading) {
    return (
      <div className="h-48 animate-pulse rounded-3xl border border-slate-200 bg-slate-50" />
    );
  }

  if (!seller) {
    return (
      <p className="text-sm text-slate-500">
        Seller information is not available for this listing.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/* Supplier Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-obsidian text-2xl font-bold text-white">
              {seller.sellerId.slice(-2)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-3xl font-bold text-slate-900">
                  {seller.sellerId}
                </h3>

                {seller.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    <BadgeCheck className="h-4 w-4" />
                    Verified
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  {BUSINESS_TYPE_LABELS[seller.businessType] ?? seller.businessType}
                </span>

                <span className="flex items-center gap-2">
                  <Boxes className="h-4 w-4" />
                  {seller.listingsCount} active listing{seller.listingsCount === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>

          <Link
            href={`/sellers/${seller.sellerId}`}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sapphire hover:text-sapphire"
          >
            View full seller profile
          </Link>
        </div>

        <p className="mt-8 leading-8 text-slate-600">
          This listing is sold and fulfilled by a Bulkare-verified supplier
          under protected Seller ID {seller.sellerId}. Bulkare privately
          verifies the legal business behind this account; identity is
          disclosed only where required for payments, tax, invoicing,
          disputes, regulators or applicable law.
        </p>
      </div>

      {seller.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {seller.categories.map((category) => (
            <span
              key={category.uuid}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
