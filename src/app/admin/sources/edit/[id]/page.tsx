import { db } from "@/db";
import { sources } from "@/db/schema";
import { eq } from "drizzle-orm";
import { upsertSource } from "@/server/actions/admin/source";

interface SourceEditPageProps {
  params: Promise<{ id?: string }>;
}

export default async function SourceEditPage({ params }: SourceEditPageProps) {
  const { id } = await params;
  let item = null;
  if (id) item = await db.query.sources.findFirst({ where: eq(sources.id, id) });

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">{item ? "Edit Source" : "Add Source"}</h2>

      <form action={upsertSource} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={item?.id ?? ""} />

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Organization *</label>
          <input name="organization" defaultValue={item?.organization ?? ""} required className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Publication</label>
          <input name="publication" defaultValue={item?.publication ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">URL</label>
          <input name="url" defaultValue={item?.url ?? ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">Accessed At</label>
          <input name="accessed_at" type="date" defaultValue={item?.accessedAt ? item.accessedAt.toISOString().split("T")[0] : ""} className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none" />
        </div>

        <button type="submit" className="rounded bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper hover:bg-accent-deep">Save</button>
        <a href="/admin/sources" className="ml-4 font-mono text-[11px] uppercase tracking-[0.15em] text-mist hover:text-paper">Cancel</a>
      </form>
    </div>
  );
}
