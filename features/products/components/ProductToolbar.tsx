"use client";

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
    <div className="mb-8">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h3 className="text-2xl font-bold">
            Products
          </h3>

          <p className="text-slate-500">
            Showing {total} wholesale products
          </p>

        </div>

      </div>

      {/* Search */}

      <SearchInput />

      {/* Mobile */}

      <div className="mt-4 grid grid-cols-2 gap-4 lg:hidden">

        <MobileFilters />

        <SortDropdown />

      </div>

      {/* Desktop */}

      <div className="mt-4 hidden justify-end lg:flex">
        <SortDropdown />
      </div>

    </div>
  );
}