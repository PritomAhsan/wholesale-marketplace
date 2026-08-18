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

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
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
  }

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-white transition hover:border-sapphire hover:shadow-sm">
      {/* Image */}

      <Link href={`/products/${product.slug}`} className="relative block overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-1.5 top-1.5 rounded bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold text-obsidian/60">
          {product.category}
        </span>

        {product.verified && (
          <span className="absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded bg-white/95 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
            <BadgeCheck className="h-2.5 w-2.5" />
            Verified
          </span>
        )}
      </Link>

      {/* Content */}

      <div className="p-2.5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-xs font-semibold leading-4 text-obsidian transition group-hover:text-sapphire">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-1.5">
          <p className="text-base font-bold text-sapphire">
            ${product.price}
          </p>

          {product.averageRating !== null && product.reviewsCount > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-obsidian/50">
              <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
              {product.averageRating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between text-[10px] text-obsidian/50">
          <span>MOQ {product.moq}</span>
          {product.sellerId && (
            <Link
              href={`/sellers/${product.sellerId}`}
              className="truncate transition hover:text-sapphire"
            >
              {product.supplier}
            </Link>
          )}
        </div>

        {/* Actions */}

        <div className="mt-2 flex gap-1.5">
          <AppButton
            className="h-8 flex-1 justify-center px-2 text-xs"
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
              className="h-8 !w-8 justify-center px-0"
            >
              <Eye className="h-3.5 w-3.5" />
            </AppButton>
          </ProductQuickView>
        </div>
      </div>
    </div>
  );
}
