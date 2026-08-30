import Link from "next/link";

import Container from "@/components/layout/Container";
import { fetchFeaturedSellers } from "../api";

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  manufacturer: "Manufacturer",
  wholesaler: "Wholesaler",
  distributor: "Distributor",
  exporter: "Exporter",
  retailer: "Retailer",
};

const AVATAR_TONES = ["bg-sapphire", "bg-champagne", "bg-obsidian/70"];

export default async function ProtectedSupplierNetwork() {
  const sellers = await fetchFeaturedSellers();

  if (sellers.length === 0) return null;

  return (
    <section
      className="border-y border-border py-16"
      style={{
        background:
          "linear-gradient(135deg, var(--sapphire-soft) 0%, var(--ivory) 45%, var(--champagne-soft) 100%)",
      }}
    >
      <Container>
        <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sapphire shadow-sm">
          Protected supplier network
        </span>
        <h2 className="mt-4 text-2xl font-bold text-obsidian sm:text-3xl">
          Evaluate capability without public identity exposure
        </h2>
        <p className="mt-2 max-w-xl text-sm text-obsidian/60">
          Operational signals replace unsupported badges, public store
          names and vanity statistics.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {sellers.map((seller, i) => {
            const tone = AVATAR_TONES[i % AVATAR_TONES.length];
            const featured = tone === "bg-champagne";

            return (
              <Link
                key={seller.sellerId}
                href={`/sellers/${seller.sellerId}`}
                className={`rounded-xl border p-5 transition ${
                  featured
                    ? "border-champagne/40 bg-champagne-soft hover:border-champagne"
                    : "border-border bg-white hover:border-sapphire"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${tone}`}
                  >
                    B
                  </span>
                  <div>
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-wide ${
                        featured ? "text-champagne" : "text-sapphire"
                      }`}
                    >
                      {seller.verified ? "Privately verified" : "Seller"}
                    </p>
                    <p className="font-semibold text-obsidian">
                      Seller {seller.sellerId.replace("BLK-", "")}
                    </p>
                  </div>
                </div>

                <dl className={`mt-4 space-y-2 border-t pt-3 text-xs ${featured ? "border-champagne/20" : "border-border"}`}>
                  <div className="flex items-center justify-between">
                    <dt className="text-obsidian/40">Categories</dt>
                    <dd className="text-right font-medium text-obsidian">
                      {seller.categories.slice(0, 2).map((c) => c.name).join(" · ") || "—"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-obsidian/40">Type</dt>
                    <dd className="font-medium text-obsidian">
                      {BUSINESS_TYPE_LABELS[seller.businessType] ?? seller.businessType}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-obsidian/40">Fulfillment</dt>
                    <dd className="font-medium text-obsidian">
                      {seller.fulfillmentRegion ?? "—"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-obsidian/40">Typical lead</dt>
                    <dd className="font-medium text-obsidian">
                      {seller.typicalLeadTime ?? "—"}
                    </dd>
                  </div>
                </dl>

                <span className={`mt-4 inline-block text-xs font-medium ${featured ? "text-champagne" : "text-sapphire"}`}>
                  View protected profile →
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
