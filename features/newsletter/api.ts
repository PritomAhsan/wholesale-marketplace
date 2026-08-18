const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export interface NewsletterPayload {
  email: string;
  topics: string[];
  frequency: "weekly" | "twice_monthly";
}

export async function subscribeToNewsletter(
  payload: NewsletterPayload
): Promise<void> {
  const res = await fetch(`${API_URL}/newsletter/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? "Failed to subscribe");
  }
}
