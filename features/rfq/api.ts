const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export interface RfqPayload {
  product_name: string;
  preferred_supplier_name?: string;
  quantity: string;
  unit: string;
  budget?: string;
  destination_country: string;
  required_delivery_date?: string;
  message: string;
  attachment?: File | null;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
}

export class RfqValidationError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.errors = errors;
  }
}

export async function submitRfq(
  payload: RfqPayload,
  token?: string | null
): Promise<void> {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    formData.append(key, value as string | Blob);
  });

  const headers: Record<string, string> = { Accept: "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/rfqs`, {
    method: "POST",
    headers,
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    if (res.status === 422) {
      throw new RfqValidationError(json.message, json.errors ?? {});
    }

    throw new Error(json.message ?? "Failed to submit RFQ");
  }
}
