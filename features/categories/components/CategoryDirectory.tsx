import Link from "next/link";
import { Category } from "../data/categories";

interface Props {
  categories: Category[];
}

export default function CategoryDirectory({ categories }: Props) {
  const withChildren = categories.filter((c) => c.children.length > 0);

  if (withChildren.length === 0) return null;

  return (
    <div className="mt-14 rounded-2xl border border-border bg-white p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-obsidian">
        Complete category directory
      </h2>

      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {withChildren.map((category) => (
          <div key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              className="font-semibold text-obsidian hover:text-sapphire"
            >
              {category.name}
            </Link>

            <ul className="mt-2.5 space-y-1.5">
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
        ))}
      </div>
    </div>
  );
}
