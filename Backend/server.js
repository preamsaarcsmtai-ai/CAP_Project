import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import { superAdminRoutes } from "./routes/superAdmin.routes.js";
import { collegeAdminRoutes } from "./routes/collegeAdmin.routes.js";
import { authRoutes } from "./routes/authRoutes.js";
import Jwt from '@hapi/jwt';
import { staffRoutes } from "./routes/collegeStaff.routes.js";
import { studentRoutes } from "./routes/students.routes.js";
dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5002,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type", "Authorization"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  });

  await server.register(Jwt);

server.auth.strategy("jwt", "jwt", {
    keys: process.env.JWT_SECRET,
    verify: { aud: false, iss: false, sub: false, nbf: true, exp: true },
    validate: (artifacts, request, h) => {
  const creds = {
    id: artifacts.decoded.payload.id,
    role: artifacts.decoded.payload.role
  };

  if (artifacts.decoded.payload.collegeId) {
    creds.collegeId = artifacts.decoded.payload.collegeId;
  }

  return { isValid: true, credentials: creds };
},
});

server.auth.default("jwt"); 


  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      return { message: "API root is working" };
    }
  });


  server.route(superAdminRoutes);
  server.route(collegeAdminRoutes);
  server.route(authRoutes);
  server.route(staffRoutes);
  server.route(studentRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
