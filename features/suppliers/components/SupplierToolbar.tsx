"use client";

import SearchInput from "@/features/products/components/SearchInput";

interface Props {
  total: number;
}

export default function SupplierToolbar({
  total,
}: Props) {
  return (
    <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-6">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            Suppliers
          </h2>

          <p className="mt-2 text-slate-500">
            Browse {total} verified suppliers worldwide.
          </p>

        </div>

        <div className="w-full lg:w-[420px]">
          <SearchInput placeholder="Search suppliers..." />
        </div>

      </div>

    </div>
  );
}