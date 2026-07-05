import Container from "@/components/layout/Container";
import SupplierCard from "../components/SupplierCard";
import { featuredSuppliers } from "../data/featuredSuppliers";

export default function FeaturedSuppliers() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Trusted Suppliers
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Verified Wholesale Stores
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Partner with trusted suppliers offering quality products,
            competitive pricing, and reliable fulfillment.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredSuppliers.map((supplier) => (
            <SupplierCard key={supplier.id} {...supplier} />
          ))}
        </div>
      </Container>
    </section>
  );
}