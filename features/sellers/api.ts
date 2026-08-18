import { apiFetch } from "@/lib/api";
import { toProduct, ApiProductListItem } from "@/features/products/api";
import { Product } from "@/features/products/data/products";

interface ApiSellerCategory {
  uuid: string;
  name: string;
  slug: string;
}

interface ApiSellerProfile {
  seller_id: string;
  business_type: string;
  verified: boolean;
  member_since: string;
  logo: string | null;
  banner: string | null;
  categories: ApiSellerCategory[];
  listings_count: number;
}

export interface SellerProfile {
  sellerId: string;
  businessType: string;
  verified: boolean;
  memberSince: string;
  logo: string | null;
  banner: string | null;
  categories: ApiSellerCategory[];
  listingsCount: number;
}

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

function toSellerProfile(item: ApiSellerProfile): SellerProfile {
  return {
    sellerId: item.seller_id,
    businessType: item.business_type,
    verified: item.verified,
    memberSince: item.member_since,
    logo: item.logo,
    banner: item.banner,
    categories: item.categories ?? [],
    listingsCount: item.listings_count ?? 0,
  };
}

export async function fetchSellerProfile(
  sellerId: string,
  params?: {
    page?: number;
    per_page?: number;
    brand?: string;
    min_price?: number;
    max_price?: number;
    min_moq?: number;
    max_moq?: number;
    in_stock?: boolean;
    sort?: string;
  }
): Promise<{
  seller: SellerProfile;
  listings: Product[];
  pagination: Pagination;
} | null> {
  try {
    const data = await apiFetch<{
      seller: ApiSellerProfile;
      listings: ApiProductListItem[];
      pagination: Pagination;
    }>(`/sellers/${sellerId}`, params);

    return {
      seller: toSellerProfile(data.seller),
      listings: data.listings.map(toProduct),
      pagination: data.pagination,
    };
  } catch {
    return null;
  }
}
