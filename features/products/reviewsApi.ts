const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export interface Review {
  uuid: string;
  rating: number;
  comment: string;
  author: string;
  verified_purchase: boolean;
  created_at: string;
}

export class ReviewApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function fetchReviews(
  productUuid: string
): Promise<{ reviews: Review[]; total: number }> {
  const res = await fetch(`${API_URL}/products/${productUuid}/reviews`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const json = await res.json();

  return {
    reviews: json.data.reviews,
    total: json.data.pagination.total,
  };
}

export async function fetchReviewEligibility(
  productUuid: string,
  token: string
): Promise<{ eligible: boolean; already_reviewed: boolean }> {
  const res = await fetch(`${API_URL}/products/${productUuid}/reviews/eligibility`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return { eligible: false, already_reviewed: false };

  const json = await res.json();
  return json.data;
}

export async function submitReview(
  productUuid: string,
  token: string,
  payload: { rating: number; comment: string }
): Promise<Review> {
  const res = await fetch(`${API_URL}/products/${productUuid}/reviews`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ReviewApiError(json.message ?? "Failed to submit review", res.status);
  }

  return json.data.review;
}
