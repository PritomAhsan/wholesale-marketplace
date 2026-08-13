import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/common/Breadcrumb";

import { Category } from "../data/categories";

import CategoryHero from "../components/CategoryHero";
import CategoryGrid from "../components/CategoryGrid";

interface Props {
  categories: Category[];
}

export default function CategoriesPage({ categories }: Props) {
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
