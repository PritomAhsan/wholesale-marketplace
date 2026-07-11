import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Store } from "lucide-react";

import { Category } from "../data/categories";

export default function CategoryCard({
  category,
}: {
  category: Category;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="relative h-52 overflow-hidden">

        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {category.name}
        </h2>

        <p className="mt-3 text-slate-600 leading-7">
          {category.description}
        </p>

        <div className="mt-6 flex gap-6">

          <div className="flex items-center gap-2 text-sm">

            <Package size={18} />

            {category.products} Products

          </div>

          <div className="flex items-center gap-2 text-sm">

            <Store size={18} />

            {category.suppliers} Suppliers

          </div>

        </div>

        <div className="mt-6 flex items-center gap-2 font-semibold text-blue-600">

          Browse Products

          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />

        </div>

      </div>

    </Link>
  );
}