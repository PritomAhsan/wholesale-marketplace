import { apiFetch } from "@/lib/api";

export interface Brand {
  slug: string;
  name: string;
}

interface ApiBrand {
  uuid: string;
  slug: string;
  name: string;
}

export async function fetchBrands(): Promise<Brand[]> {
  const data = await apiFetch<{ brands: ApiBrand[] }>("/brands", {
    per_page: 100,
  });

  return data.brands.map((b) => ({ slug: b.slug, name: b.name }));
}
