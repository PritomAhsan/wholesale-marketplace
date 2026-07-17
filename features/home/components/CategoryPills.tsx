"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { categories } from "../data/categories";

export default function CategoryPills() {
  return (
    <div className="mt-10">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Sparkles className="h-5 w-5 text-blue-600" />

          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700">
            Popular Categories
          </h3>

        </div>

        <Link
          href="/categories"
          className="hidden items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 md:flex"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>

      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">

        {categories.map((category, index) => (
          <button
            key={category}
            className={`group rounded-2xl border px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              index === 0
                ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <span className="flex items-center gap-2">

              {category}

              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

            </span>
          </button>
        ))}

      </div>

      {/* Mobile View All */}

      <div className="mt-6 flex justify-center md:hidden">

        <Link
          href="/categories"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
        >
          View All Categories
          <ArrowRight className="h-4 w-4" />
        </Link>

      </div>

    </div>
  );
}