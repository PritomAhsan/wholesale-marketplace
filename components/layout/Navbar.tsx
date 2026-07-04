"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ShoppingCart,
  User,
  Search,
  X,
} from "lucide-react";

import Container from "./Container";
import { NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <Container className="flex h-16 items-center gap-8">

          <Link
            href="/"
            className="shrink-0 text-2xl font-bold tracking-tight text-blue-600"
          >
            WholesaleHub
          </Link>

          <div className="hidden flex-1 lg:flex">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                placeholder="Search products, stores, brands..."
                className="h-11 w-full rounded-xl border bg-slate-50 pl-12 pr-4 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-slate-700 hover:text-blue-600"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-5">

            <Link
              href="/login"
              className="hidden text-sm font-medium lg:block"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white lg:block"
            >
              Register
            </Link>

            <button className="relative">
              <ShoppingCart className="h-5 w-5" />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                2
              </span>
            </button>

            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>

          </div>
        </Container>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}