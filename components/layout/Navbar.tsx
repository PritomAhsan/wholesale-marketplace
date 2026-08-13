"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRANDING } from "@/constants/branding";
import {
  Bell,
  Heart,
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
  const { user, loading, logout } = useAuth();
  const { count: cartCount } = useCart();

  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        {/* Top Navigation */}
        <Container className="flex h-[74px] items-center gap-6">

          {/* Logo */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src={BRANDING.logo}
              alt={BRANDING.siteName}
              width={132}
              height={45}
              className="h-10 w-auto"
              priority
            />

            <p className="hidden -ml-1 text-xs text-slate-500 xl:block">
              {BRANDING.tagline}
            </p>
          </Link>

          {/* Search */}

          <div className="hidden flex-1 lg:block">
            <div className="flex h-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">

              <button className="flex items-center gap-2 border-r px-5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                Categories
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className="relative flex-1">

                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  placeholder="Search products, suppliers or categories..."
                  className="h-full w-full border-none bg-transparent pl-12 pr-5 text-sm outline-none"
                />

              </div>

              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 text-sm font-semibold text-white transition hover:opacity-90">
                Search
              </button>

            </div>
          </div>

          {/* Desktop Actions */}

          <div className="hidden items-center gap-2 lg:flex">

            <Link
              href="/rfq"
              className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FileText className="h-4 w-4" />
              Get Quotes
            </Link>

            <button className="relative rounded-xl p-3 transition hover:bg-slate-100">
              <Heart className="h-5 w-5 text-slate-700" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <button className="relative rounded-xl p-3 transition hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-700" />

              <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            <Link
              href="/cart"
              className="relative rounded-xl p-3 transition hover:bg-slate-100"
            >
              <ShoppingCart className="h-5 w-5 text-slate-700" />

              {cartCount > 0 && (
                <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {!loading && user ? (
              <div className="ml-2 flex items-center gap-2">

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
                  <User className="h-4 w-4" />
                  {user.first_name}
                </div>

                <button
                  onClick={() => logout()}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>

              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="ml-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold transition hover:border-blue-300 hover:bg-blue-50"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile */}

          <div className="ml-auto flex items-center gap-2 lg:hidden">

            <button className="rounded-xl p-2 hover:bg-slate-100">
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/cart"
              className="relative rounded-xl p-2 hover:bg-slate-100"
            >
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="rounded-xl p-2 hover:bg-slate-100"
            >
              <Menu className="h-6 w-6" />
            </button>

          </div>

        </Container>

        {/* Secondary Navigation */}

        <div className="hidden border-t border-slate-100 bg-white lg:block">
          <Container>

            <nav className="flex h-12 items-center gap-8 overflow-x-auto">

              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  )}
                >
                  {item.title}
                </Link>
              ))}

              <Link
                href="/products"
                className="whitespace-nowrap text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                New Arrivals
              </Link>

              <Link
                href="/categories"
                className="whitespace-nowrap text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                Popular Categories
              </Link>

              <Link
                href="/rfq"
                className="whitespace-nowrap text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                Buyer Protection
              </Link>

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