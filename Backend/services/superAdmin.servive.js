import { eq } from "drizzle-orm";
import  db  from "../config/drizzle.js";
import { institutions, colleges, admins, superAdmins } from "../config/schema.js";
import bcrypt from "bcrypt";

export class SuperAdminService {

    //Registration for SuperAdmin
    static async superAdminReg( name, email, password ){
        if (!password) {
            throw new Error("Password is required");
            
        }
        const existingAdmin = await db.select().from(superAdmins).where(eq(superAdmins.email, email));
        if (existingAdmin.length > 0) {
            throw new Error("Super admin can already registered wit this email.");
            
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const [newAdmin] = await db.insert(superAdmins).values({ name, email, password: hashpassword }).returning();
        return newAdmin;

    }

    //Login for SuperAdmin
    static async findByEmail(email){
        const [existsemail] = await db.select().from(superAdmins).where(eq(superAdmins.email, email));
        return existsemail;
    }

    //Add Institution
    static async addInstitution(name, code, location) {

        // const exists = await db.query.institutions.findFirst({
        //     where:(eq(institutions.code, code))
        // });

        // if (!exists) {
        //     throw new Error("Institution code has not unique.");
        // }

      const [newInstitution] = await db.insert(institutions).values({ name, code, location }).returning();

      return newInstitution;
    }

    //Add College under Institution
    static async addCollege(institutionId, name, code) {
        return db.insert(colleges).values({ institutionId, name, code }).returning();
    }

    //Add Admin for College
    static async addAdmin(name, email, password, code) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [newAdmin] = await db
        .insert(admins)
        .values({ name, email, password: hashedPassword, code })
        .returning();
        return newAdmin;

        const [adminDetails] = await 
        db.select({
            id: admins.id,
            name: admins.name,
            email: admins.email,
            role: admins.role,
            createdAt: admins.createdAt,
            college:{
                id: colleges.id,
                name: colleges.name,
                code: colleges.code
            },
            institutions:{
                id: institutions.id,
                name: institutions.name
            }, 
        }).from(admins)
        .leftJoin(colleges, eq(admins.code, colleges.id))
        .leftJoin(institutions, eq(institutions.id, colleges.institutionId))
        .where(eq())
    } 

    // Get All Colleges + Admins by Institution
    static async getInstitutionsWithColleges() {
        return db.query.institutions.findMany({
            with: {
                colleges: {
                    with: {
                        admins: true,
                    },
                },
            },
        });
    }
}

