export interface Category {
  id: number;
  slug: string;
  name: string;
  image: string;
  description: string;
  suppliers: number;
  products: number;
}

export const categories: Category[] = [
  {
    id: 1,
    slug: "electronics",
    name: "Electronics",
    image: "https://placehold.co/1200x800/png",
    description: "Consumer electronics and accessories",
    suppliers: 325,
    products: 2450,
  },
  {
    id: 2,
    slug: "fashion",
    name: "Fashion",
    image: "https://placehold.co/1200x800/png",
    description: "Garments and apparel",
    suppliers: 180,
    products: 1700,
  },
  {
    id: 3,
    slug: "furniture",
    name: "Furniture",
    image: "https://placehold.co/1200x800/png",
    description: "Home and office furniture",
    suppliers: 120,
    products: 980,
  },
  {
    id: 4,
    slug: "machinery",
    name: "Machinery",
    image: "https://placehold.co/1200x800/png",
    description: "Industrial machinery and tools",
    suppliers: 95,
    products: 650,
  },
  {
    id: 5,
    slug: "packaging",
    name: "Packaging",
    image: "https://placehold.co/1200x800/png",
    description: "Boxes and packaging materials",
    suppliers: 85,
    products: 540,
  },
  {
    id: 6,
    slug: "home-living",
    name: "Home & Living",
    image: "https://placehold.co/1200x800/png",
    description: "Kitchen, décor and lifestyle products",
    suppliers: 140,
    products: 1120,
  },
];

export const getCategoryBySlug = (slug: string) =>
    categories.find((category) => category.slug === slug);