import { pgTable, timestamp , uuid} from "drizzle-orm/pg-core";
import { teacherProfile } from "./teachers";
import { subjects } from "./subjects";

export const teacherSubjects = pgTable("teacher_subjects", {
  id: uuid("id").defaultRandom().primaryKey(),
  teacherId: uuid("teacher_id").references(() => teacherProfile.id),
  subjectId: uuid("subject_id").references(() => subjects.id),
  createdAt: timestamp("created_at", { withTimezone: true }) .defaultNow() .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }) .defaultNow() .notNull()
});
