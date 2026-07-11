import { notFound } from "next/navigation";

import CategoryDetailsPage from "@/features/categories/sections/CategoryDetailsPage";

import { getCategoryBySlug } from "@/features/categories/data/categories";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({
    params,
}: Props) {

    const { slug } = await params;

    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    return (
        <CategoryDetailsPage
            category={category}
        />
    );
}