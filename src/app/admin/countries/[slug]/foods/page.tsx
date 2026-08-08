import { db } from "@/db";
import { countries, foods } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertFood, deleteFood } from "@/server/actions/admin/food";

interface FoodsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FoodsPage({ params }: FoodsPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  const items = await db.select().from(foods).where(eq(foods.countryId, country.id)).orderBy(foods.displayOrder);

  return (
    <div>
      <a href={`/admin/countries/${slug}`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← {country.name}
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Foods</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage culinary entries</p>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? <p className="font-mono text-sm text-mist/60">No foods yet.</p> : items.map((f) => (
          <div key={f.id} className="rounded border border-white/10 bg-panel p-4 flex items-center justify-between">
            <div>
              <p className="font-display text-base font-semibold text-paper">{f.name}</p>
              <p className="font-mono text-xs text-mist">{f.region}</p>
            </div>
            <div className="flex gap-2">
              <a href={`/admin/countries/${slug}/foods/edit/${f.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">Edit</a>
              <form action={async () => { "use server"; await deleteFood(f.id); }}>
                <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6"><a href={`/admin/countries/${slug}/foods/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">+ Add Food</a></div>
    </div>
  );
}
