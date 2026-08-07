import type { Country } from "@/types/country";
import indonesiaData from "@/data/countries/indonesia.json";

const countries: Country[] = [indonesiaData as unknown as Country];

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
