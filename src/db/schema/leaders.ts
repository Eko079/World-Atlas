import {
  timestamp,
  uuid,
  varchar,
  text,
  integer,
  boolean
} from "drizzle-orm/pg-core";

export const leaders = {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  roles: varchar("roles", { length: 500 }).array(),
  termStart: timestamp("term_start").notNull(),
  termEnd: timestamp("term_end"),
  isCurrent: boolean("is_current").notNull().default(true),
  imagePath: text("image_path"),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
};
