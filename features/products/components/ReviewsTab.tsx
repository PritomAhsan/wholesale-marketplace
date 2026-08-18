"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, MessageSquareText, Star, User } from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { useAuth } from "@/features/auth/AuthContext";
import { Product } from "../data/products";
import {
  fetchReviewEligibility,
  fetchReviews,
  Review,
  submitReview,
} from "../reviewsApi";

interface Props {
  product: Product;
}

export default function ReviewsTab({ product }: Props) {
  const { user, token } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [eligible, setEligible] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews(product.uuid)
      .then(({ reviews }) => setReviews(reviews))
      .finally(() => setLoading(false));
  }, [product.uuid]);

  useEffect(() => {
    if (!token) return;

    fetchReviewEligibility(product.uuid, token).then((res) => {
      setEligible(res.eligible);
      setAlreadyReviewed(res.already_reviewed);
    });
  }, [product.uuid, token]);

  function handleSubmitted(review: Review) {
    setReviews((prev) => [review, ...prev]);
    setEligible(false);
    setAlreadyReviewed(true);
    setShowForm(false);
  }

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  return (
    <div className="space-y-8">
      {reviews.length > 0 && (
        <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-slate-900">
              {average?.toFixed(1)}
            </p>
            <div className="mt-1 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(average ?? 0)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Based on {reviews.length} verified-purchase review
            {reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {user && eligible && !showForm && (
        <div className="rounded-3xl border border-sapphire/20 bg-sapphire-soft p-6 text-center">
          <p className="text-sm font-medium text-sapphire-strong">
            You bought this product — share your experience.
          </p>
          <AppButton className="mt-3" onClick={() => setShowForm(true)}>
            Write a Review
          </AppButton>
        </div>
      )}

      {showForm && (
        <ReviewForm
          productUuid={product.uuid}
          token={token!}
          onSubmitted={handleSubmitted}
          onCancel={() => setShowForm(false)}
        />
      )}

      {user && alreadyReviewed && (
        <p className="text-sm text-slate-500">
          You&apos;ve already reviewed this product — thanks for the feedback.
        </p>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
          <MessageSquareText className="mb-4 h-10 w-10 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900">
            No reviews yet for {product.name}
          </h3>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Only buyers with a completed order can leave a review — be the
            first once your order is delivered.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.uuid}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">{review.author}</h4>

                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                      <BadgeCheck className="h-3 w-3" />
                      Verified Buyer
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>

                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="mt-4 leading-7 text-slate-600">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewForm({
  productUuid,
  token,
  onSubmitted,
  onCancel,
}: {
  productUuid: string;
  token: string;
  onSubmitted: (review: Review) => void;
  onCancel: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!comment.trim()) {
      setError("Please add a comment.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const review = await submitReview(productUuid, token, { rating, comment });
      onSubmitted(review);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="font-bold text-slate-900">Write a review</h4>

      <div className="mt-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button key={i} type="button" onClick={() => setRating(i + 1)}>
            <Star
              className={`h-7 w-7 transition ${
                i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="How was the product quality, packaging and delivery?"
        className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sapphire"
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-4 flex gap-3">
        <AppButton onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </AppButton>
        <AppButton variant="secondary" onClick={onCancel}>
          Cancel
        </AppButton>
      </div>
    </div>
  );
}
