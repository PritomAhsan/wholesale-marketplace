import Container from "@/components/layout/Container";

import { Product } from "../data/products";
import { fetchProducts } from "../api";
import ProductTabs from "../components/ProductTabs";
import RelatedProducts from "../components/RelatedProducts";
import { ProductHero } from "./ProductHero";

interface Props {
  product: Product;
}

export default async function ProductDetails({
  product,
}: Props) {
  const { products } = await fetchProducts({ per_page: 8 });

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

        <ProductHero product={product}/> 

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