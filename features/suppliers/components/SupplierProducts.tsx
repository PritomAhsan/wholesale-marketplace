import ProductGrid from "@/features/products/components/ProductGrid";
import { products } from "@/features/products/data/products";

import { Supplier } from "../data/suppliers";

interface Props {
  supplier: Supplier;
}

export default function SupplierProducts({
  supplier,
}: Props) {
  const supplierProducts = products
    .filter(
      (product) =>
        product.supplier === supplier.name
    )
    .slice(0, 4);

  if (!supplierProducts.length) return null;

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold">
        Products from {supplier.name}
      </h2>

      <p className="mt-2 text-slate-500">
        Featured wholesale products from this supplier.
      </p>

      <div className="mt-10">

        <ProductGrid
          products={supplierProducts}
        />

      </div>

    </section>
  );
}