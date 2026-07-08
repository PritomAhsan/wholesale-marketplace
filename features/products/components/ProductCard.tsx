import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

import { Product } from "../data/products";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">

      {/* Image */}

      <div className="relative overflow-hidden">

        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={450}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}

        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow">
          {product.category}
        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Rating */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-1">

            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-medium">
              {product.rating}
            </span>

          </div>

          {product.verified && (
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">

              <BadgeCheck size={14} />

              Verified

            </div>
          )}

        </div>

        {/* Name */}

        <h3 className="mt-5 line-clamp-2 text-xl font-bold leading-7">
          {product.name}
        </h3>

        {/* Description */}

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {product.shortDescription}
        </p>

        {/* Supplier */}

        <div className="mt-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-lg font-bold text-white">

            {product.supplier.charAt(0)}

          </div>

          <div>

            <p className="font-semibold">
              {product.supplier}
            </p>

            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">

              <MapPin size={14} />

              {product.country}

            </div>

          </div>

        </div>

        {/* Price */}

        <div className="mt-8 flex items-end justify-between border-t border-slate-100 pt-6">

          <div>

            <p className="text-sm text-slate-500">
              Starting From
            </p>

            <div className="mt-1 flex items-end gap-1">

              <span className="text-3xl font-black text-blue-600">
                ${product.price}
              </span>

              <span className="pb-1 text-sm text-slate-500">
                / unit
              </span>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-slate-500">
              MOQ
            </p>

            <p className="text-lg font-bold">
              {product.moq}
            </p>

          </div>

        </div>

        {/* Actions */}

        <div className="mt-8 grid grid-cols-2 gap-3">

          <Link href={`/products/${product.slug}`}>

            <AppButton className="w-full">
              View Details
            </AppButton>

          </Link>

          <AppButton
            variant="outline"
            className="w-full"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Quote
          </AppButton>

        </div>

      </div>

    </div>
  );
}