"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BadgeCheck,
  Check,
  Heart,
  Share2,
  Star,
  Tag,
  Package,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { Product, ProductVariant } from "../data/products";
import { useWishlist } from "@/features/wishlist/WishlistContext";
import { useToast } from "@/features/notifications/ToastContext";
import VariantSelector from "./VariantSelector";

interface ProductInfoProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

export default function ProductInfo({
  product,
  selectedVariant,
  onSelectVariant,
}: ProductInfoProps) {
  const [shared, setShared] = useState(false);
  const { isSaved, toggleItem } = useWishlist();
  const { notify } = useToast();
  const router = useRouter();

  const saved = isSaved(product.uuid);
  const effectiveMoq = selectedVariant?.moq ?? product.moq;

  function handleToggleWishlist() {
    toggleItem({
      productUuid: product.uuid,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      supplierName: product.supplier,
      supplierUuid: product.supplierUuid,
      moq: product.moq,
      stock: product.stock,
    });

    notify(saved ? "Removed from wishlist" : "Saved to wishlist", "wishlist");
  }

  async function handleShare() {
    const url = `${window.location.origin}/products/${product.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        // user cancelled share sheet
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }

  // Variant axes (e.g. Color, Size) are already surfaced by the selector
  // above, so drop them here rather than showing a static, possibly
  // contradictory value alongside the buyer's actual selection.
  const variantAxes = new Set(
    product.variants.flatMap((v) => v.attributes.map((a) => a.attributeName))
  );
  const attributes = product.specifications
    .filter((spec) => !variantAxes.has(spec.label))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="flex items-center gap-2 text-sm text-obsidian/50">
        <Tag className="h-4 w-4" />
        <span>{product.category}</span>
      </div>

      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold leading-tight text-obsidian lg:text-3xl">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {product.verified && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sapphire-soft px-3 py-1.5 text-sm font-medium text-sapphire-strong">
              <BadgeCheck className="h-4 w-4" />
              Verified Product
            </div>
          )}

          {product.averageRating !== null && product.reviewsCount > 0 && (
            <div className="inline-flex items-center gap-1.5 text-sm text-obsidian/60">
              <Star className="h-4 w-4 fill-champagne text-champagne" />
              <span className="font-semibold text-obsidian">
                {product.averageRating.toFixed(1)}
              </span>
              <span className="text-obsidian/40">
                ({product.reviewsCount} review{product.reviewsCount !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Variants — surfaced right after the title/rating, matching how
          wholesale marketplaces put the buying decision (which option,
          then how many) before anything else. */}
      {product.variants.length > 1 && (
        <VariantSelector
          variants={product.variants}
          selected={selectedVariant}
          onSelect={onSelectVariant}
        />
      )}

      {/* MOQ */}
      <div className="flex items-center gap-3 rounded-2xl bg-sapphire-soft/40 p-4">
        <Package className="h-5 w-5 text-sapphire" />

        <div>
          <p className="text-xs uppercase tracking-wide text-obsidian/50">
            Minimum Order Quantity
          </p>

          <p className="text-lg font-semibold text-obsidian">
            {effectiveMoq.toLocaleString()} Pieces
          </p>
        </div>
      </div>

      {/* Key attributes — wholesale buyers scan a compact spec table before
          reading prose, so surface the top attributes here rather than only
          burying them in the Specifications tab further down the page. */}
      {attributes.length > 0 && (
        <div className="rounded-2xl border border-border">
          <p className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-obsidian/50">
            Key attributes
          </p>
          <dl className="divide-y divide-border">
            {attributes.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
              >
                <dt className="text-obsidian/50">{spec.label}</dt>
                <dd className="text-right font-medium text-obsidian">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <AppButton
          variant="primary"
          onClick={() =>
            router.push(
              `/rfq?product=${encodeURIComponent(product.name)}&quantity=${effectiveMoq}`
            )
          }
        >
          Send RFQ
        </AppButton>

        <AppButton
          variant="secondary"
          onClick={handleToggleWishlist}
          className={saved ? "border-champagne text-champagne" : ""}
        >
          <Heart className="mr-2 h-4" fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Wishlist"}
        </AppButton>

        <AppButton variant="secondary" onClick={handleShare}>
          {shared ? (
            <>
              <Check className="mr-2 h-4" />
              Link Copied
            </>
          ) : (
            <>
              <Share2 className="mr-2 h-4" />
              Share
            </>
          )}
        </AppButton>
      </div>
    </div>
  );
}