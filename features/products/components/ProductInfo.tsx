"use client";

import {
  BadgeCheck,
  Heart,
  Share2,
  Star,
  MapPin,
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

        {product.verified && (
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
            <BadgeCheck className="h-4 w-4" />
            Verified Product
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex flex-wrap items-center gap-5 border-y border-slate-200 py-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-slate-900">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Building2 className="h-4 w-4" />
          <span>{product.supplier}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="h-4 w-4" />
          <span>{product.country}</span>
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