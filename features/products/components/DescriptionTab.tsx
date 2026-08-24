"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  description: string;
}

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
          <div className="rounded-xl bg-sapphire-soft p-2">
            <Sparkles className="h-5 w-5 text-sapphire" />
          </div>

          <h3 className="text-2xl font-bold text-obsidian">
            Product Description
          </h3>
        </div>

        <p className="leading-8 text-obsidian/60">
          {expanded ? description : shortText}
        </p>

        {description.length > 420 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-5 font-semibold text-sapphire transition hover:underline"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </section>
    </div>
  );
}