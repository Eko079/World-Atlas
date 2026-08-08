import {
  timestamp,
  uuid,
  varchar,
  text,
  integer
} from "drizzle-orm/pg-core";

export const cultureItems = {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  imagePath: text("image_path"),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
};
