"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ShieldAlert } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useAuth } from "@/features/auth/AuthContext";
import { fetchMyOrders, Order } from "@/features/cart/api";

export default function OrdersPage() {
  const { user, token, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchMyOrders(token).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [token]);

  if (authLoading || loading) {
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
    <section className="bg-slate-50 py-12">
      <Container className="max-w-4xl">
        <h1 className="text-3xl font-bold">My Orders</h1>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <Package className="mx-auto mb-4 text-slate-300" size={56} />

            <h2 className="text-xl font-bold">No Orders Yet</h2>

            <p className="mt-2 text-slate-500">
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
                className="block rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">
                      {order.order_number}
                    </p>
                    <p className="text-sm text-slate-500">
                      Placed {new Date(order.placed_at).toLocaleDateString()}{" "}
                      · {order.seller_orders.length} supplier
                      {order.seller_orders.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold capitalize text-amber-700">
                      {order.status}
                    </span>

                    <span className="text-lg font-bold text-slate-900">
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
