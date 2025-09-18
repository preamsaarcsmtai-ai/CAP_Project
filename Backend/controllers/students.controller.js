import { db } from "../db/drizzle.js"; 
import { students } from "../db/schema/students.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class StudentController {

  //  REGISTER 
  static async register(req, h) {
    try {
      const { name, email, password, rollNumber, course, collegeId } = req.payload;

      // Check if email or roll number already exists
      const existingStudent = await db.select().from(students)
        .where(students.email.eq(email))
        .orWhere(students.rollNumber.eq(rollNumber));

      if (existingStudent.length > 0) {
        return h.response({ message: "Email or Roll Number already exists" }).code(400);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert student
      const newStudent = await db.insert(students).values({
        name,
        email,
        password: hashedPassword,
        rollNumber,
        course,
        collegeId
      }).returning();

      return h.response({ message: "Registration successful", student: newStudent[0] }).code(201);

    } catch (err) {
      console.error(err);
      return h.response({ message: "Registration failed", error: err.message }).code(500);
    }
  }

  //  LOGIN 
  static async login(req, h) {
    try {
      const { email, password } = req.payload;

      const student = await db.select().from(students).where(students.email.eq(email));

      if (student.length === 0) {
        return h.response({ message: "Invalid email or password" }).code(401);
      }

      const isPasswordValid = await bcrypt.compare(password, student[0].password);
      if (!isPasswordValid) {
        return h.response({ message: "Invalid email or password" }).code(401);
      }

      // Generate JWT
      const token = jwt.sign(
        { id: student[0].id, role: student[0].role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return h.response({ message: "Login successful", token }).code(200);

    } catch (err) {
      console.error(err);
      return h.response({ message: "Login failed", error: err.message }).code(500);
    }
  }

  //  GET PROFILE 
  static async getProfile(req, h) {
    try {
      const studentId = req.auth.credentials.id;

      const student = await db.select().from(students).where(students.id.eq(studentId));

      if (student.length === 0) {
        return h.response({ message: "Student not found" }).code(404);
      }

      // Remove password before sending response
      const { password, ...profile } = student[0];

      return h.response({ profile }).code(200);

    } catch (err) {
      console.error(err);
      return h.response({ message: "Failed to fetch profile", error: err.message }).code(500);
    }
  }

  //  UPDATE PROFILE 
  static async updateProfile(req, h) {
    try {
      const studentId = req.auth.credentials.id;
      const { name, course, password } = req.payload;

      const updateData = { name, course };

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      await db.update(students)
        .set(updateData)
        .where(students.id.eq(studentId));

      return h.response({ message: "Profile updated successfully" }).code(200);

    } catch (err) {
      console.error(err);
      return h.response({ message: "Profile update failed", error: err.message }).code(500);
    }
  }

}
