import { z } from "zod";
import type { Country } from "@/types/country";

export const SCHEMA_VERSION = "1.1";

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

const dataSourceSchema = z.object({
  name: z.string().min(1, "name is required"),
  publication: z.string().optional(),
  url: z.string().url().optional(),
  publishedAt: z.string().optional(),
  accessedAt: z.string().optional()
});

const sourcedValueSchema = z.object({
  value: z.unknown(),
  unit: z.string().optional(),
  referenceYear: z.number().int().optional(),
  referenceDate: dateString.optional(),
  source: dataSourceSchema.optional(),
  lastVerifiedAt: dateString.optional(),
  freshness: z
    .enum(["static", "slow", "annual", "frequent", "political"])
    .optional()
});

const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90, "latitude must be between -90 and 90"),
  longitude: z.number().min(-180).max(180, "longitude must be between -180 and 180")
});

const codesSchema = z.object({
  alpha2: z.string().length(2, "alpha2 must be 2 characters"),
  alpha3: z.string().length(3, "alpha3 must be 3 characters"),
  numeric: z.string().optional(),
  callingCode: z.string().min(1, "calling code is required"),
  internetTld: z.string().min(1, "internet TLD is required")
});

const identitySchema = z.object({
  officialName: z.string().min(1),
  localName: z.string().min(1),
  motto: z.string().min(1),
  anthem: z.string().min(1),
  independence: z.string().min(1),
  demonym: z.string().optional()
});

const areaSchema = sourcedValueSchema.extend({
  value: z.number().positive("area.value must be a positive number"),
  unit: z.enum(["km2", "km²"])
});

const geographySchema = z.object({
  continent: z.string().min(1),
  region: z.string().min(1),
  subregion: z.string().optional(),
  area: areaSchema,
  waterArea: areaSchema.optional(),
  islandCount: sourcedValueSchema.extend({
    value: z.number().int().nonnegative("islandCount.value must be a non-negative integer")
  }),
  provinces: sourcedValueSchema
    .extend({ value: z.number().int().nonnegative() })
    .optional(),
  timeZones: z.number().int().optional(),
  representativeCoordinates: coordinatesSchema
    .extend({
      label: z.string().optional(),
      methodology: z.string().optional()
    })
    .optional(),
  highestPoint: z.string().optional(),
  longestRiver: z.string().optional(),
  neighbors: z.array(z.string()).optional(),
  seas: z.array(z.string()).optional()
});

const capitalSchema = z.object({
  primaryDisplay: z.string().min(1, "capital.primaryDisplay is required"),
  status: z.string().min(1, "capital.status is required"),
  currentAdministrativeCenter: z.string().optional(),
  designatedCapital: z.string().optional(),
  futureCapital: z.string().optional(),
  transitionStatus: z.string().optional(),
  transitionTargetYear: z.number().int().optional(),
  notes: z.string().optional(),
  coordinates: coordinatesSchema.optional(),
  population: sourcedValueSchema
    .extend({ value: z.number().int().nonnegative() })
    .optional(),
  province: z.string().optional(),
  timezone: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  source: dataSourceSchema.optional(),
  lastVerifiedAt: dateString.optional()
});

const populationSchema = z.object({
  total: sourcedValueSchema.extend({
    value: z.number().positive("population.total.value must be a positive number")
  }),
  density: sourcedValueSchema
    .extend({ value: z.number().positive() })
    .optional(),
  urbanPercentage: sourcedValueSchema
    .extend({
      value: z.number().min(0).max(100, "urbanPercentage must be 0-100")
    })
    .optional(),
  ethnicGroups: z.array(z.string()).optional()
});

const languageSchema = z.object({
  official: z.array(z.string().min(1)).min(1, "at least one official language required"),
  regional: z.array(z.string()).optional(),
  livingCount: sourcedValueSchema
    .extend({ value: z.number().int().nonnegative() })
    .optional()
});

const economyStatSchema = sourcedValueSchema.extend({
  value: z.number().nonnegative("economy value must be non-negative"),
  currency: z.string().min(1, "currency is required"),
  priceBasis: z.string().optional()
});

const economySchema = z.object({
  currency: z.object({
    name: z.string().min(1),
    code: z.string().min(1),
    symbol: z.string().min(1)
  }),
  gdp: economyStatSchema.optional(),
  gdpPerCapita: economyStatSchema.optional(),
  gdpPerCapitaUsd: economyStatSchema.optional(),
  industries: z.array(z.string()).optional(),
  exports: z.array(z.string()).optional()
});

const leaderTermSchema = z.object({
  start: z.string().min(1),
  end: z.string().optional()
});

const leaderSchema = z.object({
  id: z.string().min(1, "leader.id is required"),
  name: z.string().min(1, "leader.name is required"),
  position: z.string().min(1, "leader.position is required"),
  constitutionalRoles: z.array(z.string()).optional(),
  term: leaderTermSchema,
  image: z.string().optional(),
  source: dataSourceSchema.optional(),
  lastVerifiedAt: dateString.optional()
});

const governmentSchema = z.object({
  form: z.string().min(1),
  leadership: z.array(leaderSchema).min(1, "at least one leader required")
});

const landmarkSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  location: z.string().min(1),
  coordinates: z.string().optional(),
  description: z.string().min(1),
  image: z.string().optional()
});

const foodSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  region: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional()
});

const cultureItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional()
});

const timelineEventSchema = z.object({
  id: z.string().min(1),
  year: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1)
});

const galleryImageSchema = z.object({
  path: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  source: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  author: z.string().optional(),
  license: z.string().optional(),
  downloadedAt: dateString.optional(),
  category: z.string().optional(),
  span: z.string().optional()
});

const countryAssetsSchema = z.object({
  flag: z.string().min(1, "assets.flag is required"),
  hero: z.string().min(1, "assets.hero is required")
});

const metaSchema = z.object({
  schemaVersion: z.literal(SCHEMA_VERSION, {
    message: `schemaVersion must be ${SCHEMA_VERSION}`
  }),
  createdAt: dateString.optional(),
  updatedAt: dateString,
  lastReviewedAt: dateString.optional()
});

export const countrySchema = z.object({
  schemaVersion: z.literal(SCHEMA_VERSION),
  id: z.string().regex(/^[a-z0-9_-]+$/, "id must be lowercase slug-like"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase with hyphens"),
  index: z.number().int().positive(),
  name: z.string().min(1, "country name is required"),
  codes: codesSchema,
  identity: identitySchema,
  geography: geographySchema,
  population: populationSchema,
  government: governmentSchema,
  capital: capitalSchema,
  economy: economySchema,
  languages: languageSchema,
  landmarks: z.array(landmarkSchema),
  foods: z.array(foodSchema),
  culture: z.array(cultureItemSchema),
  timeline: z.array(timelineEventSchema),
  gallery: z.array(galleryImageSchema),
  sources: z.array(dataSourceSchema).optional(),
  assets: countryAssetsSchema,
  meta: metaSchema
});

export type CountryValidationResult =
  | { success: true; data: Country }
  | { success: false; errors: string[] };

export function validateCountry(data: unknown): CountryValidationResult {
  const result = countrySchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map(
      (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`
    );
    return { success: false, errors };
  }
  return { success: true, data: result.data as unknown as Country };
}

export function parseCountry(data: unknown): Country {
  const result = validateCountry(data);
  if (!result.success) {
    const message = `Invalid country data: ${result.errors.join("; ")}`;
    if (process.env.NODE_ENV === "development") {
      throw new Error(message);
    }
    console.error(message);
    throw new Error(message);
  }
  return result.data;
}
