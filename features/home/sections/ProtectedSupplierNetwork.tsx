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

const AVATAR_TONES = ["bg-obsidian", "bg-champagne", "bg-sapphire"];

export default async function ProtectedSupplierNetwork() {
  const sellers = await fetchFeaturedSellers();

  if (sellers.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wide text-sapphire">
          Protected supplier network
        </p>
        <h2 className="mt-2 text-2xl font-bold text-obsidian">
          Evaluate capability without public identity exposure
        </h2>
        <p className="mt-1.5 max-w-xl text-sm text-obsidian/60">
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
                className={`rounded-xl p-5 transition ${
                  featured
                    ? "bg-obsidian text-white hover:bg-obsidian-soft"
                    : "border border-border bg-white hover:border-sapphire"
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
                    <p className={`font-semibold ${featured ? "text-white" : "text-obsidian"}`}>
                      Seller {seller.sellerId.replace("BLK-", "")}
                    </p>
                  </div>
                </div>

                <dl className={`mt-4 space-y-2 border-t pt-3 text-xs ${featured ? "border-white/10" : "border-border"}`}>
                  <div className="flex items-center justify-between">
                    <dt className={featured ? "text-ivory/40" : "text-obsidian/40"}>Categories</dt>
                    <dd className={`text-right font-medium ${featured ? "text-white" : "text-obsidian"}`}>
                      {seller.categories.slice(0, 2).map((c) => c.name).join(" · ") || "—"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className={featured ? "text-ivory/40" : "text-obsidian/40"}>Type</dt>
                    <dd className={`font-medium ${featured ? "text-white" : "text-obsidian"}`}>
                      {BUSINESS_TYPE_LABELS[seller.businessType] ?? seller.businessType}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className={featured ? "text-ivory/40" : "text-obsidian/40"}>Fulfillment</dt>
                    <dd className={`font-medium ${featured ? "text-white" : "text-obsidian"}`}>
                      {seller.fulfillmentRegion ?? "—"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className={featured ? "text-ivory/40" : "text-obsidian/40"}>Typical lead</dt>
                    <dd className={`font-medium ${featured ? "text-white" : "text-obsidian"}`}>
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
