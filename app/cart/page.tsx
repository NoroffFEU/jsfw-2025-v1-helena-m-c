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
      <h1 className="text-3xl font-semibold tracking-tight text-[#2f261f]">
        Cart
      </h1>
      <p className="mt-2 text-sm text-[#6f6258]">
        Review your items and adjust quantities before checkout.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#ddd1c3] bg-[#fffdf9] p-6 shadow-sm">
          <p className="text-sm text-[#6f6258]">Your cart is empty.</p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-semibold text-[#7c5c46] underline underline-offset-4"
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
                className="flex gap-4 rounded-2xl border border-[#ddd1c3] bg-[#fffdf9] p-4 shadow-sm"
              >
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="h-24 w-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-[#2f261f]">
                        {item.title}
                      </div>
                      <div className="mt-1 text-sm text-[#6f6258]">
                        ${item.unitPrice}
                      </div>
                    </div>

                    <button
                      className="text-xs text-[#6f6258] underline underline-offset-4 transition hover:text-[#7c5c46]"
                      type="button"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove Item
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-xl border border-[#ddd1c3] bg-[#f8f3ec]">
                      <button
                        type="button"
                        className="px-3 py-2 text-sm transition hover:bg-[#efe5d8]"
                        onClick={() => decrement(item.id)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <input
                        className="w-14 bg-transparent text-center text-sm text-[#2f261f] outline-none"
                        value={item.quantity}
                        onChange={(e) =>
                          setQuantity(item.id, Number(e.target.value))
                        }
                        inputMode="numeric"
                      />

                      <button
                        type="button"
                        className="px-3 py-2 text-sm transition hover:bg-[#efe5d8]"
                        onClick={() => increment(item.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm font-semibold text-[#2f261f]">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-[#ddd1c3] bg-[#fffdf9] p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-[#2f261f]">
              Order summary
            </h2>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-[#6f6258]">Total</span>
              <span className="font-semibold text-[#2f261f]">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout/success"
              className="mt-6 block w-full rounded-xl bg-[#7c5c46] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#694c39]"
            >
              Checkout
            </Link>

            <p className="mt-3 text-xs text-[#8d7f73]">
              No real payment, just a fun school project
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
