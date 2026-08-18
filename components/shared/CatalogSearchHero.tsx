"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface Props {
  eyebrow: string;
  headline: string;
  copy: string;
  placeholder?: string;
}

const POPULAR = ["Beverages", "Store supplies", "Low MOQ"];

export default function CatalogSearchHero({
  eyebrow,
  headline,
  copy,
  placeholder = "Product, brand or UPC",
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(
      query.trim()
        ? `/products?search=${encodeURIComponent(query.trim())}`
        : "/products"
    );
  }

  function handlePopular(term: string) {
    router.push(`/products?search=${encodeURIComponent(term)}`);
  }

  return (
    <div className="grid gap-6 rounded-xl bg-ivory p-6 lg:grid-cols-[1fr_340px] lg:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-sapphire">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-obsidian sm:text-3xl">
          {headline}
        </h1>
        <p className="mt-2 text-sm text-obsidian/60">{copy}</p>
      </div>

      <div className="rounded-xl border border-border bg-white p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-sapphire">
          Search the marketplace
        </p>

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="flex overflow-hidden rounded-lg border border-border">
            <div className="flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="h-10 w-full border-none bg-transparent px-2.5 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-sapphire px-4 text-sm font-semibold text-white transition-colors hover:bg-sapphire-strong"
            >
              Search
            </button>
          </div>
        </form>

        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-obsidian/40">
          Popular starting points
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {POPULAR.map((term) => (
            <button
              key={term}
              onClick={() => handlePopular(term)}
              className="rounded-full bg-ivory px-3 py-1 text-xs font-medium text-obsidian/70 transition hover:bg-sapphire-soft hover:text-sapphire-strong"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
