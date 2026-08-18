import { Eye, EyeOff } from "lucide-react";

interface Props {
  companyName: string;
  businessType: string;
  registrationNumber: string;
  taxNumber: string;
  website: string;
}

export default function StorefrontPreview({
  companyName,
  businessType,
  registrationNumber,
  taxNumber,
  website,
}: Props) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-xl font-bold text-obsidian">
          What&apos;s public vs. private
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm text-obsidian/50">
          Bulkare anonymizes seller identity on the storefront — buyers only
          ever see a generated Seller ID, never your legal company details,
          until you choose to engage directly on an order.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-sapphire">
              <Eye size={16} /> What buyers see
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <Row label="Seller ID" value="BLK-XXXXXX (generated at approval)" />
              <Row label="Business type" value={businessType || "—"} />
              <Row label="Storefront" value="Logo, banner, listings" />
            </div>
          </div>

          <div className="rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-obsidian/70">
              <EyeOff size={16} /> Bulkare-only, never shown to buyers
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <Row label="Company name" value={companyName || "—"} />
              <Row label="Registration number" value={registrationNumber || "—"} />
              <Row label="Tax ID" value={taxNumber || "—"} />
              <Row label="Website" value={website || "—"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-0">
      <span className="text-obsidian/50">{label}</span>
      <span className="font-medium text-obsidian">{value}</span>
    </div>
  );
}
