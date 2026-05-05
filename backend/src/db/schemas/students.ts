import { pgTable, text, bigint, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { classes } from "./classes";

export const studentProfile = pgTable("student_profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),

  firstName: text("first_name"),
  lastName: text("last_name"),

  semester: bigint("semester", { mode: "number" }).notNull(),
  roleNumber: text("role_number"),

  bio: text("bio"),

  classId: uuid("class_id").references(() => classes.id),
  createdAt: timestamp("created_at", { withTimezone: true }) .defaultNow() .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }) .defaultNow() .notNull()
});
