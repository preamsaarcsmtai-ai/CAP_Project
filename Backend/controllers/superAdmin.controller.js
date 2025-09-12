import { SuperAdminService } from "../services/superAdmin.servive.js";
import Joi from 'joi';
import bcrypt from 'bcrypt'
import { TokenService } from "../middleware/tokenService.js";
import jwt from 'jsonwebtoken';

export class SuperAdminController {

    //  register for user

 static async sadminRegister(request, h){
  try {
    console.log("Payload:", request.payload); 

    const { name, email, password } = request.payload;
    const result = await SuperAdminService.superAdminReg({ name, email, password });
    return h.response({ success: true, data: result }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({ success: false, message: error.message }).code(500);
  }
}



    static async sadminLogin(request, h){   
    try {
      const { email, password } = request.payload;

      const user = await SuperAdminService.findByEmail(email);
      if (!user) {
        return h.response({ success: false, message: "Invalid credentials" }).code(401);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return h.response({ success: false, message: "Invalid credentials" }).code(401);
      }

      // Generate tokens
      const { accessToken, refreshToken } = TokenService.generateTokens(user);

      return h.response({
        success: true,
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }).code(200);
    } catch (error) {
      console.error("SuperAdmin Login Error:", error.message);
      return h.response({ success: false, message: "Something went wrong" }).code(500);
    }
}

static async sadminrefresh(request, h){
      try {
           const { refreshToken } = request.payload;

    if (!refreshToken) {
        return h.response({ success: false, message: "Token has been expired"});
    }

    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
        { id: decode.id, email: decode.email, role: decode.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      return h.response({
        success: true,
        accessToken: newAccessToken,
      }).code(200);
      } catch (error) {
        console.log(error);
        h.response({ success: false, message: "Token has Expired"});
      }
}
    // Creating an Institution

    static async createInstitution(request, h) {

      try {
        const { name, code, location } = request.payload;
        const result = await SuperAdminService.addInstitution( name, code, location );
        console.log(result, name);
        return h.response({ success: true, data: result}).code(201);        
        } catch (error) {
            console.error(error);
            return h.response({ success: false, message:error.message}).code(500);
        }
    }

    static async createCollege(request, h) {

      try {
        const { institutionId, name, code } = request.payload;
        const result = await SuperAdminService.addCollege(institutionId, name, code);
        return h.response({ success: true, data: result}).code(201);
      } catch (error) {
        console.error(error);
          return h.response({ success: false, message:error.message}).code(500);
      }
    }

    static async createAdmin(request, h) {
      try {
        const { institutionId, name, email, password, code } = request.payload;
        const result = await SuperAdminService.addAdmin(institutionId, name, email, password, code);
        console.log(result);
        return h.response({ success: true, data: result }).code(201);
      } catch (error) {
        return h.response({ success: false, message:error.message}).code(500);
      }
    }

    static async listInstitutions(request, h) {
        const result = await SuperAdminService.getInstitutionsWithColleges();
        return h.response({ success: true, data: result}).code(201);
    }
}