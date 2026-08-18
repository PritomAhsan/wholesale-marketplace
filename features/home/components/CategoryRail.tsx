import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categoryAbbreviation, categoryTint } from "@/features/categories/utils/categoryBadge";

interface Props {
  categories: { id: number; slug: string; name: string }[];
}

export default function CategoryRail({ categories }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-white">
      <div className="border-b border-border px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-obsidian/40">
          Marketplace
        </p>
        <p className="mt-0.5 font-semibold text-obsidian">All categories</p>
      </div>

      <ul className="divide-y divide-border">
        {categories.slice(0, 7).map((category) => {
          const tint = categoryTint(category.name);

          return (
            <li key={category.id}>
              <Link
                href={`/categories/${category.slug}`}
                className="group flex items-center gap-2.5 px-4 py-2.5 text-sm text-obsidian/80 transition hover:bg-ivory hover:text-sapphire"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
                  style={{ backgroundColor: tint.bg, color: tint.fg }}
                >
                  {categoryAbbreviation(category.name)}
                </span>
                <span className="flex-1 truncate">{category.name}</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-obsidian/20 transition group-hover:text-sapphire" />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-border px-4 py-3">
        <Link
          href="/categories"
          className="text-xs font-medium text-sapphire hover:text-sapphire-strong"
        >
          View complete directory →
        </Link>
      </div>
    </div>
  );
}
