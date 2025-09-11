import { SuperAdminService } from "../services/superAdmin.servive.js";

export class SuperAdminController {
    static async createInstitution(request, h) {
        try {
        const { name, code, location } = request.payload;
        const result = await SuperAdminService.addInstitution(name, code, location);
        console.log(result, name);
        return h.response({ success: true, data: result}).code(201);        
        } catch (error) {
            console.error(error);
            return h.response({ success: false, message:error.message}).code(500);
        }
    }

    static async createCollege(request, h) {
        const { institutionId, name, code } = request.payload;
        const result = await SuperAdminService.addCollege(institutionId, name, code);
        return h.response({ success: true, data: result}).code(201);
    }

    static async createAdmin(request, h) {
        const { collegeId, email, password } = request.payload;
        const result = await SuperAdminService.addAdmin(collegeId, email, password);
        return h.response({ success: true, data: result }).code(201);
    }

    static async listInstitutions(request, h) {
        const result = await SuperAdminService.getInstitutionsWithColleges();
        return h.response({ success: true, data: result}).code(201);
    }
}