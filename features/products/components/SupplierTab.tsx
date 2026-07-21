"use client";

import {
  BadgeCheck,
  Globe,
  MapPin,
  Factory,
  Clock3,
  MessageCircle,
  Users,
  Boxes,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

import { Product } from "../data/products";

interface Props {
  product: Product;
}

const stats = [
  {
    icon: Factory,
    title: "Business Type",
    value: "Manufacturer",
  },
  {
    icon: Users,
    title: "Employees",
    value: "200+",
  },
  {
    icon: Boxes,
    title: "Main Markets",
    value: "Global",
  },
  {
    icon: Clock3,
    title: "Response Time",
    value: "< 24 Hours",
  },
];

export default function SupplierTab({ product }: Props) {
  return (
    <div className="space-y-8">
      {/* Supplier Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 text-3xl font-bold text-white shadow-lg">
              {product.supplier.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-3xl font-bold text-slate-900">
                  {product.supplier}
                </h3>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  <BadgeCheck className="h-4 w-4" />
                  Verified
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {product.country}
                </span>

                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Global Exporter
                </span>

                <span className="flex items-center gap-2">
                  ⭐ {product.rating} Rating
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <AppButton variant="primary">
              Contact Supplier
            </AppButton>

            <AppButton variant="secondary">
              View Profile
            </AppButton>

            <AppButton variant="ghost">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat
            </AppButton>
          </div>
        </div>

        <p className="mt-8 leading-8 text-slate-600">
          {product.supplier} has been supplying wholesale products to
          international buyers with a strong focus on product quality,
          competitive pricing, OEM & ODM manufacturing, and reliable
          worldwide delivery services.
        </p>
      </div>

      {/* Supplier Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>

              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Trust Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <h4 className="text-xl font-bold">
          Why Buy From This Supplier?
        </h4>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>✔ Verified Manufacturer</div>
          <div>✔ OEM & ODM Available</div>
          <div>✔ Worldwide Shipping</div>
          <div>✔ Secure Wholesale Transactions</div>
        </div>
      </div>
    </div>
  );
}