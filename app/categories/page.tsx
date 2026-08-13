import CategoriesPage from "@/features/categories/sections/CategoriesPage";
import { fetchCategories } from "@/features/categories/api";

export default async function Page() {
  const categories = await fetchCategories();

  return <CategoriesPage categories={categories} />;
}
