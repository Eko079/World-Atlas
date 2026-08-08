import {
  timestamp,
  uuid,
  varchar,
  text,
  integer,
  doublePrecision
} from "drizzle-orm/pg-core";

export const countryStatistics = {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  key: varchar("key", { length: 100 }).notNull(),
  numericValue: doublePrecision("numeric_value"),
  textValue: text("text_value"),
  unit: varchar("unit", { length: 50 }),
  referenceYear: integer("reference_year"),
  referenceDate: timestamp("reference_date"),
  sourceId: uuid("source_id"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
};
