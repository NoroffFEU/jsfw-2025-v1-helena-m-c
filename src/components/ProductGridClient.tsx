"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

type SortValue =
  | "relevance"
  | "az"
  | "za"
  | "priceLow"
  | "priceHigh"
  | "ratingHigh";

export default function ProductGridClient({
  products,
}: {
  products: Product[];
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("relevance");

  const q = query.trim().toLowerCase();

  const priceOf = (product: Product) =>
    product.discountedPrice < product.price
      ? product.discountedPrice
      : product.price;

  const filteredProducts = useMemo(() => {
    const list = q
      ? products.filter((product) => product.title.toLowerCase().includes(q))
      : products.slice();

    switch (sort) {
      case "az":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return list.sort((a, b) => b.title.localeCompare(a.title));
      case "priceLow":
        return list.sort((a, b) => priceOf(a) - priceOf(b));
      case "priceHigh":
        return list.sort((a, b) => priceOf(b) - priceOf(a));
      case "ratingHigh":
        return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return list;
    }
  }, [products, q, sort]);

  return (
    <div>
      <div className="grid gap-4 rounded-[1.5rem] border border-[#E4D7CC] bg-[#FFFDF8] p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#C96D4A]"
          >
            Search
          </label>

          <input
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-[#E4D7CC] bg-white px-5 py-3 text-sm text-[#2F2926] outline-none focus:ring-4 focus:ring-[#C96D4A]/20"
          />
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#C96D4A]"
          >
            Sort
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortValue)}
            className="w-full rounded-full border border-[#E4D7CC] bg-white px-5 py-3 text-sm text-[#2F2926] outline-none focus:ring-4 focus:ring-[#C96D4A]/20"
          >
            <option value="relevance">Relevance</option>
            <option value="az">Alphabetical: A-Z</option>
            <option value="za">Alphabetical: Z-A</option>
            <option value="priceLow">Price: Low-High</option>
            <option value="priceHigh">Price: High-Low</option>
            <option value="ratingHigh">Rating: High-Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] bg-[#FFFDF8] p-10 text-center shadow-sm">
          <h3 className="font-serif-display text-3xl text-[#2F2926]">
            No products found.
          </h3>
          <p className="mt-3 text-sm text-[#756B63]">
            Try searching for another product.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const productHref = `/products/${product.id}`;
            const displayPrice = priceOf(product);
            const hasDiscount = product.discountedPrice < product.price;
            const discountPercent = hasDiscount
              ? Math.round(
                  ((product.price - product.discountedPrice) / product.price) *
                    100
                )
              : 0;

            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-[1.5rem] border border-[#E4D7CC] bg-[#FFFDF8] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={productHref}
                  className="block"
                  aria-label={`View ${product.title}`}
                >
                  <div className="relative h-64 overflow-hidden bg-[#F5EEE8]">
                    <img
                      src={product.image?.url}
                      alt={product.image?.alt || product.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
                    />

                    {hasDiscount && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#6F7B6A] px-3 py-1 text-xs font-bold text-white">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C96D4A]">
                      Little pick
                    </span>
                    <span className="text-xs font-bold text-[#6F7B6A]">
                      {product.rating}/5
                    </span>
                  </div>

                  <Link href={productHref} className="block">
                    <h3 className="text-lg font-black text-[#2F2926] transition hover:text-[#C96D4A]">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="mt-2 line-clamp-2 min-h-11 text-sm leading-6 text-[#756B63]">
                    {product.description ||
                      "Selected for the Little Shop catalogue."}
                  </p>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#2F2926]">
                      ${displayPrice}
                    </span>

                    {hasDiscount && (
                      <span className="text-sm text-[#756B63] line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 grid gap-3">
                    <Link
                      href={productHref}
                      className="inline-flex w-full items-center justify-center rounded-full border border-[#E4D7CC] bg-white px-5 py-3 text-sm font-bold text-[#2F2926] transition hover:border-[#C96D4A] hover:text-[#C96D4A]"
                    >
                      View product
                    </Link>

                    <div className="[&_button]:w-full [&_button]:rounded-full [&_button]:bg-[#C96D4A] [&_button]:px-5 [&_button]:py-3 [&_button]:font-bold [&_button]:text-white [&_button]:transition [&_button:hover]:bg-[#A75538]">
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
