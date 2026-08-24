"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  Check,
  Eye,
  ShoppingCart,
  Star,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import ProductQuickView from "@/components/product/ProductQuickView";
import { Product } from "../data/products";
import { useCart } from "@/features/cart/CartContext";
import { useToast } from "@/features/notifications/ToastContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const { notify } = useToast();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem({
      productUuid: product.uuid,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      moq: product.moq,
      stock: product.stock,
      supplierUuid: product.supplierUuid,
      supplierName: product.supplier,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    notify(`${product.name} added to cart`, "cart");
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-sapphire hover:shadow-xl hover:shadow-sapphire/10">
      {/* Image */}

      <Link href={`/products/${product.slug}`} className="relative block h-44 shrink-0 overflow-hidden bg-muted sm:h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-2 top-2 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-obsidian/60 shadow-sm">
          {product.category}
        </span>

        {product.verified && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-sapphire shadow-sm">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        )}

        <span className="absolute bottom-2 left-2 rounded-md bg-obsidian/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          MOQ {product.moq}
        </span>
      </Link>

      {/* Content */}

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-obsidian transition group-hover:text-sapphire">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <p className="text-xl font-extrabold text-sapphire">
            ${product.price}
          </p>

          {product.averageRating !== null && product.reviewsCount > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-obsidian/50">
              <Star className="h-3.5 w-3.5 fill-champagne text-champagne" />
              {product.averageRating.toFixed(1)}
            </span>
          )}
        </div>

        {product.sellerId && (
          <Link
            href={`/sellers/${product.sellerId}`}
            className="mt-1.5 block truncate text-xs text-obsidian/45 transition hover:text-sapphire"
          >
            Seller <span className="font-medium text-obsidian/60">{product.supplier}</span>
          </Link>
        )}

        {/* Actions */}

        <div className="mt-auto flex gap-1.5 pt-3">
          <AppButton
            className="h-9 flex-1 justify-center px-2 text-xs"
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="mr-1 h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                {product.stock <= 0 ? "Out of stock" : "Add to cart"}
              </>
            )}
          </AppButton>

          <ProductQuickView product={product}>
            <AppButton
              variant="secondary"
              className="h-9 !w-9 justify-center px-0"
            >
              <Eye className="h-3.5 w-3.5" />
            </AppButton>
          </ProductQuickView>
        </div>
      </div>
    </div>
  );
}
