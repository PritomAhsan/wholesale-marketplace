const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export const DISPUTE_REASONS: { value: string; label: string }[] = [
  { value: "not_received", label: "Never received" },
  { value: "damaged", label: "Arrived damaged" },
  { value: "wrong_item", label: "Wrong item" },
  { value: "quantity_mismatch", label: "Quantity doesn't match" },
  { value: "counterfeit", label: "Suspected counterfeit" },
  { value: "late_shipment", label: "Shipped very late" },
  { value: "seller_not_responding", label: "Seller not responding" },
  { value: "refund_not_received", label: "Refund not received" },
  { value: "other", label: "Other" },
];

export interface Dispute {
  uuid: string;
  reason: string;
  description: string;
  status: "open" | "resolved" | "rejected";
  resolution: string | null;
  resolution_amount: number | null;
  resolution_note: string | null;
  resolved_at: string | null;
  created_at: string;
  seller_order?: {
    uuid: string;
    seller_order_number: string;
    seller_id: string | null;
  };
}

export class DisputeApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function openDispute(
  token: string,
  sellerOrderUuid: string,
  payload: { reason: string; description: string; images?: File[] }
): Promise<Dispute> {
  const formData = new FormData();
  formData.append("reason", payload.reason);
  formData.append("description", payload.description);
  (payload.images ?? []).forEach((file) => formData.append("images[]", file));

  const res = await fetch(
    `${API_URL}/seller-orders/${sellerOrderUuid}/disputes`,
    {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      body: formData,
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new DisputeApiError(json.message ?? "Failed to open dispute", res.status);
  }

  return json.data.dispute;
}

export async function fetchMyDisputes(token: string): Promise<Dispute[]> {
  const res = await fetch(`${API_URL}/disputes`, {
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json.data.disputes;
}
