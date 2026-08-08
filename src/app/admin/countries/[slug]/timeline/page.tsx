import { db } from "@/db";
import { countries, timelineEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertTimeline, deleteTimeline } from "@/server/actions/admin/timeline";

interface TimelinePageProps {
  params: Promise<{ slug: string }>;
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const items = await db.select().from(timelineEvents).where(eq(timelineEvents.countryId, country.id)).orderBy(timelineEvents.sortYear);

  return (
    <div>
      <a href={`/admin/countries/${slug}`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← {country.name}
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Timeline</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage historical events</p>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? <p className="font-mono text-sm text-mist/60">No timeline events yet.</p> : items.map((t) => (
          <div key={t.id} className="rounded border border-white/10 bg-panel p-4 flex items-center justify-between">
            <div>
              <p className="font-display text-base font-semibold text-paper">{t.title}</p>
              <p className="font-mono text-xs text-accent">{t.yearLabel}</p>
            </div>
            <div className="flex gap-2">
              <a href={`/admin/countries/${slug}/timeline/edit/${t.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">Edit</a>
              <form action={async () => { "use server"; await deleteTimeline(t.id); }}>
                <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6"><a href={`/admin/countries/${slug}/timeline/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">+ Add Event</a></div>
    </div>
  );
}
