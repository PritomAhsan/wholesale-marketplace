import type { Metadata } from "next";
import { ShieldCheck, FileCheck2, Scale } from "lucide-react";

import Container from "@/components/layout/Container";
import BuyerSupplierCTA from "@/components/shared/BuyerSupplierCTA";

export const metadata: Metadata = {
  title: "About Bulkare",
  description:
    "Bulkare organizes product discovery, supplier comparison, quotation requests and wholesale purchasing for qualified businesses.",
};

const identityLayers = [
  {
    icon: ShieldCheck,
    title: "Public marketplace",
    copy: "Buyers see a protected Seller ID — never a supplier's legal business name.",
  },
  {
    icon: FileCheck2,
    title: "Bulkare verification",
    copy: "Bulkare privately verifies the legal business and documents behind every account.",
  },
  {
    icon: Scale,
    title: "Authorized transaction",
    copy: "Identity is disclosed only where required for payments, tax, invoicing, disputes, regulators or applicable law.",
  },
];

const audiences = [
  {
    title: "Buyers",
    copy: "Independent retailers, convenience stores and qualified resellers.",
  },
  {
    title: "Suppliers",
    copy: "Verified distributors, wholesalers and authorized inventory owners.",
  },
];

const principles = [
  "Commercial confidentiality",
  "Verified participation",
  "Clear wholesale terms",
  "Accountable transactions",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-white py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-sapphire">
            About Bulkare
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-obsidian sm:text-5xl">
            A more disciplined way to source wholesale inventory.
          </h1>
        </Container>
      </section>

      {/* What Bulkare is */}
      <section id="how-it-works" className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <h2 className="text-2xl font-semibold text-obsidian">
              What Bulkare is
            </h2>
            <div className="space-y-4 text-base leading-7 text-obsidian/70">
              <p>
                Bulkare organizes product discovery, supplier comparison,
                quotation requests and wholesale purchasing for qualified
                businesses.
              </p>
              <p>
                For buyers, it brings sourcing into one controlled
                environment — compare wholesale terms, request quotations
                and track orders without chasing suppliers across
                disconnected channels.
              </p>
              <p>
                For suppliers, it means reaching qualified buyers through a
                protected storefront, without exposing a retail identity to
                the open market.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Protected identity */}
      <section id="verification" className="border-y border-border bg-white py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-obsidian">
            How protected identity works
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-obsidian/60">
            Sellers are not absolutely anonymous — identity is layered and
            disclosed only when the situation requires it.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {identityLayers.map((layer, index) => (
              <div
                key={layer.title}
                className="relative rounded-2xl border border-border bg-ivory p-6"
              >
                <span className="text-xs font-semibold text-champagne">
                  LAYER {index + 1}
                </span>
                <layer.icon className="mt-3 h-6 w-6 text-sapphire" />
                <h3 className="mt-3 font-semibold text-obsidian">
                  {layer.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-obsidian/60">
                  {layer.copy}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Who it serves */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-obsidian">
            Who the marketplace serves
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-border p-6"
              >
                <h3 className="font-semibold text-obsidian">{a.title}</h3>
                <p className="mt-2 text-sm leading-6 text-obsidian/60">
                  {a.copy}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="border-t border-border bg-white py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-obsidian">
            Operating principles
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div
                key={p}
                className="rounded-xl border border-border bg-ivory px-5 py-4 text-sm font-medium text-obsidian"
              >
                {p}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final action */}
      <BuyerSupplierCTA />
    </>
  );
}
