const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export interface ContactPayload {
  topic: string;
  name: string;
  business_email: string;
  account_email?: string;
  reference_number?: string;
  message: string;
  attachment?: File | null;
}

export class ContactValidationError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.errors = errors;
  }
}

export async function submitContactMessage(
  payload: ContactPayload
): Promise<string> {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    formData.append(key, value as string | Blob);
  });

  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    if (res.status === 422) {
      throw new ContactValidationError(json.message, json.errors ?? {});
    }

    throw new Error(json.message ?? "Failed to submit your request");
  }

  return json.data.uuid as string;
}
