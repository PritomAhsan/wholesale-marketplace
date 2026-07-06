import { ArrowRight, BadgeCheck, Globe, Store } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";

export default function BecomeSupplierCTA() {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700 px-8 py-16 text-white shadow-2xl lg:px-16">

          {/* Background */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <Store size={16} />
                Grow Your Business
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">
                Become a Verified Supplier and Reach Buyers Worldwide
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
                Showcase your products, receive quotation requests,
                connect with global buyers, and grow your wholesale
                business from one platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <AppButton
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-slate-100"
                >
                  Become a Supplier
                  <ArrowRight className="ml-2 h-5 w-5" />
                </AppButton>

                <AppButton
                  variant="secondary"
                  size="lg"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Learn More
                </AppButton>

              </div>

            </div>

            {/* Right */}

            <div className="grid gap-5">

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-white/20 p-3">
                    <Globe className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Global Exposure
                    </h3>

                    <p className="mt-1 text-sm text-blue-100">
                      Connect with buyers from 40+ countries.
                    </p>
                  </div>

                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-white/20 p-3">
                    <BadgeCheck className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Verified Supplier Badge
                    </h3>

                    <p className="mt-1 text-sm text-blue-100">
                      Build trust and improve visibility in search results.
                    </p>
                  </div>

                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-white/20 p-3">
                    <Store className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Dedicated Storefront
                    </h3>

                    <p className="mt-1 text-sm text-blue-100">
                      Showcase products, company details, and certifications.
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}