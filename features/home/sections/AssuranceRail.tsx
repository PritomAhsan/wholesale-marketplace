import Container from "@/components/layout/Container";

const COMMITMENTS = [
  { num: 1, eyebrow: "Verified", text: "Privately verified businesses", tone: "sapphire" },
  { num: 2, eyebrow: "Private", text: "Protected seller identities", tone: "sapphire" },
  { num: 3, eyebrow: "Clear", text: "Wholesale pricing and MOQs", tone: "champagne" },
  { num: 4, eyebrow: "Recorded", text: "Secure order records", tone: "sapphire" },
] as const;

export default function AssuranceRail() {
  return (
    <section className="border-b border-border bg-white py-10">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((item) => (
            <div
              key={item.num}
              className="flex items-center gap-4 rounded-xl border border-border p-5"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                  item.tone === "champagne" ? "bg-champagne" : "bg-sapphire"
                }`}
              >
                {item.num}
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-obsidian/40">
                  {item.eyebrow}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-obsidian">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
