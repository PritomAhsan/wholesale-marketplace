"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

const MODES = [
  { key: "products", label: "Products" },
  { key: "rfq", label: "RFQ" },
] as const;

const POPULAR = ["Water", "Energy drinks", "Store supplies", "Low MOQ"];

export default function HeroSearchPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<(typeof MODES)[number]["key"]>("products");
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (mode === "rfq") {
      router.push("/rfq");
      return;
    }

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
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sapphire">
        Private B2B Wholesale Marketplace
      </p>

      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-obsidian">
        Restock your business with greater control.
      </h1>

      <p className="mt-4 max-w-lg text-sm leading-6 text-obsidian/60">
        Discover wholesale inventory, compare case economics and request
        qualified offers from privately verified suppliers.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="flex shrink-0 items-center gap-1 border-r border-border p-1">
            {MODES.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMode(m.key)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  mode === m.key
                    ? "bg-sapphire-soft text-sapphire-strong"
                    : "text-obsidian/50 hover:text-obsidian"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={mode === "rfq"}
              placeholder={
                mode === "rfq"
                  ? "Start a request for quotation"
                  : "Search product, brand or UPC"
              }
              className="h-11 w-full border-none bg-transparent pl-9 pr-2 text-sm outline-none disabled:text-obsidian/40"
            />
          </div>

          <button
            type="submit"
            className="bg-sapphire px-5 text-sm font-semibold text-white transition-colors hover:bg-sapphire-strong"
          >
            {mode === "rfq" ? "Start" : "Search"}
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-obsidian/30">
          Popular
        </span>
        {POPULAR.map((term) => (
          <button
            key={term}
            onClick={() => handlePopular(term)}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-obsidian/60 transition hover:border-sapphire hover:text-sapphire"
          >
            {term}
          </button>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/products">
          <AppButton variant="primary">
            Explore inventory
            <ArrowRight className="ml-2 h-4 w-4" />
          </AppButton>
        </Link>

        <Link href="/rfq">
          <AppButton variant="secondary">Request quotations</AppButton>
        </Link>
      </div>
    </div>
  );
}
