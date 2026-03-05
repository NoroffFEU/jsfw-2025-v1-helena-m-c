"use client";

import { useCartStore } from "@/store/cart.store";
import type { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const unitPrice =
    product.discountedPrice < product.price
      ? product.discountedPrice
      : product.price;

  return (
    <button
      className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
      onClick={() =>
        addItem({
          id: product.id,
          title: product.title,
          imageUrl: product.image.url,
          imageAlt: product.image.alt,
          unitPrice,
        })
      }
      type="button"
    >
      Add to cart
    </button>
  );
}
