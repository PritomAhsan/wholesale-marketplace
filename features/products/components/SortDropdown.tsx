"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowDownWideNarrow,
  Sparkles,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_LABELS: Record<string, string> = {
  newest: "Newest Arrivals",
  price_asc: "Price: Low → High",
  price_desc: "Price: High → Low",
};

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "newest";

  function handleChange(value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-3">

      {/* Desktop Label */}

      <div className="hidden h-12 items-center gap-2 rounded-2xl bg-muted px-4 lg:flex">

        <ArrowDownWideNarrow className="h-4 w-4 text-sapphire" />

        <span className="text-sm font-semibold text-obsidian/70">
          Sort By
        </span>

      </div>

      <Select value={sort} onValueChange={handleChange} items={SORT_LABELS}>

        <SelectTrigger
          className="
            h-12
            w-full
            rounded-2xl
            border-border
            bg-white
            shadow-sm
            transition-all
            duration-300
            hover:border-sapphire
            hover:shadow-lg
            md:w-72
          "
        >

          <div className="flex items-center gap-2">

            <Sparkles className="h-4 w-4 text-sapphire" />

            <SelectValue />

          </div>

        </SelectTrigger>

        <SelectContent className="rounded-2xl">

          <SelectItem value="newest">
            Newest Arrivals
          </SelectItem>

          <SelectItem value="price_asc">
            Price: Low → High
          </SelectItem>

          <SelectItem value="price_desc">
            Price: High → Low
          </SelectItem>

        </SelectContent>

      </Select>

    </div>
  );
}
