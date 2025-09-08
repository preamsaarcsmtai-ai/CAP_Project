import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core" ;

// Institution Table
export const institutions = pgTable("institutions",{
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

//Colleges under institution (e.g, Engineering, Arts, etc.)
export const colleges = pgTable("colleges", {
    id: serial("id").primaryKey(),
    institutionId: integer("institution_id").notNull().references(()=> institutions.id),
    name: varchar("name", { length: 100}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

// college Admins (who manage students & staff)
export const admins = pgTable("admins", {
    id: serial("id").primaryKey(),
    collegeId: integer("college_id").notNull().references(()=> colleges.id),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 }).default("college_admin"),
    createdAt: timestamp("created_at").defaultNow(),
});

