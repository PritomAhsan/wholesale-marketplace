import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

import Container from "@/components/layout/Container";
import { categoryTint } from "@/features/categories/utils/categoryBadge";
import { categoryIcon } from "@/features/categories/utils/categoryIcon";
import { fetchCategories } from "@/features/categories/api";
import { fetchInventoryLanes } from "../api";

export default async function CategoryShowcase() {
  const [categories, { featured }] = await Promise.all([
    fetchCategories(),
    fetchInventoryLanes(),
  ]);

  const tiles = featured.slice(0, 3);

  if (categories.length === 0 && tiles.length === 0) return null;

  return (
    <section className="border-b border-border bg-white py-6">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[220px_1fr_1fr_1fr_260px] lg:[grid-auto-rows:400px]">
          {/* Category list — Alibaba-style left rail, now living below the
              hero instead of inside it. Fixed height with its own internal
              scroll, rather than dictating the whole row's height. */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border">
            <div className="shrink-0 border-b border-border px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-obsidian/40">
                Marketplace
              </p>
              <p className="mt-0.5 font-semibold text-obsidian">Categories for you</p>
            </div>

            <ul className="min-h-0 flex-1 divide-y divide-border overflow-y-auto">
              {categories.map((category) => {
                const tint = categoryTint(category.name);
                const Icon = categoryIcon(category.name);

                return (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="group flex items-center gap-2.5 px-4 py-2.5 text-sm text-obsidian/80 transition hover:bg-ivory hover:text-sapphire"
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: tint.bg }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: tint.fg }} />
                      </span>
                      <span className="flex-1 truncate">{category.name}</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-obsidian/20 transition group-hover:text-sapphire" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="shrink-0 border-t border-border px-4 py-3">
              <Link
                href="/categories"
                className="text-xs font-medium text-sapphire hover:text-sapphire-strong"
              >
                View complete directory →
              </Link>
            </div>
          </div>

          {/* Featured product tiles — real admin-curated products, not
              fabricated "frequently searched" stats we can't back. */}
          {tiles.map((product) => (
            <Link
              key={product.uuid}
              href={`/products/${product.slug}`}
              className="group flex flex-col rounded-2xl border border-border p-4 transition hover:border-sapphire hover:shadow-md"
            >
              <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-champagne">
                Featured
              </p>
              <p className="mt-0.5 line-clamp-1 shrink-0 font-semibold text-obsidian">
                {product.category}
              </p>

              <div className="relative mt-3 min-h-0 flex-1 w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 18vw, 45vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}

          {/* Promo card — translates Alibaba's "Hot Picks" panel into
              Bulkare's own gradient language, linking to real inventory. */}
          <Link
            href="/products?featured=1"
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center text-white"
            style={{
              background: "linear-gradient(160deg, var(--sapphire) 0%, var(--champagne) 100%)",
            }}
          >
            <Sparkles className="h-6 w-6" />
            <p className="mt-2 text-lg font-bold">Hot Picks</p>
            <p className="mt-1 text-xs text-white/80">
              Admin-curated inventory worth a look this week.
            </p>
            <span className="mt-4 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur transition group-hover:bg-white/25">
              View more →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
