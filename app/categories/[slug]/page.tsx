import { notFound } from "next/navigation";

import CategoryDetailsPage from "@/features/categories/sections/CategoryDetailsPage";

import { fetchCategoryBySlug, fetchCategories } from "@/features/categories/api";
import { fetchProducts } from "@/features/products/api";
import { fetchBrands } from "@/features/products/brandsApi";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    brand?: string;
    min_price?: string;
    max_price?: string;
    min_moq?: string;
    max_moq?: string;
    in_stock?: string;
    sort?: string;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const currentPage = Number(sp.page ?? 1);

  const [{ products, pagination }, categories, brands] = await Promise.all([
    fetchProducts({
      category: slug,
      page: currentPage,
      per_page: 20,
      brand: sp.brand,
      min_price: sp.min_price ? Number(sp.min_price) : undefined,
      max_price: sp.max_price ? Number(sp.max_price) : undefined,
      min_moq: sp.min_moq ? Number(sp.min_moq) : undefined,
      max_moq: sp.max_moq ? Number(sp.max_moq) : undefined,
      in_stock: sp.in_stock === "1" ? true : undefined,
      sort: sp.sort,
    }),
    fetchCategories(),
    fetchBrands(),
  ]);

  return (
    <CategoryDetailsPage
      category={category}
      products={products}
      pagination={pagination}
      categories={categories}
      brands={brands}
    />
  );
}
