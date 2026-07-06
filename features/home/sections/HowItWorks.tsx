import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { SectionHeading } from "@/components/ui/section-heading";

import { howItWorks } from "../data/howItWorks";
import HowItWorksCard from "../components/HowItWorksCard";

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>

        <SectionHeading
          badge="Simple Process"
          title="How It Works"
          description="Buying wholesale products has never been easier. Complete your sourcing journey in three simple steps."
        />

        <div className="relative mt-20 grid gap-10 lg:grid-cols-3">

          {/* Connection Line */}
          <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-slate-200 lg:block" />

          {howItWorks.map((item) => (
            <div key={item.id} className="relative z-10">
              <HowItWorksCard
                step={item.id}
                {...item}
              />
            </div>
          ))}

        </div>

        <div className="mt-16 text-center">
          <AppButton size="lg">
            Start Sourcing Today
          </AppButton>
        </div>

      </Container>
    </section>
  );
}