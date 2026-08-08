import { db } from "@/db";
import { countries, languages as languagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertLanguage } from "@/server/actions/admin/language";

interface LanguageEditPageProps {
  params: Promise<{ slug: string; id?: string }>;
}

export default async function LanguageEditPage({ params }: LanguageEditPageProps) {
  const { slug, id } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  let lang = null;
  if (id) {
    lang = await db.query.languages.findFirst({ where: eq(languagesTable.id, id) });
  }

  return (
    <div>
      <a href={`/admin/countries/${slug}/languages`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← Languages
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">{lang ? "Edit Language" : "Add Language"}</h2>

      <form action={upsertLanguage} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={lang?.id ?? ""} />
        <input type="hidden" name="country_id" value={country.id} />
        <input type="hidden" name="slug" value={slug} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Name *</label>
            <input name="name" defaultValue={lang?.name ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Type *</label>
            <select name="type" defaultValue={lang?.type ?? "regional"} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none">
              <option value="official">Official</option>
              <option value="regional">Regional</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Display Order</label>
          <input name="display_order" type="number" defaultValue={lang?.displayOrder ?? 0} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <button type="submit" className="rounded bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper hover:bg-accent-deep">Save</button>
        <a href={`/admin/countries/${slug}/languages`} className="ml-4 font-mono text-[11px] uppercase tracking-[0.15em] text-mist hover:text-paper">Cancel</a>
      </form>
    </div>
  );
}
