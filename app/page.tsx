import ProductGridClient from "@/components/ProductGridClient";
import { fetchProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-semibold tracking-tight">Little Shop</h1>
      <p className="mt-2 text-sm text-black/60">
        Browse products and find your next favourite.
      </p>

      <div className="mt-10">
        <ProductGridClient products={products} />
      </div>
    </main>
  );
}
