import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: string;
  label: string;
  accent?: boolean;
  className?: string;
}

export default function StatBlock({
  value,
  label,
  accent = false,
  className
}: StatBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-white/10 pt-6",
        className
      )}
    >
      <span
        className={cn(
          "font-display text-4xl font-semibold uppercase leading-none tracking-tight sm:text-6xl",
          accent ? "text-accent" : "text-paper"
        )}
      >
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
        {label}
      </span>
    </div>
  );
}
