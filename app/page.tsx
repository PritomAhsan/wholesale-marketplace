import Hero from "@/features/home/components/Hero";
import FeaturedCategories from "@/features/home/sections/FeaturedCategories";
import FeaturedSuppliers from "@/features/home/sections/FeaturedSuppliers";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedSuppliers />
    </>
  );
}