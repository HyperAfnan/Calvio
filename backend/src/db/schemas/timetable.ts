import { pgEnum, pgTable, timestamp, text, time, bigint , uuid} from "drizzle-orm/pg-core";
import { departments } from "./departments";
import { classes } from "./classes";
import { subjects } from "./subjects";
import { teacherProfile } from "./teachers";
import { rooms, RoomTypeEnum } from "./rooms";

export const DaysOfWeekEnum = pgEnum("days_of_week_enum", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);

export const timeSlots = pgTable("time_slots", {
  id: uuid("id").primaryKey().defaultRandom(),
  daysOfWeek: DaysOfWeekEnum("days_of_week").notNull(),
  slot: bigint("slot", { mode: "number" }).notNull(),
  startTime: time("start_time"),
  endTime: time("end_time"),
  label: text("label"),
  departmentId: uuid("department_id").references(() => departments.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});


export const timetableEntries = pgTable("timetable_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  classId: uuid("class_id").references(() => classes.id),
  timeSlotId: uuid("time_slot_id").references(() => timeSlots.id),
  subjectId: uuid("subject_id").references(() => subjects.id),
  teacherId: uuid("teacher_id").references(() => teacherProfile.id),
  roomId: uuid("room_id").references(() => rooms.id),
  format: RoomTypeEnum("format").default("lecture_hall").notNull(),
  departmentId: uuid("department_id").references(() => departments.id),
  createdAt: timestamp("created_at", { withTimezone: true }) .defaultNow() .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow() .notNull()
});
