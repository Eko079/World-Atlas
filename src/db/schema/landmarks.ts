import {
  timestamp,
  uuid,
  varchar,
  text,
  integer,
  doublePrecision
} from "drizzle-orm/pg-core";

export const landmarks = {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  coordinates: varchar("coordinates", { length: 255 }),
  description: text("description").notNull(),
  imagePath: text("image_path"),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
};
