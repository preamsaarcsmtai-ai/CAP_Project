import { AuthController } from "../controllers/authController.js";

export const authRoutes = [
  {
    method: "POST",
    path: "/auth/login",
    options: { auth: false }, 
    handler: AuthController.login,
  },
  {
    method: "POST",
    path: "/auth/refresh",
    options: { auth: false },  
    handler: AuthController.refresh,
  },
  {
    method: "POST",
    path: "/admin/login",
    options: { auth: false },
    handler: AuthController.login,
  }
];
