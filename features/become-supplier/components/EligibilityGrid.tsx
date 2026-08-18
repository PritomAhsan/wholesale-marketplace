import { CheckCircle2 } from "lucide-react";

const REQUIREMENTS = [
  {
    title: "Registered business",
    body: "Company name and business type (manufacturer, wholesaler, distributor, exporter or retailer).",
  },
  {
    title: "A reachable contact",
    body: "A named contact person with a business email and phone number our team can reach.",
  },
  {
    title: "Registration details (if available)",
    body: "Business registration and tax numbers strengthen your application, but aren't required to apply.",
  },
  {
    title: "A description of what you sell",
    body: "Products, categories, typical order volumes — helps our team review faster.",
  },
];

export default function EligibilityGrid() {
  return (
    <section id="eligibility" className="bg-ivory py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-xl font-bold text-obsidian">
          What you&apos;ll need to apply
        </h2>
        <p className="mt-1.5 text-sm text-obsidian/50">
          Exactly what the application form below asks for — nothing else.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {REQUIREMENTS.map((r) => (
            <div
              key={r.title}
              className="flex items-start gap-3 rounded-xl border border-border bg-white p-5"
            >
              <CheckCircle2 className="mt-0.5 shrink-0 text-sapphire" size={18} />
              <div>
                <h3 className="text-sm font-bold text-obsidian">{r.title}</h3>
                <p className="mt-1 text-sm text-obsidian/50">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
