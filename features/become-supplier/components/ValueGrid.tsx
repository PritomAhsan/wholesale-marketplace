import { Lock, ShoppingBag, Gauge, LayoutDashboard } from "lucide-react";

const VALUES = [
  {
    icon: Lock,
    title: "Protected seller identity",
    body: "Buyers see a private Seller ID, not your company name, until you choose to engage on an order.",
  },
  {
    icon: ShoppingBag,
    title: "Verified buyer demand only",
    body: "Every buyer account on Bulkare is a registered business, not anonymous retail traffic.",
  },
  {
    icon: Gauge,
    title: "Reviewed applications",
    body: "Our team reviews every application before a storefront goes live — no automatic approvals.",
  },
  {
    icon: LayoutDashboard,
    title: "One seller dashboard",
    body: "Manage listings, RFQs and orders from a single account once approved.",
  },
];

export default function ValueGrid() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-xl font-bold text-obsidian">
          Why sell on Bulkare
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-border p-5"
            >
              <v.icon className="text-sapphire" size={22} />
              <h3 className="mt-3 text-sm font-bold text-obsidian">
                {v.title}
              </h3>
              <p className="mt-1.5 text-sm text-obsidian/50">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
