import ProductGridClient from "@/components/ProductGridClient";
import { fetchProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="bg-[#F7F3EE] text-[#2F2926]">
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="rounded-[2rem] bg-[#FFFDF8] px-6 py-12 shadow-sm sm:px-10 lg:px-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C96D4A]">
            Little Shop
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-serif-display text-5xl leading-tight tracking-tight sm:text-6xl">
                Fresh finds for everyday life.
              </h1>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl bg-[#E9EFE6] p-5">
              <p className="text-sm font-bold text-[#2F2926]">
                Simple shopping, clearer choices.
              </p>
              <a
                href="#products"
                className="mt-2 inline-flex w-fit rounded-full bg-[#C96D4A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#A75538]"
              >
                Browse products
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C96D4A]">
              Shop
            </p>
            <h2 className="mt-2 font-serif-display text-4xl tracking-tight sm:text-5xl">
              Selected products
            </h2>
          </div>
        </div>

        <ProductGridClient products={products} />
      </section>
    </main>
  );
}
