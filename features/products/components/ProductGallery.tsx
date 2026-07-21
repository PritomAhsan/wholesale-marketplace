"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, ShieldCheck } from "lucide-react";

import { Product } from "../data/products";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = useMemo(() => {
    if (product.gallery?.length) {
      return product.gallery;
    }

    return [product.image];
  }, [product]);

  const [selected, setSelected] = useState(0);

  const previous = () => {
    setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
            <ShieldCheck className="h-4 w-4" />
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
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-105"
        >
          <Expand className="h-5 w-5 text-slate-700" />
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
                  ? "border-primary shadow-lg"
                  : "border-slate-200 hover:border-slate-300"
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
    </div>
  );
}