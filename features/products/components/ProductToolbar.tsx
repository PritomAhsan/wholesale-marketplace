"use client";

import {
  Grid3X3,
  LayoutList,
  SlidersHorizontal,
} from "lucide-react";

import MobileFilters from "./MobileFilters";
import SearchInput from "./SearchInput";
import SortDropdown from "./SortDropdown";

interface Props {
  total: number;
}

export default function ProductToolbar({
  total,
}: Props) {
  return (
    <div className="mt-12">

      {/* Top */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

          {/* Left */}

          <div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Marketplace
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-900">
              Wholesale Products
            </h2>

            <p className="mt-2 text-slate-500">
              Showing
              <span className="mx-2 font-bold text-slate-900">
                {total}
              </span>
              verified wholesale products
            </p>

          </div>

          {/* Desktop Stats */}

          <div className="hidden items-center gap-4 lg:flex">

            <div className="rounded-2xl bg-slate-50 px-6 py-4">

              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Suppliers
              </p>

              <p className="mt-1 text-2xl font-black text-slate-900">
                25K+
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 px-6 py-4">

              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Countries
              </p>

              <p className="mt-1 text-2xl font-black text-slate-900">
                180+
              </p>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="mt-8">

          <SearchInput />

        </div>

      </div>

      {/* Bottom Toolbar */}

      <div className="mt-6 rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Electronics
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Verified
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Ready to Ship
            </span>

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            {/* View Switch */}

            <div className="hidden items-center rounded-2xl border border-slate-200 bg-slate-50 p-1 lg:flex">

              <button className="rounded-xl bg-white p-3 shadow-sm transition hover:bg-blue-50">

                <Grid3X3 className="h-5 w-5 text-blue-600" />

              </button>

              <button className="rounded-xl p-3 transition hover:bg-white">

                <LayoutList className="h-5 w-5 text-slate-500" />

              </button>

            </div>

            {/* Desktop Sort */}

            <div className="hidden lg:block">

              <SortDropdown />

            </div>

          </div>

        </div>

        {/* Mobile */}

        <div className="mt-5 grid grid-cols-2 gap-4 lg:hidden">

          <MobileFilters />

          <SortDropdown />

        </div>

      </div>

    </div>
  );
}