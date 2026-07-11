import Container from "@/components/layout/Container";

import { Supplier } from "../data/suppliers";

import SupplierHero from "../components/SupplierHero";
import SupplierAbout from "../components/SupplierAbout";
import SupplierStats from "../components/SupplierStats";
import SupplierProducts from "../components/SupplierProducts";

interface Props {
  supplier: Supplier;
}

export default function SupplierProfile({
  supplier,
}: Props) {
  return (
    <section className="bg-slate-50 pb-24">

      <SupplierHero supplier={supplier} />

      <Container>

        <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">

          <SupplierAbout supplier={supplier} />

          <SupplierStats supplier={supplier} />

        </div>

        <SupplierProducts supplier={supplier} />

      </Container>

    </section>
  );
}