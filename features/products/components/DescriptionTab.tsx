"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Sparkles,
  PackageCheck,
  Globe,
  ShieldCheck,
} from "lucide-react";

interface Props {
  description: string;
}

const highlights = [
  {
    icon: PackageCheck,
    title: "Premium Manufacturing",
    desc: "Produced with strict quality control standards.",
  },
  {
    icon: Sparkles,
    title: "OEM & ODM Service",
    desc: "Custom branding and private label available.",
  },
  {
    icon: Globe,
    title: "Worldwide Export",
    desc: "Global logistics with export documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    desc: "Factory inspection before shipment.",
  },
];

const features = [
  "Premium quality manufacturing",
  "OEM & ODM available",
  "Custom branding support",
  "Worldwide shipping",
  "Quality inspection",
  "Export documentation",
];

export default function DescriptionTab({ description }: Props) {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    description.length > 420
      ? description.slice(0, 420) + "..."
      : description;

  return (
    <div className="space-y-10">
      {/* Description */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900">
            Product Description
          </h3>
        </div>

        <p className="leading-8 text-slate-600">
          {expanded ? description : shortText}
        </p>

        {description.length > 420 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-5 font-semibold text-primary transition hover:underline"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </section>

      {/* Highlights */}
      <section>
        <h4 className="mb-5 text-lg font-semibold text-slate-900">
          Why Choose This Product
        </h4>

        <div className="grid gap-5 md:grid-cols-2">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h5 className="font-semibold text-slate-900">
                  {item.title}
                </h5>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section>
        <h4 className="mb-5 text-lg font-semibold text-slate-900">
          Key Features
        </h4>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />

              <span className="font-medium text-slate-700">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}