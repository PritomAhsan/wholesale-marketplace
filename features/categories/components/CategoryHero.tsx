import SearchInput from "@/features/products/components/SearchInput";

interface Props {
  total: number;
}

export default function CategoryHero({
  total,
}: Props) {
  return (
    <section className="mb-12 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-10 text-white">

      <h1 className="text-5xl font-black">
        Browse Categories
      </h1>

      <p className="mt-4 max-w-2xl text-blue-100 text-lg">
        Discover verified suppliers and wholesale products
        across multiple industries.
      </p>

      <div className="mt-8 max-w-xl">
        <SearchInput placeholder="Search categories..." />
      </div>

      <div className="mt-8 flex gap-8 text-sm">

        <div>

          <div className="text-3xl font-bold">
            {total}
          </div>

          Categories

        </div>

        <div>

          <div className="text-3xl font-bold">
            7K+
          </div>

          Products

        </div>

        <div>

          <div className="text-3xl font-bold">
            900+
          </div>

          Suppliers

        </div>

      </div>

    </section>
  );
}