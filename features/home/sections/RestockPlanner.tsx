import Container from "@/components/layout/Container";
import RestockPlannerForm from "../components/RestockPlannerForm";
import { fetchCategories } from "@/features/categories/api";

export default async function RestockPlanner() {
  const categories = await fetchCategories();

  return (
    <section className="border-b border-border bg-white py-16">
      <Container>
        <div className="grid gap-0 overflow-hidden rounded-2xl border border-border md:grid-cols-2">
          <div className="bg-obsidian p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-champagne">
              Restock planner
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Build a smarter restock plan.
            </h2>
            <p className="mt-3 text-sm leading-6 text-ivory/60">
              Turn a store need, target spend and fulfillment window into a
              reviewable buying shortlist.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-ivory/70">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                No automatic purchase
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Editable shortlist
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Live eligibility checks
              </li>
            </ul>
          </div>

          <div className="p-8">
            <p className="font-semibold text-obsidian">Create a buying brief</p>
            <div className="mt-5">
              <RestockPlannerForm
                categories={categories.map((c) => ({
                  id: c.id,
                  slug: c.slug,
                  name: c.name,
                }))}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
