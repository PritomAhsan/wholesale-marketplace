import { LucideIcon } from "lucide-react";

interface Props {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function HowItWorksCard({
  step,
  title,
  description,
  icon: Icon,
}: Props) {
  return (
    <div className="group relative rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg">
        <Icon size={28} />
      </div>

      <div className="absolute right-6 top-6 text-6xl font-black text-slate-100 transition group-hover:text-blue-50">
        {step}
      </div>

      <h3 className="mt-8 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}