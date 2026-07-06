import Image from "next/image";
import { Quote, Star } from "lucide-react";

interface Props {
  name: string;
  company: string;
  country: string;
  review: string;
  rating: number;
  image: string;
}

export default function TestimonialCard({
  name,
  company,
  country,
  review,
  rating,
  image,
}: Props) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <Quote className="h-10 w-10 text-blue-600 opacity-20" />

      <p className="mt-6 leading-8 text-slate-600">
        `{review}`
      </p>

      <div className="mt-6 flex">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">

        <Image
          src={image}
          alt={name}
          width={60}
          height={60}
          className="rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">
            {name}
          </h4>

          <p className="text-sm text-slate-500">
            {company}
          </p>

          <p className="text-sm text-slate-400">
            {country}
          </p>
        </div>

      </div>

    </div>
  );
}