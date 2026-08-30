import Container from "@/components/layout/Container";
import RfqQuickStart from "../components/RfqQuickStart";

export default function RfqDesk() {
  return (
    <section className="py-16">
      <Container>
        <div
          className="rounded-3xl p-[1.5px]"
          style={{
            background:
              "linear-gradient(120deg, var(--champagne) 0%, var(--sapphire) 50%, var(--champagne) 100%)",
          }}
        >
          <div
            className="grid gap-8 rounded-[calc(1.5rem-1.5px)] px-8 py-12 sm:px-12 lg:grid-cols-[1fr_360px] lg:items-center"
            style={{
              background:
                "linear-gradient(135deg, var(--sapphire-soft) 0%, var(--ivory) 50%, var(--champagne-soft) 100%)",
            }}
          >
            <div>
              <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-champagne shadow-sm">
                Request for quotation
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-obsidian">
                One request. Multiple qualified offers.
              </h2>
              <p className="mt-3 max-w-md text-sm text-obsidian/60">
                Tell approved suppliers what you need, how much you need and
                where it must be delivered.
              </p>
            </div>

            <RfqQuickStart />
          </div>
        </div>
      </Container>
    </section>
  );
}
