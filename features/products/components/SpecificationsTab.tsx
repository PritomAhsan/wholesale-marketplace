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
        <div className="rounded-xl bg-sapphire-soft p-2">
          <FileText className="h-5 w-5 text-sapphire" />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-obsidian">
            Technical Specifications
          </h3>

          <p className="mt-1 text-sm text-obsidian/50">
            Complete product specifications provided by the supplier.
          </p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-muted p-5">
          <Package className="mb-3 h-6 w-6 text-sapphire" />

          <p className="text-sm text-obsidian/50">
            Minimum Order
          </p>

          <p className="mt-1 text-xl font-bold text-obsidian">
            {product.moq} Pieces
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-muted p-5">
          <ShieldCheck className="mb-3 h-6 w-6 text-sapphire" />

          <p className="text-sm text-obsidian/50">
            Supplier Status
          </p>

          <p className="mt-1 text-xl font-bold text-obsidian">
            {product.verified ? "Verified" : "Standard"}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-muted p-5">
          <Boxes className="mb-3 h-6 w-6 text-champagne" />

          <p className="text-sm text-obsidian/50">
            Available Stock
          </p>

          <p className="mt-1 text-xl font-bold text-obsidian">
            {product.stock.toLocaleString()} units
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full border-collapse">
          <tbody>
            {product.specifications.map((item, index) => (
              <tr
                key={item.label}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-muted"
                }
              >
                <td className="w-1/3 border-b border-border px-6 py-5 font-semibold text-obsidian">
                  {item.label}
                </td>

                <td className="border-b border-border px-6 py-5 text-obsidian/60">
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