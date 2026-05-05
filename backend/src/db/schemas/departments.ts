import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const departments = pgTable("department", {
  id: uuid("id").defaultRandom().primaryKey(),
  universityId: uuid("university_id").notNull(),

  name: text("name").unique(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});
