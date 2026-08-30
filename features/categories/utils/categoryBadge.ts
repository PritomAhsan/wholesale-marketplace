const TINTS = [
  { bg: "#f1eafe", fg: "#7c3aed" }, // sapphire tint
  { bg: "#fce7f3", fg: "#ec4899" }, // champagne tint
  { bg: "#ede9fe", fg: "#5b21b6" }, // deep violet tint
  { bg: "#e0e7ff", fg: "#4338ca" }, // indigo tint
  { bg: "#fae8ff", fg: "#a21caf" }, // magenta tint
  { bg: "#f3e8ff", fg: "#7e22ce" }, // plum tint
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
