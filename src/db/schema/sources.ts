import {
  timestamp,
  uuid,
  varchar,
  text
} from "drizzle-orm/pg-core";

export const sources = {
  id: uuid("id").primaryKey().defaultRandom(),
  organization: varchar("organization", { length: 255 }).notNull(),
  publication: varchar("publication", { length: 255 }),
  url: text("url"),
  publishedAt: timestamp("published_at"),
  accessedAt: timestamp("accessed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
};
