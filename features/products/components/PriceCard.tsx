"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  Package,
  Check,
  ShieldCheck,
  Lock,
  BadgePercent,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { Product, ProductVariant } from "../data/products";
import { useCart } from "@/features/cart/CartContext";
import { useToast } from "@/features/notifications/ToastContext";

interface PriceCardProps {
  product: Product;
  variant?: ProductVariant | null;
}

export default function PriceCard({ product, variant }: PriceCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { notify } = useToast();

  const basePrice = variant?.price ?? product.price;
  const effectiveMoq = variant?.moq ?? product.moq;
  const effectiveStock = variant ? variant.stock : product.stock;

  const [quantity, setQuantity] = useState(effectiveMoq);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(effectiveMoq);
  }, [variant?.uuid, effectiveMoq]);

  const outOfStock = effectiveStock <= 0;

  const increase = () => {
    setQuantity((q) => Math.min(effectiveStock, q + effectiveMoq));
  };

  const decrease = () => {
    setQuantity((q) => Math.max(effectiveMoq, q - effectiveMoq));
  };

  const activeTier = useMemo(() => {
    return [...product.priceTiers]
      .sort((a, b) => b.minQuantity - a.minQuantity)
      .find((tier) => quantity >= tier.minQuantity);
  }, [product.priceTiers, quantity]);

  const unitPrice = useMemo(() => {
    if (!activeTier) return basePrice;

    if (activeTier.discountPercent !== null) {
      return basePrice * (1 - activeTier.discountPercent / 100);
    }

    if (activeTier.discountPrice !== null) return activeTier.discountPrice;

    return basePrice;
  }, [activeTier, basePrice]);

  const total = useMemo(() => {
    return quantity * unitPrice;
  }, [quantity, unitPrice]);

  function handleAddToCart() {
    addItem(
      {
        productUuid: product.uuid,
        slug: product.slug,
        name: product.name,
        image: variant?.images[0] ?? product.image,
        price: unitPrice,
        moq: effectiveMoq,
        stock: effectiveStock,
        supplierUuid: product.supplierUuid,
        supplierName: product.supplier,
        variantUuid: variant?.uuid,
        variantSku: variant?.sku,
        variantLabel: variant?.attributes.length
          ? variant.attributes.map((a) => a.value).join(" / ")
          : undefined,
      },
      quantity
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    notify(`${product.name} added to cart`, "cart");
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/cart");
  }

  const sortedTiers = [...product.priceTiers].sort(
    (a, b) => a.minQuantity - b.minQuantity
  );

  return (
    <aside className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="space-y-6">
        {/* Price */}
        <div>
          <p className="text-sm text-obsidian/50">Unit Price</p>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-4xl font-bold text-obsidian">
              ${unitPrice.toFixed(2)}
            </span>

            <span className="pb-1 text-sm text-obsidian/50">/ Piece</span>

            {activeTier && (
              <span className="pb-1 text-sm text-obsidian/30 line-through">
                ${basePrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity price breaks — a scannable grid, matching the wholesale
            price-break table buyers expect from B2B marketplaces. */}
        {sortedTiers.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {sortedTiers.map((tier) => {
              const tierPrice = tier.discountPercent
                ? basePrice * (1 - tier.discountPercent / 100)
                : tier.discountPrice ?? basePrice;

              const isActive = activeTier?.minQuantity === tier.minQuantity;

              return (
                <div
                  key={tier.minQuantity}
                  className={`rounded-xl border px-3 py-2 text-center transition ${
                    isActive
                      ? "border-sapphire bg-sapphire-soft"
                      : "border-border"
                  }`}
                >
                  <p
                    className={`text-base font-bold ${
                      isActive ? "text-sapphire-strong" : "text-obsidian"
                    }`}
                  >
                    ${tierPrice.toFixed(2)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-obsidian/50">
                    {tier.minQuantity.toLocaleString()}+ pieces
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* MOQ */}
        <div className="rounded-2xl bg-sapphire-soft/40 p-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-sapphire" />

            <span className="text-sm font-medium text-obsidian/70">
              Minimum Order Quantity
            </span>
          </div>

          <p className="mt-2 text-xl font-semibold text-obsidian">
            {effectiveMoq.toLocaleString()} Pieces
          </p>

          <p className="mt-1 text-sm text-obsidian/50">
            {outOfStock
              ? "Out of stock"
              : `${effectiveStock.toLocaleString()} available`}
          </p>
        </div>

        {/* Quantity */}
        <div>
          <p className="mb-3 text-sm font-medium text-obsidian/70">
            Order Quantity
          </p>

          <div className="flex items-center justify-between rounded-2xl border border-border">
            <button
              onClick={decrease}
              disabled={outOfStock}
              className="flex h-12 w-12 items-center justify-center transition hover:bg-muted disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="font-semibold text-obsidian">
              {quantity.toLocaleString()}
            </span>

            <button
              onClick={increase}
              disabled={outOfStock}
              className="flex h-12 w-12 items-center justify-center transition hover:bg-muted disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-dashed border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-obsidian/60">Estimated Total</span>

            <span className="text-2xl font-bold text-sapphire">
              ${total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
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

        {/* Order protection */}
        <div className="space-y-3 border-t border-border pt-5">
          <p className="text-xs font-bold uppercase tracking-widest text-obsidian/50">
            Bulkare order protection
          </p>

          <div className="flex items-start gap-2.5 text-sm text-obsidian/70">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-sapphire" />
            Secure inquiry and encrypted checkout
          </div>

          <div className="flex items-start gap-2.5 text-sm text-obsidian/70">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sapphire" />
            Sold by a privately verified supplier
          </div>

          <div className="flex items-start gap-2.5 text-sm text-obsidian/70">
            <BadgePercent className="mt-0.5 h-4 w-4 shrink-0 text-sapphire" />
            Wholesale pricing on every bulk order
          </div>
        </div>
      </div>
    </aside>
  );
}
