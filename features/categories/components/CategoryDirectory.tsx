import Link from "next/link";
import { Category } from "../data/categories";
import { categoryIcon } from "../utils/categoryIcon";
import { categoryTint } from "../utils/categoryBadge";

interface Props {
  categories: Category[];
}

export default function CategoryDirectory({ categories }: Props) {
  const withChildren = categories.filter((c) => c.children.length > 0);

  if (withChildren.length === 0) return null;

  return (
    <div className="mt-14">
      <span className="inline-block rounded-full bg-sapphire-soft px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sapphire">
        Full directory
      </span>
      <h2 className="mt-4 text-2xl font-bold text-obsidian sm:text-3xl">
        Complete category directory
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {withChildren.map((category) => {
          const Icon = categoryIcon(category.name);
          const tint = categoryTint(category.name);

          return (
            <div
              key={category.id}
              className="rounded-2xl border border-border bg-white p-5 transition hover:border-sapphire/40 hover:shadow-sm"
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group flex items-center gap-3"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: tint.bg, color: tint.fg }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-semibold text-obsidian group-hover:text-sapphire">
                  {category.name}
                </span>
              </Link>

              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border pt-3">
                {category.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`/categories/${child.slug}`}
                      className="text-sm text-obsidian/60 hover:text-sapphire"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
