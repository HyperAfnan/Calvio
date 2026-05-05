import { pgTable, timestamp, varchar, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailConfirmedAt: timestamp("email_confirmed_at", { withTimezone: true }),

  encryptedPassword: varchar("encrypted_password"),

  phone: text("phone").unique(),
  phoneConfirmedAt: timestamp("phone_confirmed_at", { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
