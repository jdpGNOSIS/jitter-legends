export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function calculateKdRatio(kills: number, deaths: number): number {
  if (deaths === 0) return kills;
  return Math.round((kills / deaths) * 100) / 100;
}

export function calculateHeadshotPct(headshots: number, kills: number): number {
  if (kills === 0) return 0;
  return Math.round((headshots / kills) * 10000) / 100;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const TIER_COLORS: Record<string, string> = {
  S: "text-esports-gold",
  A: "text-esports-accent",
  B: "text-esports-green",
};

export const TIER_BG_COLORS: Record<string, string> = {
  S: "bg-esports-gold/10 border-esports-gold/30",
  A: "bg-esports-accent/10 border-esports-accent/30",
  B: "bg-esports-green/10 border-esports-green/30",
};
