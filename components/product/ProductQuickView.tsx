"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Lock,
  MapPin,
  MessageSquare,
  Package,
  ShieldCheck,
  Share2,
  Star,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Product } from "@/features/products/data/products";
import { useCart } from "@/features/cart/CartContext";

import { ReactElement } from "react";

interface Props {
  product: Product;
  children: ReactElement;
}

export default function ProductQuickView({
  product,
  children,
}: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem } = useCart();

  const images =
    product.gallery?.length > 0
      ? product.gallery
      : [product.image];

  const outOfStock = product.stock <= 0;

  const nextImage = () => {
    setImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog>

      <DialogTrigger
        render={children}
      />

      <DialogContent className="max-h-[92vh] overflow-y-auto p-0">

        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

          {/* ===========================================
                    LEFT
          ============================================ */}

          <div className="border-r border-border bg-ivory">

            {/* Image */}

            <div className="relative">

              <Image
                src={images[imageIndex]}
                alt={product.name}
                width={900}
                height={700}
                className="aspect-square w-full object-cover"
              />

              {/* Category */}

              <div className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-lg">

                {product.category}

              </div>

              {/* Wishlist */}

              <button
                className="
                  absolute
                  right-6
                  top-6
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  shadow-lg
                  transition
                  hover:bg-red-500
                  hover:text-white
                "
              >

                <Heart size={20} />

              </button>

              {/* Previous */}

              {images.length > 1 && (
                <button
                  onClick={previousImage}
                  className="
                    absolute
                    left-5
                    top-1/2
                    flex
                    h-12
                    w-12
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-white/90
                    shadow-xl
                    backdrop-blur
                  "
                >
                  <ChevronLeft />
                </button>
              )}

              {/* Next */}

              {images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="
                    absolute
                    right-5
                    top-1/2
                    flex
                    h-12
                    w-12
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-white/90
                    shadow-xl
                    backdrop-blur
                  "
                >
                  <ChevronRight />
                </button>
              )}

            </div>

            {/* Gallery */}

            <div className="grid grid-cols-5 gap-4 p-6">

              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border-2
                    transition-all

                    ${
                      imageIndex === index
                        ? "border-sapphire ring-2 ring-sapphire-soft"
                        : "border-border hover:border-sapphire/50"
                    }
                  `}
                >

                  <Image
                    src={image}
                    alt=""
                    width={120}
                    height={120}
                    className="aspect-square object-cover"
                  />

                </button>
              ))}

            </div>

          </div>

          {/* ===========================================
                    RIGHT
          ============================================ */}

          <div className="p-8">

            {/* Verified badge */}

            <div className="flex items-center justify-between">

              {product.sellerId && (
                <span className="text-xs font-semibold uppercase tracking-wide text-obsidian/40">
                  {product.sellerId}
                </span>
              )}

              {product.verified && (
                <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                  <BadgeCheck className="h-4 w-4" />

                  Verified Supplier

                </div>
              )}

            </div>

            {/* Product Name */}

            <h2 className="mt-6 text-3xl font-black leading-tight text-obsidian">

              {product.name}

            </h2>

            {product.averageRating !== null && product.reviewsCount > 0 && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-obsidian/60">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-obsidian">
                  {product.averageRating.toFixed(1)}
                </span>
                <span className="text-obsidian/40">
                  ({product.reviewsCount} review{product.reviewsCount !== 1 ? "s" : ""})
                </span>
              </div>
            )}

            {/* Description */}

            <p className="mt-5 text-[15px] leading-8 text-obsidian/60">

              {product.shortDescription}

            </p>

            {/* Supplier */}

            <div className="mt-8 rounded-3xl border border-border bg-ivory p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-obsidian text-xl font-black text-white shadow-lg">

                  {product.supplier.charAt(0)}

                </div>

                <div className="flex-1">

                  <div className="flex items-center gap-2">

                    <h3 className="text-lg font-bold text-obsidian">

                      {product.supplier}

                    </h3>

                    {product.verified && (
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    )}

                  </div>

                  {product.country && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-obsidian/50">

                      <MapPin className="h-4 w-4" />

                      {product.country}

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* Price */}

            <div className="mt-8 rounded-3xl bg-obsidian p-6 text-white shadow-xl">

              <div className="flex items-end justify-between">

                <div>

                  <p className="text-sm text-ivory/50">

                    Unit Price

                  </p>

                  <div className="mt-2 flex items-end gap-2">

                    <span className="text-5xl font-black">

                      ${product.price.toFixed(2)}

                    </span>

                    <span className="pb-2 text-ivory/50">

                      / unit

                    </span>

                  </div>

                </div>

                <div className="rounded-2xl bg-white/10 px-5 py-4 text-center backdrop-blur">

                  <p className="text-xs uppercase tracking-wider text-ivory/50">

                    MOQ

                  </p>

                  <p className="mt-2 text-3xl font-black">

                    {product.moq}

                  </p>

                </div>

              </div>

            </div>

            {/* Quick Information */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-border p-5 text-center">

                <Building2 className="mx-auto h-6 w-6 text-sapphire" />

                <p className="mt-3 text-xs uppercase tracking-wider text-obsidian/40">
                  Supplier
                </p>

                <p className="mt-1 font-bold text-obsidian">
                  {product.verified ? "Verified" : "Standard"}
                </p>

              </div>

              <div className="rounded-2xl border border-border p-5 text-center">

                <Package className="mx-auto h-6 w-6 text-sapphire" />

                <p className="mt-3 text-xs uppercase tracking-wider text-obsidian/40">
                  Availability
                </p>

                <p className="mt-1 font-bold text-obsidian">
                  {outOfStock ? "Out of Stock" : "In Stock"}
                </p>

              </div>

            </div>

            {/* Actions */}

            <div className="mt-10 space-y-4">

              <AppButton
                className="w-full justify-center"
                size="lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Send RFQ
              </AppButton>

              <AppButton
                variant="secondary"
                className="w-full justify-center"
                size="lg"
                disabled={outOfStock}
                onClick={() =>
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
                  })
                }
              >
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </AppButton>

              <Link
                href={`/products/${product.slug}`}
                className="block"
              >
                <AppButton
                  variant="ghost"
                  className="w-full justify-center"
                  size="lg"
                >
                  View Full Details
                </AppButton>
              </Link>

            </div>

            {/* Secondary Actions */}

            <div className="mt-8 flex gap-3">

              <AppButton
                variant="secondary"
                className="flex-1 justify-center"
              >
                <Heart className="mr-2 h-4 w-4" />
                Save
              </AppButton>

              <AppButton
                variant="secondary"
                className="flex-1 justify-center"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </AppButton>

            </div>

            {/* Trust — real, platform-level claims only */}

            <div className="mt-10 rounded-3xl bg-ivory p-6">

              <h4 className="font-bold text-obsidian">
                Why Buy Here?
              </h4>

              <div className="mt-5 space-y-4">

                <div className="flex items-center gap-3">

                  <ShieldCheck className="h-5 w-5 text-emerald-600" />

                  <span className="text-sm text-obsidian/60">
                    Privately verified suppliers, reviewed before listing.
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Lock className="h-5 w-5 text-sapphire" />

                  <span className="text-sm text-obsidian/60">
                    Protected seller identity — direct contact stays private
                    until you engage.
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <MessageSquare className="h-5 w-5 text-champagne" />

                  <span className="text-sm text-obsidian/60">
                    Send a structured RFQ for custom quantities or terms.
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}
