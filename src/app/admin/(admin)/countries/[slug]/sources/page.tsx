import { db } from "@/db";
import { countries } from "@/db/schema";
import { eq } from "drizzle-orm";

interface SourcesPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CountrySourcesPage({ params }: SourcesPageProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({ where: eq(countries.slug, slug) });
  if (!country) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold uppercase text-paper">Sources</h2>
      <p className="mt-1 font-mono text-sm text-mist">Manage data sources for this country</p>
      <p className="mt-4 font-mono text-sm text-mist/60">Sources are managed globally at <a href="/admin/sources" className="text-accent hover:underline">/admin/sources</a>.</p>
    </div>
  );
}
