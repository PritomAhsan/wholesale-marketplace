import Container from "@/components/layout/Container";
import CategoryCard from "../components/CategoryCard";
import { featuredCategories } from "../data/featuredCategories";

export default function FeaturedCategories() {
  return (
    <section className="py-24">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Browse Categories
          </span>

          <h2 className="mt-3 text-4xl font-bold">
            Explore Popular Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Discover thousands of wholesale products across our most
            popular business categories.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}