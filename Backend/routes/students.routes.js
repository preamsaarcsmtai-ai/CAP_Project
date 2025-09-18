import { StudentController } from "../controllers/student.controller.js";
import { authGuard } from "../middleware/authGuard.js";

export const studentRoutes = [
  // REGISTER
  {
    method: "POST",
    path: "/student/register",
    handler: StudentController.register
  },

  // LOGIN
  {
    method: "POST",
    path: "/student/login",
    handler: StudentController.login
  },

  // GET PROFILE
  {
    method: "GET",
    path: "/student/profile",
    options: { pre: [authGuard(["student"])] },
    handler: StudentController.getProfile
  },

  // UPDATE PROFILE
  {
    method: "PUT",
    path: "/student/profile",
    options: { pre: [authGuard(["student"])] },
    handler: StudentController.updateProfile
  }
];
