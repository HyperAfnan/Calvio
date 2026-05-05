import { uuid, pgEnum, pgTable, text, bigint, timestamp, index, uniqueIndex, } from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const subjectTypeEnum = pgEnum("subject_type_enum", [ "core", "elective" ]);

export const subjectFormatEnum = pgEnum("subject_format_enum", [ "lecture", "lab" ]);

export const subjects = pgTable( "subjects", {
    id: uuid("id").primaryKey().defaultRandom(),

    subjectName: text("subject_name").notNull(),
    subjectCode: text("subject_code"),

    semester: bigint("semester", { mode: "number" }),

    subjectType: subjectTypeEnum("subject_type") .default("core") .notNull(),
    subjectFormat: subjectFormatEnum("subject_format") .default("lecture") .notNull(),

    credits: bigint("credits", { mode: "number" }),

    hoursPerWeek: bigint("hours_per_week", { mode: "number" }) .notNull(),

    departmentId: uuid("department_id").references(() => departments.id) .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }) .defaultNow() .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true }) .defaultNow() .notNull(),
  },
  (table) => ({
    deptIdx: index("subjects_department_idx").on(table.departmentId),

    uniquePerDept: uniqueIndex("subjects_dept_name_unique").on(
      table.departmentId,
      table.subjectName
    ),
  })
);
