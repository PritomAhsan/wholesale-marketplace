import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface Props {
  name: string;
  products: string;
  icon: LucideIcon;
}

export default function CategoryCard({
  name,
  products,
  icon: Icon,
}: Props) {
  return (
    <Link
      href="/categories"
      className="group rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >
      <div className="inline-flex rounded-xl bg-blue-50 p-4 transition group-hover:bg-blue-600">
        <Icon className="h-7 w-7 text-blue-600 group-hover:text-white" />
      </div>

      <h3 className="mt-5 text-lg font-semibold">{name}</h3>

      <p className="mt-2 text-sm text-slate-500">
        {products}
      </p>
    </Link>
  );
}