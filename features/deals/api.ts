import { apiFetch } from "@/lib/api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export type DealType = "flash" | "bulk" | "clearance";

export interface Deal {
  uuid: string;
  type: DealType;
  title: string;
  description: string | null;
  discount_percent: number | null;
  discount_price: string | null;
  min_quantity: number | null;
  starts_at: string | null;
  ends_at: string | null;
  product: {
    uuid: string;
    name: string;
    slug: string;
    selling_price: string;
    currency: string;
    image: string | null;
  } | null;
}

export async function fetchDeals(type?: DealType): Promise<Deal[]> {
  const data = await apiFetch<{ deals: Deal[] }>("/deals", {
    type,
    per_page: 50,
  });

  return data.deals;
}

export async function subscribeToDealAlerts(email: string): Promise<void> {
  const res = await fetch(`${API_URL}/deal-alerts/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? "Failed to subscribe");
  }
}
