import { pgEnum, pgTable, text, bigint, timestamp, uuid } from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const RoomTypeEnum = pgEnum("room_type_enum", ["lecture_hall", "lab", "seminar_room"]);

export const rooms = pgTable("room", {
  id: uuid("id").primaryKey().defaultRandom(),
  roomNumber: text("room_number").unique(),

  roomType: RoomTypeEnum("room_type").default("lecture_hall").notNull(),
  capacity: bigint("capacity", { mode: "number" }),

  departmentId: uuid("department_id").references(() => departments.id),
  createdAt: timestamp("created_at", { withTimezone: true }) .defaultNow() .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }) .defaultNow() .notNull()
});
