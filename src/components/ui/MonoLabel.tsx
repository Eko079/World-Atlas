import { cn } from "@/lib/utils";

interface MonoLabelProps {
  children: React.ReactNode;
  className?: string;
  tone?: "mist" | "paper" | "accent";
}

export default function MonoLabel({
  children,
  className,
  tone = "mist"
}: MonoLabelProps) {
  const tones = {
    mist: "text-mist",
    paper: "text-paper",
    accent: "text-accent"
  };
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
