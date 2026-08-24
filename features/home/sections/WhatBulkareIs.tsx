import { ClipboardCheck, Scale, Search } from "lucide-react";

import Container from "@/components/layout/Container";

const STEPS = [
  {
    icon: Search,
    num: "01",
    title: "Discover",
    copy: "Products, categories, brands and UPCs",
  },
  {
    icon: Scale,
    num: "02",
    title: "Compare",
    copy: "Case pricing, MOQs and delivery terms",
  },
  {
    icon: ClipboardCheck,
    num: "03",
    title: "Transact",
    copy: "Quotes, orders and auditable records",
  },
];

export default function WhatBulkareIs() {
  return (
    <section
      className="relative overflow-hidden border-y border-border py-16"
      style={{
        background:
          "linear-gradient(135deg, var(--champagne-soft) 0%, var(--ivory) 55%, var(--sapphire-soft) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(var(--obsidian) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sapphire shadow-sm">
              What Bulkare is
            </span>
            <h2 className="mt-4 max-w-lg text-2xl font-bold leading-snug text-obsidian sm:text-3xl">
              Wholesale discovery with structure, privacy and accountability.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-obsidian/60">
              Bulkare is a business-to-business wholesale marketplace for
              independent retailers, convenience operators and qualified
              resellers. The platform brings product discovery, supplier
              comparison, quotation requests and bulk purchasing into one
              controlled buying environment. Supplier storefronts use
              protected public Seller IDs, while Bulkare privately verifies
              the legal business behind each account. Identity is disclosed
              only where required for payments, tax, invoicing, disputes,
              regulators or applicable law.
            </p>
          </div>

          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.num}
                  className={`flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    i === 0 ? "ring-1 ring-sapphire/15" : ""
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      i === 0
                        ? "bg-sapphire text-white"
                        : "bg-sapphire-soft text-sapphire-strong"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-champagne">
                      Step {step.num}
                    </p>
                    <p className="font-semibold text-obsidian">{step.title}</p>
                    <p className="mt-0.5 text-xs text-obsidian/50">{step.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
