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

      {/* Results */}

      {/* <div className="flex flex-col gap-3 rounded-[30px] border border-slate-200 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            Search Results
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {products.length}
            </span>{" "}
            verified wholesale products.
          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
            Verified Suppliers
          </span>

          <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700">
            Ready To Ship
          </span>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-700">
            Trade Assurance
          </span>

        </div>

      </div> */}

      {/* Products */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      {/* Bottom Summary */}

      {/* <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-5 text-center">

        <p className="text-sm text-slate-500">
          End of results.
        </p>

        <p className="mt-2 text-lg font-semibold text-slate-900">
          Browse more categories or refine your filters to discover additional suppliers.
        </p>

      </div> */}

    </div>
  );
}