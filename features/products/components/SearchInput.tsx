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

    // Stay on the current listing (category, seller, or /products) — each
    // reads `search` from its own searchParams, so redirecting to /products
    // would drop whatever category/seller filter the buyer was already in.
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">

      <div className="group flex h-12 overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-colors duration-200 focus-within:border-sapphire">

        {/* Left */}

        <div className="flex items-center pl-4">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Input */}

        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="
            h-full
            flex-1
            border-0
            bg-transparent
            px-3
            text-sm
            font-medium
            text-obsidian
            placeholder:text-muted-foreground
            outline-none
          "
        />

        {/* Right */}

        <div className="hidden items-center pr-1.5 lg:flex">

          <button
            type="submit"
            className="h-9 rounded-xl bg-sapphire px-7 text-sm font-semibold text-white transition-colors hover:bg-sapphire-strong"
          >
            Search
          </button>

        </div>

      </div>

    </form>
  );
}
