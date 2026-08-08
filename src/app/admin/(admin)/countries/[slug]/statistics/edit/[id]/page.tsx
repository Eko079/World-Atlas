import { db } from "@/db";
import { countries, countryStatistics } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertStatistic } from "@/server/actions/admin/statistic";

interface StatEditPageProps {
  params: Promise<{ slug: string; id?: string }>;
}

export default async function StatEditPage({ params }: StatEditPageProps) {
  const { slug, id } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  let stat = null;
  if (id) {
    stat = await db.query.countryStatistics.findFirst({ where: eq(countryStatistics.id, id) });
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">{stat ? "Edit Statistic" : "Add Statistic"}</h2>

      <form action={upsertStatistic} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={stat?.id ?? ""} />
        <input type="hidden" name="country_id" value={country.id} />
        <input type="hidden" name="slug" value={slug} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Category *</label>
            <input name="category" defaultValue={stat?.category ?? ""} required placeholder="demographics, geography, economy, languages" className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Key *</label>
            <input name="key" defaultValue={stat?.key ?? ""} required placeholder="population, gdp, area" className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Numeric Value</label>
            <input name="numeric_value" type="number" step="any" defaultValue={stat?.numericValue ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Text Value</label>
            <input name="text_value" defaultValue={stat?.textValue ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Unit</label>
            <input name="unit" defaultValue={stat?.unit ?? ""} placeholder="people, km², USD" className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Reference Year</label>
            <input name="reference_year" type="number" defaultValue={stat?.referenceYear ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Display Order</label>
          <input name="display_order" type="number" defaultValue={stat?.displayOrder ?? 0} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <button type="submit" className="rounded bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper hover:bg-accent-deep">Save</button>
        <a href={`/admin/countries/${slug}/statistics`} className="ml-4 font-mono text-[11px] uppercase tracking-[0.15em] text-mist hover:text-paper">Cancel</a>
      </form>
    </div>
  );
}
