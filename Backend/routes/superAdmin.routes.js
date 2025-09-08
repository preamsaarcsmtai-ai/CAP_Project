import { SuperAdminController } from "../controllers/superAdmin.controller.js";

export const superAdminRoutes = [
    {
        method: "POST",
        path: "/superadmin/institutions",
        handler: SuperAdminController.createInstitution,
    },
    {
        method: "POST",
        path: "/superadmin/college",
        handler: SuperAdminController.createCollege,
    },
    {
        method: "POST",
        path: "/superadmin/admin",
        handler: SuperAdminController.createAdmin,
    },
    {
        method: "GET",
        path: "/superadmin/institutions",
        handler: SuperAdminController.listInstitutions,
    },
];