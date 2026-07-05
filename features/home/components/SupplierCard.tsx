import Image from "next/image";
import { BadgeCheck, MapPin, Star } from "lucide-react";

interface Props {
  name: string;
  location: string;
  rating: number;
  verified: boolean;
  years: number;
  products: number;
  image: string;
}

export default function SupplierCard(props: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48">
        <Image
          src={props.image}
          alt={props.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{props.name}</h3>

          {props.verified && (
            <BadgeCheck className="h-5 w-5 text-blue-600" />
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} />
          {props.location}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
            {props.rating}
          </span>

          <span>{props.products} Products</span>
        </div>

        <div className="text-sm text-slate-500">
          {props.years} Years in Business
        </div>

        <button className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
          Visit Store
        </button>
      </div>
    </div>
  );
}