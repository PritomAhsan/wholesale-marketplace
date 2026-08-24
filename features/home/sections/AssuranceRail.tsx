import { FileCheck, Lock, ShieldCheck, Tag } from "lucide-react";

import Container from "@/components/layout/Container";

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    eyebrow: "Verified",
    text: "Privately verified businesses",
    tone: "champagne",
  },
  {
    icon: Lock,
    eyebrow: "Private",
    text: "Protected seller identities",
    tone: "sapphire",
  },
  {
    icon: Tag,
    eyebrow: "Clear",
    text: "Wholesale pricing and MOQs",
    tone: "champagne",
  },
  {
    icon: FileCheck,
    eyebrow: "Recorded",
    text: "Secure order records",
    tone: "sapphire",
  },
] as const;

export default function AssuranceRail() {
  return (
    <section className="bg-obsidian py-12">
      <Container>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((item, i) => {
            const Icon = item.icon;
            const tone = item.tone === "champagne" ? "text-champagne" : "text-sapphire-soft";
            const bg = item.tone === "champagne" ? "bg-champagne/15" : "bg-sapphire-soft/10";

            return (
              <div
                key={item.eyebrow}
                className={`flex items-center gap-4 ${
                  i > 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg}`}
                >
                  <Icon className={`h-6 w-6 ${tone}`} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-champagne">
                    {item.eyebrow}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
