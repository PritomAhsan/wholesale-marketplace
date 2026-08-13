"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Heart,
  Star,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

interface Props {
  slug: string;
  name: string;
  image: string;
  supplier: string;
  price: string;
  moq: number;
}

export default function ProductCard({
  slug,
  name,
  image,
  supplier,
  price,
  moq,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">

      {/* Image */}

      <div className="relative h-44 overflow-hidden">

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Wishlist */}

        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/95 shadow transition hover:bg-blue-600 hover:text-white">

          <Heart className="h-4 w-4" />

        </button>

        {/* Verified */}

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 shadow">

          <BadgeCheck className="h-3.5 w-3.5 text-blue-600" />

          <span className="text-[11px] font-bold text-slate-800">
            VERIFIED
          </span>

        </div>

      </div>

      {/* Content */}

      <div className="space-y-3 p-4">

        <div className="flex items-center gap-1 text-xs">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-slate-700">4.9</span>
        </div>

        <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 transition group-hover:text-blue-600">
          {name}
        </h3>

        <p className="truncate text-sm text-slate-500">
          {supplier}
        </p>

        {/* Price + MOQ */}

        <div className="flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Starting From
            </p>
            <p className="text-lg font-black text-blue-600">
              {price}
            </p>
          </div>

          <p className="text-xs text-slate-500">
            MOQ <span className="font-semibold text-slate-700">{moq}</span>
          </p>
        </div>

        {/* Action */}

        <Link href={`/products/${slug}`}>
          <AppButton className="w-full justify-center" size="sm">
            View Product
          </AppButton>
        </Link>

      </div>

    </div>
  );
}