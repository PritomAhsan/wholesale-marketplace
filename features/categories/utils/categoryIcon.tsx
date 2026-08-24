import {
  Cpu,
  Factory,
  Shirt,
  Sprout,
  Package,
  Briefcase,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  Gem,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Keyword-matched so any admin-added category still gets a sensible icon
// without needing a hardcoded exhaustive list — falls back to a generic
// package icon rather than showing nothing.
const KEYWORD_ICONS: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["electronic", "electrical"], icon: Cpu },
  { keywords: ["industrial", "machinery"], icon: Factory },
  { keywords: ["apparel", "textile", "fabric", "cloth"], icon: Shirt },
  { keywords: ["home", "garden"], icon: Sprout },
  { keywords: ["packaging", "printing"], icon: Package },
  { keywords: ["office", "school"], icon: Briefcase },
  { keywords: ["beauty", "personal care"], icon: Sparkles },
  { keywords: ["food", "beverage"], icon: UtensilsCrossed },
  { keywords: ["sport", "outdoor"], icon: Dumbbell },
  { keywords: ["jewelry", "jewellery", "eyewear", "watch"], icon: Gem },
  { keywords: ["hardware", "fastener", "tool"], icon: Wrench },
];

export function categoryIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();

  const match = KEYWORD_ICONS.find(({ keywords }) =>
    keywords.some((keyword) => lower.includes(keyword))
  );

  return match?.icon ?? Package;
}
