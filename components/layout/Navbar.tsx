"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BRANDING } from "@/constants/branding";
import {
  ChevronDown,
  Globe,
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

import Container from "./Container";
import MobileMenu from "./MobileMenu";
import CategoriesMegaMenu from "./CategoriesMegaMenu";
import { NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/AuthContext";
import { useCart } from "@/features/cart/CartContext";
import { useWishlist } from "@/features/wishlist/WishlistContext";
import { Category } from "@/features/categories/data/categories";

interface Props {
  categories: Category[];
}

export default function Navbar({ categories }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      router.push("/products");
      return;
    }

    router.push(`/products?search=${encodeURIComponent(search.trim())}`);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-xl">

        {/* Row 1 — commercial message */}

        <div className="hidden border-b border-border bg-sapphire-soft text-obsidian/70 lg:block">
          <Container className="flex h-9 items-center justify-between text-xs">
            <p>Private wholesale sourcing for qualified businesses.</p>
            <Link
              href="/products"
              className="font-medium text-sapphire transition hover:text-sapphire-strong"
            >
              Explore the marketplace
            </Link>
          </Container>
        </div>

        {/* Row 2 — logo, search, account */}

        <Container className="flex h-[74px] items-center gap-6">

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src={BRANDING.logo}
              alt={BRANDING.siteName}
              width={150}
              height={45}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Search */}

          <form
            onSubmit={handleSearchSubmit}
            className="hidden flex-1 lg:block"
          >
            <div className="flex h-12 items-center overflow-hidden rounded-xl border-2 border-sapphire/25 bg-white shadow-[0_0_0_4px_var(--sapphire-soft)] transition-shadow focus-within:border-sapphire/50 focus-within:shadow-[0_0_0_4px_var(--sapphire-soft),0_6px_18px_-6px_var(--sapphire)]">

              <div className="relative flex-1">

                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <input
                  placeholder="Search products by name, SKU or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-full w-full border-none bg-transparent pl-12 pr-5 text-sm outline-none"
                />

              </div>

              <button
                type="submit"
                className="relative m-1 flex h-10 shrink-0 items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-l from-cta via-cta to-cta-strong px-6 text-sm font-semibold text-white shadow-md shadow-cta/25 transition-all hover:shadow-lg hover:shadow-cta/40 before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:skew-x-12 before:-translate-x-[150%] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[350%]"
              >
                <Search className="h-4 w-4" />
                Search
              </button>

            </div>
          </form>

          {/* Desktop Actions */}

          <div className="hidden items-center gap-2 lg:flex">

            {/* Decorative for now — no ship-to region logic exists yet
                anywhere downstream (checkout, rates, catalog). Styled as
                inert rather than a fake-functional dropdown so it doesn't
                promise a feature that isn't there. */}
            <span
              title="Ship-to region selection is coming soon"
              className="flex cursor-default items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm text-obsidian/50"
            >
              <Globe className="h-4 w-4 text-obsidian/40" />
              <span className="hidden xl:inline">Ship to</span>
              <span className="font-semibold text-obsidian/70">USA</span>
            </span>

            <Link
              href="/wishlist"
              className="relative rounded-xl p-3 transition hover:bg-muted"
            >
              <Heart className="h-5 w-5 text-obsidian/80" />

              {wishlistCount > 0 && (
                <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sapphire px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative rounded-xl p-3 transition hover:bg-muted"
            >
              <ShoppingCart className="h-5 w-5 text-obsidian/80" />

              {cartCount > 0 && (
                <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sapphire px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {!loading && user ? (
              <div ref={accountRef} className="relative ml-2">
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-obsidian/80 transition hover:border-sapphire hover:bg-sapphire-soft"
                >
                  <User className="h-4 w-4" />
                  {user.first_name}
                  <ChevronDown className="h-3.5 w-3.5 text-obsidian/40" />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white shadow-xl">
                    <div className="border-b border-border px-4 py-3">
                      <p className="truncate text-sm font-semibold text-obsidian">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="truncate text-xs text-obsidian/50">{user.email}</p>
                    </div>

                    <Link
                      href="/orders"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-obsidian/70 transition hover:bg-muted hover:text-sapphire"
                    >
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>

                    <Link
                      href="/account"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-obsidian/70 transition hover:bg-muted hover:text-sapphire"
                    >
                      <Settings className="h-4 w-4" />
                      Account Settings
                    </Link>

                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2.5 border-t border-border px-4 py-2.5 text-left text-sm text-obsidian/70 transition hover:bg-muted"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-2 rounded-xl bg-gradient-to-l from-cta via-cta to-cta-strong px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-cta/25 transition-all hover:shadow-lg hover:shadow-cta/40"
              >
                Sign in
              </Link>
            )}

          </div>

          {/* Mobile */}

          <div className="ml-auto flex items-center gap-2 lg:hidden">

            <button
              onClick={() => setMobileSearch((v) => !v)}
              className="rounded-xl p-2 hover:bg-muted"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/cart"
              className="relative rounded-xl p-2 hover:bg-muted"
            >
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-sapphire" />
              )}
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="rounded-xl p-2 hover:bg-muted"
            >
              <Menu className="h-6 w-6" />
            </button>

          </div>

        </Container>

        {/* Mobile Search */}

        {mobileSearch && (
          <div className="border-t border-border px-4 py-3 lg:hidden">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                autoFocus
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 flex-1 rounded-xl border border-border px-4 text-sm outline-none focus:border-sapphire"
              />
              <button
                type="submit"
                className="rounded-xl bg-sapphire px-5 text-sm font-semibold text-white"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Row 3 — buying paths */}

        <div className="hidden border-t border-border bg-white lg:block">
          <Container>

            <nav className="flex h-12 items-center gap-8 overflow-x-auto">

              <CategoriesMegaMenu categories={categories} />

              {NAVIGATION.filter((item) => item.href !== "/categories").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-sapphire"
                      : "text-obsidian/70 hover:text-sapphire"
                  )}
                >
                  {item.title}
                </Link>
              ))}

            </nav>

          </Container>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
