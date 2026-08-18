import Link from "next/link";
import { AppButton } from "@/components/ui/app-button";

const NEEDS = [
  { num: "01", title: "Fast restock", copy: "Ready-to-order inventory" },
  { num: "02", title: "Low MOQ", copy: "Test a new assortment" },
  { num: "03", title: "Pallet pricing", copy: "Improve unit economics" },
];

export default function HeroBuyerDesk() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-obsidian p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-champagne">
          Buyer desk
        </p>
        <p className="mt-1.5 font-semibold">Start with a business need</p>

        <ul className="mt-4 space-y-3">
          {NEEDS.map((need) => (
            <li key={need.num} className="flex items-start gap-3">
              <span className="text-xs font-semibold text-ivory/40">
                {need.num}
              </span>
              <div>
                <p className="text-sm font-medium">{need.title}</p>
                <p className="text-xs text-ivory/50">{need.copy}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/products"
          className="mt-4 inline-block text-xs font-medium text-champagne hover:text-champagne-soft"
        >
          Open buyer desk →
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-champagne-soft/30 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-champagne">
          Protected sourcing
        </p>
        <p className="mt-1.5 font-semibold text-obsidian">
          Need an exact product or volume?
        </p>
        <p className="mt-2 text-xs text-obsidian/60">
          Send one structured request and compare qualified offers in a
          private workspace.
        </p>
        <Link href="/rfq" className="mt-4 inline-block">
          <AppButton variant="primary" size="sm">
            Start an RFQ
          </AppButton>
        </Link>
      </div>
    </div>
  );
}
