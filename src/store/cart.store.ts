"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt?: string;
  unitPrice: number;
  quantity: number;
};

type AddPayload = Omit<CartItem, "quantity">;

type CartState = {
  items: CartItem[];

  addItem: (payload: AddPayload) => void;
  removeItem: (id: string) => void;

  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;

  clear: () => void;

  count: () => number;
  total: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (payload) => {
        const items = get().items.slice();
        const existing = items.find((i) => i.id === payload.id);

        if (existing) {
          const next = items.map((i) =>
            i.id === payload.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          set({ items: next });
          return;
        }

        set({
          items: [
            ...items,
            {
              ...payload,
              quantity: 1,
            },
          ],
        });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      setQuantity: (id, quantity) => {
        const q = Number.isFinite(quantity) ? quantity : 1;
        const clamped = Math.max(1, Math.min(99, Math.floor(q)));

        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: clamped } : i
          ),
        });
      },

      increment: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i
          ),
        });
      },

      decrement: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
          ),
        });
      },

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      total: () =>
        Number(
          get()
            .items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
            .toFixed(2)
        ),
    }),
    {
      name: "little-shop-cart",
    }
  )
);
