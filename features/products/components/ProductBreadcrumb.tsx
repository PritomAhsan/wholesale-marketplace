import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProductBreadcrumb() {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">

      <Link
        href="/"
        className="hover:text-blue-600"
      >
        Home
      </Link>

      <ChevronRight size={16} />

      <span className="font-medium text-slate-900">
        Products
      </span>

    </div>
  );
}