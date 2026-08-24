"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Scale, X } from "lucide-react";

import { Product } from "../data/products";
import ProductCard from "./ProductCard";
import { AppButton } from "@/components/ui/app-button";

interface Props {
  products: Product[];
}

const MAX_COMPARE = 4;

export default function ProductGridWithCompare({ products }: Props) {
  const [selected, setSelected] = useState<Product[]>([]);
  const [showTable, setShowTable] = useState(false);

  function toggle(product: Product) {
    setSelected((prev) => {
      const exists = prev.some((p) => p.uuid === product.uuid);
      if (exists) return prev.filter((p) => p.uuid !== product.uuid);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, product];
    });
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const isSelected = selected.some((p) => p.uuid === product.uuid);

          return (
            <div key={product.id} className="relative">
              <button
                type="button"
                onClick={() => toggle(product)}
                title={isSelected ? "Remove from comparison" : "Add to comparison"}
                className={`absolute -left-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold shadow transition ${
                  isSelected
                    ? "border-sapphire bg-sapphire text-white"
                    : "border-border bg-white/95 text-obsidian/40 hover:border-sapphire hover:text-sapphire"
                }`}
              >
                {isSelected ? <Check className="h-3.5 w-3.5" /> : <Scale className="h-3 w-3" />}
              </button>

              <ProductCard product={product} />
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-obsidian/70">
                {selected.length} of {MAX_COMPARE} selected for comparison
              </span>
              <button
                onClick={() => setSelected([])}
                className="text-xs font-medium text-obsidian/40 hover:text-obsidian"
              >
                Clear
              </button>
            </div>

            <AppButton
              variant="primary"
              size="sm"
              disabled={selected.length < 2}
              onClick={() => setShowTable(true)}
            >
              Compare selected
            </AppButton>
          </div>
        </div>
      )}

      {showTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[85vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-obsidian">
                Compare products
              </h2>
              <button
                onClick={() => setShowTable(false)}
                className="rounded-lg p-1.5 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-obsidian/40">
                    <th className="py-2 pr-4 font-semibold">Product</th>
                    <th className="py-2 pr-4 font-semibold">Case price</th>
                    <th className="py-2 pr-4 font-semibold">MOQ</th>
                    <th className="py-2 pr-4 font-semibold">Seller ID</th>
                    <th className="py-2 pr-4 font-semibold">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.map((product) => (
                    <tr key={product.uuid} className="border-b border-border">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium text-obsidian">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-semibold text-obsidian">
                        ${product.price}
                      </td>
                      <td className="py-3 pr-4 text-obsidian/70">{product.moq}</td>
                      <td className="py-3 pr-4 text-obsidian/70">
                        {product.sellerId || "—"}
                      </td>
                      <td className="py-3 pr-4">
                        {product.verified ? (
                          <span className="text-sapphire">Yes</span>
                        ) : (
                          <span className="text-obsidian/40">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
