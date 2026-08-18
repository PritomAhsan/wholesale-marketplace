import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import InventoryCard from "../components/InventoryCard";
import { fetchReadyToOrder } from "../api";

export default async function ReadyToOrder() {
  const products = await fetchReadyToOrder();

  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sapphire">
              Approved listings
            </p>
            <h2 className="mt-2 text-2xl font-bold text-obsidian">
              Ready-to-order inventory
            </h2>
            <p className="mt-1.5 text-sm text-obsidian/60">
              Genuine wholesale listings, ready to ship.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sapphire hover:text-sapphire-strong"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <InventoryCard key={product.uuid} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
