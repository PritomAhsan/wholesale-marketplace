import Link from "next/link";
import { categoryTint } from "@/features/categories/utils/categoryBadge";
import { categoryIcon } from "@/features/categories/utils/categoryIcon";

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
  const Icon = categoryIcon(name);

  return (
    <Link
      href={`/categories/${slug}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ ["--tint-fg" as string]: tint.fg }}
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: tint.bg }}
      >
        <Icon className="h-8 w-8" style={{ color: tint.fg }} />
      </span>

      <div className="min-w-0">
        <p className="font-bold text-obsidian transition group-hover:text-[var(--tint-fg)]">
          {name}
        </p>
        <p
          className={`mt-1 line-clamp-1 text-xs ${
            restricted ? "font-medium text-champagne" : "text-obsidian/50"
          }`}
        >
          {restricted ? "Business verification required" : subtitle}
        </p>
      </div>
    </Link>
  );
}
