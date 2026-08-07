import type { Country, DataSource, MediaAsset } from "@/types/country";
import indonesiaData from "@/data/countries/indonesia.json";
import { indonesiaAssetManifest } from "@/data/countries/indonesia-assets";
import { validateCountry } from "@/lib/countries/validation";

const rawCountryFiles: Array<Record<string, unknown>> = [
  indonesiaData as unknown as Record<string, unknown>
];

function buildCountries(): Country[] {
  return rawCountryFiles.map((data) => {
    const result = validateCountry(data);
    if (!result.success) {
      const message = `Invalid country data: ${result.errors.join("; ")}`;
      console.error(message);
      throw new Error(message);
    }
    return result.data;
  });
}

const countries: Country[] = buildCountries();

export function getAllCountries(): Country[] {
  return countries;
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((country) => country.slug === slug);
}

export function countryExists(slug: string): boolean {
  return countries.some((country) => country.slug === slug);
}

export function getTotalCountries(): number {
  return countries.length;
}

export function getCountrySources(slug: string): DataSource[] {
  const country = getCountryBySlug(slug);
  if (!country) return [];
  const sources: DataSource[] = [];
  const seen = new Set<string>();
  const push = (source?: DataSource) => {
    if (!source?.name) return;
    const key = `${source.name}|${source.publication ?? ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      sources.push(source);
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
  return sources;
}

export function getCountryAssets(slug: string): MediaAsset[] {
  if (slug !== "indonesia") return [];
  return indonesiaAssetManifest;
}

export { validateCountry };
export type { Country };
