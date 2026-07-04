import { categories } from "../data/categories";

export default function CategoryPills() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">

      {categories.map((category) => (
        <button
          key={category}
          className="rounded-full border bg-white px-5 py-2 text-sm transition hover:border-blue-600 hover:text-blue-600"
        >
          {category}
        </button>
      ))}

    </div>
  );
}