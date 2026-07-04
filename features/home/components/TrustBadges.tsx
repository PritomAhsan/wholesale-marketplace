import {
  BadgeCheck,
  ShieldCheck,
  Truck,
  Package,
} from "lucide-react";

const items = [
  {
    icon: BadgeCheck,
    title: "Verified Suppliers",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
  },
  {
    icon: Package,
    title: "Bulk Orders",
  },
];

export default function TrustBadges() {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-8">

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-sm"
          >
            <Icon className="h-5 w-5 text-blue-600" />
            <span className="font-medium">
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}