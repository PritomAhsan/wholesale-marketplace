import Container from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/section-heading";

import ProductCard from "../components/ProductCard";
import { featuredProducts } from "../data/featuredProducts";

export default function FeaturedProducts() {
  return (
    <section className="py-24">

      <Container>

        <SectionHeading
          badge="Featured Products"
          title="Popular Wholesale Products"
          description="Browse trending products from verified suppliers around the world."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}