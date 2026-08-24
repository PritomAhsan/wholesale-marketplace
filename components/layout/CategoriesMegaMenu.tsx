"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import { Category } from "@/features/categories/data/categories";
import { categoryTint } from "@/features/categories/utils/categoryBadge";
import { categoryIcon } from "@/features/categories/utils/categoryIcon";

interface Props {
  categories: Category[];
}

export default function CategoriesMegaMenu({ categories }: Props) {
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = categories.find((c) => c.slug === activeSlug) ?? categories[0];

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ top: rect.bottom + 8, left: rect.left });
    }

    setOpen(true);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  if (categories.length === 0) {
    return (
      <Link
        href="/categories"
        className="text-sm font-medium text-obsidian/70 transition-colors hover:text-sapphire"
      >
        All Categories
      </Link>
    );
  }

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href="/categories"
        className="flex items-center gap-1.5 text-sm font-medium text-obsidian/70 transition-colors hover:text-sapphire"
      >
        <Menu className="h-4 w-4" />
        All Categories
      </Link>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{ top: position.top, left: position.left }}
            className="fixed z-[100] flex w-[640px] overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {/* Left rail — top-level categories */}
            <div className="w-56 shrink-0 border-r border-border bg-muted/40 py-2">
              {categories.map((category) => {
                const Icon = categoryIcon(category.name);
                const tint = categoryTint(category.name);
                const isActive = category.slug === active?.slug;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onMouseEnter={() => setActiveSlug(category.slug)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-white font-semibold text-sapphire"
                        : "text-obsidian/70 hover:bg-white/70"
                    }`}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: tint.bg }}
                    >
                      <Icon className="h-4 w-4" style={{ color: tint.fg }} />
                    </span>
                    <span className="line-clamp-1 flex-1">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right panel — real subcategories for the hovered category */}
            <div className="flex-1 p-6">
              {active && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-obsidian">
                      {active.name}
                    </h3>
                    <Link
                      href={`/categories/${active.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sapphire hover:text-sapphire-strong"
                    >
                      View all
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <p className="mt-0.5 text-xs text-obsidian/40">
                    {active.products.toLocaleString()} products available
                  </p>

                  {active.children.length > 0 ? (
                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                      {active.children.map((child) => (
                        <Link
                          key={child.slug}
                          href={`/products?category=${child.slug}`}
                          className="truncate text-sm text-obsidian/70 transition hover:text-sapphire"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-obsidian/40">
                      No subcategories yet — browse everything in{" "}
                      {active.name} directly.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
