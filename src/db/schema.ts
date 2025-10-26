import { pgEnum } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import * as d from "drizzle-orm/pg-core";
const defaultcolumns = {
  id: d.integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: d.timestamp().notNull().defaultNow(),
  updatedAt: d.timestamp(),
};
export const taskEnum = pgEnum("taskEnum", ["todo", "in progress", "done"]);
export const taskTable = pgTable("task", {
  title: d.varchar().notNull(),
  description: d.text().notNull(),
  status: taskEnum().notNull().default("todo"),
  ...defaultcolumns,
});
export const userRoleEnum = pgEnum("userRole", ["user", "admin"]);

export const usersTable = pgTable("users", {
  login: d.varchar().notNull().unique(),
  username: d.varchar(),
  password: d.varchar().notNull(),
  isActive: d.boolean().notNull().default(true),

  role: userRoleEnum().notNull().default("user"),
  ...defaultcolumns,
});
