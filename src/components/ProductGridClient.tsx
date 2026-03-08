"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/product";

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
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const q = query.trim().toLowerCase();

  const priceOf = (p: Product) =>
    p.discountedPrice < p.price ? p.discountedPrice : p.price;

  const matches = useMemo(() => {
    if (!q) return [];
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, q]);

  const suggestions = useMemo(() => matches.slice(0, 8), [matches]);

  const gridProducts = useMemo(() => {
    const list = products.slice();

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
  }, [products, sort]);

  useEffect(() => {
    setOpen(Boolean(q));
  }, [q]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[1fr_220px] md:items-end">
        <div ref={wrapRef} className="relative">
          <label
            className="text-sm font-semibold text-[#2f261f]"
            htmlFor="search"
          >
            Search
          </label>

          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Search products..."
            className="mt-2 w-full rounded-2xl border border-[#ddd1c3] bg-[#fffdf9] px-4 py-3 text-sm text-[#2f261f] outline-none focus:border-[#7c5c46]"
            autoComplete="off"
          />

          {open && q && (
            <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-[#ddd1c3] bg-[#fffdf9] shadow-sm">
              {suggestions.length > 0 ? (
                <ul className="max-h-72 overflow-auto">
                  {suggestions.map((p) => (
                    <li
                      key={p.id}
                      className="border-b border-[#efe6db] last:border-b-0"
                    >
                      <Link
                        href={`/products/${p.id}`}
                        className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#f3ece3]"
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                      >
                        <img
                          src={p.image?.url}
                          alt={p.image?.alt || p.title}
                          className="h-10 w-10 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-[#2f261f]">
                            {p.title}
                          </div>
                          <div className="text-xs text-[#6f6258]">
                            ${priceOf(p)}
                          </div>
                        </div>
                        <span className="text-xs text-[#8d7f73]">View</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-sm text-[#6f6258]">
                  No results for “{query.trim()}”.
                </div>
              )}

              <div className="border-t border-[#efe6db] px-4 py-2 text-xs text-[#8d7f73]">
                {matches.length} match{matches.length === 1 ? "" : "es"}
              </div>
            </div>
          )}
        </div>

        <div>
          <label
            className="text-sm font-semibold text-[#2f261f]"
            htmlFor="sort"
          >
            Sort
          </label>

          <select
            id="sort"
            className="mt-2 w-full rounded-2xl border border-[#ddd1c3] bg-[#fffdf9] px-4 py-3 text-sm text-[#2f261f] outline-none focus:border-[#7c5c46]"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
          >
            <option value="relevance">Relevance</option>
            <option value="az">Alphabetical: A–Z</option>
            <option value="za">Alphabetical: Z–A</option>
            <option value="priceLow">Price: Low–High</option>
            <option value="priceHigh">Price: High–Low</option>
            <option value="ratingHigh">Rating: High–Low</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gridProducts.map((product) => {
          const hasDiscount = product.discountedPrice < product.price;
          const discountPercent = hasDiscount
            ? Math.round(
                ((product.price - product.discountedPrice) / product.price) *
                  100
              )
            : 0;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-2xl border border-[#ddd1c3] bg-[#fffdf9] p-4 shadow-sm transition hover:border-[#c9baa9] hover:shadow-md"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={product.image?.url}
                  alt={product.image?.alt || product.title}
                  className="h-56 w-full object-cover transition group-hover:scale-[1.02]"
                />
                {hasDiscount && (
                  <div className="absolute left-3 top-3 rounded-lg bg-[#7c5c46] px-2 py-1 text-xs font-semibold text-white">
                    −{discountPercent}%
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-[#2f261f]">
                  {product.title}
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  {hasDiscount ? (
                    <>
                      <span className="font-semibold text-[#2f261f]">
                        ${product.discountedPrice}
                      </span>
                      <span className="text-[#8d7f73] line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-[#2f261f]">
                      ${product.price}
                    </span>
                  )}
                </div>

                <div className="mt-2 text-xs text-[#6f6258]">
                  Rating: {product.rating}/5
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
