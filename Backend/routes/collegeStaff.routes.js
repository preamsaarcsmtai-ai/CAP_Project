import { StaffController } from "../controllers/staff.controller.js"

export const staffRoutes = [
{
    method:"POST",
    path:"/college-admin/staff",
    options:{ pre :[authGuard(["college_admin"])]},
    handler: StaffController.addStaff
},
{
    method:"GET",
    path:"/college-admin/get/staff",
    options: { pre :[authGuard(["college_admin"])]},
    handler: StaffController.getStaff
},
{
    method:"PUT",
    path: "/college-admin/staff/{id}",
    options: { pre: [authGuard(["college_admin"])]},
    handler: StaffController.updateStaff
},
{
    method:"DELETE",
    path: "/college-admin/staff/{id}",
    options: { pre: [authGuard(["college_admin"])]},
    handler: StaffController.deleteStaff
}]