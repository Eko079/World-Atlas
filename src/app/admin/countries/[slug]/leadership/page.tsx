import { db } from "@/db";
import { countries, leaders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertLeader, deleteLeader } from "@/server/actions/admin/leader";

interface LeadershipPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LeadershipPage({ params }: LeadershipPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const leaders_list = await db.select().from(leaders).where(eq(leaders.countryId, country.id)).orderBy(leaders.displayOrder);

  return (
    <div>
      <a href={`/admin/countries/${slug}`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← {country.name}
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Leadership</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage national leadership records</p>

      <div className="mt-6 space-y-3">
        {leaders_list.length === 0 ? (
          <p className="font-mono text-sm text-mist/60">No leaders yet.</p>
        ) : (
          leaders_list.map((l) => (
            <div key={l.id} className="rounded border border-white/10 bg-panel p-4 flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-semibold text-paper">{l.name}</p>
                <p className="font-mono text-xs text-mist">{l.position}</p>
                <p className="font-mono text-xs text-mist/60">
                  {l.termStart.toISOString().split("T")[0]} — {l.termEnd ? l.termEnd.toISOString().split("T")[0] : "Present"}
                  {l.isCurrent && <span className="text-accent"> · Current</span>}
                </p>
              </div>
              <div className="flex gap-2">
                <a href={`/admin/countries/${slug}/leadership/edit/${l.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">Edit</a>
                <form action={async () => { "use server"; await deleteLeader(l.id); }}>
                  <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">Delete</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <a href={`/admin/countries/${slug}/leadership/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">+ Add Leader</a>
      </div>
    </div>
  );
}
