"use client";

import {
  Star,
  ThumbsUp,
  BadgeCheck,
  User,
} from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { Product } from "../data/products";

interface Props {
  product: Product;
}

const reviews = [
  {
    id: 1,
    name: "Michael Johnson",
    country: "United States",
    rating: 5,
    verified: true,
    date: "2 weeks ago",
    comment:
      "Excellent product quality. Packaging was secure and delivery was on time. Communication with the supplier was very professional.",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    country: "UAE",
    rating: 5,
    verified: true,
    date: "1 month ago",
    comment:
      "We've placed multiple wholesale orders and the quality has been consistent. Highly recommended supplier.",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    country: "Spain",
    rating: 4,
    verified: true,
    date: "2 months ago",
    comment:
      "Very satisfied with the product. Looking forward to placing another bulk order soon.",
  },
];

const distribution = [
  { star: 5, value: 82 },
  { star: 4, value: 12 },
  { star: 3, value: 4 },
  { star: 2, value: 1 },
  { star: 1, value: 1 },
];

export default function ReviewsTab({ product }: Props) {
  return (
    <div className="space-y-10">
      {/* Summary */}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Overall Rating */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h3 className="text-5xl font-bold text-slate-900">
            {product.rating}
          </h3>

          <div className="mt-4 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Based on customer reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h3 className="mb-6 text-xl font-bold">
            Rating Breakdown
          </h3>

          <div className="space-y-4">
            {distribution.map((item) => (
              <div
                key={item.star}
                className="flex items-center gap-4"
              >
                <div className="w-14 text-sm font-medium">
                  {item.star} Star
                </div>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>

                <div className="w-12 text-right text-sm text-slate-500">
                  {item.value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">
                      {review.name}
                    </h4>

                    {review.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        <BadgeCheck className="h-3 w-3" />
                        Verified Buyer
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {review.country} • {review.date}
                  </p>

                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: review.rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              <AppButton variant="ghost">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Helpful
              </AppButton>
            </div>

            <p className="mt-6 leading-7 text-slate-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}