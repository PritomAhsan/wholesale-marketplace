import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Clock3,
  MapPin,
  Package,
  Star,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { Supplier } from "../data/suppliers";

interface Props {
  supplier: Supplier;
}

export default function SupplierCard({ supplier }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-xl">

      <div className="flex flex-col gap-8 p-8 lg:flex-row">

        {/* Logo */}

        <div className="flex justify-center lg:block">

          <Image
            src={supplier.logo}
            alt={supplier.name}
            width={100}
            height={100}
            className="h-24 w-24 rounded-2xl border bg-slate-50 object-cover"
          />

        </div>

        {/* Content */}

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-2xl font-bold">
              {supplier.name}
            </h2>

            {supplier.verified && (
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">

                <BadgeCheck size={16} />

                Verified

              </div>
            )}

          </div>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">

            <span className="flex items-center gap-2">
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
              {supplier.rating}
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {supplier.city}, {supplier.country}
            </span>

            <span className="flex items-center gap-2">
              <Building2 size={16} />
              Since {supplier.established}
            </span>

          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-sm text-slate-500">
                Products
              </p>

              <p className="mt-1 text-xl font-bold">
                {supplier.totalProducts}
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-sm text-slate-500">
                Response Rate
              </p>

              <p className="mt-1 text-xl font-bold">
                {supplier.responseRate}%
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-sm text-slate-500">
                Response Time
              </p>

              <p className="mt-1 flex items-center gap-2 text-xl font-bold">

                <Clock3 size={18} />

                {supplier.responseTime}

              </p>

            </div>

          </div>

          <p className="mt-6 leading-7 text-slate-600">
            {supplier.description}
          </p>

        </div>

        {/* CTA */}

        <div className="flex w-full flex-col gap-4 lg:w-60">

          <div className="rounded-2xl bg-blue-50 p-5 text-center">

            <Package
              className="mx-auto mb-2 text-blue-600"
              size={24}
            />

            <p className="text-sm text-slate-500">
              Category
            </p>

            <p className="font-bold">
              {supplier.category}
            </p>

          </div>

          <Link href={`/suppliers/${supplier.slug}`}>

            <AppButton className="w-full">
              Visit Store
            </AppButton>

          </Link>

          <AppButton
            variant="outline"
            className="w-full"
          >
            Contact Supplier
          </AppButton>

        </div>

      </div>

    </div>
  );
}