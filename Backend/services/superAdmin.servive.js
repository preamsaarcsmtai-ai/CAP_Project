import  db  from "../config/drizzle.js";
import { institutions, colleges, admins } from "../config/schema.js";
import bcrypt from "bcrypt";

export class SuperAdminService {
    //Add Institution
    static async addInstitution(name, code, location) {
        return db.insert(institutions).values({ name, code, location }).returning();
    }

    //Add College under Institution
    static async addCollege(institutionId, name, code) {
        return db.insert(colleges).values({ institutionId, name, code }).returning();
    }

    //Add Admin for College
    static async addAdmin(collegeId, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return db
        .insert(admins)
        .values({ collegeId, email, password: hashedPassword })
        .returning();
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