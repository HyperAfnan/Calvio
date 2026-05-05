import { relations } from "drizzle-orm";

import { departments } from "./departments";
import { teacherProfile } from "./teachers";
import { subjects } from "./subjects";
import { classes } from "./classes";
import { studentProfile } from "./students";
import { rooms } from "./rooms";
import { teacherSubjects } from "./teachers_subjects";
import { timetableEntries, timeSlots } from "./timetable";

export const departmentRelations = relations(departments, ({ many }) => ({
  teachers: many(teacherProfile),
  subjects: many(subjects),
  classes: many(classes),
  rooms: many(rooms),
  timeSlots: many(timeSlots),
}));

export const teacherRelations = relations(teacherProfile, ({ one, many }) => ({
  department: one(departments, {
    fields: [teacherProfile.departmentId],
    references: [departments.id],
  }),

  subjects: many(teacherSubjects),
  timetableEntries: many(timetableEntries),
}));

export const subjectRelations = relations(subjects, ({ one, many }) => ({
  department: one(departments, {
    fields: [subjects.departmentId],
    references: [departments.id],
  }),

  teachers: many(teacherSubjects),
}));

export const classRelations = relations(classes, ({ one, many }) => ({
  department: one(departments, {
    fields: [classes.departmentId],
    references: [departments.id],
  }),

  students: many(studentProfile),
  timetableEntries: many(timetableEntries),
}));

export const timetableRelations = relations(timetableEntries, ({ one }) => ({
  class: one(classes, {
    fields: [timetableEntries.classId],
    references: [classes.id],
  }),

  subject: one(subjects, {
    fields: [timetableEntries.subjectId],
    references: [subjects.id],
  }),

  teacher: one(teacherProfile, {
    fields: [timetableEntries.teacherId],
    references: [teacherProfile.id],
  }),

  room: one(rooms, {
    fields: [timetableEntries.roomId],
    references: [rooms.id],
  }),

  timeSlot: one(timeSlots, {
    fields: [timetableEntries.timeSlotId],
    references: [timeSlots.id],
  }),
}));
