export interface CountryCodes {
  alpha2: string;
  alpha3: string;
  numeric?: string;
}

export interface CountryGeography {
  continent: string;
  region: string;
  subregion?: string;
  areaKm2: number;
  waterKm2?: number;
  coordinates?: string;
  islands?: number;
  highestPoint?: string;
  longestRiver?: string;
  neighbors?: string[];
  seas?: string[];
}

export interface CapitalInfo {
  name: string;
  coordinates?: string;
  population?: number;
  province?: string;
  timezone?: string;
  description?: string;
  image?: string;
}

export interface PopulationInfo {
  total: number;
  density?: number;
  urbanPercentage?: number;
  ethnicGroups?: string[];
}

export interface LanguageInfo {
  official: string[];
  regional?: string[];
  livingCount?: number;
}

export interface CurrencyInfo {
  name: string;
  code: string;
  symbol: string;
  gdp?: number;
  gdpPerCapita?: number;
  industries?: string[];
  exports?: string[];
}

export interface IdentityInfo {
  officialName: string;
  localName: string;
  motto: string;
  anthem: string;
  independence: string;
  capital: string;
  callingCode: string;
  internetTld: string;
}

export interface Leader {
  role: string;
  name: string;
  photo?: string;
  term: string;
  party?: string;
}

export interface Landmark {
  name: string;
  location: string;
  coordinates?: string;
  description: string;
  image?: string;
}

export interface Food {
  name: string;
  region: string;
  description: string;
  image?: string;
}

export interface CultureItem {
  title: string;
  category: string;
  description: string;
  image?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  span?: string;
}

export interface CountryAssets {
  flag: string;
  hero: string;
}

export interface Country {
  slug: string;
  index: number;
  name: string;
  officialName: string;
  localName: string;

  codes: CountryCodes;

  identity: IdentityInfo;

  geography: CountryGeography;

  capital: CapitalInfo;

  population: PopulationInfo;

  languages: LanguageInfo;

  currency: CurrencyInfo;

  leadership: Leader[];

  landmarks: Landmark[];

  foods: Food[];

  culture: CultureItem[];

  timeline: TimelineEvent[];

  gallery: GalleryImage[];

  assets: CountryAssets;
}
