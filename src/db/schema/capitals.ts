import {
  timestamp,
  uuid,
  varchar,
  text,
  integer,
  doublePrecision,
  boolean
} from "drizzle-orm/pg-core";

export const capitals = {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id").notNull(),
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
};
