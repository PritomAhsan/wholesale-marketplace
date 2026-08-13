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

          <div className="border-r border-slate-200 bg-slate-50">

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
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-blue-300"
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
                    (Continue in Part 2)
          ============================================ */}

          <div className="p-8">
                        {/* Rating */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-1">

                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                  <span className="text-lg font-bold">
                    {product.rating}
                  </span>

                </div>

                <span className="text-slate-400">
                  •
                </span>

                <span className="text-sm text-slate-500">
                  286 Reviews
                </span>

              </div>

              {product.verified && (
                <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                  <BadgeCheck className="h-4 w-4" />

                  Verified Supplier

                </div>
              )}

            </div>

            {/* Product Name */}

            <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900">

              {product.name}

            </h2>

            {/* Description */}

            <p className="mt-5 text-[15px] leading-8 text-slate-600">

              {product.shortDescription}

            </p>

            {/* Supplier */}

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-black text-white shadow-lg">

                  {product.supplier.charAt(0)}

                </div>

                <div className="flex-1">

                  <div className="flex items-center gap-2">

                    <h3 className="text-lg font-bold">

                      {product.supplier}

                    </h3>

                    <ShieldCheck className="h-5 w-5 text-green-500" />

                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                    <MapPin className="h-4 w-4" />

                    {product.country}

                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">

                      12 Years

                    </span>

                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">

                      Gold Supplier

                    </span>

                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">

                      Trade Assurance

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Price */}

            <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl">

              <div className="flex items-end justify-between">

                <div>

                  <p className="text-sm text-blue-100">

                    Starting Price

                  </p>

                  <div className="mt-2 flex items-end gap-2">

                    <span className="text-5xl font-black">

                      ${product.price}

                    </span>

                    <span className="pb-2 text-blue-100">

                      / unit

                    </span>

                  </div>

                </div>

                <div className="rounded-2xl bg-white/15 px-5 py-4 text-center backdrop-blur">

                  <p className="text-xs uppercase tracking-wider">

                    MOQ

                  </p>

                  <p className="mt-2 text-3xl font-black">

                    {product.moq}

                  </p>

                </div>

              </div>

            </div>

            {/* Quick Information */}

            <div className="mt-8 grid grid-cols-3 gap-4">

              <div className="rounded-2xl border border-slate-200 p-5 text-center">

                <Building2 className="mx-auto h-6 w-6 text-blue-600" />

                <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                  Supplier
                </p>

                <p className="mt-1 font-bold">
                  Verified
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 p-5 text-center">

                <Package className="mx-auto h-6 w-6 text-blue-600" />

                <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                  Availability
                </p>

                <p className="mt-1 font-bold">
                  In Stock
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 p-5 text-center">

                <ShieldCheck className="mx-auto h-6 w-6 text-blue-600" />

                <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                  Payment
                </p>

                <p className="mt-1 font-bold">
                  Secure
                </p>

              </div>

            </div>

            {/* Continue with Part 3 */}
                        {/* Specifications */}

            {/* <div className="mt-8">

              <h3 className="text-xl font-bold text-slate-900">
                Specifications
              </h3>

              <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200">

                {product.specifications.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-[170px_1fr] gap-6 px-6 py-4 ${
                      index !== product.specifications.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >

                    <p className="font-semibold text-slate-500">
                      {spec.label}
                    </p>

                    <p className="font-medium text-slate-900">
                      {spec.value}
                    </p>

                  </div>
                ))}

              </div>

            </div> */}

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
                disabled={product.stock <= 0}
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
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
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

            {/* Trust Badges */}

            <div className="mt-10 rounded-3xl bg-slate-50 p-6">

              <h4 className="font-bold text-slate-900">
                Why Buy Here?
              </h4>

              <div className="mt-5 space-y-4">

                <div className="flex items-center gap-3">

                  <ShieldCheck className="h-5 w-5 text-green-600" />

                  <span className="text-sm text-slate-600">
                    Verified supplier with business authentication.
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <BadgeCheck className="h-5 w-5 text-blue-600" />

                  <span className="text-sm text-slate-600">
                    Trade Assurance available for eligible orders.
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Package className="h-5 w-5 text-amber-600" />

                  <span className="text-sm text-slate-600">
                    Bulk orders with worldwide shipping support.
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