import Container from "@/components/layout/Container";

import { Product, products } from "../data/products";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductDescription from "../components/ProductDescription";
import ProductTabs from "../components/ProductTabs";
import RelatedProducts from "../components/RelatedProducts";

interface Props {
  product: Product;
}

export default function ProductDetails({
  product,
}: Props) {
  return (
    <section className="bg-slate-50 py-8">

      <Container>

        {/* Breadcrumb */}

        <div className="mb-8 text-sm text-slate-500">
          Home / Products /{" "}
          <span className="font-medium text-slate-900">
            {product.name}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          <ProductGallery
            images={product.gallery}
            alt={product.name}
          />

          <ProductInfo product={product} />

        </div>

        <div className="mt-16">
            <ProductTabs product={product} />

            <RelatedProducts
    currentProduct={product}
    products={products}
/>
        </div>

      </Container>

    </section>
  );
}