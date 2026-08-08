import { db } from "@/db";
import { sources } from "@/db/schema";
import { upsertSource, deleteSource } from "@/server/actions/admin/source";

export default async function SourcesPage() {
  const items = await db.select().from(sources).orderBy(sources.organization);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Sources</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage data sources</p>

      <div className="mt-6 space-y-2">
        {items.length === 0 ? <p className="font-mono text-sm text-mist/60">No sources yet.</p> : items.map((s) => (
          <div key={s.id} className="rounded border border-white/10 bg-panel p-4 flex items-center justify-between">
            <div>
              <p className="font-display text-base font-semibold text-paper">{s.organization}</p>
              {s.publication && <p className="font-mono text-xs text-mist">{s.publication}</p>}
              {s.url && <p className="font-mono text-xs text-accent">{s.url}</p>}
            </div>
            <div className="flex gap-2">
              <a href={`/admin/sources/edit/${s.id}`} className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent hover:underline">Edit</a>
              <form action={async () => { "use server"; await deleteSource(s.id); }}>
                <button type="submit" className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300">Del</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <a href={`/admin/sources/edit`} className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">+ Add Source</a>
      </div>
    </div>
  );
}
