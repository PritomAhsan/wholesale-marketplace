import { CheckCircle2 } from "lucide-react";

interface Props {
  description: string;
}

const features = [
  "Premium quality manufacturing",
  "OEM & ODM services available",
  "Custom branding and packaging",
  "Export-ready documentation",
  "Fast worldwide shipping",
  "Quality inspection before dispatch",
];

export default function ProductDescription({
  description,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10">

      <h2 className="text-3xl font-bold tracking-tight">
        Product Description
      </h2>

      <p className="mt-6 leading-8 text-slate-600">
        {description}
      </p>

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold">
          Key Features
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
            >
              <CheckCircle2
                size={20}
                className="text-green-600"
              />

              <span>{feature}</span>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}