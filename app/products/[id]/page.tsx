import ProductGridClient from "@/components/ProductGridClient";
import { fetchProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="bg-[#F7F3EE] text-[#2F2926]">
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="overflow-hidden rounded-[2rem] border border-[#E4D7CC] bg-[#FFFDF8] shadow-sm">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="px-7 py-12 sm:px-12 lg:px-14 lg:py-16">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C96D4A]">
                Little Shop
              </p>

              <h1 className="mt-8 max-w-3xl font-serif-display text-5xl leading-[0.96] tracking-tight text-[#2F2926] sm:text-6xl lg:text-7xl">
                Fresh finds for modern everyday life.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#756B63]">
                A curated mix of lifestyle products, tech and everyday
                essentials, selected for simplicity, quality and character.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#products"
                  className="rounded-full bg-[#C96D4A] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#A75538]"
                >
                  Browse products
                </a>

                <span className="rounded-full bg-[#E9EFE6] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#6F7B6A]">
                  Free returns · Secure checkout
                </span>
              </div>
            </div>

            <aside className="relative hidden min-h-[420px] bg-[#E9EFE6] lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#F7F3EE_0,transparent_34%),radial-gradient(circle_at_80%_70%,#C96D4A_0,transparent_28%)] opacity-70" />

              <div className="relative flex h-full flex-col justify-between p-10">
                <div className="ml-auto w-fit rounded-full bg-[#FFFDF8] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C96D4A] shadow-sm">
                  New collection
                </div>

                <div className="rounded-[1.5rem] bg-[#FFFDF8]/85 p-6 shadow-sm backdrop-blur">
                  <p className="font-serif-display text-4xl leading-none text-[#2F2926]">
                    Simple products.
                    <br />
                    Better browsing.
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#756B63]">
                    Search, sort and shop through a calmer ecommerce experience.
                  </p>
                </div>
              </div>
            </aside>
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
