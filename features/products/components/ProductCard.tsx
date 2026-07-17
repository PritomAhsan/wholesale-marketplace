"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
// import ProductQuickView from "@/components/product/ProductQuickView";
import { Product } from "../data/products";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-blue-300 hover:shadow-2xl">
      {/* Image */}

      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={700}
          height={520}
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Category */}

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-700 shadow-lg">
          {product.category}
        </span>

        {/* Wishlist */}

        <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 shadow-lg transition hover:bg-blue-600 hover:text-white">
          <Heart className="h-5 w-5" />
        </button>

        {/* Price */}

        <div className="absolute bottom-4 left-4 rounded-2xl bg-blue-600 px-4 py-2 text-white shadow-xl">
          <p className="text-xs opacity-80">Starting From</p>

          <h3 className="text-xl font-black">${product.price}</h3>
        </div>
      </div>

      {/* Content */}

      <div className="space-y-6 p-6">
        {/* Rating */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

            <span className="font-bold">{product.rating}</span>

            <span className="text-sm text-slate-500">(128 Reviews)</span>
          </div>

          {product.verified && (
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-xs font-bold text-green-700">
              <BadgeCheck className="h-4 w-4" />
              Verified
            </div>
          )}
        </div>

        {/* Title */}

        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="line-clamp-2 text-xl font-bold leading-8 transition group-hover:text-blue-600">
              {product.name}
            </h3>
          </Link>

          <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">
            {product.shortDescription}
          </p>
        </div>

        {/* Supplier */}

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg">
              {product.supplier.charAt(0)}
            </div>

            <div className="flex-1">
              <h4 className="font-bold">{product.supplier}</h4>

              <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />

                {product.country}
              </div>
            </div>

            <ShieldCheck className="h-6 w-6 text-green-500" />
          </div>
        </div>

        {/* Info */}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              MOQ
            </p>

            <p className="mt-2 text-2xl font-black">{product.moq}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Stock
            </p>

            <p className="mt-2 text-2xl font-black text-green-600">Ready</p>
          </div>
        </div>

        {/* Actions */}

        <div className="grid grid-cols-2 gap-3">
          {/* <ProductQuickView product={product}> */}
            <AppButton className="w-full justify-center">
              Quick View
              <ArrowRight className="ml-2 h-4 w-4" />
            </AppButton>
          {/* </ProductQuickView> */}

          <Link href={`/products/${product.slug}`}>
            <AppButton variant="secondary" className="w-full justify-center">
              View Details
            </AppButton>
          </Link>
        </div>

        <AppButton variant="ghost" className="mt-3 w-full justify-center">
          <MessageSquare className="mr-2 h-4 w-4" />
          Send RFQ
        </AppButton>
      </div>
    </div>
  );
}
