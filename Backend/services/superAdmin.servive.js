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
    static async addAdmin(institutionId, name, email, password, code) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [newAdmin] = await db
        .insert(admins)
        .values({ institutionId, name, email, password: hashedPassword, code })
        .returning();
        return newAdmin;
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

