import { cn } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";

interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  accent?: boolean;
  className?: string;
  align?: "left" | "right";
}

export default function SectionHeader({
  index,
  title,
  subtitle,
  accent,
  className,
  align = "left"
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "right" && "items-end text-right",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "right" && "flex-row-reverse"
        )}
      >
        <span className="font-mono text-[11px] tracking-[0.3em] text-accent">
          {index}
        </span>
        <span className="h-px w-10 bg-white/20" />
      </div>
      <h2 className="font-display text-3xl font-semibold uppercase leading-none tracking-tight text-paper sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.25em] text-mist">
          {subtitle}
        </p>
      ) : null}
      {accent ? (
        <span className="mt-1 h-1 w-16 bg-accent" aria-hidden="true" />
      ) : null}
    </Reveal>
  );
}
