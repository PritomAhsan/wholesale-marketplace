import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { AppButton } from "@/components/ui/app-button";

interface Props {
  name: string;
  image: string;
  supplier: string;
  country: string;
  price: string;
  moq: number;
}

export default function ProductCard({
  name,
  image,
  supplier,
  country,
  price,
  moq,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="space-y-4 p-6">

        <div>
          <h3 className="line-clamp-2 text-lg font-semibold">
            {name}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {supplier}
          </p>

          <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin size={14} />
            {country}
          </div>
        </div>

        <div className="flex items-end justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Starting From
            </p>

            <h4 className="text-2xl font-bold text-blue-600">
              {price}
            </h4>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              MOQ
            </p>

            <p className="font-semibold">
              {moq}
            </p>
          </div>

        </div>

        <AppButton className="w-full justify-between">
          View Product
          <ArrowRight size={18} />
        </AppButton>

      </div>

    </div>
  );
}