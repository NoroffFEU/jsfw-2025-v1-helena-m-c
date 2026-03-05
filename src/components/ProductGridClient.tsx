"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function ProductGridClient({ products }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  return (
    <div>
      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border border-black/20 px-4 py-2 text-sm outline-none focus:border-black"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const hasDiscount = p.discountedPrice < p.price;
          const discountPercent = hasDiscount
            ? Math.round(((p.price - p.discountedPrice) / p.price) * 100)
            : 0;

          return (
            <Link key={p.id} href={`/products/${p.id}`} className="group block">
              <div className="relative overflow-hidden bg-neutral-100">
                <img
                  src={p.image.url}
                  alt={p.image.alt}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {hasDiscount && (
                  <div className="absolute left-3 top-3 bg-black px-3 py-1 text-xs font-medium text-white">
                    -{discountPercent}%
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-1">
                <h2 className="text-sm font-medium">{p.title}</h2>

                <div className="flex items-center gap-2 text-sm">
                  {hasDiscount ? (
                    <>
                      <span className="text-black">${p.discountedPrice}</span>
                      <span className="text-black/40 line-through">
                        ${p.price}
                      </span>
                    </>
                  ) : (
                    <span>${p.price}</span>
                  )}
                </div>

                <div className="text-xs text-black/50">
                  Rating: {p.rating}/5
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
