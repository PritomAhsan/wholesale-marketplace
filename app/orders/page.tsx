"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Package, RefreshCw, ShieldAlert } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useAuth } from "@/features/auth/AuthContext";
import { fetchMyOrders, Order } from "@/features/cart/api";

export default function OrdersPage() {
  const { user, token, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    fetchMyOrders(token)
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  if (authLoading || loading) {
    return (
      <section className="bg-ivory py-12">
        <Container className="max-w-4xl">
          <h1 className="text-3xl font-bold text-obsidian">My Orders</h1>

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-border bg-white p-6"
              >
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="mt-3 h-3 w-64 rounded bg-muted" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (!authLoading && token && error) {
    return (
      <section className="bg-ivory py-24">
        <Container className="max-w-lg">
          <div className="rounded-xl border border-border bg-white p-10 text-center">
            <RefreshCw className="mx-auto mb-4 text-obsidian/30" size={48} />
            <h1 className="text-xl font-bold text-obsidian">
              We could not load this page
            </h1>
            <p className="mt-2 text-sm text-obsidian/50">
              Retry, or contact support with a case reference if this keeps
              happening.
            </p>
            <AppButton className="mt-6" onClick={load}>
              Retry
            </AppButton>
          </div>
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
              Sign in to view your order history.
            </p>

            <Link href="/login">
              <AppButton className="mt-8 w-full">Sign In</AppButton>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-12">
      <Container className="max-w-4xl">
        <h1 className="text-3xl font-bold">My Orders</h1>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-xl border border-border bg-white p-12 text-center">
            <Package className="mx-auto mb-4 text-obsidian/20" size={56} />

            <h2 className="text-xl font-bold">No Orders Yet</h2>

            <p className="mt-2 text-obsidian/50">
              Your placed orders will show up here.
            </p>

            <Link href="/products">
              <AppButton className="mt-6">Browse Products</AppButton>
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <Link
                key={order.uuid}
                href={`/orders/${order.uuid}`}
                className="block rounded-xl border border-border bg-white p-6 transition hover:border-sapphire hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-obsidian">
                      {order.order_number}
                    </p>
                    <p className="text-sm text-obsidian/50">
                      Placed {new Date(order.placed_at).toLocaleDateString()}{" "}
                      · {order.seller_orders.length} supplier
                      {order.seller_orders.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.status}
                    </span>

                    <span className="text-lg font-bold text-obsidian">
                      ${order.total}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
