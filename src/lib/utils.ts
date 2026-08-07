export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
});

const integerFormatter = new Intl.NumberFormat("en-US");

export function formatCompact(value: number): string {
  return compactFormatter.format(value);
}

export function formatNumber(value: number): string {
  return integerFormatter.format(value);
}

export function formatArea(km2: number): string {
  if (km2 >= 1_000_000) {
    return `${(km2 / 1_000_000).toFixed(km2 % 1_000_000 === 0 ? 0 : 1)}M km²`;
  }
  if (km2 >= 1_000) {
    return `${(km2 / 1_000).toFixed(km2 % 1_000 === 0 ? 0 : 1)}K km²`;
  }
  return `${km2} km²`;
}

export function formatGdp(usd: number): string {
  if (usd >= 1_000_000_000_000) {
    return `$${(usd / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (usd >= 1_000_000_000) {
    return `$${(usd / 1_000_000_000).toFixed(1)}B`;
  }
  if (usd >= 1_000_000) {
    return `$${(usd / 1_000_000).toFixed(1)}M`;
  }
  return `$${usd.toLocaleString("en-US")}`;
}
