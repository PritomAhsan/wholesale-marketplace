import { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface Props {
  currentProduct: Product;
  products: Product[];
}

export default function RelatedProducts({
  currentProduct,
  products,
}: Props) {
  const related = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mt-20">

      <div className="mb-10 flex items-end justify-between">

        <div>

          <h2 className="text-2xl font-bold text-obsidian sm:text-3xl">
            Other Recommendations
          </h2>

          <p className="mt-2 text-obsidian/50">
            More products from the same category.
          </p>

        </div>

      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

        {related.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}