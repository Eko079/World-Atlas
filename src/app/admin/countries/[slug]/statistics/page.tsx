import { db } from "@/db";
import { countries, countryStatistics } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertStatistic, deleteStatistic } from "@/server/actions/admin/statistic";

interface StatisticsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StatisticsPage({ params }: StatisticsPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const stats = await db.select().from(countryStatistics).where(eq(countryStatistics.countryId, country.id)).orderBy(countryStatistics.displayOrder);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Statistics</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage numeric and text statistics</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-2 text-left font-mono text-[10px] uppercase tracking-[0.15em] text-mist">Category</th>
              <th className="pb-2 text-left font-mono text-[10px] uppercase tracking-[0.15em] text-mist">Key</th>
              <th className="pb-2 text-right font-mono text-[10px] uppercase tracking-[0.15em] text-mist">Value</th>
              <th className="pb-2 text-left font-mono text-[10px] uppercase tracking-[0.15em] text-mist">Unit</th>
              <th className="pb-2 text-left font-mono text-[10px] uppercase tracking-[0.15em] text-mist">Year</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {stats.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center font-mono text-sm text-mist/60">No statistics yet.</td></tr>
            ) : stats.map((s) => (
              <tr key={s.id} className="border-b border-white/5">
                <td className="py-3 font-mono text-xs text-mist">{s.category}</td>
                <td className="py-3 font-mono text-xs text-paper">{s.key}</td>
                <td className="py-3 font-mono text-xs text-paper text-right">{s.numericValue ?? s.textValue ?? "—"}</td>
                <td className="py-3 font-mono text-xs text-mist">{s.unit ?? "—"}</td>
                <td className="py-3 font-mono text-xs text-mist">{s.referenceYear ?? "—"}</td>
                <td className="py-3 flex gap-2">
                  <a href={`/admin/countries/${slug}/statistics/edit/${s.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">Edit</a>
                  <form action={async () => { "use server"; await deleteStatistic(s.id); }}>
                    <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">Del</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <a href={`/admin/countries/${slug}/statistics/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">+ Add Statistic</a>
      </div>
    </div>
  );
}
