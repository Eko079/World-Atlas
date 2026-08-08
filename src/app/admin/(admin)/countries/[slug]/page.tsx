import { db } from "@/db";
import { countries, leaders, capitals, countryStatistics, languages as languagesTable, landmarks, foods, cultureItems, timelineEvents, mediaAssets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminCard from "@/components/admin/AdminCard";
import AdminStat from "@/components/admin/AdminStat";
import CountryNav from "@/components/admin/CountryNav";

interface CountryAdminProps {
  params: Promise<{ slug: string }>;
}

export default async function CountryAdminPage({ params }: CountryAdminProps) {
  const { slug } = await params;
  const country = await db.query.countries.findFirst({
    where: eq(countries.slug, slug)
  });

  if (!country) {
    redirect("/admin/countries");
  }

  const [leaderCount, capitalCount, statCount, langCount, landmarkCount, foodCount, cultureCount, timelineCount, mediaCount] = await Promise.all([
    db.select({ count: leaders.id }).from(leaders).where(eq(leaders.countryId, country.id)).then((r) => r.length),
    db.select({ count: capitals.id }).from(capitals).where(eq(capitals.countryId, country.id)).then((r) => r.length),
    db.select({ count: countryStatistics.id }).from(countryStatistics).where(eq(countryStatistics.countryId, country.id)).then((r) => r.length),
    db.select({ count: languagesTable.id }).from(languagesTable).where(eq(languagesTable.countryId, country.id)).then((r) => r.length),
    db.select({ count: landmarks.id }).from(landmarks).where(eq(landmarks.countryId, country.id)).then((r) => r.length),
    db.select({ count: foods.id }).from(foods).where(eq(foods.countryId, country.id)).then((r) => r.length),
    db.select({ count: cultureItems.id }).from(cultureItems).where(eq(cultureItems.countryId, country.id)).then((r) => r.length),
    db.select({ count: timelineEvents.id }).from(timelineEvents).where(eq(timelineEvents.countryId, country.id)).then((r) => r.length),
    db.select({ count: mediaAssets.id }).from(mediaAssets).where(eq(mediaAssets.countryId, country.id)).then((r) => r.length)
  ]);

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">{country.isoAlpha2} · {country.isoAlpha3}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight text-paper sm:text-4xl">
            {country.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-mist">{country.officialName}</p>
        </div>
        <a
          href={`/country/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline"
        >
          View Public Page ↗
        </a>
      </div>

      <CountryNav slug={slug} />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <AdminStat label="Leaders" value={leaderCount} />
        <AdminStat label="Capitals" value={capitalCount} />
        <AdminStat label="Statistics" value={statCount} />
        <AdminStat label="Languages" value={langCount} />
        <AdminStat label="Landmarks" value={landmarkCount} />
        <AdminStat label="Foods" value={foodCount} />
        <AdminStat label="Culture" value={cultureCount} />
        <AdminStat label="Timeline" value={timelineCount} />
        <AdminStat label="Media" value={mediaCount} />
      </div>

      <AdminCard
        title="Country Info"
        body={
          <div className="grid grid-cols-2 gap-4 font-mono text-sm">
            <div>
              <p className="text-mist">Continent</p>
              <p className="text-paper">{country.continent}</p>
            </div>
            <div>
              <p className="text-mist">Region</p>
              <p className="text-paper">{country.region}</p>
            </div>
            <div>
              <p className="text-mist">Calling Code</p>
              <p className="text-paper">{country.callingCode}</p>
            </div>
            <div>
              <p className="text-mist">TLD</p>
              <p className="text-paper">{country.internetTld}</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
