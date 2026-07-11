import {
  BadgeCheck,
  Building2,
  Clock3,
  Package,
  Users,
} from "lucide-react";

import { Supplier } from "../data/suppliers";

interface Props {
  supplier: Supplier;
}

export default function SupplierStats({
  supplier,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Business Information
      </h2>

      <div className="space-y-5">

        <Item
          icon={<BadgeCheck size={18} />}
          label="Verification"
          value="Verified Supplier"
        />

        <Item
          icon={<Building2 size={18} />}
          label="Established"
          value={supplier.established.toString()}
        />

        <Item
          icon={<Users size={18} />}
          label="Employees"
          value={supplier.employees}
        />

        <Item
          icon={<Package size={18} />}
          label="Products"
          value={supplier.totalProducts.toString()}
        />

        <Item
          icon={<Clock3 size={18} />}
          label="Response Time"
          value={supplier.responseTime}
        />

      </div>

    </div>
  );
}

function Item({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0">

      <div className="flex items-center gap-3 text-slate-500">

        {icon}

        {label}

      </div>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}