import Container from "@/components/layout/Container";
import InventoryLanesTabs from "../components/InventoryLanesTabs";
import { fetchInventoryLanes } from "../api";

export default async function InventoryLanes() {
  const { newThisWeek, lowMoq, featured } = await fetchInventoryLanes();

  if (newThisWeek.length < 4 && lowMoq.length < 4 && featured.length < 4) return null;

  return (
    <section className="bg-ivory py-16">
      <Container>
        <div
          className="rounded-3xl p-[1.5px]"
          style={{
            background:
              "linear-gradient(120deg, var(--champagne) 0%, var(--sapphire) 50%, var(--champagne) 100%)",
          }}
        >
          <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
