import { db } from "@/db";
import { countries, leaders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertLeader } from "@/server/actions/admin/leader";

interface LeadershipEditPageProps {
  params: Promise<{ slug: string; id?: string }>;
}

export default async function LeadershipEditPage({ params }: LeadershipEditPageProps) {
  const { slug, id } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  let leader = null;
  if (id) {
    leader = await db.query.leaders.findFirst({ where: eq(leaders.id, id) });
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">{leader ? "Edit Leader" : "Add Leader"}</h2>

      <form action={upsertLeader} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={leader?.id ?? ""} />
        <input type="hidden" name="country_id" value={country.id} />
        <input type="hidden" name="slug" value={slug} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Name *</label>
            <input name="name" defaultValue={leader?.name ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Position *</label>
            <input name="position" defaultValue={leader?.position ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Roles (comma-separated)</label>
          <input name="roles" defaultValue={leader?.roles?.join(", ") ?? ""} placeholder="Head of State, Head of Government" className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Term Start *</label>
            <input name="term_start" type="date" defaultValue={leader?.termStart ? leader.termStart.toISOString().split("T")[0] : ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Term End</label>
            <input name="term_end" type="date" defaultValue={leader?.termEnd ? leader.termEnd.toISOString().split("T")[0] : ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Image Path</label>
          <input name="image_path" defaultValue={leader?.imagePath ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Display Order</label>
          <input name="display_order" type="number" defaultValue={leader?.displayOrder ?? 0} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <button type="submit" className="rounded bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper hover:bg-accent-deep">Save</button>
        <a href={`/admin/countries/${slug}/leadership`} className="ml-4 font-mono text-[11px] uppercase tracking-[0.15em] text-mist hover:text-paper">Cancel</a>
      </form>
    </div>
  );
}
