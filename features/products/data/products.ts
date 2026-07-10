export interface Product {
  id: number;
  slug: string;
  name: string;
  supplier: string;
  supplierLogo: string;
  country: string;
  category: string;
  price: number;
  moq: number;
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

export const products: Product[] = [
  {
    id: 1,
    slug: "wireless-bluetooth-headphones",
    name: "Wireless Bluetooth Headphones",
    supplier: "Global Electronics",
    supplierLogo: "",
    country: "China",
    category: "Electronics",
    price: 12.5,
    moq: 100,
    rating: 4.8,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Premium wireless headphones with noise cancellation.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  specifications: [
  { label: "Model", value: "WH-500 Pro" },
  { label: "Bluetooth Version", value: "5.3" },
  { label: "Battery Life", value: "40 Hours" },
  { label: "Charging Port", value: "USB Type-C" },
  { label: "Noise Cancellation", value: "Active ANC" },
  { label: "Material", value: "ABS Plastic" },
  { label: "Certification", value: "CE, FCC, RoHS" },
  { label: "Warranty", value: "12 Months" },
],
  },
  {
    id: 2,
    slug: "smart-led-bulb",
    name: "Smart LED Bulb",
    supplier: "Bright Tech",
    country: "China",
    category: "Electronics",
    price: 3.1,
    moq: 300,
    rating: 4.7,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Energy-efficient smart LED bulb with Wi-Fi control.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 3,
    slug: "premium-cotton-tshirt",
    name: "Premium Cotton T-Shirt",
    supplier: "Fashion World",
    country: "Bangladesh",
    category: "Fashion",
    price: 4.2,
    moq: 500,
    rating: 4.9,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "100% combed cotton wholesale t-shirts.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 4,
    slug: "ceramic-coffee-mug",
    name: "Ceramic Coffee Mug",
    supplier: "Home Living",
    country: "Turkey",
    category: "Home & Living",
    price: 2.8,
    moq: 200,
    rating: 4.6,
    verified: false,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Durable ceramic mug with premium finish.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 5,
    slug: "office-desk-chair",
    name: "Ergonomic Office Chair",
    supplier: "Comfort Furniture",
    country: "Malaysia",
    category: "Furniture",
    price: 49,
    moq: 50,
    rating: 4.9,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Comfortable ergonomic office chair for long working hours.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 6,
    slug: "wooden-dining-table",
    name: "Solid Wood Dining Table",
    supplier: "Oak Furnishings",
    country: "Vietnam",
    category: "Furniture",
    price: 120,
    moq: 20,
    rating: 4.8,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Premium handcrafted dining table.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 7,
    slug: "kraft-paper-box",
    name: "Kraft Paper Packaging Box",
    supplier: "Eco Packaging",
    country: "India",
    category: "Packaging",
    price: 0.45,
    moq: 1000,
    rating: 4.5,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Eco-friendly recyclable packaging boxes.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 8,
    slug: "vacuum-food-bag",
    name: "Vacuum Food Storage Bags",
    supplier: "FreshPack",
    country: "China",
    category: "Packaging",
    price: 0.2,
    moq: 5000,
    rating: 4.7,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Food-grade vacuum storage bags.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 9,
    slug: "industrial-drill-machine",
    name: "Industrial Drill Machine",
    supplier: "Mega Machinery",
    country: "Germany",
    category: "Machinery",
    price: 340,
    moq: 5,
    rating: 4.9,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Heavy-duty industrial drilling equipment.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 10,
    slug: "automatic-water-pump",
    name: "Automatic Water Pump",
    supplier: "Hydro Systems",
    country: "Japan",
    category: "Machinery",
    price: 180,
    moq: 20,
    rating: 4.8,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Reliable automatic water pump for industrial use.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 11,
    slug: "stainless-steel-bottle",
    name: "Stainless Steel Water Bottle",
    supplier: "Eco Drinkware",
    country: "China",
    category: "Home & Living",
    price: 3.9,
    moq: 300,
    rating: 4.7,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "Double-wall insulated stainless steel bottle.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
  {
    id: 12,
    slug: "usb-c-fast-charger",
    name: "USB-C Fast Charger",
    supplier: "PowerTech",
    country: "South Korea",
    category: "Electronics",
    price: 6.5,
    moq: 200,
    rating: 4.8,
    verified: true,
    image: "https://placehold.co/1200x900/png",
    gallery: [
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
        "https://placehold.co/700x700/png",
    ],
    shortDescription: "65W USB-C fast charging adapter.",
    description:
  "Our Wireless Bluetooth Headphones are designed for distributors, wholesalers, and retailers looking for premium audio products at competitive wholesale prices. Manufactured using high-quality components, they feature Bluetooth 5.3 connectivity, active noise cancellation, long battery life, and a lightweight ergonomic design. OEM and private label services are available for international buyers.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}