import { pgTable, text, bigint, timestamp , uuid } from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const classes = pgTable("classes", {
  id: uuid("id").defaultRandom().primaryKey(),

  className: text("class_name").notNull().unique(),
  semester: bigint("semester", { mode: "number" }).notNull(),
  academicYear: text("academic_year"),
  section: text("section"),

  studentCount: bigint("students", { mode: "number" }),

  departmentId: uuid("department_id").references(() => departments.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }) .defaultNow() .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow() .notNull()
});
