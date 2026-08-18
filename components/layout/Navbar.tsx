"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BRANDING } from "@/constants/branding";
import {
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  FileText,
} from "lucide-react";

import Container from "./Container";
import MobileMenu from "./MobileMenu";
import { NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/AuthContext";
import { useCart } from "@/features/cart/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { count: cartCount } = useCart();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);

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

        <div className="hidden bg-obsidian text-ivory/90 lg:block">
          <Container className="flex h-9 items-center justify-between text-xs">
            <p>Private wholesale sourcing for qualified businesses.</p>
            <Link
              href="/products"
              className="font-medium text-champagne transition hover:text-champagne-soft"
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
            <div className="flex h-12 overflow-hidden rounded-xl border border-border bg-white transition-colors duration-200 focus-within:border-sapphire">

              <Link
                href="/categories"
                className="flex items-center gap-2 border-r border-border px-5 text-sm font-medium text-obsidian/70 hover:bg-muted"
              >
                Categories
                <ChevronDown className="h-4 w-4" />
              </Link>

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
                className="bg-sapphire px-8 text-sm font-semibold text-white transition-colors hover:bg-sapphire-strong"
              >
                Search
              </button>

            </div>
          </form>

          {/* Desktop Actions */}

          <div className="hidden items-center gap-2 lg:flex">

            <Link
              href="/rfq"
              className="flex h-11 items-center gap-2 rounded-xl bg-sapphire px-5 text-sm font-semibold text-white transition-colors hover:bg-sapphire-strong"
            >
              <FileText className="h-4 w-4" />
              Get Quotes
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
              <div className="ml-2 flex items-center gap-2">

                <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-obsidian/80">
                  <User className="h-4 w-4" />
                  {user.first_name}
                </div>

                <button
                  onClick={() => logout()}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-obsidian/70 transition hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>

              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="ml-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-sapphire hover:bg-sapphire-soft"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-obsidian px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-obsidian-soft"
                >
                  Create business account
                </Link>
              </>
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

              {NAVIGATION.map((item) => (
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
