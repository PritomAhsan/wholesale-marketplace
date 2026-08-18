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

      <div className="hidden h-12 items-center gap-2 rounded-2xl bg-slate-100 px-4 lg:flex">

        <ArrowDownWideNarrow className="h-4 w-4 text-sapphire" />

        <span className="text-sm font-semibold text-slate-700">
          Sort By
        </span>

      </div>

      <Select value={sort} onValueChange={handleChange}>

        <SelectTrigger
          className="
            h-12
            w-full
            rounded-2xl
            border-slate-200
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
