"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { NAVIGATION } from "@/constants/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 lg:hidden">

      <div className="ml-auto h-full w-80 bg-white">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-lg font-semibold">
            Menu
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-1 p-5">

          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block rounded-lg p-3 hover:bg-slate-100"
            >
              {item.title}
            </Link>
          ))}

        </div>

        <div className="border-t p-5 space-y-3">

          <Link
            href="/login"
            className="block rounded-lg border p-3 text-center"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="block rounded-lg bg-blue-600 p-3 text-center text-white"
          >
            Register
          </Link>

        </div>

      </div>
    </div>
  );
}