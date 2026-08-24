"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useCart } from "@/features/cart/CartContext";
import { useAuth } from "@/features/auth/AuthContext";
import { useToast } from "@/features/notifications/ToastContext";

export default function CartPage() {
  const { itemsBySupplier, count, total, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const { notify } = useToast();

  const supplierGroups = Object.entries(itemsBySupplier);

  if (count === 0) {
    return (
      <section className="bg-ivory py-24">
        <Container className="max-w-lg text-center">
          <ShoppingBag className="mx-auto mb-4 text-obsidian/20" size={56} />

          <h1 className="text-xl font-bold text-obsidian">Your cart is empty</h1>

          <p className="mt-2 text-sm text-obsidian/50">
            Browse wholesale products and add items to get started.
          </p>

          <Link href="/products">
            <AppButton className="mt-7">Browse Products</AppButton>
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-10">
      <Container>
        <h1 className="text-2xl font-bold text-obsidian">Shopping Cart</h1>

        <p className="mt-1.5 text-sm text-obsidian/50">
          {count} item{count !== 1 ? "s" : ""} across {supplierGroups.length}{" "}
          supplier{supplierGroups.length !== 1 ? "s" : ""}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {supplierGroups.map(([supplierUuid, group]) => (
              <div
                key={supplierUuid}
                className="rounded-xl border border-border bg-white p-4"
              >
                <h2 className="mb-3 text-sm font-bold text-obsidian">
                  {group.supplierName}
                </h2>

                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={`${item.productUuid}::${item.variantUuid ?? ""}`}
                      className="flex flex-col gap-3 border-b border-border pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-sm font-semibold text-obsidian hover:text-sapphire"
                        >
                          {item.name}
                        </Link>

                        {item.variantLabel && (
                          <p className="mt-0.5 text-xs font-medium text-sapphire">
                            {item.variantLabel}
                          </p>
                        )}

                        <p className="mt-0.5 text-xs text-obsidian/50">
                          ${item.price.toFixed(2)} / unit · MOQ {item.moq}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productUuid,
                                item.quantity - item.moq,
                                item.variantUuid
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center hover:bg-ivory"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>

                          <span className="w-10 text-center text-sm font-semibold text-obsidian">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productUuid,
                                item.quantity + item.moq,
                                item.variantUuid
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center hover:bg-ivory"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="w-20 text-right text-sm font-bold text-obsidian">
                          ${(item.quantity * item.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>

                        <button
                          onClick={() => {
                            removeItem(item.productUuid, item.variantUuid);
                            notify(`${item.name} removed from cart`, "remove");
                          }}
                          className="rounded-lg p-1.5 text-obsidian/30 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex justify-end text-xs text-obsidian/50">
                  Supplier subtotal:{" "}
                  <span className="ml-1.5 font-bold text-obsidian">
                    ${group.subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <aside className="sticky top-20 lg:top-[172px] h-fit rounded-xl border border-border bg-white p-4">
            <h2 className="text-sm font-bold text-obsidian">Order Summary</h2>

            <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-4">
              <span className="text-sm text-obsidian/60">Total</span>

              <span className="text-xl font-bold text-sapphire">
                ${total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <p className="mt-1.5 text-[11px] text-obsidian/40">
              Shipping and taxes calculated at checkout.
            </p>

            <Link href={user ? "/checkout" : "/login"} className="block">
              <AppButton className="mt-4 w-full justify-center py-4">
                Proceed to Checkout
              </AppButton>
            </Link>

            {!user && (
              <p className="mt-2.5 text-center text-xs text-obsidian/50">
                You&apos;ll need to sign in first.
              </p>
            )}
          </aside>
        </div>
      </Container>
    </section>
  );
}
