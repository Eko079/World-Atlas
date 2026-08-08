import { db } from "@/db";
import { countries, landmarks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertLandmark, deleteLandmark } from "@/server/actions/admin/landmark";

interface LandmarksPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LandmarksPage({ params }: LandmarksPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const items = await db.select().from(landmarks).where(eq(landmarks.countryId, country.id)).orderBy(landmarks.displayOrder);

  return (
    <div>
      <a href={`/admin/countries/${slug}`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← {country.name}
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Landmarks</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage landmark entries</p>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <p className="font-mono text-sm text-mist/60">No landmarks yet.</p>
        ) : items.map((lm) => (
          <div key={lm.id} className="rounded border border-white/10 bg-panel p-4 flex items-center justify-between">
            <div>
              <p className="font-display text-base font-semibold text-paper">{lm.name}</p>
              <p className="font-mono text-xs text-mist">{lm.location}</p>
            </div>
            <div className="flex gap-2">
              <a href={`/admin/countries/${slug}/landmarks/edit/${lm.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">Edit</a>
              <form action={async () => { "use server"; await deleteLandmark(lm.id); }}>
                <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <a href={`/admin/countries/${slug}/landmarks/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">+ Add Landmark</a>
      </div>
    </div>
  );
}
