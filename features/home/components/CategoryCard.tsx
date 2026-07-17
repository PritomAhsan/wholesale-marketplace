"use client";

import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface Props {
  name: string;
  products: string;
  icon: LucideIcon;
}

export default function CategoryCard({
  name,
  products,
  icon: Icon,
}: Props) {
  return (
    <Link
      href="/categories"
      className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-blue-500 hover:shadow-2xl"
    >
      {/* Background Gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Decorative Circle */}

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100/50 transition-all duration-500 group-hover:scale-150 group-hover:bg-blue-200/60" />

      <div className="relative">

        {/* Icon */}

        <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

          <Icon className="h-8 w-8 text-white" />

        </div>

        {/* Content */}

        <h3 className="mt-8 text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
          {name}
        </h3>

        <p className="mt-3 text-base leading-7 text-slate-600">
          {products} available from verified suppliers.
        </p>

        {/* Stats */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Products
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {products}
            </p>

          </div>

          <div className="rounded-full bg-slate-100 p-3 transition-all duration-300 group-hover:bg-blue-600">

            <ArrowRight className="h-5 w-5 text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Verified
          </span>

          <span className="text-sm font-semibold text-blue-600 transition-all group-hover:translate-x-1">
            Explore →
          </span>

        </div>

      </div>

    </Link>
  );
}