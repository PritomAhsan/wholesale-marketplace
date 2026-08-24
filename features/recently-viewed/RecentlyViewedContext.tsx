"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Product } from "@/features/products/data/products";

const STORAGE_KEY = "wholesale_recently_viewed";
const MAX_ITEMS = 12;

interface RecentlyViewedContextValue {
  items: Product[];
  hydrated: boolean;
  recordView: (product: Product) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null
);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore malformed recently-viewed data
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function recordView(product: Product) {
    setItems((prev) => {
      const withoutCurrent = prev.filter((p) => p.uuid !== product.uuid);
      return [product, ...withoutCurrent].slice(0, MAX_ITEMS);
    });
  }

  return (
    <RecentlyViewedContext.Provider value={{ items, hydrated, recordView }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);

  if (!ctx) {
    throw new Error(
      "useRecentlyViewed must be used within a RecentlyViewedProvider"
    );
  }

  return ctx;
}
