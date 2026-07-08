"use client";

import { Search } from "lucide-react";

interface Props {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = "Search products...",
}: Props) {
  return (
    <div className="relative w-full">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="search"
        placeholder="Search products, suppliers or categories..."
        className="
            h-12
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            pl-12
            pr-4

            shadow-sm

            transition-all

            placeholder:text-slate-400

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
        "
        />

    </div>
  );
}