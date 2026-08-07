import type {
  AreaValue,
  EconomyStat,
  GeoCoordinates,
  SourcedValue
} from "@/types/country";

export const UNAVAILABLE = "Data unavailable";

const integerFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(value: number): string {
  if (typeof value !== "number" || !isFinite(value)) return UNAVAILABLE;
  return integerFormatter.format(value);
}

export function formatCompact(value: number): string {
  if (typeof value !== "number" || !isFinite(value)) return UNAVAILABLE;
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function formatSourcedValue<T>(
  sourced: SourcedValue<T> | undefined,
  format: (value: T) => string
): string {
  if (!sourced || sourced.value === null || sourced.value === undefined) {
    return UNAVAILABLE;
  }
  return format(sourced.value);
}

export function formatPopulation(value: number): string {
  if (typeof value !== "number" || !isFinite(value)) return UNAVAILABLE;
  if (value >= 1_000_000_000) {
    return `${stripZeros((value / 1_000_000_000).toFixed(2))}B`;
  }
  if (value >= 1_000_000) {
    return `${stripZeros((value / 1_000_000).toFixed(2))}M`;
  }
  if (value >= 1_000) {
    return `${stripZeros((value / 1_000).toFixed(1))}K`;
  }
  return formatNumber(value);
}

function stripZeros(s: string): string {
  return s.replace(/\.?0+$/, "");
}

export function formatArea(area: AreaValue | undefined, compact = false): string {
  if (!area || typeof area.value !== "number" || !isFinite(area.value)) {
    return UNAVAILABLE;
  }
  const unit = area.unit === "km²" ? "km²" : "km²";
  if (compact) {
    if (area.value >= 1_000_000) {
      return `${(area.value / 1_000_000).toFixed(1)}M ${unit}`;
    }
    if (area.value >= 1_000) {
      return `${(area.value / 1_000).toFixed(1)}K ${unit}`;
    }
    return `${formatNumber(area.value)} ${unit}`;
  }
  return `${formatNumber(area.value)} ${unit}`;
}

export function formatPercent(value: number): string {
  if (typeof value !== "number" || !isFinite(value)) return UNAVAILABLE;
  return `${Math.round(value)}%`;
}

type CoordPrecision = "deg" | "degmin";

function dmsPart(value: number, isLatitude: boolean): string {
  const dir = isLatitude ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  const abs = Math.abs(value);
  let deg = Math.floor(abs);
  let min = Math.round((abs - deg) * 60);
  if (min === 60) {
    min = 0;
    deg += 1;
  }
  return `${deg}°${String(min).padStart(2, "0")}′${dir}`;
}

function degPart(value: number, isLatitude: boolean): string {
  const dir = isLatitude ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  return `${Math.round(Math.abs(value))}° ${dir}`;
}

export function formatCoordinates(
  coords: GeoCoordinates | undefined,
  precision: CoordPrecision = "degmin"
): string {
  if (!coords) return UNAVAILABLE;
  const { latitude, longitude } = coords;
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !isFinite(latitude) ||
    !isFinite(longitude)
  ) {
    return UNAVAILABLE;
  }
  const lat =
    precision === "deg"
      ? degPart(latitude, true)
      : dmsPart(latitude, true);
  const lng =
    precision === "deg"
      ? degPart(longitude, false)
      : dmsPart(longitude, false);
  return `${lat} ${lng}`;
}

export function formatGdpStat(stat: EconomyStat | undefined): string {
  if (!stat || typeof stat.value !== "number" || !isFinite(stat.value)) {
    return UNAVAILABLE;
  }
  const { value, currency, unit } = stat;
  if (currency === "IDR") {
    if (unit === "trillion") return `IDR ${formatNumber(Math.round(value))}T`;
    if (unit === "million") return `IDR ${stripZeros(value.toFixed(1))}M`;
    return `IDR ${formatNumber(Math.round(value))}`;
  }
  if (currency === "USD") {
    if (value >= 1000) return `$${formatNumber(Math.round(value))}`;
    return `$${value.toFixed(2)}`;
  }
  return `${formatNumber(Math.round(value))} ${currency}`;
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function formatTermDate(value: string): string {
  return isoDatePattern.test(value) ? formatDate(value) : value;
}

export function formatTerm(term: { start: string; end?: string }): string {
  const start = formatTermDate(term.start);
  const end = term.end ? formatTermDate(term.end) : "Present";
  return `${start} — ${end}`;
}

export function formatDate(iso: string | undefined): string {
  if (!iso) return UNAVAILABLE;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  });
}

export function sourceLabel(
  sourced: { source?: { name: string; publication?: string } } | undefined
): string {
  if (!sourced?.source) return "";
  const { name, publication } = sourced.source;
  if (publication) return `${name} · ${publication}`;
  return name;
}
