"use client";

import { Product } from "../data/products";

import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import PriceCard from "../components/PriceCard";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="py-2 lg:py-4">
      <div className="grid gap-8 xl:grid-cols-[1.15fr_1fr_360px]">
        {/* Gallery */}
        <div className="min-w-0">
          <ProductGallery
            product={product}
          />
        </div>

        {/* Product Information */}
        <div className="min-w-0">
          <ProductInfo product={product} />
        </div>

        {/* Price Card */}
        <div className="min-w-0">
          <PriceCard product={product} />
        </div>
      </div>
    </section>
  );
}