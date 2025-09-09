import db from "../config/drizzle.js";
import { staff, students } from "../config/schema.js";
import { eq } from "drizzle-orm";

export class CollegeAdminService{
    // Admin can add the Staff
   static async addStaff({name, email, designation, collegeId}){
    
    const [newStaff] = await db.insert(staff).values({ name, email, designation, collegeId}).returning();
    return newStaff;

   };

   // Get the staff
   static async getStaff(collegeId){
    return await db.select().from(staff).where(eq(staff.collegeId, collegeId));
   };

   // Update the staff
   static async updatedStaff(staffId, { name, email, designation }, collegeId){

    const [updated] = await db.update(staff)
    .set({ name, email, designation})
    .where(eq(staff.id, staffId))
    .where(eq(staff.collegeId, collegeId))
    .returning();
    return updated;

   };

   // Delete the Staff
   static async deleteStaff(staffId, collegeId){
    return await db.delete(staff).where(eq(staff.id, staffId)).where(eq(staff.collegeId, collegeId)).returning();
   }

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