import Container from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/section-heading";

import TestimonialCard from "../components/TestimonialCard";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-24">

      <Container>

        <SectionHeading
          badge="Testimonials"
          title="What Our Customers Say"
          description="Businesses around the world trust our marketplace to connect with reliable wholesale suppliers."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              {...item}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}