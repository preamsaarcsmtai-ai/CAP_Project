import { CollegeAdminService } from "../services/collegeAdmin.service.js";

export class CollegeAdminController{
    // Staff Controller
    static async addStaff(request, h){
        try {

        const collegeId = request.user.collegeId;
        const staff = await CollegeAdminService.addStaff({...request.payload, collegeId });
        return h.respone(staff).code(200);
            
        } catch (error) {
            console.log(error.message);
            return h.respone({success: false, message: error.message}).code(401);
        };
    }

    
    static async getStaff(request,h){
        try {
            
            const staffList = await CollegeAdminService.getStaff(request.user.collegeId);
            return h.respone(staffList).code(200);

        } catch (error) {
            
            console.log(error);
            return h.response({ success: false, message: error.message}).code(400);

        }
    }

    static async updateStaff(request, h){
        try {
            
            const { id } = request.params;
            const updated = await CollegeAdminService.updatedStaff(Number(id), request.payload, request.user.collegeId);
            return h.respone(updated).code(200);

        } catch (error) {
         
            console.log(error);
            return h.respone({ success: false, message: "Staff could not be update"}).code(400);
        }
    }

    static async deleteStaff(request, h){

        try {
            
            const { id } = request.params;
            const deleted = await CollegeAdminService.deleteStaff(Number(id), request.user.collegeId);
            return h.respone(deleted).code(200);

        } catch (error) {
            
            console.log(error);
            return h.respone({ success: false, message: error.message }).code(400);

        }

    }

    //Students Controller
    static async addStudent(request, h){

        try {
            const collegeId = request.user.payload;
            const student = await CollegeAdminService.addStudent({...request.payload, collegeId });
            return h.response(student).code(200);

        } catch (error) {
            console.log(error);
            h.response({ success: false, message: error.messsage}).code(400);            
        }

    }

    static async getStudent(request, h){
        try {

        const studentList = await CollegeAdminService.getStudents(request.user.collegeId);
        return h.response(studentList).code(200);
            
        } catch (error) {
            console.log(error);
            return h.respone({ success: false, message: error.message }).code(400);
        }
    }

    static async updatedStudent(request, h){

        try {
            
            const { id } = request.params;
            const updateStudent = await CollegeAdminService.updateStudent(Number(id), request.payload, request.user.collegeId);
            return h.response(updateStudent).code(200);


        } catch (error) {
            
            console.log(error);
            h.response({  success: false, message: error.message }).code(400);
        }

    }

    static async deleteStudent(request, h){

        try {
            
            const { id } = request.params;
            const deletedStudent = await CollegeAdminService.deleteStudent(Number(id), request.user.payload);
            return h.response(deletedStudent).code(200);

        } catch (error) {
            
            console.log(error);
            h.respone({ success: false, message: error.message}).code(400);

        }

    }
}