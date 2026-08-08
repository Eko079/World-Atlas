import {
  timestamp,
  uuid,
  varchar,
  text,
  integer
} from "drizzle-orm/pg-core";

export const mediaAssets = {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull(),
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
};
