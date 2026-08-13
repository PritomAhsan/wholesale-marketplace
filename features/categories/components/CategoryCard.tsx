import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import { Category } from "../data/categories";

export default function CategoryCard({
  category,
}: {
  category: Category;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >
      <div className="relative h-36 overflow-hidden">

        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

      </div>

      <div className="p-4">

        <h2 className="text-base font-bold">
          {category.name}
        </h2>

        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
          {category.description}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

          <div className="flex items-center gap-1.5 text-xs text-slate-500">

            <Package size={14} />

            {category.products} Products

          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600">

            Browse

            <ArrowRight
              size={14}
              className="transition group-hover:translate-x-1"
            />

          </div>

        </div>

      </div>

    </Link>
  );
}