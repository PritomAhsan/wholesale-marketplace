import Hero from "@/features/home/sections/Hero";
import FeaturedCategories from "@/features/home/sections/FeaturedCategories";
import FeaturedProducts from "@/features/home/sections/FeaturedProducts";
import HowItWorks from "@/features/home/sections/HowItWorks";
import TrustedBusinesses from "@/features/home/sections/TrustedBusinesses";
import BecomeSupplierCTA from "@/features/home/sections/BecomeSupplierCTA";
import Testimonials from "@/features/home/sections/Testimonials";
import Newsletter from "@/features/home/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <HowItWorks />
      {/* <TrustedBusinesses /> */}
      <BecomeSupplierCTA />
      <Testimonials />
      <Newsletter />
    </>
  );
}
