export interface Product {
  id: number;
  uuid: string;
  slug: string;
  name: string;
  supplier: string;
  supplierUuid: string;
  sellerId: string;
  supplierLogo: string;
  country: string;
  category: string;
  price: number;
  moq: number;
  stock: number;
  verified: boolean;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
  priceTiers: {
    minQuantity: number;
    discountPercent: number | null;
    discountPrice: number | null;
  }[];
  averageRating: number | null;
  reviewsCount: number;
}
