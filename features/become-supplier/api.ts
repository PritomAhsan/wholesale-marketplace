const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export type SupplierStatus = "pending" | "approved" | "rejected" | "suspended";

export interface SupplierApplication {
  uuid: string;
  company_name: string;
  business_type: string;
  contact_person: string;
  email: string;
  phone: string;
  website: string | null;
  logo: string | null;
  banner: string | null;
  status: SupplierStatus;
  created_at: string;
}

export interface SupplierApplicationPayload {
  company_name: string;
  business_type: string;
  contact_person: string;
  email: string;
  phone: string;
  website?: string;
  registration_number?: string;
  tax_number?: string;
  description?: string;
  logo?: File | null;
  banner?: File | null;
}

export class SupplierApiError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.errors = errors;
  }
}

export async function fetchMySupplierApplication(
  token: string
): Promise<SupplierApplication | null> {
  const res = await fetch(`${API_URL}/supplier/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  const json = await res.json();

  return json.data.supplier;
}

export async function applyAsSupplier(
  token: string,
  payload: SupplierApplicationPayload
): Promise<SupplierApplication> {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    formData.append(key, value as string | Blob);
  });

  const res = await fetch(`${API_URL}/supplier/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new SupplierApiError(
      json.message ?? "Failed to submit application",
      json.errors ?? {}
    );
  }

  return json.data.supplier;
}
