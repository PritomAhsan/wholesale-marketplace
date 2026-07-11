import { notFound } from "next/navigation";

import SupplierProfile from "@/features/suppliers/sections/SupplierProfile";
import { getSupplierBySlug } from "@/features/suppliers/data/suppliers";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SupplierPage({
  params,
}: Props) {
  const { slug } = await params;

  const supplier = getSupplierBySlug(slug);

  if (!supplier) {
    notFound();
  }

  return <SupplierProfile supplier={supplier} />;
}