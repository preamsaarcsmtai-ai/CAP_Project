import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core" ;

// Institution Table
export const institutions = pgTable("institutions",{
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length: 55}).unique(),
    location: varchar("location", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
});

//Colleges under institution (e.g, Engineering, Arts, etc.)
export const colleges = pgTable("colleges", {
    id: serial("id").primaryKey(),
    institutionId: integer("institution_id").notNull().references(()=> institutions.id),
    name: varchar("name", { length: 100}).notNull(),
    code: varchar("code", { length: 55}).unique(),
    createdAt: timestamp("created_at").defaultNow(),
});

// college Admins (who manage students & staff)
export const admins = pgTable("admins", {
    id: serial("id").primaryKey(),
    collegeId: integer("college_id").references(()=> colleges.id),
    institutionId: integer("institution_id").references(()=> institutions.id),
    name: varchar("name", { length: 255}).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    code: varchar("code", { length: 55}).unique(),
    role: varchar("role", { length: 50 }).default("college_admin"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Staff
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  collegeId: integer("college_id").notNull().references(() => colleges.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), 
  designation: varchar("designation", { length: 255 }),
  role: varchar("role", { length: 50 }).default("staff"),
  createdAt: timestamp("created_at").defaultNow(),
});

// students table update
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  collegeId: integer("college_id").notNull().references(() => colleges.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  rollNumber: varchar("roll_number", { length: 50 }).notNull().unique(),
  course: varchar("course", { length: 100 }),
  role: varchar("role", { length: 50 }).default("student"), 
  createdAt: timestamp("created_at").defaultNow(),
});


