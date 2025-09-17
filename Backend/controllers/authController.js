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

      console.log("Login attempt:", { email, role });

      let userTable;
      if (role === "college_admin") userTable = admins;
      else if (role === "staff") userTable = staff;
      else if (role === "student") userTable = students;
      else {
        console.warn("Invalid role:", role);
        return h.response({ message: "Invalid role" }).code(400);
      }

      // console.log(" Selected table:", userTable._.name);

      const [user] = await db.select().from(userTable).where(eq(userTable.email, email));

      if (!user) {
        console.warn("No user found with email:", email);
        return h.response({ message: "Invalid credentials" }).code(401);
      }

      console.log(" User found:", { id: user.id, email: user.email, role: user.role });
      console.log(" Stored hash:", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatch);

      if (!isMatch) {
        console.warn("Password mismatch for email:", email);
        return h.response({ message: "Invalid credentials" }).code(401);
      }

      const payload = { id: user.id, role: user.role, collegeId: user.collegeId };
      console.log("JWT payload:", payload);

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

      console.log("Tokens generated");

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
      console.error(" Login error:", err.message);
      return h.response({ success: false, error: err.message }).code(500);
    }
  }

  // REFRESH TOKEN
  static async refresh(request, h) {
    try {
      const { refreshToken } = request.payload;
      console.log(" Refresh attempt with token:", refreshToken?.slice(0, 20) + "...");

      if (!refreshToken) {
        console.warn(" No refresh token provided");
        return h.response({ message: "Refresh token required" }).code(400);
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      console.log(" Refresh token decoded:", decoded);

      const newAccessToken = jwt.sign(
        { id: decoded.id, role: decoded.role, collegeId: decoded.collegeId },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      console.log("New access token generated");

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
