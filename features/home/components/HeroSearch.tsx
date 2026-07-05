"use client";

import { Search } from "lucide-react";
import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";

export default function HeroSearch() {
  return (
    <div className="mt-8">
      <div className="flex overflow-hidden rounded-2xl border bg-white shadow-lg">
        <div className="flex flex-1 items-center px-5">
          <Search className="mr-3 h-5 w-5 text-slate-400" />

          <AppInput
            placeholder="Search products, suppliers or brands..."
            className="border-0 shadow-none focus-visible:ring-0"
          />
        </div>

        <AppButton
          className="m-2 rounded-xl px-8"
          size="lg"
        >
          Search
        </AppButton>
      </div>
    </div>
  );
}