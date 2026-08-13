import { fetchCategories } from "@/features/categories/api";
import { fetchProducts } from "@/features/products/api";

export interface HomeCategory {
  id: number;
  name: string;
  products: string;
}

export interface HomeProduct {
  id: number;
  slug: string;
  name: string;
  image: string;
  supplier: string;
  country: string;
  price: string;
  moq: number;
}

export async function fetchFeaturedCategories(): Promise<HomeCategory[]> {
  const categories = await fetchCategories();

  return categories.slice(0, 8).map((category) => ({
    id: category.id,
    name: category.name,
    products: `${category.products.toLocaleString()} Products`,
  }));
}

export async function fetchFeaturedProducts(): Promise<HomeProduct[]> {
  const { products } = await fetchProducts({ per_page: 4 });

  return products.map((product) => ({
    id: product.id as unknown as number,
    slug: product.slug,
    name: product.name,
    image: product.image,
    supplier: product.supplier,
    country: product.country,
    price: `$${product.price}`,
    moq: product.moq,
  }));
}
