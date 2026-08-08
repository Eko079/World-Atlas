import "server-only";

import { eq, asc } from "drizzle-orm";
import { db } from "@/db";
import {
  countries,
  capitals,
  leaders,
  countryStatistics,
  languages as languagesTable,
  landmarks,
  foods,
  cultureItems,
  timelineEvents,
  mediaAssets,
  galleryImages,
  sources
} from "@/db/schema";
import type { Country } from "@/types/country";
import type { DataSource, Leader } from "@/types/country";
import { indonesiaAssetManifest } from "@/data/countries/indonesia-assets";

type StatRow = typeof countryStatistics.$inferSelect;
type CapRow = typeof capitals.$inferSelect;
type LeaderRow = typeof leaders.$inferSelect;
type LangRow = typeof languagesTable.$inferSelect;
type MediaRow = typeof mediaAssets.$inferSelect;
type GalleryRow = typeof galleryImages.$inferSelect;

function getStat(rows: StatRow[], category: string, key: string): StatRow | undefined {
  return rows.find((s) => s.category === category && s.key === key);
}

function makeSourced(stat: StatRow | undefined) {
  if (!stat || stat.numericValue === null) return undefined;
  return {
    value: stat.numericValue,
    unit: stat.unit ?? undefined,
    referenceYear: stat.referenceYear ?? undefined,
    source: undefined,
    lastVerifiedAt: undefined,
    freshness: "static" as const
  };
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const countryRow = await db.query.countries.findFirst({
    where: eq(countries.slug, slug)
  });

  if (!countryRow) return null;

  const [capRows, leaderRows, statRows, langRows, landmarkRows, foodRows, cultureRows, timelineRows, mediaRows, galleryRows] = await Promise.all([
    db.select().from(capitals).where(eq(capitals.countryId, countryRow.id)).orderBy(asc(capitals.displayOrder)).limit(10),
    db.select().from(leaders).where(eq(leaders.countryId, countryRow.id)).orderBy(asc(leaders.displayOrder)).limit(10),
    db.select().from(countryStatistics).where(eq(countryStatistics.countryId, countryRow.id)).orderBy(asc(countryStatistics.displayOrder)).limit(100),
    db.select().from(languagesTable).where(eq(languagesTable.countryId, countryRow.id)).orderBy(asc(languagesTable.displayOrder)).limit(50),
    db.select().from(landmarks).where(eq(landmarks.countryId, countryRow.id)).orderBy(asc(landmarks.displayOrder)).limit(50),
    db.select().from(foods).where(eq(foods.countryId, countryRow.id)).orderBy(asc(foods.displayOrder)).limit(50),
    db.select().from(cultureItems).where(eq(cultureItems.countryId, countryRow.id)).orderBy(asc(cultureItems.displayOrder)).limit(50),
    db.select().from(timelineEvents).where(eq(timelineEvents.countryId, countryRow.id)).orderBy(asc(timelineEvents.displayOrder)).limit(50),
    db.select().from(mediaAssets).where(eq(mediaAssets.countryId, countryRow.id)).orderBy(asc(mediaAssets.displayOrder)).limit(100),
    db.select().from(galleryImages).where(eq(galleryImages.countryId, countryRow.id)).orderBy(asc(galleryImages.displayOrder)).limit(50)
  ]);

  const cap = (capRows as CapRow[])[0];
  const officialLangs = (langRows as LangRow[]).filter((l) => l.type === "official");
  const regionalLangs = (langRows as LangRow[]).filter((l) => l.type === "regional");
  const flagAsset = (mediaRows as MediaRow[]).find((m) => m.category === "flag");
  const heroAsset = (mediaRows as MediaRow[]).find((m) => m.category === "hero");

  const popTotal = getStat(statRows as StatRow[], "demographics", "population");
  const popDensity = getStat(statRows as StatRow[], "demographics", "density");
  const urbanPct = getStat(statRows as StatRow[], "demographics", "urban_percentage");
  const areaStat = getStat(statRows as StatRow[], "geography", "area");
  const waterAreaStat = getStat(statRows as StatRow[], "geography", "water_area");
  const islandCountStat = getStat(statRows as StatRow[], "geography", "island_count");
  const provincesStat = getStat(statRows as StatRow[], "geography", "provinces");
  const livingCountStat = getStat(statRows as StatRow[], "languages", "living_count");
  const gdpStat = getStat(statRows as StatRow[], "economy", "gdp");
  const gdpPerCapitaStat = getStat(statRows as StatRow[], "economy", "gdp_per_capita");
  const gdpPerCapitaUsdStat = getStat(statRows as StatRow[], "economy", "gdp_per_capita_usd");

  const leadersMapped: Leader[] = (leaderRows as LeaderRow[]).map((l) => ({
    id: l.slug,
    name: l.name,
    position: l.position,
    constitutionalRoles: l.roles ?? undefined,
    term: {
      start: l.termStart.toISOString().split("T")[0],
      end: l.termEnd ? l.termEnd.toISOString().split("T")[0] : undefined
    },
    image: l.imagePath ?? undefined
  }));

  return {
    schemaVersion: "1.1",
    id: countryRow.slug,
    slug: countryRow.slug,
    index: countryRow.displayOrder,
    name: countryRow.name,
    codes: {
      alpha2: countryRow.isoAlpha2,
      alpha3: countryRow.isoAlpha3,
      numeric: countryRow.isoNumeric ?? undefined,
      callingCode: countryRow.callingCode,
      internetTld: countryRow.internetTld
    },
    identity: {
      officialName: countryRow.officialName,
      localName: countryRow.localName,
      motto: countryRow.motto ?? undefined,
      anthem: countryRow.anthem ?? undefined,
      independence: countryRow.independence ?? undefined,
      demonym: countryRow.demonym ?? undefined
    },
    geography: {
      continent: countryRow.continent,
      region: countryRow.region,
      subregion: countryRow.subregion ?? undefined,
      area: makeSourced(areaStat)!,
      waterArea: makeSourced(waterAreaStat),
      islandCount: makeSourced(islandCountStat)!,
      provinces: makeSourced(provincesStat),
      timeZones: countryRow.timeZones ?? undefined,
      representativeCoordinates: countryRow.representativeLatitude != null && countryRow.representativeLongitude != null
        ? {
            latitude: countryRow.representativeLatitude,
            longitude: countryRow.representativeLongitude,
            label: countryRow.representativeLabel ?? undefined
          }
        : undefined,
      highestPoint: countryRow.highestPoint ?? undefined,
      longestRiver: countryRow.longestRiver ?? undefined,
      neighbors: countryRow.neighbors ?? undefined,
      seas: countryRow.seas ?? undefined
    },
    population: {
      total: makeSourced(popTotal)!,
      density: makeSourced(popDensity),
      urbanPercentage: makeSourced(urbanPct),
      ethnicGroups: countryRow.ethnicGroups ?? undefined
    },
    government: {
      form: "Unitary presidential republic",
      leadership: leadersMapped
    },
    capital: {
      primaryDisplay: cap?.primaryDisplay ?? "Data unavailable",
      status: cap?.status ?? "Data unavailable",
      currentAdministrativeCenter: cap?.currentAdministrativeCenter ?? undefined,
      designatedCapital: cap?.designatedCapital ?? undefined,
      futureCapital: cap?.futureCapital ?? undefined,
      transitionStatus: cap?.transitionStatus ?? undefined,
      transitionTargetYear: cap?.transitionTargetYear ?? undefined,
      notes: cap?.notes ?? undefined,
      coordinates:
        cap?.latitude != null && cap?.longitude != null
          ? { latitude: cap.latitude, longitude: cap.longitude }
          : undefined,
      population:
        cap?.population != null
          ? {
              value: cap.population,
              unit: "people",
              referenceYear: undefined,
              source: undefined,
              lastVerifiedAt: undefined,
              freshness: "slow" as const
            }
          : undefined,
      province: cap?.province ?? undefined,
      timezone: cap?.timezone ?? undefined,
      description: cap?.description ?? undefined,
      image: cap?.imagePath ?? undefined,
      source: undefined,
      lastVerifiedAt: undefined
    },
    economy: {
      currency: { name: "Indonesian Rupiah", code: "IDR", symbol: "Rp" },
      gdp: gdpStat?.numericValue != null
        ? {
            value: gdpStat.numericValue,
            unit: gdpStat.unit ?? "trillion",
            currency: "IDR",
            priceBasis: "Nominal",
            referenceYear: gdpStat.referenceYear ?? undefined,
            source: undefined,
            lastVerifiedAt: undefined,
            freshness: "annual" as const
          }
        : undefined,
      gdpPerCapita: gdpPerCapitaStat?.numericValue != null
        ? {
            value: gdpPerCapitaStat.numericValue,
            unit: gdpPerCapitaStat.unit ?? "million",
            currency: "IDR",
            priceBasis: "Nominal",
            referenceYear: gdpPerCapitaStat.referenceYear ?? undefined,
            source: undefined,
            lastVerifiedAt: undefined,
            freshness: "annual" as const
          }
        : undefined,
      gdpPerCapitaUsd: gdpPerCapitaUsdStat?.numericValue != null
        ? {
            value: gdpPerCapitaUsdStat.numericValue,
            currency: "USD",
            priceBasis: "Nominal",
            referenceYear: gdpPerCapitaUsdStat.referenceYear ?? undefined,
            source: undefined,
            lastVerifiedAt: undefined,
            freshness: "annual" as const
          }
        : undefined,
      industries: undefined,
      exports: undefined
    },
    languages: {
      official: officialLangs.map((l) => l.name),
      regional: regionalLangs.map((l) => l.name),
      livingCount: livingCountStat?.numericValue != null
        ? {
            value: livingCountStat.numericValue,
            unit: "living languages",
            referenceYear: livingCountStat.referenceYear ?? undefined,
            source: undefined,
            lastVerifiedAt: undefined,
            freshness: "slow" as const
          }
        : undefined
    },
    landmarks: (landmarkRows as typeof landmarks.$inferSelect[]).map((l) => ({
      id: l.slug,
      name: l.name,
      location: l.location,
      coordinates: l.coordinates ?? undefined,
      description: l.description,
      image: l.imagePath ?? undefined
    })),
    foods: (foodRows as typeof foods.$inferSelect[]).map((f) => ({
      id: f.slug,
      name: f.name,
      region: f.region,
      description: f.description,
      image: f.imagePath ?? undefined
    })),
    culture: (cultureRows as typeof cultureItems.$inferSelect[]).map((c) => ({
      id: c.slug,
      title: c.title,
      category: c.category,
      description: c.description,
      image: c.imagePath ?? undefined
    })),
    timeline: (timelineRows as typeof timelineEvents.$inferSelect[]).map((t) => ({
      id: t.yearLabel,
      year: t.yearLabel,
      title: t.title,
      description: t.description
    })),
    gallery: (galleryRows as GalleryRow[]).map((g) => ({
      path: g.path,
      src: g.src,
      alt: g.alt,
      category: g.category ?? undefined,
      span: g.span ?? undefined
    })),
    sources: [],
    assets: {
      flag: flagAsset?.path ?? "/countries/indonesia/flag/indonesia-flag-01.svg",
      hero: heroAsset?.path ?? "/countries/indonesia/hero/indonesia-hero-01.svg"
    },
    meta: {
      schemaVersion: "1.1",
      createdAt: countryRow.createdAt.toISOString().split("T")[0],
      updatedAt: countryRow.updatedAt.toISOString().split("T")[0],
      lastReviewedAt: countryRow.updatedAt.toISOString().split("T")[0]
    }
  } as Country;
}

export async function getAllCountries(): Promise<Country[]> {
  const rows = await db.select().from(countries).orderBy(asc(countries.displayOrder));
  const results: Country[] = [];
  for (const row of rows) {
    const country = await getCountryBySlug(row.slug);
    if (country) results.push(country);
  }
  return results;
}

export async function countryExists(slug: string): Promise<boolean> {
  const count = await db.select({ count: countries.id }).from(countries).where(eq(countries.slug, slug)).limit(1);
  return count.length > 0;
}

export async function getTotalCountries(): Promise<number> {
  const result = await db.select({ count: countries.id }).from(countries);
  return result.length;
}

export async function getCountrySources(slug: string): Promise<DataSource[]> {
  const country = await getCountryBySlug(slug);
  if (!country) return [];
  const sourcesList: DataSource[] = [];
  const seen = new Set<string>();
  const push = (source?: DataSource) => {
    if (!source?.name) return;
    const key = `${source.name}|${source.publication ?? ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      sourcesList.push(source);
    }
  };
  country.sources?.forEach(push);
  push(country.population.total.source);
  push(country.geography.islandCount.source);
  push(country.geography.area.source);
  push(country.economy.gdp?.source);
  push(country.economy.gdpPerCapita?.source);
  push(country.capital.source);
  country.government.leadership.forEach((leader) => push(leader.source));
  return sourcesList;
}

export function getCountryAssets(slug: string): import("@/types/country").MediaAsset[] {
  if (slug !== "indonesia") return [];
  return indonesiaAssetManifest;
}
