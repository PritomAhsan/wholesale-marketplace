"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRANDING } from "@/constants/branding";
import {
  ChevronRight,
  Home,
  LogIn,
  LogOut,
  Package,
  Search,
  ShoppingCart,
  UserPlus,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const quickLinks = [
  {
    title: "Categories",
    href: "/categories",
    icon: Package,
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingCart,
  },
  {
    title: "Become Supplier",
    href: "/become-supplier",
    icon: Users,
  },
];

const accountLinks = [
  {
    title: "My Orders",
    href: "/orders",
    icon: Wallet,
  },
];

export default function MobileMenu({
  open,
  onClose,
}: Props) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}

      <aside className="fixed right-0 top-0 z-[100] flex h-screen w-[88%] max-w-sm flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">

        {/* Header */}

        <div className="border-b border-obsidian-soft bg-obsidian px-6 py-6 text-white">

          <div className="mb-6 flex items-center justify-between">

            <Image
              src={BRANDING.logoDark}
              alt={BRANDING.siteName}
              width={132}
              height={45}
              className="h-10 w-auto"
            />

            <button
              onClick={onClose}
              className="rounded-xl p-2 transition hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

          </div>

          {/* Search */}

          <Link
            href="/products"
            onClick={onClose}
            className="flex h-12 w-full items-center rounded-xl bg-white px-4 text-left text-sm text-muted-foreground shadow-lg"
          >

            <Search className="mr-3 h-5 w-5 text-muted-foreground" />

            Search products...

          </Link>

        </div>

        {/* Scroll */}

        <div className="flex-1 overflow-y-auto">

          {/* Guest */}

          <div className="border-b p-6">

            <div className="mb-4 rounded-2xl border bg-muted p-4">

              {user ? (
                <>
                  <h3 className="font-semibold text-obsidian">
                    Welcome, {user.first_name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {user.email}
                  </p>

                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition hover:border-red-400 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-obsidian">
                    Welcome
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Sign in to manage RFQs, orders and suppliers.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    <Link
                      href="/login"
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition hover:border-sapphire hover:text-sapphire"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 rounded-xl bg-sapphire py-3 text-sm font-semibold text-white transition hover:bg-sapphire-strong"
                    >
                      <UserPlus className="h-4 w-4" />
                      Register
                    </Link>

                  </div>
                </>
              )}

            </div>

          </div>

          {/* Quick Access */}

          <div className="border-b px-6 py-5">

            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Quick Access
            </h4>

            <div className="grid grid-cols-2 gap-3">

              {quickLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="rounded-2xl border p-4 transition hover:border-sapphire hover:bg-sapphire-soft"
                  >
                    <Icon className="mb-3 h-6 w-6 text-sapphire" />

                    <p className="text-sm font-medium text-obsidian/80">
                      {item.title}
                    </p>

                  </Link>
                );
              })}

            </div>

          </div>

          {/* Main Navigation */}

          <div className="border-b px-6 py-5">

            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Navigation
            </h4>

            <div className="space-y-1">

              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
                    pathname === item.href
                      ? "bg-sapphire-soft text-sapphire-strong"
                      : "hover:bg-muted"
                  )}
                >
                  <span>{item.title}</span>

                  <ChevronRight className="h-4 w-4" />

                </Link>
              ))}

            </div>

          </div>

          {/* Account */}

          <div className="px-6 py-5">

            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Buyer Services
            </h4>

            <div className="space-y-1">

              {accountLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">

                      <Icon className="h-5 w-5 text-muted-foreground" />

                      <span className="text-sm font-medium">
                        {item.title}
                      </span>

                    </div>

                    <ChevronRight className="h-4 w-4 text-muted-foreground" />

                  </Link>
                );
              })}

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t bg-muted p-5">

          <Link
            href="/rfq"
            onClick={onClose}
            className="mb-3 flex h-12 items-center justify-center rounded-xl bg-sapphire font-semibold text-white shadow-sm transition hover:bg-sapphire-strong"
          >
            Get Quotations
          </Link>

          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl border bg-white py-3 text-sm font-medium transition hover:border-sapphire"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

        </div>

      </aside>
    </>
  );
}