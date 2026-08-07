export type FreshnessClass =
  | "static"
  | "slow"
  | "annual"
  | "frequent"
  | "political";

export interface DataSource {
  name: string;
  publication?: string;
  url?: string;
  publishedAt?: string;
  accessedAt?: string;
}

export interface SourcedValue<T> {
  value: T;
  unit?: string;
  referenceYear?: number;
  referenceDate?: string;
  source?: DataSource;
  lastVerifiedAt?: string;
  freshness?: FreshnessClass;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface RepresentativeCoordinates extends GeoCoordinates {
  label?: string;
  methodology?: string;
}

export interface CountryCodes {
  alpha2: string;
  alpha3: string;
  numeric?: string;
  callingCode: string;
  internetTld: string;
}

export interface CountryIdentity {
  officialName: string;
  localName: string;
  motto: string;
  anthem: string;
  independence: string;
  demonym?: string;
}

export interface AreaValue {
  value: number;
  unit: "km2" | "km²" | string;
}

export interface CountryGeography {
  continent: string;
  region: string;
  subregion?: string;
  area: AreaValue & SourcedValue<number>;
  waterArea?: AreaValue & SourcedValue<number>;
  islandCount: SourcedValue<number>;
  provinces?: SourcedValue<number>;
  timeZones?: number;
  representativeCoordinates?: RepresentativeCoordinates;
  highestPoint?: string;
  longestRiver?: string;
  neighbors?: string[];
  seas?: string[];
}

export interface CapitalInfo {
  primaryDisplay: string;
  status: string;
  currentAdministrativeCenter?: string;
  designatedCapital?: string;
  futureCapital?: string;
  transitionStatus?: string;
  transitionTargetYear?: number;
  notes?: string;
  coordinates?: GeoCoordinates;
  population?: SourcedValue<number>;
  province?: string;
  timezone?: string;
  description?: string;
  image?: string;
  source?: DataSource;
  lastVerifiedAt?: string;
}

export interface CountryPopulation {
  total: SourcedValue<number>;
  density?: SourcedValue<number>;
  urbanPercentage?: SourcedValue<number>;
  ethnicGroups?: string[];
}

export interface LanguageInfo {
  official: string[];
  regional?: string[];
  livingCount?: SourcedValue<number>;
}

export interface CurrencyInfo {
  name: string;
  code: string;
  symbol: string;
}

export interface EconomyStat extends SourcedValue<number> {
  currency: string;
  priceBasis?: string;
}

export interface CountryEconomy {
  currency: CurrencyInfo;
  gdp?: EconomyStat;
  gdpPerCapita?: EconomyStat;
  gdpPerCapitaUsd?: EconomyStat;
  industries?: string[];
  exports?: string[];
}

export interface LeaderTerm {
  start: string;
  end?: string;
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  constitutionalRoles?: string[];
  term: LeaderTerm;
  image?: string;
  source?: DataSource;
  lastVerifiedAt?: string;
}

export interface CountryGovernment {
  form: string;
  leadership: Leader[];
}

export interface Landmark {
  id: string;
  name: string;
  location: string;
  coordinates?: string;
  description: string;
  image?: string;
}

export interface Food {
  id: string;
  name: string;
  region: string;
  description: string;
  image?: string;
}

export interface CultureItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface MediaAsset {
  path: string;
  alt: string;
  width?: number;
  height?: number;
  source?: string;
  sourceUrl?: string;
  author?: string;
  license?: string;
  downloadedAt?: string;
}

export interface GalleryImage extends MediaAsset {
  src: string;
  category?: string;
  span?: string;
}

export interface CountryMeta {
  schemaVersion: string;
  createdAt?: string;
  updatedAt: string;
  lastReviewedAt?: string;
}

export interface CountryAssets {
  flag: string;
  hero: string;
}

export interface Country {
  schemaVersion: string;
  id: string;
  slug: string;
  index: number;
  name: string;

  codes: CountryCodes;
  identity: CountryIdentity;

  geography: CountryGeography;
  population: CountryPopulation;
  government: CountryGovernment;
  capital: CapitalInfo;
  economy: CountryEconomy;
  languages: LanguageInfo;

  landmarks: Landmark[];
  foods: Food[];
  culture: CultureItem[];
  timeline: TimelineEvent[];
  gallery: GalleryImage[];

  sources?: DataSource[];
  assets: CountryAssets;
  meta: CountryMeta;
}
