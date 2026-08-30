import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import InventoryCard from "../components/InventoryCard";
import { fetchReadyToOrder } from "../api";

export default async function ReadyToOrder() {
  const products = await fetchReadyToOrder();

  if (products.length === 0) return null;

  return (
    <section className="bg-ivory py-16">
      <Container>
        <div
          className="rounded-3xl p-[1.5px]"
          style={{
            background:
              "linear-gradient(120deg, var(--sapphire) 0%, var(--champagne) 50%, var(--sapphire) 100%)",
          }}
        >
          <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-block rounded-full bg-sapphire-soft px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sapphire">
                  Approved listings
                </span>
                <h2 className="mt-4 text-2xl font-bold text-obsidian sm:text-3xl">
                  Ready-to-order inventory
                </h2>
                <p className="mt-2 text-sm text-obsidian/60">
                  Genuine wholesale listings, ready to ship.
                </p>
              </div>

              <AppButton variant="secondary" size="md" asChild className="shrink-0">
                <Link href="/products">
                  View all products
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </AppButton>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <InventoryCard key={product.uuid} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
