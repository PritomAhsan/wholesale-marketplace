export interface Category {
  id: number;
  slug: string;
  name: string;
  image: string;
  description: string;
  suppliers: number;
  products: number;
  children: { id: number; slug: string; name: string }[];
}
