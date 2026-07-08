import ProductCard from "./ProductCard";
import { Product } from "../data/products";

interface Props {
  products: Product[];
}

export default function ProductGrid({
  products,
}: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}