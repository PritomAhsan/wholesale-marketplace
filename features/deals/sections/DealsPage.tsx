"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Package, Tag } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { Deal, DealType, fetchDeals, subscribeToDealAlerts } from "../api";

const TABS: { key: DealType | "all"; label: string }[] = [
  { key: "all", label: "All deals" },
  { key: "flash", label: "Flash discounts" },
  { key: "bulk", label: "Bulk pricing" },
  { key: "clearance", label: "Clearance" },
];

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState<DealType | "all">("all");
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchDeals(activeTab === "all" ? undefined : activeTab)
      .then(setDeals)
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <>
      <section className="border-b border-border bg-champagne-soft py-14">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            Volume Deals
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold text-obsidian sm:text-4xl">
            Transparent, time-bound pricing from verified suppliers.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-obsidian/60">
            Flash discounts, bulk-quantity price breaks and clearance runs —
            every deal here is authored by an approved supplier, not a
            marketing estimate.
          </p>
        </Container>
      </section>

      <section className="bg-ivory py-12">
        <Container>
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-sapphire text-white"
                    : "border border-border bg-white text-obsidian/60 hover:border-sapphire"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-56 animate-pulse rounded-xl border border-border bg-white"
                />
              ))}
            </div>
          ) : deals.length === 0 ? (
            <div className="mt-10 rounded-xl border border-border bg-white p-12 text-center">
              <Tag className="mx-auto mb-4 text-obsidian/20" size={48} />
              <h2 className="text-lg font-bold text-obsidian">
                No active deals in this category
              </h2>
              <p className="mt-2 text-sm text-obsidian/50">
                Check another tab, or subscribe below to be notified when new
                deals go live.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deals.map((deal) => (
                <DealCard key={deal.uuid} deal={deal} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <AlertSignup />
    </>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  const product = deal.product;

  const originalPrice = product ? Number(product.selling_price) : 0;
  const finalPrice = useMemo(() => {
    if (deal.discount_price) return Number(deal.discount_price);
    if (deal.discount_percent) {
      return originalPrice * (1 - deal.discount_percent / 100);
    }
    return originalPrice;
  }, [deal, originalPrice]);

  const content = (
    <div className="flex h-full flex-col rounded-xl border border-border bg-white p-5 transition hover:border-sapphire hover:shadow-md">
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
            deal.type === "flash"
              ? "bg-red-50 text-red-700"
              : deal.type === "bulk"
              ? "bg-sapphire-soft text-sapphire-strong"
              : "bg-champagne-soft text-champagne"
          }`}
        >
          {deal.type === "flash"
            ? "Flash"
            : deal.type === "bulk"
            ? "Bulk pricing"
            : "Clearance"}
        </span>

        {deal.discount_percent ? (
          <span className="text-sm font-bold text-sapphire">
            -{deal.discount_percent}%
          </span>
        ) : null}
      </div>

      {product?.image ? (
        <div className="relative mt-4 h-32 w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mt-4 flex h-32 w-full items-center justify-center rounded-lg bg-muted">
          <Package className="text-obsidian/20" size={32} />
        </div>
      )}

      <h3 className="mt-4 line-clamp-2 font-bold text-obsidian">
        {product?.name ?? deal.title}
      </h3>

      {deal.description && (
        <p className="mt-1 line-clamp-2 text-sm text-obsidian/50">
          {deal.description}
        </p>
      )}

      {/* Transparent pricing */}
      {product && (
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-obsidian">
            {product.currency} {finalPrice.toFixed(2)}
          </span>
          {finalPrice < originalPrice && (
            <span className="text-sm text-obsidian/40 line-through">
              {product.currency} {originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-3 text-xs text-obsidian/50">
        {deal.min_quantity && (
          <span className="flex items-center gap-1">
            <Package size={13} /> Min. {deal.min_quantity} units
          </span>
        )}
        {deal.ends_at && (
          <span className="flex items-center gap-1">
            <Clock size={13} /> Ends{" "}
            {new Date(deal.ends_at).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );

  if (!product) return content;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      {content}
    </Link>
  );
}

function AlertSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      await subscribeToDealAlerts(email);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-t border-border bg-white py-14">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          {status === "done" ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="text-sapphire" size={36} />
              <h2 className="text-lg font-bold text-obsidian">
                You&apos;re on the list
              </h2>
              <p className="text-sm text-obsidian/50">
                We&apos;ll email you when new deals go live.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-obsidian">
                Get notified about new deals
              </h2>
              <p className="mt-2 text-sm text-obsidian/50">
                One email address, no spam — just new deal alerts.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="you@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 flex-1 rounded-xl border border-border px-4 text-sm outline-none focus:border-sapphire"
                />

                <AppButton
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-12"
                >
                  {status === "submitting" ? "Subscribing..." : "Notify me"}
                </AppButton>
              </form>

              {status === "error" && (
                <p className="mt-2 text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
