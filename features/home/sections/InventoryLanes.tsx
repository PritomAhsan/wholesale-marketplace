import Container from "@/components/layout/Container";
import InventoryLanesTabs from "../components/InventoryLanesTabs";
import { fetchInventoryLanes } from "../api";

export default async function InventoryLanes() {
  const { newThisWeek, lowMoq, featured } = await fetchInventoryLanes();

  if (newThisWeek.length < 4 && lowMoq.length < 4 && featured.length < 4) return null;

  return (
    <section className="border-t border-border bg-white py-16">
      <Container>
        <h2 className="text-2xl font-bold text-obsidian">
          Inventory opportunities
        </h2>

        <div className="mt-8">
          <InventoryLanesTabs
            newThisWeek={newThisWeek}
            lowMoq={lowMoq}
            featured={featured}
          />
        </div>
      </Container>
    </section>
  );
}
