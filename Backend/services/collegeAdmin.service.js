import db from "../config/drizzle.js";
import {  students } from "../config/schema.js";
import { eq } from "drizzle-orm";

export class CollegeAdminService{

   //Add the Student service
   static async addStudent({name, email, department, year, collegeId}){
    
    const [newStudent] = await db.insert(students).values({name, email, department, year, collegeId}).returning();
    return newStudent;

   }

   //Get the student
   static async getStudents(collegeId){
    return await db.select().from(students).where(eq(students.collegeId, collegeId));
   }

   //Updated the student
   static async updateStudent(studentId, { name, email, department, year }, collegeId){
    
    const [studentUpdate] = db.update(students)
    .set({ name, email, department, year})
    .where(eq(students.id, studentId))
    .where(eq(students.collegeId, collegeId))
    .returning();
    return studentUpdate;
    
   }

   //Delete the student
   static async deleteStudent(studentId, collegeId){
    return db.delete(students).where(eq(students.id, studentId)).where(eq(students.collegeId, collegeId));
   }
}