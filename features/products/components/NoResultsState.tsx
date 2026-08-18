import Link from "next/link";
import { AppButton } from "@/components/ui/app-button";

interface Props {
  search?: string;
}

export default function NoResultsState({ search }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white px-8 py-16 text-center">
      <h2 className="text-xl font-semibold text-obsidian">
        No exact match yet.
      </h2>
      {search && (
        <p className="mt-2 text-sm text-obsidian/60">
          No products matched &ldquo;{search}&rdquo; with the current filters.
        </p>
      )}
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/products">
          <AppButton variant="secondary">Clear filters</AppButton>
        </Link>
        <Link href="/rfq">
          <AppButton variant="primary">Request this product</AppButton>
        </Link>
      </div>
    </div>
  );
}
