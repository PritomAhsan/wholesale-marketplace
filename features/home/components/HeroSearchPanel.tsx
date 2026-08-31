"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Package, Search, ShieldCheck, Truck } from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

const MODES = [
  { key: "products", label: "Products" },
  { key: "rfq", label: "RFQ" },
] as const;

// Only claims the platform can actually back today — no "secure payments"
// badge, since checkout doesn't collect real payment yet (Phase 14 is still
// pending a gateway).
const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Verified suppliers" },
  { icon: Package, label: "Real wholesale MOQs" },
  { icon: Truck, label: "Live order tracking" },
] as const;

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

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sapphire">
        Private B2B Wholesale Marketplace
      </p>

      <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-obsidian md:text-4xl">
        Restock your business with greater control.
      </h1>

      <div className="mt-5 flex shrink-0 items-center gap-1">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-bold transition ${
              mode === m.key
                ? "text-sapphire"
                : "text-obsidian/40 hover:text-obsidian"
            }`}
          >
            {m.label}
            {mode === m.key && (
              <span className="mx-auto mt-1 block h-0.5 w-6 rounded-full bg-sapphire" />
            )}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-2">
        <div className="flex items-center overflow-hidden rounded-2xl border-2 border-sapphire/25 bg-white shadow-[0_0_0_5px_var(--sapphire-soft)] transition-shadow focus-within:border-sapphire/50 focus-within:shadow-[0_0_0_5px_var(--sapphire-soft),0_8px_24px_-8px_var(--sapphire)]">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={mode === "rfq"}
              placeholder={
                mode === "rfq"
                  ? "Start a request for quotation"
                  : "Search product, brand or UPC"
              }
              className="h-14 w-full border-none bg-transparent pl-12 pr-2 text-sm outline-none disabled:text-obsidian/40 md:text-base"
            />
          </div>

          <button
            type="submit"
            className="relative m-1.5 flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-l from-cta via-cta to-cta-strong px-6 text-sm font-semibold text-white shadow-md shadow-cta/25 transition-all hover:shadow-lg hover:shadow-cta/40 before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:skew-x-12 before:-translate-x-[150%] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[350%]"
          >
            <Search className="h-4 w-4" />
            {mode === "rfq" ? "Start" : "Search"}
          </button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 text-xs font-medium text-obsidian/60"
          >
            <Icon className="h-4 w-4 text-sapphire" />
            {label}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
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
