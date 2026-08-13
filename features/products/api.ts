import { apiFetch } from "@/lib/api";
import { Product } from "./data/products";

interface ApiSupplierRef {
  uuid: string;
  // Sellers are anonymized on the storefront — only a generated
  // display label is ever sent to buyer-facing requests.
  display_name: string;
}

interface ApiBrandRef {
  uuid: string;
  name: string;
}

export interface ApiProductListItem {
  uuid: string;
  name: string;
  slug: string;
  sku: string;
  selling_price: string | null;
  min_order_quantity: string | null;
  supplier: ApiSupplierRef;
  brand: ApiBrandRef;
  categories: string[];
  stock: number;
  primary_image: string | null;
}

interface ApiProductImage {
  id: number;
  uuid: string;
  image: string;
  alt_text: string | null;
  is_primary: boolean;
}

interface ApiProductAttribute {
  attribute: { id: number; name: string };
  value: { id: number; value: string };
}

interface ApiProductDetail {
  uuid: string;
  name: string;
  slug: string;
  sku: string;
  supplier: ApiSupplierRef | null;
  brand: ApiBrandRef | null;
  categories: { id: number; uuid: string; name: string; slug: string }[];
  attributes: ApiProductAttribute[];
  short_description: string | null;
  description: string | null;
  selling_price: string | null;
  min_order_quantity: string | null;
  stock_quantity: number;
  images: ApiProductImage[];
}

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export function toProduct(item: ApiProductListItem): Product {
  return {
    id: item.uuid as unknown as number,
    uuid: item.uuid,
    slug: item.slug,
    name: item.name,
    supplier: item.supplier?.display_name ?? "BULKARE Seller",
    supplierUuid: item.supplier?.uuid ?? "",
    supplierLogo: "",
    country: "",
    category: item.categories[0] ?? "Uncategorized",
    price: Number(item.selling_price ?? 0),
    moq: Number(item.min_order_quantity ?? 1),
    stock: item.stock,
    rating: 0,
    verified: true,
    image: item.primary_image ?? "https://placehold.co/1200x900/png",
    gallery: item.primary_image ? [item.primary_image] : [],
    shortDescription: "",
    description: "",
    specifications: [],
  };
}

function toProductDetail(item: ApiProductDetail): Product {
  const images = item.images.length
    ? item.images.map((image) => image.image)
    : ["https://placehold.co/1200x900/png"];

  return {
    id: item.uuid as unknown as number,
    uuid: item.uuid,
    slug: item.slug,
    name: item.name,
    supplier: item.supplier?.display_name ?? "BULKARE Seller",
    supplierUuid: item.supplier?.uuid ?? "",
    supplierLogo: "",
    country: "",
    category: item.categories[0]?.name ?? "Uncategorized",
    price: Number(item.selling_price ?? 0),
    moq: Number(item.min_order_quantity ?? 1),
    stock: item.stock_quantity,
    rating: 0,
    verified: true,
    image: images[0],
    gallery: images,
    shortDescription: item.short_description ?? "",
    description: item.description ?? "",
    specifications: item.attributes.map((attr) => ({
      label: attr.attribute.name,
      value: attr.value.value,
    })),
  };
}

export async function fetchProducts(params?: {
  search?: string;
  category?: string;
  brand?: string;
  supplier?: string;
  page?: number;
  per_page?: number;
}): Promise<{ products: Product[]; pagination: Pagination }> {
  const data = await apiFetch<{
    products: ApiProductListItem[];
    pagination: Pagination;
  }>("/products", params);

  return {
    products: data.products.map(toProduct),
    pagination: data.pagination,
  };
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const data = await apiFetch<{ product: ApiProductDetail }>(
      `/products/${slug}`
    );

    return toProductDetail(data.product);
  } catch {
    return null;
  }
}
