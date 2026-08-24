import { apiFetch } from "@/lib/api";
import { Product, ProductVariant } from "./data/products";

interface ApiSupplierRef {
  uuid: string;
  // Sellers are anonymized on the storefront — only a protected,
  // generated Seller ID is ever sent to buyer-facing requests.
  seller_id: string | null;
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
  average_rating?: number | null;
  reviews_count?: number;
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

interface ApiProductVariantImage {
  image: string;
  is_primary: boolean;
}

interface ApiProductVariantAttribute {
  attribute_id: number;
  attribute_value_id: number;
  attribute_name: string | null;
  value: string | null;
}

interface ApiProductVariant {
  uuid: string;
  sku: string;
  selling_price: string | null;
  compare_at_price: string | null;
  wholesale_price: string | null;
  stock_quantity: number;
  minimum_order_quantity: string | null;
  maximum_order_quantity: string | null;
  is_active: boolean;
  is_default: boolean;
  attributes: ApiProductVariantAttribute[];
  images: ApiProductVariantImage[];
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
  price_tiers?: {
    min_quantity: number;
    discount_percent: number | null;
    discount_price: string | null;
  }[];
  average_rating?: number | null;
  reviews_count?: number;
  variants?: ApiProductVariant[];
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
    sellerId: item.supplier?.seller_id ?? "",
    supplierLogo: "",
    country: "",
    category: item.categories[0] ?? "Uncategorized",
    price: Number(item.selling_price ?? 0),
    moq: Number(item.min_order_quantity ?? 1),
    stock: item.stock,
    verified: true,
    image: item.primary_image ?? "/images/product-placeholder.svg",
    gallery: item.primary_image ? [item.primary_image] : [],
    shortDescription: "",
    description: "",
    specifications: [],
    priceTiers: [],
    averageRating: item.average_rating ?? null,
    reviewsCount: item.reviews_count ?? 0,
    variants: [],
  };
}

function toVariant(item: ApiProductVariant): ProductVariant {
  return {
    uuid: item.uuid,
    sku: item.sku,
    price: item.selling_price ? Number(item.selling_price) : null,
    compareAtPrice: item.compare_at_price ? Number(item.compare_at_price) : null,
    stock: item.stock_quantity,
    moq: item.minimum_order_quantity ? Number(item.minimum_order_quantity) : null,
    maxOrderQuantity: item.maximum_order_quantity
      ? Number(item.maximum_order_quantity)
      : null,
    isActive: item.is_active,
    isDefault: item.is_default,
    images: item.images.map((image) => image.image),
    attributes: item.attributes.map((attr) => ({
      attributeName: attr.attribute_name ?? "",
      value: attr.value ?? "",
    })),
  };
}

function toProductDetail(item: ApiProductDetail): Product {
  const images = item.images.length
    ? item.images.map((image) => image.image)
    : ["/images/product-placeholder.svg"];

  return {
    id: item.uuid as unknown as number,
    uuid: item.uuid,
    slug: item.slug,
    name: item.name,
    supplier: item.supplier?.display_name ?? "BULKARE Seller",
    supplierUuid: item.supplier?.uuid ?? "",
    sellerId: item.supplier?.seller_id ?? "",
    supplierLogo: "",
    country: "",
    category: item.categories[0]?.name ?? "Uncategorized",
    price: Number(item.selling_price ?? 0),
    moq: Number(item.min_order_quantity ?? 1),
    stock: item.stock_quantity,
    verified: true,
    image: images[0],
    gallery: images,
    shortDescription: item.short_description ?? "",
    description: item.description ?? "",
    specifications: item.attributes.map((attr) => ({
      label: attr.attribute.name,
      value: attr.value.value,
    })),
    priceTiers: (item.price_tiers ?? []).map((tier) => ({
      minQuantity: tier.min_quantity,
      discountPercent: tier.discount_percent,
      discountPrice: tier.discount_price ? Number(tier.discount_price) : null,
    })),
    averageRating: item.average_rating ?? null,
    reviewsCount: item.reviews_count ?? 0,
    variants: (item.variants ?? [])
      .filter((v) => v.is_active)
      .map(toVariant),
  };
}

export async function fetchProducts(params?: {
  search?: string;
  category?: string;
  brand?: string;
  supplier?: string;
  min_price?: number;
  max_price?: number;
  min_moq?: number;
  max_moq?: number;
  created_after?: string;
  in_stock?: boolean;
  featured?: boolean;
  sort?: string;
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
