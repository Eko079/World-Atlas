import { db } from "@/db";
import { countries } from "@/db/schema";
import Link from "next/link";

export default async function CountriesPage() {
  const rows = await db.select().from(countries).orderBy(countries.displayOrder);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-paper sm:text-4xl">
        Countries
      </h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        {rows.length} country{rows.length !== 1 ? "s" : ""} in archive
      </p>

      <div className="mt-6 space-y-2">
        {rows.map((c) => (
          <Link
            key={c.id}
            href={`/admin/countries/${c.slug}`}
            className="flex items-center justify-between rounded border border-white/10 bg-panel px-5 py-4 transition-colors hover:border-accent/40"
          >
            <div>
              <p className="font-display text-lg font-semibold text-paper">{c.name}</p>
              <p className="font-mono text-xs text-mist">{c.slug} · {c.isoAlpha2}</p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60">
              Manage
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
