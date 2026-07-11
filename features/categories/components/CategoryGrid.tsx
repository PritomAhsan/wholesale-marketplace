import { Category } from "../data/categories";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}