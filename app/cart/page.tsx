"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useCart } from "@/features/cart/CartContext";
import { useAuth } from "@/features/auth/AuthContext";

export default function CartPage() {
  const { itemsBySupplier, count, total, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();

  const supplierGroups = Object.entries(itemsBySupplier);

  if (count === 0) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-lg text-center">
          <ShoppingBag className="mx-auto mb-4 text-slate-300" size={64} />

          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>

          <p className="mt-3 text-slate-500">
            Browse wholesale products and add items to get started.
          </p>

          <Link href="/products">
            <AppButton className="mt-8">Browse Products</AppButton>
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-12">
      <Container>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        <p className="mt-2 text-slate-500">
          {count} item{count !== 1 ? "s" : ""} across {supplierGroups.length}{" "}
          supplier{supplierGroups.length !== 1 ? "s" : ""}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            {supplierGroups.map(([supplierUuid, group]) => (
              <div
                key={supplierUuid}
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  {group.supplierName}
                </h2>

                <div className="space-y-4">
                  {group.items.map((item) => (
                    <div
                      key={item.productUuid}
                      className="flex flex-col gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-semibold text-slate-900 hover:text-blue-600"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 text-sm text-slate-500">
                          ${item.price.toFixed(2)} / unit · MOQ {item.moq}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-xl border border-slate-200">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productUuid,
                                item.quantity - item.moq
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center hover:bg-slate-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="w-14 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productUuid,
                                item.quantity + item.moq
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center hover:bg-slate-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="w-24 text-right font-bold text-slate-900">
                          ${(item.quantity * item.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>

                        <button
                          onClick={() => removeItem(item.productUuid)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-end text-sm text-slate-500">
                  Supplier subtotal:{" "}
                  <span className="ml-2 font-bold text-slate-900">
                    ${group.subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <aside className="sticky top-24 h-fit rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">Order Summary</h2>

            <div className="mt-6 flex items-center justify-between border-t border-dashed border-slate-200 pt-6">
              <span className="text-slate-600">Total</span>

              <span className="text-2xl font-bold text-blue-600">
                ${total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Shipping and taxes calculated at checkout.
            </p>

            <Link href={user ? "/checkout" : "/login"} className="block">
              <AppButton className="mt-6 w-full justify-center py-6">
                Proceed to Checkout
              </AppButton>
            </Link>

            {!user && (
              <p className="mt-3 text-center text-xs text-slate-500">
                You&apos;ll need to sign in first.
              </p>
            )}
          </aside>
        </div>
      </Container>
    </section>
  );
}
