"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

interface Props {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = "Search products by name, SKU or description...",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    value ? params.set("search", value) : params.delete("search");
    params.delete("page");

    const target = pathname === "/products" ? pathname : "/products";

    router.push(`${target}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">

      <div className="group flex overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

        {/* Left */}

        <div className="flex items-center gap-3 px-5">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">

            <Search className="h-5 w-5 text-white" />

          </div>

        </div>

        {/* Input */}

        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="
            h-16
            flex-1
            border-0
            bg-transparent
            px-1
            text-[15px]
            font-medium
            text-slate-900
            placeholder:text-slate-400
            outline-none
          "
        />

        {/* Right */}

        <div className="hidden items-center pr-3 lg:flex">

          <button
            type="submit"
            className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
          >
            Search
          </button>

        </div>

      </div>

    </form>
  );
}
