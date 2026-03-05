"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart.store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const removeItem = useCartStore((s) => s.removeItem);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const setQuantity = useCartStore((s) => s.setQuantity);

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
      <p className="mt-2 text-sm text-black/60">
        Review your items and adjust quantities before checkout.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-sm text-black/70">Your cart is empty.</p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-semibold underline underline-offset-4"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-black/10 bg-white p-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="h-24 w-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{item.title}</div>
                      <div className="mt-1 text-sm text-black/60">
                        ${item.unitPrice}
                      </div>
                    </div>

                    <button
                      className="text-xs text-black/60 hover:text-black underline underline-offset-4"
                      type="button"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove Item
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-xl border border-black/10">
                      <button
                        type="button"
                        className="px-3 py-2 text-sm hover:bg-black/[0.03]"
                        onClick={() => decrement(item.id)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <input
                        className="w-14 bg-transparent text-center text-sm outline-none"
                        value={item.quantity}
                        onChange={(e) =>
                          setQuantity(item.id, Number(e.target.value))
                        }
                        inputMode="numeric"
                      />

                      <button
                        type="button"
                        className="px-3 py-2 text-sm hover:bg-black/[0.03]"
                        onClick={() => increment(item.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm font-semibold">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-sm font-semibold">Order summary</h2>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-black/60">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout/success"
              className="mt-6 block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
            >
              Checkout
            </Link>

            <p className="mt-3 text-xs text-black/50">
              No real payment, just a fun school project
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
