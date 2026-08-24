import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";

import { Product } from "@/features/products/data/products";

interface Props {
  product: Product;
}

export default function InventoryCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-sapphire hover:shadow-xl hover:shadow-sapphire/10"
    >
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-muted sm:h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute bottom-2 left-2 rounded-md bg-obsidian/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          MOQ {product.moq}
        </span>

        {product.verified && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-sapphire shadow-sm">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-obsidian transition group-hover:text-sapphire">
          {product.name}
        </p>

        <p className="mt-2 text-xl font-extrabold text-sapphire">
          ${product.price}
          <span className="ml-1 text-xs font-medium text-obsidian/40">/ case</span>
        </p>

        {product.averageRating != null && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-obsidian/50">
            <Star className="h-3.5 w-3.5 fill-champagne text-champagne" />
            <span className="font-semibold text-obsidian/70">
              {product.averageRating.toFixed(1)}
            </span>
            <span className="text-obsidian/30">({product.reviewsCount})</span>
          </p>
        )}

        {product.sellerId && (
          <p className="mt-auto truncate pt-3 text-xs text-obsidian/45">
            Seller <span className="font-medium text-obsidian/60">{product.sellerId}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
