"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart.store";

export default function Header() {
  const count = useCartStore((s) => s.count());
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4D7CC] bg-[#FFF8F2]/90 text-[#2F2926] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#C96D4A] font-serif-display font-bold text-white">
            LS
          </span>

          <span>
            <span className="block font-serif-display text-xl leading-none">
              Little Shop
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-[#6F7B6A]">
              Curated lifestyle store
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#7A716B] md:flex">
          <Link href="/" className="transition hover:text-[#C96D4A]">
            Shop
          </Link>
          <Link href="/contact" className="transition hover:text-[#C96D4A]">
            Contact
          </Link>
          <Link
            href="/cart"
            className="rounded-full bg-[#C96D4A] px-5 py-2.5 font-bold text-white shadow-sm transition hover:bg-[#A75538]"
          >
            Cart {mounted && count > 0 ? `(${count})` : ""}
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full border border-[#E4D7CC] px-4 py-2 text-sm font-bold md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav className="grid gap-2 border-t border-[#E4D7CC] bg-[#FFF8F2] px-6 py-4 text-sm font-semibold md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>
            Cart {mounted && count > 0 ? `(${count})` : ""}
          </Link>
        </nav>
      )}
    </header>
  );
}
