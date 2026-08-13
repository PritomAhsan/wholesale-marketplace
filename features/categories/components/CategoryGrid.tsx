import { Category } from "../data/categories";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}