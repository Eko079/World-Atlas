import { db } from "@/db";
import { countries, capitals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertCapital } from "@/server/actions/admin/capital";

interface CapitalEditPageProps {
  params: Promise<{ slug: string; id?: string }>;
}

export default async function CapitalEditPage({ params }: CapitalEditPageProps) {
  const { slug, id } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  let cap = null;
  if (id) {
    cap = await db.query.capitals.findFirst({ where: eq(capitals.id, id) });
  }

  return (
    <div>
      <a href={`/admin/countries/${slug}/capital`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← Capitals
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">
        {cap ? "Edit Capital" : "Add Capital"}
      </h2>

      <form action={upsertCapital} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={cap?.id ?? ""} />
        <input type="hidden" name="country_id" value={country.id} />
        <input type="hidden" name="slug" value={slug} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Primary Display</label>
            <input name="primary_display" defaultValue={cap?.primaryDisplay ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Status</label>
            <input name="status" defaultValue={cap?.status ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Latitude</label>
            <input name="latitude" type="number" step="0.0001" defaultValue={cap?.latitude ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Longitude</label>
            <input name="longitude" type="number" step="0.0001" defaultValue={cap?.longitude ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Description</label>
          <textarea name="description" rows={3} defaultValue={cap?.description ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Image Path</label>
          <input name="image_path" defaultValue={cap?.imagePath ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Display Order</label>
          <input name="display_order" type="number" defaultValue={cap?.displayOrder ?? 0} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <button type="submit" className="rounded bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper hover:bg-accent-deep">
          Save
        </button>
        <a href={`/admin/countries/${slug}/capital`} className="ml-4 font-mono text-[11px] uppercase tracking-[0.15em] text-mist hover:text-paper">
          Cancel
        </a>
      </form>
    </div>
  );
}
