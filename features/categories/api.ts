import { apiFetch } from "@/lib/api";
import { Category } from "./data/categories";

interface ApiCategory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  children_count: number;
  products_count: number;
}

function toCategory(item: ApiCategory): Category {
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    image: item.image ?? "/images/product-placeholder.svg",
    description: item.description ?? "",
    products: item.products_count,
    // Supplier counts per category aren't exposed by the API yet.
    suppliers: 0,
  };
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await apiFetch<{ categories: ApiCategory[] }>("/categories");

  return data.categories.map(toCategory);
}

export async function fetchCategoryBySlug(
  slug: string
): Promise<Category | null> {
  try {
    const data = await apiFetch<{ category: ApiCategory }>(
      `/categories/${slug}`
    );

    return toCategory(data.category);
  } catch {
    return null;
  }
}
