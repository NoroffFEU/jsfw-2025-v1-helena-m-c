"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart.store";

export default function Header() {
  const count = useCartStore((s) => s.count());
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8ccbf] bg-[#f7f1e8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-[#3b3128]"
          onClick={() => setMenuOpen(false)}
        >
          Little Shop
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex text-[#7a6d62]">
          <Link href="/" className="transition hover:text-[#7c5c46]">
            Shop
          </Link>
          <Link href="/contact" className="transition hover:text-[#7c5c46]">
            Contact
          </Link>
          <Link href="/cart" className="transition hover:text-[#7c5c46]">
            Cart
            {mounted && count > 0 && (
              <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-[#7c5c46] px-2 py-0.5 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl border border-[#d8ccbf] bg-[#fffaf4] p-2 text-[#3b3128] transition hover:bg-[#efe5d8] md:hidden"
        >
          <span className="flex h-5 w-5 flex-col items-center justify-center gap-1">
            <span
              className={`block h-0.5 w-4 bg-current transition ${
                menuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-current transition ${
                menuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#d8ccbf] bg-[#fffaf4] md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4 text-sm text-[#7a6d62]">
            <Link
              href="/"
              className="rounded-xl px-3 py-3 transition hover:bg-[#efe5d8] hover:text-[#7c5c46]"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="rounded-xl px-3 py-3 transition hover:bg-[#efe5d8] hover:text-[#7c5c46]"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="flex items-center rounded-xl px-3 py-3 transition hover:bg-[#efe5d8] hover:text-[#7c5c46]"
              onClick={() => setMenuOpen(false)}
            >
              Cart
              {mounted && count > 0 && (
                <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-[#7c5c46] px-2 py-0.5 text-xs font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
