import Container from "@/components/layout/Container";
import RfqQuickStart from "../components/RfqQuickStart";

export default function RfqDesk() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-8 rounded-2xl bg-obsidian px-8 py-12 sm:px-12 lg:grid-cols-[1fr_360px] lg:items-center">
          <div className="text-white">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-champagne">
              Request for quotation
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight">
              One request. Multiple qualified offers.
            </h2>
            <p className="mt-3 max-w-md text-sm text-ivory/60">
              Tell approved suppliers what you need, how much you need and
              where it must be delivered.
            </p>
          </div>

          <RfqQuickStart />
        </div>
      </Container>
    </section>
  );
}
