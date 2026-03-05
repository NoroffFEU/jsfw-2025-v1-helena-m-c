"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart.store";

export default function Header() {
  const count = useCartStore((s) => s.count());

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Little Shop
        </Link>

        <nav className="flex items-center gap-5 text-sm text-black/80">
          <Link href="/" className="hover:text-black">
            Shop
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
          <Link href="/cart" className="hover:text-black">
            Cart
            {count > 0 && (
              <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-black px-2 py-0.5 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
