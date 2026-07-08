import Container from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/section-heading";
import MobileFilters from "@/features/products/components/MobileFilters";

import ProductBreadcrumb from "@/features/products/components/ProductBreadcrumb";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductGrid from "@/features/products/components/ProductGrid";
import ProductToolbar from "@/features/products/components/ProductToolbar";
import { products } from "@/features/products/data/products";

export default function ProductsPage() {
  return (
    <section className="bg-slate-50 py-8">

      <Container>

        <ProductBreadcrumb />

        <SectionHeading
          badge="Marketplace"
          title="Wholesale Products"
          description="Browse wholesale products from verified suppliers across multiple industries."
        />

        <ProductToolbar total={products.length} />

        <div className="mt-10">

            <div className="mt-6 grid gap-8 lg:grid-cols-[200px_1fr]">

                <div className="hidden lg:block">
                    <ProductFilters />
                </div>

                <ProductGrid products={products} />

            </div>

        </div>

      </Container>

    </section>
  );
}