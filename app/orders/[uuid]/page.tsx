"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useAuth } from "@/features/auth/AuthContext";
import { fetchOrder, Order } from "@/features/cart/api";

export default function OrderDetailPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const { token, loading: authLoading } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchOrder(token, uuid).then((data) => {
      setOrder(data);
      setLoading(false);
    });
  }, [token, uuid]);

  if (authLoading || loading) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-2xl text-center text-slate-500">
          Loading...
        </Container>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-lg text-center">
          <h1 className="text-2xl font-bold">Order Not Found</h1>

          <p className="mt-3 text-slate-500">
            We couldn&apos;t find that order, or you don&apos;t have access
            to it.
          </p>

          <Link href="/orders">
            <AppButton className="mt-8">View Your Orders</AppButton>
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-12">
      <Container className="max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <CheckCircle2 className="mx-auto mb-4 text-green-500" size={56} />

          <h1 className="text-2xl font-bold">Order Placed Successfully</h1>

          <p className="mt-2 text-slate-500">
            Order <span className="font-semibold">{order.order_number}</span>{" "}
            · Placed {new Date(order.placed_at).toLocaleDateString()}
          </p>

          <span className="mt-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold capitalize text-amber-700">
            {order.status}
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {order.seller_orders.map((sellerOrder) => (
              <div
                key={sellerOrder.uuid}
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {sellerOrder.seller_order_number}
                    </p>
                    <h2 className="text-lg font-bold text-slate-900">
                      {sellerOrder.supplier?.display_name}
                    </h2>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                    {sellerOrder.status}
                  </span>
                </div>

                <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                  {sellerOrder.items.map((item) => (
                    <div key={item.uuid} className="flex items-center gap-3">
                      {item.product_image && (
                        <Image
                          src={item.product_image}
                          alt={item.product_name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      )}

                      <div className="flex-1">
                        <p className="font-medium text-slate-800">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {item.quantity} × ${item.unit_price}
                        </p>
                      </div>

                      <p className="font-semibold text-slate-900">
                        ${item.line_total}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-end border-t border-slate-100 pt-4 text-sm">
                  <span className="text-slate-500">Subtotal:</span>
                  <span className="ml-2 font-bold text-slate-900">
                    ${sellerOrder.subtotal}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Shipping To</h3>

              <p className="mt-3 text-sm text-slate-600">
                {order.shipping.name}
                <br />
                {order.shipping.address}
                <br />
                {order.shipping.city}, {order.shipping.country}{" "}
                {order.shipping.postal_code}
                <br />
                {order.shipping.phone}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Order Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${order.total}
                </span>
              </div>
            </div>

            <Link href="/products">
              <AppButton className="w-full justify-center">
                Continue Shopping
              </AppButton>
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  );
}
