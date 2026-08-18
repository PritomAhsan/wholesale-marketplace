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

      <div className="group flex overflow-hidden rounded-xl border border-border bg-white transition-colors duration-200 focus-within:border-sapphire">

        {/* Left */}

        <div className="flex items-center pl-5">
          <Search className="h-4.5 w-4.5 text-muted-foreground" />
        </div>

        {/* Input */}

        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="
            h-14
            flex-1
            border-0
            bg-transparent
            px-4
            text-sm
            font-medium
            text-obsidian
            placeholder:text-muted-foreground
            outline-none
          "
        />

        {/* Right */}

        <div className="hidden items-center pr-2 lg:flex">

          <button
            type="submit"
            className="rounded-lg bg-sapphire px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sapphire-strong"
          >
            Search
          </button>

        </div>

      </div>

    </form>
  );
}
