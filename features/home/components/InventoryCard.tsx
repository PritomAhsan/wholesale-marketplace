import Link from "next/link";
import InventoryThumb from "./InventoryThumb";
import { Product } from "@/features/products/data/products";

interface Props {
  product: Product;
}

export default function InventoryCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition hover:border-sapphire hover:shadow-sm"
    >
      <div className="h-24">
        <InventoryThumb
          seed={product.name}
          quantityLabel={`MOQ ${product.moq}`}
        />
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p className="line-clamp-2 text-xs font-semibold leading-4 text-obsidian transition group-hover:text-sapphire">
          {product.name}
        </p>

        <p className="mt-1.5 text-sm font-bold text-sapphire">
          ${product.price}
          <span className="ml-1 text-[10px] font-normal text-obsidian/40">/ case</span>
        </p>

        <div className="mt-auto space-y-0.5 pt-2 text-[10px] text-obsidian/50">
          <p>MOQ {product.moq}</p>
          {product.sellerId && <p className="truncate">Seller {product.sellerId}</p>}
        </div>
      </div>
    </Link>
  );
}
