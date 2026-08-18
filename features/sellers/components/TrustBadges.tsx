import { Package, ShieldCheck, Sparkles, Star, Users } from "lucide-react";

const BADGE_META: Record<
  string,
  { label: string; icon: typeof ShieldCheck }
> = {
  verified_store: { label: "Verified Store", icon: ShieldCheck },
  top_rated_seller: { label: "Top Rated Seller", icon: Star },
  bulk_order_friendly: { label: "Bulk Order Friendly", icon: Package },
  high_repeat_buyer_rate: { label: "High Repeat Buyer Rate", icon: Users },
  new_seller: { label: "New Seller", icon: Sparkles },
};

interface Props {
  badges: string[];
}

export default function TrustBadges({ badges }: Props) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => {
        const meta = BADGE_META[badge];
        if (!meta) return null;

        const Icon = meta.icon;

        return (
          <span
            key={badge}
            className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-champagne-soft/40 px-3 py-1 text-xs font-semibold text-obsidian/80"
          >
            <Icon className="h-3.5 w-3.5 text-champagne" />
            {meta.label}
          </span>
        );
      })}
    </div>
  );
}
