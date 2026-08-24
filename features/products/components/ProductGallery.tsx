"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, ShieldCheck, X } from "lucide-react";

import { Product, ProductVariant } from "../data/products";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductGalleryProps {
  product: Product;
  variant?: ProductVariant | null;
}

export default function ProductGallery({ product, variant }: ProductGalleryProps) {
  const images = useMemo(() => {
    if (variant?.images.length) {
      return variant.images;
    }

    if (product.gallery?.length) {
      return product.gallery;
    }

    return [product.image];
  }, [product, variant]);

  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setSelected(0);
  }, [variant?.uuid]);

  const previous = () => {
    setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
        <div className="relative aspect-square">
          <Image
            src={images[selected]}
            alt={product.name}
            fill
            priority
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Verified Badge */}
        {product.verified && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-obsidian/85 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-champagne" />
            Verified Product
          </div>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {selected + 1} / {images.length}
        </div>

        {/* Expand */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-105"
        >
          <Expand className="h-5 w-5 text-obsidian/70" />
        </button>

        {/* Prev */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={previous}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Next */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300",
                selected === index
                  ? "border-sapphire shadow-lg"
                  : "border-border hover:border-sapphire/40"
              )}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton={false}
          className="!max-w-4xl border-0 bg-obsidian p-0"
        >
          <div className="relative aspect-square w-full sm:aspect-[4/3]">
            <Image
              src={images[selected]}
              alt={product.name}
              fill
              className="object-contain"
            />

            {/* Close */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-105"
            >
              <X className="h-5 w-5 text-obsidian/70" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {selected + 1} / {images.length}
            </div>

            {/* Prev */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={previous}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-105"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-105"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto bg-obsidian-soft p-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={cn(
                    "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300",
                    selected === index
                      ? "border-champagne"
                      : "border-white/10 hover:border-white/30"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}