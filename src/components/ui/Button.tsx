import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  href,
  children,
  variant = "outline",
  className,
  onClick
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-3 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-300 focus-visible:outline-none";

  const variants = {
    solid:
      "bg-accent text-paper hover:bg-accent-deep hover:tracking-[0.32em]",
    outline:
      "border border-white/15 text-paper hover:border-accent hover:text-accent",
    ghost: "text-mist hover:text-paper"
  };

  const content = (
    <>
      {children}
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  );

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
