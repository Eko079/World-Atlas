import { db } from "@/db";
import { countries, cultureItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertCulture, deleteCulture } from "@/server/actions/admin/culture";

interface CulturePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CulturePage({ params }: CulturePageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const items = await db.select().from(cultureItems).where(eq(cultureItems.countryId, country.id)).orderBy(cultureItems.displayOrder);

  return (
    <div>
      <a href={`/admin/countries/${slug}`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← {country.name}
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Culture</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage cultural entries</p>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? <p className="font-mono text-sm text-mist/60">No culture items yet.</p> : items.map((c) => (
          <div key={c.id} className="rounded border border-white/10 bg-panel p-4 flex items-center justify-between">
            <div>
              <p className="font-display text-base font-semibold text-paper">{c.title}</p>
              <p className="font-mono text-xs text-mist">{c.category}</p>
            </div>
            <div className="flex gap-2">
              <a href={`/admin/countries/${slug}/culture/edit/${c.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">Edit</a>
              <form action={async () => { "use server"; await deleteCulture(c.id); }}>
                <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6"><a href={`/admin/countries/${slug}/culture/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">+ Add Culture</a></div>
    </div>
  );
}
