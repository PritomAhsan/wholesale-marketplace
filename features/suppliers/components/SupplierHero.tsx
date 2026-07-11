import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  MapPin,
  Star,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";

import { Supplier } from "../data/suppliers";

interface Props {
  supplier: Supplier;
}

export default function SupplierHero({
  supplier,
}: Props) {
  return (
    <>
      {/* <div className="relative h-72 overflow-hidden">

        <Image
          src={supplier.banner}
          alt={supplier.name}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

      </div> */}

      <Container className="pt-28">

        <div className="-mt-20 rounded-3xl bg-white p-8 shadow-xl">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

            <Image
              src={supplier.logo}
              alt={supplier.name}
              width={120}
              height={120}
              className="rounded-3xl border"
            />

            <div className="flex-1">

              <h1 className="text-4xl font-black">
                {supplier.name}
              </h1>

              <div className="mt-5 flex flex-wrap gap-5">

                <span className="flex items-center gap-2">

                  <Star className="fill-yellow-400 text-yellow-400" />

                  {supplier.rating}

                </span>

                <span className="flex items-center gap-2">

                  <BadgeCheck />

                  Verified Supplier

                </span>

                <span className="flex items-center gap-2">

                  <MapPin />

                  {supplier.city}, {supplier.country}

                </span>

                <span className="flex items-center gap-2">

                  <Building2 />

                  Since {supplier.established}

                </span>

              </div>

            </div>

            <AppButton size="lg">
              Contact Supplier
            </AppButton>

          </div>

        </div>

      </Container>
    </>
  );
}