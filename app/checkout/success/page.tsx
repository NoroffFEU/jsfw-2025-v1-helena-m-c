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
      <h1 className="text-3xl font-semibold tracking-tight text-[#2f261f]">
        Success
      </h1>
      <p className="mt-2 text-sm text-[#6f6258]">Your order is confirmed.</p>

      <div className="mt-10 rounded-2xl border border-[#ddd1c3] bg-[#fffdf9] p-6 shadow-sm">
        <p className="text-sm text-[#6f6258]">
          Thanks for shopping at Little Shop.
        </p>

        <Link
          href="/"
          className="mt-4 inline-block rounded-xl bg-[#7c5c46] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#694c39]"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}
