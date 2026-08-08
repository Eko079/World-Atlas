import {
  timestamp,
  uuid,
  varchar,
  text,
  integer
} from "drizzle-orm/pg-core";

export const galleryImages = {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull(),
  path: text("path").notNull().unique(),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  category: varchar("category", { length: 100 }),
  span: varchar("span", { length: 50 }),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
};
