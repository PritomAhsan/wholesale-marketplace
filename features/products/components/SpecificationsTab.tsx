import {
  FileText,
  Package,
  ShieldCheck,
  Boxes,
} from "lucide-react";

import { Product } from "../data/products";

interface Props {
  product: Product;
}

export default function SpecificationsTab({ product }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-2">
          <FileText className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            Technical Specifications
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Complete product specifications provided by the supplier.
          </p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <Package className="mb-3 h-6 w-6 text-primary" />

          <p className="text-sm text-slate-500">
            Minimum Order
          </p>

          <p className="mt-1 text-xl font-bold">
            {product.moq} Pieces
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <ShieldCheck className="mb-3 h-6 w-6 text-emerald-600" />

          <p className="text-sm text-slate-500">
            Supplier Status
          </p>

          <p className="mt-1 text-xl font-bold">
            {product.verified ? "Verified" : "Standard"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <Boxes className="mb-3 h-6 w-6 text-amber-500" />

          <p className="text-sm text-slate-500">
            Available Stock
          </p>

          <p className="mt-1 text-xl font-bold">
            {product.stock.toLocaleString()} units
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div className="overflow-hidden rounded-3xl border border-slate-200">
        <table className="w-full border-collapse">
          <tbody>
            {product.specifications.map((item, index) => (
              <tr
                key={item.label}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-slate-50"
                }
              >
                <td className="w-1/3 border-b border-slate-200 px-6 py-5 font-semibold text-slate-900">
                  {item.label}
                </td>

                <td className="border-b border-slate-200 px-6 py-5 text-slate-600">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}