"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Heart,
  Share2,
  Star,
  Tag,
  Package,
  Building2,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { Product } from "../data/products";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Tag className="h-4 w-4" />
        <span>{product.category}</span>
      </div>

      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold leading-tight text-slate-900 lg:text-4xl">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {product.verified && (
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              Verified Product
            </div>
          )}

          {product.averageRating !== null && product.reviewsCount > 0 && (
            <div className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900">
                {product.averageRating.toFixed(1)}
              </span>
              <span className="text-slate-400">
                ({product.reviewsCount} review{product.reviewsCount !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Seller */}
      <div className="flex flex-wrap items-center gap-5 border-y border-slate-200 py-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Building2 className="h-4 w-4" />
          {product.sellerId ? (
            <Link
              href={`/sellers/${product.sellerId}`}
              className="font-medium text-sapphire hover:text-sapphire-strong"
            >
              {product.supplier}
            </Link>
          ) : (
            <span>{product.supplier}</span>
          )}
        </div>
      </div>

      {/* MOQ */}
      <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
        <Package className="h-5 w-5 text-primary" />

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Minimum Order Quantity
          </p>

          <p className="text-lg font-semibold text-slate-900">
            {product.moq.toLocaleString()} Pieces
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">
          Short Description
        </h3>

        <p className="leading-7 text-slate-600">
          {product.shortDescription}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <AppButton variant="secondary">
          Send RFQ
        </AppButton>

        <AppButton variant="ghost">
          <Heart className="mr-2 h-4" />
          Wishlist
        </AppButton>

        <AppButton variant="ghost">
          <Share2 className="mr-2 h-4" />
          Share
        </AppButton>
      </div>
    </div>
  );
}