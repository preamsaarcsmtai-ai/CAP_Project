import JoiPkg from "joi";
const Joi = JoiPkg;
import { SuperAdminController } from "../controllers/superAdmin.controller.js";

export const superAdminRoutes = [
  {
    method: "POST",
    path: "/superadmin/register",
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).required(),
          email: Joi.string()
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            .required()
            .messages({
              "string.empty": "Email is required",
              "string.pattern.base": "Invalid email format",
            }),
          password: Joi.string()
            .min(6)
            .max(20)
            .pattern(/^[a-zA-Z0-9!@#$%^&*]{6,20}$/)
            .required()
            .messages({
              "string.empty": "Password is required",
              "string.min": "Password must be at least 6 characters",
              "string.max": "Password cannot exceed 20 characters",
              "string.pattern.base":
                "Password can contain letters, numbers, and special characters !@#$%^&*",
            }),
        }),
        failAction: (request, h, err) => {
          return h
            .response({ success: false, message: err.details[0].message })
            .takeover()
            .code(400);
        },
      },
      handler: SuperAdminController.sadminRegister,
    },
  },

  // SuperAdmin login
  {
    method: "POST",
    path: "/superadmin/login",
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string()
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            .required()
            .messages({
              "string.empty": "Email is required",
              "string.pattern.base": "Invalid email format",
            }),
          password: Joi.string()
            .min(6)
            .max(20)
            .pattern(/^[a-zA-Z0-9!@#$%^&*]{6,20}$/)
            .required()
            .messages({
              "string.empty": "Password is required",
              "string.min": "Password must be at least 6 characters",
              "string.max": "Password cannot exceed 20 characters",
              "string.pattern.base":
                "Password can contain letters, numbers, and special characters !@#$%^&*",
            }),
        }),
        failAction: (request, h, err) => {
          return h
            .response({ success: false, message: err.details[0].message })
            .takeover()
            .code(400);
        },
      },
      handler: SuperAdminController.sadminLogin,
    },
  },

  // Adding Institutions
  {
    method: "POST",
    path: "/superadmin/institutions",
    options: {
      auth: false, // Change to `auth: "jwt"` once authentication is ready
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).required(),
          code: Joi.string().min(3).max(50).required(),
          location: Joi.string().min(3).max(50).required(),
        }),
        failAction: (request, h, err) => {
          return h
            .response({ success: false, message: err.details[0].message })
            .takeover()
            .code(400);
        },
      },
      handler: SuperAdminController.createInstitution,
    },
  },

  // Adding College
  {
    method: "POST",
    path: "/superadmin/college",
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          institutionId: Joi.number().integer().required(),
          name: Joi.string().min(3).required(),
          code: Joi.string().min(3).max(50).required(),
        }),
        failAction: (request, h, err) => {
          return h
            .response({ success: false, message: err.details[0].message })
            .takeover()
            .code(400);
        },
      },
      handler: SuperAdminController.createCollege,
    },
  },

  // Adding Admin
  {
  method: "POST",
  path: "/superadmin/admin",
  options: {
    auth: false,
    validate: {
      payload: Joi.object({
        name: Joi.string().min(3).required(),
        code: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),
        //collegeId: Joi.number().integer().required(),
        //institutionId: Joi.number().integer().required()
      }),
      failAction: (request, h, err) => {
        return h
          .response({ success: false, message: err.details[0].message })
          .takeover()
          .code(400);
      },
    },
    handler: SuperAdminController.createAdmin,
  },
},

  // List Institutions
  {
    method: "GET",
    path: "/superadmin/institutions",
    options: {
      auth: false,
      handler: SuperAdminController.listInstitutions,
    },
  },
];
