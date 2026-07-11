import Container from "@/components/layout/Container";
import ProductBreadcrumb from "@/features/products/components/ProductBreadcrumb";

import SupplierGrid from "@/features/suppliers/components/SupplierGrid";
import SupplierToolbar from "@/features/suppliers/components/SupplierToolbar";

import { suppliers } from "@/features/suppliers/data/suppliers";

export default function SuppliersPage() {
  return (
    <section className="bg-slate-50 py-8">

      <Container>

        <ProductBreadcrumb />

        <SupplierToolbar total={suppliers.length} />

        <SupplierGrid suppliers={suppliers} />

      </Container>

    </section>
  );
}