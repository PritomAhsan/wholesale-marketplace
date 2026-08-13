"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useAuth } from "@/features/auth/AuthContext";
import { useCart } from "@/features/cart/CartContext";
import { checkout, CheckoutError } from "@/features/cart/api";

const initialShipping = {
  name: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postal_code: "",
  notes: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const { items, itemsBySupplier, total, count, clear } = useCart();

  const [shipping, setShipping] = useState(initialShipping);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;

    setShipping((prev) => ({
      ...prev,
      name: prev.name || user.full_name,
      phone: prev.phone || user.phone || "",
    }));
  }, [user]);

  function update<K extends keyof typeof initialShipping>(key: K, value: string) {
    setShipping((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!token) return;

    setSubmitting(true);
    setErrors({});
    setErrorMessage("");

    try {
      const order = await checkout(
        token,
        items.map((item) => ({
          product_uuid: item.productUuid,
          quantity: item.quantity,
        })),
        {
          ...shipping,
          postal_code: shipping.postal_code || undefined,
          notes: shipping.notes || undefined,
        }
      );

      clear();
      router.push(`/orders/${order.uuid}`);
    } catch (err) {
      if (err instanceof CheckoutError) {
        setErrorMessage(err.message);
        setErrors(err.errors);
      } else {
        setErrorMessage("Unable to place order. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-lg text-center text-slate-500">
          Loading...
        </Container>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-lg">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <ShieldAlert className="mx-auto mb-4 text-blue-600" size={48} />

            <h1 className="text-2xl font-bold">Sign In Required</h1>

            <p className="mt-3 text-slate-500">
              Sign in to complete your order.
            </p>

            <Link href="/login">
              <AppButton className="mt-8 w-full">Sign In</AppButton>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  if (count === 0) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-lg text-center">
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>

          <p className="mt-3 text-slate-500">
            Add products to your cart before checking out.
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
        <h1 className="text-3xl font-bold">Checkout</h1>

        {errorMessage && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-4 text-sm text-red-700">
            <p className="font-semibold">{errorMessage}</p>
            {Object.values(errors).flat().map((msg, i) => (
              <p key={i} className="mt-1">{msg}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-xl font-bold">Shipping Information</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name *
                </label>
                <input
                  required
                  value={shipping.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Phone *
                </label>
                <input
                  required
                  value={shipping.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold">
                Address *
              </label>
              <input
                required
                value={shipping.address}
                onChange={(e) => update("address", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  City *
                </label>
                <input
                  required
                  value={shipping.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Country *
                </label>
                <input
                  required
                  value={shipping.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Postal Code
                </label>
                <input
                  value={shipping.postal_code}
                  onChange={(e) => update("postal_code", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold">
                Order Notes
              </label>
              <textarea
                rows={4}
                value={shipping.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-8 rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-800">
              Payment is not collected yet — orders are placed for admin
              review while payment integration is finalized.
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">Order Summary</h2>

            <div className="mt-4 space-y-4">
              {Object.entries(itemsBySupplier).map(([supplierUuid, group]) => (
                <div key={supplierUuid}>
                  <p className="text-sm font-semibold text-slate-700">
                    {group.supplierName}
                  </p>

                  {group.items.map((item) => (
                    <div
                      key={item.productUuid}
                      className="mt-2 flex items-center gap-3"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-lg object-cover"
                      />

                      <div className="flex-1 text-sm">
                        <p className="line-clamp-1 font-medium text-slate-800">
                          {item.name}
                        </p>
                        <p className="text-slate-500">Qty: {item.quantity}</p>
                      </div>

                      <p className="text-sm font-semibold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-dashed border-slate-200 pt-6">
              <span className="text-slate-600">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                ${total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <AppButton
              type="submit"
              disabled={submitting}
              className="mt-6 w-full justify-center py-6"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </AppButton>
          </aside>
        </form>
      </Container>
    </section>
  );
}
