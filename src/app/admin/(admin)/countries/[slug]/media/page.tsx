import { db } from "@/db";
import { countries, mediaAssets, galleryImages } from "@/db/schema";
import { eq } from "drizzle-orm";

interface MediaPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const media = await db.select().from(mediaAssets).where(eq(mediaAssets.countryId, country.id));
  const gallery = await db.select().from(galleryImages).where(eq(galleryImages.countryId, country.id)).orderBy(galleryImages.displayOrder);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Media</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage media assets and gallery</p>

      <div className="mt-6">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist mb-3">Flag & Hero</h3>
        <div className="space-y-2">
          {media.map((m) => (
            <div key={m.id} className="rounded border border-white/10 bg-panel p-3 flex items-center justify-between">
              <div>
                <p className="font-mono text-sm text-paper capitalize">{m.category}</p>
                <p className="font-mono text-xs text-mist">{m.path}</p>
              </div>
              <span className="font-mono text-[10px] text-mist/50">{m.alt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist mb-3">Gallery ({gallery.length})</h3>
        <div className="space-y-2">
          {gallery.map((g) => (
            <div key={g.id} className="rounded border border-white/10 bg-panel p-3 flex items-center justify-between">
              <div>
                <p className="font-mono text-sm text-paper">{g.alt}</p>
                <p className="font-mono text-xs text-mist">{g.src}</p>
              </div>
              <span className="font-mono text-[10px] text-mist/50">{g.category ?? "—"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
