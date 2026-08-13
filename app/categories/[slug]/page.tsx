import { notFound } from "next/navigation";

import CategoryDetailsPage from "@/features/categories/sections/CategoryDetailsPage";

import { fetchCategoryBySlug } from "@/features/categories/api";
import { fetchProducts } from "@/features/products/api";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({
    params,
}: Props) {

    const { slug } = await params;

    const category = await fetchCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const [productsResult, allCategoryProducts] = await Promise.all([
        fetchProducts({ category: slug, per_page: 4 }),
        fetchProducts({ category: slug, per_page: 100 }),
    ]);

    const suppliersTotal = new Set(
        allCategoryProducts.products.map((p) => p.supplierUuid)
    ).size;

    return (
        <CategoryDetailsPage
            category={category}
            products={productsResult.products}
            productsTotal={productsResult.pagination.total}
            suppliersTotal={suppliersTotal}
        />
    );
}
