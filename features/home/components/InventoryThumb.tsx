import { categoryTint } from "@/features/categories/utils/categoryBadge";

interface Props {
  seed: string;
  quantityLabel?: string;
}

const BAR_HEIGHTS = ["55%", "80%", "40%", "65%"];

export default function InventoryThumb({ seed, quantityLabel }: Props) {
  const tint = categoryTint(seed);
  const barCount = 2 + (seed.length % 3);

  return (
    <div
      className="relative flex h-full w-full items-end justify-center gap-1.5 overflow-hidden rounded-lg px-4 pb-3 pt-4"
      style={{ backgroundColor: tint.bg }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          className="w-3 rounded-t-sm"
          style={{
            height: BAR_HEIGHTS[(seed.charCodeAt(i % seed.length) + i) % BAR_HEIGHTS.length],
            backgroundColor: i % 2 === 0 ? tint.fg : "#b8935a",
            opacity: 0.85,
          }}
        />
      ))}

      {quantityLabel && (
        <span className="absolute left-2 top-2 rounded-md bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-obsidian/60">
          {quantityLabel}
        </span>
      )}
    </div>
  );
}
