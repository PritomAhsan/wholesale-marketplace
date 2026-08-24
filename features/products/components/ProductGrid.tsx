import { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductGrid({
  products,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Products */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}