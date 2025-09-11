import db from "../config/drizzle.js";
import { staff, students, admins } from "../config/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  // LOGIN (Admin, Staff, Student)
  static async login(request, h) {
    try {
      const { email, password, role } = request.payload;

      let userTable;
      if (role === "college_admin") userTable = admins;
      else if (role === "staff") userTable = staff;
      else if (role === "student") userTable = students;
      else {
        return h.response({ message: "Invalid role" }).code(400);
      }

      const [user] = await db.select().from(userTable).where(eq(userTable.email, email));
      if (!user) return h.response({ message: "Invalid credentials" }).code(401);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return h.response({ message: "Invalid credentials" }).code(401);

      
      const accessToken = jwt.sign(
        { id: user.id, role: user.role, collegeId: user.collegeId },
        process.env.JWT_SECRET,
        { expiresIn: "15m" } 
      );

      const refreshToken = jwt.sign(
        { id: user.id, role: user.role, collegeId: user.collegeId },
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: "7d" }
      );

      return h.response({
        success: true,
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          collegeId: user.collegeId,
        },
      }).code(200);
    } catch (err) {
      console.error("Login error:", err.message);
      return h.response({ success: false, error: err.message }).code(500);
    }
  }

  static async refresh(request, h) {
    try {
      const { refreshToken } = request.payload;
      if (!refreshToken) {
        return h.response({ message: "Refresh token required" }).code(400);
      }

     
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      
      const newAccessToken = jwt.sign(
        { id: decoded.id, role: decoded.role, collegeId: decoded.collegeId },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      return h.response({
        success: true,
        accessToken: newAccessToken,
      }).code(200);
    } catch (err) {
      console.error("Refresh error:", err.message);
      return h.response({ success: false, message: "Invalid or expired refresh token" }).code(403);
    }
  }
}
