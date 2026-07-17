"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";

interface Props {
  name: string;
  location: string;
  rating: number;
  verified: boolean;
  years: number;
  products: number;
  image: string;
}

export default function SupplierCard({
  name,
  location,
  rating,
  verified,
  years,
  products,
  image,
}: Props) {
  return (
    <Link
      href="/suppliers"
      className="group block overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-blue-500 hover:shadow-2xl"
    >
      {/* Image */}

      <div className="relative h-64 overflow-hidden">

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

        {verified && (
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">

            <BadgeCheck className="h-4 w-4 text-blue-600" />

            <span className="text-xs font-bold text-slate-800">
              VERIFIED
            </span>

          </div>
        )}

        <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 backdrop-blur-md">

          <Star
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-semibold text-white">
            {rating}
          </span>

        </div>

      </div>

      {/* Content */}

      <div className="p-7">

        <div className="flex items-start justify-between gap-4">

          <div>

            <h3 className="text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">
              {name}
            </h3>

            <div className="mt-3 flex items-center gap-2 text-slate-500">

              <MapPin className="h-4 w-4" />

              <span className="text-sm">
                {location}
              </span>

            </div>

          </div>

          <div className="rounded-2xl bg-blue-50 p-3">

            <Globe2 className="h-6 w-6 text-blue-600" />

          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-2xl font-black text-slate-900">
              {products}
            </p>

            <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
              Products
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-2xl font-black text-slate-900">
              {years}+
            </p>

            <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
              Years
            </p>

          </div>

        </div>

        {/* Features */}

        <div className="mt-8 space-y-3">

          <div className="flex items-center gap-3 text-sm text-slate-600">

            <ShieldCheck className="h-4 w-4 text-green-600" />

            <span>Trade Assurance Available</span>

          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">

            <BadgeCheck className="h-4 w-4 text-blue-600" />

            <span>Factory Verified Supplier</span>

          </div>

        </div>

        {/* Button */}

        <div className="mt-8 flex items-center justify-between rounded-2xl bg-slate-100 px-5 py-4 transition duration-300 group-hover:bg-blue-600">

          <span className="font-semibold text-slate-900 transition group-hover:text-white">
            Visit Supplier
          </span>

          <ArrowRight className="h-5 w-5 text-slate-900 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />

        </div>

      </div>

    </Link>
  );
}