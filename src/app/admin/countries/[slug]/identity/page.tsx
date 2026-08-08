import { db } from "@/db";
import { countries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateCountryIdentity } from "@/server/actions/admin/country";
import Link from "next/link";

interface IdentityPageProps {
  params: Promise<{ slug: string }>;
}

export default async function IdentityPage({ params }: IdentityPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, slug)
  });

  if (!country) {
    return (
      <div>
        <h1 className="font-display text-2xl font-semibold uppercase text-paper">Country Not Found</h1>
        <p className="mt-2 font-mono text-sm text-mist">No country found with slug: {slug}</p>
        <Link href="/admin/countries" className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline">
          ← Back to Countries
        </Link>
      </div>
    );
  }

  return (
    <div>
      <a href={`/admin/countries/${slug}`} className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-paper">
        ← {country.name}
      </a>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Identity</h2>
      <p className="mt-1 font-mono text-sm text-mist">Edit country identity information</p>

      <form action={updateCountryIdentity} className="mt-6 space-y-4">
        <input type="hidden" name="slug" value={country.slug} />
        <input type="hidden" name="continent" value={country.continent} />
        <input type="hidden" name="region" value={country.region} />
        <input type="hidden" name="calling_code" value={country.callingCode} />
        <input type="hidden" name="tld" value={country.internetTld} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
              Official Name
            </label>
            <input
              name="official_name"
              defaultValue={country.officialName}
              className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
              Local Name
            </label>
            <input
              name="local_name"
              defaultValue={country.localName}
              className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
              ISO Alpha-2
            </label>
            <input
              defaultValue={country.isoAlpha2}
              disabled
              className="w-full rounded border border-white/10 bg-panel px-3 py-2 font-mono text-sm text-mist cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
              ISO Alpha-3
            </label>
            <input
              defaultValue={country.isoAlpha3}
              disabled
              className="w-full rounded border border-white/10 bg-panel px-3 py-2 font-mono text-sm text-mist cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
            Motto
          </label>
          <input
            name="motto"
            defaultValue={country.motto ?? ""}
            className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
            Anthem
          </label>
          <input
            name="anthem"
            defaultValue={country.anthem ?? ""}
            className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
            Independence
          </label>
          <input
            name="independence"
            defaultValue={country.independence ?? ""}
            className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
            Demonym
          </label>
          <input
            name="demonym"
            defaultValue={country.demonym ?? ""}
            className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
            Subregion
          </label>
          <input
            name="subregion"
            defaultValue={country.subregion ?? ""}
            className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
            Summary
          </label>
          <textarea
            name="summary"
            defaultValue={country.summary ?? ""}
            rows={4}
            className="w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent-deep"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
