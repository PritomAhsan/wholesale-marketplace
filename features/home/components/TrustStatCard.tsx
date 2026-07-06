import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function TrustStatCard({
  icon: Icon,
  value,
  label,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>

      <h3 className="mt-5 text-4xl font-black">
        {value}
      </h3>

      <p className="mt-2 text-slate-600">
        {label}
      </p>

    </div>
  );
}