"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

interface Category {
  id: number;
  slug: string;
  name: string;
}

interface Props {
  categories: Category[];
}

const STORE_NEEDS = [
  "General restock",
  "New store opening",
  "Seasonal inventory",
  "Clearance replacement",
];

export default function RestockPlannerForm({ categories }: Props) {
  const [storeNeed, setStoreNeed] = useState(STORE_NEEDS[0]);
  const [budget, setBudget] = useState("");
  const [zip, setZip] = useState("");
  const [requiredBy, setRequiredBy] = useState("");
  const [shortlist, setShortlist] = useState<Category[] | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // A lightweight heuristic pick, not a personalization engine —
    // gives the buyer a starting shortlist to review and edit, never
    // an implied automatic purchase.
    const picked = categories.slice(0, 4);
    setShortlist(picked);
  }

  const previewCategories = categories.slice(0, 3);

  if (shortlist) {
    return (
      <div>
        <div className="flex items-center gap-2 text-sapphire">
          <Check className="h-5 w-5" />
          <p className="font-semibold">Suggested categories saved to review</p>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {shortlist.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-obsidian transition hover:border-sapphire hover:text-sapphire"
            >
              {category.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShortlist(null)}
          className="mt-5 text-sm font-medium text-obsidian/50 hover:text-obsidian"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-obsidian">
          Store need
        </label>
        <select
          value={storeNeed}
          onChange={(e) => setStoreNeed(e.target.value)}
          className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-sapphire"
        >
          {STORE_NEEDS.map((need) => (
            <option key={need} value={need}>
              {need}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-obsidian">
          Target budget (USD)
        </label>
        <input
          type="number"
          min={0}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. 5000"
          className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-sapphire"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-obsidian">
          Delivery ZIP
        </label>
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="e.g. 36601"
          className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-sapphire"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-obsidian">
          Required by
        </label>
        <input
          type="date"
          value={requiredBy}
          onChange={(e) => setRequiredBy(e.target.value)}
          className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-sapphire"
        />
      </div>

      {previewCategories.length > 0 && (
        <div className="rounded-xl bg-sapphire-soft px-4 py-3 text-xs sm:col-span-2">
          <p className="font-semibold uppercase tracking-wide text-sapphire-strong">
            Shortlist preview
          </p>
          <p className="mt-1 font-medium text-obsidian">
            {previewCategories.map((c) => c.name).join(" · ")}
          </p>
        </div>
      )}

      <div className="sm:col-span-2">
        <AppButton type="submit" variant="primary" className="w-full justify-center">
          Build my shortlist
        </AppButton>
      </div>
    </form>
  );
}
