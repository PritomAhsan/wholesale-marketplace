import { CheckCircle2 } from "lucide-react";

interface Props {
  description: string;
}

const features = [
  "Premium quality manufacturing",
  "OEM & ODM available",
  "Custom branding",
  "Worldwide shipping",
  "Quality inspection",
  "Export documentation",
];

export default function DescriptionTab({
  description,
}: Props) {
  return (
    <div className="space-y-8">

      <div>

        <h3 className="text-2xl font-bold">
          Product Description
        </h3>

        <p className="mt-5 leading-8 text-slate-600">
          {description}
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {features.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
          >
            <CheckCircle2 className="text-green-600" />

            {item}
          </div>
        ))}

      </div>

    </div>
  );
}