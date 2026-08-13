"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "wholesale_cart";

export interface CartItem {
  productUuid: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  moq: number;
  stock: number;
  supplierUuid: string;
  supplierName: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productUuid: string) => void;
  updateQuantity: (productUuid: string, quantity: number) => void;
  clear: () => void;
  count: number;
  total: number;
  itemsBySupplier: Record<string, { supplierName: string; items: CartItem[]; subtotal: number }>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore malformed cart data
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(item: Omit<CartItem, "quantity">, quantity?: number) {
    const qty = quantity ?? item.moq;

    setItems((prev) => {
      const existing = prev.find((i) => i.productUuid === item.productUuid);

      if (existing) {
        return prev.map((i) =>
          i.productUuid === item.productUuid
            ? { ...i, quantity: Math.min(i.quantity + qty, i.stock) }
            : i
        );
      }

      return [...prev, { ...item, quantity: Math.min(qty, item.stock) }];
    });
  }

  function removeItem(productUuid: string) {
    setItems((prev) => prev.filter((i) => i.productUuid !== productUuid));
  }

  function updateQuantity(productUuid: string, quantity: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.productUuid === productUuid
          ? { ...i, quantity: Math.max(i.moq, Math.min(quantity, i.stock)) }
          : i
      )
    );
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const itemsBySupplier: CartContextValue["itemsBySupplier"] = {};

  items.forEach((item) => {
    if (!itemsBySupplier[item.supplierUuid]) {
      itemsBySupplier[item.supplierUuid] = {
        supplierName: item.supplierName,
        items: [],
        subtotal: 0,
      };
    }

    itemsBySupplier[item.supplierUuid].items.push(item);
    itemsBySupplier[item.supplierUuid].subtotal += item.quantity * item.price;
  });

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        count,
        total,
        itemsBySupplier,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return ctx;
}
