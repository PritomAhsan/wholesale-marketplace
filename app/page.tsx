import Hero from "@/features/home/sections/Hero";
import FeaturedCategories from "@/features/home/sections/FeaturedCategories";
import FeaturedSuppliers from "@/features/home/sections/FeaturedSuppliers";
import FeaturedProducts from "@/features/home/sections/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedSuppliers />
      <FeaturedProducts />
    </>
  );
}