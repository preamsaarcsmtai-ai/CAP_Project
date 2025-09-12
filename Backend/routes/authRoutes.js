import { AuthController } from "../controllers/authController.js";

export const authRoutes = [
  {
    method: "POST",
    path: "/auth/login",
    handler: AuthController.login,
  },
  {
    method: "POST",
    path: "/auth/refresh",
    handler: AuthController.refresh,
  },
];
