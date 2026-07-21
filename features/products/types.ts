export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  isPrimary?: boolean;
  type?: "image" | "video";
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductFeature {
  id: number;
  title: string;
  description: string;
}

export interface ProductTag {
  id: number;
  name: string;
}

export interface SupplierSummary {
  id: number;
  name: string;
  logo: string;
  banner?: string;

  verified: boolean
  goldSupplier?: boolean
  onsiteChecked?: boolean

  rating: number;
  reviews: number;

  responseRate: number;
  responseTime: string;

  yearsInBusiness: number;

  country: string;
  city?: string;

  employees: string;
  factoryArea: string;

  mainProducts: string[];

  certifications: string[];

  exportMarkets: string[];

  languages: string[];

  description?: string;
}

export interface ShippingInfo {
  leadTime: string;
  dispatchTime?: string;
  packaging: string;
  shippingMethods: string[];
}

export interface PaymentInfo {
  methods: string[];
  currency: string;
}

export interface ReviewImage {
  id: number;
  url: string;
}

export interface ProductReview {
  id: number;

  user: string;
  avatar?: string;

  country: string;

  rating: number;

  title?: string;

  comment: string;

  verifiedBuyer: boolean;

  date: string;

  images?: ReviewImage[];

  supplierReply?: {
    message: string;
    date: string;
  };
}

export interface RatingDistribution {
  stars: number;
  percentage: number;
}

export interface Product {
  id: number;

  slug: string;

  name: string;

  category: string;

  brand: string;

  sku: string;

  verified: boolean;

  rating: number;

  reviews: number;

  sold: number;

  country: string;

  shortDescription: string;

  description: string;

  price: number;

  currency: string;

  moq: number;

  stock: number;

  leadTime: string;

  images: ProductImage[];

  features: ProductFeature[];

  specifications: ProductSpecification[];

  tags: ProductTag[];

  supplier: SupplierSummary;

  shipping: ShippingInfo;

  payment: PaymentInfo;

  reviewList: ProductReview[];

  ratingDistribution: RatingDistribution[];

  relatedProducts: number[];

  recentlyViewed: number[];
}