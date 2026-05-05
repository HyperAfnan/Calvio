import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const teacherProfile = pgTable("teacher_profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  empId: text("emp_id").notNull().unique(),

  firstName: text("first_name"),
  lastName: text("last_name"),

  designation: text("designation"),
  bio: text("bio"),
  maxHours: text("max_hours"),

  departmentId: uuid("department_id").references(() => departments.id),
  createdAt: timestamp("created_at", { withTimezone: true }) .defaultNow() .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }) .defaultNow() .notNull()

});
