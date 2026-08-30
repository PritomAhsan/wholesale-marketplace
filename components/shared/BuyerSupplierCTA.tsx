import Link from "next/link";
import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";

export default function BuyerSupplierCTA() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-sapphire/20 bg-sapphire-soft p-8">
            <h3 className="text-lg font-semibold text-obsidian">
              Strengthen your inventory pipeline
            </h3>
            <p className="mt-2 text-sm text-obsidian/60">
              Explore wholesale inventory from privately verified suppliers.
            </p>
            <Link href="/products" className="mt-5 inline-block">
              <AppButton variant="primary" size="sm">
                Explore wholesale inventory
              </AppButton>
            </Link>
          </div>

          <div className="rounded-2xl border border-border p-8">
            <h3 className="text-lg font-semibold text-obsidian">
              Reach qualified buyers
            </h3>
            <p className="mt-2 text-sm text-obsidian/60">
              Sell through a protected storefront without exposing your
              retail identity.
            </p>
            <Link href="/become-supplier" className="mt-5 inline-block">
              <AppButton variant="secondary" size="sm">
                Apply to sell
              </AppButton>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
