import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/common/Breadcrumb";

import { categories } from "../data/categories";

import CategoryHero from "../components/CategoryHero";
import CategoryGrid from "../components/CategoryGrid";

export default function CategoriesPage() {
  return (
    <section className="bg-slate-50 py-7">

      <Container>

        <Breadcrumb
          
        />

        <CategoryHero total={categories.length} />

        <CategoryGrid
          categories={categories}
        />

      </Container>

    </section>
  );
}