const TINTS = [
  { bg: "#eaf0fa", fg: "#1e3a70" }, // sapphire tint
  { bg: "#f3e6d0", fg: "#8a6a34" }, // champagne tint
  { bg: "#f3e6ee", fg: "#8a3a63" }, // rose tint
  { bg: "#e9e6f5", fg: "#4a3a8a" }, // violet tint
  { bg: "#e2f2ee", fg: "#1f6b57" }, // teal tint
  { bg: "#f3ece0", fg: "#8a5a2a" }, // tan tint
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function categoryAbbreviation(name: string): string {
  const words = name.split(/[\s,]+/).filter(Boolean);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

export function categoryTint(name: string): { bg: string; fg: string } {
  const index = hashString(name) % TINTS.length;
  return TINTS[index];
}
