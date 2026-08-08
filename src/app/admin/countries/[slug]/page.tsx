import { db } from "@/db";
import { countries } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

interface CountryAdminPageProps {
  params: Promise<{ slug: string }>;
}

const sections = [
  { href: "identity", label: "Identity", desc: "Official name, motto, anthem, summary" },
  { href: "capital", label: "Capital", desc: "Capital cities and status" },
  { href: "leadership", label: "Leadership", desc: "Current and historical leaders" },
  { href: "statistics", label: "Statistics", desc: "Population, area, economy data" },
  { href: "languages", label: "Languages", desc: "Spoken languages and scripts" },
  { href: "landmarks", label: "Landmarks", desc: "Famous landmarks and attractions" },
  { href: "foods", label: "Foods", desc: "Traditional cuisine and dishes" },
  { href: "culture", label: "Culture", desc: "Customs, traditions, and arts" },
  { href: "timeline", label: "Timeline", desc: "Historical events and milestones" },
  { href: "sources", label: "Sources", desc: "References and citations" },
  { href: "media", label: "Media", desc: "Images and media assets" },
];

export default async function CountryAdminPage({ params }: CountryAdminPageProps) {
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
          Back to Countries
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-paper sm:text-4xl">
            {country.name}
          </h1>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Admin Control · {country.slug}
          </p>
        </div>
        <a
          href={`/country/${country.slug}`}
          className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60 hover:text-accent"
        >
          View Public Page
        </a>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={`/admin/countries/${slug}/${section.href}`}
            className="rounded border border-white/10 bg-panel p-5 transition-colors hover:border-accent/40"
          >
            <p className="font-display text-base font-semibold text-paper uppercase">{section.label}</p>
            <p className="mt-1 font-mono text-xs text-mist/70">{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
