import { cn } from "@/lib/utils";

interface CountryFlagProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CountryFlag({
  src,
  alt,
  className
}: CountryFlagProps) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden border border-white/15",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
