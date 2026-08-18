const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost/wholesale-api/public/api/v1";

export async function fetchFollowStatus(
  sellerId: string,
  token: string
): Promise<boolean> {
  const res = await fetch(`${API_URL}/sellers/${sellerId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return false;

  const json = await res.json();
  return json.data.seller.is_followed ?? false;
}

export async function toggleStoreFollow(
  sellerId: string,
  token: string
): Promise<{ following: boolean }> {
  const res = await fetch(`${API_URL}/sellers/${sellerId}/follow`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? "Failed to update follow status.");
  }

  return json.data;
}
