"use client";

import { Search } from "lucide-react";

export default function HeroSearch() {
  return (
    <div className="relative mx-auto mt-10 max-w-3xl">

      <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

      <input
        className="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-lg shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        placeholder="Search products, suppliers, brands..."
      />

    </div>
  );
}