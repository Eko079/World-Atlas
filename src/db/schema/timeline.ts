import {
  timestamp,
  uuid,
  varchar,
  text,
  integer
} from "drizzle-orm/pg-core";

export const timelineEvents = {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull(),
  yearLabel: varchar("year_label", { length: 255 }).notNull().unique(),
  sortYear: integer("sort_year"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  sourceId: uuid("source_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
};
