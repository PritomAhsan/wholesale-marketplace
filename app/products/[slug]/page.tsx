import { notFound } from "next/navigation";

import ProductDetails from "@/features/products/sections/ProductDetails";
import { getProductBySlug } from "@/features/products/data/products";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}