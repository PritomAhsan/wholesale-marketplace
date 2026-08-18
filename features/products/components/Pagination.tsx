"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { AppButton } from "@/components/ui/app-button";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalResults?: number;
  perPage?: number;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 1) return totalPages === 1 ? [1] : [];

  const delta = 1;
  const middle: number[] = [];
  for (
    let page = Math.max(2, currentPage - delta);
    page <= Math.min(totalPages - 1, currentPage + delta);
    page++
  ) {
    middle.push(page);
  }

  const pages: (number | "ellipsis")[] = [1];
  if (middle[0] > 2) pages.push("ellipsis");
  pages.push(...middle);
  if (middle[middle.length - 1] < totalPages - 1) pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 12,
  totalResults = 248,
  perPage = 20,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalResults);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="mt-16">

      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">

        {/* Desktop */}

        <div className="hidden items-center justify-between lg:flex">

          {/* Left */}

          <div>

            <p className="text-sm text-slate-500">
              Showing
              <span className="mx-2 font-bold text-slate-900">
                {start}-{end}
              </span>
              of
              <span className="mx-2 font-bold text-slate-900">
                {totalResults}
              </span>
              products
            </p>

          </div>

          {/* Center */}

          <div className="flex items-center gap-2">

            <AppButton
              variant="secondary"
              className="h-11 w-11 rounded-xl p-0"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </AppButton>

            {pageNumbers.map((page, index) =>
              page === "ellipsis" ? (
                <div
                  key={`ellipsis-${index}`}
                  className="flex h-11 w-11 items-center justify-center"
                >

                  <MoreHorizontal className="h-5 w-5 text-slate-400" />

                </div>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl font-semibold transition ${
                    currentPage === page
                      ? "bg-sapphire text-white shadow-lg"
                      : "border border-slate-200 hover:border-sapphire hover:text-sapphire"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <AppButton
              variant="secondary"
              className="h-11 w-11 rounded-xl p-0"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </AppButton>

          </div>

          {/* Right */}

          <div className="text-right">

            <p className="text-sm text-slate-500">
              Page
            </p>

            <p className="text-xl font-black text-slate-900">
              {currentPage}
              <span className="mx-1 text-slate-400">
                /
              </span>
              {totalPages}
            </p>

          </div>

        </div>

        {/* Mobile */}

        <div className="space-y-5 lg:hidden">

          <div className="text-center">

            <p className="text-sm text-slate-500">
              Showing {start}-{end} of {totalResults}
            </p>

          </div>

          <div className="flex items-center justify-between gap-3">

            <AppButton
              variant="secondary"
              className="flex-1"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </AppButton>

            <div className="rounded-xl bg-slate-100 px-5 py-3 font-bold">

              {currentPage} / {totalPages}

            </div>

            <AppButton
              className="flex-1"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </AppButton>

          </div>

        </div>

      </div>

    </section>
  );
}