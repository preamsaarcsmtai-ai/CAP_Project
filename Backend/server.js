import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import { superAdminRoutes } from "./routes/superAdmin.routes.js";
import { collegeAdminRoutes } from "./routes/collegeAdmin.routes.js";
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


  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      return { message: "API root is working" };
    }
  });


  server.route(superAdminRoutes);
  server.route(collegeAdminRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
