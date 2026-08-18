import { fetchCategories } from "@/features/categories/api";
import { fetchProducts } from "@/features/products/api";
import { fetchSellerProfile } from "@/features/sellers/api";
import { apiFetch } from "@/lib/api";
import { Product } from "@/features/products/data/products";

// Categories that require business verification before checkout —
// mirrors the Restricted Products Policy at /restricted-products.
export const RESTRICTED_CATEGORY_SLUGS = [
  "tobacco-nicotine",
  "vaping-accessories",
];

export interface HomeCategory {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  restricted: boolean;
}

export async function fetchFeaturedCategories(): Promise<HomeCategory[]> {
  const categories = await fetchCategories();

  return categories.slice(0, 8).map((category) => ({
    id: category.id,
    slug: category.slug,
    name: category.name,
    subtitle:
      category.description ||
      `${category.products.toLocaleString()} products available`,
    restricted: RESTRICTED_CATEGORY_SLUGS.includes(category.slug),
  }));
}

export async function fetchInventoryLanes(): Promise<{
  newThisWeek: Product[];
  lowMoq: Product[];
}> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [newThisWeek, lowMoq] = await Promise.all([
    fetchProducts({
      sort: "newest",
      created_after: sevenDaysAgo.toISOString().slice(0, 10),
      per_page: 6,
    }),
    fetchProducts({ max_moq: 5, sort: "newest", per_page: 6 }),
  ]);

  return {
    newThisWeek: newThisWeek.products,
    lowMoq: lowMoq.products,
  };
}

export async function fetchReadyToOrder(): Promise<Product[]> {
  const { products } = await fetchProducts({ per_page: 6, sort: "newest" });
  return products;
}

interface ApiFeaturedSeller {
  seller_id: string;
  business_type: string;
  fulfillment_region: string | null;
  typical_lead_time: string | null;
  verified: boolean;
  listings_count: number;
  categories: { uuid: string; name: string; slug: string }[];
}

export interface FeaturedSeller {
  sellerId: string;
  businessType: string;
  fulfillmentRegion: string | null;
  typicalLeadTime: string | null;
  verified: boolean;
  listingsCount: number;
  categories: { uuid: string; name: string; slug: string }[];
}

export async function fetchFeaturedSellers(): Promise<FeaturedSeller[]> {
  const data = await apiFetch<{ sellers: ApiFeaturedSeller[] }>(
    "/sellers/featured",
    { limit: 3 }
  );

  return data.sellers.map((seller) => ({
    sellerId: seller.seller_id,
    businessType: seller.business_type,
    fulfillmentRegion: seller.fulfillment_region,
    typicalLeadTime: seller.typical_lead_time,
    verified: seller.verified,
    listingsCount: seller.listings_count,
    categories: seller.categories ?? [],
  }));
}

// Re-exported so page-level code doesn't need to know the seller
// profile lookup lives in a different feature module.
export { fetchSellerProfile };
