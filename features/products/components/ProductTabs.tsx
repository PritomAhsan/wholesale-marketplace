"use client";

import { useState } from "react";
import {
  FileText,
  ListChecks,
  Building2,
  Star,
} from "lucide-react";

import { Product } from "../data/products";

import DescriptionTab from "./DescriptionTab";
import SpecificationsTab from "./SpecificationsTab";
import SupplierTab from "./SupplierTab";
import ReviewsTab from "./ReviewsTab";

interface Props {
  product: Product;
}

const SECTIONS = [
  { id: "description", label: "Description", icon: FileText },
  { id: "specifications", label: "Specifications", icon: ListChecks },
  { id: "supplier", label: "Supplier", icon: Building2 },
  { id: "reviews", label: "Reviews", icon: Star },
] as const;

export default function ProductTabs({ product }: Props) {
  const [active, setActive] = useState<string>("description");

  function scrollTo(id: string) {
    setActive(id);
    document
      .getElementById(`product-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section>
      <div className="rounded-2xl border border-border bg-white shadow-sm">
        {/* Header — `overflow-hidden` lives here (not on the card wrapper)
            so the rounded top corners still clip the gradient without
            turning the wrapper into a sticky-breaking scroll container for
            the nav below. */}
        <div className="overflow-hidden rounded-t-2xl border-b border-border bg-gradient-to-r from-sapphire-soft/50 to-white px-8 py-6">
          <h2 className="text-2xl font-bold text-obsidian">
            Product Information
          </h2>

          <p className="mt-2 text-sm text-obsidian/50">
            Explore product details, specifications, supplier information and
            customer reviews.
          </p>
        </div>

        {/* Section nav — jumps to the section below rather than swapping
            visibility, so a buyer can keep skimming past what they already
            read instead of losing it behind a tab switch. Not sticky —
            just sits in normal flow. */}
        <div className="border-b border-border bg-white px-6 py-4">
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-2 lg:grid-cols-4">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = active === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-sapphire shadow-sm"
                      : "text-obsidian/60 hover:text-obsidian"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sections */}
        <div className="divide-y divide-border overflow-hidden rounded-b-2xl">
          <div id="product-description" className="scroll-mt-24 lg:scroll-mt-[180px] p-6 lg:p-8">
            <DescriptionTab description={product.description} />
          </div>

          <div id="product-specifications" className="scroll-mt-24 lg:scroll-mt-[180px] p-6 lg:p-8">
            <SpecificationsTab product={product} />
          </div>

          <div id="product-supplier" className="scroll-mt-24 lg:scroll-mt-[180px] p-6 lg:p-8">
            <SupplierTab product={product} />
          </div>

          <div id="product-reviews" className="scroll-mt-24 lg:scroll-mt-[180px] p-6 lg:p-8">
            <ReviewsTab product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
