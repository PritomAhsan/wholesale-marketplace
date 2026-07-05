import Image from "next/image";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";

import HeroSearch from "../components/HeroSearch";
import HeroStats from "../components/HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <Container className="grid min-h-[700px] items-center gap-20 py-20 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Trusted by 10,000+ Businesses
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight lg:text-7xl">
            Source Products Directly From
            <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Verified Suppliers
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Connect with trusted manufacturers worldwide, compare wholesale
            pricing, request quotations, and grow your business with confidence.
          </p>

          <HeroSearch />

          <div className="mt-8 flex flex-wrap gap-4">

            <AppButton size="lg">
              Explore Marketplace
            </AppButton>

            <AppButton
              size="lg"
              variant="secondary"
            >
              Become a Supplier
            </AppButton>

          </div>

          <HeroStats />

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="overflow-hidden rounded-3xl shadow-2xl">

            <Image
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop"
              alt="Warehouse"
              width={700}
              height={700}
              className="h-[600px] w-full object-cover"
              priority
            />

          </div>

          <div className="absolute -left-8 bottom-8 rounded-2xl bg-white p-5 shadow-xl">

            <div className="text-sm text-slate-500">
              Verified Supplier
            </div>

            <h3 className="mt-2 font-semibold">
              Global Electronics Ltd.
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Shenzhen, China
            </p>

          </div>

          <div className="absolute -right-6 top-10 rounded-2xl bg-white p-5 shadow-xl">

            <div className="text-sm text-slate-500">
              MOQ
            </div>

            <h3 className="mt-2 text-2xl font-bold">
              100 Units
            </h3>

          </div>

        </div>

      </Container>
    </section>
  );
}