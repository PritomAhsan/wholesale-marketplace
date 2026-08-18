import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Category } from "../data/categories";
import { categoryAbbreviation, categoryTint } from "../utils/categoryBadge";

export default function CategoryCard({
  category,
}: {
  category: Category;
}) {
  const tint = categoryTint(category.name);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-white p-3.5 transition hover:border-sapphire hover:shadow-sm"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
        style={{ backgroundColor: tint.bg, color: tint.fg }}
      >
        {categoryAbbreviation(category.name)}
      </span>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-semibold text-obsidian">
          {category.name}
        </h2>
        <p className="truncate text-xs text-obsidian/50">
          {category.description || `${category.products} products`}
        </p>
      </div>

      <ArrowRight
        size={14}
        className="shrink-0 text-obsidian/20 transition group-hover:translate-x-0.5 group-hover:text-sapphire"
      />
    </Link>
  );
}
