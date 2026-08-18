import Container from "@/components/layout/Container";

const STEPS = [
  { num: "01", title: "Discover", copy: "Products, categories, brands and UPCs" },
  { num: "02", title: "Compare", copy: "Case pricing, MOQs and delivery terms" },
  { num: "03", title: "Transact", copy: "Quotes, orders and auditable records" },
];

export default function WhatBulkareIs() {
  return (
    <section className="border-t border-border bg-white py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sapphire">
              What Bulkare is
            </p>
            <h2 className="mt-3 max-w-lg text-2xl font-bold leading-snug text-obsidian">
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

          <div className="rounded-2xl border border-border bg-ivory p-5">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`flex items-start gap-3 ${i > 0 ? "mt-4 border-t border-border pt-4" : ""}`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    i === 0
                      ? "bg-sapphire text-white"
                      : "bg-sapphire-soft text-sapphire-strong"
                  }`}
                >
                  {step.num}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-sapphire">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-sm text-obsidian/70">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
