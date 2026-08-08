import { db } from "@/db";
import { countries, capitals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertCapital, deleteCapital } from "@/server/actions/admin/capital";

interface CapitalPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CapitalPage({ params }: CapitalPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const capitals_list = await db.select().from(capitals).where(eq(capitals.countryId, country.id)).orderBy(capitals.displayOrder);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Capital</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage capital records</p>

      <div className="mt-6 space-y-3">
        {capitals_list.map((cap) => (
          <div key={cap.id} className="rounded border border-white/10 bg-panel p-4 flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-semibold text-paper">{cap.primaryDisplay}</p>
              <p className="font-mono text-xs text-mist">{cap.status}</p>
              {cap.designatedCapital && <p className="font-mono text-xs text-accent mt-1">→ {cap.designatedCapital}</p>}
            </div>
            <div className="flex gap-2">
              <a href={`/admin/countries/${slug}/capital/edit/${cap.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">
                Edit
              </a>
              <form action={async () => { "use server"; await deleteCapital(cap.id); }}>
                <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <a href={`/admin/countries/${slug}/capital/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">
          + Add Capital
        </a>
      </div>
    </div>
  );
}
