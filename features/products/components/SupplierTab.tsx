import {
  BadgeCheck,
  Globe,
  MapPin,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

import { Product } from "../data/products";

interface Props {
  product: Product;
}

export default function SupplierTab({
  product,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">

      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-2xl font-bold text-white">
          {product.supplier.charAt(0)}
        </div>

        <div>

          <h3 className="text-2xl font-bold">
            {product.supplier}
          </h3>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {product.country}
            </span>

            <span className="flex items-center gap-1">
              <BadgeCheck size={16} />
              Verified Supplier
            </span>

            <span className="flex items-center gap-1">
              <Globe size={16} />
              Global Exporter
            </span>

          </div>

        </div>

      </div>

      <p className="mt-8 leading-8 text-slate-600">
        {product.supplier} has been supplying wholesale products
        to buyers across international markets with a focus on
        quality, competitive pricing and reliable delivery.
      </p>

      <div className="mt-8 flex gap-4">

        <AppButton>
          Contact Supplier
        </AppButton>

        <AppButton variant="outline">
          View Profile
        </AppButton>

      </div>

    </div>
  );
}