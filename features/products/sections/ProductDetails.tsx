import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Container from "@/components/layout/Container";

import { Product } from "../data/products";
import { fetchProducts } from "../api";
import RelatedProducts from "../components/RelatedProducts";
import SupplierOtherProducts from "../components/SupplierOtherProducts";
import RecentlyViewedSection from "../components/RecentlyViewedSection";
import { ProductHero } from "./ProductHero";

interface Props {
  product: Product;
}

export default async function ProductDetails({
  product,
}: Props) {
  const { products } = await fetchProducts({ per_page: 8 });

  return (
    <section className="bg-ivory py-8">
      <Container>
        {/* Breadcrumb */}

        <div className="mb-6 flex items-center gap-1.5 text-sm text-obsidian/50">
          <Link href="/" className="hover:text-sapphire">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-sapphire">
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-obsidian">{product.name}</span>
        </div>

        <ProductHero product={product} />

        {product.sellerId && (
          <SupplierOtherProducts
            sellerId={product.sellerId}
            currentProductUuid={product.uuid}
          />
        )}

        <RelatedProducts currentProduct={product} products={products} />

        <RecentlyViewedSection currentProductUuid={product.uuid} />
      </Container>
    </section>
  );
}