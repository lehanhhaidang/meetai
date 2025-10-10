import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    age: integer("age").notNull(),
    email: varchar({ length: 256 }).notNull().unique(),
})