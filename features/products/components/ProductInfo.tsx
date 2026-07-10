import {
  BadgeCheck,
  Globe,
  Heart,
  MapPin,
  MessageSquare,
  Package,
  ShieldCheck,
  Star,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { Product } from "../data/products";

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  return (
    <div className="flex h-full flex-col">

      {/* Category */}

      <div className="mb-4">
        <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          {product.category}
        </span>
      </div>

      {/* Product Name */}

      <h1 className="text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="mt-6 flex flex-wrap items-center gap-5">

        <div className="flex items-center gap-2">

          <Star
            className="fill-yellow-400 text-yellow-400"
            size={18}
          />

          <span className="font-semibold">
            {product.rating}
          </span>

          <span className="text-slate-500">
            (128 Reviews)
          </span>

        </div>

        {product.verified && (
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">

            <BadgeCheck size={16} />

            Verified Supplier

          </div>
        )}

      </div>

      {/* Description */}

      <p className="mt-8 text-lg leading-8 text-slate-600">
        {product.shortDescription}
      </p>

      {/* Info Grid */}

      <div className="mt-10 grid gap-5 rounded-3xl border border-slate-200 bg-white p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Package
              size={18}
              className="text-blue-600"
            />

            <span className="text-slate-500">
              MOQ
            </span>

          </div>

          <span className="font-semibold">
            {product.moq} Units
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <MapPin
              size={18}
              className="text-blue-600"
            />

            <span className="text-slate-500">
              Origin
            </span>

          </div>

          <span className="font-semibold">
            {product.country}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Globe
              size={18}
              className="text-blue-600"
            />

            <span className="text-slate-500">
              Supplier
            </span>

          </div>

          <span className="font-semibold">
            {product.supplier}
          </span>

        </div>

      </div>

      {/* Price */}

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-white shadow-xl">

        <p className="text-sm uppercase tracking-wider text-blue-100">
          Starting From
        </p>

        <div className="mt-2 flex items-end gap-2">

          <span className="text-5xl font-black">
            ${product.price}
          </span>

          <span className="pb-2 text-lg text-blue-100">
            / unit
          </span>

        </div>

      </div>

      {/* Trust Badges */}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">

          <ShieldCheck
            className="mx-auto mb-2 text-green-600"
            size={22}
          />

          <p className="text-sm font-semibold">
            Verified
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">

          <Package
            className="mx-auto mb-2 text-blue-600"
            size={22}
          />

          <p className="text-sm font-semibold">
            Ready to Ship
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">

          <BadgeCheck
            className="mx-auto mb-2 text-violet-600"
            size={22}
          />

          <p className="text-sm font-semibold">
            Trade Assurance
          </p>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">

        <AppButton
          size="lg"
          className="w-full"
        >
          <MessageSquare className="mr-2 h-5 w-5" />

          Request Quote
        </AppButton>

        <AppButton
          size="lg"
          variant="outline"
          className="w-full"
        >
          <Heart className="mr-2 h-5 w-5" />

          Save Product
        </AppButton>

      </div>

    </div>
  );
}