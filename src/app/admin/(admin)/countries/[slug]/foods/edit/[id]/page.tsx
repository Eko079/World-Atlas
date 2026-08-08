import { db } from "@/db";
import { countries, foods } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertFood } from "@/server/actions/admin/food";

interface FoodEditPageProps {
  params: Promise<{ slug: string; id?: string }>;
}

export default async function FoodEditPage({ params }: FoodEditPageProps) {
  const { slug, id } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  let item = null;
  if (id) item = await db.query.foods.findFirst({ where: eq(foods.id, id) });

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">{item ? "Edit Food" : "Add Food"}</h2>

      <form action={upsertFood} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={item?.id ?? ""} />
        <input type="hidden" name="country_id" value={country.id} />
        <input type="hidden" name="slug" value={slug} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Slug *</label><input name="slug" defaultValue={item?.slug ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" /></div>
          <div><label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Name *</label><input name="name" defaultValue={item?.name ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" /></div>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Region *</label>
          <input name="region" defaultValue={item?.region ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Description *</label>
          <textarea name="description" rows={3} defaultValue={item?.description ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Image Path</label>
          <input name="image_path" defaultValue={item?.imagePath ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Display Order</label>
          <input name="display_order" type="number" defaultValue={item?.displayOrder ?? 0} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <button type="submit" className="rounded bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper hover:bg-accent-deep">Save</button>
        <a href={`/admin/countries/${slug}/foods`} className="ml-4 font-mono text-[11px] uppercase tracking-[0.15em] text-mist hover:text-paper">Cancel</a>
      </form>
    </div>
  );
}
