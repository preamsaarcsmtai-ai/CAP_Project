import { StaffService } from "../services/collegeAdmin.staff.service.js";

export class StaffController{

static async addStaff(request, h){
        try {

        const collegeId = request.user.collegeId;
        const staff = await StaffService.addStaff({...request.payload, collegeId });
        return h.respone(staff).code(200);
            
        } catch (error) {
            console.log(error.message);
            return h.respone({success: false, message: error.message}).code(401);
        };
    }

    
    static async getStaff(request,h){
        try {
            
            const staffList = await StaffService.getStaff(request.user.collegeId);
            return h.respone(staffList).code(200);

        } catch (error) {
            
            console.log(error);
            return h.response({ success: false, message: error.message}).code(400);

        }
    }

    static async updateStaff(request, h){
        try {
            
            const { id } = request.params;
            const updated = await StaffService.updatedStaff(Number(id), request.payload, request.user.collegeId);
            return h.respone(updated).code(200);

        } catch (error) {
         
            console.log(error);
            return h.respone({ success: false, message: "Staff could not be update"}).code(400);
        }
    }

    static async deleteStaff(request, h){

        try {
            
            const { id } = request.params;
            const deleted = await StaffService.deleteStaff(Number(id), request.user.collegeId);
            return h.respone(deleted).code(200);

        } catch (error) {
            
            console.log(error);
            return h.respone({ success: false, message: error.message }).code(400);

        }

    }
}