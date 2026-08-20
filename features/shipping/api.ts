import type { ShippingRate } from "@/features/cart/api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export interface ShippingDestination {
  street1: string;
  city: string;
  state?: string;
  zip: string;
  country: string;
}

export interface ShippingRateItemPayload {
  product_uuid: string;
  quantity: number;
}

export interface ShippingRatesResult {
  enabled: boolean;
  rates: ShippingRate[];
}

// Off by default (Roadmap Phase 18) — when the backend's Shippo flag
// isn't on, this just returns { enabled: false, rates: [] } and the
// checkout page falls back to its existing behavior with no shipping
// line item, exactly as before this feature existed.
export async function getShippingRates(
  token: string,
  destination: ShippingDestination,
  items: ShippingRateItemPayload[]
): Promise<ShippingRatesResult> {
  try {
    const res = await fetch(`${API_URL}/shipping/rates`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ destination, items }),
    });

    if (!res.ok) return { enabled: false, rates: [] };

    const json = await res.json();
    return json.data as ShippingRatesResult;
  } catch {
    return { enabled: false, rates: [] };
  }
}
