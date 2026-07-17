"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

interface Props {
  name: string;
  image: string;
  supplier: string;
  country: string;
  price: string;
  moq: number;
}

export default function ProductCard({
  name,
  image,
  supplier,
  country,
  price,
  moq,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-blue-500 hover:shadow-2xl">

      {/* Image */}

      <div className="relative h-72 overflow-hidden">

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

        {/* Wishlist */}

        <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110">

          <Heart className="h-5 w-5 text-slate-600" />

        </button>

        {/* Verified */}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">

          <BadgeCheck className="h-4 w-4 text-blue-600" />

          <span className="text-xs font-bold text-slate-800">
            VERIFIED
          </span>

        </div>

        {/* Rating */}

        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 backdrop-blur">

          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

          <span className="text-sm font-semibold text-white">
            4.9
          </span>

        </div>

      </div>

      {/* Content */}

      <div className="p-7">

        <h3 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
          {name}
        </h3>

        <p className="mt-3 font-medium text-slate-600">
          {supplier}
        </p>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

          <MapPin className="h-4 w-4" />

          {country}

        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Starting From
            </p>

            <h4 className="mt-2 text-2xl font-black text-blue-600">
              {price}
            </h4>

          </div>

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              MOQ
            </p>

            <h4 className="mt-2 text-2xl font-black text-slate-900">
              {moq}
            </h4>

          </div>

        </div>

        {/* Features */}

        <div className="mt-6 flex flex-wrap gap-2">

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Trade Assurance
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Ready to Ship
          </span>

        </div>

        {/* Actions */}

        <div className="mt-8 space-y-3">

          <AppButton className="w-full justify-between rounded-2xl">
            View Product

            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />

          </AppButton>

          <Link
            href="/rfq"
            className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 font-semibold text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
          >
            Request Quote
          </Link>

        </div>

      </div>

    </div>
  );
}