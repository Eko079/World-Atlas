import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-accent" />
              <span className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-paper">
                World Atlas
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              A cinematic archive of the world&apos;s nations — one country at a
              time.
            </p>
          </div>

          <div className="md:justify-self-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
              Next Nation
            </p>
            <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-tight text-paper/60">
              Coming Soon
            </p>
          </div>

          <div className="md:justify-self-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
              Current Feature
            </p>
            <Link
              href="/country/indonesia"
              className="group mt-3 inline-flex items-center gap-4"
            >
              <span className="font-display text-2xl font-semibold uppercase tracking-tight text-paper transition-colors group-hover:text-accent">
                001 / Indonesia
              </span>
              <span className="h-px w-8 bg-accent" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/50">
            © {new Date().getFullYear()} World Atlas — PLAN-01
          </p>
          <Link
            href="/explore"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mist transition-colors hover:text-accent"
          >
            Explore the world
            <span className="h-px w-6 bg-accent transition-all duration-300 group-hover:w-10" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
