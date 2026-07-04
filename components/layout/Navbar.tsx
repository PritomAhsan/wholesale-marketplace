"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import Container from "./Container";
import { NAVIGATION } from "@/constants/navigation";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-blue-600"
        >
          WholesaleHub
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition hover:text-blue-600"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <User className="h-5 w-5 cursor-pointer" />
          <ShoppingCart className="h-5 w-5 cursor-pointer" />
        </div>
      </Container>
    </header>
  );
}