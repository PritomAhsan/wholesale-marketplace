"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useAuth } from "@/features/auth/AuthContext";
import { useCart } from "@/features/cart/CartContext";
import { checkout, CheckoutError, ShippingRate } from "@/features/cart/api";
import { getShippingRates } from "@/features/shipping/api";
import { COUNTRIES } from "@/lib/countries";

const initialShipping = {
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "US",
  postal_code: "",
  notes: "",
};

const STEPS = [
  { key: "address", label: "Contact & Address" },
  { key: "delivery", label: "Delivery Notes" },
  { key: "review", label: "Review" },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const { items, itemsBySupplier, total, count, clear } = useCart();

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState(initialShipping);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Live rate-shopping (Phase 18 demo). ratesEnabled stays false whenever
  // the backend's Shippo flag is off, so this whole block quietly
  // disappears and checkout behaves exactly as it did before.
  const [ratesEnabled, setRatesEnabled] = useState(false);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [ratesFetchedFor, setRatesFetchedFor] = useState("");

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

  useEffect(() => {
    if (step !== 1 || !token) return;
    if (!shipping.address || !shipping.city || !shipping.country || !shipping.postal_code) return;

    const key = `${shipping.address}|${shipping.city}|${shipping.state}|${shipping.country}|${shipping.postal_code}`;
    if (key === ratesFetchedFor) return;

    let cancelled = false;
    setRatesLoading(true);

    getShippingRates(
      token,
      {
        street1: shipping.address,
        city: shipping.city,
        state: shipping.state || undefined,
        zip: shipping.postal_code,
        country: shipping.country,
      },
      items.map((item) => ({
        product_uuid: item.productUuid,
        product_variant_id: item.variantUuid,
        quantity: item.quantity,
      }))
    ).then((result) => {
      if (cancelled) return;
      setRatesEnabled(result.enabled);
      setShippingRates(result.rates);
      setSelectedRate(result.rates[0] ?? null);
      setRatesFetchedFor(key);
      setRatesLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [step, token, shipping.address, shipping.city, shipping.state, shipping.country, shipping.postal_code, items, ratesFetchedFor]);

  const shippingCost = ratesEnabled ? selectedRate?.rate ?? 0 : 0;
  const orderTotal = total + shippingCost;

  function stepHasErrors(index: number): boolean {
    if (index === 0) {
      return !shipping.name || !shipping.phone || !shipping.address || !shipping.city || !shipping.country;
    }
    return false;
  }

  function goNext() {
    if (stepHasErrors(step)) {
      setErrorMessage("Please fill in the required fields before continuing.");
      return;
    }

    setErrorMessage("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setErrorMessage("");
    setStep((s) => Math.max(s - 1, 0));
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
          product_variant_id: item.variantUuid,
          quantity: item.quantity,
        })),
        {
          ...shipping,
          state: shipping.state || undefined,
          postal_code: shipping.postal_code || undefined,
          notes: shipping.notes || undefined,
        },
        ratesEnabled ? selectedRate : null
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
      <section className="bg-ivory py-24">
        <Container className="max-w-lg text-center text-obsidian/50">
          Loading...
        </Container>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-ivory py-24">
        <Container className="max-w-lg">
          <div className="rounded-xl border border-border bg-white p-10 text-center shadow-sm">
            <ShieldAlert className="mx-auto mb-4 text-sapphire" size={48} />

            <h1 className="text-2xl font-bold">Sign In Required</h1>

            <p className="mt-3 text-obsidian/50">
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
      <section className="bg-ivory py-24">
        <Container className="max-w-lg text-center">
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>

          <p className="mt-3 text-obsidian/50">
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
    <section className="bg-ivory py-12">
      <Container>
        <h1 className="text-3xl font-bold">Checkout</h1>

        {/* Stepper */}
        <ol className="mt-6 flex flex-wrap items-center gap-2">
          {STEPS.map((s, i) => (
            <li key={s.key} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  i <= step ? "bg-sapphire text-white" : "bg-muted text-obsidian/40"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>

              <span
                className={`hidden text-sm font-medium sm:inline ${
                  i === step ? "text-obsidian" : "text-obsidian/40"
                }`}
              >
                {s.label}
              </span>

              {i < STEPS.length - 1 && (
                <span className="mx-1 h-px w-6 bg-border sm:w-10" />
              )}
            </li>
          ))}
        </ol>

        {errorMessage && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-4 text-sm text-red-700">
            <p className="font-semibold">{errorMessage}</p>
            {Object.values(errors).flat().map((msg, i) => (
              <p key={i} className="mt-1">{msg}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5 lg:grid-cols-[1fr_380px]">
          <div className="rounded-xl border border-border bg-white p-5">

            {step === 0 && (
              <>
                <h2 className="text-xl font-bold">Contact &amp; Address</h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Full Name *
                    </label>
                    <input
                      required
                      value={shipping.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-sapphire"
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
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-sapphire"
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
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-sapphire"
                  />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      City *
                    </label>
                    <input
                      required
                      value={shipping.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-sapphire"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      State / Province
                    </label>
                    <input
                      value={shipping.state}
                      onChange={(e) => update("state", e.target.value)}
                      placeholder="e.g. NY"
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-sapphire"
                    />
                    <p className="mt-1 text-xs text-obsidian/50">
                      Needed for accurate carrier shipping quotes.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Country *
                    </label>
                    <select
                      required
                      value={shipping.country}
                      onChange={(e) => update("country", e.target.value)}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-sapphire"
                    >
                      <option value="" disabled>
                        Select a country
                      </option>
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Postal Code
                    </label>
                    <input
                      value={shipping.postal_code}
                      onChange={(e) => update("postal_code", e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-sapphire"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold">Delivery Notes &amp; Payment</h2>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold">
                    Order Notes
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Delivery instructions, preferred carrier, dock hours, etc."
                    value={shipping.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-sapphire"
                  />
                </div>

                {ratesLoading && (
                  <div className="mt-8">
                    <label className="mb-2 block text-sm font-semibold">
                      Shipping Method
                    </label>
                    <p className="text-sm text-obsidian/50">
                      Getting live rates...
                    </p>
                  </div>
                )}

                {!ratesLoading && ratesEnabled && shippingRates.length === 0 && (
                  <div className="mt-8">
                    <label className="mb-2 block text-sm font-semibold">
                      Shipping Method
                    </label>
                    <p className="text-sm text-obsidian/50">
                      Live rates aren&apos;t available for this address right
                      now — a flat shipping cost will be arranged after order
                      review.
                    </p>
                  </div>
                )}

                {!ratesLoading && ratesEnabled && shippingRates.length > 0 && (
                  <div className="mt-8">
                    <label className="mb-2 block text-sm font-semibold">
                      Shipping Method
                    </label>
                    <div className="space-y-2">
                      {shippingRates.map((rate) => (
                        <label
                          key={`${rate.carrier}-${rate.service}`}
                          className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm transition ${
                            selectedRate?.carrier === rate.carrier &&
                            selectedRate?.service === rate.service
                              ? "border-sapphire bg-sapphire/5"
                              : "border-border"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping_rate"
                              checked={
                                selectedRate?.carrier === rate.carrier &&
                                selectedRate?.service === rate.service
                              }
                              onChange={() => setSelectedRate(rate)}
                            />
                            <span>
                              <span className="block font-medium text-obsidian">
                                {rate.carrier} {rate.service}
                              </span>
                              {rate.delivery_days != null && (
                                <span className="block text-obsidian/50">
                                  ~{rate.delivery_days} business day
                                  {rate.delivery_days === 1 ? "" : "s"}
                                </span>
                              )}
                            </span>
                          </span>
                          <span className="font-semibold text-obsidian">
                            ${rate.rate.toFixed(2)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 rounded-lg bg-amber-50 px-5 py-4 text-sm text-amber-800">
                  Payment is not collected yet — orders are placed for admin
                  review while payment integration is finalized.
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold">Review</h2>

                <div className="mt-6 space-y-3 text-sm">
                  <ReviewRow label="Name" value={shipping.name} />
                  <ReviewRow label="Phone" value={shipping.phone} />
                  <ReviewRow
                    label="Address"
                    value={`${shipping.address}, ${shipping.city}${
                      shipping.state ? ", " + shipping.state : ""
                    }, ${
                      COUNTRIES.find((c) => c.code === shipping.country)?.name ??
                      shipping.country
                    }${
                      shipping.postal_code ? " " + shipping.postal_code : ""
                    }`}
                  />
                  <ReviewRow label="Notes" value={shipping.notes || "None"} />
                  {ratesEnabled && selectedRate && (
                    <ReviewRow
                      label="Shipping"
                      value={`${selectedRate.carrier} ${selectedRate.service} — $${selectedRate.rate.toFixed(2)}`}
                    />
                  )}
                </div>

                <div className="mt-6 rounded-lg bg-amber-50 px-5 py-4 text-sm text-amber-800">
                  Payment is not collected yet — orders are placed for admin
                  review while payment integration is finalized.
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <AppButton
                type="button"
                variant="secondary"
                onClick={goBack}
                className={step === 0 ? "invisible" : ""}
              >
                <ChevronLeft size={16} className="mr-1" /> Back
              </AppButton>

              {step < STEPS.length - 1 ? (
                <AppButton key="next-button" type="button" onClick={goNext}>
                  Next <ChevronRight size={16} className="ml-1" />
                </AppButton>
              ) : (
                <AppButton
                  key="place-order-button"
                  type="submit"
                  disabled={submitting}
                  className="px-8"
                >
                  {submitting ? "Placing Order..." : "Place Order"}
                </AppButton>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-border bg-white p-6">
            <h2 className="text-lg font-bold">Order Summary</h2>

            <div className="mt-4 space-y-4">
              {Object.entries(itemsBySupplier).map(([supplierUuid, group]) => (
                <div key={supplierUuid}>
                  <p className="text-sm font-semibold text-obsidian/80">
                    {group.supplierName}
                  </p>

                  {group.items.map((item) => (
                    <div
                      key={`${item.productUuid}::${item.variantUuid ?? ""}`}
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
                        <p className="line-clamp-1 font-medium text-obsidian">
                          {item.name}
                        </p>
                        {item.variantLabel && (
                          <p className="text-xs text-sapphire">{item.variantLabel}</p>
                        )}
                        <p className="text-obsidian/50">Qty: {item.quantity}</p>
                      </div>

                      <p className="text-sm font-semibold text-obsidian">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {ratesEnabled && (
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-border pt-6 text-sm">
                <span className="text-obsidian/70">Subtotal</span>
                <span className="font-medium text-obsidian">
                  ${total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}

            {ratesEnabled && (
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-obsidian/70">Shipping</span>
                <span className="font-medium text-obsidian">
                  {selectedRate
                    ? `$${selectedRate.rate.toFixed(2)}`
                    : "—"}
                </span>
              </div>
            )}

            <div
              className={`mt-6 flex items-center justify-between pt-6 ${
                ratesEnabled ? "border-t border-border" : "border-t border-dashed border-border"
              }`}
            >
              <span className="text-obsidian/70">Total</span>
              <span className="text-2xl font-bold text-sapphire">
                ${orderTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </aside>
        </form>
      </Container>
    </section>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0">
      <span className="text-obsidian/50">{label}</span>
      <span className="text-right font-medium text-obsidian">{value}</span>
    </div>
  );
}
