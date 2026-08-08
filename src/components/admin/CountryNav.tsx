import Link from "next/link";

const navItems = [
  { href: "identity", label: "Identity" },
  { href: "capital", label: "Capital" },
  { href: "leadership", label: "Leadership" },
  { href: "statistics", label: "Statistics" },
  { href: "languages", label: "Languages" },
  { href: "landmarks", label: "Landmarks" },
  { href: "foods", label: "Foods" },
  { href: "culture", label: "Culture" },
  { href: "timeline", label: "Timeline" },
  { href: "sources", label: "Sources" },
  { href: "media", label: "Media" }
];

export default function CountryNav({ slug }: { slug: string }) {
  return (
    <nav className="mt-6 overflow-x-auto" aria-label="Country sections">
      <div className="flex gap-1 min-w-max">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={`/admin/countries/${slug}/${item.href}`}
            className="rounded border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mist transition-colors hover:border-accent/40 hover:text-accent"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
