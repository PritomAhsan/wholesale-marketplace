const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  notes?: string;
}

export interface CheckoutItemPayload {
  product_uuid: string;
  quantity: number;
}

export interface ShippingRate {
  carrier: string;
  service: string;
  rate: number;
  currency: string;
  delivery_days: number | null;
}

export interface TrackingEvent {
  description: string;
  location: string | null;
  timestamp: string | null;
}

export interface TrackingInfo {
  status: string;
  statusDescription: string;
  estimatedDelivery: string | null;
  events: TrackingEvent[];
}

export interface TrackingResult {
  available: boolean;
  tracking: TrackingInfo | null;
}

export interface OrderItem {
  uuid: string;
  product: { uuid: string; slug: string } | null;
  product_name: string;
  product_sku: string | null;
  product_image: string | null;
  unit_price: string;
  quantity: number;
  line_total: string;
}

export interface SellerOrder {
  uuid: string;
  seller_order_number: string;
  supplier: { uuid: string; display_name: string } | null;
  status: string;
  subtotal: string;
  tracking_number: string | null;
  shipping_carrier: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  items: OrderItem[];
}

export interface Order {
  uuid: string;
  order_number: string;
  status: string;
  cancellation_reason: string | null;
  cancelled_at: string | null;
  can_cancel: boolean;
  subtotal: string;
  total: string;
  currency: string;
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string | null;
    country: string;
    postal_code: string | null;
    cost: string | null;
    carrier: string | null;
    service: string | null;
  };
  notes: string | null;
  placed_at: string;
  seller_orders: SellerOrder[];
}

export class CheckoutError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.errors = errors;
  }
}

export async function checkout(
  token: string,
  items: CheckoutItemPayload[],
  shipping: ShippingInfo,
  shippingRate?: ShippingRate | null
): Promise<Order> {
  const res = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items,
      shipping,
      shipping_rate: shippingRate
        ? {
            carrier: shippingRate.carrier,
            service: shippingRate.service,
            rate: shippingRate.rate,
          }
        : undefined,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new CheckoutError(
      json.message ?? "Checkout failed",
      json.errors ?? {}
    );
  }

  return json.data.order;
}

export async function fetchMyOrders(token: string): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];

  const json = await res.json();

  return json.data.orders;
}

export async function fetchOrder(
  token: string,
  uuid: string
): Promise<Order | null> {
  const res = await fetch(`${API_URL}/orders/${uuid}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  const json = await res.json();

  return json.data.order;
}

export async function fetchTracking(
  token: string,
  sellerOrderUuid: string
): Promise<TrackingResult | null> {
  const res = await fetch(
    `${API_URL}/seller-orders/${sellerOrderUuid}/tracking`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) return null;

  const json = await res.json();

  return json.data as TrackingResult;
}

export async function cancelOrder(
  token: string,
  uuid: string,
  reason?: string
): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${uuid}/cancel`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reason: reason || undefined }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new CheckoutError(
      json.message ?? "Unable to cancel order",
      json.errors ?? {}
    );
  }

  return json.data.order;
}
