import { Metadata } from "next";
import { db } from "@/db";
import { countries, leaders, landmarks, foods, cultureItems, timelineEvents, languages as languagesTable, countryStatistics, sources } from "@/db/schema";
import AdminCard from "@/components/admin/AdminCard";
import AdminStat from "@/components/admin/AdminStat";

export const metadata: Metadata = {
  title: "Dashboard — World Atlas Admin",
  robots: { index: false, follow: false }
};

export default async function DashboardPage() {
  const [countryCount, leaderCount, landmarkCount, foodCount, cultureCount, timelineCount, languageCount, sourceCount] = await Promise.all([
    db.select({ count: countries.id }).from(countries).then((r) => r.length),
    db.select({ count: leaders.id }).from(leaders).then((r) => r.length),
    db.select({ count: landmarks.id }).from(landmarks).then((r) => r.length),
    db.select({ count: foods.id }).from(foods).then((r) => r.length),
    db.select({ count: cultureItems.id }).from(cultureItems).then((r) => r.length),
    db.select({ count: timelineEvents.id }).from(timelineEvents).then((r) => r.length),
    db.select({ count: languagesTable.id }).from(languagesTable).then((r) => r.length),
    db.select({ count: sources.id }).from(sources).then((r) => r.length)
  ]);

  const countriesList = await db.select({ id: countries.id, slug: countries.slug, name: countries.name, updatedAt: countries.updatedAt }).from(countries);
  const latestCountry = countriesList[0];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-paper sm:text-4xl">
        Dashboard
      </h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        Admin Control Center
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AdminStat label="Countries" value={countryCount} />
        <AdminStat label="Leaders" value={leaderCount} />
        <AdminStat label="Landmarks" value={landmarkCount} />
        <AdminStat label="Foods" value={foodCount} />
        <AdminStat label="Culture" value={cultureCount} />
        <AdminStat label="Timeline" value={timelineCount} />
        <AdminStat label="Languages" value={languageCount} />
        <AdminStat label="Sources" value={sourceCount} />
      </div>

      {latestCountry && (
        <div className="mt-8">
          <AdminCard
            title="Latest Country"
            body={
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg font-semibold text-paper">{latestCountry.name}</p>
                  <p className="font-mono text-xs text-mist">Slug: {latestCountry.slug}</p>
                </div>
                <a
                  href={`/admin/countries/${latestCountry.slug}`}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent hover:underline"
                >
                  Manage
                </a>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
