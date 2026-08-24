import Hero from "@/features/home/sections/Hero";
import AssuranceRail from "@/features/home/sections/AssuranceRail";
// import ShopByNeed from "@/features/home/sections/ShopByNeed";
import FeaturedCategories from "@/features/home/sections/FeaturedCategories";
import InventoryLanes from "@/features/home/sections/InventoryLanes";
import ReadyToOrder from "@/features/home/sections/ReadyToOrder";
// import RestockPlanner from "@/features/home/sections/RestockPlanner";
import RfqDesk from "@/features/home/sections/RfqDesk";
import WhatBulkareIs from "@/features/home/sections/WhatBulkareIs";
import ProtectedSupplierNetwork from "@/features/home/sections/ProtectedSupplierNetwork";
import HowItWorks from "@/features/home/sections/HowItWorks";
// import BuyerSupplierCTA from "@/components/shared/BuyerSupplierCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InventoryLanes />
      <AssuranceRail />
      {/* <ShopByNeed /> */}
      <FeaturedCategories />
      <ReadyToOrder />
      {/* <RestockPlanner /> */}
      <WhatBulkareIs />
      <RfqDesk />
      <HowItWorks />
      <ProtectedSupplierNetwork />
      {/* <BuyerSupplierCTA /> */}
    </>
  );
}
