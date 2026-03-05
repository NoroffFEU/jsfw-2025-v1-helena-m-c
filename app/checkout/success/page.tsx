"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart.store";

export default function CheckoutSuccessPage() {
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-semibold tracking-tight">Success</h1>
      <p className="mt-2 text-sm text-black/60">
        Your order is confirmed. The cart has been cleared.
      </p>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
        <p className="text-sm text-black/70">
          Thanks for shopping at Little Shop.
        </p>

        <Link
          href="/"
          className="mt-4 inline-block rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}
