export interface Product {
  id: number;
  uuid: string;
  slug: string;
  name: string;
  supplier: string;
  supplierUuid: string;
  supplierLogo: string;
  country: string;
  category: string;
  price: number;
  moq: number;
  stock: number;
  rating: number;
  verified: boolean;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
}
