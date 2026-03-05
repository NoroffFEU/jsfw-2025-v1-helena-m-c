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

  const filtered = useMemo(() => {
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, q]);

  const suggestions = useMemo(() => {
    if (!q) return [];
    return filtered.slice(0, 8);
  }, [filtered, q]);

  const sorted = useMemo(() => {
    const list = filtered.slice();

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
  }, [filtered, sort]);

  useEffect(() => {
    setOpen(Boolean(q) && suggestions.length > 0);
  }, [q, suggestions.length]);

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
      {/* Controls */}
      <div className="grid gap-4 md:grid-cols-[1fr_220px] md:items-end">
        {/* Search + suggestions */}
        <div ref={wrapRef} className="relative">
          <label className="text-sm font-semibold" htmlFor="search">
            Search
          </label>

          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (q && suggestions.length) setOpen(true);
            }}
            placeholder="Search products..."
            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            autoComplete="off"
          />

          {/* Suggestions container (brief requirement) */}
          {open && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              <ul className="max-h-80 overflow-auto">
                {suggestions.map((p) => (
                  <li
                    key={p.id}
                    className="border-b border-black/5 last:border-b-0"
                  >
                    <Link
                      href={`/products/${p.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-black/[0.03]"
                      onClick={() => setOpen(false)}
                    >
                      <img
                        src={p.image?.url}
                        alt={p.image?.alt || p.title}
                        className="h-10 w-10 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">
                          {p.title}
                        </div>
                        <div className="text-xs text-black/60">
                          ${priceOf(p)}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="px-4 py-2 text-xs text-black/50">
                {filtered.length} match{filtered.length === 1 ? "" : "es"}
              </div>
            </div>
          )}
        </div>

        {/* Sorting */}
        <div>
          <label className="text-sm font-semibold" htmlFor="sort">
            Sort
          </label>

          <select
            id="sort"
            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
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

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => {
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
              className="group rounded-2xl border border-black/10 bg-white p-4 hover:border-black/20 transition"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={product.image?.url}
                  alt={product.image?.alt || product.title}
                  className="h-56 w-full object-cover group-hover:scale-[1.02] transition"
                />

                {hasDiscount && (
                  <div className="absolute left-3 top-3 rounded-lg bg-black px-2 py-1 text-xs font-semibold text-white">
                    −{discountPercent}%
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold">{product.title}</div>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  {hasDiscount ? (
                    <>
                      <span className="font-semibold">
                        ${product.discountedPrice}
                      </span>
                      <span className="text-black/40 line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold">${product.price}</span>
                  )}
                </div>

                <div className="mt-2 text-xs text-black/60">
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
