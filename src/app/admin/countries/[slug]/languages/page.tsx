import { db } from "@/db";
import { countries, languages as languagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertLanguage, deleteLanguage } from "@/server/actions/admin/language";

interface LanguagesPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LanguagesPage({ params }: LanguagesPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const langs = await db.select().from(languagesTable).where(eq(languagesTable.countryId, country.id)).orderBy(languagesTable.displayOrder);

  return (
    <div>
      <a href={`/admin/countries/${slug}`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← {country.name}
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Languages</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage languages spoken in the country</p>

      <div className="mt-6 space-y-2">
        {langs.length === 0 ? (
          <p className="font-mono text-sm text-mist/60">No languages recorded.</p>
        ) : (
          langs.map((l) => (
            <div key={l.id} className="rounded border border-white/10 bg-panel p-4 flex items-center justify-between">
              <div>
                <p className="font-display text-base font-semibold text-paper">{l.name}</p>
                <p className="font-mono text-xs text-mist">{l.type}</p>
              </div>
              <div className="flex gap-2">
                <a href={`/admin/countries/${slug}/languages/edit/${l.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">Edit</a>
                <form action={async () => { "use server"; await deleteLanguage(l.id); }}>
                  <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">Delete</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <a href={`/admin/countries/${slug}/languages/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">+ Add Language</a>
      </div>
    </div>
  );
}
