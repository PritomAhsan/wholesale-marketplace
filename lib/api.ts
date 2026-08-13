const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost/wholesale-api/public/api/v1";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function apiFetch<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const url = new URL(`${API_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new ApiError(`Request failed: ${res.status}`, res.status);
  }

  const json: ApiEnvelope<T> = await res.json();

  return json.data;
}
