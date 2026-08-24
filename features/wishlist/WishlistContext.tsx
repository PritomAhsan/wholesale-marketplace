"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "wholesale_wishlist";

export interface WishlistItem {
  productUuid: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  supplierName: string;
  supplierUuid: string;
  moq: number;
  stock: number;
}

interface WishlistContextValue {
  items: WishlistItem[];
  isSaved: (productUuid: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  removeItem: (productUuid: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore malformed wishlist data
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function isSaved(productUuid: string) {
    return items.some((i) => i.productUuid === productUuid);
  }

  function toggleItem(item: WishlistItem) {
    setItems((prev) =>
      prev.some((i) => i.productUuid === item.productUuid)
        ? prev.filter((i) => i.productUuid !== item.productUuid)
        : [...prev, item]
    );
  }

  function removeItem(productUuid: string) {
    setItems((prev) => prev.filter((i) => i.productUuid !== productUuid));
  }

  return (
    <WishlistContext.Provider
      value={{ items, isSaved, toggleItem, removeItem, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);

  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return ctx;
}
