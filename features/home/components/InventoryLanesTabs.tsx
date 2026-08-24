"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import InventoryCard from "./InventoryCard";
import { Product } from "@/features/products/data/products";

interface Props {
  newThisWeek: Product[];
  lowMoq: Product[];
  featured?: Product[];
}

export default function InventoryLanesTabs({ newThisWeek, lowMoq, featured = [] }: Props) {
  const tabs = [
    { key: "featured", label: "Featured", products: featured, href: "/products?featured=1" },
    { key: "new", label: "New this week", products: newThisWeek, href: "/products?sort=newest" },
    { key: "low-moq", label: "Low MOQ", products: lowMoq, href: "/products?max_moq=5" },
  ].filter((tab) => tab.products.length >= 4);

  const [active, setActive] = useState(tabs[0]?.key);

  if (tabs.length === 0) return null;

  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab.key === tab.key
                  ? "bg-sapphire-soft text-sapphire-strong"
                  : "text-obsidian/50 hover:text-obsidian"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link
          href={activeTab.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-sapphire hover:text-sapphire-strong"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {activeTab.products.slice(0, 8).map((product) => (
          <InventoryCard key={product.uuid} product={product} />
        ))}
      </div>
    </div>
  );
}
