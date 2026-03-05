import type { Product } from "@/types/product";

const BASE_URL = "https://v2.api.noroff.dev";

type ApiListResponse<T> = { data: T[] };
type ApiItemResponse<T> = { data: T };

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/online-shop`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  const json: ApiListResponse<Product> = await res.json();
  return json.data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const safeId = encodeURIComponent(id);
  const res = await fetch(`${BASE_URL}/online-shop/${safeId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product (${res.status})`);
  }

  const json: ApiItemResponse<Product> = await res.json();
  return json.data;
}
