import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryAbbreviation, categoryTint } from "@/features/categories/utils/categoryBadge";

interface Props {
  slug: string;
  name: string;
  subtitle: string;
  restricted: boolean;
}

export default function CategoryCard({
  slug,
  name,
  subtitle,
  restricted,
}: Props) {
  const tint = categoryTint(name);

  return (
    <Link
      href={`/categories/${slug}`}
      className="group flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition hover:border-sapphire hover:shadow-sm"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
        style={{ backgroundColor: tint.bg, color: tint.fg }}
      >
        {categoryAbbreviation(name)}
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-obsidian">{name}</p>
        <p
          className={`mt-0.5 truncate text-xs ${
            restricted ? "font-medium text-champagne" : "text-obsidian/50"
          }`}
        >
          {restricted ? "Business verification required" : subtitle}
        </p>
      </div>

      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-obsidian/20 transition group-hover:translate-x-0.5 group-hover:text-sapphire" />
    </Link>
  );
}
