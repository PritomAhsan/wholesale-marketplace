"use client";

import { ProductVariant } from "../data/products";

interface Props {
  variants: ProductVariant[];
  selected: ProductVariant | null;
  onSelect: (variant: ProductVariant) => void;
}

export default function VariantSelector({ variants, selected, onSelect }: Props) {
  const attributeNames = Array.from(
    new Set(variants.flatMap((v) => v.attributes.map((a) => a.attributeName)))
  ).filter(Boolean);

  if (attributeNames.length === 0) return null;

  function valueFor(variant: ProductVariant | null, attributeName: string) {
    return variant?.attributes.find((a) => a.attributeName === attributeName)?.value;
  }

  function handlePick(attributeName: string, value: string) {
    // Prefer a variant matching this value plus every other attribute the
    // buyer already picked; fall back to the first variant carrying this
    // value if that exact combo doesn't exist.
    const matchingCurrent = variants.find(
      (v) =>
        valueFor(v, attributeName) === value &&
        attributeNames.every(
          (name) => name === attributeName || valueFor(v, name) === valueFor(selected, name)
        )
    );

    const fallback = variants.find((v) => valueFor(v, attributeName) === value);

    const next = matchingCurrent ?? fallback;
    if (next) onSelect(next);
  }

  return (
    <div className="space-y-4">
      {attributeNames.map((attributeName) => {
        const values = Array.from(
          new Set(
            variants
              .map((v) => valueFor(v, attributeName))
              .filter((v): v is string => Boolean(v))
          )
        );

        return (
          <div key={attributeName}>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-obsidian/50">
              {attributeName}
              {valueFor(selected, attributeName) && (
                <span className="ml-1.5 normal-case tracking-normal text-obsidian/70">
                  · {valueFor(selected, attributeName)}
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-2">
              {values.map((value) => {
                const isActive = valueFor(selected, attributeName) === value;
                const available = variants.some(
                  (v) => valueFor(v, attributeName) === value && v.stock > 0
                );

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handlePick(attributeName, value)}
                    className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-sapphire bg-sapphire-soft text-sapphire-strong"
                        : "border-border text-obsidian/70 hover:border-sapphire/40"
                    } ${!available ? "opacity-40" : ""}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
