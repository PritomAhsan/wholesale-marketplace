"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  Package,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { Product } from "../data/products";
import { useCart } from "@/features/cart/CartContext";

interface PriceCardProps {
  product: Product;
}

export default function PriceCard({ product }: PriceCardProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(product.moq);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;

  const increase = () => {
    setQuantity((q) => Math.min(product.stock, q + product.moq));
  };

  const decrease = () => {
    setQuantity((q) => Math.max(product.moq, q - product.moq));
  };

  const total = useMemo(() => {
    return quantity * product.price;
  }, [quantity, product.price]);

  function handleAddToCart() {
    addItem(
      {
        productUuid: product.uuid,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        moq: product.moq,
        stock: product.stock,
        supplierUuid: product.supplierUuid,
        supplierName: product.supplier,
      },
      quantity
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/cart");
  }

  return (
    <aside className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        {/* Price */}
        <div>
          <p className="text-sm text-slate-500">Unit Price</p>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-4xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>

            <span className="pb-1 text-sm text-slate-500">/ Piece</span>
          </div>
        </div>

        {/* MOQ */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />

            <span className="text-sm font-medium text-slate-700">
              Minimum Order Quantity
            </span>
          </div>

          <p className="mt-2 text-xl font-semibold text-slate-900">
            {product.moq.toLocaleString()} Pieces
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {outOfStock
              ? "Out of stock"
              : `${product.stock.toLocaleString()} available`}
          </p>
        </div>

        {/* Quantity */}
        <div>
          <p className="mb-3 text-sm font-medium text-slate-700">
            Order Quantity
          </p>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200">
            <button
              onClick={decrease}
              disabled={outOfStock}
              className="flex h-12 w-12 items-center justify-center transition hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="font-semibold">
              {quantity.toLocaleString()}
            </span>

            <button
              onClick={increase}
              disabled={outOfStock}
              className="flex h-12 w-12 items-center justify-center transition hover:bg-slate-100 disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-dashed border-slate-300 p-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Estimated Total</span>

            <span className="text-2xl font-bold text-primary">
              ${total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <Truck className="h-4 w-4" />
            <span>Lead time: 15–20 Business Days</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <ShieldCheck className="h-4 w-4" />
            <span>Trade Assurance Available</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <AppButton
            variant="primary"
            className="w-full"
            disabled={outOfStock}
            onClick={handleBuyNow}
          >
            {outOfStock ? "Out of Stock" : "Buy Now"}
          </AppButton>

          <AppButton
            variant="secondary"
            className="w-full"
            disabled={outOfStock}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Added to Cart
              </>
            ) : (
              "Add to Cart"
            )}
          </AppButton>
        </div>

        {/* Trust */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            Secure inquiry, verified supplier, and wholesale pricing for bulk
            orders.
          </p>
        </div>
      </div>
    </aside>
  );
}
