import { Building2, ShieldCheck } from "lucide-react";

interface Props {
  companyName: string;
  logoPreview: string | null;
  bannerPreview: string | null;
}

export default function SupplierHero({ companyName, logoPreview, bannerPreview }: Props) {
  return (
    <section className="border-b border-border bg-champagne-soft py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_380px] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            Become a Supplier
          </p>

          <h1 className="mt-3 max-w-xl text-3xl font-bold text-obsidian sm:text-4xl">
            List your inventory in front of verified wholesale buyers.
          </h1>

          <p className="mt-3 max-w-lg text-sm text-obsidian/60">
            Apply once. Our team reviews every application before your
            storefront goes live — no fake reviews, no anonymous buyers,
            just qualified B2B demand.
          </p>
        </div>

        {/* Live storefront preview, reflects the application form as it's filled in */}
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          {bannerPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bannerPreview}
              alt="Storefront banner preview"
              className="h-24 w-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-full items-center justify-center bg-muted text-xs text-obsidian/30">
              Banner preview
            </div>
          )}

          <div className="p-4">
            <div className="flex items-center gap-3">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-10 w-10 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Building2 size={18} className="text-obsidian/40" />
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-obsidian">
                  {companyName || "Your company name"}
                </p>
                <p className="flex items-center gap-1 text-xs text-champagne">
                  <ShieldCheck size={12} /> Pending verification
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-obsidian/40">
              This is a live preview of how your storefront card starts to
              look as you fill in the application below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
