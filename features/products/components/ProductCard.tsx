"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  Check,
  Eye,
  Heart,
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
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      {/* Image */}

      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={700}
          height={520}
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
          {product.category}
        </span>

        {/* Wishlist */}

        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/95 shadow transition hover:bg-blue-600 hover:text-white">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}

      <div className="space-y-3 p-4">
        {/* Rating + Verified */}

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-slate-700">{product.rating}</span>
          </div>

          {product.verified && (
            <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[11px] font-bold text-green-700">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </div>
          )}
        </div>

        {/* Title */}

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-base font-bold leading-snug transition group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {/* Supplier */}

        <p className="truncate text-sm text-slate-500">
          {product.supplier}
        </p>

        {/* Price + MOQ */}

        <div className="flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Starting From
            </p>
            <p className="text-lg font-black text-blue-600">
              ${product.price}
            </p>
          </div>

          <p className="text-xs text-slate-500">
            MOQ <span className="font-semibold text-slate-700">{product.moq}</span>
          </p>
        </div>

        {/* Actions */}

        <div className="flex gap-2 pt-1">
          <AppButton
            className="flex-1 justify-center"
            size="sm"
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </>
            )}
          </AppButton>

          <ProductQuickView product={product}>
            <AppButton
              variant="secondary"
              size="sm"
              className="!w-11 justify-center px-0"
            >
              <Eye className="h-4 w-4" />
            </AppButton>
          </ProductQuickView>
        </div>
      </div>
    </div>
  );
}
