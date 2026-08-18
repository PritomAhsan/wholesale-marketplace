"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components/ui/app-button";

export default function RfqQuickStart() {
  const router = useRouter();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (product) params.set("product", product);
    if (quantity) params.set("quantity", quantity);

    router.push(`/rfq?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
    >
      <input
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Product or UPC"
        className="h-11 w-full rounded-xl border border-border px-4 text-sm text-obsidian outline-none focus:border-sapphire"
      />

      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        className="mt-3 h-11 w-full rounded-xl border border-border px-4 text-sm text-obsidian outline-none focus:border-sapphire"
      />

      <AppButton
        type="submit"
        variant="primary"
        className="mt-4 w-full justify-center"
      >
        Start my request
      </AppButton>

      <p className="mt-2 text-center text-[11px] text-obsidian/40">
        No obligation · Business buyers only
      </p>
    </form>
  );
}
