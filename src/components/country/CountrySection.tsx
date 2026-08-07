import { cn } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";

interface CountrySectionProps {
  id: string;
  index: string;
  children: React.ReactNode;
  className?: string;
  size?: "full" | "contained";
}

export default function CountrySection({
  id,
  index,
  children,
  className,
  size = "contained"
}: CountrySectionProps) {
  return (
    <section id={id} className={cn("relative border-t border-white/10", className)}>
      <div
        className={cn(
          size === "contained" && "mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28"
        )}
      >
        <Reveal className="mb-12">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.3em] text-accent">
              {index}
            </span>
            <span className="h-px w-10 bg-white/20" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist/50">
              World Atlas — Indonesia
            </span>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
