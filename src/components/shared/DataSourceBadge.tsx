import type { DataSource, SourcedValue } from "@/types/country";

interface DataSourceBadgeProps {
  sourced?: SourcedValue<unknown> | { source?: DataSource; referenceYear?: number };
  label?: string;
  className?: string;
}

function resolveSource(
  value: DataSourceBadgeProps["sourced"]
): { source?: DataSource; year?: number } {
  const source = value?.source;
  const year = value?.referenceYear ?? extractYear(source?.publishedAt);
  return { source, year };
}

function extractYear(date: string | undefined): number | undefined {
  if (!date) return undefined;
  const match = /^(\d{4})/.exec(date);
  return match ? Number(match[1]) : undefined;
}

export default function DataSourceBadge({
  sourced,
  label = "Source",
  className
}: DataSourceBadgeProps) {
  const { source, year } = resolveSource(sourced);
  if (!source?.name) return null;

  const text = year ? `${source.name} · ${year}` : source.name;
  const cls =
    className ??
    "inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-mist/60";

  if (source.url) {
    return (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} underline decoration-white/20 underline-offset-4 transition-colors hover:text-paper hover:decoration-accent`}
        aria-label={`${label}: ${text}`}
      >
        <span aria-hidden="true">◆</span>
        {text}
      </a>
    );
  }

  return (
    <span className={cls} aria-label={`${label}: ${text}`}>
      <span aria-hidden="true">◆</span>
      {text}
    </span>
  );
}
