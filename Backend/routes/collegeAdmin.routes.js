import { CollegeAdminController } from "../controllers/collegeAdmin.controller.js";
import { authGuard } from "../middleware/authGuard.js";

export const collegeAdminRoutes = [

   // Students Routes
   {
    method:"POST",
    path: "/college-admin/student",
    options: { pre: [authGuard(["college_admin"])]},
    handler: CollegeAdminController.addStudent
   },
   {
    method:"GET",
    path: "/college-admin/get/student",
    options: { pre: [authGuard(["college_admin"])]},
    handler: CollegeAdminController.getStudent
   },
   {
    method: "PUT",
    path: "/college-admin/update/{id}",
    options: { pre: [authGuard(["college_admin"])]},
    handler: CollegeAdminController.updatedStudent
   },
   {
    method: "DELETE",
    path: "/college-admin/delete/{id}",
    options: { pre: [authGuard(["college_admin"])]},
    handler: CollegeAdminController.deleteStudent
   }
]