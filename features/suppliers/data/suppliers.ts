export interface Supplier {
  id: number;
  slug: string;

  name: string;
  logo: string;
  banner: string;

  country: string;
  city: string;

  category: string;

  established: number;
  employees: string;

  totalProducts: number;

  verified: boolean;

  rating: number;

  responseRate: number;
  responseTime: string;

  description: string;
}

export const suppliers: Supplier[] = [
  {
    id: 1,
    slug: "global-electronics",
    name: "Global Electronics Ltd.",
    logo: "https://placehold.co/700x700/png",
    banner: "/images/banners/supplier-banner.jpg",
    country: "China",
    city: "Shenzhen",
    category: "Electronics",
    established: 2012,
    employees: "500-1000",
    totalProducts: 325,
    verified: true,
    rating: 4.9,
    responseRate: 98,
    responseTime: "< 2 Hours",
    description:
      "Leading OEM manufacturer of consumer electronics serving distributors and wholesalers worldwide.",
  },

  {
    id: 2,
    slug: "bangla-apparel",
    name: "Bangla Apparel Ltd.",
    logo: "https://placehold.co/700x700/png",
    banner: "/images/banners/supplier-banner.jpg",
    country: "Bangladesh",
    city: "Dhaka",
    category: "Fashion",
    established: 2010,
    employees: "1000+",
    totalProducts: 185,
    verified: true,
    rating: 4.8,
    responseRate: 97,
    responseTime: "< 3 Hours",
    description:
      "Manufacturer of knitwear, woven garments and custom apparel for international brands.",
  },

  {
    id: 3,
    slug: "modern-furniture",
    name: "Modern Furniture",
    logo: "https://placehold.co/700x700/png",
    banner: "/images/banners/supplier-banner.jpg",
    country: "Vietnam",
    city: "Ho Chi Minh",
    category: "Furniture",
    established: 2015,
    employees: "200-500",
    totalProducts: 96,
    verified: true,
    rating: 4.7,
    responseRate: 95,
    responseTime: "< 4 Hours",
    description:
      "Exporter of premium home and office furniture for wholesale buyers.",
  },

  {
    id: 4,
    slug: "tech-components",
    name: "Tech Components",
    logo: "https://placehold.co/700x700/png",
    banner: "/images/banners/supplier-banner.jpg",
    country: "Taiwan",
    city: "Taipei",
    category: "Electronics",
    established: 2014,
    employees: "100-200",
    totalProducts: 420,
    verified: true,
    rating: 4.8,
    responseRate: 96,
    responseTime: "< 2 Hours",
    description:
      "Supplier of electronic components, sensors and embedded hardware.",
  },

  {
    id: 5,
    slug: "ocean-packaging",
    name: "Ocean Packaging",
    logo: "https://placehold.co/700x700/png",
    banner: "/images/banners/supplier-banner.jpg",
    country: "India",
    city: "Mumbai",
    category: "Packaging",
    established: 2011,
    employees: "300-500",
    totalProducts: 160,
    verified: true,
    rating: 4.6,
    responseRate: 95,
    responseTime: "< 5 Hours",
    description:
      "Eco-friendly packaging manufacturer with worldwide export experience.",
  },

  {
    id: 6,
    slug: "industrial-tools",
    name: "Industrial Tools Co.",
    logo: "https://placehold.co/700x700/png",
    banner: "/images/banners/supplier-banner.jpg",
    country: "Germany",
    city: "Berlin",
    category: "Machinery",
    established: 2005,
    employees: "500+",
    totalProducts: 210,
    verified: true,
    rating: 4.9,
    responseRate: 99,
    responseTime: "< 1 Hour",
    description:
      "Manufacturer of industrial machinery and heavy-duty engineering tools.",
  },

  {
    id: 7,
    slug: "home-living",
    name: "Home Living",
    logo: "https://placehold.co/700x700/png",
    banner: "/images/banners/supplier-banner.jpg",
    country: "Turkey",
    city: "Istanbul",
    category: "Home & Living",
    established: 2016,
    employees: "150-300",
    totalProducts: 140,
    verified: true,
    rating: 4.7,
    responseRate: 94,
    responseTime: "< 6 Hours",
    description:
      "Wholesale supplier of modern home décor and lifestyle products.",
  },

  {
    id: 8,
    slug: "eco-plastics",
    name: "Eco Plastics",
    logo: "https://placehold.co/700x700/png",
    banner: "/images/banners/supplier-banner.jpg",
    country: "Malaysia",
    city: "Kuala Lumpur",
    category: "Packaging",
    established: 2013,
    employees: "200-400",
    totalProducts: 112,
    verified: true,
    rating: 4.8,
    responseRate: 97,
    responseTime: "< 2 Hours",
    description:
      "Manufacturer of recyclable plastic packaging solutions for global buyers.",
  },
];

export const getSupplierBySlug = (slug: string) =>
  suppliers.find((supplier) => supplier.slug === slug);