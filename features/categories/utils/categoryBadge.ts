const TINTS = [
  { bg: "#b7e3ff", fg: "#235f92" }, // sky tint
  { bg: "#d0ecff", fg: "#2f7fc1" }, // light sky tint
  { bg: "#a8ddfb", fg: "#1c4f78" }, // deep sky tint
  { bg: "#c3e6fc", fg: "#286a9e" }, // ocean tint
  { bg: "#daf0ff", fg: "#3a85c4" }, // soft ocean tint
  { bg: "#9fd8fa", fg: "#164561" }, // deep ocean tint
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
