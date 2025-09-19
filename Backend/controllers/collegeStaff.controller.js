import { StaffService } from "../services/collegeAdmin.staff.service.js";

export class StaffController {

  static async addStaff(request, h) {
    try {
      const collegeId = request.user.collegeId;
      const staff = await StaffService.addStaff({...request.payload, collegeId });
      return h.response(staff).code(200);
    } catch (error) {
      console.log(error.message);
      return h.response({ success: false, message:"Staff cannot be assigned" + error.message }).code(401);
    }
  }

  static async getStaff(request, h) {
    try {
      const staffList = await StaffService.getStaff(request.user.collegeId);
      return h.response(staffList).code(200);
    } catch (error) {
      console.log(error);
      return h.response({ success: false, message: error.message }).code(400);
    }
  }

  static async updateStaff(request, h) {
    try {
      const { id } = request.params;
      const updated = await StaffService.updatedStaff(Number(id), request.payload, request.user.collegeId);
      return h.response(updated).code(200);
    } catch (error) {
      console.log(error);
      return h.response({ success: false, message: "Staff could not be updated" }).code(400);
    }
  }

  static async deleteStaff(request, h) {
    try {
      const { id } = request.params;
      const deleted = await StaffService.deleteStaff(Number(id), request.user.collegeId);
      return h.response(deleted).code(200);
    } catch (error) {
      console.log(error);
      return h.response({ success: false, message: error.message }).code(400);
    }
  }
}
