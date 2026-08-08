import { pgTable, uuid, varchar, text, timestamp, integer, doublePrecision, boolean } from "drizzle-orm/pg-core";

export const sources = pgTable("sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  organization: varchar("organization", { length: 255 }).notNull(),
  publication: varchar("publication", { length: 255 }),
  url: text("url"),
  publishedAt: timestamp("published_at"),
  accessedAt: timestamp("accessed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const countries = pgTable("countries", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  officialName: varchar("official_name", { length: 255 }).notNull(),
  localName: varchar("local_name", { length: 255 }).notNull(),
  motto: text("motto"),
  anthem: text("anthem"),
  independence: varchar("independence", { length: 255 }),
  demonym: varchar("demonym", { length: 255 }),
  isoAlpha2: varchar("iso_alpha2", { length: 10 }).notNull().unique(),
  isoAlpha3: varchar("iso_alpha3", { length: 10 }).notNull().unique(),
  isoNumeric: varchar("iso_numeric", { length: 10 }),
  callingCode: varchar("calling_code", { length: 20 }).notNull(),
  internetTld: varchar("internet_tld", { length: 20 }).notNull(),
  continent: varchar("continent", { length: 100 }).notNull(),
  region: varchar("region", { length: 100 }).notNull(),
  subregion: varchar("subregion", { length: 100 }),
  summary: text("summary"),
  representativeLatitude: doublePrecision("representative_latitude"),
  representativeLongitude: doublePrecision("representative_longitude"),
  representativeLabel: text("representative_label"),
  highestPoint: varchar("highest_point", { length: 255 }),
  longestRiver: varchar("longest_river", { length: 255 }),
  timeZones: integer("time_zones"),
  neighbors: varchar("neighbors", { length: 255 }).array(),
  seas: varchar("seas", { length: 255 }).array(),
  ethnicGroups: varchar("ethnic_groups", { length: 255 }).array(),
  displayOrder: integer("display_order").notNull().default(1),
  schemaVersion: varchar("schema_version", { length: 20 }).notNull().default("1.1"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const capitals = pgTable("capitals", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  primaryDisplay: varchar("primary_display", { length: 255 }).notNull(),
  status: text("status").notNull(),
  currentAdministrativeCenter: varchar("current_administrative_center", { length: 255 }),
  designatedCapital: varchar("designated_capital", { length: 255 }),
  futureCapital: varchar("future_capital", { length: 255 }),
  transitionStatus: text("transition_status"),
  transitionTargetYear: integer("transition_target_year"),
  notes: text("notes"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  population: integer("population"),
  province: varchar("province", { length: 255 }),
  timezone: varchar("timezone", { length: 50 }),
  description: text("description"),
  imagePath: text("image_path"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const leaders = pgTable("leaders", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  roles: varchar("roles", { length: 500 }).array(),
  termStart: timestamp("term_start").notNull(),
  termEnd: timestamp("term_end"),
  isCurrent: boolean("is_current").notNull().default(true),
  imagePath: text("image_path"),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id").references(() => sources.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const countryStatistics = pgTable("country_statistics", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 100 }).notNull(),
  key: varchar("key", { length: 100 }).notNull(),
  numericValue: doublePrecision("numeric_value"),
  textValue: text("text_value"),
  unit: varchar("unit", { length: 50 }),
  referenceYear: integer("reference_year"),
  referenceDate: timestamp("reference_date"),
  sourceId: uuid("source_id").references(() => sources.id),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const languages = pgTable("languages", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull().default("regional"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const landmarks = pgTable("landmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  coordinates: varchar("coordinates", { length: 255 }),
  description: text("description").notNull(),
  imagePath: text("image_path"),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id").references(() => sources.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const foods = pgTable("foods", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  region: varchar("region", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imagePath: text("image_path"),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id").references(() => sources.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const cultureItems = pgTable("culture_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  imagePath: text("image_path"),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id").references(() => sources.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const timelineEvents = pgTable("timeline_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  yearLabel: varchar("year_label", { length: 255 }).notNull(),
  sortYear: integer("sort_year"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id").references(() => sources.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 100 }).notNull(),
  path: text("path").notNull(),
  alt: text("alt").notNull(),
  originalUrl: text("original_url"),
  sourceUrl: text("source_url"),
  author: varchar("author", { length: 255 }),
  license: varchar("license", { length: 100 }),
  width: integer("width"),
  height: integer("height"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull().references(() => countries.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  category: varchar("category", { length: 100 }),
  span: varchar("span", { length: 50 }),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
