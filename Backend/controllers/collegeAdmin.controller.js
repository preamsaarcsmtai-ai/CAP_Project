import { CollegeAdminService } from "../services/collegeAdmin.service.js";

export class CollegeAdminController{

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