import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Chip({ children, className, disabled = false }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]",
        disabled
          ? "border-white/5 text-mist/50"
          : "border-white/15 text-paper",
        className
      )}
    >
      {!disabled && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
      {children}
    </span>
  );
}
